import { useEffect, useState } from "react";

import { Button, Form, Modal, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  EditReportModalProps,
  SendReportAmendmentResponse,
  getReportAmendmentResponse,
} from "./@types/@editReportModal";
import { anonymousReporterIdGenerator } from "../../../../../infrastructure/helpers/utils";
import { useGetTypePlaintiffQuery } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useGetReportAmendmentMutation,
  useSendReportAmendmentMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import {
  CUSTOM_REQUIRED_RULE,
  REQUIRED_RULE,
} from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_24 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { User } from "../../../../../pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSwitch from "../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import StudentSearchModal from "../../ReportSubmit/StudentSearchModal/StudentSearchModal";
import "./_editReportModal.scss";

const REPORTER_ID = 1;
const ACCUSED_ID = 2;
const SEND_AMENT_DATA_SUCCESS_MSG = "ثبت اصلاحیه با موفقیت انجام شد.";

const EditReportModal = ({ isModalOpen, closeModalHandler }: EditReportModalProps) => {
  const [searchModal, setSearchModal] = useState({ isOpen: false, from: -1 });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const { data: typePlaintiffData } = useGetTypePlaintiffQuery(null);

  const [getAmendmentData, { data: amendmentData, isLoading: isAmendmentDataLoading }] =
    useGetReportAmendmentMutation();

  // send data
  const [sendAmendmentData, { isLoading: isSendAmendmentDataLoading }] =
    useSendReportAmendmentMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen && +isModalOpen?.id > 0) {
      getAmendmentData({
        _data_: {
          id: `${isModalOpen?.id}`,
        },
      })
        .unwrap()
        .then(getAmendmentDataOnSuccess);
    }
  }, [isModalOpen]);

  //* ================================ Util Functions ================================
  const editReportHandler = () => {
    const formValue = form.getFieldsValue();

    const sendAmendmentDataOnSuccess = async (value: SendReportAmendmentResponse) => {
      if (value.status === 200) {
        closeModalHandler();
        toast.success(SEND_AMENT_DATA_SUCCESS_MSG, {
          toastId: SEND_AMENT_DATA_SUCCESS_MSG,
        });
      }
    };

    sendAmendmentData({
      form: "ReportAmendment",
      id: "b6a748e3025a4f2c8936d04cc3ca2470",
      _data_: {
        reporterType: formValue?.reporterType,
        reporterNationalcode: formValue?.reporterNationalcode,
        reporterPhoneNumber: formValue?.reporterPhoneNumber,
        reporterName: formValue?.reporterName,
        reporterFamily: formValue?.reporterFamily,
        reporterNumber: formValue?.reporterNumber,
        Anonymous: isAnonymous,
        requestType: formValue?.requestType,
        commonReport: formValue?.commonReport,
        studentName: formValue?.studentName,
        studentFamily: formValue?.studentFamily,
        nationalCode: formValue?.nationalCode,
        studentNumber: formValue?.studentNumber,
        studentPhoneNumber: formValue?.studentPhoneNumber,
        eventReport: formValue?.eventReport,
        eventLocation: formValue?.eventLocation,
        eventDate: formValue?.eventDate,
        userId: anonymousReporterIdGenerator(formValue?.reporterNationalcode),
        id: +isModalOpen?.id,
      },
    })
      .unwrap()
      .then(sendAmendmentDataOnSuccess);
  };

  // set default value
  const getAmendmentDataOnSuccess = async (value: getReportAmendmentResponse) => {
    if (value.status === 200) {
      setIsAnonymous(value?.data?.Anonymous);
      form.setFieldsValue({
        anonymous: value?.data?.Anonymous,
        reporterType: value?.data?.reporterType,
        reporterNationalcode: value?.data?.reporterNationalcode,
        reporterPhoneNumber: value?.data?.reporterPhoneNumber,
        reporterName: value?.data?.reporterName,
        reporterFamily: value?.data?.reporterFamily,
        reporterNumber: value?.data?.reporterNumber,
        requestType: value?.data?.requestType,
        commonReport: value?.data?.commonReport,
        studentName: value?.data?.studentName,
        studentFamily: value?.data?.studentFamily,
        nationalCode: value?.data?.nationalCode,
        studentNumber: value?.data?.studentNumber,
        studentPhoneNumber: value?.data?.studentPhoneNumber,
        eventReport: value?.data?.eventReport,
        eventLocation: value?.data?.eventLocation,
        eventDate: value?.data?.eventDate,
      });
    }
  };

  const setComplainantDataHandler = (data: Partial<User>) => {
    form.setFieldsValue({
      reporterName: data?.firstName,
      reporterFamily: data?.lastName,
      reporterNationalcode: data?.nationalCode,
      reporterNumber: data?.studentNumber,
      reporterPhoneNumber: data?.mobile,
    });
  };

  const setAccusedDataHandler = (data: Partial<User>) => {
    form.setFieldsValue({
      studentName: data.firstName,
      studentFamily: data.lastName,
      nationalCode: data.nationalCode,
      studentNumber: data?.studentNumber,
      studentPhoneNumber: data.mobile,
    });
  };

  const openStudentSearchModalHandler = (from: number) => {
    setSearchModal({ isOpen: true, from: from });
  };

  const closeStudentSearchModalHandler = () => {
    setSearchModal({ isOpen: false, from: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title="اصلاحیه گزارش 1653854136"
          open={isModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={800}
          className="committee-report-detail-edit-report-modal-container"
        >
          <Form form={form}>
            <Div loading={isAmendmentDataLoading}>
              <div className="modal-body-container">
                <CustomCard padding={PADDING_24}>
                  <CustomDivider text="نوع گزارشگر" />
                  <CustomRadioGroup
                    options={typePlaintiffData?.data?.map((item) => {
                      return {
                        label: item?.title,
                        value: item?.id,
                      };
                    })}
                    name="reporterType"
                    rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع شاکی الزامیست.")]}
                  />
                </CustomCard>
                <CustomCard padding={PADDING_24}>
                  <div className="divider-btn-container">
                    <div>
                      <CustomDivider
                        text="اطلاعات هویتی گزارشگر"
                        extraContent={
                          <div className="btn-container">
                            <div className="switch-container">
                              <CustomSwitch
                                valuePropName="anonymous"
                                name="anonymous"
                                label="ثبت با هویت ناشناس"
                                className="switch"
                                defaultChecked={isAnonymous}
                                key={Number(isAnonymous)}
                                onChange={(checked: boolean) => setIsAnonymous(checked)}
                              />
                            </div>
                            <Button
                              className="search-student-btn"
                              type="primary"
                              ghost
                              onClick={() => openStudentSearchModalHandler(REPORTER_ID)}
                            >
                              جستجوی کاربر
                            </Button>
                          </div>
                        }
                      />
                    </div>
                  </div>
                  <div className="grid-cols-3">
                    <CustomInput
                      type="text"
                      label="نام"
                      name="reporterName"
                      placeholder="نام"
                    />
                    <CustomInput
                      type="text"
                      label="نام خانوادگی"
                      name="reporterFamily"
                      placeholder="نام خانوادگی"
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
                    />
                    <CustomInput
                      type="text"
                      label="شماره موبایل"
                      name="reporterPhoneNumber"
                      placeholder="شماره موبایل"
                      rules={[REQUIRED_RULE]}
                    />
                  </div>
                </CustomCard>
                <CustomCard padding={PADDING_24}>
                  <CustomDivider text="نوع گزارش" />
                  <CustomRadioGroup
                    options={[
                      { label: "شخصی", value: 10 },
                      { label: "موضوعی", value: 11 },
                      { label: "گزارش شایع", value: 12 },
                    ]}
                    name="requestType"
                    rules={[REQUIRED_RULE]}
                  />
                </CustomCard>
                <CustomCard padding={PADDING_24}>
                  <CustomDivider text="گزارش" />
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
                  <div className="grid-cols-3">
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
                <CustomCard padding={PADDING_24} className="report-main-detail-container">
                  <CustomDivider text=" جزِئیات گزارش" />
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
                        placeholder="انتخاب کنید"
                        name="eventDate"
                        rules={[REQUIRED_RULE]}
                        form={form}
                        defaultValue={amendmentData?.data?.eventDate}
                        key={amendmentData?.data?.eventDate}
                      />
                    </div>
                  </div>
                </CustomCard>
                <CustomCard padding={PADDING_24}>
                  <CustomDivider text="پیوست ها" />
                  <Form.Item name="image">
                    <Upload
                      className="upload-container"
                      listType="picture"
                      multiple
                      disabled
                    >
                      <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
                        بارگذاری تصاویر
                      </Button>
                    </Upload>
                  </Form.Item>
                </CustomCard>
              </div>
              <div className="submit-buttons-container">
                <Button
                  type="primary"
                  className="custom-btn"
                  htmlType="submit"
                  onClick={editReportHandler}
                  loading={isSendAmendmentDataLoading}
                >
                  ثبت اصلاحیه
                </Button>
                <Button className="custom-btn" onClick={closeModalHandler}>
                  بازگشت
                </Button>
              </div>
            </Div>
          </Form>
        </Modal>
      )}

      {searchModal?.isOpen && (
        <StudentSearchModal
          isModalOpen={searchModal?.isOpen}
          closeModalHandler={closeStudentSearchModalHandler}
          setAccusedDataHandler={setAccusedDataHandler}
          from={searchModal?.from}
          setReporterDataHandler={setComplainantDataHandler}
        />
      )}
    </>
  );
};

export default EditReportModal;
