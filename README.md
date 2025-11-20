# Pixel Blade Info

> Your complete Roblox RPG companion for *Pixel Blade* - Working codes, weapon tier lists, and comprehensive guides for mastering the pixel realm.

🌐 **Live Site**: [https://pixelbladegame.org](https://pixelbladegame.org)

---

## 📖 About This Project

Pixel Blade Info is a comprehensive fan-made guide website dedicated to helping players master *Pixel Blade*, the Roblox action RPG. The site features:

- ✅ **Working Codes** - Latest active codes for free rewards
- ✅ **Weapon Tier Lists** - Community-approved rankings for all weapon types
- ✅ **Interactive Code Tool** - Easy copy-paste code interface
- ✅ **Strategy Guides** - Tips for progression and gameplay
- ✅ **30+ SEO-optimized pages** - Covering codes, tier lists, guides, and game info
- ✅ **Regular Updates** - Fresh codes and tier list updates

---

## 🏗️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX + gray-matter
- **Analytics**: Google Analytics 4 + Microsoft Clarity
- **Deployment**: Vercel

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pixel-blade-info.git
cd pixel-blade-info

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3002` to see the site.

### Build for Production

```bash
# Build the site
npm run build

# Start production server
npm run start
```

---

## 📂 Project Structure

```
├── public/
│   ├── data/
│   │   ├── codes.json              # Active codes data
│   │   └── weapon_tiers.json       # Weapon tier rankings
│   └── images/
│       ├── backgrounds/            # Site background images
│       └── logo.png                # Site logo
├── src/
│   ├── app/
│   │   ├── page.tsx                # Homepage
│   │   ├── [...slug]/page.tsx      # Dynamic MDX page routes
│   │   ├── tools/
│   │   │   ├── codes/page.tsx      # Interactive codes tool
│   │   │   └── weapon-tiers/page.tsx # Weapon tier tool
│   │   ├── codes/page.tsx          # Codes list page
│   │   ├── guides/page.tsx         # Guides list page
│   │   ├── tier-list/page.tsx      # Tier lists page
│   │   └── sitemap.xml/route.ts    # Dynamic sitemap generator
│   ├── components/
│   │   ├── Header.tsx              # Site navigation
│   │   ├── Footer.tsx              # Site footer
│   │   ├── ReadingProgress.tsx     # Article reading progress
│   │   ├── TableOfContents.tsx     # Auto-generated TOC
│   │   ├── RelatedArticles.tsx     # Related content
│   │   └── ArticleCTA.tsx          # Newsletter CTAs
│   ├── content/                    # 30+ MDX content files
│   │   ├── codes/                  # Codes guides
│   │   ├── guides/                 # Game guides & tutorials
│   │   ├── info/                   # Game information
│   │   └── tier-list/              # Tier list rankings
├── scripts/
│   ├── fetch-codes.cjs             # Codes data fetcher
│   ├── fetch-weapon-tiers.cjs      # Weapon tier data fetcher
│   └── test-urls.sh                # URL accessibility testing
└── tools/
    └── demand/                     # Project requirements
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev                  # Start dev server
npm run lint                 # Run TypeScript + ESLint checks
npm run format               # Format code with Biome

# Production
npm run build                # Build for production
npm run start                # Start production server

# Data Generation
npm run fetch:codes          # Fetch latest codes data
npm run fetch:weapon-tiers   # Fetch weapon tier rankings

# Testing
npm run test:urls            # Test all page URLs for accessibility
```

---

## 🎨 Key Features

### 1. **Interactive Codes Tool**

Easy-to-use interface featuring:
- One-click copy codes
- Active/expired status indicators
- Reward descriptions
- Regular updates

### 2. **Weapon Tier Lists**

Comprehensive rankings showing:
- S+ to C tier classifications
- Detailed weapon stats
- Meta analysis
- Community insights

### 3. **30+ SEO-Optimized Pages**

Automatically generated MDX pages covering:
- All active codes with detailed guides
- Weapon tier lists and rankings
- Comprehensive gameplay guides
- Game information and tips

Each page includes:
- Structured frontmatter (title, description, keywords)
- Responsive layout with dark theme
- Breadcrumb navigation
- Reading progress indicator
- Table of contents
- Related articles
- SEO metadata and OpenGraph tags

### 4. **Dynamic Sitemap**

Automatically generates `sitemap.xml` with all 30+ pages, optimized for search engines and updated on every build.

---

## 📊 Article Optimization Features

- **Reading Progress Bar** - Visual scroll indicator
- **Table of Contents** - Auto-generated from H2/H3 headings
- **Related Articles** - Category-based recommendations
- **Newsletter CTAs** - Multiple conversion points
- **Floating Action Button** - Quick access to codes tool
- **Scroll Depth Tracking** - GA4 engagement metrics (25%, 50%, 75%, 90%)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow the existing code style (enforced by Biome)
2. Ensure TypeScript types are properly defined
3. Test builds locally before submitting PR (`npm run build`)
4. Run URL tests before deployment (`npm run test:urls`)
5. Update documentation for new features

---

## 📝 License

This project is a fan-made resource and is not officially affiliated with the creators of Pixel Blade. All game-related content belongs to its respective owners.

The codebase itself is open for community contributions.

---

## 🙏 Acknowledgments

- **Pixel Blade Developers** - For creating this awesome Roblox RPG
- **Community Contributors** - For strategies, codes, and feedback
- **Roblox Community** - For ongoing support

---

## 🔗 Links

- **Live Site**: [https://pixelbladegame.org](https://pixelbladegame.org)
- **Working Codes**: [https://pixelbladegame.org/codes/pixel-blade-codes](https://pixelbladegame.org/codes/pixel-blade-codes)
- **Weapon Tier List**: [https://pixelbladegame.org/tier-list/pixel-blade-weapon-tier-list](https://pixelbladegame.org/tier-list/pixel-blade-weapon-tier-list)
- **Codes Tool**: [https://pixelbladegame.org/tools/codes](https://pixelbladegame.org/tools/codes)

---

## 📧 Contact

For questions, suggestions, or bug reports, please:
- Open an issue on GitHub
- Visit the community section on the website

---

*Built with ❤️ for the Pixel Blade community*
