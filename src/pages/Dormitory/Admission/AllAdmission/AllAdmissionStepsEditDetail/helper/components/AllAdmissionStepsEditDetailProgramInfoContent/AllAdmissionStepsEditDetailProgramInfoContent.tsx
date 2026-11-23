import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";

import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomSwitch,
} from "@components/CustomInputs";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ReservableCapacityType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import {
  MY_ADMISSION_DETAIL_TABS,
  RESERVABLE_CAPACITY_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import { AllAdmissionStepsEditDetailProgramInfoFormType } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailProgramInfoContent/@types/@allAdmissionStepsEditDetailProgramInfoContent";

const data = ADMISSION_DETAIL_MOCK_DATA;

const MANAGEMENT_TYPE_OPTIONS = [
  { id: "خودگردان", title: "خودگردان" },
  { id: "متمرکز", title: "متمرکز" },
];

const RESERVABLE_CAPACITY_OPTIONS: {
  value: ReservableCapacityType;
  title: string;
  description?: string;
}[] = [
  {
    value: RESERVABLE_CAPACITY_TYPE.bed,
    title: "تخت",
  },
  {
    value: RESERVABLE_CAPACITY_TYPE.unit,
    title: "واحد اقامتی (دربستی)",
  },
  {
    value: RESERVABLE_CAPACITY_TYPE.building,
    title: "ساختمان (دربستی)",
  },
];

const AllAdmissionStepsEditDetailProgramInfoContent = () => {
  const navigate = useNavigate();
  const { params: url } = useQueryParams();
  const [form] = Form.useForm<AllAdmissionStepsEditDetailProgramInfoFormType>();

  //* ================================ Util Functions ================================
  const cancelEditHandler = () => {
    navigate({
      pathname: DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id: url?.id ?? data.id,
        tab: MY_ADMISSION_DETAIL_TABS.programInfo,
      }),
    });
  };

  const submitHandler = (_values: AllAdmissionStepsEditDetailProgramInfoFormType) => {
    // TODO: wire submit API when contract is available
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      className="flex flex-1 flex-col gap-6"
      initialValues={{
        programTitle: data.programTitle,
        managementType: data.managementType,
        reservableCapacity: data.reservableCapacity,
        checked: data.isVisibleToUsers,
      }}
      onFinish={submitHandler}
    >
      <Row gutter={[16, 16]}>
        <Col xl={6} lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            name="programTitle"
            label="عنوان برنامه پذیرش"
            rules={[REQUIRED_RULE]}
          />
        </Col>

        <SingleVerticalWithCol label="کسب و کار" value={data.business} />
        <SingleVerticalWithCol label="شعبه / واحد" value={data.branch} />
        <SingleVerticalWithCol label="اقامتگاه" value={data.residence} />

        <Col xl={6} lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="managementType"
            label="نوع مدیریت"
            form={form}
            options={MANAGEMENT_TYPE_OPTIONS}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
          />
        </Col>
      </Row>

      <AdmissionRadioCard
        form={form}
        name="reservableCapacity"
        label="ظرفیت قابل رزرو در این برنامه پذیرش"
        tooltip="ظرفیت قابل رزرو در این برنامه پذیرش"
        rules={[REQUIRED_RULE]}
        options={RESERVABLE_CAPACITY_OPTIONS.map((option) => ({
          value: option.value,
          title: option.title,
          description: option.description,
          disabled: option.value !== data.reservableCapacity,
        }))}
      />

      <CustomSwitch
        className="[&>div]:flex! [&>div]:flex-col! [&>div]:items-start! [&>div]:gap-1!"
        label="وضعیت نمایش به کاربران"
        name="isVisibleToUsers"
        valuePropName="checked"
        checkedChildren="قابل نمایش"
        unCheckedChildren="غیر قابل نمایش"
        tooltip="وضعیت نمایش به کاربران"
        rules={[REQUIRED_RULE]}
      />

      <div className="mt-auto flex items-center justify-end gap-4 self-end">
        <CustomButton onClick={cancelEditHandler}>انصراف از ویرایش</CustomButton>
        <CustomButton type="primary" htmlType="submit">
          ثبت و اعمال تغییرات
        </CustomButton>
      </div>
    </Form>
  );
};

export default AllAdmissionStepsEditDetailProgramInfoContent;
