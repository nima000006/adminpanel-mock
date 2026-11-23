import { useEffect, useState } from "react";

import { Row } from "antd";

import { CustomUploader } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetDetailUnitQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";
import { GetDetailUnitResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/@types/@activeResidenceUnitListType";
import { ViewUnitInfoSegmentContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ViewUnitDrawerContent/@types/@viewUnitDrawerContentTypes";
import CountsDetailCard from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/CountsDetailCard/CountsDetailCard";
import { BED_TYPE_IMG } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ViewUnitInfoSegmentContent = ({ id }: ViewUnitInfoSegmentContentProps) => {
  const [data, setData] = useState<GetDetailUnitResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getDetailUnit, { isFetching: isGetDetailUnitLoading }] =
    useLazyGetDetailUnitQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!id || id === "-1") return;

    getDetailUnit(id)
      .unwrap()
      .then((res: GetDetailUnitResponse) => {
        setData(res);
      });
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="flex flex-col gap-10" loading={isGetDetailUnitLoading}>
      <div>
        <CustomDivider text="آمار واحد اقامتی" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CountsDetailCard title="تخت" value={data?.bedCount?.toString() ?? "0"} />
        </div>
      </div>

      <div>
        <CustomDivider text="آمار تخت‌های واحد اقامتی" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.bedTypeStats?.map((item) => {
            const bedTypeName = item?.bedType?.name;
            const bedTypeMeta = BED_TYPE[bedTypeName as keyof typeof BED_TYPE];

            return (
              <CountsDetailCard
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
export default ViewUnitInfoSegmentContent;
