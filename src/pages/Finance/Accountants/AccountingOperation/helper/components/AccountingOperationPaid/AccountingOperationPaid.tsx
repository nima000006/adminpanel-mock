import { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAccountingSettledQuery } from "@infra/states/redux/Apis/finance/financeApi";
import AccountingOperationPaidListTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaid/helper/models/AccountingOperationPaidListTableModel/AccountingOperationPaidListTableModel";
import {
  AccountingSettledContent,
  AccountingSettledRequest,
  AccountingSettledResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";

const AccountingOperationPaid = () => {
  const [data, setData] = useState<AccountingSettledResponse>();

  const { params: url, setSearchParams } = useQueryParams();
  //? ================================  Api Calls ================================
  const [
    getAccountingOperationQueuePaid,
    { isFetching: getAccountingOperationQueuePaidLoading },
  ] = useLazyGetAccountingSettledQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (url?.tab !== "3") return;
    const requestAdvanceFilterParams: AccountingSettledRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      settlementStatus: "PAID", // getting data for paid tab
      sortBy: "modifiedDate",
      sortDirection: "DESC",
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        requestAdvanceFilterParams.sortBy = sorting.sortBy;
      } else {
        delete requestAdvanceFilterParams.sortBy;
      }

      if (sorting?.sortOrder) {
        requestAdvanceFilterParams.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete requestAdvanceFilterParams.sortDirection;
      }
    }

    getAccountingOperationQueuePaid(requestAdvanceFilterParams)
      .unwrap()
      .then((res) => setData(res));
  }, [getAccountingOperationQueuePaid, url.page, url.pageSize, url?.sortings]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <ToolBox
        leftSide={
          <CustomButton disabled>
            خروجی <IoIosArrowDown />
          </CustomButton>
        }
      />
      <CustomTable<AccountingSettledContent>
        className="mt-4"
        dataSource={data?.content}
        columns={AccountingOperationPaidListTableModel()}
        rowKey="uuid"
        loading={getAccountingOperationQueuePaidLoading}
        draggableColumns
        draggableId={ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_PAID}
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
      />
    </>
  );
};
export default AccountingOperationPaid;
