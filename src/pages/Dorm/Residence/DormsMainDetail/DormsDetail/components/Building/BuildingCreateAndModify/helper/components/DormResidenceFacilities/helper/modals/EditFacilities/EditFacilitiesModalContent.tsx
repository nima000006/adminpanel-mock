import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetDormResidenceFacilityListWithTypeIdQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";

import { EditFacilitiesModalContentProps } from "./@types/@editFacilitiesModalContent";

const EditFacilitiesModalContent = ({
  form,
  facilityTypeData,
  facilityData,
}: EditFacilitiesModalContentProps) => {
  const [activeTitle, setActiveTitle] = useState(false);
  const [unitTitle, setUnitTitle] = useState(facilityData?.unit || "-");

  //? ================================  Api Calls ================================
  const [getFacilityList, { data: facilityListData, isFetching: isFacilityListLoading }] =
    useLazyGetDormResidenceFacilityListWithTypeIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (facilityData?.type?.id) {
      getFacilityList({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
        facilityTypeId_EQ: facilityData?.type?.id?.toString(),
        title_LIKE: "",
      });
    }
    form.setFieldsValue({
      facilityType: selectDefaultValueGenerator(facilityData?.type),
      facilityTitle: selectDefaultValueGenerator(facilityData?.title),
      amount: facilityData?.amount,
    });
  }, []);
  //* ================================ Util Functions ================================
  const onFacilityTypeHandler = (event: unknown) => {
    if (event) {
      getFacilityList({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
        facilityTypeId_EQ: event as string,
        title_LIKE: "",
      });
      setActiveTitle(false);
      form.setFieldsValue({ facilityTitle: undefined });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <CustomSelect
            name="facilityType"
            label="نوع امکان"
            options={facilityTypeData ? facilityTypeData : []}
            placeholder="انتخاب کنید"
            form={form}
            onChange={onFacilityTypeHandler}
            rules={[CUSTOM_REQUIRED_RULE("لطفاً نوع امکان را انتخاب بفرمایید.")]}
          />
        </Col>
        <Col span={12}>
          <CustomSelect
            name="facilityTitle"
            label="عنوان امکان"
            options={facilityListData?.data ? facilityListData?.data : []}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={isFacilityListLoading}
            onChange={() => {
              setUnitTitle(form.getFieldsValue()?.facilityTitle?.item?.unit || "-");
            }}
            disabled={activeTitle}
            rules={[CUSTOM_REQUIRED_RULE("لطفاً عنوان امکان را انتخاب بفرمایید.")]}
          />
        </Col>
        <Col span={12}>
          <CustomInput
            name="amount"
            label="مقدار (اختیاری)"
            placeholder="چه تعداد از این امکان وجود دارد؟"
          />
        </Col>
        <Col span={12}>
          <SingleVerticalItem label="واحد اندازه گیری" value={unitTitle} />
        </Col>
      </Row>
    </Form>
  );
};

export default EditFacilitiesModalContent;
