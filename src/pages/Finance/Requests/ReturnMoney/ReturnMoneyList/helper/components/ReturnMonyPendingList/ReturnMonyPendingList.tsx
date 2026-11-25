import { useEffect, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetRefundRequestListAndAdvanceFilterQuery } from "@infra/states/redux/Apis/finance/requestsApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { REQUEST_DEMAND_IDS } from "@pages/Finance/Requests/_shared/utils";

import { advanceFilterItems } from "../../utils/returnMoneyListUtils";
import ReturnMoneyConfirmAllRequestDrawer from "./helper/drawer/ReturnMoneyConfirmAllRequestDrawer/ReturnMoneyConfirmAllRequestDrawer";
import ReturnMoneyRejectAllRequestDrawer from "./helper/drawer/ReturnMoneyRejectAllRequestDrawer/ReturnMoneyRejectAllRequestDrawer";
import useFinanceReturnMoneyAdvanceFilter from "./helper/model/AdvanceFilter/AdvanceFilter";
import ReturnMoneyPendingListTableModel from "./helper/model/ReturnMoneyPendingListTableModel/ReturnMoneyPendingListTableModel";
import {
  RefundRequestListAndAdvanceFilterContent,
  RefundRequestListAndAdvanceFilterRequest,
  RefundRequestListAndAdvanceFilterResponse,
} from "../../../@types/@returnMoneyList";
import "./_returnMonyPendingList.scss";

const TABLE_DEPENDENCIES = ["username"];
const ReturnMonyPendingList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [confirmAllRequestDrawer, setConfirmAllRequestDrawer] = useState(false);
  const [rejectAllRequestDrawer, setRejectAllRequestDrawer] = useState(false);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [dataSource, setDataSource] =
    useState<RefundRequestListAndAdvanceFilterResponse>();
  const [badgeCount, setBadgeCount] = useState(0);

  const { params: url, setSearchParams } = useQueryParams();
  const [form] = Form.useForm();

  const { filterItemsList, advanceFilterGetInitialDataHandler } =
    useFinanceReturnMoneyAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getRefundList, { isFetching: isGetRefundListDataLoading }] =
    useLazyGetRefundRequestListAndAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const offsetMinutes = dayjs().utcOffset();
    const filters: RefundRequestListAndAdvanceFilterRequest = {
      ...(url?.dateDateStart && {
        from: jalaliToGregorianWithoutZ(
          dayjs(url.dateDateStart).startOf("day").add(offsetMinutes, "minute")
        ),
      }),

      ...(url?.dateDateEnd && {
        to: (() => {
          const toDate = dayjs(url.dateDateEnd);
          const now = dayjs();
          const isToday = toDate.isSame(now, "day");

          const value = isToday
            ? now.add(offsetMinutes, "minute")
            : toDate.endOf("day").add(offsetMinutes, "minute");

          return jalaliToGregorianWithoutZ(value);
        })(),
      }),

      ...(url?.nationalId && { username: url.nationalId }),
      ...(url?.branchId && { branchId: +url.branchId }),
      ...(url?.serviceNameId && {
        samimService: serviceOptions.find((item) => item.id === +url.serviceNameId)
          ?.value,
      }),
    };

    getRefundList({
      pageNumber: url?.pageNo ? +url?.pageNo : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,
      status: REQUEST_DEMAND_IDS.pending,
      username: url?.username,
      ...filters,
    })
      .unwrap()
      .then((res) => setDataSource(res));
  }, [
    ...advanceFilterItems.map((item) => url?.[item]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
    url.pageNo,
    url.pageSize,
  ]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
      advanceFilterGetInitialDataHandler();
    }
  }, [isAdvanceModalOpen]);

  //* ================================ Util Functions ================================
  const onSelectedRowKeysChange = (newSelectedKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onSelectedRowKeysChange(dataSource?.content.map((item: any) => item.id) || []);
    } else {
      onSelectedRowKeysChange([]);
    }
  };

  // CHECK ALL
  const hasData = !!dataSource?.content?.length;

  const allSelected = hasData && selectedRowKeys.length === dataSource.content.length;

  const isIndeterminate =
    hasData &&
    selectedRowKeys.length > 0 &&
    selectedRowKeys.length < dataSource.content.length;

  // DRAWER HANDLER
  const closeConfirmAllRequestDrawerHandler = () => {
    setConfirmAllRequestDrawer(false);
    setSelectedRowKeys([]);
  };
  const closeRejectAllRequestDrawerHandler = () => {
    setRejectAllRequestDrawer(false);
    setSelectedRowKeys([]);
  };

  // BTN HANDLER
  const confirmAllHandler = () => {
    setConfirmAllRequestDrawer(true);
  };
  const rejectAllHandler = () => {
    setRejectAllRequestDrawer(true);
  };

  // ADVANCE MODAL HANDLER
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };
  const openAdvanceFilter = () => {
    setIsAdvanceModalOpen(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADVANCE FILTER */}
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={{ ...url }}
          form={form}
        />
      )}
      {/* CONFIRM ALL REQUEST */}
      {confirmAllRequestDrawer && (
        <CustomDrawer
          onClose={closeConfirmAllRequestDrawerHandler}
          open={confirmAllRequestDrawer}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ReturnMoneyConfirmAllRequestDrawer
              closeDrawerHandler={closeConfirmAllRequestDrawerHandler}
              data={dataSource?.content}
              rowSelection={rowSelection.selectedRowKeys}
              setRowSelection={setSelectedRowKeys}
            />
          }
        />
      )}

      {/* REJECT ALL REQUEST */}
      {rejectAllRequestDrawer && (
        <CustomDrawer
          onClose={closeRejectAllRequestDrawerHandler}
          open={rejectAllRequestDrawer}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ReturnMoneyRejectAllRequestDrawer
              closeDrawerHandler={closeRejectAllRequestDrawerHandler}
              data={dataSource?.content}
              rowSelection={rowSelection.selectedRowKeys}
              setRowSelection={setSelectedRowKeys}
            />
          }
        />
      )}

      <div className="finance-return-money-pending-list-container">
        <CustomDivider
          text="لیست درخواست‌های عودت وجه"
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
            <CustomBadge count={badgeCount}>
              <CustomButton onClick={openAdvanceFilter} icon={<AiOutlineFilter />}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2 max-[580px]:flex-col">
              <CustomButton
                type="primary"
                danger
                disabled={selectedRowKeys.length < 1}
                onClick={rejectAllHandler}
              >
                رد گروهی
              </CustomButton>
              <CustomButton
                disabled={selectedRowKeys.length < 1}
                onClick={confirmAllHandler}
              >
                تایید گروهی
              </CustomButton>
              <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
                خروجی
              </CustomButton>
            </div>
          }
        />
        <CustomTable<RefundRequestListAndAdvanceFilterContent>
          dataSource={dataSource?.content || []}
          columns={ReturnMoneyPendingListTableModel()}
          loading={isGetRefundListDataLoading}
          pagination={manualPaginationConfig({
            total: dataSource?.totalElements,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                pageNo: (page - 1)?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.pageNo ? Number(url?.pageNo) + 1 : 1,
            defaultPageSize: url?.pageSize ? +url?.pageSize : 8,
          })}
          {...TABLE_PROPS(dataSource?.content?.length ?? 0)}
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />
      </div>
    </>
  );
};
export default ReturnMonyPendingList;
