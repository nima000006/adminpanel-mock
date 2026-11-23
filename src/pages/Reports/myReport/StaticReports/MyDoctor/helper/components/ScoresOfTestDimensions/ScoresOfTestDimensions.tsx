import { useEffect, useState, useCallback } from "react";

import { Col, Form, Row } from "antd";
import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import {
  ScoresOfTestDimensionsChartDataItem,
  MyReportDetailsResponse,
  ReportDetailDto,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { ScoresOfTestDimensionsProps } from "./@types/@scoresOfTestDimensions";

const BAR_CHART_STATUS_TITLE: Record<number, string> = {
  1: "نرمال",
  2: "نیازمند پیگیری",
  3: "نیازمند پیگیری فوری",
};

const ScoresOfTestDimensions = ({
  createBodyParams,
  serviceDetailData,
  triggerItems,
  isFormValid,
  validateData,
}: ScoresOfTestDimensionsProps) => {
  // امتیاز محورهای آزمون
  const [scoresOfTestDimensions, setScoresOfTestDimensions] = useState<
    {
      id: number;
      title: string;
    }[]
  >([]);

  const [scoresOfTestDimensionsChart, setScoresOfTestDimensionsChart] = useState<{
    data: {
      province: string;
      value: number;
      color?: string;
    }[];
    min: number;
    max: number;
  }>({
    data: [],
    min: 0,
    max: 0,
  });
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  const [scoreOfTestDimensionForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportLoading }] = useMyReportDetailsMutation();

  //* ================================ Util Functions ================================

  // امتیاز محورهای آزمون
  const scoresOfTestDimensionsHandler = useCallback(
    (id: number) => {
      getReportDetail({
        id: id,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray = Array.isArray(value?.data)
            ? (value.data as unknown as ScoresOfTestDimensionsChartDataItem[])
            : [];

          // Validate data before processing
          const isValid = validateData(dataArray, "REC_CHART");
          setIsDataValid(isValid);

          if (!isValid) {
            setScoresOfTestDimensionsChart({
              data: [],
              min: 0,
              max: 0,
            });
            return;
          }

          const tempData = dataArray
            .filter(
              (item: ScoresOfTestDimensionsChartDataItem) =>
                item && item.p1_title && item.p1_amount != null
            )
            .map((item: ScoresOfTestDimensionsChartDataItem) => ({
              province: `${item?.p1_title} / ${BAR_CHART_STATUS_TITLE[item?.status_id]}`,
              value: item?.p1_amount ?? 0,
              color: "#BAE7FF",
            }));

          setScoresOfTestDimensionsChart({
            data: [
              ...tempData,
              {
                province: "میانگین کل",
                value: dataArray[0]?.p1_average ?? 0,
              },
            ],

            min: dataArray[0]?.min ?? 0,
            max: dataArray[0]?.max ?? 0,
          });
        })
        .catch(() => {
          setIsDataValid(false);
          setScoresOfTestDimensionsChart({
            data: [],
            min: 0,
            max: 0,
          });
        });
    },
    [getReportDetail, createBodyParams, validateData]
  );

  //? ================================ Effects ================================
  useEffect(() => {
    if (card === "3" && serviceDetailData) {
      if (!isFormValid) {
        return;
      }
      // امتیاز محورهای آزمون
      const scoresOfTestDimensionsItems = serviceDetailData?.reportDetailDtos?.filter(
        (item: ReportDetailDto) => item.reportTypeTitle === "REC_CHART"
      );
      setScoresOfTestDimensions(
        scoresOfTestDimensionsItems?.map((item: ReportDetailDto) => ({
          id: item?.reportId,
          title: item?.reportTitle,
        })) || []
      );

      if (scoresOfTestDimensionsItems?.length > 0) {
        scoresOfTestDimensionsHandler(scoresOfTestDimensionsItems?.[0]?.reportId);

        scoreOfTestDimensionForm.setFieldsValue({
          scoresOfTestDimensionsHandler: selectDefaultValueGenerator({
            id: scoresOfTestDimensionsItems[0]?.reportId,
            title: scoresOfTestDimensionsItems[0]?.reportTitle,
          }),
        });
      }
    }
  }, [
    card,
    triggerItems,
    serviceDetailData,
    isFormValid,
    scoresOfTestDimensionsHandler,
    scoreOfTestDimensionForm,
  ]);

  return (
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border p-6!">
      <CustomDivider
        text="امتیاز محورهای آزمون"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      <Form form={scoreOfTestDimensionForm}>
        <Row>
          <Col span={24}>
            <CustomSelect
              label=""
              name="scoresOfTestDimensionsHandler"
              options={scoresOfTestDimensions}
              form={scoreOfTestDimensionForm}
              onChange={(e) => scoresOfTestDimensionsHandler(e as number)}
            />
          </Col>
        </Row>
      </Form>
      <Div loading={isReportLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : !scoresOfTestDimensionsChart.data.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="bar"
            data={{
              dataset: scoresOfTestDimensionsChart.data,
              min: scoresOfTestDimensionsChart.min,
              max: scoresOfTestDimensionsChart.max,
              yAxis: [
                {
                  width: 100,
                  scaleType: "band",
                  dataKey: "province",
                  position: "right",
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "rtl",
                  },
                },
              ],
              series: [
                {
                  dataKey: "value",
                  color: "#BAE7FF",
                  layout: "horizontal",
                },
              ],
              xAxis: [
                {
                  scaleType: "linear",
                  dataKey: "value",
                  min: scoresOfTestDimensionsChart.min,
                  max: scoresOfTestDimensionsChart.max,
                  reverse: true,
                  tickLabelStyle: { direction: "ltr" },
                },
              ],
            }}
            config={{
              height: 700,
              grid: { vertical: true, horizontal: true },
              loading: isReportLoading,
            }}
          />
        )}
      </Div>
    </div>
  );
};

export default ScoresOfTestDimensions;
