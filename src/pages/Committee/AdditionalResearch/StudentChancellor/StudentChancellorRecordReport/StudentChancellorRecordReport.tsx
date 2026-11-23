import { useState } from "react";

import { Button, Checkbox, Form, Upload } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox/";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { FormData } from "./@types/@studentChancellorRecordReport";
import {
  ACCUSED_ID,
  REPORTER_ID,
} from "./StudentChancellorRecordReportHelpers/StudentChancellorRecordReportHelpers";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import StudentSearchModal from "../../../../../components/Modals/Committee/ReportSubmit/StudentSearchModal/StudentSearchModal";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { anonymousReporterIdGenerator } from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_LIST_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import { useAdditionalResearchSendReportMutation } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
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
import { AdditionalResearchSendReportResponse } from "../../EducationChancellor/EducationChancellorRecordReport/@types/@educationChancellorRecordReport";
import "./_studentChancellorRecordReport.scss";

const StudentChancellorRecordReport = () => {
  useTitle({ text: "ثبت گزارش" });
  const [isPageCloserEnabled, setIsPageCloseEnabled] = useState(false);
  const [searchModal, setSearchModal] = useState({ isOpen: false, from: -1 });
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [sendReport, { isLoading: isSendReportLoading }] =
    useAdditionalResearchSendReportMutation();

  //* ================================ Util Functions ================================
  // close modal
  const closeStudentSearchModalHandler = () => {
    setSearchModal({ isOpen: false, from: -1 });
  };

  // search user btn
  const openStudentSearchModalHandler = (from: number) => {
    setSearchModal({ isOpen: true, from: from });
  };

  const setReporterDataHandler = (data: Partial<User>) => {
    form.setFieldsValue({
      reporterName: data?.firstName,
      reporterNationalcode: data?.nationalCode,
      reporterPhoneNumber: data?.mobile,
      reporterFamily: data?.lastName,
      reporterNumber: data?.studentNumber,
    });
  };

  const setAccusedDataHandler = (data: Partial<User>) => {
    form.setFieldsValue({
      studentName: data?.firstName,
      studentFamily: data?.lastName,
      nationalCode: data?.nationalCode,
      studentNumber: data?.studentNumber,
      studentPhoneNumber: data?.mobile,
    });
  };

  const sendReportOnSuccess = async (value: AdditionalResearchSendReportResponse) => {
    if (value?.status === 200) {
      toast.success(REPORT_SUBMIT_SUCCESS, { toastId: REPORT_SUBMIT_SUCCESS });
      if (isPageCloserEnabled) {
        form?.resetFields();
      } else {
        navigate(COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_LIST_PAGE_ROUTE);
      }
    } else if (value?.status === 400) {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  // register form when click on submit or draft btn.
  const btnHandler = (from: string) => {
    form.submit();
    form
      ?.validateFields()
      .then((values: FormData) => {
        sendReport({
          variables: {
            reporterType: {
              value: 7,
            },
            studentViceStatus: {
              value: from === "final" ? 3 : 1,
            },
            reporterNationalcode: {
              value: values.reporterNationalcode,
            },
            Anonymous: {
              value: 0,
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
              value: null,
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
      })
      .catch(() =>
        toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE })
      );
  };

  // back btn
  const backBtnHandler = () => {
    navigate(COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_LIST_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="student-chancellor-record-report-container" form={form}>
      <StudentSearchModal
        isModalOpen={searchModal?.isOpen}
        closeModalHandler={closeStudentSearchModalHandler}
        setAccusedDataHandler={setAccusedDataHandler}
        from={searchModal?.from}
        setReporterDataHandler={setReporterDataHandler}
      />
      <CustomDivider text=" ثبت گزارش" />
      <CustomCard className="around-box">
        <div className="divider-btn-container">
          <CustomDivider
            text="اطلاعات هویتی گزارشگر"
            extraContent={
              <Button
                className="search-student-btn"
                type="primary"
                ghost
                onClick={() => openStudentSearchModalHandler(REPORTER_ID)}
              >
                جستجوی کاربر
              </Button>
            }
          />
        </div>
        <div className="grid-cols-5">
          <CustomInput
            type="text"
            label="نام"
            name="reporterName"
            placeholder="نام"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            type="text"
            label="نام خانوادگی"
            name="reporterFamily"
            placeholder="نام خانوادگی"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            type="text"
            label="شماره ملی"
            name="reporterNationalcode"
            placeholder="شماره ملی"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            type="text"
            label="شماره دانشجویی/پرسنلی"
            name="reporterNumber"
            placeholder="شماره دانشجویی/پرسنلی"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            type="text"
            label="شماره تماس"
            name="reporterPhoneNumber"
            placeholder="شماره تماس"
            rules={[REQUIRED_RULE]}
          />
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_24}>
        <CustomDivider text="نوع گزارش" />
        <CustomRadioGroup
          options={[
            { label: "شخصی", value: "10" },
            { label: "موضوعی", value: "11" },
          ]}
          name="requestType"
          rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع گزارشگر الزامیست.")]}
        />
      </CustomCard>
      <CustomCard className="around-box">
        <div className="divider-btn-container">
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
        <div className="grid-cols-5">
          <CustomInput
            type="text"
            label="نام"
            name="studentName"
            placeholder="نام"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            type="text"
            label="نام خانوادگی"
            name="studentFamily"
            placeholder="نام خانوادگی"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            type="text"
            label="شماره ملی"
            name="nationalCode"
            placeholder="شماره ملی"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            type="text"
            label="شماره دانشجویی/پرسنلی"
            name="studentNumber"
            placeholder="شماره دانشجویی/پرسنلی"
            rules={[REQUIRED_RULE]}
          />
          <CustomInput
            type="text"
            label="شماره تماس"
            name="studentPhoneNumber"
            placeholder="شماره تماس"
            rules={[REQUIRED_RULE]}
          />
        </div>
      </CustomCard>

      <CustomCard className="around-box">
        <CustomDivider text="جزئیات گزارش" />
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
              label="تاریخ وقوع"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="datePicker"
              rules={[REQUIRED_RULE]}
              form={form}
              className="date-picker"
            />
          </div>
        </div>
      </CustomCard>

      <CustomCard className="around-box">
        <CustomDivider text="پیوست ها" />
        <Upload className="upload-container" listType="picture" multiple disabled>
          <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
            بارگذاری تصاویر
          </Button>
        </Upload>
      </CustomCard>

      <div className="footer-btn-container">
        <div className="btn-wrapper">
          <Button
            className="footer-btn"
            type="primary"
            loading={isSendReportLoading}
            onClick={() => btnHandler("final")}
          >
            ثبت نهایی
          </Button>
          <Button
            className="footer-btn"
            type="primary"
            ghost
            onClick={() => btnHandler("draft")}
          >
            ثبت پیش نویس
          </Button>
          <Button className="footer-btn" onClick={backBtnHandler}>
            بازگشت
          </Button>
        </div>
        <div className="page-closer-container">
          <Checkbox
            onChange={(e: CheckboxChangeEvent) => setIsPageCloseEnabled(e.target.checked)}
          >
            افزودن گزارش دیگر بعد از ثبت
          </Checkbox>
        </div>
      </div>
    </Form>
  );
};
export default StudentChancellorRecordReport;
