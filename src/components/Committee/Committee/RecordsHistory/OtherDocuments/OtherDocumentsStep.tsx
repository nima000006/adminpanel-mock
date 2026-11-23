import { useRef, useState } from "react";

import { Button, Form, UploadFile } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import {
  DeleteNewDocumentModalTypes,
  NewDocumentType,
  OtherDocumentsStepProps,
  attachedFileType,
} from "./@types/@otherDocumentsStep";
import {
  dataPlaceHolder,
  fileDirCreator,
  fileNameCreator,
} from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import { useCreateAndEditOtherDocumentsInfoMutation } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { useCommitteeUploadFilesMutation } from "../../../../../infrastructure/states/redux/Apis/committee/generalApis/generalApis";
import { REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { UploadFileResponse } from "../../../../../pages/Committee/BasicInfo/RulesAndLaws/NewRulesAndLaws/@types/@newRulesAndLaws";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomUploader from "../../../../CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "../../../../Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "../../../../Renderers/SingleVerticalItem/SingleVerticalItem";
import { GetCreateAndEditOtherDocumentsInfoResponse } from "../IssuedVote/IssuedVoteContent/OtherDocuments/@types/@otherDocumentsStep";
import "./_otherDocumentsStep.scss";

const CREATE_EDIT_VIOLATION_INFO_WARN_MSG = "مشکلی پیش آمده است، لطفا مجدد تلاش فرمایید.";

const OtherDocumentsStep = ({ setCurrentStep }: OtherDocumentsStepProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  const [addNewDocument, setAddNewDocument] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [documentList, setDocumentList] = useState<
    { title: string; attachedFile?: attachedFileType; date?: string; id: string }[]
  >([]);

  const docListRef = useRef<
    { title: string; attachedFile?: attachedFileType; date?: string; id: string }[]
  >([]);
  const numberOfAttachedFiles = useRef<number>(0);

  const [deleteNewDocumentModal, setDeleteNewDocumentModal] =
    useState<DeleteNewDocumentModalTypes>({
      isOpen: false,
      id: -1,
      title: "",
    });

  const navigate = useNavigate();
  const [form] = Form.useForm();
  /* use {
  violationStatus: 20,
  recordsStage: 4,
  dateLastStatusChange: new Date()?.toISOString(),
} properties when call API */

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useCommitteeUploadFilesMutation();

  const [
    createAndEditOtherDocumentsInfo,
    { isLoading: isCreateAndEditOtherDocumentsInfoLoading },
  ] = useCreateAndEditOtherDocumentsInfoMutation();

  //* ================================ Util Functions ================================
  const backBtnHandler = () => {
    if (id) {
      setSearchParams({ id, step: "3" });
    } else {
      navigate({
        pathname: COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE,
      });
    }

    setCurrentStep((prev) => (prev > 1 ? prev - 1 : 0));
  };

  const addNewDocumentHandler = () => setAddNewDocument(true);
  const cancelNewDocumentHandler = () => setAddNewDocument(false);

  const onCreate4thStepSuccess = (values: GetCreateAndEditOtherDocumentsInfoResponse) => {
    if (values.status === 200) {
      setSearchParams(""); //clear
      setCurrentStep(0);
      toast.success("سند جدید با موفقیت اضافه شد.", {
        toastId: "سند جدید با موفقیت اضافه شد.",
      });
    }
  };

  // create or edit main request
  const createOrEditMainRequest = () => {
    if (id) {
      createAndEditOtherDocumentsInfo({
        form: "RecordKeepingOtherDocuments",
        id: "575a7ec5af0c45d0b593f9ae811b12dc",
        _data_: {
          id: +id,
          sendToEducAssistant: null,
          violationStatus: 20,
          recordsStage: 4,
          dateLastStatusChange: new Date()?.toISOString(),
          AssociationViolationAttached: docListRef.current?.map((item) => {
            return {
              attachedTitle: item?.title ?? "",
              attachedDate: item?.date ?? "",
              UploadFiles: {
                _: [{ data: item?.attachedFile }],
              },
            };
          }) as any,
        },
      })
        .unwrap()
        .then(onCreate4thStepSuccess);
    } else {
      toast.warning(CREATE_EDIT_VIOLATION_INFO_WARN_MSG, {
        toastId: CREATE_EDIT_VIOLATION_INFO_WARN_MSG,
      });
    }
  };

  const newDocumentHandler = (event: NewDocumentType) => {
    const newDocument = {
      //random id generator
      id: new Date().getTime().toString(),
      title: event?.documentTitle,
      attachedFile: event?.attachedFile,
      date: event?.attachedDate,
    };
    numberOfAttachedFiles.current += numberOfAttachedFiles.current;
    docListRef.current = [...docListRef.current, newDocument];
    setDocumentList((prev) => [...prev, newDocument]);
    form?.resetFields();
    setFileList([]);
    setAddNewDocument(false);
  };

  const removeNewDocumentHandler = (id: string, title: string) => {
    setDeleteNewDocumentModal({
      isOpen: true,
      id,
      title,
    });
  };

  const onUploadFileSuccess = (value: UploadFileResponse, index: number) => {
    if (value?.status === 200) {
      docListRef.current = docListRef.current?.filter((data) => {
        if (data?.attachedFile?.file?.name === value?.data?.originalName) {
          (data as any).attachedFile = value?.data;
          return data;
        } else {
          return data;
        }
      });
    }

    if (index === numberOfAttachedFiles.current) {
      createOrEditMainRequest();
    }
  };

  const recordsSubmitHandler = () => {
    if (docListRef.current?.every((item) => !item?.attachedFile)) {
      // console.log(docListRef.current?.some((item) => !item?.attachedFile));

      return createOrEditMainRequest();
    }
    docListRef.current?.map((item, index) => {
      if (!item?.attachedFile) {
        if (docListRef.current?.length === index + 1) {
          return createOrEditMainRequest();
        }
        return;
      }
      const formData = new FormData();

      formData.append("file", item?.attachedFile?.file as any);
      formData.append("dir", fileDirCreator());
      formData.append(
        "name",
        fileNameCreator() + `.${item?.attachedFile?.file?.name?.split(".")[1]}`
      );
      uploadFile(formData as any)
        .unwrap()
        .then((value) => onUploadFileSuccess(value, index));
      return;
    });
  };

  const deleteModalCloseHandler = () => {
    setDeleteNewDocumentModal({
      isOpen: false,
      id: -1,
      title: "",
    });
  };

  const deleteNewDocumentHandler = (id: string | number) => {
    docListRef.current = [...docListRef.current].filter((item) => item.id !== id);
    setDocumentList((prev) => [...prev].filter((item) => item.id !== id));
    setDeleteNewDocumentModal({
      isOpen: false,
      id: -1,
      title: "",
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {deleteNewDocumentModal?.isOpen && (
        <ConfirmationModalWithContent
          title="حذف سند"
          isModalOpen={deleteNewDocumentModal?.isOpen}
          closeModalHandler={deleteModalCloseHandler}
          onConfirmClickHandler={() =>
            deleteNewDocumentHandler(deleteNewDocumentModal.id)
          }
          content={
            <p className="confirm-text">
              از حذف سند <span>&quot; {deleteNewDocumentModal?.title} &quot;</span> مطمئن
              هستید؟
            </p>
          }
          isDangerous={true}
          backBtnText="بازگشت"
          confirmBtnText="حذف"
          showIcon={false}
        />
      )}

      <div className="committee-records-submit-other-documents-step-container">
        <div className="border-round-box flex-col-g32">
          <div>
            <Button
              type="primary"
              ghost
              className="custom-btn"
              onClick={addNewDocumentHandler}
              disabled={addNewDocument}
            >
              افزودن سند جدید
            </Button>
          </div>
          {addNewDocument && (
            <Form
              className="border-round-box flex-col-g32"
              form={form}
              onFinish={newDocumentHandler}
            >
              <CustomDivider text="سند جدید" />
              <div className="grid-cols-2">
                <CustomDatePicker
                  label="تاریخ"
                  // className="date-picker"
                  placeholder="انتخاب کنید"
                  name="attachedDate"
                  form={form}
                  rules={[REQUIRED_RULE]}
                />
                <CustomInput
                  type="text"
                  label="عنوان"
                  name="documentTitle"
                  placeholder="عنوان سند"
                  rules={[REQUIRED_RULE]}
                />
              </div>
              <div className="upload-container">
                <CustomUploader
                  fileList={fileList}
                  setFileList={setFileList}
                  isReadOnly={false}
                  maxCount={1}
                  label="پیوست ها"
                  name="attachedFile"
                  className="attach-upload-container"
                  isDisabled={fileList.length >= 1}
                  uploaderText="بارگذاری سند"
                  hasVerticalLabel={true}
                />
              </div>
              <div className="buttons-container">
                <Button className="back-btn" onClick={cancelNewDocumentHandler}>
                  لغو
                </Button>
                <Button type="primary" htmlType="submit">
                  تایید
                </Button>
              </div>
            </Form>
          )}
          {documentList.map((item) => (
            <div className="border-round-box flex-col-g32" key={item.id}>
              <div className="divider-button-container">
                <div>
                  <CustomDivider text={item.title} />
                </div>
                <div className="button-container">
                  <Button
                    danger
                    type="text"
                    className="custom-btn"
                    onClick={() => removeNewDocumentHandler(item.id, item.title)}
                  >
                    حذف
                  </Button>
                </div>
              </div>
              <div className="grid-cols-2">
                <SingleVerticalItem
                  label="تاریخ"
                  value={dataPlaceHolder({ data: item?.date, isDate: true })}
                />
              </div>
              <div className="upload-container">
                {item?.attachedFile?.fileList ? (
                  <CustomUploader
                    fileList={(item as any)?.attachedFile?.fileList}
                    setFileList={setFileList}
                    isReadOnly={true}
                    maxCount={1}
                    className="attach-upload-container"
                    label="پیوست ها"
                    name="attachedFile"
                    // isUploadFileLoading={isUploadFileLoading}
                    // isDataLoading={isGetAttachmentsDataLoading}
                    // setAlreadyUploaded={setAlreadyUploaded as any}
                    // alreadyUploaded={alreadyUploaded}
                    // UploadSizeLimitConfig={{
                    //   size: 8,
                    //   text: "(مجموع حجم فایل ها کمتر از هشت مگابایت باشد)",
                    //   isActive: true,
                    //   sizeUnit: "MB",
                    // }}
                    hasVerticalLabel={true}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="buttons-container-total">
          <Button className="back-btn" onClick={backBtnHandler}>
            برگشت
          </Button>
          <Button
            type="primary"
            disabled={addNewDocument}
            onClick={recordsSubmitHandler}
            loading={isCreateAndEditOtherDocumentsInfoLoading || isUploadFileLoading}
          >
            ثبت نهایی
          </Button>
        </div>
      </div>
    </>
  );
};

export default OtherDocumentsStep;
