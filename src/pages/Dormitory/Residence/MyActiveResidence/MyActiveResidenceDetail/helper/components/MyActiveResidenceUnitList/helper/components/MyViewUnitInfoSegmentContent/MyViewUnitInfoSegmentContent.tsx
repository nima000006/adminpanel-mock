import { useEffect, useState } from "react";

import { Row } from "antd";

import { CustomUploader } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetMyDetailUnitQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { BED_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/My_shared/MyUtil";
import { GetDetailUnitResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/@types/@myActiveResidenceUnitListType";
import { MyViewUnitInfoSegmentContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/drawer/MyViewUnitDrawerContent/@types/@myViewUnitDrawerContentTypes";
import MyCountsDetailCard from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyCountsDetailCard/MyCountsDetailCard";
import { BED_TYPE_IMG } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyViewUnitInfoSegmentContent = ({ id }: MyViewUnitInfoSegmentContentProps) => {
  const [data, setData] = useState<GetDetailUnitResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getMyDetailUnit, { isFetching: isGetMyDetailUnitLoading }] =
    useLazyGetMyDetailUnitQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!id || id === "-1") return;

    getMyDetailUnit(id)
      .unwrap()
      .then((res: GetDetailUnitResponse) => {
        setData(res);
      });
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="flex flex-col gap-10" loading={isGetMyDetailUnitLoading}>
      <div>
        <CustomDivider text="آمار واحد اقامتی" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MyCountsDetailCard title="تخت" value={data?.bedCount?.toString() ?? "0"} />
        </div>
      </div>

      <div>
        <CustomDivider text="آمار تخت‌های واحد اقامتی" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.bedTypeStats?.map((item) => {
            const bedTypeName = item?.bedType?.name;
            const bedTypeMeta = BED_TYPE[bedTypeName as keyof typeof BED_TYPE];

            return (
              <MyCountsDetailCard
                key={bedTypeName}
                title={item?.bedType?.title || bedTypeMeta?.label || ""}
                value={item?.count?.toString() ?? "0"}
                img={BED_TYPE_IMG[bedTypeName]}
                hasImg={Boolean(BED_TYPE_IMG[bedTypeName])}
              />
            );
          })}
        </div>

        {/* عکس واحد اقامتی */}
        <div className="mt-10 flex flex-col">
          <p className="mb-1! font-medium">عکس واحد اقامتی</p>
          <div className="flex gap-4">
            {data?.images?.map((item) => (
              <CustomUploader
                key={item?.uuid}
                fileList={
                  item?.url
                    ? [
                        {
                          uid: item.url,
                          name: item.url,
                          url: item.url,
                          status: "done",
                        },
                      ]
                    : []
                }
                setFileList={() => {}}
                isReadOnly
                hasUploaderIcon={false}
                hasNullText
                uploaderText="عکس واحد اقامتی"
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
              label="کد واحد اقامتی"
              value={data?.roomNumber ?? ""}
            />
            <SingleVerticalWithCol
              md={12}
              xl={12}
              lg={12}
              label="عنوان واحد اقامتی"
              value={data?.faTitle ?? ""}
            />
            <SingleVerticalWithCol
              md={12}
              xl={12}
              lg={12}
              label="نوع واحد اقامتی"
              value={data?.roomType?.title ?? ""}
            />
            <SingleVerticalWithCol
              md={12}
              xl={12}
              lg={12}
              label="درجه کیفی"
              value={data?.qualityGrade?.title ?? ""}
            />
            <SingleVerticalWithCol
              md={12}
              xl={12}
              lg={12}
              label="ظرفیت استاندارد واحد اقامتی"
              value={data?.capacity?.toString() ?? ""}
            />
            <SingleVerticalWithCol
              md={12}
              xl={12}
              lg={12}
              label="مساحت"
              value={data?.areaSquareMeters?.toString() ?? ""}
              extraContent="متر مربع"
            />
            <SingleVerticalWithCol
              span={24}
              label="توضیحات"
              value={data?.faDescription ?? ""}
            />
          </Row>
        </div>
      </div>
    </Div>
  );
};
export default MyViewUnitInfoSegmentContent;
