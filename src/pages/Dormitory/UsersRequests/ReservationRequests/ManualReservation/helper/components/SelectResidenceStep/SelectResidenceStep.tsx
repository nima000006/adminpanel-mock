import { Col, Form, Row } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router";

import { CustomButton, CustomRangePicker, CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  AdmissionProgramScheduleType,
  SelectResidenceFormType,
} from "./@types/@selectResidenceStep";
import {
  MANUAL_RESERVATION_MOCK_ADMISSION_PROGRAMS,
  MANUAL_RESERVATION_MOCK_BRANCHES,
  MANUAL_RESERVATION_MOCK_RESIDENCES,
} from "../../mock/manualReservationResidences";

const getAdmissionScheduleType = (
  admissionProgram?: SelectResidenceFormType["admissionProgram"]
): AdmissionProgramScheduleType | undefined => {
  const fromItem = admissionProgram?.item?.type;
  if (fromItem) return fromItem;

  const matched = MANUAL_RESERVATION_MOCK_ADMISSION_PROGRAMS.find(
    (program) => String(program.id) === String(admissionProgram?.value)
  );

  return matched?.type;
};

const SelectResidenceStep = () => {
  const [form] = Form.useForm<SelectResidenceFormType>();
  const navigate = useNavigate();
  const { params, setSearchParams } = useQueryParams();

  const residence = Form.useWatch("residence", form);
  const admissionProgram = Form.useWatch("admissionProgram", form);

  const hasResidence = Boolean(residence?.value ?? residence);
  const scheduleType = getAdmissionScheduleType(admissionProgram);
  const isTermic = scheduleType === "termic";
  const isMonthly = scheduleType === "monthly";

  //? ================================ Handlers ================================

  const cancelClickHandler = () => {
    navigate(DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE);
  };

  const backClickHandler = () => {
    setSearchParams({ ...params, step: "1" });
  };

  const residenceChangeHandler = () => {
    form.setFieldsValue({
      admissionProgram: undefined,
      stayRange: undefined,
    });
  };

  const admissionProgramChangeHandler = (_: unknown, option?: unknown) => {
    const selected = (option as SelectResidenceFormType["admissionProgram"] | undefined)
      ?.item;
    const type = selected?.type;

    if (type === "termic" && selected?.stayRange) {
      form.setFieldValue("stayRange", selected.stayRange);
      return;
    }

    form.setFieldValue("stayRange", undefined);
  };

  const submitClickHandler = async () => {
    const values = await form.validateFields();
    const allocationType =
      values.admissionProgram?.item?.allocationType ??
      MANUAL_RESERVATION_MOCK_ADMISSION_PROGRAMS.find(
        (program) => String(program.id) === String(values.admissionProgram?.value)
      )?.allocationType ??
      "bed";
    const residenceName =
      values.residence?.label || values.residence?.item?.title || values.residence?.title;
    const {
      allocationSummary: _allocationSummary,
      payableAmount: _payableAmount,
      ...restParams
    } = params;

    setSearchParams({
      ...restParams,
      step: "3",
      allocationType,
      ...(residenceName ? { residenceName: String(residenceName) } : {}),
    });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submitClickHandler}
      className="flex min-h-[calc(100dvh-16rem)] flex-col"
    >
      <Div className="flex flex-1 flex-col gap-6">
        <p className="h5-medium text-right">
          مشخصات مربوط به بازه و اسکان را تعیین نمایید.
        </p>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <CustomSelect
              name="branch"
              label="شعبه/واحد"
              form={form}
              options={MANUAL_RESERVATION_MOCK_BRANCHES}
              placeholder="انتخاب کنید"
              allowClear
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <CustomSelect
              name="residence"
              label="اقامتگاه"
              form={form}
              options={MANUAL_RESERVATION_MOCK_RESIDENCES}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
              onChange={residenceChangeHandler}
              allowClear
            />
          </Col>
        </Row>

        <CustomDivider
          text="برنامه پذیرش"
          className="mb-0!"
          extraContent={<CustomButton>فیلتر پیشرفته</CustomButton>}
        />

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <CustomSelect
              name="admissionProgram"
              label="برنامه پذیرش"
              form={form}
              options={MANUAL_RESERVATION_MOCK_ADMISSION_PROGRAMS}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
              disabled={!hasResidence}
              onChange={admissionProgramChangeHandler}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <CustomRangePicker
              name="stayRange"
              label="بازه اسکان"
              form={form}
              rules={[REQUIRED_RULE]}
              placeholder={["تاریخ", "تاریخ"]}
              picker={isTermic ? undefined : isMonthly ? "month" : "date"}
              disabled={isTermic || !hasResidence}
              allowClear={!isTermic}
              variant={isTermic ? "filled" : undefined}
            />
          </Col>
        </Row>

        <div className="mt-auto flex items-center justify-end gap-4">
          <CustomButton onClick={cancelClickHandler}>انصراف</CustomButton>
          <CustomButton onClick={backClickHandler}>بازگشت</CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            icon={<AiOutlineArrowLeft />}
            iconPlacement="end"
          >
            ثبت و ادامه
          </CustomButton>
        </div>
      </Div>
    </Form>
  );
};

export default SelectResidenceStep;
