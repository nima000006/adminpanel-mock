import { Node, ReactFlow } from "@xyflow/react";

export type EdgeType = {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  hidden?: boolean;
  selected?: boolean;
  deletable?: boolean;
  data?: Record<string, unknown>;
  markerEnd?: string;
  sourceHandle?: string;
  targetHandle?: string;
}[];

export type CustomReactFlowProps = {
  fitView?: boolean;
  initialNodes: Node[];
  initialEdges: EdgeType;
} & React.ComponentProps<typeof ReactFlow>;

export type CustomLayoutFlowProps = {
  initialNodes: Node[];
  initialEdges: EdgeType;
};
