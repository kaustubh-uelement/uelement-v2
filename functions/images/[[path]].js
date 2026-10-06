export async function onRequest(context) {
  const { env, params } = context;
  const rawPath = Array.isArray(params.path)
    ? params.path.join('/')
    : params.path || '';
  const objectPath = decodeURIComponent(rawPath).replace(/^\/+/, '');

  if (!objectPath) {
    return new Response('Not Found', { status: 404 });
  }

  // Support both key styles:
  // - landing/hero.webp
  // - images/landing/hero.webp
  const candidateKeys = [objectPath];
  if (!objectPath.startsWith('images/')) {
    candidateKeys.push(`images/${objectPath}`);
  }

  let object = null;
  for (const key of candidateKeys) {
    object = await env.IMAGE_BUCKET.get(key);
    if (object) break;
  }

  if (object === null) {
    return new Response(`Image Not Found in R2 for path: ${objectPath}`, {
      status: 404,
    });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  if (object.httpEtag) {
    headers.set('etag', object.httpEtag);
  }
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  // Helps when assets are requested from images.uelement.co and embedded on uelement.co.
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(object.body, { headers });
}
