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

import UsersRequestsListPendingPaymentTableModel from "./helper/Model/UsersRequestsListPendingPaymentTableModel";
import {
  DormUsersListRequestsType,
  GetDormUsersRequestsListResponse,
} from "../../../@types/@usersRequestsList";
import { usersListStatus } from "../../../utils/usersRequestsUtils";
import { miladiDateRange } from "../../utils/miladiDateRange";
import { UseRequestsPendingPaymentAdvanceFilterFormType } from "./helper/modals/advanceFilterModal/requestsPendingPaymentAdvanceFilter/@types/@useRequestsPendingPaymentAdvanceFilter";
import useRequestsPendingPaymentAdvanceFilter from "./helper/modals/advanceFilterModal/requestsPendingPaymentAdvanceFilter/RequestsPendingPaymentAdvanceFilter";

const FILTER_DEPENDENCIES = [
  "pendingPaymentRequestTypeId",
  "pendingPaymentGenderId",
  "pendingPaymentUserGroupId",
  "pendingPaymentSchedulingId",
  "pendingPaymentProvinceId",
  "pendingPaymentCityId",
  "pendingPaymentUniId",
  "pendingPaymentReservationTypeId",
  "pendingPaymentWaitingTimeId",
  "pendingPaymentDormitoryId",
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

const UsersRequestsListPendingPayment = () => {
  const [dataSource, setDataSource] = useState<DormUsersListRequestsType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseRequestsPendingPaymentAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } =
    useRequestsPendingPaymentAdvanceFilter(form);

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
    url?.pendingPaymentPage,
    url?.pendingPaymentPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getUsersRequestsListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.pendingPaymentWaitingTimeId);

    const params = {
      statusId_IN: usersListStatus?.pendingPayment,
      AssociationCategoryRequestType_id_IN: url?.pendingPaymentRequestTypeId,
      AssociationCustomer_AssociationCustomerUser_genderId_IN:
        url?.pendingPaymentGenderId,
      AssociationCustomer_userGroupID_IN: url?.pendingPaymentUserGroupId,
      AssociationCategoryDeliverPlan_schedulingId_IN: url?.pendingPaymentSchedulingId,
      AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN:
        url?.pendingPaymentProvinceId,
      AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN:
        url?.pendingPaymentCityId,
      AssociationCategoryDeliverPlan_branchId_IN: url?.pendingPaymentUniId,
      AssociationCategoryDeliverPlan_reservationTypeId_IN:
        url?.pendingPaymentReservationTypeId,
      AssociationCategoryDeliverPlan_dormitoryId_IN: url?.pendingPaymentDormitoryId,
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
      firstResult: url?.pendingPaymentPage
        ? Number((+url.pendingPaymentPage - 1) * +url.pendingPaymentPageSize)
        : 0,
      maxResults: url?.pendingPaymentPageSize ? Number(url?.pendingPaymentPageSize) : 8,
      statusId: usersListStatus?.pendingPayment,
      requestTypeId: url?.pendingPaymentRequestTypeId,
      genderId: url?.pendingPaymentGenderId,
      userGroupId: url?.pendingPaymentUserGroupId,
      schedulingId: url?.pendingPaymentSchedulingId,
      provinceId: url?.pendingPaymentProvinceId,
      cityId: url?.pendingPaymentCityId,
      branchId: url?.pendingPaymentUniId,
      reservationTypeId: url?.pendingPaymentReservationTypeId,
      dormitoryId: url?.pendingPaymentDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.pendingPaymentWaitingTimeId),
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
      statusId: usersListStatus?.pendingPayment,
      requestTypeId: url?.pendingPaymentRequestTypeId,
      genderId: url?.pendingPaymentGenderId,
      userGroupId: url?.pendingPaymentUserGroupId,
      schedulingId: url?.pendingPaymentSchedulingId,
      provinceId: url?.pendingPaymentProvinceId,
      cityId: url?.pendingPaymentCityId,
      branchId: url?.pendingPaymentUniId,
      reservationTypeId: url?.pendingPaymentReservationTypeId,
      dormitoryId: url?.pendingPaymentDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.pendingPaymentWaitingTimeId),
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
              excelTitle="درخواست‌های در انتظار پرداخت"
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
          columns={UsersRequestsListPendingPaymentTableModel()}
          pagination={manualPaginationConfig({
            total: requestsListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                pendingPaymentPage: page?.toString(),
                pendingPaymentPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.pendingPaymentPage ? Number(url?.pendingPaymentPage) : 1,
            defaultPageSize: url?.pendingPaymentPageSize
              ? Number(url?.pendingPaymentPageSize)
              : 8,
          })}
          loading={isRequestsListLoading || isRequestsListCountLoading}
          key={`table-${url?.pendingPaymentPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="users-requests-pending-payment-table-model-container"
        />
      </div>
    </>
  );
};

export default UsersRequestsListPendingPayment;
