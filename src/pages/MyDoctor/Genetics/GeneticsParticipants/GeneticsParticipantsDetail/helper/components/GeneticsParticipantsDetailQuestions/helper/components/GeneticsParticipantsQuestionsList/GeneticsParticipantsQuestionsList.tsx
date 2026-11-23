import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useMyDoctorSurveyDetailQuestionSecondTabQuery,
  useMyDoctorSurveyDetailStatusGroupSecondTabQuery,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { statusClasses } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailGeneralProfile/helper/utils";
import GeneticsParticipantsQuestionsBox from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailQuestions/helper/components/GeneticsParticipantsQuestionsList/helper/GeneticsParticipantsQuestionsBox/GeneticsParticipantsQuestionsBox";

const GeneticsParticipantsQuestionsList = ({ groupId }: { groupId?: number }) => {
  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const { data: statusData, isFetching: isLoadingStatusData } =
    useMyDoctorSurveyDetailStatusGroupSecondTabQuery({
      surveyCycleId: params?.id,
      masterGroupId: groupId?.toString() || "",
    });

  const { data: questionData, isFetching: isLoadingQuestionData } =
    useMyDoctorSurveyDetailQuestionSecondTabQuery({
      surveyCycleId: params?.id,
      masterGroupId: groupId?.toString() || "",
    });
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <Div loading={isLoadingStatusData} className="flex flex-col gap-3">
        {statusData?.innerGroupResponseDto ? (
          statusData.innerGroupResponseDto.map((item) => {
            const classes = statusClasses[
              item.statusEmergencyType.toLocaleLowerCase()
            ] ?? {
              bg: "bg-neutral-2!",
              text: "text-neutral-10!",
            };

            return (
              <CustomCard
                key={item.groupId}
                className={`${classes.bg} flex w-full flex-col! items-center! justify-center! border-none!`}
              >
                <p className="text-center">وضعیت ({item?.groupTitle})</p>
                <p className={`${classes.text} text-center`}>{item.statusTitle}</p>
              </CustomCard>
            );
          })
        ) : (
          <CustomEmpty />
        )}
      </Div>

      <Div className="mt-10" loading={isLoadingQuestionData}>
        {questionData ? (
          questionData.map((item, idx) => (
            <GeneticsParticipantsQuestionsBox
              key={item?.id}
              data={item}
              index={idx + 1}
            />
          ))
        ) : (
          <CustomEmpty />
        )}
      </Div>
    </div>
  );
};

export default GeneticsParticipantsQuestionsList;
