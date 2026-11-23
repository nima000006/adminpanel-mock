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
import { UseRequestsCancelledAdvanceFilterFormType } from "./helper/modals/advanceFilterModal/requestsCancelledAdvanceFilter/@types/@useRequestsCancelledAdvanceFilter";
import useRequestsCancelledAdvanceFilter from "./helper/modals/advanceFilterModal/requestsCancelledAdvanceFilter/RequestsCancelledAdvanceFilter";
import UsersRequestsListCancelledTableModel from "./helper/Model/UsersRequestsListCancelledTableModel";
import { miladiDateRange } from "../../utils/miladiDateRange";

const FILTER_DEPENDENCIES = [
  "cancelledRequestTypeId",
  "cancelledGenderId",
  "cancelledUserGroupId",
  "cancelledSchedulingId",
  "cancelledProvinceId",
  "cancelledCityId",
  "cancelledUniId",
  "cancelledReservationTypeId",
  "cancelledWaitingTimeId",
  "cancelledDormitoryId",
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
const UsersRequestsListCancelled = () => {
  const [dataSource, setDataSource] = useState<DormUsersListRequestsType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseRequestsCancelledAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useRequestsCancelledAdvanceFilter(form);

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
    url?.cancelledPage,
    url?.cancelledPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getUsersRequestsListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.cancelledWaitingTimeId);

    const params = {
      statusId_IN: usersListStatus?.cancelled,
      AssociationCategoryRequestType_id_IN: url?.cancelledRequestTypeId,
      AssociationCustomer_AssociationCustomerUser_genderId_IN: url?.cancelledGenderId,
      AssociationCustomer_userGroupID_IN: url?.cancelledUserGroupId,
      AssociationCategoryDeliverPlan_schedulingId_IN: url?.cancelledSchedulingId,
      AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN:
        url?.cancelledProvinceId,
      AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN:
        url?.cancelledCityId,
      AssociationCategoryDeliverPlan_branchId_IN: url?.cancelledUniId,
      AssociationCategoryDeliverPlan_reservationTypeId_IN:
        url?.cancelledReservationTypeId,
      AssociationCategoryDeliverPlan_dormitoryId_IN: url?.cancelledDormitoryId,
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
      firstResult: url?.cancelledPage
        ? Number((+url.cancelledPage - 1) * +url.cancelledPageSize)
        : 0,
      maxResults: url?.cancelledPageSize ? Number(url?.cancelledPageSize) : 8,
      statusId: usersListStatus?.cancelled,
      requestTypeId: url?.cancelledRequestTypeId,
      genderId: url?.cancelledGenderId,
      userGroupId: url?.cancelledUserGroupId,
      schedulingId: url?.cancelledSchedulingId,
      provinceId: url?.cancelledProvinceId,
      cityId: url?.cancelledCityId,
      branchId: url?.cancelledUniId,
      reservationTypeId: url?.cancelledReservationTypeId,
      dormitoryId: url?.cancelledDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.cancelledWaitingTimeId),
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
      statusId: usersListStatus?.cancelled,
      requestTypeId: url?.cancelledRequestTypeId,
      genderId: url?.cancelledGenderId,
      userGroupId: url?.cancelledUserGroupId,
      schedulingId: url?.cancelledSchedulingId,
      provinceId: url?.cancelledProvinceId,
      cityId: url?.cancelledCityId,
      branchId: url?.cancelledUniId,
      reservationTypeId: url?.cancelledReservationTypeId,
      dormitoryId: url?.cancelledDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.cancelledWaitingTimeId),
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
              excelTitle="درخواست‌های ابطال شده"
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
          columns={UsersRequestsListCancelledTableModel()}
          pagination={manualPaginationConfig({
            total: requestsListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                cancelledPage: page?.toString(),
                cancelledPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.cancelledPage ? Number(url?.cancelledPage) : 1,
            defaultPageSize: url?.cancelledPageSize ? Number(url?.cancelledPageSize) : 8,
          })}
          loading={isRequestsListLoading || isRequestsListCountLoading}
          key={`table-${url?.cancelledPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="users-requests-cancelled-table-model-container"
        />
      </div>
    </>
  );
};

export default UsersRequestsListCancelled;
