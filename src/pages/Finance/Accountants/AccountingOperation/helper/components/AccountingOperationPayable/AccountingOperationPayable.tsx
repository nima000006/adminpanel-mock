import { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { PiCardholder } from "react-icons/pi";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FINANCE_ACCOUNTING_OPERATION_SETTLEMENT_DOCUMENTS_PAGE_ROUTE } from "@infra/router/routes/finance";
import { useLazyGetAccountingOperationPayableListQuery } from "@infra/states/redux/Apis/finance/financeApi";
import {
  GetAccountingOperationPayableListItems,
  GetAccountingOperationPayableListRequest,
  GetAccountingOperationPayableListResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/@types/@accountingOperationPayable";
import AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent";
import AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";
import AccountingOperationPayableTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/models/AccountingOperationPayableTableModel";

const AccountingOperationPayable = () => {
  const { params, setSearchParams } = useQueryParams();

  const [dataSource, setDataSource] =
    useState<GetAccountingOperationPayableListResponse>();

  const [documentUuid, setDocumentUuid] = useState("");

  const [isDocumentDrawerOpen, setIsDocumentDrawerOpen] = useState(false);

  const [isBeneficiaryDrawerOpen, setIsBeneficiaryDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<GetAccountingOperationPayableListItems>();

  //? ================================  Api Calls ================================
  const [
    getAccountingOperationPayable,
    { isFetching: getAccountingOperationPayableLoading },
  ] = useLazyGetAccountingOperationPayableListQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (params?.tab !== "1" || isBeneficiaryDrawerOpen || isDocumentDrawerOpen) return;
    const requestParams: GetAccountingOperationPayableListRequest = {
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
    };

    // sortings
    if (params?.sortings) {
      const sorting = JSON.parse(params?.sortings)?.[0];

      if (sorting?.sortBy) {
        requestParams.sortBy = sorting.sortBy;
      } else {
        delete requestParams.sortBy;
      }

      if (sorting?.sortOrder) {
        requestParams.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete requestParams.sortDirection;
      }
    }
    getAccountingOperationPayable(requestParams)
      .unwrap()
      .then((res) => setDataSource(res));
  }, [
    getAccountingOperationPayable,
    params.page,
    params.pageSize,
    params?.sortings,
    params?.tab,
  ]);

  const closeDrawer = () => {
    setIsBeneficiaryDrawerOpen(false);
    setSearchParams({ tab: "1" });
  };
  const closeDocumentDrawer = () => {
    setSearchParams({ tab: "1" });
    setIsDocumentDrawerOpen(false);
  };
  const openDrawer = (records: GetAccountingOperationPayableListItems) => {
    setSelectedRecord(records);
    setIsBeneficiaryDrawerOpen(true);
  };

  const openDocumentDrawer = (uuid: string) => {
    setDocumentUuid(uuid);

    setIsBeneficiaryDrawerOpen(false);

    setIsDocumentDrawerOpen(true);
  };
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {isBeneficiaryDrawerOpen && selectedRecord && (
        <CustomDrawer
          size="large"
          onClose={closeDrawer}
          open={isBeneficiaryDrawerOpen}
          content={
            <AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent
              onClose={closeDrawer}
              record={selectedRecord}
              openDocumentDrawer={openDocumentDrawer}
            />
          }
        />
      )}
      {isDocumentDrawerOpen && (
        <CustomDrawer
          size="large"
          open={isDocumentDrawerOpen}
          onClose={closeDocumentDrawer}
          content={
            <AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent
              uuid={documentUuid}
              onClose={closeDocumentDrawer}
            />
          }
        />
      )}
      <ToolBox
        leftSide={
          <div className="flex gap-3 max-[400px]:flex-col">
            <Link to={FINANCE_ACCOUNTING_OPERATION_SETTLEMENT_DOCUMENTS_PAGE_ROUTE}>
              <CustomButton type="primary" icon={<PiCardholder />}>
                تسویه اسناد
              </CustomButton>
            </Link>
            <CustomButton disabled>
              خروجی <IoIosArrowDown />
            </CustomButton>
          </div>
        }
      />
      <CustomTable<GetAccountingOperationPayableListItems>
        className="mt-4"
        dataSource={dataSource?.content}
        columns={AccountingOperationPayableTableModel(openDrawer)}
        rowKey="ticketNumber"
        loading={getAccountingOperationPayableLoading}
        draggableColumns
        draggableId={ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_PAYABLE}
        pagination={manualPaginationConfig({
          total: dataSource?.totalElements,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...params,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: params?.page ? Number(params?.page) : 1,
          defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
          showSizeChanger: false,
        })}
      />
    </>
  );
};
export default AccountingOperationPayable;
