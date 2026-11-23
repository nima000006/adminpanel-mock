import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetMyActiveResidenceFloorDetailInfoSegmentQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  getMyActiveResidenceFloorDetailInfoSegmentResponse,
  MyViewFloorInfoSegmentContentProps,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/components/MyViewFloorInfoSegmentContent/@types/@myViewFloorInfoSegmentContentTypes";
import MyCountsDetailCard from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyCountsDetailCard/MyCountsDetailCard";

const MyViewFloorInfoSegmentContent = ({ id }: MyViewFloorInfoSegmentContentProps) => {
  const [data, setData] =
    useState<getMyActiveResidenceFloorDetailInfoSegmentResponse | null>(null);
  //? ================================ Api Calls ================================
  const [
    getMyActiveResidenceFloorDetailInfoSegment,
    { isLoading: isGetMyActiveResidenceFloorDetailInfoSegmentLoading },
  ] = useLazyGetMyActiveResidenceFloorDetailInfoSegmentQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getMyActiveResidenceFloorDetailInfoSegment(id)
        .unwrap()
        .then((res: getMyActiveResidenceFloorDetailInfoSegmentResponse) => {
          setData(res);
        });
    }
  }, [id]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
  return (
    <Div
      className="flex flex-col gap-10"
      loading={isGetMyActiveResidenceFloorDetailInfoSegmentLoading}
    >
      <div>
        <CustomDivider text="آمار طبقه" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MyCountsDetailCard
            title="واحد اقامتی"
            value={data?.roomCount.toString() || "0"}
          />
          <MyCountsDetailCard title="تخت" value={data?.bedCount.toString() || "0"} />
        </div>
      </div>

      <div>
        <CustomDivider text="آمار ظرفیت واحدهای اقامتی" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.roomCapacityStats?.map((item) => (
            <MyCountsDetailCard
              title={`واحد اقامتی ${item?.capacity} تخته`}
              value={item?.count?.toString() ?? "0"}
            />
          ))}
        </div>
      </div>

      {/* اطلاعات پایه */}
      <div>
        <CustomDivider text="اطلاعات پایه" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="طبقه"
            value={data?.floorNumber?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="عنوان طبقه"
            value={data?.title}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="درجه کیفی"
            value={data?.qualityGrade?.title}
          />
        </Row>
      </div>
    </Div>
  );
};
export default MyViewFloorInfoSegmentContent;
