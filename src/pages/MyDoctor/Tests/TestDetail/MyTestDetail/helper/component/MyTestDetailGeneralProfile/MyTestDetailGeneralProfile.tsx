import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomChartWrapper from "@components/Renderers/CustomChartWrapper/CustomChartWrapper";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyDoctorTestGeneralDetailManagerQuery } from "@infra/states/redux/Apis/myDoctor/test/testApis";
import TestDetailResultCard from "@pages/MyDoctor/Tests/TestDetail/shared/components/TestDetailResultCard/TestDetailResultCard";
import TestDetailScoreCard from "@pages/MyDoctor/Tests/TestDetail/shared/components/TestDetailScoreCard/TestDetailScoreCard";
import { testDetailGeneralProfileListDataSourceType } from "@pages/MyDoctor/Tests/TestDetail/shared/models/TestDetailGeneralProfileList/@types/@testDetailGeneralProfileListTableModel";
import { TestDetailGeneralProfileListTableModel } from "@pages/MyDoctor/Tests/TestDetail/shared/models/TestDetailGeneralProfileList/TestDetailGeneralProfileListTableModel";
import { testDetailGeneralProfileListDataSource } from "@pages/MyDoctor/Tests/TestDetail/shared/models/testDetailGeneralProfileListDataSource";
import {
  SURVEY_STATUS,
  SURVEY_TEXT,
} from "@pages/MyDoctor/Tests/TestDetail/shared/utils";

import {
  GetMyDoctorTestGeneralDetailManagerResponse,
  MyChartDataType,
  MyDoctorTestGeneralDetailDataManager,
} from "./@types/@myTestDetailGeneralProfile";
import "./_myTestDetailGeneralProfile.scss";

const createChartData = (value: MyDoctorTestGeneralDetailDataManager[]) => {
  const labels: string[] = [];
  const data: number[] = [];

  value?.forEach((item) => {
    labels.push(item.groupTitle);
    data.push(item?.groupScore);
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  return chartData;
};

const MyTestDetailGeneralProfile = () => {
  const [ghqChartData, setGhqChartData] = useState<MyChartDataType | null>(null);
  const [otherChartData, setOtherChartData] = useState<MyChartDataType | null>(null);

  const {
    params: { id },
  } = useQueryParams();

  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

  //? ================================  Api Calls ================================
  const [getDetail, { data: generalData, isFetching: isDataLoading }] =
    useLazyGetMyDoctorTestGeneralDetailManagerQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDetail(id).unwrap().then(getDetailDataSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDetailDataSuccess = async (
    value: GetMyDoctorTestGeneralDetailManagerResponse
  ) => {
    if (value) {
      const ghqChartData = createChartData(value?.ghqData);
      setGhqChartData(ghqChartData);

      const otherChartData = createChartData(value?.otherData);
      setOtherChartData(otherChartData);
    }
  };

  return (
    <Div className="my-test-detail-general-profile-container" loading={isDataLoading}>
      <div className="general-profile-section">
        <h5 className="title">میل به خودکشی</h5>
        <TestDetailScoreCard
          score={generalData?.suicideData?.[0]?.groupScore}
          scoreTitle={SURVEY_TEXT[generalData?.suicideData?.[0]?.surveyStatusType ?? "4"]}
          type={SURVEY_STATUS[generalData?.suicideData?.[0]?.surveyStatusType ?? "4"]}
        />
      </div>

      <div className="result-section">
        <h3 className="result-title">نتایج آزمون GHQ</h3>
        <TestDetailScoreCard
          score={generalData?.statusTotalScore}
          scoreMainTitle="نمره کل آزمون GHQ"
          scoreTitle={SURVEY_TEXT[generalData?.surveyStatusType ?? "4"]}
          type={SURVEY_STATUS[generalData?.surveyStatusType ?? "4"]}
        />

        <div className="chart-container">
          {ghqChartData && <CustomChartWrapper type="radar" data={ghqChartData} />}
        </div>

        <Row gutter={[16, 16]} className="result-card-container">
          {generalData?.ghqData?.map((item) => (
            <Col lg={12} md={12} sm={24} xs={24} key={item?.groupId}>
              <TestDetailResultCard
                title={item.groupTitle}
                score={item?.groupScore}
                scoreTitle={SURVEY_TEXT[item?.surveyStatusType ?? "4"]}
                // Todo[Atefeh]: uncomment when api got ready
                // tooltipTitle="بررسی وضعیت سلامت جسمانی و علائمی مانند احساس بیماری، سردرد، ضعف و فشار سر"
                type={SURVEY_STATUS[item?.surveyStatusType ?? "4"]}
              />
            </Col>
          ))}
        </Row>
      </div>

      <div className="result-section">
        <h3 className="result-title">نتایج سایر محور‌های پرسشنامه</h3>

        <div className="chart-container">
          {otherChartData && <CustomChartWrapper type="radar" data={otherChartData} />}
        </div>

        <Row gutter={[16, 16]} className="result-card-container">
          {generalData?.otherData?.map((item) => (
            <Col lg={12} md={12} sm={24} xs={24} key={item?.groupId}>
              <TestDetailResultCard
                title={item.groupTitle}
                score={item?.groupScore}
                scoreTitle={SURVEY_TEXT[item?.surveyStatusType ?? "4"]}
                type={SURVEY_STATUS[item?.surveyStatusType ?? "4"]}
              />
            </Col>
          ))}
        </Row>
      </div>

      <div className="table-container">
        <div>
          <CustomDivider text="راهنمای اقدامات جهت پیگیری" className="divider-break" />
          <CustomTable<testDetailGeneralProfileListDataSourceType>
            dataSource={testDetailGeneralProfileListDataSource}
            columns={TestDetailGeneralProfileListTableModel}
            rowKey="id"
            pagination={false}
            className="test-detail-general-profile-list-table"
            {...TABLE_PROPS(testDetailGeneralProfileListDataSource?.length)}
          />
        </div>
        <CustomAlert
          message="نمره کل GHQ"
          description="نمره بین 41 تا 60 نیازمند پیگیری و نمره بالای 61 نیازمند پیگیری فوری می‌باشد."
          type="warning"
          showIcon
        />
        <CustomAlert
          message="میل به خودکشی"
          description={
            <>
              <p>
                در صورتی که دانشجو در یکی از سوالات ۲۶ یا ۲۹ گزینه “بله قطعاً” را انتخاب
                کند “نیازمند پیگیری فوری” می‌باشد.
              </p>
              <p>
                درصورتی که دانشجو در یکی از سوالات 26 یا 29 گزینه “به ذهنم خطور کرده” را
                انتخاب کند “ نیازمند پیگیری” می‌باشد.
              </p>
            </>
          }
          type="warning"
          showIcon
        />
      </div>
    </Div>
  );
};

export default MyTestDetailGeneralProfile;
