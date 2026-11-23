import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetHabitantsRoomCountQuery,
  useLazyGetHabitantsRoomQuery,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import {
  GetHabitantsRoomResponse,
  HabitantsRoomData,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SecondTabRoomInfo/@types/@secondTabRoomInfo";

import UsersRequestsDetailRoomResidentsTableModel from "../../../../_shared/models/UsersRequestsDetailRoomResidentsTableModel/UsersRequestsDetailRoomResidentsTableModel";

const TABLE_DEPENDENCIES = ["name", "lastName", "studentNumber", "nationalNumber"];
const UsersRequestsDetailDeliveredRoomResidents = () => {
  const [dataSource, setDataSource] = useState<HabitantsRoomData[]>([]);
  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getHabitantRoom, { isFetching: isHabitantRoomLoading }] =
    useLazyGetHabitantsRoomQuery();

  const [
    getHabitantRoomCount,
    { data: habitantsListCount, isFetching: isHabitantRoomCountLoading },
  ] = useLazyGetHabitantsRoomCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getHabitantRoomList();
  }, [
    params?.page,
    params?.pageSize,
    ...TABLE_DEPENDENCIES.map((item) => params?.[item]),
  ]);

  //* ================================ Util Functions ================================
  const getHabitantRoomListIsSuccess = (value: GetHabitantsRoomResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  const getHabitantRoomList = () => {
    getHabitantRoom({
      firstResult: params?.page ? Number((+params.page - 1) * +params.pageSize) : 0,
      maxResults: params?.pageSize ? Number(params?.pageSize) : 8,
      AssociationBed_roomId_EQ: +params?.roomId,
      AssociationCustomer_AssociationCustomerUser_firstName_LIKE: params?.name,
      AssociationCustomer_AssociationCustomerUser_lastName_LIKE: params?.lastName,
      AssociationCustomer_AssociationStudent_studentNumber_LIKE: params?.studentNumber,
      AssociationCustomer_AssociationCustomerUser_nationalCode_LIKE: params?.nationalCode,
    })
      .unwrap()
      .then(getHabitantRoomListIsSuccess);
    getHabitantRoomCount({
      AssociationBed_roomId_EQ: params?.roomId,
      AssociationCustomer_AssociationCustomerUser_firstName_IN: params?.name,
      AssociationCustomer_AssociationCustomerUser_lastName_IN: params?.lastName,
      AssociationCustomer_AssociationStudent_studentNumber_IN: params?.studentNumber,
      AssociationCustomer_AssociationCustomerUser_nationalCode_IN: params?.nationalCode,
    });
  };

  return (
    <CustomTable
      dataSource={dataSource}
      columns={UsersRequestsDetailRoomResidentsTableModel()}
      loading={isHabitantRoomLoading || isHabitantRoomCountLoading}
      pagination={manualPaginationConfig({
        total: habitantsListCount?.data,
        onChange: (page, pageSize) => {
          setSearchParams({
            ...params,
            page: page?.toString(),
            pageSize: pageSize?.toString(),
          });
        },
        pageNumber: params?.page ? Number(params?.page) : 1,
        defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
      })}
      rowKey="id"
      className="users-requests-detail-room-residents-table-model-container"
      key={`table-${params?.pageSize || "8"}`}
      {...TABLE_PROPS(dataSource?.length)}
    />
  );
};

export default UsersRequestsDetailDeliveredRoomResidents;
