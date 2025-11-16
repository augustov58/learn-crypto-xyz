# Learn Crypto 🚀

An interactive learning platform for cryptocurrency and blockchain technology, inspired by [learn-anything.xyz](https://learn-anything.xyz/). Explore crypto topics through beautiful, interactive mind maps with curated learning resources.

![Learn Crypto](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React Flow](https://img.shields.io/badge/React_Flow-Interactive-purple?style=for-the-badge)

## ✨ Features

- 🗺️ **Interactive Mind Maps** - Visualize cryptocurrency topics and their relationships
- 🎯 **Difficulty Filters** - Filter resources by Beginner, Intermediate, or Advanced level
- 🏷️ **Category Organization** - Browse by Fundamentals, Blockchain, DeFi, Development, Trading, and Security
- 📚 **Curated Resources** - Hand-picked articles, videos, courses, and documentation
- 🎨 **Beautiful UI** - Clean, modern interface with smooth interactions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔗 **Topic Relationships** - See how different crypto concepts connect

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/learn-crypto-xyz.git
cd learn-crypto-xyz
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

1. **Explore the Mind Map** - The main view shows all crypto topics as an interactive graph
2. **Filter by Difficulty** - Use the filter bar to show only Beginner, Intermediate, or Advanced topics
3. **Filter by Category** - Select a specific category to focus on particular areas
4. **Click on Topics** - Click any topic node to view its curated learning resources
5. **Navigate the Graph** - Zoom, pan, and drag to explore connections between topics
6. **Access Resources** - Click on resources to open them in a new tab

## 📂 Project Structure

```
learn-crypto-xyz/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with state management
│   └── globals.css         # Global styles
├── components/
│   ├── MindMap.tsx         # Interactive mind map component
│   ├── TopicNode.tsx       # Individual topic node visualization
│   ├── ResourcePanel.tsx   # Resource display modal
│   └── FilterPanel.tsx     # Difficulty and category filters
├── data/
│   └── crypto-topics.ts    # All topics and resources data
├── types/
│   └── index.ts            # TypeScript type definitions
└── README.md
```

## 🤝 Contributing

We welcome community contributions! Here's how you can help:

### Adding New Topics

1. Edit `data/crypto-topics.ts`
2. Add your topic to the `topics` array:

```typescript
{
  id: 'your-topic-id',
  name: 'Your Topic Name',
  description: 'Brief description',
  category: 'fundamentals', // or blockchain, defi, development, trading, security
  difficulty: 'Beginner', // or Intermediate, Advanced
  position: { x: 100, y: 100 }, // Position on the mind map
  subtopics: ['related-topic-id'], // Optional: related topics
  resources: [
    {
      id: 'res-id',
      title: 'Resource Title',
      url: 'https://example.com',
      type: 'article', // or video, course, documentation, tutorial, book
      difficulty: 'Beginner',
      description: 'Optional description'
    }
  ]
}
```

### Adding New Categories

1. Edit `data/crypto-topics.ts`
2. Add your category to the `categories` array:

```typescript
{
  id: 'your-category-id',
  name: 'Category Name',
  description: 'Category description',
  color: '#HEX_COLOR' // Color for the category
}
```

### Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🏗️ Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [React Flow](https://reactflow.dev/) - Interactive node-based visualization
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React](https://react.dev/) - UI library

## 📊 Current Content

- **22+ Topics** covering crypto fundamentals to advanced concepts
- **28+ Curated Resources** from trusted sources
- **6 Categories** organizing different areas of crypto
- **3 Difficulty Levels** for progressive learning

### Categories

1. **Fundamentals** - Core crypto concepts and basics
2. **Blockchain Technology** - Understanding the underlying infrastructure
3. **DeFi** - Decentralized Finance protocols and applications
4. **Development** - Building on blockchain platforms
5. **Trading & Economics** - Trading strategies and crypto economics
6. **Security** - Wallet security and best practices

## 🗺️ Roadmap

- [ ] Add more topics and resources
- [ ] Implement search functionality
- [ ] Add user accounts and progress tracking
- [ ] Community voting on resources
- [ ] Learning path recommendations
- [ ] Dark mode
- [ ] Export/import learning paths
- [ ] Resource quality ratings

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by [learn-anything.xyz](https://learn-anything.xyz/)
- Resources curated from leading crypto education platforms
- Built with the amazing [React Flow](https://reactflow.dev/) library

## 📧 Contact

Have questions or suggestions? Feel free to:
- Open an issue
- Submit a pull request
- Reach out to the maintainers

---

**Happy Learning! 🎓**

Start your crypto journey today and explore the fascinating world of blockchain technology!
