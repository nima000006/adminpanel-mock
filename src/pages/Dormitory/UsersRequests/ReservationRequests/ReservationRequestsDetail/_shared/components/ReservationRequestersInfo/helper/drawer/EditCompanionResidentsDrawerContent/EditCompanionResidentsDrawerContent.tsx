import { Col, Form, Row } from "antd";
import { PiTrash, PiUser } from "react-icons/pi";

const mockData = [
  {
    id: 1,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
  },
  {
    id: 2,
    name: " نرگس امامی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
  },
  {
    id: 3,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
  },
  {
    id: 3,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
  },
];

import {
  CustomButton,
  CustomDatePicker,
  CustomInput,
  CustomRadioGroup,
} from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { EditCompanionResidentsDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/helper/drawer/EditCompanionResidentsDrawerContent/@types/@editCompanionResidentsDrawerContentTypes";
import {
  NATIONALITY,
  NATIONALITY_OPTIONS,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";

const EditCompanionResidentsDrawerContent = ({
  closeDrawerHandler,
}: EditCompanionResidentsDrawerContentProps) => {
  //* ================================ Util Functions ================================
  const submitBtnHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="ویرایش ساکنین همراه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-2">
            <CustomButton loading={false} onClick={closeDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton type="primary" loading={false} onClick={submitBtnHandler}>
              ثبت تغییرات
            </CustomButton>
          </div>
        }
      />

      <div className="flex flex-col gap-10">
        <Form className="flex flex-col gap-6">
          <CustomDivider text="ساکنین همراه" />
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomDatePicker
                label="تاریخ تولد"
                placeholder="تاریخ"
                name="birthDate"
                // form={form}
                defaultValue=""
                // key={}
                rules={[REQUIRED_RULE]}
              />
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="کد ملی"
                name="nationalCode"
                placeholder="تلفن ثابت منزل"
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>
        </Form>

        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomRadioGroup
              name="nationality"
              label="ملیت"
              hasVerticalLabel
              rules={[REQUIRED_RULE]}
              initialValue={NATIONALITY.iranianNationality}
              options={NATIONALITY_OPTIONS}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomButton type="primary" block loading={false}>
              افزودن و استعلام
            </CustomButton>
          </Col>
        </Row>

        {mockData?.map((item) => (
          <div>
            <CustomDivider
              text={
                <div className="flex items-center gap-2">
                  <PiUser /> <span>{item?.name}</span>
                </div>
              }
              extraContent={
                <div className="cursor-pointer rounded-[6px] border border-[#F5222D] p-1">
                  <PiTrash size={16} color="#F5222D" />
                </div>
              }
            />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                md={12}
                label="تاریخ تولد"
                value={item?.birthDate}
              />
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                md={12}
                label="کد ملی"
                value={item?.nationalCode}
              />
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                md={12}
                label="نام پدر"
                value={item?.fatherName}
              />
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                md={12}
                label="جنسیت"
                value={item?.gender}
              />
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCompanionResidentsDrawerContent;
