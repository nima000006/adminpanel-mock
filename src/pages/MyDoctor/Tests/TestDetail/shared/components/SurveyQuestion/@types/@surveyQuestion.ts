export type SurveyQuestionProps = {
  questionTitle: string;
  questionScore: number | string;
  scoreType: "default" | "normal" | "medium" | "emergency";
  questionText: string;
  options: string[];
  selectedIndex: number;
};
