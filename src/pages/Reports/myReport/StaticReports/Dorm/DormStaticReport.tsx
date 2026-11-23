import { useEffect, useState, useMemo } from "react";

import { Col, Form, Row } from "antd";
import {
  PiBuildingsDuotone,
  PiCoinsDuotone,
  PiFileTextDuotone,
  PiGaugeDuotone,
  PiTableDuotone,
  PiUsersFourDuotone,
} from "react-icons/pi";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useMyReportMainServiceDetailMutation,
  useMyReportParamDetailMutation,
} from "@infra/states/redux/Apis/report/myReport";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { DORM_SERVICE_ID } from "@pages/Finance/Accountants/_shared/utils";

import { DORM_STATIC_REPORT_CARD_IDS } from "./_utils/dormStaticReportUtil";
import { MyReportMainServiceDetailParamDtos } from "../MyDoctor/@types/@myDoctorStaticReport";
import AnalysisResidenceContent from "./helper/components/AnalysisResidenceContent/AnalysisResidenceContent";
import DormitoryManagementContent from "./helper/components/DormitoryManagementContent/DormitoryManagementContent";
import EconomicStatusContent from "./helper/components/EconomicStatusContent/EconomicStatusContent";
import InformationTablesContent from "./helper/components/InformationTablesContent/InformationTablesContent";
import PerformanceContent from "./helper/components/PerformanceContent/PerformanceContent";
import RequestHandlingContent from "./helper/components/RequestHandlingContent/RequestHandlingContent";
import StatisticTabCard from "../shared/components/StatisticTabCard/StatisticTabCard";

import "./_dormStaticReport.scss";

const TABS_ITEMS = [
  {
    id: DORM_STATIC_REPORT_CARD_IDS.performance,
    title: "عملکرد کلی",
    icon: <PiGaugeDuotone size={24} />,
  },
  {
    id: DORM_STATIC_REPORT_CARD_IDS.residenceAnalysis,
    title: "تحلیل ساکنین",
    icon: <PiUsersFourDuotone size={24} />,
  },

  {
    id: DORM_STATIC_REPORT_CARD_IDS.economicStatus,
    title: "وضعیت اقتصادی خوابگاه",
    icon: <PiCoinsDuotone size={24} />,
  },

  {
    id: DORM_STATIC_REPORT_CARD_IDS.requestHandling,
    title: "رسیدگی و درخواست‌ها",
    icon: <PiFileTextDuotone size={24} />,
  },

  {
    id: DORM_STATIC_REPORT_CARD_IDS.dormitoryManagement,
    title: " مدیریت خوابگاه",
    icon: <PiBuildingsDuotone size={24} />,
  },

  {
    id: DORM_STATIC_REPORT_CARD_IDS.informationTables,
    title: "جداول اطلاعاتی",
    icon: <PiTableDuotone size={24} />,
  },
];

const DormStaticReport = () => {
  const [selectOptions, setSelectOptions] = useState<
    Record<string, { id: number; title: string }[]>
  >({});

  const [triggerItems, setTriggerItems] = useState<Record<string, string | string[]>>({});

  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);

  const {
    params: { card },
    setSearchParams,
  } = useQueryParams();

  const [activeCard, setActiveCard] = useState<number>(
    Number(card) || DORM_STATIC_REPORT_CARD_IDS.performance
  );

  useTitle({
    breadcrumbItems: [
      {
        title: " گزارشات",
      },
      { title: "گزارشات آماری" },
    ],
  });

  //? ================================  Api Calls ================================
  const [getServiceDetail, { data: serviceDetailData, isLoading: isServiceDataLoading }] =
    useMyReportMainServiceDetailMutation();

  const [getParamDetail] = useMyReportParamDetailMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getServiceDetail({ service: DORM_SERVICE_ID });
  }, [getServiceDetail]);

  //* ================================ Util Functions ================================
  // Helper function to check if data has required properties
  const hasProperty = (item: unknown, prop: string): boolean => {
    if (item === null || item === undefined || typeof item !== "object") {
      return false;
    }
    return prop in item;
  };

  // Validation functions for different chart types
  // Returns: null if data is empty, false if data is invalid, true if data is valid
  const validateData = (data: unknown, reportTypeTitle: string): boolean | null => {
    // For TABLE type, always return true (even if empty) to show empty table
    if (reportTypeTitle === "TABLE") {
      return true;
    }

    // Check if data is empty
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null; // null means data is empty (should show CustomEmpty)
    }

    const dataArray = Array.isArray(data) ? data : [data];

    switch (reportTypeTitle) {
      case "LINE_CHART":
        return dataArray.every((item) => hasProperty(item, "date"));

      case "PIE_CHART":
        return dataArray.every((item) => hasProperty(item, "amount"));

      case "REC_CHART":
        return dataArray.every(
          (item) => hasProperty(item, "p1_title") && hasProperty(item, "p1_amount")
        );

      case "BAR_CHART":
        // For bar charts with key/value structure
        return dataArray.every(
          (item) => hasProperty(item, "key") && hasProperty(item, "value")
        );

      case "NUMBER":
        return dataArray.length > 0;

      default:
        return false;
    }
  };

  // تابع برای بررسی اینکه آیا یک فیلتر باید disabled باشد
  const shouldDisableFilter = (item: MyReportMainServiceDetailParamDtos) => {
    // اگر این فیلتر وابسته به فیلتر دیگری است
    if (item?.paramDto?.paramId) {
      // پیدا کردن فیلتر والد که paramId آن با paramDto.paramId این فیلتر برابر است
      const parentItem = serviceDetailData?.paramDtos?.find(
        (p) => p.paramId === item.paramDto?.paramId
      );

      if (parentItem) {
        // استفاده از formValues برای ردیابی تغییرات reactive
        const parentValue = formValues?.[parentItem.key];
        const hasParentValue =
          parentValue !== undefined &&
          parentValue !== null &&
          parentValue !== "" &&
          !(typeof parentValue === "object" && !Object.keys(parentValue).length);

        // اگر والد مقدار نداشته باشد، این فیلتر باید disabled باشد
        return !hasParentValue;
      }
    }
    return false;
  };

  // تابع برای بررسی اینکه آیا تمام فیلترهای required پر شده‌اند
  const areRequiredFieldsFilled = () => {
    const formData = form.getFieldsValue();
    const requiredParams = serviceDetailData?.paramDtos?.filter(
      (item: MyReportMainServiceDetailParamDtos) => item.required === true
    );

    if (!requiredParams || requiredParams.length === 0) {
      return true; // اگر هیچ فیلتر required وجود نداشت، true برگردان
    }

    return requiredParams.every((item) => {
      const value = formData[item.key];
      return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(typeof value === "object" && !Object.keys(value).length)
      );
    });
  };

  const getParamDetailHandler = (item: MyReportMainServiceDetailParamDtos) => {
    if (Object.hasOwn({ ...selectOptions }, item.key)) return;

    getParamDetail({
      id: item?.paramId,
      service: DORM_SERVICE_ID,
    })
      .unwrap()
      .then((value: { id: number; title: string }[]) => {
        setSelectOptions((prev) => ({
          ...prev,
          [item.key]: value?.map((v) => ({
            title: v.title,
            id: v.id,
          })),
        }));
      });
  };

  const onSelectChange = (key: string, value: string) => {
    const childItem = serviceDetailData?.paramDtos?.find((p) => p?.paramDto?.key === key);

    if (childItem) {
      // ریست کردن مقدار قبلی برای child
      form.setFieldsValue({ [childItem?.key]: undefined });
      // دریافت مجدد دیتا از بک‌اند

      const buildParams = (paramId?: number, value?: string | number) =>
        paramId && value != null && value !== "" ? { [paramId]: value } : undefined;

      const params = buildParams(childItem?.paramDto?.paramId || 0, value);

      if (childItem?.paramDto?.paramId) {
        getParamDetail({
          id: childItem.paramId,
          ...(params && { params }),
          service: DORM_SERVICE_ID,
        })
          .unwrap()
          .then((value) => {
            setSelectOptions((prev) => ({
              ...prev,
              [childItem.key]: value?.map((v) => ({
                id: v.id,
                title: v.title,
              })),
            }));
          });
      }
    }
  };

  const changeCardHandler = (id: number) => {
    setActiveCard(id);
    setSearchParams({ card: id?.toString() });
  };

  const createBodyParams = () => {
    // اگر فیلترهای required پر نشده‌اند، null برگردان
    if (!areRequiredFieldsFilled()) {
      return null;
    }
    const formData = form.getFieldsValue();

    return (
      serviceDetailData?.paramDtos?.reduce<Record<number, string | number>>(
        (acc, item) => {
          const value = formData[item.key];

          // اگر مقدار ست نشده → اصلاً ارسال نکن
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (typeof value === "object" && !Object.keys(value).length)
          ) {
            return acc;
          }

          // Date
          if (item.paramType === 3 || item.paramType === 4) {
            acc[item.paramId] = value as string | number;
          }

          // Select
          if (item.paramType === 2) {
            acc[item.paramId] =
              (value as { code?: string | number })?.code ?? (value as string | number);
          }

          return acc;
        },
        {}
      ) || {}
    );
  };

  // بررسی اینکه آیا فیلدهای required پر شده‌اند (برای جلوگیری از ارسال درخواست)
  // استفاده از useMemo برای محاسبه reactive بر اساس formValues
  const isFormValid = useMemo(() => {
    if (!formValues || !serviceDetailData) {
      return false;
    }

    const requiredParams = serviceDetailData?.paramDtos?.filter(
      (item: MyReportMainServiceDetailParamDtos) => item.required === true
    );

    if (!requiredParams || requiredParams.length === 0) {
      return true; // اگر هیچ فیلتر required وجود نداشت، true برگردان
    }

    return requiredParams.every((item) => {
      const value = formValues[item.key];
      return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(typeof value === "object" && !Object.keys(value).length)
      );
    });
  }, [formValues, serviceDetailData]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="dorm-staticReport-page-container flex flex-col gap-10">
      <Div loading={isServiceDataLoading}>
        <Form form={form}>
          <Row gutter={[16, 16]}>
            {serviceDetailData?.paramDtos?.map((item) => {
              if (item?.paramType === 4) {
                const isDisabled = shouldDisableFilter(item);
                const isRequired = item.required === true;
                return (
                  <Col md={8} lg={6} sm={12} xs={24}>
                    <CustomDatePicker
                      label={item?.paramTitle}
                      name={item?.key}
                      placeholder={item?.paramTitle}
                      form={form}
                      rules={isRequired ? [REQUIRED_RULE] : []}
                      disabled={isDisabled}
                      formDateFormat="YYYY-MM-DD"
                      onChange={(_, dateString) => {
                        setTriggerItems((prev) => ({
                          ...prev,
                          [item.key]: dateString as string | string[],
                        }));
                      }}
                    />
                  </Col>
                );
              }
              if (item?.paramType === 3) {
                const isDisabled = shouldDisableFilter(item);
                const isRequired = item.required === true;

                return (
                  <Col md={8} lg={6} sm={12} xs={24} key={item.key}>
                    <CustomDatePicker
                      label={item?.paramTitle}
                      name={item?.key}
                      placeholder={item?.paramTitle}
                      disabled={isDisabled}
                      form={form}
                      allowClear
                      rules={isRequired ? [REQUIRED_RULE] : []}
                      onChange={(_, dateString) => {
                        setTriggerItems((prev) => ({
                          ...prev,
                          [item.key]: dateString as string | string[],
                        }));
                      }}
                    />
                  </Col>
                );
              }
              if (item?.paramType === 2) {
                const isDisabled = shouldDisableFilter(item);
                const isRequired = item.required === true;

                return (
                  <Col md={8} lg={6} sm={12} xs={24} key={item.key}>
                    <CustomSelect
                      label={item?.paramTitle}
                      name={item?.key}
                      placeholder={item?.paramTitle}
                      allowClear
                      disabled={isDisabled}
                      options={
                        Object.hasOwn({ ...selectOptions }, item.key)
                          ? selectOptions[item?.key]
                          : []
                      }
                      form={form}
                      rules={isRequired ? [REQUIRED_RULE] : []}
                      onClick={() =>
                        item?.paramDto ? null : getParamDetailHandler(item)
                      }
                      onChange={(val) => {
                        onSelectChange(item.key, val as string);
                        setTriggerItems((prev) => ({
                          ...prev,
                          [item.key]: val as string | string[],
                        }));
                      }}
                    />
                  </Col>
                );
              }
            })}
          </Row>
        </Form>
      </Div>
      <Row gutter={[16, 16]}>
        {TABS_ITEMS.map((item) => (
          <Col md={8} lg={6} sm={12} xs={12} key={item.id}>
            <StatisticTabCard
              title={item.title}
              icon={item.icon}
              active={activeCard === item.id ? true : false}
              onClick={() => changeCardHandler(item.id)}
            />
          </Col>
        ))}
      </Row>

      {!isFormValid ? (
        <>
          <CustomAlert
            type="warning"
            message="لطفا فیلد های اجباری را پر کنید."
            showIcon
          />
          <CustomEmpty />
        </>
      ) : (
        <div>
          {/* PERFORMANCE CONTENT */}
          {activeCard === DORM_STATIC_REPORT_CARD_IDS.performance && (
            <PerformanceContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}

          {/* ANALYSIS RESIDENCE CONTENT */}
          {activeCard === DORM_STATIC_REPORT_CARD_IDS.residenceAnalysis && (
            <AnalysisResidenceContent
              createBodyParams={createBodyParams}
              serviceDetailData={serviceDetailData}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}

          {/* ECONOMIC STATUS CONTENT */}
          {activeCard === DORM_STATIC_REPORT_CARD_IDS.economicStatus && (
            <EconomicStatusContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}

          {/* REQUEST HANDLING CONTENT */}
          {activeCard === DORM_STATIC_REPORT_CARD_IDS.requestHandling && (
            <RequestHandlingContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}

          {/* DORM MANAGEMENT */}
          {activeCard === DORM_STATIC_REPORT_CARD_IDS.dormitoryManagement && (
            <DormitoryManagementContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}

          {/* INFORMATION TABLES */}
          {activeCard === DORM_STATIC_REPORT_CARD_IDS.informationTables && (
            <InformationTablesContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default DormStaticReport;
