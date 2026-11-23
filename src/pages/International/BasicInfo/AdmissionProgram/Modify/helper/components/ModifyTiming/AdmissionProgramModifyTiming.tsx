import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useCreateInternationalAdmissionDateInformationMutation,
  useLazyGetInternationalAdmissionDetailTimingIfoQuery,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import { dateCreator } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";
import { GetInternationalAdmissionDetailTimingInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailTiming/@types/@admissionProgramDetailTiming";

import { TimingInfoForm } from "./@types/@admissionProgramModifyTiming";
import { AdmissionProgramModifyStepsProps } from "../../../@types/@admissionProgramModify";
import "./_admissionProgramModifyTiming.scss";

const requiredFields = [
  "displayStartDate",
  "displayStartTime",
  "displayEndDate",
  "displayEndTime",
  "applicationStartDate",
  "applicationStartTime",
  "applicationEndDate",
  "applicationEndTime",
  "preRegistrationStartDate",
  "preRegistrationStartTime",
  "preRegistrationEndDate",
  "preRegistrationEndTime",
  "registrationStartDate",
  "registrationStartTime",
  "registrationEndDate",
  "registrationEndTime",
];
const AdmissionProgramModifyTiming = ({
  setCurrent,
}: AdmissionProgramModifyStepsProps) => {
  const {
    params: { id, stepNo, copiedId },
    setSearchParams,
  } = useQueryParams();

  const [form] = Form.useForm<TimingInfoForm>();

  //? ================================  Api Calls ================================
  const [getData, { isFetching: isGetDataLoading }] =
    useLazyGetInternationalAdmissionDetailTimingIfoQuery();

  const [createAdmissionDateInfo, { isLoading: isCreateAdmissionDateInfoLoading }] =
    useCreateInternationalAdmissionDateInformationMutation();

  //? ================================ Effects ================================

  useEffect(() => {
    if (+stepNo <= 2 && copiedId) {
      getData(copiedId).unwrap().then(getDataSuccess); // copy
    } else {
      if (id) {
        getData(id).unwrap().then(getDataSuccess);
      }
    }
  }, [id, copiedId]);

  //* ================================ Util Functions ================================
  const allValues = Form.useWatch([], form); // watch کل فرم
  const isFormComplete = requiredFields.every((key) => {
    const value = allValues?.[key as keyof TimingInfoForm];
    if (dayjs.isDayjs(value)) return value.isValid();
    return !!value;
  });
  const getDataSuccess = async (
    value: GetInternationalAdmissionDetailTimingInfoResponse
  ) => {
    form.setFieldsValue({
      // semesterStartDate: value?.semesterStartDate,
      // semesterEndDate: value?.semesterEndDate,
      displayStartDate: value?.displayStartDate,
      ...(value?.displayStartDate && {
        displayStartTime: dayjs(value?.displayStartDate),
      }),
      displayEndDate: value?.displayEndDate,
      ...(value?.displayEndDate && { displayEndTime: dayjs(value?.displayEndDate) }),
      applicationStartDate: value?.applicationStartDate,
      ...(value?.applicationStartDate && {
        applicationStartTime: dayjs(value?.applicationStartDate),
      }),
      applicationEndDate: value?.applicationEndDate,
      ...(value?.applicationEndDate && {
        applicationEndTime: dayjs(value?.applicationEndDate),
      }),
      preRegistrationStartDate: value?.preRegistrationStartDate,
      ...(value?.preRegistrationStartDate && {
        preRegistrationStartTime: dayjs(value?.preRegistrationStartDate),
      }),
      preRegistrationEndDate: value?.preRegistrationEndDate,
      ...(value?.preRegistrationEndDate && {
        preRegistrationEndTime: dayjs(value?.preRegistrationEndDate),
      }),
      registrationStartDate: value?.registrationStartDate,
      ...(value?.registrationStartDate && {
        registrationStartTime: dayjs(value?.registrationStartDate),
      }),
      registrationEndDate: value?.registrationEndDate,
      ...(value?.registrationEndDate && {
        registrationEndTime: dayjs(value?.registrationEndDate),
      }),
    });
  };

  const prevBtnClickHandler = () => {
    setCurrent(0);
  };

  const nextBtnClickHandler = () => {
    form.validateFields().then((value) => {
      const reqBody = {
        id: +id,
        // نمایش
        displayStartDate: dateCreator(value?.displayStartDate, value?.displayStartTime),
        displayEndDate: dateCreator(value?.displayEndDate, value?.displayEndTime),
        // بررسی
        applicationStartDate: dateCreator(
          value?.applicationStartDate,
          value?.applicationStartTime
        ),
        applicationEndDate: dateCreator(
          value?.applicationEndDate,
          value?.applicationEndTime
        ),
        // پیش ثبت نام
        preRegistrationStartDate: dateCreator(
          value?.preRegistrationStartDate,
          value?.preRegistrationStartTime
        ),
        preRegistrationEndDate: dateCreator(
          value?.preRegistrationEndDate,
          value?.preRegistrationEndTime
        ),
        // ثبت نام
        registrationStartDate: dateCreator(
          value?.registrationStartDate,
          value?.registrationStartTime
        ),
        registrationEndDate: dateCreator(
          value?.registrationEndDate,
          value?.registrationEndTime
        ),
      };
      if (id) {
        createAdmissionDateInfo(reqBody).then((value: any) => {
          if (value?.error?.data?.message) {
            toast.error(value?.error?.data?.message, {
              toastId: value?.error?.data?.message,
            });
          } else {
            if (copiedId) {
              setSearchParams({ id, copiedId, stepNo: +stepNo > 3 ? stepNo : "3" });
            }
            setTimeout(() => setCurrent(2), 500); // Then change step after a short delay
          }
        });
      }
    });
  };

  return (
    <Form
      form={form}
      className="international-admission-program-modify-timing-info-container"
    >
      <CustomAlert
        closable={true}
        message="راهنما!"
        description={
          <div className="flex flex-col gap-y-5">
            <p>
              <b>تاریخ و زمان شروع و پایان نمایش:</b> این بازه زمانی تعیین می‌کند که
              برنامه پذیرش شما از چه تاریخی تا چه تاریخی برای متقاضیان قابل مشاهده باشد.
              به عبارت دیگر، متقاضیان می‌توانند از این تاریخ به بعد برای رشته‌های مورد نظر
              خود اقدام کنند.
            </p>
            <p>
              <b>تاریخ و زمان شروع و پایان بررسی:</b> این بازه زمانی، مدت زمانی است که شما
              برای بررسی درخواست‌های متقاضیان در نظر گرفته‌اید. پس از پایان این بازه،
              فرآیند بررسی درخواست‌ها به پایان می‌رسد.
            </p>
            <p>
              <b>تاریخ و زمان شروع و پایان پیش ثبت نام:</b> در این بازه زمانی، متقاضیانی
              که درخواست آن‌ها تایید شده است، می‌توانند نسبت به پیش ثبت‌نام در برنامه
              اقدام کنند. پیش ثبت‌نام به معنای ثبت اولیه اطلاعات متقاضی است.
            </p>

            <p>
              <b> تاریخ و زمان شروع و پایان ثبت نام:</b> این بازه زمانی، مدت زمانی است که
              متقاضیان تایید شده می‌توانند نسبت به تکمیل فرآیند ثبت‌نام خود اقدام کنند. در
              این مرحله، متقاضیان باید اطلاعات کامل و دقیق خود را ثبت نمایند.
            </p>
          </div>
        }
        type="info"
        showIcon
      />
      <Div loading={isGetDataLoading} className="timing-info-container">
        {/* //Todo[Atefeh]: uncomment when backend implemented */}
        {/* <div>
          <CustomDivider text="تاریخ شروع و پایان ترم اول" />
          <Row gutter={[16, 16]}>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ شروع ترم اول"
                placeholder="انتخاب کنید"
                name="semesterStartDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ شروع را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ پایان ترم اول"
                placeholder="انتخاب کنید"
                name="semesterEndDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ پایان را تعیین نمایید.")]}
                form={form}
              />
            </Col>
          </Row>
        </div> */}
        <div>
          <CustomDivider text="تاریخ و زمان شروع و پایان نمایش (تقاضا)" />
          <Row gutter={[16, 16]}>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ شروع نمایش"
                placeholder="انتخاب کنید"
                name="displayStartDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ شروع را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomTimePicker
                label="زمان شروع نمایش"
                name="displayStartTime"
                placeholder="انتخاب کنید"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً زمان شروع را تعیین نمایید.")]}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ پایان نمایش"
                placeholder="انتخاب کنید"
                name="displayEndDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ پایان را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomTimePicker
                label="زمان پایان نمایش"
                name="displayEndTime"
                placeholder="انتخاب کنید"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً زمان پایان را تعیین نمایید.")]}
              />
            </Col>
          </Row>
        </div>
        <div>
          <CustomDivider text="تاریخ و زمان شروع و پایان بررسی" />
          <Row gutter={[16, 16]}>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ شروع بررسی"
                placeholder="انتخاب کنید"
                name="applicationStartDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ شروع را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomTimePicker
                label="زمان شروع بررسی"
                name="applicationStartTime"
                placeholder="انتخاب کنید"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً زمان شروع را تعیین نمایید.")]}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ پایان بررسی"
                placeholder="انتخاب کنید"
                name="applicationEndDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ پایان را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomTimePicker
                label="زمان پایان بررسی"
                name="applicationEndTime"
                placeholder="انتخاب کنید"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً زمان پایان را تعیین نمایید.")]}
              />
            </Col>
          </Row>
        </div>
        <div>
          <CustomDivider text="تاریخ و زمان شروع و پایان پیش ثبت نام" />
          <Row gutter={[16, 16]}>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ شروع پیش ثبت نام"
                placeholder="انتخاب کنید"
                name="preRegistrationStartDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ شروع را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomTimePicker
                label="زمان شروع پیش ثبت نام"
                name="preRegistrationStartTime"
                placeholder="انتخاب کنید"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً زمان شروع را تعیین نمایید.")]}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ پایان پیش ثبت نام"
                placeholder="انتخاب کنید"
                name="preRegistrationEndDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ پایان را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomTimePicker
                label="زمان پایان پیش ثبت نام"
                name="preRegistrationEndTime"
                placeholder="انتخاب کنید"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً زمان پایان را تعیین نمایید.")]}
              />
            </Col>
          </Row>
        </div>
        <div>
          <CustomDivider text="تاریخ و زمان شروع و پایان ثبت نام" />
          <Row gutter={[16, 16]}>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ شروع ثبت نام"
                placeholder="انتخاب کنید"
                name="registrationStartDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ شروع را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomTimePicker
                label="زمان شروع ثبت نام"
                name="registrationStartTime"
                placeholder="انتخاب کنید"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً زمان شروع را تعیین نمایید.")]}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ پایان ثبت نام"
                placeholder="انتخاب کنید"
                name="registrationEndDate"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً تاریخ پایان را تعیین نمایید.")]}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomTimePicker
                label="زمان پایان ثبت نام"
                name="registrationEndTime"
                placeholder="انتخاب کنید"
                rules={[CUSTOM_REQUIRED_RULE("لطفاً زمان پایان را تعیین نمایید.")]}
              />
            </Col>
          </Row>
        </div>
      </Div>
      <div className="action-btn-container">
        <CustomButton icon={<AiOutlineArrowRight />} onClick={prevBtnClickHandler}>
          بازگشت
        </CustomButton>
        <CustomButton
          icon={<AiOutlineArrowLeft />}
          iconPlacement="end"
          type="primary"
          onClick={nextBtnClickHandler}
          loading={isCreateAdmissionDateInfoLoading}
          disabled={!isFormComplete}
        >
          ثبت و ادامه
        </CustomButton>
      </div>
    </Form>
  );
};

export default AdmissionProgramModifyTiming;
