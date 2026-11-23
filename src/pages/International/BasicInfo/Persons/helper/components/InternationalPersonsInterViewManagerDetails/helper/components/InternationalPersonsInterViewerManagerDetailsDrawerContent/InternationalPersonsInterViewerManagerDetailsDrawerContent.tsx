import { Col, Row } from "antd";
import { PiMagnifyingGlass } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { InternationalPersonsInterViewerManagerDetailsDrawerContentPropsTypes } from "./@types/InternationalPersonsInterViewerManagerDetailsDrawerContentPropsTypes";

const InternationalPersonsInterViewerManagerDetailsDrawerContent = ({
  closeDrawerHandler,
}: InternationalPersonsInterViewerManagerDetailsDrawerContentPropsTypes) => {
  return (
    <div>
      <CustomDrawerHeader
        title="افزودن مصاحبه کننده جدید"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={<CustomButton type="primary">افزودن</CustomButton>}
      />
      <Row gutter={[16, 16]}>
        <Col lg={24} xl={24} md={24} xs={24}>
          <CustomInput label="کد ملی" placeholder="کد ملی مصاحبه کننده را وارد نمایید." />
        </Col>
        <Col lg={24} xl={24} md={24} xs={24}>
          <CustomButton
            className="w-full"
            icon={<PiMagnifyingGlass />}
            iconPlacement="end"
          >
            جستجو
          </CustomButton>
        </Col>
      </Row>
      <CustomDivider text="مشخصات" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="نام مصاحبه کننده"
          value="سینا"
          xl={12}
          lg={12}
          md={12}
        />
        <SingleVerticalWithCol
          label="نام خانوادگی مصاحبه کننده"
          value="سوجه"
          xl={12}
          lg={12}
          md={12}
        />
        <SingleVerticalWithCol
          label="شماره موبایل"
          value="۰۹۱۲۲۴۵۵۹۱۰"
          xl={12}
          lg={12}
          md={12}
        />
        <SingleVerticalWithCol
          label="واحد دانشگاهی"
          value="تهران شمال"
          xl={12}
          lg={12}
          md={12}
        />
      </Row>
    </div>
  );
};
export default InternationalPersonsInterViewerManagerDetailsDrawerContent;
