import { Tabs } from "antd";

import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyDoctorSurveyDetailSecondTabQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import GeneticsParticipantsQuestionsList from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailQuestions/helper/components/GeneticsParticipantsQuestionsList/GeneticsParticipantsQuestionsList";

import "./_geneticsParticipantsQuestions.scss";

const GeneticsParticipantsDetailQuestions = () => {
  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const { data, isFetching: isDataLoading } = useMyDoctorSurveyDetailSecondTabQuery({
    "survey-id": params?.surveyId,
  });
  //* ================================ Util Functions ================================

  // Sort according to orderId and then map
  const items = [...(data ?? [])]
    .sort((a, b) => a.orderId - b.orderId)
    .map((item) => ({
      label: item.title,
      key: `${item.orderId}`,
      children: <GeneticsParticipantsQuestionsList groupId={item.groupId} />,
    }));

  const activeKey =
    params?.tab && items.some((item) => item.key === params.tab)
      ? params.tab
      : items[0]?.key;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div loading={isDataLoading} className="flex w-full">
      <Tabs
        activeKey={activeKey}
        tabPlacement="start"
        className="genetics-participants-tabs-container w-full"
        items={items}
        onChange={(key) => setSearchParams({ ...params, tab: key })}
      />
    </Div>
  );
};

export default GeneticsParticipantsDetailQuestions;
