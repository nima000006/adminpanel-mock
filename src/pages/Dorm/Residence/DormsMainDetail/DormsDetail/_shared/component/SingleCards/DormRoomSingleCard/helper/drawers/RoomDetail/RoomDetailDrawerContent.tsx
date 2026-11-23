import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetResidenceRoomInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import {
  GetResidenceRoomInfoResponse,
  RoomDetailDrawerContentProps,
} from "./@types/@roomDetailDrawerContent";
import RoomDetailStatistics from "./helper/components/RoomDetailStatistics/RoomDetailStatistics";
import "./_roomDetailDrawerContent.scss";

const RoomDetailDrawerContent = ({
  closeDrawerHandler,
  id,
}: RoomDetailDrawerContentProps) => {
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

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
      })
        .unwrap()
        .then(getRoomInfoSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getRoomInfoSuccess = async (value: GetResidenceRoomInfoResponse) => {
    if (value?.data?.AssociationFileRoom?.[0]) {
      setFirstImageList([value?.data?.AssociationFileRoom?.[0]?.UploadFiles]);
    }
    if (value?.data?.AssociationFileRoom?.[1]) {
      setSecondImageList([value?.data?.AssociationFileRoom?.[1]?.UploadFiles]);
    }
    if (value?.data?.AssociationFileRoom?.[2]) {
      setThirdImageList([value?.data?.AssociationFileRoom?.[2]?.UploadFiles]);
    }
    if (value?.data?.AssociationFileRoom?.[3]) {
      setFourthImageList([value?.data?.AssociationFileRoom?.[3]?.UploadFiles]);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div
      className="dorm-residence-room-detail-drawer-container"
      loading={isRoomDataLoading}
    >
      <CustomDrawerHeader
        title="جزئیات اتاق"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag
            color={
              roomData?.data?.AssociationRecordStatus?.id === 1
                ? "green"
                : roomData?.data?.AssociationRecordStatus?.id === 2
                  ? "gold"
                  : "red"
            }
          >
            {roomData?.data?.AssociationRecordStatus?.title}
          </CustomTag>
        }
      />
      <div className="drawer-body">
        <Row gutter={[16, 16]}>
          <Col xl={4} lg={4} md={8} sm={12} xs={24}>
            <CustomUploader
              fileList={firstImageList}
              setFileList={setFirstImageList}
              isReadOnly={true}
              hasUploaderIcon={false}
              name="firstImage"
              imageGetterSource="dorm"
            />
          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={24}>
            <CustomUploader
              fileList={secondImageList}
              setFileList={setSecondImageList}
              isReadOnly={true}
              hasUploaderIcon={false}
              name="secondImage"
              imageGetterSource="dorm"
            />
          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={24}>
            <CustomUploader
              fileList={thirdImageList}
              setFileList={setThirdImageList}
              isReadOnly={true}
              hasUploaderIcon={false}
              name="thirdImage"
              imageGetterSource="dorm"
            />
          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={24}>
            <CustomUploader
              fileList={fourthImageList}
              setFileList={setFourthImageList}
              isReadOnly={true}
              hasUploaderIcon={false}
              name="fourthImage"
              imageGetterSource="dorm"
            />
          </Col>
        </Row>
        <RoomDetailStatistics id={id} />
        <section className="room-info-container">
          <CustomDivider text="اتاق" />
          <Row gutter={[16, 16]}>
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
        </section>
      </div>
    </Div>
  );
};

export default RoomDetailDrawerContent;
