import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { GetAllSelfDetailResponse } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/SelfDetail/@types/@selfDetailTab";

const FoodAllSelfDetailsInfoContact = ({
  selfDetailData,
}: {
  selfDetailData: GetAllSelfDetailResponse | undefined;
}) => {
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
        value={selfDetailData?.data?.address}
      />
    </Row>
  );
};
export default FoodAllSelfDetailsInfoContact;
