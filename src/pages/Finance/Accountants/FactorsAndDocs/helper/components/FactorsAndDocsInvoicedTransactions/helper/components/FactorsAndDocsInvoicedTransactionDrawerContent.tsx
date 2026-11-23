import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import TransactionsDetailTableModel from "./helper/models/TransactionsDetailTableModel";
import {
  AccountingInvoicedTransactionDetailsResponse,
  BeneficiaryResponseDto,
} from "../../@types/@accountingInvoicedTransactionsTypes";

const FactorsAndDocsInvoicedTransactionDrawerContent = ({
  closeDrawerHandler,
  isGetTransactionDetailsLoading,
  TransactionDetailsData,
}: {
  closeDrawerHandler: () => void;
  isGetTransactionDetailsLoading: boolean;
  TransactionDetailsData: AccountingInvoicedTransactionDetailsResponse | undefined;
}) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="جزئیات بیشتر تراکنش"
        closeDrawerHandler={closeDrawerHandler}
        hasLeftSide={false}
      />
      <CustomDivider text="اطلاعات تراکنش" />
      <Div loading={isGetTransactionDetailsLoading}>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            value={TransactionDetailsData?.trackNumber}
            label="شماره فاکتور"
            xs={12}
            xl={12}
            lg={12}
          />
          <SingleVerticalWithCol
            label="مبلغ کل تراکنش (ت)"
            value={TransactionDetailsData?.amount.toString()}
            xs={12}
            xl={12}
            lg={12}
          />
          <SingleVerticalWithCol
            label="نام و نام خانوادگی پرداخت کننده"
            value={`${TransactionDetailsData?.firstName} ${TransactionDetailsData?.lastName}`}
            xs={12}
            xl={12}
            lg={12}
          />
          <SingleVerticalWithCol
            value={TransactionDetailsData?.beneficiaryResponseDtoSet.length.toString()}
            label="تعداد شعبات"
            xs={12}
            xl={12}
            lg={12}
          />
        </Row>
      </Div>

      <CustomDivider text="لیست شعبات این تراکنش" />
      <CustomTable<BeneficiaryResponseDto>
        dataSource={TransactionDetailsData?.beneficiaryResponseDtoSet}
        rowKey="businessId"
        columns={TransactionsDetailTableModel()}
        pagination={manualPaginationConfig({
          total: TransactionDetailsData?.beneficiaryResponseDtoSet.length,
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
        {...TABLE_PROPS(TransactionDetailsData?.beneficiaryResponseDtoSet?.length || 0)}
      />
    </div>
  );
};
export default FactorsAndDocsInvoicedTransactionDrawerContent;
