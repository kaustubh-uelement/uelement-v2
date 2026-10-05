import os
import glob
import re
import json

def clean_links(text):
    text = re.sub(r'href=[\"\'](\.\./|\./)*index\.html[\"\']', 'href="/"', text)
    text = re.sub(r'href=[\"\'](\.\./|\./)*([a-zA-Z0-9_\-\/]+)/index\.html([\#\?][^\"]*)?[\"\']', r'href="/\2\3"', text)
    text = re.sub(r'href=[\"\'](\.\./|\./)*([a-zA-Z0-9_\-]+)\.html([\#\?][^\"]*)?[\"\']', r'href="/\2\3"', text)
    # Fix any relative src links
    text = re.sub(r'src=[\"\'](\.\./|\./)*assets/', 'src="/assets/', text)
    text = re.sub(r'src=[\"\'](\.\./|\./)*favicon\.svg', 'src="/favicon.svg', text)
    text = re.sub(r'src=[\"\'](\.\./|\./)*og\.png', 'src="/og.png', text)
    return text

with open('uelement-html/index.html', 'r', encoding='utf-8') as f:
    home_html = f.read()

mh = re.search(r'(<header.*?</header>)', home_html, re.DOTALL)
mf = re.search(r'(<footer.*?</footer>)', home_html, re.DOTALL)

header_html = clean_links(mh.group(1))
footer_html = clean_links(mf.group(1))

# Write components/Header.tsx
with open('components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write('import React from "react";\n\n'
            'const headerHtml = ' + json.dumps(header_html) + ';\n\n'
            'export default function Header() {\n'
            '  return <div dangerouslySetInnerHTML={{ __html: headerHtml }} />;\n'
            '}\n')

# Write components/Footer.tsx
with open('components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write('import React from "react";\n\n'
            'const footerHtml = ' + json.dumps(footer_html) + ';\n\n'
            'export default function Footer() {\n'
            '  return <div dangerouslySetInnerHTML={{ __html: footerHtml }} />;\n'
            '}\n')

print("Generated components/Header.tsx and components/Footer.tsx successfully")
