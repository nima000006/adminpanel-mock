import { useState } from "react";

import { Checkbox, CheckboxChangeEvent } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { PaymentOnAccountPendingListProps } from "./@type/@paymentOnAccountPendingListType";
import PaymentOnAccountConfirmAllRequestDrawer from "./helper/drawer/PaymentOnAccountConfirmAllRequestDrawer/PaymentOnAccountConfirmAllRequestDrawer";
import PaymentOnAccountRejectAllRequestDrawers from "./helper/drawer/PaymentOnAccountRejectAllRequestDrawer/PaymentOnAccountRejectAllRequestDrawer";
import PaymentOnAccountPendingListTableModel from "./helper/model/PaymentOnAccountPendingListTableModel/PaymentOnAccountPendingListTableModel";

import "./_paymentOnAccountPendingList.scss";
import { PaymentOnAccountListDataType } from "@pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/@types/@paymentOnAccountList";

const PaymentOnAccountPendingList = ({ data }: PaymentOnAccountPendingListProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [confirmAllRequestDrawer, setConfirmAllRequestDrawer] = useState(false);
  const [rejectAllRequestDrawer, setRejectAllRequestDrawer] = useState(false);

  //* ================================ Util Functions ================================
  const onSelectedRowKeysChange = (newSelectedKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onSelectedRowKeysChange(data?.map((item: any) => item.id) || []);
    } else {
      onSelectedRowKeysChange([]);
    }
  };

  // CHECK ALL
  const allSelected = !!data && selectedRowKeys.length === (data?.length || 0);

  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < (data?.length || 0);

  const openAdvanceFilter = () => {};
  // DRAWER HANDLER
  const closeConfirmAllRequestDrawerHandler = () => {
    setConfirmAllRequestDrawer(false);
    setSelectedRowKeys([]);
  };
  const closeRejectAllRequestDrawerHandler = () => {
    setRejectAllRequestDrawer(false);
    setSelectedRowKeys([]);
  };

  // BTN HANDLER
  const confirmAllHandler = () => {
    setConfirmAllRequestDrawer(true);
  };
  const rejectAllHandler = () => {
    setRejectAllRequestDrawer(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* CONFIRM ALL REQUEST */}
      {confirmAllRequestDrawer && (
        <CustomDrawer
          onClose={closeConfirmAllRequestDrawerHandler}
          open={confirmAllRequestDrawer}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <PaymentOnAccountConfirmAllRequestDrawer
              closeDrawerHandler={closeConfirmAllRequestDrawerHandler}
              data={data}
              rowSelection={rowSelection.selectedRowKeys}
              setRowSelection={setSelectedRowKeys}
              // refreshList={getListData}
              // refreshCount={refreshCount}
            />
          }
        />
      )}

      {/* REJECT ALL REQUEST */}
      {rejectAllRequestDrawer && (
        <CustomDrawer
          onClose={closeRejectAllRequestDrawerHandler}
          open={rejectAllRequestDrawer}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <PaymentOnAccountRejectAllRequestDrawers
              closeDrawerHandler={closeRejectAllRequestDrawerHandler}
              data={data}
              rowSelection={rowSelection.selectedRowKeys}
              setRowSelection={setSelectedRowKeys}
              // refreshList={getListData}
              // refreshCount={refreshCount}
            />
          }
        />
      )}

      <div className="finance-payment-on-account-pending-list-container">
        <CustomDivider
          className="custom-divider"
          text="لیست درخواست‌های پرداخت علی الحساب"
          extraContent={
            <Checkbox
              indeterminate={isIndeterminate}
              onChange={onCheckAllChange}
              checked={allSelected}
            >
              انتخاب همه
            </Checkbox>
          }
        />
        <ToolBox
          rightSide={
            <CustomBadge count={""}>
              <CustomButton
                disabled
                onClick={openAdvanceFilter}
                icon={<AiOutlineFilter />}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2 max-[730px]:flex-col">
              <CustomButton
                type="primary"
                danger
                disabled={selectedRowKeys.length < 1}
                onClick={rejectAllHandler}
              >
                رد گروهی
              </CustomButton>
              <CustomButton
                disabled={selectedRowKeys.length < 1}
                onClick={confirmAllHandler}
              >
                تایید گروهی
              </CustomButton>
              <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
                خروجی
              </CustomButton>
            </div>
          }
        />
        <CustomTable<PaymentOnAccountListDataType>
          dataSource={data}
          columns={PaymentOnAccountPendingListTableModel()}
          // loading={}
          pagination={paginationConfig}
          {...TABLE_PROPS(data.length ?? 0)}
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />
      </div>
    </>
  );
};
export default PaymentOnAccountPendingList;
