import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import moment from "jalali-moment";
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
  ParticipantsStatisticsChartDataItem,
  ParticipantsStatisticsSeriesItem,
  MyReportDetailsResponse,
  ReportDetailDto,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { IncomeAnalysisLineChartProps } from "./@types/@incomeAnalysisLineChart";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

const IncomeAnalysisLineChart = ({
  createBodyParams,
  serviceDetailData,
  triggerItems,
  isFormValid,
  validateData,
}: IncomeAnalysisLineChartProps) => {
  const [options, setOptions] = useState<{ id: number; title: string }[]>([]);

  const [income, setIncome] = useState<{
    data: ParticipantsStatisticsChartDataItem[];
    series: ParticipantsStatisticsSeriesItem[];
  }>({
    data: [],
    series: [],
  });

  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === FOOD_CARD_IDS.incomeAnalysis && serviceDetailData) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }
      // create options
      const incomeItems = serviceDetailData?.reportDetailDtos?.filter(
        (item: ReportDetailDto) =>
          item.reportTypeTitle === "LINE_CHART" && item.section === 5
      );

      setOptions(
        incomeItems?.map((item: ReportDetailDto) => ({
          id: item?.reportId,
          title: item?.reportTitle,
        })) || []
      );

      if (incomeItems?.length > 0) {
        getIncomeListHandler(incomeItems[0]?.reportId);

        form.setFieldsValue({
          income: selectDefaultValueGenerator({
            id: incomeItems[0]?.reportId,
            title: incomeItems[0]?.reportTitle,
          }),
        });
      }
    }
  }, [card, triggerItems, serviceDetailData, isFormValid]);

  //* ================================ Util Functions ================================
  const getIncomeListHandler = (id: number) => {
    getReportDetail({
      id: id,
      params: createBodyParams() || {},
    })
      .unwrap()
      .then((value: MyReportDetailsResponse) => {
        const dataArray = Array.isArray(value?.data) ? value.data : [];
        const isValid = validateData(dataArray, "LINE_CHART");
        setIsDataValid(isValid);

        if (isValid === null || isValid === false) {
          setIncome({ data: [], series: [] });
          return;
        }

        const tempData: ParticipantsStatisticsChartDataItem[] = dataArray.map((item) => {
          const itemRecord = item as Record<string, unknown>;
          return {
            ...itemRecord,
            date: moment(itemRecord?.date as string, "YYYY-MM-DD").format(
              "jYYYY/jMM/jDD"
            ),
          } as ParticipantsStatisticsChartDataItem;
        });

        const oneItem = tempData[0];
        if (!oneItem) {
          setIncome({ data: [], series: [] });
          return;
        }

        const keys = Object.keys(oneItem);

        // Filter p1, p2, p3 ...
        const pKeys = keys.filter((k) => /^p\d+$/.test(k));

        const series: ParticipantsStatisticsSeriesItem[] = pKeys.map((key) => ({
          dataKey: key,
          label: (oneItem[`${key}_title`] as string) || key,
        }));

        setIncome({ data: tempData, series: series });
      })
      .catch(() => {
        setIsDataValid(false);
        setIncome({ data: [], series: [] });
      });
  };

  return (
    <div>
      <CustomDivider
        text="درآمد"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      <Div loading={isReportDetailLoading}>
        <Form form={form}>
          <Row>
            <Col span={24}>
              <CustomSelect
                label=""
                name="income"
                options={options}
                form={form}
                onChange={(e) => getIncomeListHandler(e as number)}
              />
            </Col>
          </Row>
        </Form>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !income.data.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="line"
            data={{
              dataset: income.data,
              series: income.series.map((s) => ({
                data: income.data.map((item) => (item[s.dataKey] as number) || 0),
                label: s.label,
                showMark: false,
              })),
              yAxis: [
                {
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "ltr",
                  },
                },
              ],
              xAxis: [
                {
                  scaleType: "point",
                  dataKey: "date",
                },
              ],
            }}
            config={{
              height: 300,
              grid: { horizontal: true },
              loading: isReportDetailLoading,
            }}
          />
        )}
      </Div>
    </div>
  );
};

export default IncomeAnalysisLineChart;
