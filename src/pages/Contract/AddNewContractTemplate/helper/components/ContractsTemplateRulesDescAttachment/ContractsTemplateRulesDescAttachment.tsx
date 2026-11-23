import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { GrAttachment } from "react-icons/gr";
import { PiPlus, PiTrashSimple } from "react-icons/pi";
import { Link } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useAddContractFileMutation,
  useDeleteContractFileOnStepFourMutation,
} from "@infra/states/redux/Apis/contracts/addNewContractTemplate/addNewContractTemplate";
import { useLazyGetContractTemplateDetailQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";

import {
  AttachmentType,
  ContractsTemplateRulesDescAttachmentFormValues,
} from "./@types/@ContractsTemplateRulesDescAttachmentModalContentProps";
import ContractsTemplateRulesDescAttachmentModalContent from "./helper/ContractsTemplateRulesDescAttachmentModalContent/ContractsTemplateRulesDescAttachmentModalContent";
import "./_contractsTemplateRulesDescAttachment.scss";

const SEND_FILE_CONTRACT_SUCCESS_MSG = ".فایل با موفقیت  بروزرسانی شد";
const ContractsTemplateRulesDescAttachment = () => {
  const [data, setData] = useState<AttachmentType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AttachmentType | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | number | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm<ContractsTemplateRulesDescAttachmentFormValues>();

  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [addFile, { isLoading: isAddFileLoading }] = useAddContractFileMutation();

  const [getContractinfo, { isFetching: isGetContractinfoLoading }] =
    useLazyGetContractTemplateDetailQuery();

  const [deleteFile, { isLoading: isDeleteFileLoading }] =
    useDeleteContractFileOnStepFourMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    const contractId = params?.contractId;
    if (contractId) {
      getContractinfo(+contractId)
        .unwrap()
        .then((contractInfoData) => {
          if (contractInfoData?.files?.length) {
            setData(
              contractInfoData.files.map((item) => ({
                id: item.id,
                title: item.fileName || "",
                fileName: item.name || "",
                fileUrl: item.url || "",
              }))
            );
          }
        });
    }
  }, []);

  // ================================ Util function ================================
  const cancelBtnHandler = () => {
    setSearchParams({
      ...params,
      step: "3",
    });
  };

  const saveDraftHandler = () => {
    toast.success(SEND_FILE_CONTRACT_SUCCESS_MSG, {
      toastId: SEND_FILE_CONTRACT_SUCCESS_MSG,
    });
  };
  const nextStepHandler = () => {
    setSearchParams({
      ...params,
      step: "5",
    });
  };
  const addModalHandler = () => {
    setEditingItem(null);
    setFileList([]);
    form.resetFields();
    setIsModalOpen(true);
  };

  {
    /* nima[todo] : uncomment when api got ready */
  }
  // const editModalHandler = (item: AttachmentType) => {
  //   setEditingItem(item);

  //   let uploadFile: UploadFile | null = null;

  //   if (item.file) {
  //     uploadFile = item.file;
  //   } else if (item.fileUrl) {
  //     const fileName = item.fileName || item.title || "فایل";
  //     const fileExtension = fileName.includes(".") ? fileName.split(".").pop() || "" : "";
  //     const isAbsoluteUrl = item.fileUrl.startsWith("http");

  //     uploadFile = {
  //       uid: String(item.id),
  //       name: isAbsoluteUrl ? item.fileUrl : fileName,
  //       status: "done" as const,
  //       url: item.fileUrl,
  //       relativeUrl: item.fileUrl,
  //       extension: fileExtension,
  //     } as UploadFile;
  //   }

  //   if (uploadFile) {
  //     setFileList([uploadFile]);
  //     form.setFieldsValue({
  //       title: item.title,
  //       file: { fileList: [uploadFile] },
  //     });
  //   } else {
  //     setFileList([]);
  //     form.setFieldsValue({
  //       title: item.title,
  //     });
  //   }

  //   setIsModalOpen(true);
  // };

  const deleteModalHandler = (itemId: string | number) => {
    setDeletingItemId(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async () => {
    form.validateFields().then((values) => {
      const file = fileList[0];

      if (!file) {
        form.setFields([
          {
            name: "file",
            errors: ["لطفا فایلی را انتخاب کنید"],
          },
        ]);
        return;
      }

      if (editingItem) {
        // Edit mode
        setData((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  title: values.title,
                  fileName: file.name || item.fileName,
                  fileUrl: file.url || file.response?.url || item.fileUrl,
                  file: file,
                }
              : item
          )
        );
      } else {
        // Add mode
        const formData = new FormData();
        formData.append("file", values?.file?.fileList[0]?.originFileObj);
        addFile({
          id: +params?.contractId,
          title: values.title,
          body: formData,
        })
          .unwrap()
          .then(() => {
            return getContractinfo(+params?.contractId).unwrap();
          })
          .then((contractInfoData) => {
            setData(
              contractInfoData.files.map((item) => ({
                id: item.id,
                title: item.fileName || "",
                fileName: item.name || "",
                fileUrl: item.url || "",
              }))
            );

            setIsModalOpen(false);
            setEditingItem(null);
            setFileList([]);
            form.resetFields();
          });

        const newItem: AttachmentType = {
          id: Date.now(),
          title: values.title,
          fileName: file.name || "فایل",
          fileUrl: file.url || file.response?.url || "#",
          file: file,
        };
        setData((prev) => [...prev, newItem]);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFileList([]);
      form.resetFields();
    });
  };

  const handleDeleteConfirm = () => {
    if (deletingItemId !== null) {
      const deletingItem = data.find((item) => item.id === deletingItemId);
      if (deletingItem) {
        deleteFile({
          contractId: +params?.contractId,
          uploadFileId: +deletingItemId,
          params: {
            objectName: deletingItem.fileName,
          },
        })
          .unwrap()
          .then(() => {
            setData((prev) => prev.filter((item) => item.id !== deletingItemId));
            setIsDeleteModalOpen(false);
            setDeletingItemId(null);
          });
      }
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFileList([]);
    form.resetFields();
  };

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
    setDeletingItemId(null);
  };

  const isMaxFilesReached = data.length >= 6;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetContractinfoLoading}>
      {isModalOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isModalOpen}
          closeModalHandler={closeModalHandler}
          title={editingItem ? "ویرایش فایل پیوست" : "افزودن فایل پیوست"}
          confirmBtnText="تایید و ثبت"
          backBtnText="انصراف"
          backBtnDanger={true}
          onConfirmClickHandler={handleFormSubmit}
          onBackBtnHandler={closeModalHandler}
          htmlType="submit"
          showIcon={false}
          isConfirmButtonLoading={isAddFileLoading}
          customClass="contracts-template-attachment-modal"
          content={
            <ContractsTemplateRulesDescAttachmentModalContent
              form={form}
              onFinish={handleFormSubmit}
              fileList={fileList}
              setFileList={setFileList}
            />
          }
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isDeleteModalOpen}
          title="حذف فایل پیوست"
          closeModalHandler={closeDeleteModalHandler}
          onConfirmClickHandler={handleDeleteConfirm}
          onBackBtnHandler={closeDeleteModalHandler}
          confirmBtnText="تایید"
          backBtnText="انصراف"
          backBtnDanger={true}
          showIcon={true}
          iconType="alert"
          isConfirmButtonLoading={isDeleteFileLoading}
          content={
            <p className="body-regular">آیا از حذف این فایل پیوست اطمینان دارید؟</p>
          }
        />
      )}
      <div className="contracts-template-rules-desc-attachment-container">
        {data.length > 0 ? (
          <div className="min-h-[500px]!">
            <ToolBox
              rightSide={
                <h3 className="text-lg font-bold">فایل های پیوست قالب قرارداد</h3>
              }
              leftSide={
                <CustomButton
                  type="primary"
                  onClick={addModalHandler}
                  icon={<PiPlus />}
                  disabled={isMaxFilesReached}
                >
                  آپلود فایل پیوست
                </CustomButton>
              }
            />

            <Row gutter={[16, 16]} className="mt-6!">
              {data.map((item) => (
                <Col
                  key={item.id}
                  lg={12}
                  md={12}
                  sm={24}
                  xs={24}
                  className="flex! items-end!"
                >
                  <SingleVerticalWithCol
                    xl={21}
                    lg={21}
                    md={20}
                    sm={20}
                    xs={19}
                    label={item?.title}
                    value={item?.fileName}
                    prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
                    suffix={
                      <Link to={item.fileUrl} target="_blank" rel="noopener noreferrer">
                        <span className="body-regular">دانلود</span>
                      </Link>
                    }
                    className="custom-statistic text-primary-6! flex overflow-hidden!"
                    valueClassName="truncate"
                  />

                  <Col lg={3} md={4} sm={4} xs={5} className="flex! items-center! gap-1!">
                    {/* nima[todo] : uncomment when api got ready */}
                    {/* <CustomButton
                      className="flex h-6! w-6! items-center justify-center rounded-sm! p-0!"
                      onClick={() => editModalHandler(item)}
                    >
                      <PiPencilSimpleLine />
                    </CustomButton> */}
                    <CustomButton
                      danger
                      className="flex h-6! w-6! items-center justify-center rounded-sm! p-0!"
                      onClick={() => deleteModalHandler(item.id)}
                    >
                      <PiTrashSimple />
                    </CustomButton>
                  </Col>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div className="mt-10! flex min-h-[500px] flex-col items-center">
            <CustomEmpty description="محتوایی برای نمایش وجود ندارد." />
            <CustomButton
              icon={<PiPlus />}
              className="mt-10!"
              onClick={addModalHandler}
              disabled={isMaxFilesReached}
            >
              آپلود فایل پیوست
            </CustomButton>
          </div>
        )}
        <div className="mt-5! flex justify-end gap-1">
          <CustomButton loading={isGetContractinfoLoading} onClick={cancelBtnHandler}>
            بازگشت
          </CustomButton>
          <CustomButton onClick={saveDraftHandler}>ذخیره پیش نویس</CustomButton>
          <CustomButton type="primary" htmlType="submit" onClick={nextStepHandler}>
            تایید و ادامه
          </CustomButton>
        </div>
      </div>
    </Div>
  );
};

export default ContractsTemplateRulesDescAttachment;
