import { Row } from "antd";

import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { InfoContentProps } from "../modal/UpdateFactorModalContent/@types/@updateFactorModalContent";

const InfoContent = ({ info }: InfoContentProps) => {
  return (
    <CustomCard>
      <Row gutter={[10, 10]}>
        <SingleVerticalWithCol label="نام" value={info?.name} />

        <SingleVerticalWithCol label="نام خانوادگی" value={info?.family} />

        <SingleVerticalWithCol label="شماره ملی" value={info?.username} />

        <SingleVerticalWithCol label="شماره دانشجویی" value={info?.studentNumber} />

        {/* 
      <SingleVerticalWithCol
        label="شماره موبایل"
        value={ "" }
      />
     */}

        <SingleVerticalWithCol label="خوابگاه" value={info?.dormitoryName} />

        <SingleVerticalWithCol label="ساختمان" value={info?.buildingName} />

        <SingleVerticalWithCol label="طبقه" value={info?.floorName} />

        <SingleVerticalWithCol label="اتاق" value={info?.roomName} />

        <SingleVerticalWithCol
          label="قیمت فعلی (ریال)"
          value={info?.amount?.toString() || ""}
        />
      </Row>
    </CustomCard>
  );
};

export default InfoContent;
