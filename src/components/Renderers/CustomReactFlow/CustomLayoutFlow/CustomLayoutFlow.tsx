import { useCallback, useEffect } from "react";

import Dagre from "@dagrejs/dagre";
import {
  Background,
  Controls,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import { CustomLayoutFlowProps, EdgeType } from "../@types/@customReactFlow";

const getLayoutedElements = (nodes: Node[], edges: EdgeType, direction: string) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const CustomLayoutFlow = ({ initialNodes, initialEdges }: CustomLayoutFlowProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Automatically layout the nodes vertically on initial render
  const layoutNodes = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges, "TB"); // 'TB' = Top-Bottom for vertical layout

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);

    // Fit the graph to the view after layout
    // window.requestAnimationFrame(() => {
    //   fitView();
    // });
  }, [nodes, edges]);

  // Run the layout logic once when the component mounts
  useEffect(() => {
    layoutNodes();
  }, [nodes, edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView={false}
      proOptions={{ hideAttribution: true }} // This removes the "React Flow" watermark
    >
      {/* <MiniMap /> */}
      <Controls />
      <Background />
    </ReactFlow>
  );
};
export default CustomLayoutFlow;
