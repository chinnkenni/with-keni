import type { APIRoute } from 'astro';

const pages = ['', 'story', 'notes', 'lab', 'devices', 'build-log'];
const languages = ['', 'ja/', 'en/'];

export const GET: APIRoute = ({ site }) => {
	const base = site ?? new URL('https://withkeni.com');
	const urls = languages
		.flatMap((language) => pages.map((path) => `${language}${path}`))
		.map((path) => `<url><loc>${new URL(path, base).href}</loc></url>`)
		.join('');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml' } },
	);
};
