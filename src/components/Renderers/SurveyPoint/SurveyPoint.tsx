import { SurveyPointProps } from "./@types/@surveyPoint";
import "./_surveyPoint.scss";

const SurveyPoint = ({ type = "default", text }: SurveyPointProps) => {
  return (
    <div className="survey-point-container">
      <div className={`survey-point ${type}`}>
        <span className={`text ${type}-text`}>{text}</span>
      </div>
    </div>
  );
};

export default SurveyPoint;
