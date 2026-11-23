import { useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { PiMagnifyingGlass } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  HabitantsEvacuationDrawerDataTypes,
  HabitantsEvacuationListData,
} from "../../../@types/@evacuationType";
import EvacuationTabTableModel from "../../models/EvacuationTabTableModel/EvacuationTabTableModel";
import { SettlementsTabProps } from "../SettlementsTab/@types/@settlementsTab";
import HabitantsDebtorsDrawerContent from "./helper/drawer/HabitantsDebtorsDrawerContent/HabitantsDebtorsDrawerContent";

const DebtorsTab = ({
  dataSource,
  ListLoading,
  CountLoading,
  habitantsListCount,
  selectedRowKeys,
  onSelectedRowKeysChange,
  url,
  setSearchParams,
  tabType,
  setRefreshList,
}: SettlementsTabProps) => {
  const [creditorsDrawerData, setCreditorsDrawerData] =
    useState<HabitantsEvacuationDrawerDataTypes>({
      isOpen: false,
      data: null,
    });

  //* ================================ Util Functions ================================

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  // open drawer
  const evacuationDrawerHandler = (value: HabitantsEvacuationListData) => {
    setCreditorsDrawerData({ isOpen: true, data: value });
  };

  // close drawer
  const closeDebtorsDrawerHandler = () => {
    setCreditorsDrawerData({ isOpen: false, data: null });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {creditorsDrawerData?.isOpen && (
        <CustomDrawer
          onClose={closeDebtorsDrawerHandler}
          open={creditorsDrawerData?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <HabitantsDebtorsDrawerContent
              closeDrawerHandler={closeDebtorsDrawerHandler}
              data={creditorsDrawerData?.data}
              setRefreshList={setRefreshList}
            />
          }
        />
      )}

      <div>
        <CustomDivider text={"لیست ساکنین بدهکار"} />

        <ToolBox
          rightSide={
            <>
              <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
                فیلتر پیشرفته
              </CustomButton>
              <CustomInput
                suffix={<PiMagnifyingGlass />}
                placeholder="جستجو بر اساس کد ملی / اتباع"
                hasVerticalLabel={false}
                type="search"
              />
            </>
          }
          leftSide={
            <CustomButton type="primary" ghost disabled>
              خروجی اکسل
            </CustomButton>
          }
        />

        <CustomTable
          className="flex flex-col gap-6"
          dataSource={dataSource}
          columns={EvacuationTabTableModel({
            evacuationDrawerHandler: evacuationDrawerHandler,
            tabType: tabType,
          })}
          loading={ListLoading || CountLoading}
          pagination={manualPaginationConfig({
            total: habitantsListCount?.data,
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
          {...TABLE_PROPS(dataSource.length || 0)}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          rowKey="id"
        />
      </div>
    </>
  );
};
export default DebtorsTab;
