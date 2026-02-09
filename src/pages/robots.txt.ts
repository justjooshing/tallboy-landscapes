import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
    const isPreview = site?.host.startsWith('preview.')
    const sitemap = site ? new URL('/sitemap.xml', site).toString() : '/sitemap.xml';

    const previewLines = [
        'Disallow: /',
    ];

    const prodLines = [
        'Disallow:',
        `Sitemap: ${sitemap}`,
    ];

    const lines = [
        'User-agent: *',
        ...(isPreview ? previewLines : prodLines),
        ''
    ]

    const body = lines.join('\n');

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
