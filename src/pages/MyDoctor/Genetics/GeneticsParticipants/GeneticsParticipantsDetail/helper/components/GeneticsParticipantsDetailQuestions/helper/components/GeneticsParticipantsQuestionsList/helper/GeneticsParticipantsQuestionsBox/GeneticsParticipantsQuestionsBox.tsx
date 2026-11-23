import { myDoctorSurveyDetailQuestionSecondTab } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailQuestions/@types/@geneticsParticipantsDetailQuestions";
import { QuestionType } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailQuestions/helper/components/GeneticsParticipantsQuestionsList/helper/GeneticsParticipantsQuestionsBox/helper/utils";

const GeneticsParticipantsQuestionsBox = ({
  data,
  index,
}: {
  data: myDoctorSurveyDetailQuestionSecondTab;
  index: number;
}) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mb-10! flex flex-col gap-2">
      <div className="bg-neutral-2 border-neutral-5 w-fit rounded-xl border px-4 py-2">
        سوال {index}
      </div>

      <p>{data?.title}</p>

      {data?.answerDto?.map((item) => {
        if (
          data.questionType !== QuestionType.TEXT &&
          data.questionType !== QuestionType.RATING &&
          !item.chosen
        ) {
          return null;
        }

        const answer =
          data.questionType === QuestionType.TEXT
            ? item.answerText
            : data.questionType === QuestionType.RATING
              ? item.answerInt
              : item.title;

        return (
          <div
            key={item.id}
            className="bg-neutral-2 border-neutral-5 mb-3 flex flex-col rounded-xl border px-4 py-2"
          >
            <span className="text-neutral-7">پاسخ کاربر</span>
            <span className="text-primary-6 text-lg">{answer}</span>
          </div>
        );
      })}
    </div>
  );
};

export default GeneticsParticipantsQuestionsBox;
