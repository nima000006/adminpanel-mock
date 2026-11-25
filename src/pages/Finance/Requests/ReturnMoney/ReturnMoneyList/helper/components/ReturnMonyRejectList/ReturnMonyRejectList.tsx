import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetRefundRequestListAndAdvanceFilterQuery } from "@infra/states/redux/Apis/finance/requestsApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { REQUEST_DEMAND_IDS } from "@pages/Finance/Requests/_shared/utils";

import ReturnMoneyRejectListTableModel from "./helper/ReturnMoneyRejectListTableModel/ReturnMoneyRejectListTableModel";
import {
  RefundRequestListAndAdvanceFilterContent,
  RefundRequestListAndAdvanceFilterRequest,
  RefundRequestListAndAdvanceFilterResponse,
} from "../../../@types/@returnMoneyList";
import { advanceFilterItems } from "../../utils/returnMoneyListUtils";
import useFinanceReturnMoneyAdvanceFilter from "../ReturnMonyPendingList/helper/model/AdvanceFilter/AdvanceFilter";

const TABLE_DEPENDENCIES = ["username"];
const ReturnMonyRejectList = () => {
  const [dataSource, setDataSource] =
    useState<RefundRequestListAndAdvanceFilterResponse>();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm();

  const { filterItemsList, advanceFilterGetInitialDataHandler } =
    useFinanceReturnMoneyAdvanceFilter();

  //? ================================  Api Calls ================================
  const [
    getRefundList,
    { data: getRefundListData, isFetching: isGetRefundListDataLoading },
  ] = useLazyGetRefundRequestListAndAdvanceFilterQuery();

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
      status: REQUEST_DEMAND_IDS.rejected,
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
  // ADVANCE MODAL HANDLER
  const openAdvanceFilter = () => {
    setIsAdvanceModalOpen(true);
  };
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
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
      <div className="finance-return-money-pending-list-container">
        <CustomDivider text="لیست درخواست‌های عودت وجه" />
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton onClick={openAdvanceFilter} icon={<AiOutlineFilter />}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          }
        />
        <CustomTable<RefundRequestListAndAdvanceFilterContent>
          dataSource={getRefundListData?.content}
          columns={ReturnMoneyRejectListTableModel()}
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
          {...TABLE_PROPS(getRefundListData?.content?.length ?? 0)}
          rowKey="id"
        />
      </div>
    </>
  );
};
export default ReturnMonyRejectList;
