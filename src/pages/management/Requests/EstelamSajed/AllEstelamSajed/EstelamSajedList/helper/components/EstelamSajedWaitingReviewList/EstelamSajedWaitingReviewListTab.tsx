import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useEstelamSajedListAdvanceFilterMutation,
  useLazyGetAllEstelamSajedListQuery,
} from "@infra/states/redux/Apis/management/requests/requestApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { ESTELAM_SAJED_WAITING_REVIEW } from "@pages/management/Requests/EstelamSajed/_shared/utils/estelamSajedUtils";
import {
  EstelamSajedAdvanceFilterRequest,
  EstelamSajedListItemType,
  EstelamSajedListResponse,
  UseEstelamSajedAdvanceFilterFormType,
} from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/@types/@estelamSajedListTypes";
import useEstelamSajedListAdvanceFilter from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/helper/models/advanceFilterModals/useEstelamSajedListAdvanceFilter";

import ManagementEstelamSajedTableModel from "../../models/ManagementEstelamSajed/ManagementEstelamSajedTableModel";

import "./_estelamSajedWaitingReviewListTab.scss";

const advanceFilterItems = [
  "branchId",
  "dateDateStart",
  "dateDateEnd",
  //search
  "mobileNumber",
  "firstName",
  "lastName",
  "username",
  "employeeCode",
];

const EstelamSajedWaitingReviewListTab = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [totalPages, setTotalPages] = useState(0);
  const [dataSource, setDataSource] = useState<EstelamSajedListItemType[] | []>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseEstelamSajedAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useEstelamSajedListAdvanceFilter();

  //? ================================  Api Calls ================================
  // list
  const [getList, { isFetching: isGetListLoading }] =
    useLazyGetAllEstelamSajedListQuery();

  // advance search
  const [getListByAdvanceFilter, { isLoading: isAdvanceFilterListLoading }] =
    useEstelamSajedListAdvanceFilterMutation();
  //? ================================ Effects ================================
  useEffect(() => {
    // advance filter

    if (hasActiveKey(url, advanceFilterItems)) {
      const filters: EstelamSajedAdvanceFilterRequest = {
        ...(url?.branchId && {
          branchIds: url?.branchId?.split(",")?.map((item) => Number(item)),
        }),
        ...(url?.dateDateStart && { requestDateFrom: url?.dateDateStart }),
        ...(url?.dateDateEnd && { requestDateTo: url?.dateDateEnd }),
        // column search
        ...(url?.firstName && { firstName: url?.firstName?.trim() }),
        ...(url?.lastName && { lastName: url?.lastName?.trim() }),
        ...(url?.username && { username: url?.username?.trim() }),
        ...(url?.mobileNumber && { mobileNumber: url?.mobileNumber?.trim() }),
        ...(url?.employeeCode && { employeeCode: url?.employeeCode?.trim() }),
      };
      getListByAdvanceFilter({
        statusId: ESTELAM_SAJED_WAITING_REVIEW,
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        ...filters,
      })
        .unwrap()
        .then((value) => {
          setDataSource(value?.content);
          setTotalPages(value?.totalElements);
        });
    } else {
      // list
      const requestParams = {
        pageNo: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      };
      getList({
        params: requestParams,
        statusId: ESTELAM_SAJED_WAITING_REVIEW,
      })
        .unwrap()
        .then(getListSuccess);
    }
  }, [
    url?.page,
    url?.pageSize,
    url?.status,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  useEffect(() => {
    if (advanceModalOpen) {
      fetchInitialData();
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  // success
  const getListSuccess = (res: EstelamSajedListResponse) => {
    setDataSource(res?.content);
    setTotalPages(res?.totalElements);
  };

  // advance filter handler
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}

      <div className="management-requests-estelam-sajed-waiting-review-list-tab">
        <CustomDivider text="لیست درخواست های استعلام ساجد" />
        <div className="table-container">
          <ToolBox
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  type="default"
                  icon={<AiOutlineFilter />}
                  onClick={openAdvanceFilterHandler}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <CustomButton type="primary" ghost disabled>
                خروجی
              </CustomButton>
            }
          />
          <CustomTable<EstelamSajedListItemType>
            dataSource={dataSource}
            rowKey="id"
            loading={isGetListLoading || isAdvanceFilterListLoading}
            columns={ManagementEstelamSajedTableModel({
              type: ESTELAM_SAJED_WAITING_REVIEW,
            })}
            pagination={manualPaginationConfig({
              total: totalPages,
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
            className="waiting-review-list-table-container"
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      </div>
    </>
  );
};

export default EstelamSajedWaitingReviewListTab;
