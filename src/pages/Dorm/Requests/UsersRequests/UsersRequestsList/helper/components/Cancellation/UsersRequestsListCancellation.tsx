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

import {
  DormUsersListRequestsType,
  GetDormUsersRequestsListResponse,
} from "../../../@types/@usersRequestsList";
import { usersListStatus } from "../../../utils/usersRequestsUtils";
import { miladiDateRange } from "../../utils/miladiDateRange";
import { UseRequestsCancellationAdvanceFilterFormType } from "./helper/modals/advanceFilterModal/requestsCancellationAdvanceFilter/@types/@useRequestsCancellationAdvanceFilter";
import useRequestsCancellationAdvanceFilter from "./helper/modals/advanceFilterModal/requestsCancellationAdvanceFilter/RequestsCancellationAdvanceFilter";
import UsersRequestsListCancellationTableModel from "./helper/Model/UsersRequestsListCancellationTableModel";

const FILTER_DEPENDENCIES = [
  "cancellationRequestTypeId",
  "cancellationGenderId",
  "cancellationUserGroupId",
  "cancellationSchedulingId",
  "cancellationProvinceId",
  "cancellationCityId",
  "cancellationUniId",
  "cancellationReservationTypeId",
  "cancellationWaitingTimeId",
  "cancellationRequestStatusId",
  "cancellationDormitoryId",
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

const UsersRequestsListCancellation = () => {
  const [dataSource, setDataSource] = useState<DormUsersListRequestsType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseRequestsCancellationAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } =
    useRequestsCancellationAdvanceFilter(form);

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
    url?.cancellationPage,
    url?.cancellationPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getUsersRequestsListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.cancellationWaitingTimeId);

    const params = {
      cancellationRequestStatus_IN: usersListStatus?.cancellation,
      AssociationCategoryRequestType_id_IN: url?.cancellationRequestTypeId,
      AssociationCustomer_AssociationCustomerUser_genderId_IN: url?.cancellationGenderId,
      AssociationCustomer_userGroupID_IN: url?.cancellationUserGroupId,
      AssociationCategoryDeliverPlan_schedulingId_IN: url?.cancellationSchedulingId,
      AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN:
        url?.cancellationProvinceId,
      AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN:
        url?.cancellationCityId,
      AssociationCategoryDeliverPlan_branchId_IN: url?.cancellationUniId,
      AssociationCategoryDeliverPlan_reservationTypeId_IN:
        url?.cancellationReservationTypeId,
      statusId_IN: url?.cancellationRequestStatusId,
      AssociationCategoryDeliverPlan_dormitoryId_IN: url?.cancellationDormitoryId,
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
      firstResult: url?.cancellationPage
        ? Number((+url.cancellationPage - 1) * +url.cancellationPageSize)
        : 0,
      maxResults: url?.cancellationPageSize ? Number(url?.cancellationPageSize) : 8,
      cancellationStatus: usersListStatus?.cancellation,
      requestTypeId: url?.cancellationRequestTypeId,
      genderId: url?.cancellationGenderId,
      userGroupId: url?.cancellationUserGroupId,
      schedulingId: url?.cancellationSchedulingId,
      provinceId: url?.cancellationProvinceId,
      cityId: url?.cancellationCityId,
      branchId: url?.cancellationUniId,
      reservationTypeId: url?.cancellationReservationTypeId,
      statusId: url?.cancellationRequestStatusId,
      dormitoryId: url?.cancellationDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.cancellationWaitingTimeId),
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
      cancellationStatus: usersListStatus?.cancellation,
      requestTypeId: url?.cancellationRequestTypeId,
      genderId: url?.cancellationGenderId,
      userGroupId: url?.cancellationUserGroupId,
      schedulingId: url?.cancellationSchedulingId,
      provinceId: url?.cancellationProvinceId,
      cityId: url?.cancellationCityId,
      branchId: url?.cancellationUniId,
      reservationTypeId: url?.cancellationReservationTypeId,
      statusId: url?.cancellationRequestStatusId,
      dormitoryId: url?.cancellationDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.cancellationWaitingTimeId),
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
              excelTitle="درخواست های کنسلی"
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
          columns={UsersRequestsListCancellationTableModel()}
          pagination={manualPaginationConfig({
            total: requestsListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                cancellationPage: page?.toString(),
                cancellationPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.cancellationPage ? Number(url?.cancellationPage) : 1,
            defaultPageSize: url?.cancellationPageSize
              ? Number(url?.cancellationPageSize)
              : 8,
          })}
          loading={isRequestsListLoading || isRequestsListCountLoading}
          key={`table-${url?.cancellationPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="users-requests-cancellation-table-model-container"
        />
      </div>
    </>
  );
};

export default UsersRequestsListCancellation;
