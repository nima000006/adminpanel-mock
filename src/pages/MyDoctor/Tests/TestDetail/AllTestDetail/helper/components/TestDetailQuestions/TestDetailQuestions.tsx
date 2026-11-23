import { useEffect } from "react";

import { Tabs } from "antd";

import Div from "@components/Renderers/Div/Div";
import { useLazyGetMyDoctorTestDetailGroupsQuery } from "@infra/states/redux/Apis/myDoctor/test/testApis";

import AllSurveyQuestionsList from "./helper/components/SurveyQuestionsList/SurveyQuestionsList";
import "./_testDetailQuestions.scss";

const AllTestDetailQuestions = () => {
  //? ================================  Api Calls ================================
  const [getGroups, { data: groupsData, isFetching: isGroupsDataLoading }] =
    useLazyGetMyDoctorTestDetailGroupsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Div className="all-test-detail-questions-container" loading={isGroupsDataLoading}>
      <Tabs
        tabPosition="right"
        items={groupsData?.map((item) => ({
          label: item.groupTitle,
          key: item.groupId,
          children: <AllSurveyQuestionsList groupId={item.groupId} />,
        }))}
        className="test-detail-questions-tabs"
      />
    </Div>
  );
};

export default AllTestDetailQuestions;
