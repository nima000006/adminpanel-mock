import { useEffect, useState } from "react";

import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import {
  ReportDetailDto,
  MyReportDetailsResponse,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { TestParticipantsProps } from "./@types/@testParticipants";

const TestParticipants = ({
  isFormValid,
  createBodyParams,
  triggerItems,
  serviceDetailData,
}: TestParticipantsProps) => {
  const [testStatistics, setTestStatistics] = useState<
    Record<number, { amount: null | number; title: string }>
  >({});

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (card === "1" || !card) {
      if (!isFormValid || !serviceDetailData) {
        return;
      }

      // پیدا کردن همه reportId های با type NUMBER (reportTypeId: 2)
      const numberReports = serviceDetailData?.reportDetailDtos?.filter(
        (item: ReportDetailDto) =>
          item.reportTypeId === 2 || item.reportTypeTitle === "NUMBER"
      );

      if (!numberReports || numberReports.length === 0) {
        return;
      }

      // فراخوانی API برای هر reportId
      numberReports.forEach((report: ReportDetailDto) => {
        getReportDetail({
          id: report.reportId,
          params: createBodyParams() || {},
        })
          .unwrap()
          .then((value: MyReportDetailsResponse) => {
            const dataArray = Array.isArray(value?.data) ? value.data : [];
            const item = dataArray[0] as { amount?: number } | undefined;
            setTestStatistics((prev) => ({
              ...prev,
              [report.reportId]: {
                amount:
                  item && "amount" in item && typeof item.amount === "number"
                    ? item.amount
                    : null,
                title: report.reportTitle,
              },
            }));
          })
          .catch(() => {
            setTestStatistics((prev) => ({
              ...prev,
              [report.reportId]: {
                amount: null,
                title: report.reportTitle,
              },
            }));
          });
      });
    }
  }, [card, triggerItems, isFormValid, serviceDetailData]);

  const numberReports = serviceDetailData?.reportDetailDtos?.filter(
    (item: ReportDetailDto) =>
      item.reportTypeId === 2 || item.reportTypeTitle === "NUMBER"
  );

  // گرفتن دو reportId اول (احتمالاً شرکت کنندگان و واحدها)
  const firstReport = numberReports?.[0];
  const secondReport = numberReports?.[1];

  const firstAmount = firstReport
    ? (testStatistics[firstReport.reportId]?.amount ?? 0)
    : 0;
  const secondAmount = secondReport
    ? (testStatistics[secondReport.reportId]?.amount ?? 0)
    : 0;

  return (
    <Div
      loading={isReportDetailLoading}
      className="border-neutral-5 bg-neutral-2 body-regular relative flex flex-col items-center gap-4 rounded-lg border p-4!"
    >
      <h1 className="text-neutral-13 h3-medium">آمار آزمون پایش سلامت</h1>
      <div className="flex items-center justify-center gap-1">
        <span className="h5-regular text-neutral-7">شرکت کنندگان: </span>
        <span className="h5-medium text-neutral-13">
          {dataPlaceHolder({ data: firstAmount?.toString(), isPrice: true })}
        </span>
        <span className="h5-regular text-neutral-7"> نفر از </span>
        <span className="h5-medium text-neutral-13">
          {dataPlaceHolder({ data: secondAmount?.toString(), isPrice: true })}
        </span>
        <span className="h5-regular text-neutral-7"> واحد</span>
      </div>
    </Div>
  );
};

export default TestParticipants;
