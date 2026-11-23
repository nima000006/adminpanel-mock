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

import UsersRequestsListAllTableModel from "./helper/models/UsersRequestsListAllTableModel";
import {
  DormUsersListRequestsType,
  GetDormUsersRequestsListResponse,
} from "../../../@types/@usersRequestsList";
import { miladiDateRange } from "../../utils/miladiDateRange";
import { UseRequestsAllAdvanceFilterFormType } from "./helper/modals/AdvanceFilter/@types/@useRequestsAllAdvanceFilter";
import useRequestsAllAdvanceFilter from "./helper/modals/AdvanceFilter/RequestsAllAdvanceFilter";

const FILTER_DEPENDENCIES = [
  "allRequestTypeId",
  "allGenderId",
  "allUserGroupId",
  "allSchedulingId",
  "allProvinceId",
  "allCityId",
  "allUniId",
  "allReservationTypeId",
  "allWaitingTimeId",
  "allDormitoryId",
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

const UsersRequestsListAll = () => {
  const [dataSource, setDataSource] = useState<DormUsersListRequestsType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseRequestsAllAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useRequestsAllAdvanceFilter(form);

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
    url?.allPage,
    url?.allPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getUsersRequestsListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.allWaitingTimeId);

    const params = {
      AssociationCategoryRequestType_id_IN: url?.allRequestTypeId,
      AssociationCustomer_AssociationCustomerUser_genderId_IN: url?.allGenderId,
      AssociationCustomer_userGroupID_IN: url?.allUserGroupId,
      AssociationCategoryDeliverPlan_schedulingId_IN: url?.allSchedulingId,
      AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN:
        url?.allProvinceId,
      AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN: url?.allCityId,
      AssociationCategoryDeliverPlan_branchId_IN: url?.allUniId,
      AssociationCategoryDeliverPlan_reservationTypeId_IN: url?.allReservationTypeId,
      AssociationCategoryDeliverPlan_dormitoryId_IN: url?.allDormitoryId,
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
      firstResult: url?.allPage ? Number((+url.allPage - 1) * +url.allPageSize) : 0,
      maxResults: url?.allPageSize ? Number(url?.allPageSize) : 8,
      requestTypeId: url?.allRequestTypeId,
      genderId: url?.allGenderId,
      userGroupId: url?.allUserGroupId,
      schedulingId: url?.allSchedulingId,
      provinceId: url?.allProvinceId,
      cityId: url?.allCityId,
      branchId: url?.allUniId,
      reservationTypeId: url?.allReservationTypeId,
      dormitoryId: url?.allDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.allWaitingTimeId),
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
      requestTypeId: url?.allRequestTypeId,
      genderId: url?.allGenderId,
      userGroupId: url?.allUserGroupId,
      schedulingId: url?.allSchedulingId,
      provinceId: url?.allProvinceId,
      cityId: url?.allCityId,
      branchId: url?.allUniId,
      reservationTypeId: url?.allReservationTypeId,
      dormitoryId: url?.allDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.allWaitingTimeId),
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
              excelTitle="درخواست‌های کاربران"
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
          columns={UsersRequestsListAllTableModel()}
          pagination={manualPaginationConfig({
            total: requestsListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                allPage: page?.toString(),
                allPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.allPage ? Number(url?.allPage) : 1,
            defaultPageSize: url?.allPageSize ? Number(url?.allPageSize) : 8,
          })}
          loading={isRequestsListLoading || isRequestsListCountLoading}
          key={`table-${url?.allPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="users-requests-all-table-model-container"
        />
      </div>
    </>
  );
};

export default UsersRequestsListAll;
