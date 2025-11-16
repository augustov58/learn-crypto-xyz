# Contributing to Learn Crypto 🤝

Thank you for your interest in contributing to Learn Crypto! This document provides guidelines for contributing to the project.

## How to Contribute

There are many ways to contribute to this project:

1. **Add new topics** - Share your knowledge by adding new crypto topics
2. **Add resources** - Contribute high-quality learning materials
3. **Improve documentation** - Help make the docs clearer and more comprehensive
4. **Report bugs** - Let us know about any issues you find
5. **Suggest features** - Share ideas for new features
6. **Fix bugs** - Help resolve existing issues

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your contribution
4. Make your changes
5. Test your changes
6. Commit and push
7. Create a Pull Request

## Adding New Topics

Topics are defined in `data/crypto-topics.ts`. Each topic should include:

### Topic Structure

```typescript
{
  id: 'unique-topic-id',           // Unique identifier (kebab-case)
  name: 'Topic Name',              // Display name
  description: 'Brief description', // Short description (1-2 sentences)
  category: 'category-id',         // One of the existing categories
  difficulty: 'Beginner',          // Beginner | Intermediate | Advanced
  position: { x: 100, y: 100 },   // Position on mind map
  subtopics: ['related-id'],       // Optional: related topic IDs
  resources: [...]                 // Array of learning resources
}
```

### Guidelines for Topics

- **Unique ID**: Use lowercase with hyphens (e.g., `nft-basics`)
- **Clear Name**: Use title case and be specific
- **Concise Description**: 1-2 sentences explaining what the topic covers
- **Appropriate Category**: Choose from existing categories
- **Accurate Difficulty**: Be honest about the complexity level
- **Thoughtful Position**: Place related topics near each other on the map
- **Relevant Subtopics**: Link to closely related topics (not too many!)

## Adding New Resources

Each topic should have quality resources. Resource structure:

```typescript
{
  id: 'res-unique-id',
  title: 'Resource Title',
  url: 'https://example.com',
  type: 'article',                 // See types below
  difficulty: 'Beginner',
  description: 'Optional description'
}
```

### Resource Types

- `article` - Blog posts, guides, articles
- `video` - YouTube videos, video tutorials
- `course` - Full courses (free or paid)
- `documentation` - Official documentation
- `tutorial` - Step-by-step tutorials
- `book` - Books and ebooks

### Guidelines for Resources

- **Quality over Quantity**: 3-5 high-quality resources per topic
- **Variety**: Mix different types (articles, videos, tutorials)
- **Accessibility**: Prefer free resources when possible
- **Authority**: Use reputable sources
- **Up-to-date**: Ensure content is current
- **Beginner-Friendly**: Include at least one beginner resource per topic

### Trusted Sources

Examples of high-quality sources:
- Official documentation (ethereum.org, bitcoin.org, etc.)
- Established educational platforms (Binance Academy, Coinbase Learn)
- Reputable crypto media (CoinDesk, CoinTelegraph)
- Developer resources (GitHub, Web3.js docs)
- Well-known YouTube educators

## Adding New Categories

Categories help organize topics. Add them to `data/crypto-topics.ts`:

```typescript
{
  id: 'category-id',
  name: 'Category Name',
  description: 'What this category covers',
  color: '#3B82F6'  // Hex color for visual distinction
}
```

### Category Guidelines

- **Broad Enough**: Should contain multiple topics
- **Distinct**: Clearly different from other categories
- **Descriptive Name**: Clear and professional
- **Unique Color**: Choose a color not already in use

### Recommended Colors

- Use bright, vibrant colors
- Ensure good contrast with white/light backgrounds
- Consider color-blind friendly palettes
- Examples: `#3B82F6` (blue), `#10B981` (green), `#F59E0B` (amber)

## Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and reusable

## Testing Your Changes

Before submitting:

1. **Build the project**: `npm run build`
2. **Check for errors**: Fix any TypeScript or build errors
3. **Test locally**: `npm run dev` and verify changes
4. **Check all links**: Ensure resource URLs work
5. **Test filters**: Verify difficulty and category filters work

## Pull Request Guidelines

### Before Submitting

- [ ] Code builds without errors
- [ ] All links are valid and working
- [ ] Changes are tested locally
- [ ] Follows existing code style
- [ ] Commit messages are clear

### PR Description Template

```markdown
## Description
Brief description of what this PR adds/changes

## Type of Change
- [ ] New topic(s)
- [ ] New resource(s)
- [ ] New category
- [ ] Bug fix
- [ ] Documentation update
- [ ] Other (please describe)

## Topics/Resources Added
- Topic 1: Brief description
- Resource: Link to resource

## Checklist
- [ ] Tested locally
- [ ] All links work
- [ ] Follows contribution guidelines
- [ ] Updated relevant documentation
```

## Content Guidelines

### Writing Style

- **Clear and Concise**: Use simple, straightforward language
- **Accurate**: Ensure technical accuracy
- **Neutral Tone**: Avoid promotional language
- **Inclusive**: Use inclusive language

### Resource Quality Criteria

Resources should be:
- **Accurate**: Technically correct and up-to-date
- **Accessible**: Free or reasonably priced
- **Well-Structured**: Easy to follow and understand
- **Comprehensive**: Cover the topic thoroughly
- **Safe**: No malware, phishing, or scams

### What NOT to Include

- Promotional content or sponsored links
- Outdated resources (check publish dates)
- Paywalled content (unless exceptionally valuable)
- Scam sites or pump-and-dump schemes
- Resources promoting specific coins/tokens
- Gambling or highly speculative trading advice

## Community Standards

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- No harassment or discrimination
- Keep discussions professional

### Communication

- Use clear, descriptive issue titles
- Provide context in discussions
- Be patient with reviewers
- Accept feedback gracefully
- Help others when you can

## Questions?

If you have questions:
- Check existing issues and PRs
- Read the README thoroughly
- Open an issue for discussion
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for helping make Learn Crypto better! 🚀
