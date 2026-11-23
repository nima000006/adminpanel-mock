import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import { HiHashtag } from "react-icons/hi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useSendAllAcceptedMutation } from "@infra/states/redux/Apis/wallet/requests/requestsApi";
import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";

import { ConfirmAllRequestDrawerContentProps } from "./@types/@confirmAllRequestDrawerContentTypes";
import PendingConfirmAllRequestDrawerTableModel from "./helper/model/PendingConfirmAllRequestDrawerTableModel/PendingConfirmAllRequestDrawerTableModel";

import "./_confirmAllRequestDrawerContent.scss";

const ConfirmAllRequestDrawerContent = ({
  closeDrawerHandler,
  data,
  rowSelection,
  setRowSelection,
  refreshList,
  refreshCount,
}: ConfirmAllRequestDrawerContentProps) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState({ isOpen: false, id: -1 });
  //? ================================  Api Calls ================================
  // confirm reason
  const [sendAllAccept, { isLoading: isSendAllAcceptLoading }] =
    useSendAllAcceptedMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (rowSelection.length <= 0) {
      closeDrawerHandler();
    }
  }, [rowSelection.length]);
  //* ================================ Util Functions ================================
  const deleteHandler = (id: number) => {
    setDeleteModalIsOpen({ isOpen: true, id });
  };

  // MODAL HANDLER
  const confirmDeleteModalHandler = () => {
    setRowSelection((prev) => prev.filter((key) => key !== deleteModalIsOpen.id));
    setDeleteModalIsOpen({ isOpen: false, id: -1 });
  };
  const closeDeleteModalHandler = () => {
    setDeleteModalIsOpen({ isOpen: false, id: -1 });
  };

  // DRAWER HANDLER
  const closeDrawer = () => {
    closeDrawerHandler();
  };

  const depositAccountHandler = () => {
    sendAllAccept({
      bankAccountIds: rowSelection as number[],
    })
      .unwrap()
      .then(sendAllAcceptIsSuccess);
  };

  const sendAllAcceptIsSuccess = () => {
    closeDrawerHandler();
    refreshList();
    refreshCount();
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {deleteModalIsOpen?.isOpen && (
        <ConfirmationModalWithContent
          isDangerous={true}
          title="حذف"
          isModalOpen={deleteModalIsOpen?.isOpen}
          closeModalHandler={closeDeleteModalHandler}
          onConfirmClickHandler={confirmDeleteModalHandler}
          //   isConfirmButtonLoading={}
          confirmBtnText="حذف"
          content={
            <p className="delete-modal-content">ایا از حذف این ایتم مطمئن هستید؟</p>
          }
          showIcon={false}
        />
      )}

      <div>
        <CustomDrawerHeader
          title="تایید گروهی درخواست"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <>
              <CustomButton type="default" onClick={closeDrawer}>
                انصراف
              </CustomButton>
              <CustomButton
                type="primary"
                onClick={depositAccountHandler}
                loading={isSendAllAcceptLoading}
                disabled={rowSelection.length <= 0}
              >
                تایید و واریز به حساب
              </CustomButton>
            </>
          }
        />
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <WalletDetailCards
              title="تعداد درخواست‌های انتخاب شده"
              price={dataPlaceHolder({ data: rowSelection.length.toString() })}
              icon={<HiHashtag color="#262626" size={16} />}
              centered
              showCurrency={false}
            />
          </Col>
        </Row>
        <div>
          <CustomDivider text="درخواست های انتخاب شده" />
          <CustomTable<RequestBankAccountDataType>
            dataSource={data?.content.filter((item) =>
              (rowSelection as React.Key[]).includes(item.id)
            )}
            columns={PendingConfirmAllRequestDrawerTableModel({
              deleteHandler,
            })}
            pagination={paginationConfig}
            rowKey="id"
            draggableColumns
            draggableId={ExcelCodes.WALLET_CONFIRM_ALL_REQUEST_DRAWER_CONTENT_TABLE}
          />
        </div>
      </div>
    </>
  );
};
export default ConfirmAllRequestDrawerContent;
