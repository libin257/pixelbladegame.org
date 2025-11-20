import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface PageMetadata {
  title: string
  description: string
  priority: number
  date?: string
}

export const metadata = {
  title: 'Codes - Pixel Blade Guide',
  description: 'Browse all codes guides for Pixel Blade',
}

export default async function CodesPage() {
  const contentDir = path.join(process.cwd(), 'src', 'content', 'codes')

  let pages: Array<{ slug: string; metadata: PageMetadata }> = []

  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))

    pages = files.map(file => {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)

      return {
        slug,
        metadata: data as PageMetadata
      }
    })

    // Sort by priority (lower number = higher priority)
    pages.sort((a, b) => (a.metadata.priority || 999) - (b.metadata.priority || 999))
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-5xl font-bold text-white mb-4">Codes</h1>
      <p className="text-xl text-gray-300 mb-12">
        Browse all codes guides for Pixel Blade
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/codes/${page.slug}/`}
            className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700 hover:border-[#F4B860] transition-all group"
          >
            <h2 className="text-2xl font-bold text-white group-hover:text-[#F4B860] mb-2 transition-colors">
              {page.metadata.title}
            </h2>
            <p className="text-gray-400">
              {page.metadata.description}
            </p>
            {page.metadata.date && (
              <p className="text-sm text-gray-500 mt-4">
                Updated: {new Date(page.metadata.date).toLocaleDateString()}
              </p>
            )}
          </Link>
        ))}
      </div>

      {pages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No guides available yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
