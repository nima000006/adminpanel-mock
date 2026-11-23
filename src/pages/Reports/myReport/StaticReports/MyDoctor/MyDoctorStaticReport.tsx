import { useEffect, useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import { FaRegClock } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { PiExamDuotone } from "react-icons/pi";

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
import { MY_DOCTOR_SERVICE_ID } from "@pages/Finance/Accountants/_shared/utils";

import {
  MyReportMainServiceDetailParamDtos,
  MyReportParamDetailResponse,
} from "./@types/@myDoctorStaticReport";
import StatisticTabCard from "../shared/components/StatisticTabCard/StatisticTabCard";
import ParticipantsStatistics from "./helper/components/ParticipantsStatistics/ParticipantsStatistics";
import ParticipantsStatisticsTable from "./helper/components/ParticipantsStatisticsTable/ParticipantsStatisticsTable";
import RequestStatusSuicideRisk from "./helper/components/RequestStatusSuicideRisk/RequestStatusSuicideRisk";
import ScoresOfTestDimensions from "./helper/components/ScoresOfTestDimensions/ScoresOfTestDimensions";

import "./_myDoctorStaticReport.scss";

const TABS_ITEMS = [
  {
    id: 1,
    title: "آمار شرکت‌کنندگان",
    icon: <GrGroup />,
  },
  {
    id: 2,
    title: "وضعیت درخوا‌ست ها و خودکشی",
    icon: <FaRegClock />,
  },
  {
    id: 3,
    title: "امتیاز محور‌های آزمون",
    icon: <PiExamDuotone />,
  },
  {
    id: 4,
    title: "آمار شرکت کنندگان به تفکیک محور‌های آزمون",
    icon: <GrGroup />,
  },
];

const MyDoctorStaticReport = () => {
  const [selectOptions, setSelectOptions] = useState<
    Record<string, { id: number; title: string }[]>
  >({});

  const [triggerItems, setTriggerItems] = useState({});

  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);

  const {
    params: { card },
    setSearchParams,
  } = useQueryParams();

  const [activeCard, setActiveCard] = useState<number>(Number(card) || 1);

  useTitle({
    breadcrumbItems: [
      {
        title: "گزارشات",
      },
      {
        title: "دکتر من",
      },
      { title: "آمار آزمون ها" },
    ],
  });

  //? ================================  Api Calls ================================
  const [getServiceDetail, { data: serviceDetailData, isLoading: isServiceDataLoading }] =
    useMyReportMainServiceDetailMutation();

  const [getParamDetail] = useMyReportParamDetailMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getServiceDetail({ service: MY_DOCTOR_SERVICE_ID });
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

      case "NUMBER":
        return dataArray.length > 0;

      case "TABLE":
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
      service: MY_DOCTOR_SERVICE_ID,
    })
      .unwrap()
      .then((value: MyReportParamDetailResponse) => {
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
          service: MY_DOCTOR_SERVICE_ID,
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
    <div className="my-doctor-static-report flex flex-col gap-10">
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
                        setTriggerItems((prev) => ({ ...prev, [item.key]: dateString }));
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
                      rules={isRequired ? [REQUIRED_RULE] : []}
                      disabled={isDisabled}
                      onChange={(value, dateString) => {
                        // حالت clear
                        const newDate = value && dateString ? dateString : undefined;

                        setTriggerItems((prev) => ({ ...prev, [item.key]: newDate }));
                        form.setFieldsValue({ [item.key]: value });
                      }}
                    />
                  </Col>
                );
              }
              if (item?.paramType === 2) {
                const isDisabled = shouldDisableFilter(item);
                const isRequired = item.required === true;
                return (
                  <Col md={8} lg={6} sm={12} xs={24}>
                    <CustomSelect
                      label={item?.paramTitle}
                      name={item?.key}
                      placeholder={item?.paramTitle}
                      allowClear
                      options={
                        Object.hasOwn({ ...selectOptions }, item.key)
                          ? selectOptions[item?.key]
                          : []
                      }
                      form={form}
                      rules={isRequired ? [REQUIRED_RULE] : []}
                      disabled={isDisabled}
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
        <div className="flex flex-col gap-6">
          {/* LINE CHART */}
          {activeCard === 1 && (
            <ParticipantsStatistics
              createBodyParams={createBodyParams}
              serviceDetailData={serviceDetailData}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}
          {/* PIE CHART */}
          {activeCard === 2 && (
            <RequestStatusSuicideRisk
              createBodyParams={createBodyParams}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}
          {/* BAR CHART */}
          {activeCard === 3 && (
            <ScoresOfTestDimensions
              createBodyParams={createBodyParams}
              serviceDetailData={serviceDetailData}
              triggerItems={triggerItems}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          )}
          {/*Tabs  */}
          {activeCard === 4 && (
            <ParticipantsStatisticsTable
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

export default MyDoctorStaticReport;
