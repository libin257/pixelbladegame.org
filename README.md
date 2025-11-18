# Winter Burrow Info

> Your complete survival companion for *Winter Burrow* - Interactive tools, crafting guides, and comprehensive walkthroughs for mastering the frozen wilderness.

🌐 **Live Site**: [https://winterburrow.info](https://winterburrow.info)

---

## 📖 About This Project

Winter Burrow Info is a comprehensive fan-made guide website dedicated to helping players survive and thrive in *Winter Burrow*, the cozy survival game. The site features:

- ✅ **Warmth Calculator** - Interactive tool to calculate exact survival time based on clothing and temperature zones
- ✅ **Crafting Recipe Finder** - Real-time material-based filtering with station categorization
- ✅ **Beginner's Guide** - 3-minute quick start survival tips
- ✅ **Interactive Map** - Resource locations and zone navigation
- ✅ **Complete Walkthrough** - Full game progression guides
- ✅ **70+ SEO-optimized pages** - Covering guides, reviews, resources, survival mechanics, and more
- ✅ **Community Hub** - Curated YouTube videos and Reddit discussions
- ✅ **Multi-platform Reviews** - Steam, Nintendo Switch, and price tracking

---

## 🏗️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Visualization**: Warmth matrix heatmap with duration calculations
- **Search**: Material-based recipe filtering
- **Video Embeds**: lite-youtube-embed
- **Content**: MDX + gray-matter
- **Deployment**: Vercel

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/winterburrow.info.git
cd winterburrow.info

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

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
│   │   ├── warmth-matrix.json      # Warmth duration data by temperature
│   │   ├── recipes.json             # Crafting recipes database
│   │   └── clothing.json            # Clothing items and warmth stats
│   └── images/
│       ├── backgrounds/             # Site background images
│       ├── steam/                   # Steam promotional images
│       └── screenshots/             # Game screenshots
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage with embedded tools
│   │   ├── warmth-tool/page.tsx     # Full warmth calculator page
│   │   ├── crafting/page.tsx        # Full recipe finder page
│   │   ├── [...slug]/page.tsx       # Dynamic MDX page routes
│   │   └── sitemap.xml/route.ts     # Dynamic sitemap generator
│   ├── components/
│   │   ├── Header.tsx               # Site navigation
│   │   ├── Footer.tsx               # Site footer
│   │   ├── warmth/
│   │   │   └── WarmthCalculator.tsx # Interactive warmth tool
│   │   └── crafting/
│   │       └── RecipeFinder.tsx     # Interactive recipe finder
│   ├── content/                     # 70+ MDX content files
│   │   ├── guides/                  # Beginner guides and walkthroughs
│   │   ├── survival/                # Warmth, hunger, stamina mechanics
│   │   ├── resources/               # Material guides (granite, pinewood, etc.)
│   │   ├── crafting/                # Crafting guides and tool tutorials
│   │   ├── reviews/                 # Platform reviews and ratings
│   │   ├── community/               # Reddit highlights and mods
│   │   ├── news/                    # Patch notes and updates
│   │   ├── platforms/               # Steam, Switch platform guides
│   │   ├── faq/                     # FAQ and troubleshooting
│   │   └── quests/                  # Quest walkthroughs
│   └── data/
│       ├── videos.ts                # YouTube video data
│       └── reddit.ts                # Reddit post data
├── scripts/
│   ├── fetch-images.cjs             # Image asset fetcher
│   ├── fetch-youtube.cjs            # YouTube data fetcher
│   ├── fetch-reddit.cjs             # Reddit data fetcher
│   ├── test-urls.sh                 # URL accessibility testing
│   └── generate-articles-from-xlsx.js # Content generation from Excel matrix
└── tools/
    └── demand/                      # Project requirements & design docs
        └── winter_burrow_content_matrix.xlsx # Content structure definition
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
npm run fetch:youtube        # Fetch latest YouTube videos
npm run fetch:reddit         # Fetch Reddit discussions
npm run fetch:images         # Download game images
npm run fetch:sheets         # Fetch Google Sheets data
npm run fetch:all            # Run all data fetchers

# Content Generation
npm run generate:articles    # Generate MDX pages from Excel matrix
npm run preview:xlsx         # Preview Excel content structure

# Testing
npm run test:urls            # Test all page URLs for accessibility
```

---

## 🎨 Key Features

### 1. **Warmth Calculator**

Interactive survival time calculator with:
- Clothing item selection with warmth values
- Temperature zone selector (-10°C to 10°C)
- Real-time duration calculations
- Complete warmth matrix heatmap
- Equipment slot tracking (5 slots)
- Safety threshold indicators

Uses JSON data with precalculated durations for all temperature/clothing combinations.

### 2. **Crafting Recipe Finder**

Smart material-based filtering with:
- Material availability selection
- Crafting station filtering (Handcraft, Workbench, Advanced Workbench, Kitchen)
- Search by item name
- Real-time craftable recipe highlighting
- Missing material indicators
- Station color coding

Powered by client-side filtering with instant results.

### 3. **70+ SEO-Optimized Pages**

Automatically generated and manually curated MDX pages covering:
- Beginner survival guides
- Resource gathering locations
- Crafting system tutorials
- Warmth and hunger mechanics
- Quest walkthroughs
- Platform reviews and pricing
- Community mods and tools

Each page includes:
- Structured frontmatter (title, description, keywords)
- Responsive layout with dark theme
- Related article links
- SEO metadata and OpenGraph tags

### 4. **Dynamic Sitemap**

Automatically generates `sitemap.xml` with all 70+ pages, optimized for search engines and updated on every build.

---

## 📊 Data Sources

- **Game Data**: Manual extraction from Winter Burrow gameplay
- **Community Content**: Curated from Reddit discussions
- **Video Content**: Official trailers and gameplay videos from YouTube
- **Steam Images**: Official promotional materials from Steam CDN

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

This project is a fan-made resource and is not officially affiliated with the creators of Winter Burrow. All game-related content belongs to its respective owners.

The codebase itself is open for community contributions.

---

## 🙏 Acknowledgments

- **Winter Burrow Developers** - For creating this cozy survival experience
- **Reddit Community** - For valuable survival tips and soft-lock solutions
- **YouTube Creators** - For gameplay videos and tutorials

---

## 🔗 Links

- **Live Site**: [https://winterburrow.info](https://winterburrow.info)
- **Warmth Calculator**: [https://winterburrow.info/warmth-tool](https://winterburrow.info/warmth-tool)
- **Crafting Finder**: [https://winterburrow.info/crafting](https://winterburrow.info/crafting)
- **Beginner Guide**: [https://winterburrow.info/guides/beginner](https://winterburrow.info/guides/beginner)

---

## 📧 Contact

For questions, suggestions, or bug reports, please:
- Open an issue on GitHub
- Visit the community section on the website

---

*Built with ❤️ for the Winter Burrow community*
