import { useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";

import { BankAccountAllListProps } from "./@types/@bankAccountAllListType";
import BankAccountAllListTableModel from "./helper/model/BankAccountAllListTableModel/BankAccountAllListTableModel";

import "./_bankAccountAllList.scss";

const BankAccountAllList = ({
  data,
  // loading,
  filterItemsList,
  form,
  loadingAdvance,
}: BankAccountAllListProps) => {
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  //  advance modal
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
    form.resetFields();
  };

  const { params: url, setSearchParams } = useQueryParams();

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
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

      <div className="banking-card-all-list-container">
        <CustomDivider text="لیست درخواست‌ها" />
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton onClick={openAdvanceFilter} icon={<AiOutlineFilter />}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          }
        />
        <CustomTable<RequestBankAccountDataType>
          dataSource={data?.content}
          columns={BankAccountAllListTableModel()}
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
          draggableColumns
          draggableId={ExcelCodes.WALLET_BANK_ACCOUNT_ALL_LIST_TABLE}
        />
      </div>
    </>
  );
};
export default BankAccountAllList;
