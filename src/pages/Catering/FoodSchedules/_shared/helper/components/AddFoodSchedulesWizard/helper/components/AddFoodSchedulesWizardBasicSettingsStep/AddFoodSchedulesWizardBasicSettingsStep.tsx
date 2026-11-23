import { useEffect, useState } from "react";

import { CheckboxChangeEvent, Col, Form, Row } from "antd";

import {
  CustomButton,
  CustomSelect,
  CustomSingleCheckbox,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useGetCateringMySelfsListMutation,
  useGetCateringSelfsListMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { ADD_FOOD_SCHEDULES_WIZARD_SCOPE } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/@types/@addFoodSchedulesWizard";
import { AddFoodSchedulesWizardBasicSettingsStepProps } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardBasicSettingsStep/@types/@addFoodSchedulesWizardBasicSettingsStep";
import {
  ADD_FOOD_SCHEDULES_EDUCATION_LEVEL_OPTIONS,
  ADD_FOOD_SCHEDULES_ENTRY_YEAR_OPTIONS,
  ADD_FOOD_SCHEDULES_FIELD_OF_STUDY_OPTIONS,
} from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/mock/addFoodSchedulesWizardBasicSettingsMock";
import {
  ADD_FOOD_SCHEDULES_BASIC_SETTINGS_ALERT_DESCRIPTION,
  ADD_FOOD_SCHEDULES_PERSONALIZATION_ALERT_DESCRIPTION,
} from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/utils/addFoodSchedulesWizardUtils";
import {
  GetCateringMySelfsListResponse,
  GetCateringSelfsListResponse,
} from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";

const SELFS_REQUEST = {
  params: {
    pageNumber: 0,
    pageSize: 100,
  },
  body: {
    statusType: [...CATERING_STATUS_TYPES_MAIN_LIST],
  },
};

const AddFoodSchedulesWizardBasicSettingsStep = ({
  form,
  scope,
  onBack,
  onContinue,
}: AddFoodSchedulesWizardBasicSettingsStepProps) => {
  const isPersonalized = Form.useWatch("isPersonalized", form);
  const [cafeteriaOptions, setCafeteriaOptions] = useState<
    { id: number; title: string }[]
  >([]);

  const [getCateringSelfsList, { isLoading: isGetCateringSelfsListLoading }] =
    useGetCateringSelfsListMutation();
  const [getCateringMySelfsList, { isLoading: isGetCateringMySelfsListLoading }] =
    useGetCateringMySelfsListMutation();
  const [
    getBranchByBusiness,
    { data: branchOptions = [], isFetching: isGetBranchByBusinessLoading },
  ] = useLazyGetBranchByBusinessQuery();

  const isSelfsLoading = isGetCateringSelfsListLoading || isGetCateringMySelfsListLoading;

  //* ================================ Effects  ================================
  useEffect(() => {
    const mapSelfs = (
      res: GetCateringSelfsListResponse | GetCateringMySelfsListResponse
    ) => {
      setCafeteriaOptions(
        res?.content?.map((item) => ({
          id: item.id,
          title: item.title,
        })) ?? []
      );
    };

    if (scope === ADD_FOOD_SCHEDULES_WIZARD_SCOPE.ALL) {
      getCateringSelfsList(SELFS_REQUEST).unwrap().then(mapSelfs);
    } else {
      getCateringMySelfsList(SELFS_REQUEST).unwrap().then(mapSelfs);
    }

    getBranchByBusiness({ businessIds: [4] });
  }, [getBranchByBusiness, getCateringMySelfsList, getCateringSelfsList, scope]);

  //* ================================ Util Functions ================================
  const handlePersonalizationChange = (event: CheckboxChangeEvent) => {
    const checked = event.target.checked;

    form.setFieldValue("isPersonalized", checked);

    if (checked) {
      return;
    }

    form.setFieldsValue({
      educationLevelIds: undefined,
      fieldOfStudyIds: undefined,
      entryYearIds: undefined,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-6">
      <CustomAlert
        className="border-primary-4 bg-primary-1 w-full rounded-lg border-dashed"
        type="info"
        showIcon
        title="تنظیمات پایه برنامه غذایی"
        description={ADD_FOOD_SCHEDULES_BASIC_SETTINGS_ALERT_DESCRIPTION}
      />

      <Form
        form={form}
        layout="vertical"
        className="flex w-full flex-col gap-6"
        requiredMark
        onFinish={onContinue}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <CustomSelect
              name="cafeteriaId"
              label="سلف"
              options={cafeteriaOptions}
              isLoading={isSelfsLoading}
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <CustomSelect
              name="agreementUnitIds"
              label="شعبه / واحد تفاهمی"
              mode="multiple"
              maxTagCount="responsive"
              options={branchOptions}
              isLoading={isGetBranchByBusinessLoading}
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
            />
          </Col>
        </Row>

        <div className="flex w-full flex-col gap-4">
          <CustomAlert
            className="border-primary-4 bg-primary-1 w-full rounded-lg border-dashed"
            type="info"
            showIcon
            title="شخصی سازی برنامه غذایی"
            description={ADD_FOOD_SCHEDULES_PERSONALIZATION_ALERT_DESCRIPTION}
          />

          <CustomSingleCheckbox
            name="isPersonalized"
            valuePropName="checked"
            onChange={handlePersonalizationChange}
          >
            شخصی سازی برنامه غذایی
          </CustomSingleCheckbox>

          {isPersonalized ? (
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <CustomSelect
                  name="educationLevelIds"
                  label="مقطع تحصیلی"
                  mode="multiple"
                  maxTagCount="responsive"
                  options={ADD_FOOD_SCHEDULES_EDUCATION_LEVEL_OPTIONS}
                  placeholder="انتخاب کنید"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <CustomSelect
                  name="fieldOfStudyIds"
                  label="رشته تحصیلی"
                  mode="multiple"
                  maxTagCount="responsive"
                  options={ADD_FOOD_SCHEDULES_FIELD_OF_STUDY_OPTIONS}
                  placeholder="انتخاب کنید"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <CustomSelect
                  name="entryYearIds"
                  label="سال ورود"
                  mode="multiple"
                  maxTagCount="responsive"
                  options={ADD_FOOD_SCHEDULES_ENTRY_YEAR_OPTIONS}
                  placeholder="انتخاب کنید"
                />
              </Col>
            </Row>
          ) : null}
        </div>

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

export default AddFoodSchedulesWizardBasicSettingsStep;
