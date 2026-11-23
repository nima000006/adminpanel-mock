import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { PiHashStraightBold, PiArrowLineUpRightBold } from "react-icons/pi";
import { toast } from "react-toastify";

import { CustomUploader } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput.refactored";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder, getUploadFilePayload } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  usePaymentUploadFileMutation,
  useWithdrawalAcceptRequestMutation,
} from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import { RED_6 } from "@infra/VARS/globalColors/globalColors";
import { FONTSIZE_25 } from "@infra/VARS/globalStyles/globalStyles";

import {
  WalletRequestAcceptFlattenedDataType,
  WalletRequestDrawerProps,
} from "./@types/@withdrawalAcceptRequest";
import WalletRequestDrawerTableModel from "./models/WalletRequestDrawerTableModel/WalletRequestDrawerTableModel";
import WalletRequestLegalDrawerTableModel from "./models/WalletRequestLegalDrawerTableModel/WalletRequestLegalDrawerTableModel";
import { Withdrawal } from "../../@types/@walletRequestUsersList";

import "./_walletRequestDrawer.scss";

const SEND_ACCEPT_SUCCESS_MSG = "درخواست با موفقیت تایید شد";

const WalletRequestDrawer = ({
  onClose,
  selectedUsers: initialUsers,
  refreshData,
  getStats,
}: WalletRequestDrawerProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Withdrawal[]>(initialUsers || []);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { params } = useQueryParams();

  const [form] = Form.useForm();

  //? ================================  api ================================
  const [withdrawalAcceptRequest, { isLoading }] = useWithdrawalAcceptRequestMutation();

  const [paymentUploadFile] = usePaymentUploadFileMutation();

  // ================================ Utils function ================================

  const onSubmitHandler = async () => {
    const ids = selectedUsers.map((user) => user.id);

    // ================= FILE MODE =================
    let fileId = null;
    if (fileList?.[0]) {
      const selectedFile = fileList?.[0];
      const formData = new FormData();
      const fileToUpload = getUploadFilePayload(selectedFile);
      if (!fileToUpload) return;

      formData.append("file", fileToUpload as Blob);

      fileId = await paymentUploadFile({
        body: formData,
      });
    }

    const formData = form.getFieldsValue();

    withdrawalAcceptRequest({
      ids,
      ...(fileId?.data?.uuid && { fileUuid: fileId?.data?.uuid }),
      ...(formData?.walletRequestDocumentTitle && {
        title: formData?.walletRequestDocumentTitle,
      }),
      ...(formData?.walletRequestDocumentDescription && {
        description: formData?.walletRequestDocumentDescription,
      }),
    })
      .unwrap()
      .then(() => {
        refreshData();
        getStats();
        onClose();
      });
  };
  const closeModalHandler = () => {
    setDeleteId(null);
  };
  const openDeleteModal = (id: number) => {
    setDeleteId(id);
  };
  const onConfirmClickHandler = () => {
    if (deleteId !== null) {
      setSelectedUsers((prev) => prev.filter((item) => item.id !== deleteId));
    }
    toast.success(SEND_ACCEPT_SUCCESS_MSG, {
      toastId: SEND_ACCEPT_SUCCESS_MSG,
    });
    closeModalHandler();
  };

  const getTotalWithdrawalAmount = (users: Withdrawal[] = []): number => {
    return users.reduce((sum, item) => sum + item.amount.totalAmount, 0);
  };

  const totalAmount = getTotalWithdrawalAmount(selectedUsers);
  const flattenedData: WalletRequestAcceptFlattenedDataType[] = selectedUsers?.map(
    (item) => ({
      ...item,
      firstname: item.userStaffDetail?.firstname,
      LastName: item.userStaffDetail?.LastName,
    })
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <ConfirmationModalWithContent
        isModalOpen={deleteId !== null}
        backBtnText="انصراف"
        confirmBtnText="حذف کن"
        title="حذف از لیست"
        content="آیا از حذف درخواست انتخاب شده از لیست تایید گروهی اطمینان دارید؟"
        closeModalHandler={closeModalHandler}
        onConfirmClickHandler={onConfirmClickHandler}
      />
      <div className="wallet-request-users-drawer-container">
        <CustomDrawerHeader
          closeDrawerHandler={onClose}
          title="تایید گروهی درخواست"
          leftSideContent={
            <>
              <CustomButton onClick={onClose}>انصراف</CustomButton>
              <CustomButton
                type="primary"
                disabled={selectedUsers.length === 0}
                onClick={onSubmitHandler}
                loading={isLoading}
              >
                تایید و واریز به حساب
              </CustomButton>
            </>
          }
        />
        <Row gutter={[16, 16]}>
          <Col xl={12} lg={12} md={24} xs={24}>
            <div className="custom-info-box">
              <span>
                <PiHashStraightBold width={FONTSIZE_25} />
                <span>تعداد درخواست‌های انتخاب شده</span>
              </span>
              <span>{dataPlaceHolder({ data: selectedUsers?.length?.toString() })}</span>
            </div>
          </Col>
          <Col xl={12} lg={12} md={24} xs={24}>
            <div className="custom-info-box">
              <span>
                <PiArrowLineUpRightBold color={RED_6} />
                <span>مجموع مبالغ درخواستی</span>
              </span>
              <span>
                {" "}
                {dataPlaceHolder({
                  data: totalAmount.toString(),
                  isRial: true,
                  isPrice: true,
                })}{" "}
                تومان
              </span>
            </div>
          </Col>
        </Row>
        <Form className="flex flex-col gap-4" layout="vertical" form={form}>
          <p>
            یک فایل پیوست برای همه درخواست‌های انتخاب‌شده ذخیره می‌شود. عنوان و توضیحات
            نیز برای همه موارد ثبت خواهد شد.
          </p>
          <CustomInput
            type="text"
            label="عنوان (اختیاری)"
            name="walletRequestDocumentTitle"
            placeholder="مستندات درخواست برداشت"
          />
          <CustomInput
            type="text"
            label="توضیحات (اختیاری)"
            name="walletRequestDocumentDescription"
            placeholder="مستندات این درخواست برای بررسی و پیگیری پرداخت پیوست شده است."
          />
          <div className="uploader">
            <CustomUploader
              fileList={fileList || []}
              setFileList={setFileList || (() => {})}
              isReadOnly={false}
              label="فایل پیوست (اختیاری)"
              uploaderText={
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                  <div className="upload-text">بارگذاری</div>
                </div>
              }
              isDisabled={!!fileList?.length}
              hasUploaderIcon={false}
              maxCount={1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="file"
            />
          </div>
        </Form>
        <CustomDivider text="درخواست های انتخاب شده" />
        <CustomTable<WalletRequestAcceptFlattenedDataType>
          dataSource={flattenedData}
          columns={
            params?.tab === "2"
              ? WalletRequestLegalDrawerTableModel({
                  openDeleteModal,
                })
              : WalletRequestDrawerTableModel({
                  openDeleteModal,
                })
          }
          pagination={paginationConfig}
          {...TABLE_PROPS(flattenedData?.length || 0)}
          rowKey="id"
          className="wallet-request-users-drawer-model-table-container"
          draggableColumns
          draggableId={ExcelCodes.WALLET_WALLET_REQUEST_DRAWER_TABLE}
        />
      </div>
    </>
  );
};
export default WalletRequestDrawer;
