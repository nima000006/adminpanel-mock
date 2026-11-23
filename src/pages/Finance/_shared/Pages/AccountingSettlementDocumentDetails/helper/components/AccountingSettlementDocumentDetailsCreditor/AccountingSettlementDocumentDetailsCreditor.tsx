import { useEffect, useState } from "react";

import { Dropdown } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalculatorFill, PiFilesFill } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDocumentSettlementCountQuery,
  useLazyGetDocumentCreditSettlementQuery,
} from "@infra/states/redux/Apis/finance/financeApi";
import {
  useLazyGetBranchDocumentCreditSettlementQuery,
  useLazyGetBranchDocumentSettlementCountQuery,
  useLazyGetBusinessDocumentCreditSettlementQuery,
  useLazyGetBusinessDocumentSettlementCountQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import AccountingCreditorDrawerContent from "@pages/Finance/_shared/helper/drawers/AccountingCreditorDrawerContent/AccountingCreditorDrawerContent";
import AccountingSettlementDocumentDetailsCreditorTableModel from "@pages/Finance/_shared/Pages/AccountingSettlementDocumentDetails/helper/components/AccountingSettlementDocumentDetailsCreditor/helper/models/AccountingSettlementDocumentDetailsCreditorTableModel/AccountingSettlementDocumentDetailsCreditorTableModel";
import InfoBoxGroup from "@pages/Finance/Accountants/_shared/InfoBoxGroup/InfoBoxGroup";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";
import {
  DocumentCreditSettlementRecordType,
  GetDocumentCreditSettlementRequest,
  GetDocumentCreditSettlementResponse,
  GetDocumentSettlementCountResponse,
} from "@pages/Finance/Accountants/TurnOver/@type/@turnOver";
import {
  DocumentBranchCreditSettlementRecordType,
  GetBranchDocumentSettlementCountResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsSettlementDocuments/helper/@types/@getMyBranchAccountingSettlementListTypes";
import {
  DocumentBusinessCreditSettlementRecordType,
  GetBusinessDocumentSettlementCountResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsSettlementDocuments/@types/@myBusinessInvoicesAndDocsSettlementDocuments";

const AccountingSettlementDocumentDetailsCreditor = () => {
  const [amountTotalData, setAmountTotalData] = useState<
    | GetDocumentSettlementCountResponse
    | GetBranchDocumentSettlementCountResponse
    | GetBusinessDocumentSettlementCountResponse
  >();

  const { params: url, setSearchParams } = useQueryParams();

  const [data, setData] = useState<GetDocumentCreditSettlementResponse>();

  const [drawerState, setDrawerState] = useState<{
    open: boolean;
    uuid: string;
  }>({
    open: false,
    uuid: "-1",
  });
  //? ================================  Api Calls ================================
  const [getMySettlementAmountTotal, { isFetching: getMySettlementAmountTotalLoading }] =
    useLazyGetDocumentSettlementCountQuery();

  const [
    getMyBranchSettlementAmountTotal,
    { isFetching: getMyBranchSettlementAmountTotalLoading },
  ] = useLazyGetBranchDocumentSettlementCountQuery();

  const [
    getMyBusinessSettlementAmountTotal,
    { isFetching: getMyBusinessSettlementAmountTotalLoading },
  ] = useLazyGetBusinessDocumentSettlementCountQuery();

  const [getData, { isFetching: getDataLoading }] =
    useLazyGetDocumentCreditSettlementQuery();

  const [getBranchData, { isFetching: getBranchDataLoading }] =
    useLazyGetBranchDocumentCreditSettlementQuery();

  const [getBusinessData, { isFetching: getBusinessDataLoading }] =
    useLazyGetBusinessDocumentCreditSettlementQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.uuid) return;
    switch (url?.from) {
      case "myFactors":
        getMyBranchSettlementAmountTotal({
          params: { documentType: documentTypeConfig.credit },
          settlementId: url?.uuid,
        })
          .unwrap()
          .then((res) => setAmountTotalData(res));
        break;

      case "myFactorsBusiness":
        getMyBusinessSettlementAmountTotal({
          params: { documentType: documentTypeConfig.credit },
          settlementId: url?.uuid,
        })
          .unwrap()
          .then((res) => setAmountTotalData(res));
        break;

      default:
        getMySettlementAmountTotal({
          params: { documentType: documentTypeConfig.credit },
          settlementId: url?.uuid,
        })
          .unwrap()
          .then((res) => setAmountTotalData(res));
        break;
    }
  }, [url?.uuid, url?.from]);

  useEffect(() => {
    if (!url?.uuid) return;

    const requestParams: GetDocumentCreditSettlementRequest["params"] = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        requestParams.sortBy = sorting.sortBy;
      } else {
        delete requestParams.sortBy;
      }

      if (sorting?.sortOrder) {
        requestParams.direction = sorting.sortOrder.toUpperCase();
      } else {
        delete requestParams.direction;
      }
    }

    switch (url?.from) {
      case "myFactors":
        getBranchData({
          params: requestParams,
          settlementId: url.uuid,
        })
          .unwrap()
          .then((res) => {
            setData(res);
          });
        break;

      case "myFactorsBusiness":
        getBusinessData({
          params: requestParams,
          settlementId: url.uuid,
        })
          .unwrap()
          .then((res) => {
            setData(res);
          });
        break;

      default:
        getData({
          params: requestParams,
          settlementId: url.uuid,
        })
          .unwrap()
          .then((res) => {
            setData(res);
          });
        break;
    }
  }, [url?.page, url?.pageSize, url?.uuid, url?.sortings, url?.from]);

  //* ================================ Util Functions ================================

  const openDrawerHandler = (documentUuid: string) => {
    setDrawerState({
      open: true,
      uuid: documentUuid,
    });
  };

  const closeShowDrawerHandler = () => {
    setDrawerState({
      open: false,
      uuid: "-1",
    });
  };
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {drawerState.open && (
        <CustomDrawer
          size="large"
          onClose={closeShowDrawerHandler}
          open={drawerState.open}
          content={
            <AccountingCreditorDrawerContent
              uuid={drawerState.uuid}
              onClose={closeShowDrawerHandler}
            />
          }
        />
      )}
      <Div
        loading={
          getMySettlementAmountTotalLoading ||
          getMyBusinessSettlementAmountTotalLoading ||
          getMyBranchSettlementAmountTotalLoading
        }
      >
        <InfoBoxGroup
          items={[
            {
              title: "تعداد اسناد پیوست",
              value: amountTotalData?.total ?? 0,
              icon: <PiFilesFill />,
              colorClass: "blue",
            },
            {
              title:
                url?.from === "myFactors" || url?.from === "myFactorsBusiness"
                  ? "مطالبات (بستانکاری)"
                  : "مجموع مطالبات ذینفع (بستانکاری)",
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
      <CustomDivider text="لیست اسناد پیوست" />
      <ToolBox
        leftSide={
          <Dropdown>
            <CustomButton disabled>
              خروجی <IoIosArrowDown />
            </CustomButton>
          </Dropdown>
        }
      />
      <CustomTable<
        | DocumentCreditSettlementRecordType
        | DocumentBranchCreditSettlementRecordType
        | DocumentBusinessCreditSettlementRecordType
      >
        loading={getDataLoading || getBranchDataLoading || getBusinessDataLoading}
        dataSource={data?.content}
        className="mt-5"
        rowKey="uuid"
        draggableColumns
        draggableId={ExcelCodes.FINANCE_SETTLEMENT_DETAIL_CREDITOR}
        columns={AccountingSettlementDocumentDetailsCreditorTableModel(openDrawerHandler)}
        pagination={manualPaginationConfig({
          total: data?.totalElements ?? 0,
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
      />
    </>
  );
};
export default AccountingSettlementDocumentDetailsCreditor;
