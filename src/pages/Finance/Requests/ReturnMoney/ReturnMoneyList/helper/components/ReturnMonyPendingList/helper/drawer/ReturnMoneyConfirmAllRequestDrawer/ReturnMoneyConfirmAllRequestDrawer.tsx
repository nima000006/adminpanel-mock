import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import { HiHashtag } from "react-icons/hi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useSendAllAcceptedMutation } from "@infra/states/redux/Apis/wallet/requests/requestsApi";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";

import { ReturnMoneyConfirmAllRequestDrawerProps } from "./@types/@returnMoneyConfirmAllRequestDrawerType";
import PendingConfirmAllRequestDrawerTableModel from "./helper/model/PendingConfirmAllRequestDrawerTableModel/PendingConfirmAllRequestDrawerTableModel";

import "./_returnMoneyConfirmAllRequestDrawer.scss";
import { RefundRequestListAndAdvanceFilterContent } from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyList/@types/@returnMoneyList";

const ReturnMoneyConfirmAllRequestDrawer = ({
  closeDrawerHandler,
  data,
  rowSelection,
  setRowSelection,
}: ReturnMoneyConfirmAllRequestDrawerProps) => {
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
    // todo:[shirin]:api not ready
    // refreshList();
    // refreshCount();
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
            <p className="finance-return-money-confirm-all-request-delete-modal-content">
              ایا از حذف این ایتم مطمئن هستید؟
            </p>
          }
          showIcon={false}
        />
      )}

      <div className="finance-return-money-confirm-all-request-drawer-container">
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
                تایید درخواست
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
          <CustomTable<RefundRequestListAndAdvanceFilterContent>
            dataSource={data?.filter((item: RefundRequestListAndAdvanceFilterContent) =>
              (rowSelection as React.Key[]).includes(item.id)
            )}
            columns={PendingConfirmAllRequestDrawerTableModel({ deleteHandler })}
            pagination={paginationConfig}
            {...TABLE_PROPS(data?.length ?? 0)}
            rowKey="id"
          />
        </div>
      </div>
    </>
  );
};
export default ReturnMoneyConfirmAllRequestDrawer;
