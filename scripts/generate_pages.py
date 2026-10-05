import os
import glob
import re
import json
import shutil

def clean_link(l):
    if l.startswith('#') or l.startswith('http://') or l.startswith('https://') or l.startswith('mailto:') or l.startswith('tel:'):
        return l
    res = re.sub(r'^(\.\./|\./)+', '/', l)
    if not res.startswith('/'):
        res = '/' + res
    res = re.sub(r'/index\.html([?#]|$)', r'\1', res)
    if not res:
        res = '/'
    return res

def clean_html(html):
    def replace_href(match):
        orig = match.group(1)
        cleaned = clean_link(orig)
        return f'href="{cleaned}"'

    def replace_src(match):
        orig = match.group(1)
        if orig.startswith('http://') or orig.startswith('https://') or orig.startswith('/'):
            return f'src="{orig}"'
        cleaned = re.sub(r'^(\.\./|\./)+', '/', orig)
        if not cleaned.startswith('/'):
            cleaned = '/' + cleaned
        return f'src="{cleaned}"'

    html = re.sub(r'href=[\"\']([^\"\']+)[\"\']', replace_href, html)
    html = re.sub(r'src=[\"\']([^\"\']+)[\"\']', replace_src, html)
    return html

# 1. Clean up old route directories in app/
keep_files = {'layout.tsx', 'globals.css', 'favicon.ico'}
for item in os.listdir('app'):
    if item in keep_files:
        continue
    item_path = os.path.join('app', item)
    if os.path.isdir(item_path):
        shutil.rmtree(item_path)
    elif os.path.isfile(item_path):
        os.remove(item_path)

print("Cleaned up old routes in app/")

# 2. Process each HTML file in uelement-html
html_files = sorted(glob.glob('uelement-html/**/*.html', recursive=True))

for fpath in html_files:
    rel = os.path.relpath(fpath, 'uelement-html')
    with open(fpath, 'r', encoding='utf-8') as f:
        raw_html = f.read()

    # Determine route path
    if rel == 'index.html':
        out_dir = 'app'
        out_file = os.path.join(out_dir, 'page.tsx')
        route_name = 'Home'
    elif rel == '404.html':
        out_dir = 'app'
        out_file = os.path.join(out_dir, 'not-found.tsx')
        route_name = 'NotFound'
    else:
        # e.g. company/careers/index.html -> app/company/careers/page.tsx
        sub = os.path.dirname(rel)
        out_dir = os.path.join('app', sub)
        out_file = os.path.join(out_dir, 'page.tsx')
        route_name = sub.replace('/', '_').replace('-', '_').title() + 'Page'

    os.makedirs(out_dir, exist_ok=True)

    # Extract metadata
    m_title = re.search(r'<title>(.*?)</title>', raw_html)
    title = m_title.group(1) if m_title else 'UElement'

    m_desc = re.search(r'<meta name="description" content="(.*?)"', raw_html)
    description = m_desc.group(1) if m_desc else ''

    m_canon = re.search(r'<link rel="canonical" href="(.*?)"', raw_html)
    canonical = m_canon.group(1) if m_canon else None

    m_og_title = re.search(r'<meta property="og:title" content="(.*?)"', raw_html)
    og_title = m_og_title.group(1) if m_og_title else title

    m_og_desc = re.search(r'<meta property="og:description" content="(.*?)"', raw_html)
    og_desc = m_og_desc.group(1) if m_og_desc else description

    m_og_url = re.search(r'<meta property="og:url" content="(.*?)"', raw_html)
    og_url = m_og_url.group(1) if m_og_url else canonical

    m_og_img = re.search(r'<meta property="og:image" content="(.*?)"', raw_html)
    og_img = m_og_img.group(1) if m_og_img else 'https://uelement.in/og.png'

    m_tw_card = re.search(r'<meta name="twitter:card" content="(.*?)"', raw_html)
    tw_card = m_tw_card.group(1) if m_tw_card else 'summary_large_image'

    m_tw_title = re.search(r'<meta name="twitter:title" content="(.*?)"', raw_html)
    tw_title = m_tw_title.group(1) if m_tw_title else title

    m_tw_desc = re.search(r'<meta name="twitter:description" content="(.*?)"', raw_html)
    tw_desc = m_tw_desc.group(1) if m_tw_desc else description

    m_tw_img = re.search(r'<meta name="twitter:image" content="(.*?)"', raw_html)
    tw_img = m_tw_img.group(1) if m_tw_img else og_img

    # Extract main content
    m_main = re.search(r'<main id="main">(.*?)</main>', raw_html, re.DOTALL)
    if not m_main:
        print(f"WARNING: No main found in {fpath}")
        continue
    main_inner = clean_html(m_main.group(1))

    # Generate page file
    metadata_dict = {
        "title": title,
        "description": description,
    }
    if canonical:
        metadata_dict["alternates"] = {"canonical": canonical}
    
    metadata_dict["openGraph"] = {
        "title": og_title,
        "description": og_desc,
        "url": og_url or "https://uelement.in/",
        "siteName": "UElement",
        "locale": "en_IN",
        "type": "website",
        "images": [{"url": og_img, "width": 1200, "height": 630}],
    }
    metadata_dict["twitter"] = {
        "card": tw_card,
        "title": tw_title,
        "description": tw_desc,
        "images": [tw_img],
    }

    # Format page TSX
    code = (
        'import type { Metadata } from "next";\n\n'
        'export const metadata: Metadata = ' + json.dumps(metadata_dict, indent=2) + ';\n\n'
        'const content = ' + json.dumps(main_inner) + ';\n\n'
        f'export default function {route_name}() {{\n'
        '  return (\n'
        '    <main id="main" dangerouslySetInnerHTML={{ __html: content }} />\n'
        '  );\n'
        '}\n'
    )

    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(code)
    print(f"Generated {out_file} for {rel}")

print("All 34 pages generated successfully!")
