import fs from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-static'

async function getAllMdxFiles(dir: string, basePath: string[] = []): Promise<string[][]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const paths: string[][] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const subPaths = await getAllMdxFiles(fullPath, [...basePath, entry.name])
      paths.push(...subPaths)
    } else if (entry.name.endsWith('.mdx')) {
      const fileName = entry.name.replace('.mdx', '')
      paths.push([...basePath, fileName])
    }
  }

  return paths
}

export async function GET() {
  const contentDir = path.join(process.cwd(), 'src/content')
  const allPaths = await getAllMdxFiles(contentDir)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://winterburrow.info'
  const currentDate = new Date().toISOString().split('T')[0]

  const urls = [
    // Homepage
    `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
    // Interactive tools - high priority
    `  <url>
    <loc>${baseUrl}/warmth-tool</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/crafting</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
    // All MDX pages
    ...allPaths.map((slug) => {
      const url = `${baseUrl}/${slug.join('/')}`
      // Higher priority for guides and resources
      const isGuide = slug[0] === 'guides'
      const isResource = slug[0] === 'resources' || slug[0] === 'survival'
      const priority = isGuide ? '0.9' : isResource ? '0.8' : slug.length === 2 ? '0.7' : '0.6'
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
    }),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
