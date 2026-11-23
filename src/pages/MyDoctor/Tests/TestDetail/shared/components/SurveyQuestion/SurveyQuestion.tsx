import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import SurveyPoint from "@components/Renderers/SurveyPoint/SurveyPoint";

import { SurveyQuestionProps } from "./@types/@surveyQuestion";
import "./_surveyQuestion.scss";

const SurveyQuestion = ({
  questionTitle,
  questionScore,
  scoreType,
  questionText,
  options,
  selectedIndex,
}: SurveyQuestionProps) => {
  return (
    <div className="survey-question-container">
      <div className="question-point-container">
        <SurveyPoint text={questionTitle} />
        <SurveyPoint text={questionScore} type={scoreType} />
      </div>
      <p className="question-text">{questionText}</p>
      <CustomSegmented options={options} value={options[selectedIndex]} />
    </div>
  );
};

export default SurveyQuestion;
