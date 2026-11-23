import { useState } from "react";

import { Col, Row } from "antd";
import { HiHashtag } from "react-icons/hi";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { PaymentOnAccountListDataType } from "@pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/@types/@paymentOnAccountList";
import PendingConfirmAllRequestDrawerTableModel from "@pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/helper/components/PaymentOnAccountPendingList/helper/drawer/PaymentOnAccountConfirmAllRequestDrawer/helper/model/PendingConfirmAllRequestDrawerTableModel/PendingConfirmAllRequestDrawerTableModel";
import { RefundRequestListAndAdvanceFilterContent } from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyList/@types/@returnMoneyList";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";

const ReviewOptionalRequest = ({
  data,
  setRowSelection,
  rowSelection,
}: {
  data:
    | RefundRequestListAndAdvanceFilterContent[]
    | PaymentOnAccountListDataType[]
    | undefined;
  setRowSelection: React.Dispatch<React.SetStateAction<React.Key[]>>;
  rowSelection: React.Key[];
}) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState({ isOpen: false, id: -1 });
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {deleteModalIsOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="حذف"
          isDangerous={true}
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
          <CustomTable<
            RefundRequestListAndAdvanceFilterContent | PaymentOnAccountListDataType
          >
            dataSource={data?.filter(
              (
                item:
                  RefundRequestListAndAdvanceFilterContent | PaymentOnAccountListDataType
              ) => (rowSelection as React.Key[]).includes(item.id)
            )}
            columns={PendingConfirmAllRequestDrawerTableModel({ deleteHandler })}
            pagination={paginationConfig}
            rowKey="id"
          />
        </div>
      </div>
    </>
  );
};
export default ReviewOptionalRequest;
