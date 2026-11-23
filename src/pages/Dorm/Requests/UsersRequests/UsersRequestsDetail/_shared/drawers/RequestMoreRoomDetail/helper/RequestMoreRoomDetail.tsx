import { useEffect } from "react";

import { Col, Row } from "antd";

import imagePlaceHolder from "@assets/images/selfDefaultAvatar.webp";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetResidenceRoomInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import RoomStatistics from "../../UserRequestRoomMoreInfoDrawerContent/components/RoomStatistics/RoomStatistics";
import { RequestMoreRoomDetailProps } from "../@types/@requestMoreRoomDetail";
import "./_requestMoreRoomDetail.scss";

const RequestMoreRoomDetail = ({
  closeDrawerHandler,
  id,
}: RequestMoreRoomDetailProps) => {
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
    <div>
      <CustomDrawerHeader
        title="جزئیات اتاق"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag color="green">
            {roomData?.data?.AssociationRecordStatus?.title}
          </CustomTag>
        }
      />
      <Div
        loading={isRoomDataLoading}
        className="users-requests-room-detail-drawer-container"
      >
        <Row gutter={[16, 16]}>
          {roomData?.data?.AssociationFileRoom?.map((fileObj) => {
            const url = fileObj?.UploadFiles?.relativeUrl;
            return (
              <Col
                className="users-requests-room-detail-drawer-img-container"
                key={fileObj.id}
                xl={4}
                lg={4}
                md={8}
                sm={12}
                xs={24}
              >
                <img
                  loading="lazy"
                  src={url}
                  alt={fileObj?.UploadFiles?.originalName}
                  onError={(e) => {
                    e.currentTarget.src = imagePlaceHolder;
                    e.currentTarget.alt = "Placeholder image";
                  }}
                />
              </Col>
            );
          })}
        </Row>
        <RoomStatistics id={id} />
        <div className="dorm">
          <CustomDivider text="اتاق" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام اقامتگاه"
              value={roomData?.data?.AssociationFloor?.AssociationBuilding?.title}
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
          </Row>
        </div>
        <Row gutter={[16, 16]}>
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
      </Div>
    </div>
  );
};

export default RequestMoreRoomDetail;
