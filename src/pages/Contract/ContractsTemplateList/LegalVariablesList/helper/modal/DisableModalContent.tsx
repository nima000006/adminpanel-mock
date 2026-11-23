import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const DisableModalContent = () => {
  return (
    <Row gutter={[12, 12]} className="mt-5!">
      <SingleVerticalWithCol
        xl={24}
        lg={24}
        label="مسئول غیرفعال سازی"
        value={"شیرین نجفی"}
      />
      <SingleVerticalWithCol
        xl={24}
        lg={24}
        label="تاریخ ثبت غیرفعال سازی"
        value="1404/10/6"
        isDate
      />
      <SingleVerticalWithCol
        xl={24}
        lg={24}
        label="تاریخ اعمال غیرفعال سازی"
        value="1404/10/6"
        isDate
      />
      <SingleVerticalWithCol
        xl={24}
        lg={24}
        label="علت غیرفعال سازی"
        value="1404/10/6"
        isDate
      />
      <SingleVerticalWithCol
        xl={24}
        lg={24}
        label="توضیحات"
        value="متن توضیحات غیر فعال سازی "
      />
    </Row>
  );
};
export default DisableModalContent;
