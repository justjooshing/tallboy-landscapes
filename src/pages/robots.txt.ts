export async function GET({ site }: { site: string}) {
    const isPreview = site === "https://preview.tallboylandscapes.com/";
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
