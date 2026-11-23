import { useEffect, useRef, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeQueryParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetRequestsListCountQuery,
  useLazyGetRequestsListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";
import { dormWaitingTimeQueryCreator } from "@pages/Dorm/_shared/utils/DormUtils";

import UsersRequestsListPendingReviewTableModel from "./helper/Model/UsersRequestsListPendingReviewTableModel";
import {
  DormUsersListRequestsType,
  GetDormUsersRequestsListResponse,
} from "../../../@types/@usersRequestsList";
import { usersListStatus } from "../../../utils/usersRequestsUtils";
import { miladiDateRange } from "../../utils/miladiDateRange";
import { UseRequestsPendingReviewAdvanceFilterFormType } from "./helper/modals/advanceFilterModal/requestsPendingReviewAdvanceFilter/@types/@useRequestsPendingReviewAdvanceFilter";
import useRequestsPendingReviewAdvanceFilter from "./helper/modals/advanceFilterModal/requestsPendingReviewAdvanceFilter/RequestsPendingReviewAdvanceFilter";

const FILTER_DEPENDENCIES = [
  "pendingReviewRequestTypeId",
  "pendingReviewGenderId",
  "pendingReviewUserGroupId",
  "pendingReviewSchedulingId",
  "pendingReviewProvinceId",
  "pendingReviewCityId",
  "pendingReviewUniId",
  "pendingReviewReservationTypeId",
  "pendingReviewWaitingTimeId",
  "pendingReviewDormitoryId",
];

const TABLE_DEPENDENCIES = [
  "name",
  "sortings",
  "lastName",
  "studentNumber",
  "deliverPlanTitle",
  "dormitory",
  "nationalCode",
];
const UsersRequestsListPendingReview = () => {
  const [dataSource, setDataSource] = useState<DormUsersListRequestsType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseRequestsPendingReviewAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } =
    useRequestsPendingReviewAdvanceFilter(form);

  const excelFilesQueryRef = useRef("");

  //? ================================  Api Calls ================================
  const [getRequestsList, { isFetching: isRequestsListLoading }] =
    useLazyGetRequestsListQuery();

  const [
    getRequestsListCount,
    { data: requestsListCountData, isFetching: isRequestsListCountLoading },
  ] = useLazyGetRequestsListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getUsersRequestsList();
  }, [
    url?.pendingReviewPage,
    url?.pendingReviewPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getUsersRequestsListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.pendingReviewWaitingTimeId);

    const params = {
      statusId_IN: usersListStatus?.pendingReview,
      AssociationCategoryRequestType_id_IN: url?.pendingReviewRequestTypeId,
      AssociationCustomer_AssociationCustomerUser_genderId_IN: url?.pendingReviewGenderId,
      AssociationCustomer_userGroupID_IN: url?.pendingReviewUserGroupId,
      AssociationCategoryDeliverPlan_schedulingId_IN: url?.pendingReviewSchedulingId,
      AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN:
        url?.pendingReviewProvinceId,
      AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN:
        url?.pendingReviewCityId,
      AssociationCategoryDeliverPlan_branchId_IN: url?.pendingReviewUniId,
      AssociationCategoryDeliverPlan_reservationTypeId_IN:
        url?.pendingReviewReservationTypeId,
      AssociationCategoryDeliverPlan_dormitoryId_IN: url?.pendingReviewDormitoryId,
      ...(waitingTime ? { [waitingTime.queryParam]: waitingTime?.value } : {}),
      createDate_BTW: miladiDateRange(url?.createDate_BTW),
      name: url?.name,
      sortings: url?.sortings,
      lastName: url?.lastName,
      deliverPlanTitle: url?.deliverPlanTitle,
      studentNumber: url?.studentNumber,
      dormitory: url?.dormitory,
      nationalCode: url?.nationalCode,
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (advanceModalOpen) {
      fetchInitialData();
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  const getUsersRequestsList = () => {
    getRequestsList({
      firstResult: url?.pendingReviewPage
        ? Number((+url.pendingReviewPage - 1) * +url.pendingReviewPageSize)
        : 0,
      maxResults: url?.pendingReviewPageSize ? Number(url?.pendingReviewPageSize) : 8,
      statusId: usersListStatus?.pendingReview,
      requestTypeId: url?.pendingReviewRequestTypeId,
      genderId: url?.pendingReviewGenderId,
      userGroupId: url?.pendingReviewUserGroupId,
      schedulingId: url?.pendingReviewSchedulingId,
      provinceId: url?.pendingReviewProvinceId,
      cityId: url?.pendingReviewCityId,
      branchId: url?.pendingReviewUniId,
      reservationTypeId: url?.pendingReviewReservationTypeId,
      dormitoryId: url?.pendingReviewDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.pendingReviewWaitingTimeId),
      createDate_BTW: miladiDateRange(url?.createDate_BTW),
      name: url?.name,
      sortings: url?.sortings,
      lastName: url?.lastName,
      deliverPlanTitle: url?.deliverPlanTitle,
      studentNumber: url?.studentNumber,
      dormitory: url?.dormitory,
      nationalCode: url?.nationalCode,
    })
      .unwrap()
      .then(getRequestsListSuccess);
  };
  const getRequestsListSuccess = async (values: GetDormUsersRequestsListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getUsersRequestsListCount = () => {
    getRequestsListCount({
      statusId: usersListStatus?.pendingReview,
      requestTypeId: url?.pendingReviewRequestTypeId,
      genderId: url?.pendingReviewGenderId,
      userGroupId: url?.pendingReviewUserGroupId,
      schedulingId: url?.pendingReviewSchedulingId,
      provinceId: url?.pendingReviewProvinceId,
      cityId: url?.pendingReviewCityId,
      branchId: url?.pendingReviewUniId,
      reservationTypeId: url?.pendingReviewReservationTypeId,
      dormitoryId: url?.pendingReviewDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.pendingReviewWaitingTimeId),
      createDate_BTW: miladiDateRange(url?.createDate_BTW),
      name: url?.name,
      sortings: url?.sortings,
      lastName: url?.lastName,
      deliverPlanTitle: url?.deliverPlanTitle,
      studentNumber: url?.studentNumber,
      dormitory: url?.dormitory,
      nationalCode: url?.nationalCode,
    });
  };

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
      <div className="user-requests-tab-container">
        <ToolBox
          leftSide={
            <CustomExcelDownloadButton
              excelTitle="درخواست‌های در انتظار بررسی"
              restOfUrl={excelFilesQueryRef.current}
              formId="UserRequestList"
              type="primary"
              ghost
              className="btn-text"
            />
          }
          rightSide={
            <>
              <CustomRangePicker
                name="dateRang"
                onChange={(dates) => {
                  if (dates?.[0] && dates?.[1]) {
                    const start = dates[0].format("YYYY-MM-DD");
                    const end = dates[1].format("YYYY-MM-DD");
                    setSearchParams({
                      ...url,
                      createDate_BTW: `${start} , ${end}`,
                    });
                  } else {
                    const { createDate_BTW, ...rest } = url;
                    setSearchParams(rest);
                  }
                }}
              />
              <CustomBadge count={badgeCount}>
                <CustomButton
                  type="primary"
                  icon={<AiOutlineFilter />}
                  onClick={openAdvanceFilterHandler}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            </>
          }
        />

        <CustomTable
          dataSource={dataSource}
          columns={UsersRequestsListPendingReviewTableModel()}
          pagination={manualPaginationConfig({
            total: requestsListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                pendingReviewPage: page?.toString(),
                pendingReviewPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.pendingReviewPage ? Number(url?.pendingReviewPage) : 1,
            defaultPageSize: url?.pendingReviewPageSize
              ? Number(url?.pendingReviewPageSize)
              : 8,
          })}
          loading={isRequestsListLoading || isRequestsListCountLoading}
          key={`table-${url?.pendingReviewPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="users-requests-pending_review-table-model-container"
        />
      </div>
    </>
  );
};

export default UsersRequestsListPendingReview;
