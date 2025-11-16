import { Topic, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'fundamentals',
    name: 'Fundamentals',
    description: 'Core concepts and basics of cryptocurrency',
    color: '#3B82F6', // blue
  },
  {
    id: 'blockchain',
    name: 'Blockchain Technology',
    description: 'Understanding blockchain infrastructure',
    color: '#8B5CF6', // purple
  },
  {
    id: 'defi',
    name: 'DeFi',
    description: 'Decentralized Finance protocols and applications',
    color: '#10B981', // green
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Building on blockchain platforms',
    color: '#F59E0B', // amber
  },
  {
    id: 'trading',
    name: 'Trading & Economics',
    description: 'Trading strategies and crypto economics',
    color: '#EF4444', // red
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Wallet security and best practices',
    color: '#EC4899', // pink
  },
];

export const topics: Topic[] = [
  // Fundamentals
  {
    id: 'crypto-basics',
    name: 'Cryptocurrency Basics',
    description: 'What is cryptocurrency and how does it work',
    category: 'fundamentals',
    difficulty: 'Beginner',
    position: { x: 250, y: 100 },
    subtopics: ['bitcoin-basics', 'wallets'],
    resources: [
      {
        id: 'res-1',
        title: 'What is Cryptocurrency?',
        url: 'https://www.coinbase.com/learn/crypto-basics/what-is-cryptocurrency',
        type: 'article',
        difficulty: 'Beginner',
        description: 'Introduction to cryptocurrency fundamentals',
      },
      {
        id: 'res-2',
        title: 'Cryptocurrency Explained',
        url: 'https://www.youtube.com/watch?v=1YyAzVmP9xQ',
        type: 'video',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'bitcoin-basics',
    name: 'Bitcoin Fundamentals',
    description: 'Understanding Bitcoin, the first cryptocurrency',
    category: 'fundamentals',
    difficulty: 'Beginner',
    position: { x: 100, y: 250 },
    subtopics: ['mining', 'blockchain-basics'],
    resources: [
      {
        id: 'res-3',
        title: 'Bitcoin Whitepaper',
        url: 'https://bitcoin.org/bitcoin.pdf',
        type: 'documentation',
        difficulty: 'Intermediate',
        description: 'Original Bitcoin paper by Satoshi Nakamoto',
      },
      {
        id: 'res-4',
        title: 'How Bitcoin Works',
        url: 'https://www.bitcoin.com/get-started/how-bitcoin-works/',
        type: 'article',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'wallets',
    name: 'Crypto Wallets',
    description: 'Storing and managing your cryptocurrency',
    category: 'fundamentals',
    difficulty: 'Beginner',
    position: { x: 400, y: 250 },
    subtopics: ['security-basics'],
    resources: [
      {
        id: 'res-5',
        title: 'Crypto Wallet Guide',
        url: 'https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet',
        type: 'article',
        difficulty: 'Beginner',
      },
      {
        id: 'res-6',
        title: 'Hardware vs Software Wallets',
        url: 'https://www.ledger.com/academy/hardware-wallets-and-cold-wallets-whats-the-difference',
        type: 'article',
        difficulty: 'Beginner',
      },
    ],
  },

  // Blockchain Technology
  {
    id: 'blockchain-basics',
    name: 'Blockchain Fundamentals',
    description: 'How blockchain technology works',
    category: 'blockchain',
    difficulty: 'Beginner',
    position: { x: 100, y: 400 },
    subtopics: ['consensus', 'smart-contracts'],
    resources: [
      {
        id: 'res-7',
        title: 'Blockchain Explained',
        url: 'https://www.ibm.com/topics/blockchain',
        type: 'article',
        difficulty: 'Beginner',
      },
      {
        id: 'res-8',
        title: 'How Blockchain Works (Visual Demo)',
        url: 'https://andersbrownworth.com/blockchain/',
        type: 'tutorial',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'consensus',
    name: 'Consensus Mechanisms',
    description: 'PoW, PoS, and other consensus algorithms',
    category: 'blockchain',
    difficulty: 'Intermediate',
    position: { x: 250, y: 500 },
    subtopics: ['mining'],
    resources: [
      {
        id: 'res-9',
        title: 'Proof of Work vs Proof of Stake',
        url: 'https://ethereum.org/en/developers/docs/consensus-mechanisms/',
        type: 'documentation',
        difficulty: 'Intermediate',
      },
      {
        id: 'res-10',
        title: 'Consensus Algorithms Explained',
        url: 'https://www.youtube.com/watch?v=ojxfbN78WFQ',
        type: 'video',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'mining',
    name: 'Cryptocurrency Mining',
    description: 'Understanding crypto mining and validators',
    category: 'blockchain',
    difficulty: 'Intermediate',
    position: { x: 400, y: 500 },
    resources: [
      {
        id: 'res-11',
        title: 'What is Crypto Mining?',
        url: 'https://www.investopedia.com/tech/how-does-bitcoin-mining-work/',
        type: 'article',
        difficulty: 'Beginner',
      },
    ],
  },

  // Smart Contracts & Development
  {
    id: 'smart-contracts',
    name: 'Smart Contracts',
    description: 'Self-executing contracts on blockchain',
    category: 'development',
    difficulty: 'Intermediate',
    position: { x: 650, y: 100 },
    subtopics: ['ethereum', 'solidity'],
    resources: [
      {
        id: 'res-12',
        title: 'Smart Contracts Introduction',
        url: 'https://ethereum.org/en/smart-contracts/',
        type: 'documentation',
        difficulty: 'Intermediate',
      },
      {
        id: 'res-13',
        title: 'Smart Contracts Explained',
        url: 'https://www.youtube.com/watch?v=ZE2HxTmxfrI',
        type: 'video',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    description: 'The leading smart contract platform',
    category: 'development',
    difficulty: 'Intermediate',
    position: { x: 800, y: 250 },
    subtopics: ['solidity', 'defi-basics', 'erc20'],
    resources: [
      {
        id: 'res-14',
        title: 'Ethereum.org Documentation',
        url: 'https://ethereum.org/en/developers/docs/',
        type: 'documentation',
        difficulty: 'Intermediate',
      },
      {
        id: 'res-15',
        title: 'Ethereum Whitepaper',
        url: 'https://ethereum.org/en/whitepaper/',
        type: 'documentation',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'solidity',
    name: 'Solidity Programming',
    description: 'Writing smart contracts in Solidity',
    category: 'development',
    difficulty: 'Advanced',
    position: { x: 950, y: 400 },
    subtopics: ['web3-dev'],
    resources: [
      {
        id: 'res-16',
        title: 'Solidity Documentation',
        url: 'https://docs.soliditylang.org/',
        type: 'documentation',
        difficulty: 'Advanced',
      },
      {
        id: 'res-17',
        title: 'CryptoZombies - Learn Solidity',
        url: 'https://cryptozombies.io/',
        type: 'tutorial',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'web3-dev',
    name: 'Web3 Development',
    description: 'Building decentralized applications',
    category: 'development',
    difficulty: 'Advanced',
    position: { x: 950, y: 550 },
    resources: [
      {
        id: 'res-18',
        title: 'Web3.js Documentation',
        url: 'https://web3js.readthedocs.io/',
        type: 'documentation',
        difficulty: 'Advanced',
      },
      {
        id: 'res-19',
        title: 'Build Your First dApp',
        url: 'https://www.youtube.com/watch?v=coQ5dg8wM2o',
        type: 'video',
        difficulty: 'Advanced',
      },
    ],
  },

  // DeFi
  {
    id: 'defi-basics',
    name: 'DeFi Fundamentals',
    description: 'Introduction to Decentralized Finance',
    category: 'defi',
    difficulty: 'Beginner',
    position: { x: 650, y: 650 },
    subtopics: ['dex', 'lending', 'stablecoins'],
    resources: [
      {
        id: 'res-20',
        title: 'What is DeFi?',
        url: 'https://ethereum.org/en/defi/',
        type: 'article',
        difficulty: 'Beginner',
      },
      {
        id: 'res-21',
        title: 'DeFi Explained',
        url: 'https://www.youtube.com/watch?v=k9HYC0EJU6E',
        type: 'video',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'dex',
    name: 'Decentralized Exchanges',
    description: 'Understanding DEXs and AMMs',
    category: 'defi',
    difficulty: 'Intermediate',
    position: { x: 500, y: 750 },
    resources: [
      {
        id: 'res-22',
        title: 'How Uniswap Works',
        url: 'https://docs.uniswap.org/concepts/overview',
        type: 'documentation',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'lending',
    name: 'DeFi Lending & Borrowing',
    description: 'Lending protocols like Aave and Compound',
    category: 'defi',
    difficulty: 'Intermediate',
    position: { x: 650, y: 800 },
    resources: [
      {
        id: 'res-23',
        title: 'DeFi Lending Explained',
        url: 'https://chain.link/education-hub/defi-lending',
        type: 'article',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'stablecoins',
    name: 'Stablecoins',
    description: 'Price-stable cryptocurrencies',
    category: 'defi',
    difficulty: 'Intermediate',
    position: { x: 800, y: 750 },
    resources: [
      {
        id: 'res-24',
        title: 'What are Stablecoins?',
        url: 'https://www.coinbase.com/learn/crypto-basics/what-is-a-stablecoin',
        type: 'article',
        difficulty: 'Beginner',
      },
    ],
  },

  // Trading & Economics
  {
    id: 'trading-basics',
    name: 'Crypto Trading Basics',
    description: 'Introduction to cryptocurrency trading',
    category: 'trading',
    difficulty: 'Beginner',
    position: { x: 250, y: 650 },
    subtopics: ['technical-analysis'],
    resources: [
      {
        id: 'res-25',
        title: 'Crypto Trading for Beginners',
        url: 'https://www.binance.com/en/blog/learn/crypto-trading-for-beginners-421499824684900429',
        type: 'article',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'technical-analysis',
    name: 'Technical Analysis',
    description: 'Chart patterns and trading indicators',
    category: 'trading',
    difficulty: 'Intermediate',
    position: { x: 250, y: 800 },
    resources: [
      {
        id: 'res-26',
        title: 'Technical Analysis Guide',
        url: 'https://academy.binance.com/en/articles/a-beginners-guide-to-technical-analysis',
        type: 'article',
        difficulty: 'Intermediate',
      },
    ],
  },

  // Security
  {
    id: 'security-basics',
    name: 'Crypto Security',
    description: 'Best practices for securing your crypto',
    category: 'security',
    difficulty: 'Beginner',
    position: { x: 400, y: 400 },
    resources: [
      {
        id: 'res-27',
        title: 'Crypto Security Guide',
        url: 'https://www.ledger.com/academy/security',
        type: 'article',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'erc20',
    name: 'ERC-20 Tokens',
    description: 'Understanding token standards',
    category: 'development',
    difficulty: 'Intermediate',
    position: { x: 800, y: 400 },
    resources: [
      {
        id: 'res-28',
        title: 'ERC-20 Token Standard',
        url: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-20/',
        type: 'documentation',
        difficulty: 'Intermediate',
      },
    ],
  },
];
