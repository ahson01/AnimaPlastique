export const prerender = true;

const site = 'https://xkinetics.space';
const pages: string[] = [
  '/',
  '/work',
  '/services',
  '/about',
  '/contact',
  '/tools/file-converter',
  '/tools/json-formatter',
  '/tools/image-compressor',
  '/tools/color-palette',
  '/tools/meta-preview',
  '/tools/exif-insight',
  '/tools/qr-code-studio'
];

export async function GET() {
	const body = sitemap(pages);
	return new Response(body, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml',
		}
	});
}

const sitemap = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map(
			(page) => `
  <url>
    <loc>${site}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `
		)
		.join('')}
</urlset>`;
