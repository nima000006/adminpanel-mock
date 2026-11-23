import { ReactFlowProvider } from "@xyflow/react";

import { CustomReactFlowProps } from "./@types/@customReactFlow";
import "@xyflow/react/dist/style.css";
import "./_customReactFlow.scss";
import CustomLayoutFlow from "./CustomLayoutFlow/CustomLayoutFlow";

const CustomReactFlow = ({
  initialNodes,
  initialEdges,
  ...props
}: CustomReactFlowProps) => {
  return (
    <div className="custom-rf-container">
      <ReactFlowProvider>
        <CustomLayoutFlow
          initialEdges={initialEdges}
          initialNodes={initialNodes}
          {...props}
        />
        {/* <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={handleEdgesChange} // Disable edge changes
          onConnect={onConnect} // Disable edge connections
          fitView={fitView}
          {...props}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow> */}
      </ReactFlowProvider>
    </div>
  );
};

export default CustomReactFlow;
