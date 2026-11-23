import { Col, Row } from "antd";

import { CustomInput } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ModifySingleFloorBedDrawerContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/components/ModifySingleFloorBedDrawerContent/@types/@modifySingleFloorBedDrawerContentTypes";

const ModifySingleFloorBedDrawerContent = ({
  id,
}: ModifySingleFloorBedDrawerContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <div>
        {id === "-1" ? "ایجاد تخت برای اقامتگاه" : "ویرایش تخت برای اقامتگاه"}
        <span className="text-neutral-13 font-bold">{"خوابگاه شهید چمران"}</span> در
        ساختمان <span className="text-neutral-13 font-bold">{"شهید بهشتی"}</span> در طبقه{" "}
        <span className="text-neutral-13 font-bold">{"همکف"}</span> در واحد اقامتی{" "}
        <span className="text-neutral-13 font-bold">
          {"عنوان واحد اقامتی (نوع واحد اقامتی)"}
        </span>
      </div>

      {/* اطلاعات پایه */}
      <div className="flex flex-col gap-4">
        <CustomDivider text="اطلاعات پایه" />

        <Row gutter={[16, 16]}>
          {id !== "-1" ? (
            <SingleVerticalWithCol md={12} lg={12} xl={12} label="کد تخت" value={""} />
          ) : null}

          <SingleVerticalWithCol md={12} lg={12} xl={12} label="نوع تخت" value={""} />
        </Row>
      </div>

      {/* اطلاعات تخت */}
      <CustomDivider text="اطلاعات تخت" />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomInput name="unitTitle" label="عنوان تخت" />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomInput name="unitTitle" label="شماره اموال" />
        </Col>
      </Row>
    </div>
  );
};
export default ModifySingleFloorBedDrawerContent;
