import { useState } from "react";

import { Button, Checkbox, Col, Form, Row, Switch, Upload } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { FormDataType } from "./@types/@typesCommitteeReportSubmit";
import { ACCUSED_ID, REPORTER_ID } from "./reportSubmitUtils/reportSubmitUtils";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import StudentSearchModal from "../../../../../components/Modals/Committee/ReportSubmit/StudentSearchModal/StudentSearchModal";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import Div from "../../../../../components/Renderers/Div/Div";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { anonymousReporterIdGenerator } from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_REPORT_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import { useGetTypePlaintiffQuery } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { useSendReportMutation } from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import {
  CUSTOM_REQUIRED_RULE,
  REQUIRED_RULE,
} from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_24 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  GENERAL_ERROR_MESSAGE,
  REPORT_SUBMIT_SUCCESS,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import { User } from "../../../History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import "./_committeeReportSubmit.scss";

const CommitteeReportSubmit = () => {
  const navigate = useNavigate();
  const [searchModal, setSearchModal] = useState({ isOpen: false, from: -1 });

  const [isPageCloserEnabled, setIsPageCloseEnabled] = useState(false);
  const [Anonymous, setAnonymous] = useState<boolean>(false);

  const [form] = Form.useForm();

  useTitle({ text: "ثبت گزارش" });

  const [sendReport, { isLoading: isSendReportLoading }] = useSendReportMutation();

  const { data: typePlaintiffData, isLoading: isTypePlaintiffDataLoading } =
    useGetTypePlaintiffQuery(null);

  const openStudentSearchModalHandler = (from: number) => {
    setSearchModal({ isOpen: true, from: from });
  };
  const closeStudentSearchModalHandler = () => {
    setSearchModal({ isOpen: false, from: -1 });
  };

  //!
  const setReporterDataHandler = (data: Partial<User>) => {
    form.setFieldsValue({
      reporterName: data?.firstName,
      reporterNationalcode: data?.nationalCode,
      reporterPhoneNumber: data?.mobile,
      reporterFamily: data?.lastName,
      reporterNumber: data?.studentNumber,
    });
  };

  //!
  const setAccusedDataHandler = (data: Partial<User>) => {
    form.setFieldsValue({
      studentName: data?.firstName,
      studentFamily: data?.lastName,
      nationalCode: data?.nationalCode,
      studentNumber: data?.studentNumber,
      studentPhoneNumber: data?.mobile,
    });
  };

  //!
  const backToPrevPageHandler = () => navigate(COMMITTEE_REPORT_PAGE_ROUTE);

  //!
  const onFormSubmit = (values: FormDataType) => {
    sendReport({
      variables: {
        reporterType: {
          value: +values.reporterType,
        },
        reporterNationalcode: {
          value: values.reporterNationalcode,
        },
        Anonymous: {
          value: Anonymous ? 1 : 0,
        },
        reporterName: {
          value: values.reporterName,
        },
        reporterFamily: {
          value: values.reporterFamily,
        },
        reporterNumber: {
          value: values.reporterNumber,
        },
        reporterPhoneNumber: {
          value: values.reporterPhoneNumber,
        },
        requestType: {
          value: +values?.requestType,
        },
        commonReport: {
          value: values.commonReport,
        },
        studentName: {
          value: values.studentName,
        },
        studentNumber: {
          value: values.studentNumber,
        },
        studentFamily: {
          value: values.studentFamily,
        },
        studentPhoneNumber: {
          value: values.studentPhoneNumber,
        },
        nationalCode: {
          value: values.nationalCode,
        },
        eventReport: {
          value: values.eventReport,
        },
        eventLocation: {
          value: values.eventLocation,
        },
        eventDate: {
          value: values?.datePicker,
        },
        userId: {
          value: anonymousReporterIdGenerator(values?.reporterNationalcode),
        },
      },
    })
      .unwrap()
      .then(sendReportOnSuccess);
  };

  const sendReportOnSuccess = async (value: any) => {
    if (value?.status === 200) {
      toast.success(REPORT_SUBMIT_SUCCESS, { toastId: REPORT_SUBMIT_SUCCESS });
      if (isPageCloserEnabled) {
        form?.resetFields();
        setAnonymous(false);
      } else {
        navigate(COMMITTEE_REPORT_PAGE_ROUTE);
      }
    } else if (value?.status === 400) {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  return (
    <Form
      className="committee-report-submit-container"
      form={form}
      onFinish={onFormSubmit}
    >
      <StudentSearchModal
        isModalOpen={searchModal?.isOpen}
        closeModalHandler={closeStudentSearchModalHandler}
        setAccusedDataHandler={setAccusedDataHandler}
        from={searchModal?.from}
        setReporterDataHandler={setReporterDataHandler}
      />
      <CustomCard padding={PADDING_24}>
        <CustomDivider text="نوع گزارشگر" />
        <Div loading={isTypePlaintiffDataLoading}>
          <CustomRadioGroup
            name="reporterType"
            options={typePlaintiffData?.data?.map((item) => {
              return {
                label: item?.title,
                value: item?.id,
              };
            })}
            rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع گزارشگر الزامیست.")]}
          />
        </Div>
      </CustomCard>
      <CustomCard padding={PADDING_24}>
        <div className="divider-btn-container">
          <div>
            <CustomDivider
              text="اطلاعات هویتی گزارشگر"
              extraContent={
                <div className="btn-container">
                  <div className="switch-container">
                    <span className="switch-title">ثبت با هویت ناشناس</span>
                    <Switch
                      onChange={(checked: boolean) => setAnonymous(checked)}
                      checked={Anonymous}
                    />
                  </div>
                  <Button
                    className="search-student-btn"
                    type="primary"
                    ghost
                    onClick={() => openStudentSearchModalHandler(REPORTER_ID)}
                    disabled={Anonymous}
                  >
                    جستجوی کاربر
                  </Button>
                </div>
              }
            />
          </div>
        </div>
        <Row gutter={[12, 12]}>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="نام"
              name="reporterName"
              placeholder="نام"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="نام خانوادگی"
              name="reporterFamily"
              placeholder="نام خانوادگی"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره ملی"
              name="reporterNationalcode"
              placeholder="شماره ملی"
              rules={Anonymous ? [] : [REQUIRED_RULE]}
              {...{ disabled: Anonymous }}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره دانشجویی/پرسنلی"
              name="reporterNumber"
              placeholder="شماره دانشجویی/پرسنلی"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره موبایل"
              name="reporterPhoneNumber"
              placeholder="شماره موبایل"
              rules={Anonymous ? [] : [REQUIRED_RULE]}
              {...{ disabled: Anonymous }}
            />
          </Col>
        </Row>
      </CustomCard>
      <CustomCard padding={PADDING_24}>
        <CustomDivider text=" نوع گزارش" />
        <CustomRadioGroup
          options={[
            { label: "شخصی", value: "10" },
            { label: "موضوعی", value: "11" },
            { label: "گزارش شایع", value: "12" },
          ]}
          name="requestType"
          rules={[REQUIRED_RULE]}
        />
      </CustomCard>
      <CustomCard padding={PADDING_24}>
        <CustomDivider text=" گزارش" />
        <CustomRadioGroup
          options={["تقلب", "آراستگی"]}
          name="commonReport"
          rules={[REQUIRED_RULE]}
        />
      </CustomCard>
      <CustomCard padding={PADDING_24}>
        <div className="divider-btn-container">
          <div>
            <CustomDivider
              text="اطلاعات هویتی متهم"
              extraContent={
                <div className="btn-container">
                  <Button
                    className="search-student-btn"
                    type="primary"
                    ghost
                    onClick={() => openStudentSearchModalHandler(ACCUSED_ID)}
                  >
                    جستجوی دانشجو
                  </Button>
                </div>
              }
            />
          </div>
        </div>
        <Row gutter={[12, 12]}>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="نام"
              name="studentName"
              placeholder="نام"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="نام خانوادگی"
              name="studentFamily"
              placeholder="نام خانوادگی"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره ملی"
              name="nationalCode"
              placeholder="شماره ملی"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره دانشجویی/پرسنلی"
              name="studentNumber"
              placeholder="شماره دانشجویی/پرسنلی"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره تماس"
              name="studentPhoneNumber"
              placeholder="شماره تماس"
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      </CustomCard>
      <CustomCard padding={PADDING_24} className="report-main-detail-container">
        <CustomDivider text="جزِئیات گزارش" />
        <div className="report-detail-inputs-container">
          <CustomTextArea
            label="توضیحات"
            placeholder="توضیحات"
            name="eventReport"
            rules={[REQUIRED_RULE]}
          />
          <div className="grid-cols-2">
            <CustomTextArea
              label="محل وقوع"
              placeholder="توضیحات"
              name="eventLocation"
              rules={[REQUIRED_RULE]}
            />
            <CustomDatePicker
              label="تاریخ جلسه"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="datePicker"
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </div>
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_24}>
        <CustomDivider text="پیوست ها" />
        <Form.Item name="image">
          <Upload className="upload-container" listType="picture" multiple>
            <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
              بارگذاری تصاویر
            </Button>
          </Upload>
        </Form.Item>
      </CustomCard>
      <div className="page-closer-container">
        <Checkbox
          onChange={(e: CheckboxChangeEvent) => setIsPageCloseEnabled(e.target.checked)}
        >
          افزودن اتهام دیگر بعد از ثبت
        </Checkbox>
      </div>
      <div className="submit-buttons-container">
        <Button
          type="primary"
          className="custom-btn"
          htmlType="submit"
          loading={isSendReportLoading}
        >
          ثبت نهایی
        </Button>
        <Button className="custom-btn" onClick={backToPrevPageHandler}>
          بازگشت
        </Button>
      </div>
    </Form>
  );
};

export default CommitteeReportSubmit;
