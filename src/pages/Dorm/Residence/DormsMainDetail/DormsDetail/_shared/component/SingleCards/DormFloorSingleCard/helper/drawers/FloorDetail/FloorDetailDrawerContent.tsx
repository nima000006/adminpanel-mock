import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetResidenceFloorInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import { FloorDetailDrawerContentProps } from "./@types/@floorDetailDrawerContent";
import FloorDetailFloorFacilities from "./helper/components/FloorDetailFloorFacilities/FloorDetailFloorFacilities";
import FloorDetailFloorInfo from "./helper/components/FloorDetailFloorInfo/FloorDetailFloorInfo";
import FloorDetailStatistics from "./helper/components/FloorDetailStatistics/FloorDetailStatistics";
import "./_floorDetailDrawerContent.scss";

const FloorDetailDrawerContent = ({
  closeDrawerHandler,
  id,
}: FloorDetailDrawerContentProps) => {
  const [view, setView] = useState("0");

  //? ================================  Api Calls ================================
  const [getFloorInfo, { data: floorData, isLoading: isFloorDataLoading }] =
    useGetResidenceFloorInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getFloorInfo({
      body: {
        _data_: {
          id: id?.toString(),
        },
      },
      params: { relation: "4bb8112a0b2a4d489c9d57eece638768" }, //we should set this to get data
    });
  }, []);

  const segmentItems = [
    {
      id: "0",
      children: <FloorDetailStatistics id={id} />,
    },
    {
      id: "1",
      children: (
        <FloorDetailFloorInfo data={floorData?.data} loading={isFloorDataLoading} />
      ),
    },
    {
      id: "2",
      children: (
        <FloorDetailFloorFacilities
          data={floorData?.data?.AssociationFacilityFloor}
          loading={isFloorDataLoading}
        />
      ),
    },
  ];

  return (
    <div className="dorm-residence-floor-detail-drawer-container">
      <CustomDrawerHeader
        title="جزئیات طبقه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag
            color={
              floorData?.data?.AssociationActiveStatus?.id === 1
                ? "green"
                : floorData?.data?.AssociationActiveStatus?.id === 2
                  ? "gold"
                  : "red"
            }
          >
            {floorData?.data?.AssociationActiveStatus?.title}
          </CustomTag>
        }
      />
      <div className="segment-container">
        <CustomSegmented
          size="large"
          block
          options={[
            { value: "0", label: "آمار و ارقام" },
            { value: "1", label: "اطلاعات طبقه" },
            { value: "2", label: "امکانات طبقه" },
          ]}
          onChange={(value) => setView(value as "0" | "1" | "2")}
        />
      </div>
      <div className="drawer-body">
        <div>{segmentItems[+view]?.children}</div>
        <Div loading={isFloorDataLoading} className="date-container">
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="زمان ثبت"
              value={dateTimeCombiner(
                floorData?.data?.createDate,
                floorData?.data?.createTime
              )}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="زمان آخرین ویرایش"
              value={dateTimeCombiner(
                floorData?.data?.updateDate,
                floorData?.data?.updateTime
              )}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="آخرین ویرایش‌کننده"
              value={`${floorData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.firstName ?? "-"} ${floorData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.lastName ?? ""}`}
            />
          </Row>
        </Div>
      </div>
    </div>
  );
};

export default FloorDetailDrawerContent;
