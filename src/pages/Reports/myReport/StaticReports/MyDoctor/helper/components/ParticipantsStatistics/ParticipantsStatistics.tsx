import { ParticipantsStatisticsProps } from "./@types/@participantsStatistics";
import ParticipantsStatisticsChart from "./helper/components/ParticipantsStatisticsChart/ParticipantsStatisticsChart";
import TestParticipants from "./helper/components/TestParticipants/TestParticipants";

const ParticipantsStatistics = ({
  createBodyParams,
  serviceDetailData,
  triggerItems,
  isFormValid,
  validateData,
}: ParticipantsStatisticsProps) => {
  return (
    <div className="flex flex-col gap-6 pb-10!">
      <TestParticipants
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        serviceDetailData={serviceDetailData}
      />
      {/* LINE CHART */}
      <ParticipantsStatisticsChart
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        serviceDetailData={serviceDetailData}
        triggerItems={triggerItems}
        validateData={validateData}
      />
    </div>
  );
};

export default ParticipantsStatistics;
