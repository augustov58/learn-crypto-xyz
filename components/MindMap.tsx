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

interface MindMapProps {
  topics: Topic[];
  categories: Category[];
  selectedDifficulty: DifficultyLevel | 'All';
  selectedCategory: string | 'All';
}

const nodeTypes = {
  topicNode: TopicNode,
};

export default function MindMap({
  topics,
  categories,
  selectedDifficulty,
  selectedCategory,
}: MindMapProps) {
  // Filter topics based on selected difficulty and category
  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const difficultyMatch =
        selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;
      const categoryMatch =
        selectedCategory === 'All' || topic.category === selectedCategory;
      return difficultyMatch && categoryMatch;
    });
  }, [topics, selectedDifficulty, selectedCategory]);

  // Create nodes from filtered topics
  const initialNodes: Node[] = useMemo(() => {
    return filteredTopics.map((topic) => {
      const category = categories.find((c) => c.id === topic.category);
      return {
        id: topic.id,
        type: 'topicNode',
        position: topic.position || { x: Math.random() * 500, y: Math.random() * 500 },
        data: {
          topic,
          color: category?.color || '#6B7280',
        },
      };
    });
  }, [filteredTopics, categories]);

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
          className="bg-white dark:bg-gray-800 border dark:border-gray-700 hidden md:block"
          style={{
            width: 120,
            height: 80,
          }}
        />
      </ReactFlow>
    </div>
  );
}
