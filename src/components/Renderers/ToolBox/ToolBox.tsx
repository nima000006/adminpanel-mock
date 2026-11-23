import { ReactNode } from "react";
import "./_toolbox.scss";

type ToolBoxProps = {
  leftSide?: ReactNode;
  rightSide?: ReactNode;
  centerSide?: ReactNode;
  className?: string;
};
const ToolBox = ({ leftSide, rightSide, centerSide, className }: ToolBoxProps) => {
  return (
    <div className={`toolbox-container ${className ? className : ""}`}>
      <div className="right-side">{rightSide}</div>
      <div className="center-side">{centerSide}</div>
      <div className="left-side">{leftSide}</div>
    </div>
  );
};

export default ToolBox;
