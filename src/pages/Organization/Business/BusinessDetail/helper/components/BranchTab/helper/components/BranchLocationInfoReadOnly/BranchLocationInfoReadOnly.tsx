import { useState } from "react";

import { Row } from "antd";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const BranchLocationInfoReadOnly = () => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  return (
    <div>
      <CustomDivider text={"موقعیت مکانی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="استان" value={"تهران"} />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="شهر" value={"تهران"} />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="کد پستی"
          value={"۱۴۶۴۷۷۸۴۱۱"}
        />
        <SingleVerticalWithCol
          span={24}
          label="آدرس"
          value={"استان آذربایجان غربی، شهر ارومیه، خیابان مهدی سوم مجتمع دانشگاه آزاد"}
        />
      </Row>
      <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} isReadOnly={true} />
    </div>
  );
};
export default BranchLocationInfoReadOnly;
