import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const LocationInfoSection = () => {
  return (
    <div>
      <CustomDivider text={"موقعیت مکانی "} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="استان" value={"تهران"} />
        <SingleVerticalWithCol label="شهر" value={"کرج"} />
        <SingleVerticalWithCol label="کد پستی" value={"۱۴۶۴۷۷۸۴۱۱"} />
        <SingleVerticalWithCol
          span={24}
          label="آدرس"
          value={"استان تهران، شهر تهران، خیابان مهدی سوم/بن بست مهر، پلاک ۱۸، طبقه همکف"}
        />
      </Row>
    </div>
  );
};
export default LocationInfoSection;
