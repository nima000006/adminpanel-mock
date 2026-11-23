import { useEffect } from "react";

import { Tabs } from "antd";

import Div from "@components/Renderers/Div/Div";
import { useLazyGetMyDoctorTestDetailGroupsManagerQuery } from "@infra/states/redux/Apis/myDoctor/test/testApis";

import MySurveyQuestionsList from "./helper/components/SurveyQuestionsList/SurveyQuestionsList";
import "./_myTestDetailQuestions.scss";

const MyTestDetailQuestions = () => {
  //? ================================  Api Calls ================================
  const [getGroups, { data: groupsData, isFetching: isGroupsDataLoading }] =
    useLazyGetMyDoctorTestDetailGroupsManagerQuery();

  // const { width } = useWindowSize();
  // const isSmallScreen = width < 600;
  //? ================================ Effects ================================
  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Div className="my-test-detail-questions-container" loading={isGroupsDataLoading}>
      <Tabs
        // tabPosition={isSmallScreen ? "top" : "right"}
        tabPosition="right"
        items={groupsData?.map((item) => ({
          label: item.groupTitle,
          key: item.groupId,
          children: <MySurveyQuestionsList groupId={item.groupId} />,
        }))}
        className="test-detail-questions-tabs"
      />
    </Div>
  );
};

export default MyTestDetailQuestions;
