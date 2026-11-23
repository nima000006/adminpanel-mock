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
import { DORM_STATIC_REPORT_CARD_IDS } from "@pages/Reports/myReport/StaticReports/Dorm/_utils/dormStaticReportUtil";
import {
  ParticipantsStatisticsChartDataItem,
  ParticipantsStatisticsSeriesItem,
  MyReportDetailsResponse,
  ReportDetailDto,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { AnalysisResidenceChangesProps } from "./@types/@analysisResidenceChanges";

const AnalysisResidenceChanges = ({
  createBodyParams,
  triggerItems,
  serviceDetailData,
  isFormValid,
  validateData,
}: AnalysisResidenceChangesProps) => {
  const [chartOptions, setChartOptions] = useState<{ id: number; title: string }[]>([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const [residenceChanges, setResidenceChanges] = useState<{
    data: ParticipantsStatisticsChartDataItem[];
    series: ParticipantsStatisticsSeriesItem[];
  }>({
    data: [],
    series: [],
  });

  const [form] = Form.useForm();

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === DORM_STATIC_REPORT_CARD_IDS.residenceAnalysis && serviceDetailData) {
      // create residence changes options
      const chartItems = serviceDetailData?.reportDetailDtos?.filter(
        (item: ReportDetailDto) => item.reportTypeTitle === "LINE_CHART"
      );

      setChartOptions(
        chartItems?.map((item: ReportDetailDto) => ({
          id: item?.reportId,
          title: item?.reportTitle,
        })) || []
      );

      if (chartItems?.length > 0) {
        getResidenceChangesDetailHandler(chartItems[0]?.reportId);

        form.setFieldsValue({
          residenceChanges: selectDefaultValueGenerator({
            id: chartItems[0]?.reportId,
            title: chartItems[0]?.reportTitle,
          }),
        });
      }
    }
  }, [card, triggerItems, serviceDetailData]);

  //* ================================ Util Functions ================================
  const getResidenceChangesDetailHandler = (id: number) => {
    // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
    if (!isFormValid) {
      return;
    }

    const params = createBodyParams();
    // اگر createBodyParams null برگرداند، درخواست ارسال نکن
    if (params === null) {
      return;
    }

    getReportDetail({
      id: id,
      params: params,
    })
      .unwrap()
      .then((value: MyReportDetailsResponse) => {
        // Validate data
        const dataArray = Array.isArray(value?.data) ? value.data : [];
        const isValid = validateData(dataArray, "LINE_CHART");
        setIsDataValid(isValid);

        if (!isValid) {
          setResidenceChanges({ data: [], series: [] });
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
          setResidenceChanges({ data: [], series: [] });
          return;
        }

        const keys = Object.keys(oneItem);
        // Filter p1, p2, p3 ...
        const pKeys = keys.filter((k) => /^p\d+$/.test(k));
        const series: ParticipantsStatisticsSeriesItem[] = pKeys.map((key) => ({
          dataKey: key,
          label: (oneItem[`${key}_title`] as string) || key,
        }));
        setResidenceChanges({ data: tempData, series: series });
      })
      .catch(() => {
        setIsDataValid(false);
        setResidenceChanges({ data: [], series: [] });
      });
  };

  return (
    <div className="border-neutral-4 overflow-x-hidden rounded-lg border px-6! pt-4! pb-10!">
      <CustomDivider
        text="تغییرات ساکنین"
        extraContent={<PiInfoThin size={16} className="text-neutral-6" />}
      />
      <Form form={form}>
        <Row>
          <Col span={24}>
            <CustomSelect
              label=""
              name="residenceChanges"
              options={chartOptions}
              form={form}
              onChange={(e) => getResidenceChangesDetailHandler(e as number)}
            />
          </Col>
        </Row>
      </Form>
      <Div loading={isReportDetailLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !residenceChanges.data.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="line"
            data={{
              dataset: residenceChanges.data,
              series: residenceChanges.series.map((item) => ({
                dataKey: item.dataKey,
                label: item.label,
                showMark: false,
              })),
              xAxis: [
                {
                  scaleType: "point",
                  dataKey: "date",
                },
              ],
              yAxis: [
                {
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "ltr",
                  },
                },
              ],
            }}
            config={{
              height: 300,
              grid: { horizontal: true },
              tooltip: { trigger: "axis" },
              legend: {
                direction: "column",
                position: { vertical: "top", horizontal: "right" },
              },
              loading: isReportDetailLoading,
            }}
          />
        )}
      </Div>
    </div>
  );
};

export default AnalysisResidenceChanges;
