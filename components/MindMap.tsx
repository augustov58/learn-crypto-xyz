'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Connection,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Topic, Category, DifficultyLevel } from '@/types';
import TopicNode from './TopicNode';

const GRID_COLUMNS = 5;
const GRID_ROWS = 5;
const GRID_SPACING = 220;
const FALLBACK_OFFSET = 35;

const fallbackPositionCache = new Map<string, { x: number; y: number }>();

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getDeterministicPosition(topicId: string) {
  if (fallbackPositionCache.has(topicId)) {
    return fallbackPositionCache.get(topicId)!;
  }

  const hash = hashString(topicId);
  const column = hash % GRID_COLUMNS;
  const row = Math.floor(hash / GRID_COLUMNS) % GRID_ROWS;
  const xOffset = hash % FALLBACK_OFFSET;
  const yOffset = (hash >> 3) % FALLBACK_OFFSET;

  const position = {
    x: column * GRID_SPACING + xOffset,
    y: row * GRID_SPACING + yOffset,
  };

  fallbackPositionCache.set(topicId, position);
  return position;
}

interface MindMapProps {
  topics: Topic[];
  categories: Category[];
  selectedDifficulty: DifficultyLevel | 'All';
  selectedCategory: string | 'All';
  searchQuery?: string;
  highlightedTopicId?: string;
}

const nodeTypes = {
  topicNode: TopicNode,
};

export default function MindMap({
  topics,
  categories,
  selectedDifficulty,
  selectedCategory,
  searchQuery = '',
  highlightedTopicId,
}: MindMapProps) {
  // Filter topics based on selected difficulty, category, and search query
  const filteredTopics = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return topics.filter((topic) => {
      const difficultyMatch =
        selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;
      const categoryMatch =
        selectedCategory === 'All' || topic.category === selectedCategory;
      
      // Search query matching
      let searchMatch = true;
      if (query) {
        searchMatch =
          topic.name.toLowerCase().includes(query) ||
          topic.description.toLowerCase().includes(query) ||
          topic.resources.some(
            (r) =>
              r.title.toLowerCase().includes(query) ||
              r.description?.toLowerCase().includes(query) ||
              r.tags?.some((tag) => tag.toLowerCase().includes(query))
          ) ||
          categories.find((c) => c.id === topic.category)?.name.toLowerCase().includes(query);
      }
      
      return difficultyMatch && categoryMatch && searchMatch;
    });
  }, [topics, selectedDifficulty, selectedCategory, searchQuery, categories]);

  // Create nodes from filtered topics
  const initialNodes: Node[] = useMemo(() => {
    return filteredTopics.map((topic) => {
      const category = categories.find((c) => c.id === topic.category);
      const isHighlighted = highlightedTopicId === topic.id;
      return {
        id: topic.id,
        type: 'topicNode',
        position: topic.position || getDeterministicPosition(topic.id),
        data: {
          topic,
          color: category?.color || '#6B7280',
          highlighted: isHighlighted,
        },
        style: isHighlighted
          ? {
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))',
              zIndex: 10,
            }
          : undefined,
      };
    });
  }, [filteredTopics, categories, highlightedTopicId]);

  // Create edges from subtopic relationships
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    filteredTopics.forEach((topic) => {
      topic.subtopics?.forEach((subtopicId) => {
        // Only create edge if both source and target are in filtered topics
        if (filteredTopics.some((t) => t.id === subtopicId)) {
          edges.push({
            id: `${topic.id}-${subtopicId}`,
            source: topic.id,
            target: subtopicId,
            animated: true,
            style: { stroke: '#94A3B8', strokeWidth: 2 },
          });
        }
      });
    });
    return edges;
  }, [filteredTopics]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Update nodes and edges when filters change
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent w-12 h-12 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading mind map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          className="bg-gray-50 dark:bg-gray-900"
        />
        <Controls className="bg-white dark:bg-gray-800 border dark:border-gray-700" />
        <MiniMap
          nodeColor={(node) => {
            return (node.data as { color: string }).color || '#6B7280';
          }}
          className="bg-white dark:bg-gray-800 border dark:border-gray-700"
          style={{
            width: 'clamp(100px, 15vw, 150px)',
            height: 'clamp(80px, 12vw, 120px)',
          }}
        />
      </ReactFlow>
    </div>
  );
}
