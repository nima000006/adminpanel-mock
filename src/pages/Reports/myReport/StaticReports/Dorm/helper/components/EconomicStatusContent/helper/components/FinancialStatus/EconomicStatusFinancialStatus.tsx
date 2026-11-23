import { useEffect, useState } from "react";

import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { DORM_STATIC_REPORT_CARD_IDS } from "@pages/Reports/myReport/StaticReports/Dorm/_utils/dormStaticReportUtil";
import {
  MyReportDetailsResponse,
  ScoresOfTestDimensionsChartDataItem,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { EconomicStatusFinancialStatusProps } from "./@types/@economicStatusFinancialStatus";

type FinancialStatusChartDataItem = {
  p1_title: string;
  p1_amount: number;
};

const EconomicStatusFinancialStatus = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: EconomicStatusFinancialStatusProps) => {
  const [financialStatusChart, setFinancialStatusChart] = useState<
    FinancialStatusChartDataItem[]
  >([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === DORM_STATIC_REPORT_CARD_IDS.economicStatus) {
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
        id: 51,
        params: params,
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray =
            (value?.data as unknown as ScoresOfTestDimensionsChartDataItem[]) || [];

          // Validate data - check if it's REC_CHART structure (p1_title, p1_amount)
          const isValid = validateData(dataArray, "REC_CHART");
          setIsDataValid(isValid);

          if (!isValid) {
            setFinancialStatusChart([]);
            return;
          }

          // Filter and sanitize data
          const tempData: FinancialStatusChartDataItem[] = dataArray
            .filter((item) => item && item.p1_title && item.p1_amount != null)
            .map((item) => ({
              p1_title: item.p1_title || "",
              p1_amount: item.p1_amount ?? 0,
            }));

          setFinancialStatusChart(tempData);
        })
        .catch(() => {
          setIsDataValid(false);
          setFinancialStatusChart([]);
        });
    }
  }, [card, triggerItems, isFormValid, createBodyParams, getReportDetail, validateData]);

  return (
    <div className="border-neutral-4 rounded-lg border px-6! pt-4!">
      <CustomDivider
        text="وضعیت مالی"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      {/* //Todo[Atefeh]: uncomment when api got ready */}
      {/* <Form form={form}>
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
      </Form> */}
      <Div loading={isReportDetailLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : !financialStatusChart.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="bar"
            data={{
              dataset: financialStatusChart,
              yAxis: [
                {
                  width: 100,
                  scaleType: "band",
                  dataKey: "p1_title",
                  position: "right",
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "rtl",
                  },
                },
              ],
              xAxis: [
                {
                  scaleType: "linear",
                  dataKey: "p1_amount",
                  reverse: true,
                  tickLabelStyle: { direction: "ltr" },
                },
              ],
              series: [
                {
                  dataKey: "p1_amount",
                  color: "#BAE7FF",
                  layout: "horizontal",
                },
              ],
            }}
            config={{
              height: 300,
              grid: { vertical: true, horizontal: true },
              loading: isReportDetailLoading,
            }}
          />
        )}
      </Div>
    </div>
  );
};

export default EconomicStatusFinancialStatus;
