import { useEffect } from "react";

import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyDoctorTestQuestionsDetailManagerQuery } from "@infra/states/redux/Apis/myDoctor/test/testApis";
import SurveyQuestion from "@pages/MyDoctor/Tests/TestDetail/shared/components/SurveyQuestion/SurveyQuestion";
import { SURVEY_STATUS } from "@pages/MyDoctor/Tests/TestDetail/shared/utils";
import "./_surveyQuestionsList.scss";

const MySurveyQuestionsList = ({ groupId }: { groupId: string }) => {
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getQuestionsList, { data: questionsList, isFetching: isQuestionsListLoading }] =
    useLazyGetMyDoctorTestQuestionsDetailManagerQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id && groupId) {
      getQuestionsList({ groupId, userId: id });
    }
  }, [id, groupId]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div className="segment-questions-list-container" loading={isQuestionsListLoading}>
      {questionsList?.map((item, index) => (
        <SurveyQuestion
          questionTitle={`سوال ${item?.questionNumber || index + 1}`}
          questionScore={item?.responseScore?.toString() || "-"}
          questionText={item?.questionText}
          scoreType={SURVEY_STATUS[item?.responseStatus ?? "4"]}
          selectedIndex={item?.answerDtos?.findIndex((answer) => answer?.chosen)}
          options={item?.answerDtos?.map((answer) => answer?.answerText)}
          key={item.questionId}
        />
      ))}
    </Div>
  );
};

export default MySurveyQuestionsList;
