import { useEffect, useState } from "react";

import { Dropdown, MenuProps } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalculatorFill, PiFilesFill } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetMyBranchAccountingDetailDebitQuery,
  useLazyGeyMyBranchAccountingSettlementDetailTotalAmountQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import InfoBoxGroup from "@pages/Finance/Accountants/_shared/InfoBoxGroup/InfoBoxGroup";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";
import MyBranchInvoicesAndDocsDetailDebtDocumentDrawerContent from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsSettlementDetail/helper/MyBranchInvoicesAndDocsDetailDebtDocument/helper/components/MyBranchInvoicesAndDocsDetailDebtDocumentDrawerContent/MyBranchInvoicesAndDocsDetailDebtDocumentDrawerContent";
import MyBranchInvoicesAndDocsDetailRefundDebtDocumentDrawerContent from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsSettlementDetail/helper/MyBranchInvoicesAndDocsDetailDebtDocument/helper/components/MyBranchInvoicesAndDocsDetailRefundDebtDocumentDrawerContent/MyBranchInvoicesAndDocsDetailRefundDebtDocumentDrawerContent";
import MyBranchInvoicesAndDocsDetailDebtDocumentTableModel from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsSettlementDetail/helper/MyBranchInvoicesAndDocsDetailDebtDocument/helper/models/MyBranchInvoicesAndDocsDetailDebtDocumentTableModel/MyBranchInvoicesAndDocsDetailDebtDocumentTableModel";
import { GeyMyBranchAccountingSettlementDetailTotalAmountResponse } from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/@types/@geyMyBranchAccountingSettlementDetailTotalAmount";

import "./_myBranchInvoicesAndDocsDetailDebtDocument.scss";
import {
  AccountingDetailDebit,
  GetMyBranchAccountingDetailDebitResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverDebitDocument/@types/@getMyBranchAccountingDetailDebit";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};
const MyBranchInvoicesAndDocsDetailDebtDocument = () => {
  const [openDrawerDetails, setOpenDrawerDetails] = useState({
    isOpen: false,
    documentType: "",
  });
  const [openDrawerDetailsRefund, setOpenDrawerDetailsRefund] = useState({
    isOpen: false,
    debtUuid: "",
  });
  const [debitData, setDebitData] = useState<GetMyBranchAccountingDetailDebitResponse>();
  const [amountTotalData, setAmountTotalData] =
    useState<GeyMyBranchAccountingSettlementDetailTotalAmountResponse>();
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api ================================
  const [triggerGetDebitData, { isLoading: isTriggerGetDebitDataLoading }] =
    useLazyGetMyBranchAccountingDetailDebitQuery();
  const [getMySettlementAmountTotal, { isFetching: getMySettlementAmountTotalLoading }] =
    useLazyGeyMyBranchAccountingSettlementDetailTotalAmountQuery();
  //? ================================  Effects ================================
  useEffect(() => {
    triggerGetDebitData({
      params: {
        pageNumber: url?.page ? +url.page - 1 : 0,
        pageSize: url?.pageSize ? +url.pageSize : 8,
      },
      settlementId: url?.uuid,
    })
      .unwrap()
      .then((res) => setDebitData(res));
  }, [url?.page, url?.pageSize]);

  useEffect(() => {
    getMySettlementAmountTotal({
      params: {
        documentType: documentTypeConfig.debit,
      },
      settlementId: +url?.uuid,
    })
      .unwrap()
      .then((res) => {
        setAmountTotalData(res);
      });
  }, []);
  //* ================================ Util Functions ================================
  const closeDetailDrawerHandler = () => {
    setOpenDrawerDetails({ isOpen: false, documentType: "" });
    const { id, documentType, ...restParams } = url || {};
    setSearchParams(restParams);
  };

  const closeDetailRefundDrawerHandler = () => {
    setOpenDrawerDetailsRefund({ isOpen: false, debtUuid: "" });
    const { id, debtUuid, ...restParams } = url || {};
    setSearchParams(restParams);
  };
  const openDetailDrawerHandler = (record: AccountingDetailDebit) => {
    if (record?.documentType === documentTypeConfig.credit) {
      setOpenDrawerDetails({ isOpen: true, documentType: record?.documentType });
      setSearchParams({
        ...url,
        documentType: record?.documentType,
        id: record?.accountingInvoiceId?.toString(),
      });
    } else {
      setOpenDrawerDetailsRefund({
        isOpen: true,
        debtUuid: record.uuid,
      });
      setSearchParams({
        ...url,
        id: record?.accountingInvoiceId?.toString(),
        debtUuid: record.uuid,
      });
    }
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {openDrawerDetails?.isOpen ? (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={openDrawerDetails?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyBranchInvoicesAndDocsDetailDebtDocumentDrawerContent
              closeDrawerHandler={closeDetailDrawerHandler}
            />
          }
        />
      ) : null}
      {openDrawerDetailsRefund?.isOpen ? (
        <CustomDrawer
          onClose={closeDetailRefundDrawerHandler}
          open={openDrawerDetailsRefund?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyBranchInvoicesAndDocsDetailRefundDebtDocumentDrawerContent
              closeDrawerHandler={closeDetailRefundDrawerHandler}
            />
          }
        />
      ) : null}
      <div className="my-branch-invoices-docs-debt-detail-container">
        <Div loading={getMySettlementAmountTotalLoading}>
          <InfoBoxGroup
            items={[
              {
                title: "لیست اسناد پیوست",
                value: amountTotalData?.total ?? 0,
                icon: <PiFilesFill />,
                colorClass: "blue",
              },

              {
                title: "مجموع بدهکاری",
                value: (
                  <>
                    {dataPlaceHolder({
                      data: amountTotalData?.amount?.toString() ?? 0,
                      isPrice: true,
                      isRial: true,
                    })}{" "}
                    تومان
                  </>
                ),
                icon: <PiCalculatorFill />,
                colorClass: "blue",
              },
            ]}
          />
        </Div>
        <CustomDivider text="لیست  پیوست" />
        <ToolBox
          leftSide={
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />
        <CustomTable<AccountingDetailDebit>
          className="my-branch-invoices-docs-debt-detail-table-container"
          loading={isTriggerGetDebitDataLoading}
          dataSource={debitData?.content ?? []}
          rowKey="accountingInvoiceId"
          columns={MyBranchInvoicesAndDocsDetailDebtDocumentTableModel({
            openDetailDrawerHandler,
          })}
          pagination={manualPaginationConfig({
            total: debitData?.totalElements ?? 0,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
          })}
          {...TABLE_PROPS(debitData?.totalElements || 0)}
        />
      </div>
    </>
  );
};
export default MyBranchInvoicesAndDocsDetailDebtDocument;
