import { TestDetailScoreCardProps } from "./@types/@testDetailScoreCard";
import "./_testDetailScoreCard.scss";

const TestDetailScoreCard = ({
  score,
  scoreTitle,
  type,
  scoreMainTitle = "نمره",
}: TestDetailScoreCardProps) => {
  return (
    <div className="test-detail-scored-card-container">
      <div className={`point-container ${type}`}>
        <span className="point">{scoreMainTitle}</span>
        <div className="user-score-container">
          <span className="score">{score?.toString() ? score : "-"}</span>
          <span className="score-title">{scoreTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default TestDetailScoreCard;
