import { useEffect, useState } from "react";

import { Row } from "antd";

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
import { dormVisibilityStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  DormRequestRoomListType,
  GetDormRequestRoomListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";

import { ResidenceInfoStepFloorInfoProps } from "./@types/@residenceInfoStepFloorInfo";
import ManualRegistrationBedAllocationDrawerContent from "./helper/drawers/ManualRegistrationBedAllocation/ManualRegistrationBedAllocationDrawerContent";
import ManualRegistrationViewRoomDetailDrawerContent from "./helper/drawers/ManualRegistrationViewRoomDetail/ManualRegistrationViewRoomDetailDrawerContent";
import ResidenceInfoStepFloorInfoTableModel from "./helper/models/ResidenceInfoStepFloorInfo/ResidenceInfoStepFloorInfoTableModel";
import "./_residenceInfoStepFloorInfo.scss";

const ResidenceInfoStepFloorInfo = ({
  floorData,
  tariffId,
  mainFormData,
}: ResidenceInfoStepFloorInfoProps) => {
  // اتاق
  const [roomList, setRoomList] = useState<DormRequestRoomListType[]>([]);

  const [viewDetailDrawer, setViewDetailDrawer] = useState({ isOpen: false, id: -1 });

  const [bedAllocation, setBedAllocation] = useState({
    isOpen: false,
    id: -1,
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getRoomList, { isFetching: isRoomListLoading }] =
    useLazyGetDormRequestRoomListQuery();

  const [getRoomListCount, { data: roomTotalCount, isFetching: isRoomListCountLoading }] =
    useLazyGetDormRequestRoomListCountQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getRoomListData();
  }, [url?.page, url?.pageSize, tariffId, floorData?.id]);

  //* ================================ Util Functions ================================
  const getRoomListData = () => {
    if (tariffId && floorData?.id) {
      getRoomList({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        floorId: +floorData?.id,
        tariffId: tariffId,
      })
        .unwrap()
        .then(getRoomListSuccess);

      getRoomListCount({
        floorId: +floorData?.id,
        tariffId: tariffId,
      });
    }
  };

  const getRoomListSuccess = (value: GetDormRequestRoomListResponse) => {
    if (value?.status === 200) {
      setRoomList(value?.data);
    }
  };

  //view
  const openViewRoomModalHandler = (id: number) => {
    setViewDetailDrawer({ isOpen: true, id });
  };
  const closeViewRoomModalHandler = () => {
    setViewDetailDrawer({ isOpen: false, id: -1 });
  };

  //allocation
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

  return (
    <>
      {/* VIEW DETAIL DRAWER */}
      {viewDetailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeViewRoomModalHandler}
          open={viewDetailDrawer?.isOpen}
          content={
            <ManualRegistrationViewRoomDetailDrawerContent
              closeDrawerHandler={closeViewRoomModalHandler}
              id={viewDetailDrawer?.id}
            />
          }
        />
      )}

      {/* BED ALLOCATION DRAWER */}
      {bedAllocation?.isOpen && (
        <CustomDrawer
          onClose={closeBedAllocationHandler}
          open={bedAllocation?.isOpen}
          content={
            <ManualRegistrationBedAllocationDrawerContent
              closeDrawerHandler={closeBedAllocationHandler}
              roomId={bedAllocation?.id}
              mainFormData={mainFormData}
            />
          }
        />
      )}

      <div className="residence-info-step-floor-info-container">
        <CustomDivider
          text="طبقه"
          extraContent={
            <CustomTag color={dormVisibilityStatusColor[floorData?.recordStatus]}>
              {floorData?.AssociationActiveStatus_title}
            </CustomTag>
          }
        />
        <Row gutter={16}>
          <SingleVerticalWithCol label="نام طبقه" value={floorData?.title} />
          <SingleVerticalWithCol
            label="جنسیت"
            value={floorData?.AssociationGender_title}
          />
        </Row>
        <CustomDivider text="لیست اتاق‌ها" />
        <CustomTable
          dataSource={roomList}
          columns={ResidenceInfoStepFloorInfoTableModel({
            viewRoomHandler: openViewRoomModalHandler,
            bedAllocationHandler: openBedAllocationHandler,
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
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(roomList?.length)}
          rowKey="id"
          className="residence-info-step-floor-info-table-model-container"
        />
      </div>
    </>
  );
};

export default ResidenceInfoStepFloorInfo;
