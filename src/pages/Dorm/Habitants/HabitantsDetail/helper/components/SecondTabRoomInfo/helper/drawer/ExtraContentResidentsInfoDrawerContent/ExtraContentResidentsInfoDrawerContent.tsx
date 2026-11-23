import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { useGetResidenceRoomInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { GetResidenceRoomInfoResponse } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormRoomSingleCard/helper/drawers/RoomDetail/@types/@roomDetailDrawerContent";
import RoomDetailStatistics from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormRoomSingleCard/helper/drawers/RoomDetail/helper/components/RoomDetailStatistics/RoomDetailStatistics";

import RoomSection from "./components/RoomSection/RoomSection";
import { ExtraContentResidentsInfoDrawerPropsType } from "../../../@types/@secondTabRoomInfo";
import "./_extraContentResidentsInfoDrawerContent.scss";

const ExtraContentResidentsInfoDrawerContent = ({
  closeDrawerHandler,
  id,
}: ExtraContentResidentsInfoDrawerPropsType) => {
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
    if (value?.data?.AssociationFileRoom?.[0]?.UploadFiles) {
      setFirstImageList([value?.data?.AssociationFileRoom?.[0]?.UploadFiles]);
    }
    if (value?.data?.AssociationFileRoom?.[1]?.UploadFiles) {
      setSecondImageList([value?.data?.AssociationFileRoom?.[1]?.UploadFiles]);
    }
    if (value?.data?.AssociationFileRoom?.[2]?.UploadFiles) {
      setThirdImageList([value?.data?.AssociationFileRoom?.[2]?.UploadFiles]);
    }
    if (value?.data?.AssociationFileRoom?.[3]?.UploadFiles) {
      setFourthImageList([value?.data?.AssociationFileRoom?.[3]?.UploadFiles]);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isRoomDataLoading}
      className="dorm-habitant-content-resident-info-drawer-container"
    >
      <CustomDrawerHeader
        title="جزئیات اتاق"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="divider-btn-container">
            {roomData?.data?.AssociationRecordStatus?.title && (
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
            )}
          </div>
        }
      />
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
      {id && <RoomDetailStatistics id={id} />}
      <CustomDivider text="اتاق" />
      <RoomSection roomData={roomData} />
    </Div>
  );
};
export default ExtraContentResidentsInfoDrawerContent;
