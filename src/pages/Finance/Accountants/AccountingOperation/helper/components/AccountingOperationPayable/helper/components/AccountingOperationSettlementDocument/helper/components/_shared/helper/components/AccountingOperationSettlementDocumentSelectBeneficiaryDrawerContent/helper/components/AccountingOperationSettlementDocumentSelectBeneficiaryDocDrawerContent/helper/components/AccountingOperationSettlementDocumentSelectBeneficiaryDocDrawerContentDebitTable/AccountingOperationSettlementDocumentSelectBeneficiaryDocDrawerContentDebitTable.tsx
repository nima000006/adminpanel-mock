import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetSettlementBeneficiariesDetailDocumentsListQuery } from "@infra/states/redux/Apis/finance/financeApi";
import {
  getSettlementBeneficiariesDetailDocumentsContent,
  getSettlementBeneficiariesDetailDocumentsListRequest,
  getSettlementBeneficiariesDetailDocumentsListResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";
import { AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableProps } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTable/helper/models/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableModel/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableModel";
import AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTable/helper/models/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableModel/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableModel";
const AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTable =
  ({
    uuid,
    view,
  }: AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableProps) => {
    const [dataSource, setDataSource] =
      useState<getSettlementBeneficiariesDetailDocumentsListResponse>();

    const { params, setSearchParams } = useQueryParams();

    //? ================================  Api Calls ================================
    const [
      GetSettlementBeneficiariesDetailDocumentsList,
      { isFetching: GetSettlementBeneficiariesDetailDocumentsListLoading },
    ] = useLazyGetSettlementBeneficiariesDetailDocumentsListQuery();

    //? ================================ Effects ================================
    useEffect(() => {
      const requestParams: getSettlementBeneficiariesDetailDocumentsListRequest = {
        pageSize: params?.beneficiaryDocDebitPageSize
          ? Number(params?.beneficiaryDocDebitPageSize)
          : 8,
        pageNumber: params?.beneficiaryDocDebitPage
          ? Number(params.beneficiaryDocDebitPage) - 1
          : 0,
        documentType: "DEBIT",
        // column search
        uuid: params?.uuid ?? uuid,
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
      GetSettlementBeneficiariesDetailDocumentsList(requestParams)
        .unwrap()
        .then((res) => setDataSource(res));
    }, [
      view,
      uuid,
      params?.uuid,
      params?.beneficiaryDocDebitPage,
      params?.beneficiaryDocDebitPageSize,
      params?.sorting,
      GetSettlementBeneficiariesDetailDocumentsList,
    ]);

    return (
      <CustomTable<getSettlementBeneficiariesDetailDocumentsContent>
        className="mt-4"
        dataSource={dataSource?.content}
        columns={AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableModel()}
        rowKey="branchId"
        loading={GetSettlementBeneficiariesDetailDocumentsListLoading}
        draggableColumns
        draggableId={
          ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_PAYABLE_SELECT_BENEFICIARY_DEBIT_DRAWER
        }
        pagination={manualPaginationConfig({
          total: dataSource?.totalElements,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...params,
              beneficiaryDocDebitPage: page?.toString(),
              beneficiaryDocDebitPageSize: pageSize?.toString(),
            });
          },
          pageNumber: params?.beneficiaryDocDebitPage
            ? Number(params?.beneficiaryDocDebitPage)
            : 1,
          defaultPageSize: params?.beneficiaryDocDebitPageSize
            ? Number(params?.beneficiaryDocDebitPageSize)
            : 8,
        })}
      />
    );
  };

export default AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTable;
