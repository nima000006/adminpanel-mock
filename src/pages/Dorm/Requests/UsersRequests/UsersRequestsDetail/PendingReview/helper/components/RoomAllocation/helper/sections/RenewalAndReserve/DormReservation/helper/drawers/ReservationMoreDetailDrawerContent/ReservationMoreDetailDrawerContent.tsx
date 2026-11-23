import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetHabitantsRoomCountQuery,
  useLazyGetHabitantsRoomQuery,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import {
  useGetResidenceRoomInfoMutation,
  useLazyGetDormResidenceRoomCapacityQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import {
  dateTimeCombiner,
  dormVisibilityStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";
import {
  GetHabitantsRoomResponse,
  HabitantsRoomData,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/SecondTabRoomInfo/@types/@secondTabRoomInfo";
import UsersRequestsDetailRoomResidentsTableModel from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/models/UsersRequestsDetailRoomResidentsTableModel/UsersRequestsDetailRoomResidentsTableModel";
import {
  DormResidenceRoomCapacity,
  GetDormResidenceRoomCapacityResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormRoomSingleCard/helper/drawers/RoomDetail/@types/@roomDetailDrawerContent";
import StatisticCard from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/StatisticCard/StatisticCard";

import { ReservationMoreDetailDrawerContentProps } from "./@types/@reservationMoreDetailDrawerContent";
import "./_reservationMoreDetailDrawerContent.scss";

const TABLE_DEPENDENCIES = ["name", "lastName", "studentNumber", "nationalNumber"];
const ReservationMoreDetailDrawerContent = ({
  closeDrawerHandler,
  id,
}: ReservationMoreDetailDrawerContentProps) => {
  const [roomCapacity, setRoomCapacity] = useState<DormResidenceRoomCapacity | null>(
    null
  );

  const [dataSource, setDataSource] = useState<HabitantsRoomData[]>([]);

  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getRoomInfo, { data: roomData, isLoading: isRoomDataLoading }] =
    useGetResidenceRoomInfoMutation();

  const [getRoomCapacity, { isFetching: isRoomCapacityDataLoading }] =
    useLazyGetDormResidenceRoomCapacityQuery();

  const [getHabitantRoom, { isFetching: isHabitantRoomLoading }] =
    useLazyGetHabitantsRoomQuery();

  const [
    getHabitantRoomCount,
    { data: habitantsListCount, isFetching: isHabitantRoomCountLoading },
  ] = useLazyGetHabitantsRoomCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getRoomInfo({
        body: {
          _data_: {
            id: id?.toString(),
          },
        },
        params: {
          relation: "e137dbff61d049dea81ef1bc30047c1b", // we should set this to get data
        },
      });
      getRoomCapacity({ id_EQ: id, firstResult: 0, maxResults: 2000 }) // we should set 0 and 2000 to get data
        .unwrap()
        .then(getRoomCapacitySuccess);
    }
  }, [id]);

  useEffect(() => {
    getHabitantRoomList();
  }, [
    params?.page,
    params?.pageSize,
    ...TABLE_DEPENDENCIES.map((item) => params?.[item]),
  ]);

  //* ================================ Util Functions ================================
  const getRoomCapacitySuccess = async (value: GetDormResidenceRoomCapacityResponse) => {
    if (value?.status === 200) {
      setRoomCapacity(value?.data?.[0]);
    }
  };

  const getHabitantRoomListIsSuccess = (value: GetHabitantsRoomResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  const getHabitantRoomList = () => {
    getHabitantRoom({
      firstResult: params?.page ? Number((+params.page - 1) * +params.pageSize) : 0,
      maxResults: params?.pageSize ? Number(params?.pageSize) : 8,
      AssociationBed_roomId_EQ: id,
      AssociationCustomer_AssociationCustomerUser_firstName_LIKE: params?.name,
      AssociationCustomer_AssociationCustomerUser_lastName_LIKE: params?.lastName,
      AssociationCustomer_AssociationStudent_studentNumber_LIKE: params?.studentNumber,
      AssociationCustomer_AssociationCustomerUser_nationalCode_LIKE: params?.nationalCode,
    })
      .unwrap()
      .then(getHabitantRoomListIsSuccess);
    getHabitantRoomCount({
      AssociationBed_roomId_EQ: id?.toString(),
      AssociationCustomer_AssociationCustomerUser_firstName_IN: params?.name,
      AssociationCustomer_AssociationCustomerUser_lastName_IN: params?.lastName,
      AssociationCustomer_AssociationStudent_studentNumber_IN: params?.studentNumber,
      AssociationCustomer_AssociationCustomerUser_nationalCode_IN: params?.nationalCode,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isRoomDataLoading}>
      <CustomDrawerHeader
        title="جزئیات اتاق"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag
            color={
              dormVisibilityStatusColor[roomData?.data?.AssociationRecordStatus?.id || 0]
            }
          >
            {roomData?.data?.AssociationRecordStatus?.title}
          </CustomTag>
        }
      />
      <div className="reservation-more-detail-drawer-content-container">
        <div>
          <CustomDivider text="ساکنین اتاق" />
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
        </div>
        <Div loading={isRoomCapacityDataLoading}>
          <CustomDivider text="آمار" />
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <StatisticCard title="کل تخت‌ها" count={roomCapacity?.bedCountInRoom} />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <StatisticCard
                title="تخت‌های فعال"
                count={roomCapacity?.ActiveBedsInRoom}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <StatisticCard
                title="ظرفیت رزرو شده"
                count={roomCapacity?.fullBedsInRoom}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <StatisticCard
                title="ظرفیت قابل رزرو"
                count={roomCapacity?.OpenBedsInRoom}
              />
            </Col>
          </Row>
        </Div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomDivider text="اتاق" />
          </Col>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نام اقامتگاه"
            value={
              roomData?.data?.AssociationFloor?.AssociationBuilding
                ?.AssociationCategoryDormitory?.title
            }
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نام ساختمان"
            value={roomData?.data?.AssociationFloor?.AssociationBuilding?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نام طبقه"
            value={roomData?.data?.AssociationFloor?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نام اتاق"
            value={roomData?.data?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="درجه کیفی"
            value={roomData?.data?.AssociationQuality?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="جنسیت"
            value={
              roomData?.data?.AssociationFloor?.AssociationBuilding?.AssociationGender
                ?.title
            }
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="مساحت (متر مربع)"
            value={roomData?.data?.area?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="تعداد استاندارد تخت در اتاق"
            value={roomData?.data?.numberStandardBedInRoom?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شناسه اتاق"
            value={roomData?.data?.id?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نوع اتاق"
            value={roomData?.data?.AssociationRoomType?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="اتاق والد"
            value={roomData?.data?.AssociationRoom?.title}
          />
          <SingleVerticalWithCol
            span={24}
            label="توضیحات اتاق"
            value={roomData?.data?.description}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان ثبت"
            value={dateTimeCombiner(
              roomData?.data?.createDate,
              roomData?.data?.createTime
            )}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان آخرین ویرایش"
            value={dateTimeCombiner(
              roomData?.data?.updateDate,
              roomData?.data?.updateTime
            )}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="آخرین ویرایش‌کننده"
            value={`${roomData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.firstName ?? "-"} ${roomData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.lastName ?? ""}`}
          />
        </Row>
      </div>
    </Div>
  );
};

export default ReservationMoreDetailDrawerContent;
