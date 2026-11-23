import { useEffect, useState } from "react";

import { PiGauge, PiInfoThin } from "react-icons/pi";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { DORM_STATIC_REPORT_CARD_IDS } from "@pages/Reports/myReport/StaticReports/Dorm/_utils/dormStaticReportUtil";
import {
  MyReportDetailsResponse,
  ScoresOfTestDimensionsChartDataItem,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { EconomicStatusReservationRoomCostProps } from "./@types/@economicStatusReservationRoomCost";

const EconomicStatusReservationRoomCost = ({
  createBodyParams,
  triggerItems,
  isFormValid,
}: EconomicStatusReservationRoomCostProps) => {
  const [roomCost, setRoomCost] = useState<{
    min: number | null;
    max: number | null;
    average: number | null;
  }>({ min: null, max: null, average: null });

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
        id: 50,
        params: params,
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray =
            (value?.data as unknown as ScoresOfTestDimensionsChartDataItem[]) || [];

          if (dataArray.length === 0) {
            setRoomCost({ min: null, max: null, average: null });
            return;
          }

          // Extract values directly from p1_title
          let min: number | null = null;
          let max: number | null = null;
          let average: number | null = null;

          dataArray.forEach((item) => {
            if (!item?.p1_title || item?.p1_amount == null) return;

            const title = item.p1_title;
            const amount = item.p1_amount;

            if (title === "حداقل قیمت یک اتاق") {
              min = amount;
            } else if (title === "حداکثر قیمت یک اتاق") {
              max = amount;
            } else if (title === "میانگین قیمت اتاق ها") {
              average = amount;
            }
          });

          setRoomCost({
            min,
            max,
            average,
          });
        })
        .catch(() => {
          setRoomCost({ min: null, max: null, average: null });
        });
    }
  }, [card, triggerItems, isFormValid, createBodyParams, getReportDetail]);

  return (
    <div className="border-neutral-4 rounded-lg border px-6! pt-4!">
      <CustomDivider
        text="قیمت اتاق‌های رزرو شده"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />

      <Div
        loading={isReportDetailLoading}
        className="border-t-neutral-4 flex flex-col gap-4 border-t py-8!"
      >
        <div className="bg-neutral-2 flex justify-between rounded-2xl p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-primary-1 flex h-10 w-10 items-center justify-center rounded-[10px]">
              {<PiGauge size={32} color="#1890FF" />}
            </div>
            <span className="body-regular">میانگین</span>
          </div>

          <div className="h4-medium flex gap-1">
            <span>
              {dataPlaceHolder({
                data: roomCost.average !== null ? roomCost.average.toString() : null,
                isPrice: true,
              })}
            </span>
            <span>ریال</span>
          </div>
        </div>

        <div className="bg-neutral-2 flex justify-between rounded-2xl p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-green-1 flex h-10 w-10 items-center justify-center rounded-[10px]">
              {<PiGauge size={32} color="#52C41A" />}
            </div>
            <span className="body-regular">کمترین</span>
          </div>

          <div className="h4-medium flex gap-1">
            <span>
              {dataPlaceHolder({
                data: roomCost.min !== null ? roomCost.min.toString() : null,
                isPrice: true,
              })}
            </span>
            <span>ریال</span>
          </div>
        </div>

        <div className="bg-neutral-2 flex justify-between rounded-2xl p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-dustred-1 flex h-10 w-10 items-center justify-center rounded-[10px]">
              {<PiGauge size={32} color="#F5222D" />}
            </div>
            <span className="body-regular">بیشترین</span>
          </div>

          <div className="h4-medium flex gap-1">
            <span>
              {dataPlaceHolder({
                data: roomCost.max !== null ? roomCost.max.toString() : null,
                isPrice: true,
              })}
            </span>
            <span>ریال</span>
          </div>
        </div>
      </Div>
    </div>
  );
};

export default EconomicStatusReservationRoomCost;
