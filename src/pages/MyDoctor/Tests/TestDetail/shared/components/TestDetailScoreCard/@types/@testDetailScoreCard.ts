export type TestDetailScoreCardProps = {
  score: number | undefined;
  scoreTitle: string;
  type: "default" | "medium" | "emergency" | "normal";
  scoreMainTitle?: string;
};
