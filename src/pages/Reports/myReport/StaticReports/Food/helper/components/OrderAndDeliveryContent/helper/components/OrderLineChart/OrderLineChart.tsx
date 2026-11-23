import { useEffect, useState, useCallback } from "react";

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

import { OrderLineChartProps } from "./@types/@orderLineChart";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

const OrderLineChart = ({
  createBodyParams,
  serviceDetailData,
  triggerItems,
  isFormValid,
  validateData,
}: OrderLineChartProps) => {
  const [orderOptions, setOrderOptions] = useState<{ id: number; title: string }[]>([]);

  const [order, setOrder] = useState<{
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

  //* ================================ Util Functions ================================
  const getOrderListHandler = useCallback(
    (id: number) => {
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
            setOrder({ data: [], series: [] });
            return;
          }

          const tempData: ParticipantsStatisticsChartDataItem[] = dataArray.map(
            (item) => {
              const itemRecord = item as Record<string, unknown>;
              return {
                ...itemRecord,
                date: moment(itemRecord?.date as string, "YYYY-MM-DD").format(
                  "jYYYY/jMM/jDD"
                ),
              } as ParticipantsStatisticsChartDataItem;
            }
          );

          const oneItem = tempData[0];
          if (!oneItem) {
            setOrder({ data: [], series: [] });
            return;
          }

          const keys = Object.keys(oneItem);

          // Filter p1, p2, p3 ...
          const pKeys = keys.filter((k) => /^p\d+$/.test(k));

          const series: ParticipantsStatisticsSeriesItem[] = pKeys.map((key) => ({
            dataKey: key,
            label: (oneItem[`${key}_title`] as string) || key,
          }));

          setOrder({ data: tempData, series: series });
        })
        .catch(() => {
          setIsDataValid(false);
          setOrder({ data: [], series: [] });
        });
    },
    [getReportDetail, createBodyParams, validateData]
  );

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === FOOD_CARD_IDS.orderAndDelivery && serviceDetailData) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }
      // create options
      const orderItems = serviceDetailData?.reportDetailDtos?.filter(
        (item: ReportDetailDto) =>
          item.reportTypeTitle === "LINE_CHART" && item.section === 2
      );

      setOrderOptions(
        orderItems?.map((item: ReportDetailDto) => ({
          id: item?.reportId,
          title: item?.reportTitle,
        })) || []
      );

      if (orderItems?.length > 0) {
        getOrderListHandler(orderItems[0]?.reportId);

        form.setFieldsValue({
          order: selectDefaultValueGenerator({
            id: orderItems[0]?.reportId,
            title: orderItems[0]?.reportTitle,
          }),
        });
      }
    }
  }, [card, triggerItems, serviceDetailData, isFormValid, getOrderListHandler, form]);

  return (
    <div className="border-neutral-4 rounded-lg border px-6! pt-4! pb-10!">
      <CustomDivider
        text="سفارشات"
        extraContent={<PiInfoThin size={16} className="text-neutral-4" />}
      />
      <Form form={form}>
        <Row>
          <Col span={24}>
            <CustomSelect
              label=""
              name="order"
              options={orderOptions}
              form={form}
              onChange={(e) => getOrderListHandler(e as number)}
            />
          </Col>
        </Row>
      </Form>

      <Div loading={isReportDetailLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !order.data.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="line"
            data={{
              dataset: order.data,
              series: order.series.map((s) => ({
                ...s,
                showMark: false, // 👈 حذف نقطه‌ها
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

export default OrderLineChart;
