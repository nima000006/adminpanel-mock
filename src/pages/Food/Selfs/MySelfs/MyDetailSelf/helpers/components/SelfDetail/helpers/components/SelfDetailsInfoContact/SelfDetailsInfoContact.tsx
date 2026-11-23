import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { SelfDetailsInfoContactProps } from "./@types/SelfDetailsInfoContactProps";

const SelfDetailsInfoContact = ({ selfDetailData }: SelfDetailsInfoContactProps) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="استان"
        value={selfDetailData?.data?.provinceStateName}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شهر"
        value={selfDetailData?.data?.provinceName}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شماره تلفن "
        value={selfDetailData?.data?.restaurantPhone}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="کد پستی"
        value={selfDetailData?.data?.postalCode}
      />
      <SingleVerticalWithCol
        span={24}
        label="آدرس"
        value={dataPlaceHolder({
          data: selfDetailData?.data?.address,
        })}
      />
    </Row>
  );
};

export default SelfDetailsInfoContact;
