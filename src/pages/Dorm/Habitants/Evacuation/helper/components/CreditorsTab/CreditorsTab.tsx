import { useState } from "react";

import { Checkbox, CheckboxChangeEvent } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { PiMagnifyingGlass } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import HabitantsCreditorsDrawerContent from "./helper/drawer/HabitantsCreditorsDrawerContent/HabitantsCreditorsDrawerContent";
import {
  HabitantsEvacuationDrawerDataTypes,
  HabitantsEvacuationListData,
} from "../../../@types/@evacuationType";
import EvacuationTabTableModel from "../../models/EvacuationTabTableModel/EvacuationTabTableModel";
import { SettlementsTabProps } from "../SettlementsTab/@types/@settlementsTab";

const CreditorsTab = ({
  dataSource,
  ListLoading,
  CountLoading,
  habitantsListCount,
  isAllEvacuationLoading,
  allEvacuationHandler,
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

  const allSelected = dataSource && selectedRowKeys.length === dataSource.length;

  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < (dataSource?.length || 0);

  //* ================================ Util Functions ================================

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onSelectedRowKeysChange(dataSource?.map((item) => item.id) || []);
    } else {
      onSelectedRowKeysChange([]);
    }
  };

  // open drawer
  const evacuationDrawerHandler = (value: HabitantsEvacuationListData) => {
    setCreditorsDrawerData({ isOpen: true, data: value });
  };

  // close drawer
  const closeCreditorsDrawerHandler = () => {
    setCreditorsDrawerData({ isOpen: false, data: null });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {creditorsDrawerData?.isOpen && (
        <CustomDrawer
          onClose={closeCreditorsDrawerHandler}
          open={creditorsDrawerData?.isOpen}
          className="dorm-habitants-creditors-drawer-container"
          closeIcon={<AiOutlineClose />}
          content={
            <HabitantsCreditorsDrawerContent
              closeDrawerHandler={closeCreditorsDrawerHandler}
              data={creditorsDrawerData?.data}
              setRefreshList={setRefreshList}
            />
          }
        />
      )}

      <div>
        <CustomDivider
          text={"لیست ساکنین بستانکار"}
          extraContent={
            <Checkbox
              indeterminate={isIndeterminate}
              onChange={onCheckAllChange}
              checked={allSelected}
            >
              انتخاب همه
            </Checkbox>
          }
        />

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
            <>
              <CustomButton
                type="primary"
                disabled={selectedRowKeys.length === 0}
                onClick={allEvacuationHandler}
                loading={isAllEvacuationLoading}
              >
                تخلیه گروهی
              </CustomButton>
              <CustomButton type="primary" ghost disabled>
                خروجی اکسل
              </CustomButton>
            </>
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
export default CreditorsTab;
