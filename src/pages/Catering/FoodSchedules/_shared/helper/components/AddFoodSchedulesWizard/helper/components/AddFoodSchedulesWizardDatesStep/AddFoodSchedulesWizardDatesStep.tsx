import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import {
  CustomButton,
  CustomDatePicker,
  CustomRadioGroup,
  CustomRangePicker,
  CustomRangeTimePicker,
  CustomSelect,
  CustomTimePicker,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import {
  useGetDetailAllSelfsContractsMutation,
  useGetDetailMySelfsContractsMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { REQUEST_CONTRACT_STATUS_FILTER } from "@pages/Catering/contracts/_shared/@requestContractStatus";
import {
  ADD_FOOD_SCHEDULES_PATTERN,
  ADD_FOOD_SCHEDULES_WIZARD_SCOPE,
  AddFoodSchedulesPattern,
} from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/@types/@addFoodSchedulesWizard";
import { AddFoodSchedulesWizardDatesStepProps } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardDatesStep/@types/@addFoodSchedulesWizardDatesStep";
import AddFoodSchedulesWizardDatesStepDateCard from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardDatesStep/helper/components/AddFoodSchedulesWizardDatesStepDateCard/AddFoodSchedulesWizardDatesStepDateCard";
import {
  ADD_FOOD_SCHEDULES_DATES_COLLAPSED_COUNT,
  ADD_FOOD_SCHEDULES_DATES_EMPTY_DESCRIPTION,
  ADD_FOOD_SCHEDULES_DATES_STEP_ALERT_DESCRIPTION,
  ADD_FOOD_SCHEDULES_PATTERN_OPTIONS,
  ADD_FOOD_SCHEDULES_RESERVATION_DAY_OPTIONS,
  ADD_FOOD_SCHEDULES_WEEK_DAY_OPTIONS,
} from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/utils/addFoodSchedulesWizardUtils";
import { GetDetailAllSelfsContractsResponse } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";
import { GetDetailMySelfsContractsResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

const CONTRACTS_REQUEST = {
  params: {
    pageNumber: 0,
    pageSize: 100,
  },
  body: {
    contractStatus: [...REQUEST_CONTRACT_STATUS_FILTER.accepted],
    statusType: [...CATERING_STATUS_TYPES_MAIN_LIST],
  },
};

const AddFoodSchedulesWizardDatesStep = ({
  form,
  scope,
  scheduleDates,
  onBack,
  onContinue,
}: AddFoodSchedulesWizardDatesStepProps) => {
  const [isDatesExpanded, setIsDatesExpanded] = useState(false);
  const [contractOptions, setContractOptions] = useState<{ id: number; title: string }[]>(
    []
  );

  const [getDetailAllSelfsContracts, { isLoading: isGetDetailAllSelfsContractsLoading }] =
    useGetDetailAllSelfsContractsMutation();
  const [getDetailMySelfsContracts, { isLoading: isGetDetailMySelfsContractsLoading }] =
    useGetDetailMySelfsContractsMutation();

  const pattern = Form.useWatch("pattern", form) as AddFoodSchedulesPattern | undefined;
  const isWeekly = pattern === ADD_FOOD_SCHEDULES_PATTERN.WEEKLY;
  const datesCount = scheduleDates.length;
  const visibleDates = isDatesExpanded
    ? scheduleDates
    : scheduleDates.slice(0, ADD_FOOD_SCHEDULES_DATES_COLLAPSED_COUNT);
  const canToggleDatesList = datesCount > ADD_FOOD_SCHEDULES_DATES_COLLAPSED_COUNT;
  const isContractsLoading =
    isGetDetailAllSelfsContractsLoading || isGetDetailMySelfsContractsLoading;

  //* ================================ Effects  ================================
  useEffect(() => {
    const mapContracts = (
      res: GetDetailAllSelfsContractsResponse | GetDetailMySelfsContractsResponse
    ) => {
      setContractOptions(
        res?.content?.map((item) => ({
          id: item.id,
          title: item.title,
        })) ?? []
      );
    };

    if (scope === ADD_FOOD_SCHEDULES_WIZARD_SCOPE.ALL) {
      getDetailAllSelfsContracts(CONTRACTS_REQUEST).unwrap().then(mapContracts);
      return;
    }

    getDetailMySelfsContracts(CONTRACTS_REQUEST).unwrap().then(mapContracts);
  }, [getDetailAllSelfsContracts, getDetailMySelfsContracts, scope]);

  //* ================================ Util Functions ================================
  const handlePatternChange = (nextPattern: AddFoodSchedulesPattern) => {
    form.setFieldValue("pattern", nextPattern);

    if (nextPattern === ADD_FOOD_SCHEDULES_PATTERN.WEEKLY) {
      form.setFieldsValue({
        scheduleDate: undefined,
      });
      return;
    }

    form.setFieldsValue({
      weekDays: undefined,
      scheduleDateRange: undefined,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-6">
      <CustomAlert
        className="border-primary-4 bg-primary-1 w-full rounded-lg border-dashed"
        type="info"
        showIcon
        title="تاریخ های برنامه غذایی"
        description={ADD_FOOD_SCHEDULES_DATES_STEP_ALERT_DESCRIPTION}
      />

      <Form
        form={form}
        layout="vertical"
        className="flex w-full flex-col gap-6"
        requiredMark
        onFinish={onContinue}
      >
        <div className="flex w-full flex-col gap-2">
          <CustomRadioGroup
            name="pattern"
            label="الگوی برنامه غذایی"
            rules={[REQUIRED_RULE]}
            hasVerticalLabel
            options={ADD_FOOD_SCHEDULES_PATTERN_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            className="mb-0! w-full [&_.ant-form-item-control-input]:m-0! [&_.ant-form-item-control-input]:h-0! [&_.ant-form-item-control-input]:min-h-0! [&_.ant-form-item-row]:gap-1! [&_.ant-radio-group]:hidden!"
          />

          <div className="flex w-full flex-wrap gap-4">
            {ADD_FOOD_SCHEDULES_PATTERN_OPTIONS.map((option) => {
              const isSelected = pattern === option.value;

              return (
                <div
                  key={option.value}
                  role="button"
                  tabIndex={0}
                  onClick={() => handlePatternChange(option.value)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") {
                      return;
                    }

                    event.preventDefault();
                    handlePatternChange(option.value);
                  }}
                  className={`flex min-w-[172px] cursor-pointer items-center gap-2 rounded-lg border border-solid px-3 py-3 ${
                    isSelected
                      ? "border-primary-6 bg-primary-1"
                      : "border-neutral-4 bg-neutral-1"
                  }`}
                >
                  <CustomRadioGroup
                    noStyle
                    value={isSelected ? option.value : undefined}
                    onChange={(event) =>
                      handlePatternChange(event.target.value as AddFoodSchedulesPattern)
                    }
                    options={[{ value: option.value, label: null }]}
                  />
                  <span className="body-regular text-neutral-10">{option.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <CustomSelect
              name="contractId"
              label="قرارداد"
              options={contractOptions}
              isLoading={isContractsLoading}
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
            />
          </Col>

          {isWeekly ? (
            <>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <CustomSelect
                  name="weekDays"
                  label="روز هفته"
                  mode="multiple"
                  maxTagCount="responsive"
                  options={ADD_FOOD_SCHEDULES_WEEK_DAY_OPTIONS}
                  rules={[REQUIRED_RULE]}
                  placeholder="انتخاب روز هفته"
                  tooltip="روزهای هفته‌ای که برنامه غذایی در آن‌ها تکرار می‌شود."
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <CustomRangePicker
                  name="scheduleDateRange"
                  label="شروع و پایان برنامه غذایی"
                  rules={[REQUIRED_RULE]}
                  placeholder={["تاریخ شروع", "تاریخ پایان"]}
                />
              </Col>
            </>
          ) : (
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <CustomDatePicker
                name="scheduleDate"
                label="تاریخ برنامه غذایی"
                rules={[REQUIRED_RULE]}
                placeholder="انتخاب تاریخ"
              />
            </Col>
          )}

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <CustomRangeTimePicker
              name="deliveryTimeRange"
              label="ساعت شروع و پایان تحویل"
              rules={[REQUIRED_RULE]}
              defaultValue={undefined}
              extra={null}
              format="HH:mm"
              className="vertical-label w-full"
              placeholder={["شروع تحویل", "پایان تحویل"]}
              tooltip="بازه زمانی تحویل غذا."
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <CustomSelect
              name="reservationStartDay"
              label="شروع رزرو"
              options={ADD_FOOD_SCHEDULES_RESERVATION_DAY_OPTIONS}
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
              tooltip="چند روز قبل از تاریخ برنامه، رزرو آغاز می‌شود."
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <CustomTimePicker
              name="reservationStartTime"
              label="ساعت شروع رزرو"
              rules={[REQUIRED_RULE]}
              placeholder="شروع رزرو"
              className="w-full"
              tooltip="ساعت آغاز بازه رزرو."
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <CustomSelect
              name="reservationEndDay"
              label="پایان رزرو"
              options={ADD_FOOD_SCHEDULES_RESERVATION_DAY_OPTIONS}
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
              tooltip="چند روز قبل از تاریخ برنامه، رزرو پایان می‌یابد."
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <CustomTimePicker
              name="reservationEndTime"
              label="ساعت پایان رزرو"
              rules={[REQUIRED_RULE]}
              placeholder="پایان رزرو"
              className="w-full"
              tooltip="ساعت پایان بازه رزرو."
            />
          </Col>
        </Row>

        {isWeekly ? (
          <div className="flex w-full flex-col gap-4">
            <CustomDivider
              text={`تاریخ‌های برنامه غذایی (${datesCount})`}
              plain={false}
            />

            {datesCount === 0 ? (
              <CustomEmpty description={ADD_FOOD_SCHEDULES_DATES_EMPTY_DESCRIPTION} />
            ) : (
              <>
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {visibleDates.map((item) => (
                    <AddFoodSchedulesWizardDatesStepDateCard key={item.id} item={item} />
                  ))}
                </div>

                {canToggleDatesList ? (
                  <CustomButton
                    type="default"
                    className="w-full"
                    icon={isDatesExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    iconPlacement="end"
                    onClick={() => setIsDatesExpanded((prev) => !prev)}
                  >
                    {isDatesExpanded ? "نمایش کمتر" : "نمایش همه"}
                  </CustomButton>
                ) : null}
              </>
            )}
          </div>
        ) : null}

        <div className="flex w-full flex-wrap gap-4">
          <CustomButton type="primary" htmlType="submit" className="min-w-[120px]">
            ثبت و ادامه
          </CustomButton>
          <CustomButton type="default" className="min-w-[120px]" onClick={onBack}>
            بازگشت
          </CustomButton>
        </div>
      </Form>
    </div>
  );
};

export default AddFoodSchedulesWizardDatesStep;
