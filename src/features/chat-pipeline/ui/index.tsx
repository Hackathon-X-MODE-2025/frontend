import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    {
        "id": "start",
        "type": "input",
        "position": { "x": 100, "y": 100 },
        "data": {
            "label": "Start",
            "description": "Start of hdfs_to_postgres_main_table pipeline"
        },
        "style": {
            "background": "#10B981",
            "color": "white",
            "border": "2px solid #047857"
        }
    },
    {
        "id": "start_pipeline",
        "type": "default",
        "position": { "x": 300, "y": 100 },
        "data": {
            "label": "start_pipeline",
            "description": "Pipeline control: start_pipeline",
            "operatorType": "DummyOperator"
        },
        "style": {
            "background": "#6B7280",
            "color": "white",
            "border": "2px solid #4B5563",
            "width": 180
        }
    },
    {
        "id": "check_hdfs_files_exist",
        "type": "input",
        "position": { "x": 300, "y": 220 },
        "data": {
            "label": "check_hdfs_files_exist",
            "description": "Wait for HDFS files to be available: check_hdfs_files_exist",
            "operatorType": "HdfsSensor"
        },
        "style": {
            "background": "#3B82F6",
            "color": "white",
            "border": "2px solid #1D4ED8",
            "width": 180
        }
    },
    {
        "id": "create_postgres_table",
        "type": "default",
        "position": { "x": 300, "y": 340 },
        "data": {
            "label": "create_postgres_table",
            "description": "Execute PostgreSQL operation: create_postgres_table",
            "operatorType": "PostgresOperator"
        },
        "style": {
            "background": "#8B5CF6",
            "color": "white",
            "border": "2px solid #7C3AED",
            "width": 180
        }
    },
    {
        "id": "process_and_load_data",
        "type": "default",
        "position": { "x": 300, "y": 460 },
        "data": {
            "label": "process_and_load_data",
            "description": "Run Python function: process_and_load_data",
            "operatorType": "PythonOperator"
        },
        "style": {
            "background": "#F59E0B",
            "color": "white",
            "border": "2px solid #D97706",
            "width": 180
        }
    },
    {
        "id": "validate_loaded_data",
        "type": "default",
        "position": { "x": 300, "y": 580 },
        "data": {
            "label": "validate_loaded_data",
            "description": "Run Python function: validate_loaded_data",
            "operatorType": "PythonOperator"
        },
        "style": {
            "background": "#F59E0B",
            "color": "white",
            "border": "2px solid #D97706",
            "width": 180
        }
    },
    {
        "id": "end_pipeline",
        "type": "default",
        "position": { "x": 300, "y": 700 },
        "data": {
            "label": "end_pipeline",
            "description": "Pipeline control: end_pipeline",
            "operatorType": "DummyOperator"
        },
        "style": {
            "background": "#6B7280",
            "color": "white",
            "border": "2px solid #4B5563",
            "width": 180
        }
    },
    {
        "id": "end",
        "type": "output",
        "position": { "x": 600, "y": 700 },
        "data": {
            "label": "End",
            "description": "End of hdfs_to_postgres_main_table pipeline"
        },
        "style": {
            "background": "#EF4444",
            "color": "white",
            "border": "2px solid #DC2626"
        }
    }
];

const initialEdges = [
    {
        "id": "edge-1",
        "source": "start",
        "target": "start_pipeline",
        "type": "smoothstep",
        "animated": true
    },
    {
        "id": "edge-2",
        "source": "start_pipeline",
        "target": "check_hdfs_files_exist",
        "type": "smoothstep",
        "animated": true
    },
    {
        "id": "edge-3",
        "source": "check_hdfs_files_exist",
        "target": "create_postgres_table",
        "type": "smoothstep",
        "animated": true
    },
    {
        "id": "edge-4",
        "source": "create_postgres_table",
        "target": "process_and_load_data",
        "type": "smoothstep",
        "animated": true
    },
    {
        "id": "edge-5",
        "source": "process_and_load_data",
        "target": "validate_loaded_data",
        "type": "smoothstep",
        "animated": true
    },
    {
        "id": "edge-6",
        "source": "validate_loaded_data",
        "target": "end_pipeline",
        "type": "smoothstep",
        "animated": true
    },
    {
        "id": "edge-7",
        "source": "end_pipeline",
        "target": "end",
        "type": "smoothstep",
        "animated": true
    }
];

export const ChatPipeline = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div className='w-full h-[78vh] 2xl:h-[80vh] border border-white text-black'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </div>
    );
}