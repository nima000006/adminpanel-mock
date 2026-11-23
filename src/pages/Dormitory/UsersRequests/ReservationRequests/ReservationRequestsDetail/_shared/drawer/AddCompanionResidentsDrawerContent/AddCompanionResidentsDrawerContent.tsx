import { useState } from "react";

import { Col, Row } from "antd";
import { PiTrash, PiUser } from "react-icons/pi";

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
import { AddCompanionResidentsDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/AddCompanionResidentsDrawerContent/@types/@addCompanionResidentsDrawerContentTypes";
import {
  NATIONALITY,
  NATIONALITY_OPTIONS,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";

const AddCompanionResidentsDrawerContent = ({
  closeDrawerHandler,
}: AddCompanionResidentsDrawerContentProps) => {
  const [isEstelamSuccess, setIsEstelamSuccess] = useState(false);

  //* ================================ Util Functions ================================
  const estelamHandler = () => {
    // اگر جواب استعلام مو فق بود
    setIsEstelamSuccess(true);
  };

  const submitFormHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="افزودن ساکنین همراه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton loading={false} onClick={closeDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton type="primary" loading={false} onClick={submitFormHandler}>
              ثبت و تایید همراهان
            </CustomButton>
          </div>
        }
      />

      <div>
        <CustomDivider text="ساکنین همراه" />
        <Row gutter={[16, 32]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomDatePicker
              label="تاریخ تولد"
              placeholder="تاریخ"
              name="birthDate"
              //   form={form}
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
              placeholder="کدملی/فراگیر"
              rules={[REQUIRED_RULE]}
            />
          </Col>

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
            <CustomButton
              className="p-4!"
              type="primary"
              block
              loading={false}
              onClick={estelamHandler}
            >
              افزودن و استعلام
            </CustomButton>
          </Col>
        </Row>
      </div>

      {isEstelamSuccess && (
        <div>
          <CustomDivider
            text={
              <div className="flex items-center gap-2">
                <PiUser /> <span> پدر</span>
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
              sm={12}
              label="تاریخ تولد"
              value={"1990/01/01"}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={12}
              label="کد ملی"
              value={"1234567890"}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={12}
              label="نام پدر"
              value={"اکبر"}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={12}
              label="جنسیت"
              value={"خانم"}
            />
          </Row>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default AddCompanionResidentsDrawerContent;
