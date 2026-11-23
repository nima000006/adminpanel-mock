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
  useLazyGetMyBusinessAccountingDetailDebitQuery,
  useLazyGeyMyBusinessAccountingSettlementDetailTotalAmountQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import InfoBoxGroup from "@pages/Finance/Accountants/_shared/InfoBoxGroup/InfoBoxGroup";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";

import {
  BusinessAccountingDetailDebit,
  GetMyBusinessAccountingDetailDebitResponse,
} from "./@types/@getMyBusinessAccountingDetailDebit";
import { GeyMyBusinessAccountingSettlementDetailTotalAmountResponse } from "../../@types/@geyMyBusinessAccountingSettlementDetailTotalAmount";
import BusinessCreditDocumentOnAccountDrawerContent from "./helper/drawer/BusinessCreditDocumentOnAccountDrawerContent/BusinessCreditDocumentOnAccountDrawerContent";
import BusinessCreditDocumentRefundDrawerContent from "./helper/drawer/BusinessCreditDocumentRefundDrawerContent/BusinessCreditDocumentRefundDrawerContent";
import MyBusinessTurnOverCreditDocumentTableModel from "./helper/model/MyBusinessTurnOverCreditDocumentTableModel";
import "./_myBusinessTurnOverCreditDocument.scss";

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

const MyBusinessTurnOverCreditDocument = () => {
  const [isOpenRefundDrawer, setIsOpenRefundDrawer] = useState(false);
  const [isOpenOnAccountDrawer, setIsOpenOnAccountDrawer] = useState(false);
  const [debitData, setDebitData] =
    useState<GetMyBusinessAccountingDetailDebitResponse>();
  const [amountTotalData, setAmountTotalData] =
    useState<GeyMyBusinessAccountingSettlementDetailTotalAmountResponse>();
  const { params: url, setSearchParams } = useQueryParams();
  //? ================================  Api ================================
  const [triggerGetDebitData, { isLoading: isTriggerGetDebitDataLoading }] =
    useLazyGetMyBusinessAccountingDetailDebitQuery();

  const [getMySettlementAmountTotal, { isFetching: getMySettlementAmountTotalLoading }] =
    useLazyGeyMyBusinessAccountingSettlementDetailTotalAmountQuery();
  //? ================================  Api ================================
  useEffect(() => {
    triggerGetDebitData({
      params: {
        pageNumber: url?.page ? +url.page - 1 : 0,
        pageSize: url?.pageSize ? +url.pageSize : 8,
      },
      settlementId: url.uuid,
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
  const onDetailClickHandler = (record: BusinessAccountingDetailDebit) => {
    if (record?.documentType === documentTypeConfig.debit) {
      setIsOpenRefundDrawer(true);
    } else if (record?.documentType === documentTypeConfig.credit) {
      setIsOpenOnAccountDrawer(true);
    }
  };
  const closeRefundDrawerHandler = () => {
    setIsOpenRefundDrawer(false);
  };
  const closeOnAccountDrawerHandler = () => {
    setIsOpenOnAccountDrawer(false);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {/* دراور عودت وجه */}
      {isOpenRefundDrawer && (
        <CustomDrawer
          onClose={closeRefundDrawerHandler}
          open={isOpenRefundDrawer}
          closeIcon={<AiOutlineClose />}
          content={
            <BusinessCreditDocumentRefundDrawerContent
              closeDrawerHandler={closeRefundDrawerHandler}
            />
          }
        />
      )}

      {/* پرداخت علی الحساب */}
      {isOpenOnAccountDrawer && (
        <CustomDrawer
          onClose={closeOnAccountDrawerHandler}
          open={isOpenOnAccountDrawer}
          closeIcon={<AiOutlineClose />}
          content={
            <BusinessCreditDocumentOnAccountDrawerContent
              closeDrawerHandler={closeOnAccountDrawerHandler}
            />
          }
        />
      )}
      <div className="financial-my-business-turn-over-credit-document-container">
        <Div loading={getMySettlementAmountTotalLoading}>
          <InfoBoxGroup
            items={[
              {
                title: "تعداد اسناد پیوست",
                value: amountTotalData?.total,
                icon: <PiFilesFill />,
                colorClass: "blue",
              },
              {
                title: "مجموع مبالغ اسناد پیوست",
                value: `${dataPlaceHolder({
                  data: amountTotalData?.amount.toString(),
                  isPrice: true,
                })} تومان`,
                icon: <PiCalculatorFill />,
                colorClass: "blue",
              },
            ]}
          />
        </Div>
        <div>
          <CustomDivider text="لیست اسناد پرداخت پیوست" />
          <ToolBox
            leftSide={
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </Dropdown>
            }
          />
          <CustomTable<BusinessAccountingDetailDebit>
            dataSource={debitData?.content ?? []}
            rowKey="id"
            loading={isTriggerGetDebitDataLoading}
            columns={MyBusinessTurnOverCreditDocumentTableModel({
              onDetailClickHandler: onDetailClickHandler,
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
            className="mt-5!"
          />
        </div>
      </div>
    </>
  );
};
export default MyBusinessTurnOverCreditDocument;
