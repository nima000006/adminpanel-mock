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

import {
  DormUsersListRequestsType,
  GetDormUsersRequestsListResponse,
} from "../../../@types/@usersRequestsList";
import { usersListStatus } from "../../../utils/usersRequestsUtils";
import { miladiDateRange } from "../../utils/miladiDateRange";
import { UseRequestsDeliveredAdvanceFilterFormType } from "./helper/modals/advanceFilterModal/requestsDeliveredAdvanceFilter/@types/@useRequestsDeliveredAdvanceFilter";
import useRequestsDeliveredAdvanceFilter from "./helper/modals/advanceFilterModal/requestsDeliveredAdvanceFilter/RequestsDeliveredAdvanceFilter";
import UsersRequestsListDeliveredTableModel from "./helper/Model/UsersRequestsListDeliveredTableModel";

const FILTER_DEPENDENCIES = [
  "deliveredRequestTypeId",
  "deliveredGenderId",
  "deliveredUserGroupId",
  "deliveredSchedulingId",
  "deliveredProvinceId",
  "deliveredCityId",
  "deliveredUniId",
  "deliveredReservationTypeId",
  "deliveredDormitoryId",
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

const UsersRequestsListDelivered = () => {
  const [dataSource, setDataSource] = useState<DormUsersListRequestsType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseRequestsDeliveredAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useRequestsDeliveredAdvanceFilter(form);

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
    url?.deliveredPage,
    url?.deliveredPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getUsersRequestsListCount();

    // for excel file
    const params = {
      statusId_IN: usersListStatus?.delivered,
      AssociationCategoryRequestType_id_IN: url?.deliveredRequestTypeId,
      AssociationCustomer_AssociationCustomerUser_genderId_IN: url?.deliveredGenderId,
      AssociationCustomer_userGroupID_IN: url?.deliveredUserGroupId,
      AssociationCategoryDeliverPlan_schedulingId_IN: url?.deliveredSchedulingId,
      AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN:
        url?.deliveredProvinceId,
      AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN:
        url?.deliveredCityId,
      AssociationCategoryDeliverPlan_branchId_IN: url?.deliveredUniId,
      AssociationCategoryDeliverPlan_reservationTypeId_IN:
        url?.deliveredReservationTypeId,
      AssociationCategoryDeliverPlan_dormitoryId_IN: url?.deliveredDormitoryId,
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
      firstResult: url?.deliveredPage
        ? Number((+url.deliveredPage - 1) * +url.deliveredPageSize)
        : 0,
      maxResults: url?.deliveredPageSize ? Number(url?.deliveredPageSize) : 8,
      statusId: usersListStatus?.delivered,
      requestTypeId: url?.deliveredRequestTypeId,
      genderId: url?.deliveredGenderId,
      userGroupId: url?.deliveredUserGroupId,
      schedulingId: url?.deliveredSchedulingId,
      provinceId: url?.deliveredProvinceId,
      cityId: url?.deliveredCityId,
      branchId: url?.deliveredUniId,
      reservationTypeId: url?.deliveredReservationTypeId,
      dormitoryId: url?.deliveredDormitoryId,
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
      statusId: usersListStatus?.delivered,
      requestTypeId: url?.deliveredRequestTypeId,
      genderId: url?.deliveredGenderId,
      userGroupId: url?.deliveredUserGroupId,
      schedulingId: url?.deliveredSchedulingId,
      provinceId: url?.deliveredProvinceId,
      cityId: url?.deliveredCityId,
      branchId: url?.deliveredUniId,
      reservationTypeId: url?.deliveredReservationTypeId,
      dormitoryId: url?.deliveredDormitoryId,
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
              excelTitle="درخواست‌های تحویل داده شده"
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
          columns={UsersRequestsListDeliveredTableModel()}
          pagination={manualPaginationConfig({
            total: requestsListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                deliveredPage: page?.toString(),
                deliveredPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.deliveredPage ? Number(url?.deliveredPage) : 1,
            defaultPageSize: url?.deliveredPageSize ? Number(url?.deliveredPageSize) : 8,
          })}
          loading={isRequestsListLoading || isRequestsListCountLoading}
          key={`table-${url?.deliveredPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="users-requests-delivered-table-model-container"
        />
      </div>
    </>
  );
};

export default UsersRequestsListDelivered;
