import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomMap } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetDetailLabsQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { GetDetailLabsResponse } from "@pages/MyDoctor/Genetics/Labs/LabsList/helper/drawer/LabsModifyDrawerContent/@types/@labsModifyDrawerContent";
import { LabsViewDrawerContentProps } from "@pages/MyDoctor/Genetics/Labs/LabsList/helper/drawer/LabsViewDrawerContent/@types/@labsViewDrawerContent";

const LabsViewDrawerContent = ({
  closeDrawerHandler,
  id,
}: LabsViewDrawerContentProps) => {
  const [detailData, setDetailData] = useState<GetDetailLabsResponse | null>(null);
  const [lat, setLat] = useState<number>(35.69947719509053);
  const [lng, setLng] = useState<number>(51.336965560913086);

  //? ================================  Api Calls ================================
  // get detail
  const [getDetail, { isFetching: isDetailLoading }] = useLazyGetDetailLabsQuery();

  //? ================================ Effects ================================
  // get detail
  useEffect(() => {
    if (id && id >= 1) {
      getDetail(id?.toString())
        .unwrap()
        .then((res: GetDetailLabsResponse) => {
          setDetailData(res);
          setLat(res?.latitude);
          setLng(res?.longitude);
        });
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isDetailLoading}>
      <CustomDrawerHeader
        title={"مشاهده آزمایشگاه"}
        closeDrawerHandler={closeDrawerHandler}
      />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نام آزمایشگاه"
          value={detailData?.title}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="استان"
          value={detailData?.provinceTitle}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="شهر"
          value={detailData?.cityTitle}
        />
        <SingleVerticalWithCol span={24} label="آدرس" value={detailData?.address} />

        <CustomCard loading={false}>
          <CustomDivider orientationMargin="0" text="موقعیت مکانی " />
          <CustomMap
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            isReadOnly={true}
          />
        </CustomCard>

        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نام مسئول"
          value={detailData?.employee}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="شماره تماس مسئول آزمایشگاه"
          value={detailData?.employeePhone}
        />
        <SingleVerticalWithCol
          span={24}
          label="شماره تماس آزمایشگاه"
          value={detailData?.phone}
        />
      </Row>
      <div>
        <CustomDivider orientationMargin="0" text="تست‌های قابل ارائه" />
        <div dir="rtl" className="w-full overflow-hidden bg-white">
          <div className="bg-[#fafafa] px-5 py-4 text-sm text-[#444]">نام تست</div>

          {detailData?.testDto.map((test) => (
            <div
              key={test.id}
              className="flex min-h-11.75 items-center border-b border-[#eeeeee] px-5 text-sm text-[#444]"
            >
              {test.title}
            </div>
          ))}
        </div>
      </div>
    </Div>
  );
};
export default LabsViewDrawerContent;
