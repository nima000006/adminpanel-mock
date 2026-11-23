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
  useLazyGetMyBranchAccountingDetailSystemDocQuery,
  useLazyGeyMyBranchAccountingSettlementDetailTotalAmountQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import InfoBoxGroup from "@pages/Finance/Accountants/_shared/InfoBoxGroup/InfoBoxGroup";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";
import MyBranchTurnOverSystemDocumentsDrawerContent from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverSystemDocuments/helper/drawer/MyBranchTurnOverSystemDocumentsDrawerContent/MyBranchTurnOverSystemDocumentsDrawerContent";

import {
  GetMyBranchAccountingDetailSystemDocContent,
  GetMyBranchAccountingDetailSystemDocResponse,
} from "./@types/@getMyBranchAccountingDetailSystemDoc";
import { GeyMyBranchAccountingSettlementDetailTotalAmountResponse } from "../../@types/@geyMyBranchAccountingSettlementDetailTotalAmount";
import BranchSystemDocumentsTableModel from "./helper/model/BranchSystemDocumentsTableModel";
import "./_myBranchTurnOverSystemDocuments.scss";

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

const MyBranchTurnOverSystemDocuments = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [systemDocData, setSystemDocData] =
    useState<GetMyBranchAccountingDetailSystemDocResponse>();
  const [amountTotalData, setAmountTotalData] =
    useState<GeyMyBranchAccountingSettlementDetailTotalAmountResponse>();
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getMyBranchSystemDoc, { isFetching: getMyBranchSystemDocLoading }] =
    useLazyGetMyBranchAccountingDetailSystemDocQuery();

  const [getMySettlementAmountTotal, { isFetching: getMySettlementAmountTotalLoading }] =
    useLazyGeyMyBranchAccountingSettlementDetailTotalAmountQuery();

  //? ================================  Effects  ================================
  useEffect(() => {
    getMyBranchSystemDoc({
      params: {
        pageSize: url?.page ? +url?.page - 1 : 0,
        pageNumber: url?.pageSize ? +url?.pageSize : 8,
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
  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };

  const viewInfoHandler = (record: GetMyBranchAccountingDetailSystemDocContent) => {
    setSearchParams({ id: record?.id.toString() });
    setIsDrawerOpen(true);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyBranchTurnOverSystemDocumentsDrawerContent
              closeDrawerHandler={closeDrawerHandler}
            />
          }
        />
      )}
      <div className="financial-my-branch-turn-over-system-document-container">
        <Div loading={getMySettlementAmountTotalLoading}>
          <InfoBoxGroup
            items={[
              {
                title: "تعداد اسناد پیوست",
                value: amountTotalData?.total ?? 0,
                icon: <PiFilesFill />,
                colorClass: "blue",
              },
              {
                title: "مجموع مبالغ اسناد پیوست",
                value: `${dataPlaceHolder({
                  data: amountTotalData?.amount.toString() ?? 0,
                  isPrice: true,
                })} تومان`,
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
        <CustomTable<GetMyBranchAccountingDetailSystemDocContent>
          className="custom-table"
          loading={getMyBranchSystemDocLoading}
          dataSource={systemDocData?.content}
          columns={BranchSystemDocumentsTableModel({
            viewInfoHandler: viewInfoHandler,
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
          rowKey="id"
        />
      </div>
    </>
  );
};
export default MyBranchTurnOverSystemDocuments;
