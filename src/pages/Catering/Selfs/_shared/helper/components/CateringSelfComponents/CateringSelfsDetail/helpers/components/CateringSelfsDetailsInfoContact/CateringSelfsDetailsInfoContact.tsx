import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { CateringSelfsDetailData } from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsDetail/@types/@cateringSelfsDetail";

const CateringSelfsDetailsInfoContact = ({
  selfDetailData,
}: {
  selfDetailData?: CateringSelfsDetailData;
}) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="استان"
        value={selfDetailData?.provinceName}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شهر"
        value={selfDetailData?.cityName}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شماره تلفن ۱"
        value={selfDetailData?.restaurantPhone}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شماره تلفن ۲"
        value={selfDetailData?.restaurantPhone2}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="کد پستی"
        value={selfDetailData?.postalCode}
      />
      <SingleVerticalWithCol span={24} label="آدرس" value={selfDetailData?.address} />
    </Row>
  );
};

export default CateringSelfsDetailsInfoContact;
