import { Row } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const InternationalPersonsInterViewerDetailsViewDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  return (
    <div>
      <CustomDrawerHeader title="مشاهده" closeDrawerHandler={closeDrawerHandler} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نام مصاحبه کننده"
          value="سینا"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نام خانوادگی مصاحبه کننده"
          value="سوجه"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="کد ملی "
          value="0021116190"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="شماره موبایل"
          value="09122455910"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="واحد دانشگاهی"
          value="تهران شمال"
        />
      </Row>
    </div>
  );
};
export default InternationalPersonsInterViewerDetailsViewDrawerContent;
