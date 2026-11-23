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
import { AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableProps } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTable/helper/models/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableModel/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableModel";
import AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTable/helper/models/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableModel/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableModel";
const AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTable =
  ({
    uuid,
    view,
  }: AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableProps) => {
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
        pageSize: params?.beneficiaryDocCreditPageSize
          ? Number(params?.beneficiaryDocCreditPageSize)
          : 8,
        pageNumber: params?.beneficiaryDocCreditPage
          ? Number(params.beneficiaryDocCreditPage) - 1
          : 0,
        documentType: "CREDIT",
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
      params?.beneficiaryDocCreditPage,
      params?.beneficiaryDocCreditPageSize,
      params?.sorting,
      GetSettlementBeneficiariesDetailDocumentsList,
    ]);

    return (
      <CustomTable<getSettlementBeneficiariesDetailDocumentsContent>
        className="mt-4"
        dataSource={dataSource?.content}
        columns={AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableModel()}
        rowKey="branchId"
        loading={GetSettlementBeneficiariesDetailDocumentsListLoading}
        draggableColumns
        draggableId={
          ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_PAYABLE_SELECT_BENEFICIARY_CREDIT_DRAWER
        }
        pagination={manualPaginationConfig({
          total: dataSource?.totalElements,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...params,
              beneficiaryDocCreditPage: page?.toString(),
              beneficiaryDocCreditPageSize: pageSize?.toString(),
            });
          },
          pageNumber: params?.beneficiaryDocCreditPage
            ? Number(params?.beneficiaryDocCreditPage)
            : 1,
          defaultPageSize: params?.beneficiaryDocCreditPageSize
            ? Number(params?.beneficiaryDocCreditPageSize)
            : 8,
        })}
      />
    );
  };
export default AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTable;
