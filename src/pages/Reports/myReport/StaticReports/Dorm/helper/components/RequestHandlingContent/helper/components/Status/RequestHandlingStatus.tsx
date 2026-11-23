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

import {
  RequestHandlingStatusProps,
  RequestStatusChartDataItem,
} from "./@types/@requestHandlingStatus";

const RequestHandlingStatus = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: RequestHandlingStatusProps) => {
  const [requestStatusChart, setRequestStatusChart] = useState<
    RequestStatusChartDataItem[]
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
    if (+card === DORM_STATIC_REPORT_CARD_IDS.requestHandling) {
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
        id: 53,
        params: params,
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          // Check if data is array (REC_CHART structure)
          const dataArray = Array.isArray(value?.data) ? value.data : [];

          if (dataArray.length > 0) {
            // REC_CHART structure: array of objects with p1_title and p1_amount
            const recChartData =
              dataArray as unknown as ScoresOfTestDimensionsChartDataItem[];
            const isValid = validateData(recChartData, "REC_CHART");
            setIsDataValid(isValid);

            if (!isValid) {
              setRequestStatusChart([]);
              return;
            }

            const result: RequestStatusChartDataItem[] = recChartData
              .filter((item) => item && item.p1_title && item.p1_amount != null)
              .map((item) => ({
                p1_title: item.p1_title || "",
                p1_amount: item.p1_amount ?? 0,
              }));

            setRequestStatusChart(result);
          } else {
            // Fallback: check if data is object (old structure)
            const raw = dataArray[0] as Record<string, unknown> | undefined;
            if (!raw) {
              setIsDataValid(false);
              setRequestStatusChart([]);
              return;
            }

            const result: RequestStatusChartDataItem[] = Object.keys(raw)
              .filter((key) => /^p\d+$/.test(key))
              .map((key) => ({
                p1_title: (raw[key + "_title"] as string) || "",
                p1_amount: (raw[key] as number) ?? 0,
              }))
              .filter((item) => item.p1_title && item.p1_amount != null);

            // Validate data
            const isValid = validateData(result, "REC_CHART");
            setIsDataValid(isValid);

            if (!isValid) {
              setRequestStatusChart([]);
              return;
            }

            setRequestStatusChart(result);
          }
        })
        .catch(() => {
          setIsDataValid(false);
          setRequestStatusChart([]);
        });
    }
  }, [card, triggerItems, isFormValid, createBodyParams, getReportDetail, validateData]);

  return (
    <div className="border-neutral-4 rounded-lg border px-6! pt-4!">
      <CustomDivider
        text="وضعیت درخواست‌ها"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      {/* //Todo[Atefeh]: uncomment when api got ready */}
      {/* <Row>
        <Col span={24}>
          <CustomSelect
            label=""
            name="select"
            options={[{ id: "1", title: "همه" }]}
            form={form}
            //   onChange={}
            //   isLoading={}
            defaultValue={["نمودار روندی"]}
            mode="multiple"
          />
        </Col>
      </Row> */}

      <Div loading={isReportDetailLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : !requestStatusChart.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="bar"
            data={{
              dataset: requestStatusChart,
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
      {/* //Todo[Atefeh]:Uncomment when api got ready */}
      {/* <div className="body-regular border-t-neutral-5 my-6! flex flex-col items-center gap-1 border-t p-2!">
        <span className="text-neutral-8">تعداد کل</span>
        <span className="h4-medium">
          {dataPlaceHolder({ data: "100000", isPrice: true })}
        </span>
      </div> */}
    </div>
  );
};

export default RequestHandlingStatus;
