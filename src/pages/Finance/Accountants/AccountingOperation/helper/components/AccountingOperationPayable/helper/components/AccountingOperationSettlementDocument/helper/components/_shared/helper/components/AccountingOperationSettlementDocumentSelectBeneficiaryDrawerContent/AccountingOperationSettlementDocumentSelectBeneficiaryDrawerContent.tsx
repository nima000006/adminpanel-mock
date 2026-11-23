import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetSettlementBeneficiariesDetailQuery } from "@infra/states/redux/Apis/finance/financeApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import {
  AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContentProps,
  getSettlementBeneficiariesDetailResponse,
  getSettlementBeneficiariesDetailContent,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDrawerContent";
import AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContentTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/models/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContentTableModel";
import { getToDate } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/utils";

const AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent = ({
  onClose,
  record,
  date,
  openDocumentDrawer,
}: AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContentProps) => {
  const [dataSource, setDataSource] =
    useState<getSettlementBeneficiariesDetailResponse>();

  const { params, setSearchParams } = useQueryParams();
  //? ================================  Api Calls ================================

  const [
    GetSettlementBeneficiariesDetail,
    { isFetching: getSettlementBeneficiariesDetailLoading },
  ] = useLazyGetSettlementBeneficiariesDetailQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    const sorting = params?.sortings ? JSON.parse(params.sortings)?.[0] : undefined;

    GetSettlementBeneficiariesDetail({
      branchId: record.branchId,
      pageNumber: params?.beneficiaryPage ? Number(params.beneficiaryPage) - 1 : 0,
      pageSize: params?.beneficiaryPageSize ? Number(params.beneficiaryPageSize) : 8,
      samimService: record?.samimService?.name,
      toDate: getToDate(date),
      sortBy: sorting?.sortBy ?? "createdDate",
      sortDirection: sorting?.sortOrder?.toUpperCase() ?? "DESC",
    })
      .unwrap()
      .then((res) => setDataSource(res));
  }, [
    record?.branchId,
    record?.samimService?.name,
    date,
    params?.beneficiaryPage,
    params?.beneficiaryPageSize,
    params?.sortings,
  ]);

  //* ================================ Util Functions ================================

  const openDrawer = (uuid: string) => {
    openDocumentDrawer?.(uuid);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader title="مشاهده جزئیات" closeDrawerHandler={onClose} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          xs={12}
          label="سرویس"
          value={
            serviceOptions.find((item) => item.value === record?.samimService?.name)
              ?.title ?? "-"
          }
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          xs={12}
          label="کسب و کار"
          value={record?.businessName}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          xs={12}
          label="ذینفع"
          value={record?.branchName}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          xs={12}
          label="تعداد اسناد"
          value={record?.documentCount.toString()}
        />
      </Row>
      <Row gutter={[16, 16]}>
        <Col xl={12} lg={12}>
          <CustomCard>
            <p>مجموع مطالبات ذینفع (بدهکاری)</p>
            <h3 className="mt-2! font-bold!">
              {dataPlaceHolder({
                data: record?.debitAmount,
                isPrice: true,
                isRial: true,
                currency: { isAvailable: true, type: "تومان" },
              })}
            </h3>
          </CustomCard>
        </Col>
        <Col xl={12} lg={12}>
          <CustomCard>
            <p>مجموع تعهدات ذینفع (بستانکاری)</p>
            <h3 className="mt-2! font-bold!">
              {dataPlaceHolder({
                data: record?.creditAmount,
                isPrice: true,
                isRial: true,
                currency: { isAvailable: true, type: "تومان" },
              })}
            </h3>
          </CustomCard>
        </Col>
        <Col xl={24} lg={24}>
          <CustomCard>
            <p>مجموع قابل پرداخت</p>
            <h3 className="mt-2! font-bold!">
              {dataPlaceHolder({
                data: record?.payableAmount,
                isPrice: true,
                isRial: true,
                currency: { isAvailable: true, type: "تومان" },
              })}
            </h3>
          </CustomCard>
        </Col>
      </Row>
      <CustomTable<getSettlementBeneficiariesDetailContent>
        className="mt-4"
        dataSource={dataSource?.content}
        columns={AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContentTableModel(
          openDrawer
        )}
        rowKey="uuid"
        loading={getSettlementBeneficiariesDetailLoading}
        draggableColumns
        draggableId={
          ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_PAYABLE_SELECT_BENEFICIARY_DRAWER
        }
        pagination={manualPaginationConfig({
          total: dataSource?.totalElements,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...params,
              beneficiaryPage: page?.toString(),
              beneficiaryPageSize: pageSize?.toString(),
            });
          },
          pageNumber: params?.beneficiaryPage ? Number(params?.beneficiaryPage) : 1,
          defaultPageSize: params?.beneficiaryPageSize
            ? Number(params?.beneficiaryPageSize)
            : 8,
        })}
      />
    </div>
  );
};
export default AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent;
