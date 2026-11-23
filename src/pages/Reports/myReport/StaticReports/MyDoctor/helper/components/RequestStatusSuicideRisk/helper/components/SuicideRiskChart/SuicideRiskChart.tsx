import { useEffect, useState } from "react";

import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import {
  SuicideRiskChartState,
  SuicideRiskPieChartData,
  MyReportDetailsResponse,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

type SuicideRiskChartProps = {
  isFormValid: boolean;
  createBodyParams: () => Record<number, string | number> | null | undefined;
  triggerItems: Record<string, string>;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};

const SuicideRiskChart = ({
  isFormValid,
  createBodyParams,
  triggerItems,
  validateData,
}: SuicideRiskChartProps) => {
  // ریسک خودکشی
  const [suicideRisk, setSuicideRisk] = useState<SuicideRiskChartState>({
    data: [],
    total: 0,
  });
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (card === "2") {
      if (!isFormValid) {
        return;
      }
      //ریسک خودکشی
      getReportDetail({
        id: 12,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          // Validate data
          const isValid = validateData(value?.data, "PIE_CHART");
          setIsDataValid(isValid);

          if (!isValid) {
            setSuicideRisk({ data: [], total: 0 });
            return;
          }

          const dataArray = (value?.data as SuicideRiskPieChartData) || [];
          setSuicideRisk({
            data: dataArray.map((item) => ({
              id: item.id,
              value: item.amount,
              label: item.title,
            })),
            total: dataArray.reduce((acc, item) => acc + item.amount, 0),
          });
        })
        .catch(() => {
          setIsDataValid(false);
          setSuicideRisk({ data: [], total: 0 });
        });
    }
  }, [card, triggerItems, isFormValid]);

  return (
    <Div
      loading={isReportDetailLoading}
      className="direction-rtl border-neutral-4 pie-chart-container flex w-full! flex-col gap-8 rounded-lg border p-6!"
    >
      <CustomDivider
        text="ریسک خودکشی"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      {/* //Todo[Atefeh]: uncomment when api got ready */}
      {/* <Row>
              <Col span={24}>
                <CustomSelect
                  label=""
                  name="province"
                  options={[]}
                  form={form}
                  //   onChange={}
                  //   isLoading={}
                  mode="multiple"
                />
              </Col>
            </Row> */}

      {isDataValid === false ? (
        <CustomCard>
          <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
        </CustomCard>
      ) : isDataValid === null ||
        !suicideRisk?.data?.length ||
        suicideRisk?.total === 0 ? (
        <CustomEmpty />
      ) : (
        <CustomChart
          type="pie"
          data={{
            series: [
              {
                data: suicideRisk?.data,
              },
            ],
          }}
          config={{ height: 200 }}
          className="mx-auto! w-[200px]"
        />
      )}

      {isDataValid === true &&
        suicideRisk?.data?.length > 0 &&
        suicideRisk?.total > 0 && (
          <div className="body-regular border-t-neutral-5 mt-16! flex flex-col items-center gap-1 border-t p-2!">
            <span className="text-neutral-8">تعداد کل</span>
            <span className="h4-medium">
              {dataPlaceHolder({
                data: suicideRisk?.total?.toString(),
                isPrice: true,
              })}
            </span>
          </div>
        )}
    </Div>
  );
};

export default SuicideRiskChart;
