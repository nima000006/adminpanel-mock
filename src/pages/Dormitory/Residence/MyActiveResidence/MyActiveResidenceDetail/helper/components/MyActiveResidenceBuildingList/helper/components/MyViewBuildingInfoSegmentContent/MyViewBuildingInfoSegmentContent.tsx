import { useEffect, useState } from "react";

import { Row } from "antd";

import { CustomMap, CustomUploader } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetMyActiveResidenceBuildingDetailQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  getMyActiveResidenceBuildingDetailResponse,
  MyViewBuildingInfoSegmentContentProps,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyViewBuildingInfoSegmentContent/@types/@myViewBuildingInfoSegmentContentTypes";
import MyCountsDetailCard from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyCountsDetailCard/MyCountsDetailCard";

const MyViewBuildingInfoSegmentContent = ({
  id,
}: MyViewBuildingInfoSegmentContentProps) => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  const [data, setData] = useState<getMyActiveResidenceBuildingDetailResponse | null>(
    null
  );

  //? ================================  Api Calls ================================
  const [
    getMyActiveResidenceBuildingDetail,
    { isLoading: isGetMyActiveResidenceBuildingDetailLoading },
  ] = useLazyGetMyActiveResidenceBuildingDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getMyActiveResidenceBuildingDetail(id)
        .unwrap()
        .then((res: getMyActiveResidenceBuildingDetailResponse) => {
          setData(res);
        });
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="flex flex-col gap-10"
      loading={isGetMyActiveResidenceBuildingDetailLoading}
    >
      <div>
        <CustomDivider text="آمار ساختمان" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MyCountsDetailCard title="طبقه" value={data?.floorCount?.toString() ?? "0"} />
          <MyCountsDetailCard
            title="واحد اقامتی"
            value={data?.roomCount?.toString() ?? "0"}
          />
          <MyCountsDetailCard title="تخت" value={data?.bedCount?.toString() ?? "0"} />
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

      {/* عکس ساختمان */}
      <div className="mt-10 flex flex-col">
        <p className="mb-1! font-medium">عکس ساختمان</p>
        <div className="flex gap-4">
          {data?.images?.map((item) => (
            <CustomUploader
              key={item?.uuid}
              fileList={
                item?.url
                  ? [
                      {
                        uid: item?.url,
                        name: item?.url,
                        url: item?.url,
                        status: "done",
                      },
                    ]
                  : []
              }
              setFileList={() => {}}
              isReadOnly
              hasUploaderIcon={false}
              hasNullText
              uploaderText="عکس ساختمان"
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
            label="عنوان ساختمان"
            value={data?.title ?? ""}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="درجه کیفی"
            value={data?.qualityGrade?.title}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="مساحت زیربنای ساختمان"
            value={data?.builtUpArea?.toString()}
            extraContent="متر مربع"
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="مساحت فضای قابل سکونت"
            value={data?.livingArea?.toString()}
            extraContent="متر مربع"
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="مساحت فضای مشاعات"
            value={data?.commonArea?.toString()}
            extraContent="متر مربع"
          />
        </Row>
      </div>

      {/* اطلاعات مکانی */}
      <div>
        <CustomDivider text="اطلاعات مکانی" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="کد پستی"
            value={data?.zipCode}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="شماره تلفن اقامتگاه"
            value={data?.phone}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="استان"
            value={data?.provinceTitle}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="شهر"
            value={data?.cityTitle}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            span={24}
            label="آدرس"
            value={data?.address}
          />
        </Row>

        {/* موقعیت جغرافیایی */}
        <div className="mt-4!">
          <label>موقعیت جغرافیایی</label>
          <CustomMap
            isReadOnly={true}
            lat={data?.latitude ? data?.latitude : lat}
            lng={data?.longitude ? data?.longitude : lng}
            setLat={setLat}
            setLng={setLng}
          />
        </div>
      </div>
    </Div>
  );
};
export default MyViewBuildingInfoSegmentContent;
