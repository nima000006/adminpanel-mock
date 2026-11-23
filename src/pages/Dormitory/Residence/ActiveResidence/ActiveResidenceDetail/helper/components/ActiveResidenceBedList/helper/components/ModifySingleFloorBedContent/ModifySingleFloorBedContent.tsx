import { Col, Row } from "antd";

import { CustomInput } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ModifySingleFloorBedContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/components/ModifySingleFloorBedContent/@types/@modifySingleFloorBedContentTypes";

const ModifySingleFloorBedContent = ({
  id,
  bedTypeTitle,
  bedDetailData,
}: ModifySingleFloorBedContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      {/* اطلاعات پایه */}
      <div className="flex flex-col gap-4">
        <CustomDivider text="اطلاعات پایه" />

        <Row gutter={[16, 16]}>
          {id !== "-1" ? (
            <SingleVerticalWithCol
              md={12}
              lg={12}
              xl={12}
              label="کد تخت"
              value={bedDetailData?.bedNumber}
            />
          ) : null}

          <SingleVerticalWithCol
            md={12}
            lg={12}
            xl={12}
            label="نوع تخت"
            value={bedTypeTitle}
          />
        </Row>
      </div>

      {/* اطلاعات تخت */}
      <CustomDivider text="اطلاعات تخت" />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomInput name="bedTitle" label="عنوان تخت" />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomInput name="bedNo" label="شماره اموال" />
        </Col>
      </Row>
    </div>
  );
};
export default ModifySingleFloorBedContent;
