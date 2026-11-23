import { useEffect, useState } from "react";

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
  MyReportDetailsResponse,
  ScoresOfTestDimensionsChartDataItem,
  ReportDetailDto,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { BranchesOrderProps } from "./@types/@branchesOrder";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

type BranchesOrderDataItem = {
  p1_title: string;
  p1_amount: number;
};

type OldBranchesOrderDataItem = {
  Name: string;
  total_reservations: number;
};

const BranchesOrder = ({
  createBodyParams,
  serviceDetailData,
  triggerItems,
  isFormValid,
  validateData,
}: BranchesOrderProps) => {
  const [options, setOptions] = useState<
    {
      id: number;
      title: string;
    }[]
  >([]);

  const [chartData, setChartData] = useState<BranchesOrderDataItem[]>([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  const [branchesOrderForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportLoading }] = useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === FOOD_CARD_IDS.orderAndDelivery && serviceDetailData) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }
      const optionItems = serviceDetailData?.reportDetailDtos?.filter(
        (item: ReportDetailDto) =>
          item.reportTypeTitle === "REC_CHART" && item.section === 2
      );

      setOptions(
        optionItems?.map((item: ReportDetailDto) => ({
          id: item?.reportId,
          title: item?.reportTitle,
        })) || []
      );

      if (optionItems?.length > 0) {
        getBranchesOrderHandler(optionItems?.[0]?.reportId);

        branchesOrderForm.setFieldsValue({
          scoresOfTestDimensionsHandler: selectDefaultValueGenerator({
            id: optionItems[0]?.reportId,
            title: optionItems[0]?.reportTitle,
          }),
        });
      }
    }
  }, [
    card,
    triggerItems,
    serviceDetailData,
    isFormValid,
    createBodyParams,
    getReportDetail,
    validateData,
  ]);

  //* ================================ Util Functions ================================
  const getBranchesOrderHandler = (id: number) => {
    getReportDetail({
      id: id,
      params: createBodyParams() ?? {},
    })
      .unwrap()
      .then((value: MyReportDetailsResponse) => {
        const dataArray = Array.isArray(value?.data) ? value.data : [];

        // Check if it's REC_CHART structure or old structure
        const firstItem = dataArray[0] as unknown as
          | ScoresOfTestDimensionsChartDataItem
          | OldBranchesOrderDataItem
          | undefined;
        const isRecChart = firstItem && "p1_title" in firstItem;

        if (isRecChart) {
          const recChartData =
            dataArray as unknown as ScoresOfTestDimensionsChartDataItem[];
          const isValid = validateData(recChartData, "REC_CHART");
          setIsDataValid(isValid);

          if (isValid === null || isValid === false) {
            setChartData([]);
            return;
          }

          const tempData: BranchesOrderDataItem[] = recChartData
            .filter((item) => item && item.p1_title && item.p1_amount != null)
            .map((item) => ({
              p1_title: item.p1_title || "",
              p1_amount: item.p1_amount ?? 0,
            }));

          setChartData(tempData);
        } else {
          // Old structure: Name, total_reservations
          const oldData = dataArray as unknown as OldBranchesOrderDataItem[];
          const isValid = validateData(
            oldData.map((item) => ({
              key: item?.Name,
              value: item?.total_reservations,
            })),
            "BAR_CHART"
          );
          setIsDataValid(isValid);

          if (isValid === null || isValid === false) {
            setChartData([]);
            return;
          }

          const tempData: BranchesOrderDataItem[] = oldData
            .filter((item) => item && item.Name && item.total_reservations != null)
            .map((item) => ({
              p1_title: item.Name || "",
              p1_amount: item.total_reservations ?? 0,
            }));

          setChartData(tempData);
        }
      })
      .catch(() => {
        setIsDataValid(false);
        setChartData([]);
      });
  };

  return (
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border p-6!">
      <CustomDivider
        text="مقایسه سفارشات شعب / واحد‌ها"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />

      <Form form={branchesOrderForm}>
        <Row>
          <Col span={24}>
            <CustomSelect
              label=""
              name="scoresOfTestDimensionsHandler"
              options={options}
              form={branchesOrderForm}
              onChange={(e) => getBranchesOrderHandler(e as number)}
            />
          </Col>
        </Row>
      </Form>
      <Div loading={isReportLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !chartData.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="bar"
            data={{
              dataset: chartData,
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

export default BranchesOrder;
