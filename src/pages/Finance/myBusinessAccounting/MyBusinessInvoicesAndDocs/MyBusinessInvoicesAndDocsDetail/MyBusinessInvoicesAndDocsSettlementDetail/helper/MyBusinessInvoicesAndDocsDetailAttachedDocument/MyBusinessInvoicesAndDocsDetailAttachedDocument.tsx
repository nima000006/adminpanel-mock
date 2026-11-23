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
  useLazyGetMyBusinessAccountingDetailSystemDocQuery,
  useLazyGeyMyBusinessAccountingSettlementDetailTotalAmountQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import InfoBoxGroup from "@pages/Finance/Accountants/_shared/InfoBoxGroup/InfoBoxGroup";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";
import { GeyMyBusinessAccountingSettlementDetailTotalAmountResponse } from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/@types/@geyMyBusinessAccountingSettlementDetailTotalAmount";
import {
  GetMyBusinessAccountingDetailSystemDocContent,
  GetMyBusinessAccountingDetailSystemDocResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/helper/MyBusinessTurnOverSystemDocuments/@types/@getMyBusinessAccountingDetailSystemDoc";

import MyBusinessInvoicesAndDocsDetailAttachedDrawerContent from "./helper/components/MyBusinessInvoicesAndDocsDetailAttachedDrawerContent/MyBusinessInvoicesAndDocsDetailAttachedDrawerContent";
import MyBusinessInvoicesAndDocsDetailAttachedDocumentTableModel from "./helper/models/MyBusinessInvoicesAndDocsDetailAttachedDocumentTableModel/MyBusinessInvoicesAndDocsDetailAttachedDocumentTableModel";

import "./_myBusinessInvoicesAndDocsDetailAttachedDocument.scss";

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
const MyBusinessInvoicesAndDocsDetailAttachedDocument = () => {
  const [openDrawerDetails, setOpenDrawerDetails] = useState({
    isOpen: false,
    id: -1,
  });
  const [systemDocData, setSystemDocData] =
    useState<GetMyBusinessAccountingDetailSystemDocResponse>();
  const [amountTotalData, setAmountTotalData] =
    useState<GeyMyBusinessAccountingSettlementDetailTotalAmountResponse>();
  const { params: url, setSearchParams } = useQueryParams();
  //? ================================  Api Calls ================================
  const [getMyBusinessSystemDoc, { isFetching: getMyBusinessSystemDocLoading }] =
    useLazyGetMyBusinessAccountingDetailSystemDocQuery();

  const [getMySettlementAmountTotal, { isFetching: getMySettlementAmountTotalLoading }] =
    useLazyGeyMyBusinessAccountingSettlementDetailTotalAmountQuery();
  //? ================================  Effects  ================================
  useEffect(() => {
    getMyBusinessSystemDoc({
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      },
      settlementId: url?.uuid,
    })
      .unwrap()
      .then((res) => {
        setSystemDocData(res);
      });
  }, [url?.page, url?.pageSize]);

  useEffect(() => {
    getMySettlementAmountTotal({
      params: {
        documentType: documentTypeConfig.credit,
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
    setOpenDrawerDetails({ isOpen: false, id: -1 });
    const { id, ...restParams } = url || {};
    setSearchParams(restParams);
  };
  const openDetailDrawerHandler = (id: number) => {
    setOpenDrawerDetails({ isOpen: true, id });
    setSearchParams({ ...url, id: id?.toString() });
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
            <MyBusinessInvoicesAndDocsDetailAttachedDrawerContent
              closeDrawerHandler={closeDetailDrawerHandler}
            />
          }
        />
      ) : null}
      <div className="my-business-invoices-docs-attached-detail-container">
        <Div loading={getMySettlementAmountTotalLoading}>
          <InfoBoxGroup
            items={[
              {
                title: "تعداد کل اسناد",
                value: amountTotalData?.total ?? 0,
                icon: <PiFilesFill />,
                colorClass: "blue",
              },

              {
                title: "مجموع مبالغ اسناد انتخابی",
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
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />
        <CustomTable<GetMyBusinessAccountingDetailSystemDocContent>
          className="my-business-invoices-docs-attached-detail-table-container"
          loading={getMyBusinessSystemDocLoading}
          dataSource={systemDocData?.content}
          rowKey="id"
          columns={MyBusinessInvoicesAndDocsDetailAttachedDocumentTableModel({
            openDetailDrawerHandler,
          })}
          pagination={manualPaginationConfig({
            total: systemDocData?.totalElements ?? 0,
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
          {...TABLE_PROPS(systemDocData?.totalElements ?? 0)}
        />
      </div>
    </>
  );
};
export default MyBusinessInvoicesAndDocsDetailAttachedDocument;
