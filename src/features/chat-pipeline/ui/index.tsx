import React, { useState, useCallback, useEffect } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Position,
    useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { graphlib, layout } from "@dagrejs/dagre";

const dagreGraph = new graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 50;

const getLayoutedElements = (nodes: any, edges: any, direction: 'LR' | 'TB' = 'LR') => {
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node: any) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge: any) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    layout(dagreGraph);

    const isHorizontal = direction === 'LR';

    const layoutedNodes = nodes.map((node: any) => {
        const { x, y } = dagreGraph.node(node.id);

        return {
            ...node,
            position: { x, y },
            targetPosition: isHorizontal ? Position.Left : Position.Top,
            sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        };
    });

    return { nodes: layoutedNodes, edges };
};

const ChatPipelineInner: React.FC<any> = ({ nodes: n, edges: e }) => {
    const [nodes, setNodes] = useState(n);
    const [edges, setEdges] = useState(e);
    const { fitView } = useReactFlow();

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(n, e, 'LR');
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        // Центрируем граф после рендера
        setTimeout(() => {
            fitView({ padding: 0.2 });
        }, 0);
    }, [n, e]);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((ns: any) => applyNodeChanges(changes, ns)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((es: any) => applyEdgeChanges(changes, es)),
        [],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((es: any) => addEdge(params, es)),
        [],
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            fitView
        />
    );
};

export const ChatPipeline: React.FC<any> = ({ nodes, edges }) => {
    return (
        <div className="w-full h-[40vh] 2xl:h-[30vh] border border-secondary rounded-[10px] text-black">
            <ReactFlowProvider>
                <ChatPipelineInner nodes={nodes} edges={edges} />
            </ReactFlowProvider>
        </div>
    );
};
