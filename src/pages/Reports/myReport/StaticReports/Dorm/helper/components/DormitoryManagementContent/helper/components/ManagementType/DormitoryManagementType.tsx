import { useEffect, useState, useMemo } from "react";

import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { DORM_STATIC_REPORT_CARD_IDS } from "@pages/Reports/myReport/StaticReports/Dorm/_utils/dormStaticReportUtil";
import { MyReportDetailsResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import {
  ChartDataItem,
  DormitoryManagementTypeProps,
  ManagementTypeItem,
} from "./@types/@dormitoryManagementType";

//? ================================  Type Guard ================================
const isManagementTypeItemArray = (data: unknown): data is ManagementTypeItem[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item): item is ManagementTypeItem =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "amount" in item &&
        "title" in item &&
        typeof item.id === "number" &&
        typeof item.amount === "number" &&
        typeof item.title === "string"
    )
  );
};

const DormitoryManagementType = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: DormitoryManagementTypeProps) => {
  // Management type
  const [managementType, setManagementType] = useState<ManagementTypeItem[]>([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === DORM_STATIC_REPORT_CARD_IDS.dormitoryManagement) {
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
        id: 54,
        params: params,
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const data = value?.data as unknown;
          const validData = isManagementTypeItemArray(data) ? data : [];

          // Validate data
          const isValid = validateData(validData, "PIE_CHART");
          setIsDataValid(isValid);

          if (!isValid) {
            setManagementType([]);
            return;
          }

          setManagementType(validData);
        })
        .catch((error) => {
          console.error("Error fetching management type data:", error);
          setIsDataValid(false);
          setManagementType([]);
        });
    }
  }, [card, triggerItems, createBodyParams, getReportDetail, isFormValid]);

  //? ================================  Transform Data for Chart ================================
  const chartData = useMemo<ChartDataItem[]>(() => {
    return managementType
      .filter((item) => item && item.amount != null)
      .map((item) => ({
        id: item.id,
        value: item.amount ?? 0,
        label: item.title,
      }));
  }, [managementType]);

  return (
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border p-6!">
      <CustomDivider
        text="نحوه مدیریت خوابگاه"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      {/* Todo[Atefeh]: uncomment when api got ready */}
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
        ) : (
          <CustomChart
            type="pie"
            data={{
              series: [
                {
                  data: chartData,
                },
              ],
            }}
            config={{ height: 200, loading: isReportDetailLoading }}
            className="mx-auto! mb-10! w-[200px]"
          />
        )}
      </Div>
    </div>
  );
};

export default DormitoryManagementType;
