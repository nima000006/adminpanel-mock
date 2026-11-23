import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDormRequestRoomListCountQuery,
  useLazyGetDormRequestRoomListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  useLazyGetDormResidenceBuildingListQuery,
  useLazyGetDormResidenceFloorListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dormVisibilityStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  DormRequestRoomListType,
  GetDormRequestRoomListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import PendingListRoomAllocationBedAllocationDrawerContent from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/PendingList/helper/components/RoomAllocation/helper/drawers/PendingListRoomAllocationBedAllocationDrawerContent/PendingListRoomAllocationBedAllocationDrawerContent";
import {
  GetDormResidenceBuildingListResponse,
  GetDormResidenceBuildingListTypes,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataBuilding/@types/@residenceCardsDataBuilding";
import {
  GetDormResidenceFloorListResponse,
  GetDormResidenceFloorListTypes,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataFloor/@types/@residenceCardsDataFloor";

import ReservationMoreDetailDrawerContent from "./helper/drawers/ReservationMoreDetailDrawerContent/ReservationMoreDetailDrawerContent";
import PendingReviewRenewalAndReserveDormReservationTableModel from "./helper/models/PendingReviewRenewalAndReserveDormReservationTableModel/PendingReviewRenewalAndReserveDormReservationTableModel";

import "./_pendingReviewRenewalAndReserveDormReservation.scss";

const PendingReviewRenewalAndReserveDormReservation = () => {
  const [bedAllocation, setBedAllocation] = useState({
    isOpen: false,
    id: -1,
  });
  const [moreDetailDrawer, setMoreDetailDrawer] = useState({
    isOpen: false,
    id: -1,
  });

  //ساختمان
  const [buildingData, setBuildingData] = useState<GetDormResidenceBuildingListTypes[]>(
    []
  );
  const [selectBuildingData, setSelectBuildingData] = useState({
    title: "",
    genderTitle: "",
    statusTitle: "",
    statusId: -1,
  });

  // طبقه
  const [floorData, setFloorData] = useState<GetDormResidenceFloorListTypes[]>([]);
  const [selectFloorData, setSelectFloorData] = useState({
    title: "",
    genderTitle: "",
    statusTitle: "",
    statusId: -1,
    id: -1,
  });

  // اتاق
  const [roomList, setRoomList] = useState<DormRequestRoomListType[]>([]);

  const { params: url, setSearchParams } = useQueryParams();

  const [residenceForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getBuildingsOfDormitoryList, { isFetching: isGetBuildingsOfDormitoryLoading }] =
    useLazyGetDormResidenceBuildingListQuery();

  const [getFloorsOfBuildingList, { isFetching: isGetFloorsOfBuildingLoading }] =
    useLazyGetDormResidenceFloorListQuery();

  const [getRoomList, { isFetching: isRoomListLoading }] =
    useLazyGetDormRequestRoomListQuery();

  const [getRoomListCount, { data: roomTotalCount, isFetching: isRoomListCountLoading }] =
    useLazyGetDormRequestRoomListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.dormId) {
      getBuildingsOfDormitoryList({
        dormitoryId_IN: +url?.dormId,
        firstResult: 0,
        maxResults: 2000,
      }) // we should set 0 and 2000 to get data
        .unwrap()
        .then(getBuildingsOfDormitoryListSuccess);
    }
  }, [url?.dormId]);

  useEffect(() => {
    getRoomListData();
  }, [url?.page, url?.pageSize, selectFloorData?.id]);

  //* ================================ Util Functions ================================
  const getBuildingsOfDormitoryListSuccess = (
    value: GetDormResidenceBuildingListResponse
  ) => {
    if (value?.status === 200) {
      setBuildingData(value?.data);
    }
  };

  const changeBuildingListHandler = (value: any) => {
    if (value) {
      getFloorsOfBuildingList(value).unwrap().then(getFloorsOfBuildingListSuccess);

      const buildingData = residenceForm?.getFieldsValue()?.building?.item;

      setSelectBuildingData({
        title: buildingData?.title,
        genderTitle: buildingData?.AssociationGender_title,
        statusTitle: buildingData?.AssociationActiveStatus_title,
        statusId: buildingData?.recordStatus,
      });
    }
  };

  const getFloorsOfBuildingListSuccess = (value: GetDormResidenceFloorListResponse) => {
    if (value?.status === 200) {
      setFloorData(value?.data);
    }
  };
  const changeFloorListHandler = () => {
    const floorData = residenceForm?.getFieldsValue()?.floor?.item;

    setSelectFloorData({
      title: floorData?.title,
      genderTitle: floorData?.AssociationGender_title,
      statusTitle: floorData?.AssociationActiveStatus_title,
      statusId: floorData?.recordStatus,
      id: floorData?.id,
    });
  };

  const getRoomListData = () => {
    if (selectFloorData?.id > 0) {
      getRoomList({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        floorId: +selectFloorData?.id,
        tariffId: +url?.tariffId,
      })
        .unwrap()
        .then(getRoomListSuccess);

      getRoomListCount({
        floorId: +selectFloorData?.id,
        tariffId: +url?.tariffId,
      });
    }
  };

  const getRoomListSuccess = (value: GetDormRequestRoomListResponse) => {
    if (value?.status === 200) {
      setRoomList(value?.data);
    }
  };

  const openBedAllocationHandler = (id: number) => {
    setBedAllocation({
      isOpen: true,
      id,
    });
  };
  const closeBedAllocationHandler = () =>
    setBedAllocation({
      isOpen: false,
      id: -1,
    });

  const openMoreDetailDrawerHandler = (id: number) => {
    setMoreDetailDrawer({
      isOpen: true,
      id,
    });
  };

  const closeMoreDetailDrawerHandler = () =>
    setMoreDetailDrawer({
      isOpen: false,
      id: -1,
    });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* BED ALLOCATION DRAWER */}
      {bedAllocation?.isOpen && (
        <CustomDrawer
          onClose={closeBedAllocationHandler}
          open={bedAllocation?.isOpen}
          content={
            <PendingListRoomAllocationBedAllocationDrawerContent
              closeDrawerHandler={closeBedAllocationHandler}
              roomId={bedAllocation?.id}
            />
          }
        />
      )}

      {/* MORE DETAIL DRAWER */}
      {moreDetailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeMoreDetailDrawerHandler}
          open={moreDetailDrawer?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ReservationMoreDetailDrawerContent
              closeDrawerHandler={closeMoreDetailDrawerHandler}
              id={moreDetailDrawer?.id}
            />
          }
        />
      )}

      <div className="pending-review-renewal-and-reserve-dorm-reservation-container">
        <Form form={residenceForm}>
          <CustomDivider text="مشخصات اقامتگاه" />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <SingleVerticalWithCol label="نام اقامتگاه" value={url?.residenceTitle} />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                label="ساختمان"
                name="building"
                form={residenceForm}
                isLoading={isGetBuildingsOfDormitoryLoading}
                onChange={changeBuildingListHandler}
                options={buildingData}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                label="طبقه"
                name="floor"
                form={residenceForm}
                onChange={changeFloorListHandler}
                isLoading={isGetFloorsOfBuildingLoading}
                options={floorData}
              />
            </Col>
          </Row>
        </Form>
        <div>
          <CustomDivider
            text="ساختمان"
            extraContent={
              <CustomTag color={dormVisibilityStatusColor[selectBuildingData?.statusId]}>
                {selectBuildingData?.statusTitle}
              </CustomTag>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="نام ساختمان"
              value={selectBuildingData?.title}
            />
            <SingleVerticalWithCol
              label="جنسیت"
              value={selectBuildingData?.genderTitle}
            />
          </Row>
          <CustomDivider
            text="طبقه"
            extraContent={
              <CustomTag color={dormVisibilityStatusColor[selectFloorData?.statusId]}>
                {selectFloorData?.statusTitle}
              </CustomTag>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="نام طبقه" value={selectFloorData?.title} />
            <SingleVerticalWithCol label="جنسیت" value={selectFloorData?.genderTitle} />
          </Row>
        </div>
        <div className="floor-table-container">
          <CustomDivider text="لیست اتاق‌ها" />
          <CustomTable
            dataSource={roomList}
            columns={PendingReviewRenewalAndReserveDormReservationTableModel({
              openBedAllocationHandler,
              openViewDetailHandler: openMoreDetailDrawerHandler,
            })}
            loading={isRoomListLoading || isRoomListCountLoading}
            pagination={manualPaginationConfig({
              total: roomTotalCount?.data,
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
            rowKey="id"
            className="floors-tab-table-model-container"
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(roomList?.length)}
          />
        </div>
      </div>
    </>
  );
};

export default PendingReviewRenewalAndReserveDormReservation;
