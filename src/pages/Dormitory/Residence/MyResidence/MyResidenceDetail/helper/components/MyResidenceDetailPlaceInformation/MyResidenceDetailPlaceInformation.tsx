import { useState } from "react";

import { Row } from "antd";

import { CustomMap } from "@components/CustomInputs";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { GetMyResidenceDataResponse } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";

const MyResidenceDetailPlaceInformation = ({
  dataSource,
}: {
  dataSource: GetMyResidenceDataResponse | undefined;
}) => {
  const [lat, setLat] = useState<number>(dataSource?.latitude ?? 35.699739);
  const [lng, setLng] = useState<number>(dataSource?.longitude ?? 51.338097);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol lg={8} label="کد پستی" value={dataSource?.zipCode} />
        <SingleVerticalWithCol
          lg={8}
          label="شماره تلفن اقامتگاه"
          value={dataSource?.phone}
        />
        <SingleVerticalWithCol lg={8} label="استان" value={dataSource?.provinceTitle} />
        <SingleVerticalWithCol lg={8} label="شهر" value={dataSource?.cityTitle} />
        <SingleVerticalWithCol
          span={24}
          label="آدرس"
          value={dataSource?.faAddress || dataSource?.address}
        />
      </Row>
      <p className="mt-5! mb-0! font-medium">موقعیت جغرافیایی</p>
      <CustomMap className="mt-1!" lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
    </>
  );
};
export default MyResidenceDetailPlaceInformation;
