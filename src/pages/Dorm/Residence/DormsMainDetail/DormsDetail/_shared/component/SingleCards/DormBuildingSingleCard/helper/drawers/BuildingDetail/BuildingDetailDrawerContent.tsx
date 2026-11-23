import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetResidenceBuildingInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import { BuildingDetailDrawerContentProps } from "./@types/@buildingDetailDrawerContent";
import BuildingDetailBuildingFacilities from "./helper/components/BuildingDetailBuildingFacilities/BuildingDetailBuildingFacilities";
import BuildingDetailBuildingInfo from "./helper/components/BuildingDetailBuildingInfo/BuildingDetailBuildingInfo";
import BuildingDetailBuildingRules from "./helper/components/BuildingDetailBuildingRules/BuildingDetailBuildingRules";
import BuildingDetailStatistics from "./helper/components/BuildingDetailStatistics/BuildingDetailStatistics";
import "./_buildingDetailDrawerContent.scss";

const BuildingDetailDrawerContent = ({
  closeDrawerHandler,
  id,
}: BuildingDetailDrawerContentProps) => {
  const [view, setView] = useState("0");

  //? ================================  Api Calls ================================
  const [getBuildingInfo, { data: buildingData, isLoading: isBuildingDataLoading }] =
    useGetResidenceBuildingInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getBuildingInfo({
      body: {
        _data_: {
          id: id?.toString(),
        },
      },
      params: {
        relation: "1f58e476ee3d45b0be6b100b0caa73ae", //we should set this to get data
      },
    });
  }, [id]);

  const segmentItems = [
    {
      id: "0",
      children: <BuildingDetailStatistics id={id} />,
    },
    {
      id: "1",
      children: (
        <BuildingDetailBuildingInfo
          data={buildingData?.data}
          loading={isBuildingDataLoading}
        />
      ),
    },
    {
      id: "2",
      children: (
        <BuildingDetailBuildingFacilities
          data={buildingData?.data?.AssociationScopeOfUseOfFacility}
          loading={isBuildingDataLoading}
        />
      ),
    },
    {
      id: "3",
      children: (
        <BuildingDetailBuildingRules
          data={buildingData?.data?.AssociationGeneralBuilding}
          loading={isBuildingDataLoading}
        />
      ),
    },
  ];

  return (
    <div className="dorm-residence-building-detail-drawer-container">
      <CustomDrawerHeader
        title="جزئیات ساختمان"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag
            color={
              buildingData?.data?.AssociationActiveStatus?.id === 1
                ? "green"
                : buildingData?.data?.AssociationActiveStatus?.id === 2
                  ? "gold"
                  : "red"
            }
          >
            {buildingData?.data?.AssociationActiveStatus?.title}
          </CustomTag>
        }
      />
      <div className="segment-container">
        <CustomSegmented
          size="large"
          block
          options={[
            { value: "0", label: "آمار و ارقام" },
            { value: "1", label: "اطلاعات ساختمان" },
            { value: "2", label: "امکانات ساختمان" },
            { value: "3", label: "قوانین و مقررات" },
          ]}
          onChange={(value) => setView(value as "0" | "1" | "2" | "3")}
        />
      </div>
      <div className="drawer-body">
        <div>{segmentItems[+view]?.children}</div>
        <Div loading={isBuildingDataLoading} className="date-container">
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="زمان ثبت"
              value={dateTimeCombiner(
                buildingData?.data?.createDate,
                buildingData?.data?.createTime
              )}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="زمان آخرین ویرایش"
              value={dateTimeCombiner(
                buildingData?.data?.updateDate,
                buildingData?.data?.updateTime
              )}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="آخرین ویرایش‌کننده"
              value={`${buildingData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.firstName ?? "-"} ${buildingData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.lastName ?? ""}`}
            />
          </Row>
        </Div>
      </div>
    </div>
  );
};

export default BuildingDetailDrawerContent;
