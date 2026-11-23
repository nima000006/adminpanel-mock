import { useState } from "react";

import { Checkbox, CheckboxChangeEvent } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";

import { BankAccountPendingListProps } from "./@types/@bankAccountPendingListTypes";
import ConfirmAllRequestDrawerContent from "./helper/drawer/ConfirmAllRequestDrawerContent/ConfirmAllRequestDrawerContent";
import RejectAllRequestDrawerContent from "./helper/drawer/RejectAllRequestDrawerContent/RejectAllRequestDrawerContent";
import BankAccountPendingListTableModel from "./helper/model/BankAccountPendingListTableModel/BankAccountPendingListTableModel";
import { RequestBankAccountDataType } from "../../../@types/@bankAccountList";

import "./_bankAccountPendingList.scss";

const BankAccountPendingList = ({
  data,
  // loading,
  getListData,
  filterItemsList,
  form,
  loadingAdvance,
  refreshCount,
}: BankAccountPendingListProps) => {
  const [confirmAllRequestDrawer, setConfirmAllRequestDrawer] = useState(false);
  const [rejectAllRequestDrawer, setRejectAllRequestDrawer] = useState(false);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { params: url, setSearchParams } = useQueryParams();
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
      onSelectedRowKeysChange(
        data?.content.map((item: RequestBankAccountDataType) => item.id) || []
      );
    } else {
      onSelectedRowKeysChange([]);
    }
  };

  const contentLength = data?.content?.length ?? 0;
  const allSelected = contentLength > 0 && selectedRowKeys.length === contentLength;

  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < contentLength;

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

  //  advance modal
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
    form.resetFields();
  };

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);

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
            <ConfirmAllRequestDrawerContent
              closeDrawerHandler={closeConfirmAllRequestDrawerHandler}
              data={data}
              rowSelection={rowSelection.selectedRowKeys}
              setRowSelection={setSelectedRowKeys}
              refreshList={getListData}
              refreshCount={refreshCount}
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
            <RejectAllRequestDrawerContent
              closeDrawerHandler={closeRejectAllRequestDrawerHandler}
              data={data}
              rowSelection={rowSelection.selectedRowKeys}
              setRowSelection={setSelectedRowKeys}
              refreshList={getListData}
              refreshCount={refreshCount}
            />
          }
        />
      )}

      {/* ADVANCE FILTER */}
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={{ ...url }}
        />
      )}

      <div className="banking-card-pending-list-container">
        <CustomDivider
          text="لیست درخواست‌ها"
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
            <CustomBadge count={badgeCount}>
              <CustomButton onClick={openAdvanceFilter} icon={<AiOutlineFilter />}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <>
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
            </>
          }
        />
        <CustomTable<RequestBankAccountDataType>
          dataSource={data?.content}
          columns={BankAccountPendingListTableModel()}
          loading={loadingAdvance}
          pagination={manualPaginationConfig({
            total: data?.totalElements,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          key={`table-${url?.pageSize || "8"} `}
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          className="banking-card-pending-list-table"
          draggableColumns
          draggableId={ExcelCodes.WALLET_BANK_ACCOUNT_PENDING_LIST_TABLE}
        />
      </div>
    </>
  );
};
export default BankAccountPendingList;
