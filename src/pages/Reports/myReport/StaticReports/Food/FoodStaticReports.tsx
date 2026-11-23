import { useEffect, useMemo, useState, useCallback } from "react";

import { Col, Form, Row } from "antd";
import {
  PiCalendarBlankDuotone,
  PiCallBellDuotone,
  PiCoinsDuotone,
  PiForkKnifeDuotone,
  PiGaugeDuotone,
  PiReceiptDuotone,
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
import { FOOD_SERVICE_ID } from "@pages/Finance/Accountants/_shared/utils";

import { MyReportMainServiceDetailParamDtos } from "../MyDoctor/@types/@myDoctorStaticReport";
import FutureOrderContent from "./helper/components/FutureOrderContent/FutureOrderContent";
import IncomeAnalysisContent from "./helper/components/IncomeAnalysisContent/IncomeAnalysisContent";
import TemplateFoodOrderContent from "./helper/components/TemplateFoodOrderContent/TemplateFoodOrderContent";
import StatisticTabCard from "../shared/components/StatisticTabCard/StatisticTabCard";
import FoodPerformanceContent from "./helper/components/FoodPerformanceContent/FoodPerformanceContent";
import OrderAndDeliveryContent from "./helper/components/OrderAndDeliveryContent/OrderAndDeliveryContent";
import TypePresentationContent from "./helper/components/TypePresentationContent/TypePresentationContent";
import { FOOD_CARD_IDS } from "./helper/utils/FoodStaticReportsUtils";
import "./_foodStaticReports.scss";

const TABS_ITEMS = [
  {
    id: FOOD_CARD_IDS.performance,
    title: "عملکرد کلی",
    icon: <PiGaugeDuotone size={24} />,
  },
  {
    id: FOOD_CARD_IDS.orderAndDelivery,
    title: "سفارش و تحویل",
    icon: <PiReceiptDuotone size={24} />,
  },
  {
    id: FOOD_CARD_IDS.typePresentation,
    title: "نوع ارائه غذا",
    icon: <PiForkKnifeDuotone size={24} />,
  },
  {
    id: FOOD_CARD_IDS.futureOrder,
    title: "نمای آینده سفارش‌ها",
    icon: <PiCalendarBlankDuotone size={24} />,
  },
  {
    id: FOOD_CARD_IDS.incomeAnalysis,
    title: "تحلیل درآمد",
    icon: <PiCoinsDuotone size={24} />,
  },
  {
    id: FOOD_CARD_IDS.templateFoodOrders,
    title: "الگوی سفارشات غذا",
    icon: <PiCallBellDuotone size={24} />,
  },
];

const FoodStaticReports = () => {
  const [selectOptions, setSelectOptions] = useState<
    Record<string, { id: number; title: string }[]>
  >({});

  const [triggerItems, setTriggerItems] = useState<Record<string, string>>({});

  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);

  const {
    params: { card },
    setSearchParams,
  } = useQueryParams();

  const [activeCard, setActiveCard] = useState<number>(
    Number(card) || FOOD_CARD_IDS.performance
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
  // Always call getServiceDetail on mount, regardless of card param
  useEffect(() => {
    getServiceDetail({ service: FOOD_SERVICE_ID });
  }, []);

  // Set default card in URL if not present
  useEffect(() => {
    if (!card) {
      setSearchParams({ card: FOOD_CARD_IDS.performance.toString() });
    }
  }, [card, setSearchParams]);

  useEffect(() => {
    if (card) {
      const cardNumber = Number(card);
      if (!isNaN(cardNumber)) {
        setActiveCard(cardNumber);
      }
    }
  }, [card]);

  //* ================================ Util Functions ================================
  // Helper function to check if data has required properties
  const hasProperty = (item: unknown, prop: string): boolean => {
    if (item === null || item === undefined || typeof item !== "object") {
      return false;
    }
    return prop in item;
  };

  // Centralized data validation function
  // Returns: null if data is empty, false if data is invalid, true if data is valid
  const validateData = useCallback(
    (data: unknown, reportTypeTitle: string): boolean | null => {
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
    },
    []
  );
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
      service: FOOD_SERVICE_ID,
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
          service: FOOD_SERVICE_ID,
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
    <div className="food-static-report flex flex-col gap-10">
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
                          [item.key]: dateString as string,
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
                  <Col md={8} lg={6} sm={12} xs={24}>
                    <CustomDatePicker
                      label={item?.paramTitle}
                      name={item?.key}
                      placeholder={item?.paramTitle}
                      form={form}
                      formDateFormat="YYYY-MM-DD"
                      rules={isRequired ? [REQUIRED_RULE] : []}
                      disabled={isDisabled}
                      onChange={(_, dateString) => {
                        setTriggerItems((prev) => ({
                          ...prev,
                          [item.key]: dateString as string,
                        }));
                      }}
                    />
                  </Col>
                );
              }
              if (item?.paramType === 2) {
                const isDisabled = shouldDisableFilter(item);
                const isRequired = item.required === true;
                // Filter out invalid options to prevent crashes
                const validOptions = Object.hasOwn({ ...selectOptions }, item.key)
                  ? (selectOptions[item?.key] || []).filter(
                      (opt) => opt != null && opt.id != null && opt.title != null
                    )
                  : [];

                return (
                  <Col md={8} lg={6} sm={12} xs={24}>
                    <CustomSelect
                      label={item?.paramTitle}
                      name={item?.key}
                      placeholder={item?.paramTitle}
                      rules={isRequired ? [REQUIRED_RULE] : []}
                      disabled={isDisabled}
                      allowClear
                      options={validOptions}
                      form={form}
                      onClick={() =>
                        item?.paramDto ? null : getParamDetailHandler(item)
                      }
                      onChange={(val) => {
                        onSelectChange(item.key, val as string);
                        setTriggerItems((prev) => ({
                          ...prev,
                          [item.key]: val as string,
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
          <Col md={8} lg={6} sm={12} xs={12}>
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
          {/* GENERAL PERFORMANCE   */}
          {activeCard === FOOD_CARD_IDS.performance && (
            <FoodPerformanceContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}

          {/* ORDER AND DELIVER */}
          {activeCard === FOOD_CARD_IDS.orderAndDelivery && (
            <OrderAndDeliveryContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              serviceDetailData={serviceDetailData}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}
          {/* FOOD TYPE PRESENTATION */}
          {activeCard === FOOD_CARD_IDS.typePresentation && (
            <TypePresentationContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}

          {/* FUTURE ORDERS */}
          {activeCard === FOOD_CARD_IDS.futureOrder && (
            <FutureOrderContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}
          {/* INCOME ANALYSIS   */}
          {activeCard === FOOD_CARD_IDS.incomeAnalysis && (
            <IncomeAnalysisContent
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              serviceDetailData={serviceDetailData}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}
          {/* FOOD RESERVATION TEMPLATE */}
          {activeCard === FOOD_CARD_IDS.templateFoodOrders && (
            <TemplateFoodOrderContent
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
export default FoodStaticReports;
