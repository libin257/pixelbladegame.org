import { notFound } from 'next/navigation'
import Link from 'next/link'
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { ReadingProgress } from '@/components/ReadingProgress'
import { TableOfContents } from '@/components/TableOfContents'
import { RelatedArticles } from '@/components/RelatedArticles'
import { ArticleCTA, FloatingCTA } from '@/components/ArticleCTA'

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getContent(slug: string[]) {
  const filePath = path.join(process.cwd(), 'src/content', ...slug) + '.mdx'

  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    return { frontmatter: data, content }
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content')

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

  const allPaths = await getAllMdxFiles(contentDir)
  return allPaths.map((slug) => ({ slug }))
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params
  const result = await getContent(slug)

  if (!result) {
    notFound()
  }

  const { frontmatter, content } = result

  // Configure marked to add IDs to headings
  marked.use({
    renderer: {
      heading({ text, depth }: { text: string; depth: number }) {
        // Generate ID from text
        const id = String(text)
          .toLowerCase()
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .trim()

        return `<h${depth} id="${id}">${text}</h${depth}>`
      }
    }
  })

  // Parse Markdown to HTML
  let htmlContent = await marked(content)

  // Remove the first H1 from content to avoid duplication
  htmlContent = htmlContent.replace(/<h1[^>]*>.*?<\/h1>/, '')

  // Structured data for SEO
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelbladegame.org'
  const articleUrl = `${baseUrl}/${slug.join('/')}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description || '',
    author: {
      '@type': 'Organization',
      name: 'Pixel Blade Info Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pixel Blade Info',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    datePublished: frontmatter.date || new Date().toISOString(),
    dateModified: frontmatter.date || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    articleSection: frontmatter.category || 'Guide',
    keywords: frontmatter.keywords || []
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      ...slug.map((segment, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        item: `${baseUrl}/${slug.slice(0, index + 1).join('/')}`
      }))
    ]
  }

  return (
    <>
      <ReadingProgress />
      <FloatingCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-8">
              {/* Breadcrumb */}
              <nav className="text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#F4B860]">Home</Link>
                {slug.map((segment, index) => {
                  const isLast = index === slug.length - 1
                  const segmentPath = '/' + slug.slice(0, index + 1).join('/')
                  const displayText = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

                  return (
                    <span key={index}>
                      {' › '}
                      {isLast ? (
                        <span className="text-white">{displayText}</span>
                      ) : (
                        <Link href={segmentPath} className="hover:text-[#F4B860]">
                          {displayText}
                        </Link>
                      )}
                    </span>
                  )
                })}
              </nav>

              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#F4B860]/20 text-[#F4B860] px-3 py-1 rounded-full text-sm font-semibold">
                    {frontmatter.category || 'Guide'}
                  </span>
                  {frontmatter.priority && frontmatter.priority <= 10 && (
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      High Priority
                    </span>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {frontmatter.title}
                </h1>
                {frontmatter.description && (
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {frontmatter.description}
                  </p>
                )}
                {frontmatter.date && (
                  <p className="text-sm text-gray-400 mt-4">
                    Last updated: {frontmatter.date}
                  </p>
                )}
              </header>

              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>

              {/* External Reference */}
              {frontmatter.reference && (
                <div className="mt-12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">📚 External Reference</h3>
                  <a
                    href={frontmatter.reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4B860] hover:underline break-all"
                  >
                    {frontmatter.reference}
                  </a>
                </div>
              )}

              {/* Newsletter CTA */}
              <ArticleCTA />

              {/* Related Articles */}
              <RelatedArticles category={slug[0]} currentSlug={slug.join('/')} />
            </article>

            {/* Sidebar - Table of Contents */}
            <aside className="lg:col-span-4">
              <TableOfContents />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
