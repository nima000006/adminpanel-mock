import { useState } from "react";

import { Col, Row } from "antd";
import { HiHashtag } from "react-icons/hi";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  GetRequestBankAccountListResponse,
  RequestBankAccountDataType,
} from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";

import PendingConfirmAllRequestDrawerTableModel from "../../../../ConfirmAllRequestDrawerContent/helper/model/PendingConfirmAllRequestDrawerTableModel/PendingConfirmAllRequestDrawerTableModel";

const ReviewOptionalRequest = ({
  data,
  setRowSelection,
  rowSelection,
}: {
  data: GetRequestBankAccountListResponse | null;
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
            {...TABLE_PROPS(data?.content.length ?? 0)}
            rowKey="id"
            draggableColumns
            draggableId={ExcelCodes.WALLET_REVIEW_OPTIONAL_REQUEST_TABLE}
          />
        </div>
      </div>
    </>
  );
};
export default ReviewOptionalRequest;
