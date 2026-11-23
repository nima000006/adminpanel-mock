import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { BuildingDetailBuildingInfoProps } from "./@types/@buildingDetailBuildingInfo";

const BuildingDetailBuildingInfo = ({
  data,
  loading,
}: BuildingDetailBuildingInfoProps) => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      setLat(data?.latitude);
      setLng(data?.longitude);
    }
  }, []);

  return (
    <Div loading={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomDivider text="ساختمان‌" />
        </Col>
        <SingleVerticalWithCol xl={8} lg={8} label="نام ساختمان" value={data?.title} />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شناسه ساختمان"
          value={data?.id?.toString()}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="اقامتگاه"
          value={data?.AssociationCategoryDormitory?.title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="جنسیت خوابگاه"
          value={data?.AssociationGender?.title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="درجه کیفی"
          value={data?.AssociationQuality?.title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="مساحت زیربنای ساختمان (متر مربع)"
          value={data?.sizeOfBuilding?.toString()}
        />
      </Row>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="استان"
          value={data?.AssociationRegion?.AssociationRegionType?.title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شهر"
          value={data?.AssociationRegion?.title}
        />
        <SingleVerticalWithCol xl={8} lg={8} label="کد پستی" value={data?.zipCode} />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شماره تلفن"
          value={data?.phoneNumber}
        />
        <SingleVerticalWithCol span={24} label="آدرس" value={data?.address} />
        <Col span={24}>
          <CustomMap
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            isReadOnly={true}
          />
        </Col>
        <SingleVerticalWithCol
          span={24}
          label="توضیحات ساختمان"
          value={data?.description}
        />
      </Row>
    </Div>
  );
};

export default BuildingDetailBuildingInfo;
