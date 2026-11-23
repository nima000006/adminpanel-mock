import { AiOutlineExclamationCircle } from "react-icons/ai";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import TestDetailScoreCard from "../TestDetailScoreCard/TestDetailScoreCard";
import "./_testDetailResultCard.scss";

const TestDetailResultCard = ({
  title,
  tooltipTitle,
  score,
  scoreTitle,
  type,
}: {
  title: string;
  tooltipTitle?: string;
  type: "medium" | "emergency" | "normal" | "default";
  score: number;
  scoreTitle: string;
}) => {
  return (
    <div className="test-detail-result-card-container">
      <div className="title-container">
        <h5 className="title">{title}</h5>
        {tooltipTitle && (
          <CustomTooltip title={tooltipTitle}>
            <AiOutlineExclamationCircle className="icon-class" />
          </CustomTooltip>
        )}
      </div>
      <TestDetailScoreCard score={score} scoreTitle={scoreTitle} type={type} />
    </div>
  );
};

export default TestDetailResultCard;
