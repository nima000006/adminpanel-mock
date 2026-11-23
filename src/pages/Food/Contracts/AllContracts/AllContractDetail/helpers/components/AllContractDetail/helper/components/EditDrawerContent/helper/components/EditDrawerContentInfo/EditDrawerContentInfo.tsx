import { Col, Row } from "antd";
import { AiOutlinePercentage } from "react-icons/ai";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import {
  MAX_LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { validateTotalPercentage } from "@pages/Food/Contracts/_Shared/utils/ContractListUtils";

import { EditDrawerContentInfoPropsType } from "./@types/EditDrawerContentInfoPropsType";

const EditDrawerContentInfo = ({
  vendorData,
  isAllVendorListListLoading,
  restaurantData,
  isAllRestaurantDataLoading,
  form,
}: EditDrawerContentInfoPropsType) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomInput
            name="title"
            label="عنوان قرارداد"
            placeholder="عنوان قرارداد"
            rules={[REQUIRED_RULE, MAX_LENGTH_RULE(100)]}
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomSelect
            name="vendor"
            label="تأمین کننده"
            placeholder="تأمین کننده"
            options={vendorData}
            rules={[REQUIRED_RULE]}
            loading={isAllVendorListListLoading}
            disabled
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomSelect
            name="self"
            label="سلف"
            placeholder="سلف"
            options={restaurantData}
            rules={[REQUIRED_RULE]}
            loading={isAllRestaurantDataLoading}
            disabled
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomInput
            name="contractNo"
            label="شماره قرارداد"
            placeholder="شماره قرارداد"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomDatePicker
            name="contractStartDate"
            label="شروع قرارداد"
            placeholder="شروع قرارداد"
            rules={[REQUIRED_RULE]}
            form={form}
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomDatePicker
            name="contractEndDate"
            label="پایان قرارداد"
            placeholder="پایان قرارداد"
            rules={[REQUIRED_RULE]}
            form={form}
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomInput
            name="vendorPercentage"
            label="درصد تأمین کننده"
            placeholder="درصد تأمین کننده"
            prefix={<AiOutlinePercentage className="percentage" />}
            dependencies={["providerPercentage", "restaurantPercentage"]}
            rules={[
              REQUIRED_RULE,
              NUMBER_RULE,
              ({ getFieldValue }) => ({
                validator: validateTotalPercentage(getFieldValue),
              }),
            ]}
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomInput
            name="providerPercentage"
            label="درصد دانشجویار"
            placeholder="درصد دانشجویار"
            prefix={<AiOutlinePercentage className="percentage" />}
            dependencies={["restaurantPercentage", "vendorPercentage"]}
            rules={[
              REQUIRED_RULE,
              NUMBER_RULE,
              ({ getFieldValue }) => ({
                validator: validateTotalPercentage(getFieldValue),
              }),
            ]}
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <CustomInput
            name="restaurantPercentage"
            label="درصد دانشگاه"
            placeholder="درصد دانشگاه"
            prefix={<AiOutlinePercentage className="percentage" />}
            dependencies={["vendorPercentage", "providerPercentage"]}
            rules={[
              REQUIRED_RULE,
              NUMBER_RULE,
              ({ getFieldValue }) => ({
                validator: validateTotalPercentage(getFieldValue),
              }),
            ]}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <CustomTextArea
          label="توضیحات"
          name="description"
          placeholder="توضیحات"
          rules={[REQUIRED_RULE]}
        />
      </Row>
    </>
  );
};
export default EditDrawerContentInfo;
