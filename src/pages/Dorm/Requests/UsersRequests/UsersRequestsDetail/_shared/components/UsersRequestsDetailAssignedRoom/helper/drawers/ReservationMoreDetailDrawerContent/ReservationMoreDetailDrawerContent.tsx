import { useEffect } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetResidenceRoomInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import {
  dateTimeCombiner,
  dormVisibilityStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";

import { ReservationMoreDetailDrawerContentProps } from "./@types/@reservationMoreDetailDrawerContent";

const ReservationMoreDetailDrawerContent = ({
  closeDrawerHandler,
  id,
}: ReservationMoreDetailDrawerContentProps) => {
  //? ================================  Api Calls ================================
  const [getRoomInfo, { data: roomData, isLoading: isRoomDataLoading }] =
    useGetResidenceRoomInfoMutation();

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
    }
  }, [id]);

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
      <CustomDivider text="اتاق" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="نام اتاق"
          value={roomData?.data?.title}
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
          xl={8}
          lg={8}
          label="شناسه اتاق"
          value={roomData?.data?.id?.toString()}
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
          label="نام ساختمان"
          value={roomData?.data?.AssociationFloor?.AssociationBuilding?.title}
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
          label="نام اقامتگاه"
          value={
            roomData?.data?.AssociationFloor?.AssociationBuilding
              ?.AssociationCategoryDormitory?.title
          }
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
          span={24}
          label="توضیحات اتاق"
          value={roomData?.data?.description}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="زمان ثبت"
          value={dateTimeCombiner(roomData?.data?.createDate, roomData?.data?.createTime)}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="زمان آخرین ویرایش"
          value={dateTimeCombiner(roomData?.data?.updateDate, roomData?.data?.updateTime)}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="آخرین ویرایش‌کننده"
          value={`${roomData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.firstName ?? "-"} ${roomData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.lastName ?? ""}`}
        />
      </Row>
    </Div>
  );
};

export default ReservationMoreDetailDrawerContent;
