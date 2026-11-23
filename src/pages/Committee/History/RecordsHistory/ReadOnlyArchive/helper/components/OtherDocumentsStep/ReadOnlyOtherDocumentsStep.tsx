import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { COMMITTEE_ARCHIVE_PAGE_ROUTE } from "@infra/router/routes/committee";

import {
  GetRemoveHistoryOtherDocumentsResponse,
  ReadOnlyOtherDocumentsStepProps,
  RemoveRequestModalContentProps,
  SendRegistrationDeletionResponse,
} from "./@types/@readOnlyOtherDocumentsStep";

import "./_readOnlyOtherDocumentsStep.scss";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import {
  useLazyGetRemoveHistoryOtherDocumentsQuery,
  useLazyGetRemoveReasonRequestQuery,
  useSendRegistrationDeletionRequestMutation,
} from "@infra/states/redux/Apis/committee/history/history";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import { PADDING_20, PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

const RemoveRequestModalContent = ({ form }: RemoveRequestModalContentProps) => {
  //? ================================  Api Calls ================================
  const [getReason, { data: getReasonData, isFetching: isGetReasonLoading }] =
    useLazyGetRemoveReasonRequestQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getReason(2);
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="register-remove-request-modal-container">
      <p className="modal-text">آیا از ثبت درخواست حذف اطمینان دارید؟</p>
      <p className="modal-text">
        پس از بررسی درخواست و تأیید دبیر کمیته صادر کننده رأی قطعی، این سابقه از لیست
        سوابق حذف خواهد شد.
      </p>
      <Form form={form}>
        <Row gutter={[12, 12]}>
          <Col lg={8} md={8} sm={24} xs={24}>
            <CustomSelect
              name="removeReason"
              label="علت درخواست حذف"
              form={form}
              placeholder="انتخاب کنید"
              isLoading={isGetReasonLoading}
              options={getReasonData?.data}
              rules={[CUSTOM_REQUIRED_RULE("علت درخواست ضروری می باشد.")]}
            />
          </Col>
          <Col lg={16} md={16} sm={24} xs={24}>
            <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const ReadOnlyOtherDocumentsStep = ({
  setCurrentStep,
  deleteRequestStatus,
}: ReadOnlyOtherDocumentsStepProps) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const [deleteRequestForm] = Form.useForm();
  const { user } = useAuth();

  //? ================================  Api Calls ================================
  const [
    getOtherDocuments,
    { data: getOtherDocumentsData, isFetching: isGetOtherDocumentsLoading },
  ] = useLazyGetRemoveHistoryOtherDocumentsQuery();

  const [
    sendRegistrationDeletionRequest,
    { isLoading: isSendRegistrationDeletionRequestLoading },
  ] = useSendRegistrationDeletionRequestMutation();

  //* ================================ Util Functions ================================
  const getOtherDocumentsOnSuccess = (value: GetRemoveHistoryOtherDocumentsResponse) => {
    if (value?.status === 200) {
      setFileList(
        value?.data?.map((item: any) => ({
          uid: item?.UploadFiles_uid,
          name: item?.UploadFiles_originalName,
          status: "done",
          url: `${import.meta.env.VITE_URL_COMMITTEE}/upload?path=${item?.UploadFiles_relativeUrl}`,
          extension: item?.UploadFiles_extension,
          relativeUrl: item?.UploadFiles_relativeUrl,
        }))
      );
    }
  };

  const sendRegistrationDeletionRequestOnSuccess = async (
    value: SendRegistrationDeletionResponse
  ) => {
    if (value?.status === 200) {
      navigate({
        pathname: COMMITTEE_ARCHIVE_PAGE_ROUTE,
      });
    }
  };
  //! Request
  useEffect(() => {
    if (id) {
      getOtherDocuments(+id).unwrap().then(getOtherDocumentsOnSuccess);
    }
  }, [id]);

  const deleteRequestRegisterHandler = () => {
    deleteRequestForm.submit();
    deleteRequestForm.validateFields().then((value) => {
      // const admin = JSON.parse(getFromLocalStorage("meta") ?? "") as LocalStorageMetaType;
      if (id) {
        sendRegistrationDeletionRequest({
          form: "RegistrationDeletionRequest",
          id: "93177c9aa85149e0a019f54607bc2b17",
          _data_: {
            inquirerFirstName: user?.firstName,
            inquirerPost: "",
            inquirerOrganization: user?.staff?.admin?.branchName || "",
            reasonRequest: value?.removeReason?.code,
            status: 1,
            descRequest: value?.description,
            UniCode: user?.staff?.admin?.branchId?.toString(),
            inquirerLastName: user?.lastName,
            inquirerUnit: "",
            userRequestType: 2,
            inquirerDateRequest: new Date().toISOString(),
            violationId: +id,
            AssociationViolationStudent: {
              recycleBin: true,
              id: +id,
            },
            id: null,
          },
        })
          .unwrap()
          .then(sendRegistrationDeletionRequestOnSuccess);
      }
    });
  };

  const openModalBtnHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalBtnHandler = () => {
    setIsModalOpen(false);
  };
  const backBtnHandler = () => {
    setCurrentStep(2);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت درخواست حذف"
          isModalOpen={isModalOpen}
          confirmBtnText="درخواست حذف"
          isDangerous={true}
          backBtnText="انصراف"
          closeModalHandler={closeModalBtnHandler}
          onConfirmClickHandler={deleteRequestRegisterHandler}
          content={<RemoveRequestModalContent form={deleteRequestForm} />}
          width={800}
          isConfirmButtonLoading={isSendRegistrationDeletionRequestLoading}
          showIcon={false}
        />
      )}
      <Div
        className="committee-records-detail-read-only-other-documents-step-container"
        loading={isGetOtherDocumentsLoading}
      >
        {deleteRequestStatus && (
          <div className="delete-request-status-container">
            <p className="status-text">
              برای این سابقه، درخواست حذف ثبت شده و در انتظار تأیید مسئول مربوطه است.
            </p>
          </div>
        )}
        <CustomCard padding={PADDING_24} className="documents-container">
          {getOtherDocumentsData?.data?.map((item: any) => (
            <CustomCard className="file-wrapper" padding={PADDING_20} key={item?.id}>
              <CustomDivider text={item?.attachedTitle} />
              <SingleVerticalWithCol
                xl={8}
                lg={8}
                md={12}
                sm={24}
                label="تاریخ"
                value={item?.attachedDate}
                isDate
              />
              <div className="attachments-file-container">
                <h3 className="attachments-title">پیوست‌ها</h3>
                <CustomUploader
                  fileList={fileList}
                  setFileList={setFileList}
                  hasNullText={true}
                  classNameOuterDiv="custom-upload-packet"
                />
              </div>
            </CustomCard>
          ))}
        </CustomCard>
        <div className="button-wrapper">
          <div className="buttons-container">
            <CustomButton className="back-btn" onClick={backBtnHandler}>
              برگشت
            </CustomButton>
            <CustomButton
              type="primary"
              danger
              onClick={openModalBtnHandler}
              disabled={deleteRequestStatus}
            >
              درخواست حذف سابقه
            </CustomButton>
          </div>
        </div>
      </Div>
    </>
  );
};

export default ReadOnlyOtherDocumentsStep;
