import { useEffect, useState } from "react";

import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import {
  RequestStatusPieChartData,
  MyReportDetailsResponse,
  RequestStatusChartDataItem,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { OrderDeliveryStatusProps } from "./@types/@orderDeliveryStatus";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

const OrderDeliveryStatus = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: OrderDeliveryStatusProps) => {
  const [deliveryStatus, setDeliveryStatus] = useState<RequestStatusChartDataItem[]>([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === FOOD_CARD_IDS.orderAndDelivery) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }
      getReportDetail({
        id: 81,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray = (value?.data as RequestStatusPieChartData) || [];

          const isValid = validateData(dataArray, "PIE_CHART");
          setIsDataValid(isValid);

          if (isValid === null || isValid === false) {
            setDeliveryStatus([]);
            return;
          }

          const data: RequestStatusChartDataItem[] = dataArray.map((item) => ({
            id: item.id,
            value: item.amount,
            label: item.title,
          }));
          setDeliveryStatus(data);
        })
        .catch(() => {
          setIsDataValid(false);
          setDeliveryStatus([]);
        });
    }
  }, [card, triggerItems, isFormValid]);

  return (
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border p-16!">
      <CustomDivider
        text="وضعیت تحویل سفارش‌ها"
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
            mode="multiple"
          />
        </Col>
      </Row> */}
      <Div loading={isReportDetailLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !deliveryStatus.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="pie"
            data={{
              series: [
                {
                  data: deliveryStatus,
                },
              ],
            }}
            config={{ height: 200, loading: isReportDetailLoading }}
            className="mx-auto! w-[200px]"
          />
        )}
      </Div>
    </div>
  );
};

export default OrderDeliveryStatus;
