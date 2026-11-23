import { useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import {
  PiCoinsDuotone,
  PiFileTextDuotone,
  PiGaugeDuotone,
  PiUsersFourDuotone,
} from "react-icons/pi";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { TicketingStaticReportFormValues } from "./@types/@ticketingStaticReportType";
import { TICKETING_STATIC_REPORT_CARD_IDS } from "./utils/ticketingStaticReport";
import StatisticTabCard from "../shared/components/StatisticTabCard/StatisticTabCard";
import ExperienceSupportContent from "./helper/components/ExperienceSupportContent/ExperienceSupportContent";
import OverviewContent from "./helper/components/OverviewContent/OverviewContent";
import TicketsHandlingManagementContent from "./helper/components/TicketsHandlingManagementContent/TicketsHandlingManagementContent";
import TicketsTemplateContent from "./helper/components/TicketsTemplateContent/TicketsTemplateContent";
import "./_ticketingStaticReport.scss";

const mockData = {
  paramDtos: [
    {
      paramId: 4,
      order: null,
      title: null,
      key: "fromDate",
      paramDto: null,
      paramType: 3,
      paramTitle: "از",
      required: true,
    },
    {
      paramId: 5,
      order: null,
      title: null,
      key: "toDate",
      paramDto: null,
      paramType: 3,
      paramTitle: "تا",
      required: true,
    },
    {
      paramId: 11,
      order: null,
      title: null,
      key: "province",
      paramDto: null,
      paramType: 2,
      paramTitle: "استان",
      required: false,
    },
    {
      paramId: 12,
      order: null,
      title: null,
      key: "branch",
      paramDto: {
        paramId: 11,
        order: null,
        title: null,
        key: "province",
        paramDto: null,
        paramType: 11,
        paramTitle: "استان",
        required: false,
      },
      paramType: 2,
      paramTitle: "واحد",
      required: false,
    },
    {
      paramId: 13,
      order: null,
      title: null,
      key: "service",
      paramDto: {
        paramId: 12,
        order: null,
        title: null,
        key: "branch",
        paramDto: null,
        paramType: 12,
        paramTitle: "واحد",
        required: false,
      },
      paramType: 2,
      paramTitle: "سرویس",
      required: false,
    },
  ],
};

const TABS_ITEMS = [
  {
    id: TICKETING_STATIC_REPORT_CARD_IDS?.overview,
    title: "نمای کلی تیکت‌ها",
    icon: <PiGaugeDuotone size={24} />,
  },
  {
    id: TICKETING_STATIC_REPORT_CARD_IDS?.userExperienceSupport,
    title: "تجربه کاربران از پشتیبانی",
    icon: <PiUsersFourDuotone size={24} />,
  },

  {
    id: TICKETING_STATIC_REPORT_CARD_IDS?.ticketsTemplate,
    title: "الگوی تیکت‌ها",
    icon: <PiCoinsDuotone size={24} />,
  },

  {
    id: TICKETING_STATIC_REPORT_CARD_IDS?.ticketHandlingManagement,
    title: "مدیریت رسیدگی تیکت‌ها",
    icon: <PiFileTextDuotone size={24} />,
  },
];
const TicketingStaticReport = () => {
  const [_, setTriggerItems] = useState<Record<string, string | string[]>>({});

  const [selectOptions] = useState<Record<string, { id: number; title: string }[]>>({});

  const [form] = Form.useForm<TicketingStaticReportFormValues>();
  const formValues = Form.useWatch([], form);

  const {
    params: { card },
    setSearchParams,
  } = useQueryParams();

  const [activeCard, setActiveCard] = useState<number>(
    Number(card) || TICKETING_STATIC_REPORT_CARD_IDS?.overview
  );

  useTitle({
    breadcrumbItems: [
      {
        title: " داشبورد",
      },
    ],
  });
  //* ================================ Util Functions ================================
  // برای بررسی اینکه ایا این فیلد برای فعال بودن به فیلد دیگری وابسته است یا خیر
  const shouldDisableFilter = (item: any) => {
    // اگر این فیلتر وابسته به فیلتر دیگری است
    if (item?.paramDto?.paramId) {
      const parentItem = mockData?.paramDtos?.find(
        (p) => p.paramId === item.paramDto?.paramId
      );

      if (parentItem) {
        // استفاده از formValues برای ردیابی تغییرات reactive
        const parentValue =
          formValues?.[parentItem.key as keyof TicketingStaticReportFormValues];
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

  const onSelectChange = (key: string /*, value: string*/) => {
    const childItem = mockData?.paramDtos?.find((p) => p?.paramDto?.key === key);

    if (childItem) {
      // ریست کردن مقدار قبلی برای child
      form.setFieldsValue({ [childItem?.key]: undefined });
      // دریافت مجدد دیتا از بک‌اند

      // todo[shirin]:uncomment when api is ready

      // const buildParams = (paramId?: number, value?: string | number) =>
      //   paramId && value != null && value !== "" ? { [paramId]: value } : undefined;

      // const params = buildParams(childItem?.paramDto?.paramId || 0, value);

      // if (childItem?.paramDto?.paramId) {
      //   getParamDetail({
      //     id: childItem.paramId,
      //     ...(params && { params }),
      //     service: DORM_SERVICE_ID,
      //   })
      //     .unwrap()
      //     .then((value) => {
      //       setSelectOptions((prev) => ({
      //         ...prev,
      //         [childItem.key]: value?.map((v) => ({
      //           id: v.id,
      //           title: v.title,
      //         })),
      //       }));
      //     });
      // }
    }
  };

  // بررسی اینکه آیا فیلدهای required پر شده‌اند (برای جلوگیری از ارسال درخواست)
  // استفاده از useMemo برای محاسبه reactive بر اساس formValues
  const isFormValid = useMemo(() => {
    if (!formValues || !mockData) {
      return false;
    }

    const requiredParams = mockData?.paramDtos?.filter(
      (item: any) => item.required === true
    );

    if (!requiredParams || requiredParams.length === 0) {
      return true; // اگر هیچ فیلتر required وجود نداشت، true برگردان
    }

    return requiredParams.every((item) => {
      const value = formValues[item.key as keyof TicketingStaticReportFormValues];
      return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(typeof value === "object" && !Object.keys(value).length)
      );
    });
  }, [formValues, mockData]);

  // handler
  const getParamDetailHandler = (item: any) => {
    if (Object.hasOwn({ ...selectOptions }, item.key)) return;
  };

  const changeCardHandler = (id: number) => {
    setActiveCard(id);
    setSearchParams({ card: id?.toString() });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="ticketing-staticReport-page-container flex-col gap-10">
      <Div>
        <Form form={form}>
          <Row gutter={[16, 16]}>
            {mockData?.paramDtos?.map((item) => {
              if (item?.paramType === 4) {
                // const isDisabled = shouldDisableFilter(item);
                // const isRequired = item.required === true;
                return (
                  <Col md={8} lg={6} sm={12} xs={24}>
                    <CustomDatePicker
                      label={item?.paramTitle}
                      name={item?.key}
                      placeholder={item?.paramTitle}
                      form={form}
                      // rules={isRequired ? [REQUIRED_RULE] : []}
                      // disabled={isDisabled}
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
                // const isDisabled = shouldDisableFilter(item);
                // const isRequired = item.required === true;

                return (
                  <Col md={8} lg={6} sm={12} xs={24} key={item.key}>
                    <CustomDatePicker
                      label={item?.paramTitle}
                      name={item?.key}
                      placeholder={item?.paramTitle}
                      // disabled={isDisabled}
                      form={form}
                      allowClear
                      // rules={isRequired ? [REQUIRED_RULE] : []}
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
                        onSelectChange(item.key /* val as string*/);
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
        <div className="mt-10 flex flex-col gap-10">
          <CustomAlert
            type="warning"
            message="لطفا فیلد های اجباری را پر کنید."
            showIcon
          />
          <CustomEmpty />
        </div>
      ) : (
        <div>
          {/* OVERVIEW CONTENT */}
          {activeCard === TICKETING_STATIC_REPORT_CARD_IDS?.overview && (
            <OverviewContent />
          )}
          {/* EXPERIENCE SUPPORT CONTENT */}
          {activeCard === TICKETING_STATIC_REPORT_CARD_IDS?.userExperienceSupport && (
            <ExperienceSupportContent />
          )}
          {/* TICKETS TEMPLATE */}
          {activeCard === TICKETING_STATIC_REPORT_CARD_IDS?.ticketsTemplate && (
            <TicketsTemplateContent />
          )}
          {/* TICKETS HANDLING MANAGEMENT */}
          {activeCard === TICKETING_STATIC_REPORT_CARD_IDS?.ticketHandlingManagement && (
            <TicketsHandlingManagementContent />
          )}
        </div>
      )}
    </div>
  );
};

export default TicketingStaticReport;
