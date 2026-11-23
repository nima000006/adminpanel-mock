import { useEffect, useState } from "react";

import { Form, FormInstance, UploadFile } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { COMMITTEE_HISTORY_REQUESTS_CONFIRMER_LIST_PAGE_ROUTE } from "@infra/router/routes/committee";
import {
  useLazyGetRemoveHistoryOtherDocumentsQuery,
  useSendRemoveHistoryAgreementRequestModalMutation,
  useSendRemoveHistoryOppositionRequestModalMutation,
} from "@infra/states/redux/Apis/committee/history/history";
import { PADDING_20, PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";
import {
  GENERAL_ERROR_MESSAGE,
  GENERAL_SUBMIT_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { GetRemoveHistoryOtherDocumentsResponse } from "@pages/Committee/History/RecordsHistory/ReadOnlyArchive/helper/components/OtherDocumentsStep/@types/@readOnlyOtherDocumentsStep";

import {
  PartiesInformationStepProps,
  SendRemoveHistoryAgreementRequestModalResponse,
  SendRemoveHistoryOppositionRequestModalResponse,
} from "./@types/@removeHistoryOtherDocumentsStep";
import "./_removeHistoryOtherDocumentsStep.scss";

// محتوای مودال
const OppositionRequestModalContent = ({
  form,
}: {
  form: FormInstance<{ description: string }>;
}) => {
  return (
    <Form form={form}>
      <CustomCard padding={PADDING_20}>
        <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
      </CustomCard>
    </Form>
  );
};

export const RemoveHistoryOtherDocumentsStep = ({
  setCurrent,
  violationId,
  confirm,
}: PartiesInformationStepProps) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [isOppositionModalOpen, setIsOppositionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const [rejectForm] = Form.useForm();

  //? ================================  Api Calls ================================
  // دریافت اطلاعات
  const [
    getOtherDocuments,
    { data: getOtherDocumentsData, isFetching: getOtherDocumentsLoading },
  ] = useLazyGetRemoveHistoryOtherDocumentsQuery();

  // ارسال در صورت موافقت درخواست
  const [sendAgreementRequest, { isLoading: sendAgreementRequestLoading }] =
    useSendRemoveHistoryAgreementRequestModalMutation();

  // ارسال در صورت مخالفت با درخواست
  const [sendOppositionRequest, { isLoading: sendOppositionRequestLoading }] =
    useSendRemoveHistoryOppositionRequestModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (violationId) {
      getOtherDocuments(violationId).unwrap().then(getOtherDocumentsOnSuccess);
    }
  }, [violationId]);

  //* ================================ Util Functions ================================
  // دکمه قبلی
  const prevStepHandler = () => {
    // setSearchParams({ id: createInfoData?.data?.id?.toString() });
    setCurrent((prev) => (prev < 4 ? prev - 1 : 3));
  };

  // باز کردن مودال
  const agreementRequestHandler = () => {
    setIsModalOpen({
      isOpen: true,
      id: -1,
    });
  };
  const oppositionRequestHandler = () => {
    setIsOppositionModalOpen({
      isOpen: true,
      id: -1,
    });
  };

  // بستن مودال
  const closeAgreementModalHandler = () => {
    setIsModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  const closeOppositionModalBtnHandler = () => {
    setIsOppositionModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  // upload file
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

  // تایید
  const confirmationModalBtnHandler = () => {
    if (id) {
      sendAgreementRequest({
        form: "AgreeRemovalRequestRecord",
        id: "016b8b100dbb4ba6aa2d4a65946edca6",
        _data_: {
          id: +id,
          dateFinalAnswer: new Date().toISOString(),
          confirmation: true,
          status: 2,
          AssociationViolationStudent: {
            violationStatus: "22",
            id: violationId,
          },
        },
      })
        .unwrap()
        .then(sendAgreementRequestOnSuccess);
    }
  };

  const sendAgreementRequestOnSuccess = (
    value: SendRemoveHistoryAgreementRequestModalResponse
  ) => {
    if (value.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigate({
        pathname: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_LIST_PAGE_ROUTE,
      });
    }
  };
  //مخالفت با درخواست
  const oppositionBtnHandler = () => {
    const values = rejectForm.getFieldsValue();

    if (id) {
      sendOppositionRequest({
        form: "OpposedDeletingRecord",
        id: "2798765f4db6488a93946bdb0a769a58",
        _data_: {
          id: +id,
          dateFinalAnswer: new Date().toISOString(),
          confirmation: false,
          status: 3,
          descRejection: values?.description,
          AssociationViolationStudent: {
            recycleBin: true,
            id: violationId,
          },
        },
      })
        .unwrap()
        .then(sendOppositionRequestOnSuccess);
    }
  };
  const sendOppositionRequestOnSuccess = (
    value: SendRemoveHistoryOppositionRequestModalResponse
  ) => {
    if (value.status === 200) {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
      navigate({
        pathname: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_LIST_PAGE_ROUTE,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="موافقت با درخواست"
          isModalOpen={isModalOpen?.isOpen}
          confirmBtnText="موافقت با درخواست"
          closeModalHandler={closeAgreementModalHandler}
          onConfirmClickHandler={confirmationModalBtnHandler}
          content={
            <div className="remove-history-agreement-modal-container">
              <p className="desc">
                آیا از موافقت با این درخواست اطمینان دارید؟ در صورت تأیید، این سابقه از
                لیست سوابق حذف خواهد شد.
              </p>
            </div>
          }
          isConfirmButtonLoading={sendAgreementRequestLoading}
          showIcon={false}
        />
      )}

      {isOppositionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="مخالفت با درخواست"
          isModalOpen={isOppositionModalOpen?.isOpen}
          confirmBtnText="مخالفت با درخواست"
          closeModalHandler={closeOppositionModalBtnHandler}
          onConfirmClickHandler={oppositionBtnHandler}
          content={<OppositionRequestModalContent form={rejectForm} />}
          isConfirmButtonLoading={sendOppositionRequestLoading}
          showIcon={false}
        />
      )}

      <Div
        className="remove-history-other-document-container"
        loading={getOtherDocumentsLoading}
      >
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
        <div className="btn-wrapper">
          <CustomButton onClick={prevStepHandler}>قبلی</CustomButton>
          <CustomButton
            type="primary"
            danger
            ghost
            onClick={oppositionRequestHandler}
            disabled={confirm}
          >
            مخالفت با درخواست
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={agreementRequestHandler}
            disabled={confirm}
          >
            موافقت با درخواست
          </CustomButton>
        </div>
      </Div>
    </>
  );
};
