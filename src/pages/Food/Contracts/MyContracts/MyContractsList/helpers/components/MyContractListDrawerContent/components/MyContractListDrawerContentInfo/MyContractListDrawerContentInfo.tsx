import { Col } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { AiOutlinePercentage } from "react-icons/ai";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { validateTotalPercentage } from "@pages/Food/Contracts/_Shared/utils/ContractListUtils";

import { myContractListDrawerContentInfoTypes } from "./@types/@myContractListDrawerContentInfoTypes";

export default function MyContractListDrawerContentInfo({
  isMyVendorListListLoading,
  isMyRestaurantDataLoading,
  form,
  vendorData,
  restaurantData,
  contractStartDate,
  setContractStartDate,
}: myContractListDrawerContentInfoTypes) {
  //* ================================ Util Functions ================================
  //Selecting Date of starting contract
  const handleStartDateChange = (date: Dayjs | null) => {
    // حالت clear
    if (!date) {
      setContractStartDate(null);
      form.setFieldsValue({ contractStart: undefined });
      return;
    }

    setContractStartDate(date);

    form.setFieldsValue({
      contractStart: date.toISOString(),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="عنوان قرارداد"
          name="contractTitle"
          placeholder="عنوان قرارداد"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(100)]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="تأمین کننده"
          name="vendor"
          placeholder="انتخاب کنید"
          options={vendorData}
          loading={isMyVendorListListLoading}
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="سلف"
          name="self"
          placeholder="انتخاب کنید"
          options={restaurantData}
          loading={isMyRestaurantDataLoading}
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="شماره قرارداد"
          name="contractNo"
          placeholder="شماره قرارداد"
          rules={[REQUIRED_RULE, NUMBER_RULE, MAX_LENGTH_RULE(20)]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomDatePicker
          label="شروع قرارداد"
          placeholder="انتخاب کنید"
          name="contractStart"
          rules={[REQUIRED_RULE]}
          form={form}
          disabledDate={(current) => {
            return current && current < dayjs().startOf("day");
          }}
          onChange={(date: unknown, _: string | string[] | null) =>
            handleStartDateChange(date as Dayjs)
          }
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomDatePicker
          label="پایان قرارداد"
          placeholder="انتخاب کنید"
          name="contractEnd"
          rules={[REQUIRED_RULE]}
          form={form}
          disabledDate={(current) => {
            if (contractStartDate) {
              return current && current < contractStartDate;
            }
          }}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="درصد تأمین کننده"
          name="vendorPercentage"
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
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="درصد دانشجویار"
          name="providerPercentage"
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
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="درصد دانشگاه"
          name="restaurantPercentage"
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
      <Col span={24}>
        <CustomTextArea
          label="توضیحات"
          name="contractDescription"
          placeholder="توضیحات"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
          maxLength={500}
          showCount
        />
      </Col>
    </>
  );
}
