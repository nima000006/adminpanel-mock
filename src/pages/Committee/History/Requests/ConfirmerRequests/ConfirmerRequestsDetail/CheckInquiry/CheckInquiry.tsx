import { useEffect, useState } from "react";

import { Button, Col, Form, Row, FormInstance } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";

import {
  SendConfirmerDetailCheckInquiryResponse,
  formValues,
  rejectFormData,
} from "./@types/@checkInquiry";
import CustomCard from "../../../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import ConfirmationModalWithContent from "../../../../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../../../../components/Renderers/CustomDivider/CustomDivider";
import Div from "../../../../../../../components/Renderers/Div/Div";
import useTitle from "../../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { CommitteeCheckInquiryTableModel } from "../../../../../../../infrastructure/models/tableModels/CommitteeTableModel/CheckInquiry/CommitteeCheckInquiryTableModel";
import { COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Information_PAGE_ROUTE } from "../../../../../../../infrastructure/router/routes/committee";
import { useGetAllUserWithFirstLastNameMutation } from "../../../../../../../infrastructure/states/redux/Apis/authApi";
import {
  useGetConfirmerDetailCheckInquiryMutation,
  useLazyGetReasonRejectingInquiryRequestQuery,
  useSendReasonRejectingInquiryRequestMutation,
} from "../../../../../../../infrastructure/states/redux/Apis/committee/history/history";
import { PADDING_20 } from "../../../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { SEND_REASON_REJECTION_SUCCESS_MSG } from "../../../../../../../infrastructure/VARS/globalToasts/globalToasts";
import { getAllUserWithFirstLastNameResponse } from "../../../../IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";

import "./_checkInquiry.scss";

const RejectReportModalContent = ({
  commentList = [],
  form,
  isLoading,
}: {
  commentList?: {
    id: number;
    title: string;
  }[];
  form: FormInstance<rejectFormData>;
  isLoading?: boolean;
}) => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-confirmer-request-detail-check-inquiry-modal-container"
    >
      <Form className="inputs-container" form={form}>
        <CustomSelect
          isLoading={isLoading}
          label="دلیل"
          name="rejectReportReason"
          options={commentList}
          placeholder="انتخاب کنید"
          form={form}
        />
        <CustomTextArea
          label="توضیحات"
          name="rejectReportDescription"
          placeholder="توضیحات"
        />
      </Form>
    </CustomCard>
  );
};

const CheckInquiryDetail = () => {
  useTitle({ text: "بررسی درخواست استعلام" });

  const [isSearchMode, setIsSearchMode] = useState(true);
  const [isRejectReportModalOpen, setIsRejectReportModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = Object.fromEntries([...searchParams]);
  const [form] = Form.useForm();
  const [rejectionForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [
    getConfirmerDetailCheckInquiry,
    { data: checkInquiryData, isLoading: isCheckInquiryLoading },
  ] = useGetConfirmerDetailCheckInquiryMutation();

  const [getUsers, { isLoading: isGetAllUsersLoading, data: getAllUserData }] =
    useGetAllUserWithFirstLastNameMutation();

  // Reject modal
  const [
    getReasonsRejection,
    { data: getReasonsRejectionData, isLoading: isGetReasonsRejectionLoading },
  ] = useLazyGetReasonRejectingInquiryRequestQuery();

  const [sendReasonsRejection, { isLoading: isSendReasonsRejectionLoading }] =
    useSendReasonRejectingInquiryRequestMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getConfirmerDetailCheckInquiry({
        _data_: {
          id: id,
        },
      });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const onFormFinishHandler = (values: formValues) => {
    getUsers({
      firstName: values?.firstName ? values?.firstName : null,
      lastName: values?.lastName ? values?.lastName : null,
      mobileNo: values?.mobileNo ? values?.mobileNo : null,
      nationalNo: values?.nationalNo ? values?.nationalNo : null,
      pageNumber: 0,
      pageSize: 8,
      studentNo: values?.studentNo ? values?.studentNo : null,
    })
      .unwrap()
      .then(getUserOnSuccess);
  };

  const getUserOnSuccess = async (value: getAllUserWithFirstLastNameResponse) => {
    if (value?.status === 200) {
      setIsSearchMode(false);
    }
  };
  const sendReasonsRejectionOnSuccess = async (
    value: SendConfirmerDetailCheckInquiryResponse
  ) => {
    if (value.status === 200) {
      toast.success(SEND_REASON_REJECTION_SUCCESS_MSG, {
        toastId: SEND_REASON_REJECTION_SUCCESS_MSG,
      });
      closeRejectReportModalHandler();
    }
  };

  const searchBtnHandler = () => {
    setIsSearchMode(true);
  };

  const checkClickHandler = (nationalNo: string) => {
    navigate({
      pathname: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Information_PAGE_ROUTE,
      search: makeSearchParams({ id: id, nationalNo: nationalNo }),
    });
  };

  // Reject modal
  const closeRejectReportModalHandler = () => {
    setIsRejectReportModalOpen(false);
  };

  const openRejectReportModalHandler = () => {
    setIsRejectReportModalOpen(true);
    getReasonsRejection();
  };

  const rejectReportHandler = () => {
    rejectionForm?.submit();
    rejectionForm?.validateFields().then((values: rejectFormData) => {
      if (id) {
        sendReasonsRejection({
          form: "RejectionInquiryRequest",
          id: "cd77cedfcafb4cbb9b84bd4864745430",
          _data_: {
            dateRejection: new Date().toISOString(),
            descRejection: values?.rejectReportDescription,
            id: +id,
            reasonRejection: values?.rejectReportReason?.children,
            status: 2,
          },
        })
          .unwrap()
          .then(sendReasonsRejectionOnSuccess);
      }
    });
  };

  return (
    <>
      {isRejectReportModalOpen && (
        <ConfirmationModalWithContent
          title="رد کردن"
          isModalOpen={isRejectReportModalOpen}
          confirmBtnText="رد کردن"
          isDangerous={true}
          closeModalHandler={closeRejectReportModalHandler}
          onConfirmClickHandler={rejectReportHandler}
          isConfirmButtonLoading={isSendReasonsRejectionLoading}
          content={
            <RejectReportModalContent
              isLoading={isGetReasonsRejectionLoading}
              commentList={getReasonsRejectionData?.data && getReasonsRejectionData?.data}
              form={rejectionForm}
            />
          }
          showIcon={false}
        />
      )}

      <div className="committee-confirmer-request-detail-check-inquiry">
        <Div loading={isCheckInquiryLoading} className="information-container">
          <CustomCard padding={PADDING_20} className="information-request">
            <CustomDivider text="اطلاعات درخواست" />
            <Row gutter={10}>
              <SingleVerticalWithCol
                span={6}
                label="تاریخ ثبت درخواست"
                value={checkInquiryData?.data?.dateRegistration}
                isDate
              />

              <SingleVerticalWithCol
                span={6}
                label="نوع اطلاعات درخواستی"
                value={checkInquiryData?.data?.AssociationTypeInformation?.title}
              />

              <SingleVerticalWithCol
                span={6}
                label="علت ثبت درخواست"
                value={checkInquiryData?.data?.AssociationReasoneRequest?.title}
              />

              <SingleVerticalWithCol
                span={6}
                label="وضعیت"
                value={checkInquiryData?.data?.AssociationInquiryRequestStatus?.title}
              />
            </Row>
            <Row gutter={10}>
              <SingleVerticalWithCol
                span={6}
                label="توضیحات"
                value={checkInquiryData?.data?.descRequest}
              />
            </Row>
          </CustomCard>
          <CustomCard padding={PADDING_20} className="information-request">
            <CustomDivider text="اطلاعات متهم" />
            <Row gutter={10}>
              <SingleVerticalWithCol
                span={6}
                label="نام"
                value={checkInquiryData?.data?.nameOffender}
              />

              <SingleVerticalWithCol
                label="نام خانوادگی"
                value={checkInquiryData?.data?.familyOffender}
              />

              <SingleVerticalWithCol
                span={6}
                label="شماره دانشجویی"
                value={checkInquiryData?.data?.studentNumberOffender}
              />

              <SingleVerticalWithCol
                span={6}
                label="شماره ملی"
                value={checkInquiryData?.data?.nationalCodeOffender}
              />
            </Row>
          </CustomCard>
        </Div>

        <div className={`container ${!isSearchMode && "hidden"}`}>
          <Row gutter={[0, 24]} className="form-wrapper">
            <Col span={24}>
              <p className="text black-text">
                لطفا برای مشاهده جدول کاربران، پارامترهای جستجو را مشخص کنید.
              </p>
            </Col>
            <Col span={24}>
              <Form className="form-body" onFinish={onFormFinishHandler} form={form}>
                <Row gutter={[10, 10]} align="middle" justify="start">
                  <Col xs={12} md={12} lg={8}>
                    <CustomInput label="نام" placeholder="نام" name="firstName" />
                  </Col>
                  <Col xs={12} md={12} lg={8}>
                    <CustomInput
                      label="نام خانوادگی"
                      placeholder="نام خانوادگی"
                      name="lastName"
                    />
                  </Col>
                  <Col xs={12} md={12} lg={8}>
                    <CustomInput
                      label="شماره دانشجویی"
                      placeholder="شماره دانشجویی"
                      name="studentNo"
                    />
                  </Col>
                  <Col xs={12} md={12} lg={8}>
                    <CustomInput
                      label="کد ملی/ کد اتباع"
                      placeholder="کد ملی/ کد اتباع"
                      name="nationalNo"
                    />
                  </Col>
                  <Col xs={12} md={12} lg={8} className="btn-container">
                    <Button type="primary" htmlType="submit" className="form-btn">
                      نمایش نتایج
                    </Button>
                    <Button
                      type="primary"
                      danger
                      ghost
                      className="form-btn"
                      onClick={openRejectReportModalHandler}
                    >
                      رد درخواست
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={24}>
              <p className="text gray-text">
                بعد از نمایش جدول، میتوانید از قسمت “جستجو مجدد” این مقادیر را تغییر دهید.
              </p>
            </Col>
          </Row>
        </div>
        <CustomCard
          padding={PADDING_20}
          className={`student-table ${isSearchMode && "hidden"}`}
          loading={isGetAllUsersLoading}
        >
          <div>
            <Button
              type="primary"
              ghost
              className="table-btn"
              onClick={searchBtnHandler}
              icon={<AiOutlineFilter />}
            >
              جستجو مجدد
            </Button>
          </div>
          <CustomTable
            dataSource={getAllUserData?.data?.userAdvancedFilterDtos}
            columns={CommitteeCheckInquiryTableModel({
              checkClickHandler: checkClickHandler,
            })}
            rowKey="nationalCode"
            pagination={manualPaginationConfig({
              total: getAllUserData?.data?.totalElement,
              onChange: (page, pageSize) => {
                getUsers({
                  pageSize: pageSize,
                  pageNumber: page - 1,
                  firstName: form?.getFieldsValue()?.firstName
                    ? form?.getFieldsValue()?.firstName
                    : null,
                  lastName: form?.getFieldsValue()?.lastName
                    ? form?.getFieldsValue()?.lastName
                    : null,
                  mobileNo: form?.getFieldsValue()?.mobileNo
                    ? form?.getFieldsValue()?.mobileNo
                    : null,
                  nationalNo: form?.getFieldsValue()?.nationalNo
                    ? form?.getFieldsValue()?.nationalNo
                    : null,
                  studentNo: form?.getFieldsValue()?.studentNo
                    ? form?.getFieldsValue()?.studentNo
                    : null,
                });
              },
            })}
            {...TABLE_PROPS(getAllUserData?.data?.userAdvancedFilterDtos?.length || 0)}
          />
        </CustomCard>
      </div>
    </>
  );
};
export default CheckInquiryDetail;
