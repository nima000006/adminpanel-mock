import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetDormGenderTypesQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  NUMBER_MAX_LENGTH_RULE,
  NUMBER_RULE,
  PERSIAN_LETTERS_RULE,
  REQUIRED_NO_SPACE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { BuildingInfoProps } from "./@types/@buildingInfo";

const BOY_GIRL_GENDER_ID = 26; // اگر خوابگاه پسرانه / دخترانه باشد

const BuildingInfo = ({ residenceTitle, buildingForm }: BuildingInfoProps) => {
  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getGenderTypes,
    { data: genderData, isFetching: isGenderDataLoading, isSuccess: isGenderSuccess },
  ] = useLazyGetDormGenderTypesQuery();

  //Todo[Atefeh]:delete if not needed in the future
  // const [
  //   getQualityTypes,
  //   { data: qualityData, isFetching: isQualityDataLoading, isSuccess: isQualitySuccess },
  // ] = useLazyGetDormQualityTypesQuery();

  //* ================================ Util Functions ================================
  // جنسیت
  const getGenderHandler = () => {
    if (!isGenderSuccess) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  //Todo[Atefeh]:delete if not needed in the future
  // درجه کیفی
  // const getQualityHandler = () => fetchDataIfNeeded(!isQualitySuccess, getQualityTypes);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol label="اقامتگاه" value={residenceTitle} />
      <Col lg={6} md={8} sm={12} xs={24}>
        <CustomInput
          name="buildingname"
          label="نام ساختمان"
          placeholder="نام ساختمان"
          rules={[REQUIRED_NO_SPACE_RULE, PERSIAN_LETTERS_RULE]}
        />
      </Col>
      {params?.buildingId || +params?.genderId !== BOY_GIRL_GENDER_ID ? (
        <SingleVerticalWithCol label="جنسیت" value={params?.genderTitle} />
      ) : (
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="gender"
            label="جنسیت"
            placeholder="انتخاب کنید"
            form={buildingForm}
            options={genderData?.data ? genderData?.data : []}
            loading={isGenderDataLoading}
            onClick={getGenderHandler}
            rules={[REQUIRED_RULE]}
          />
        </Col>
      )}

      <SingleVerticalWithCol label="درجه کیفی" value={params?.qualityTitle} />
      {/* //Todo[Atefeh]:delete if not needed in the future */}
      {/* <Col lg={6} md={8} sm={12} xs={24}>
        <CustomSelect
          name="quality"
          label="درجه کیفی"
          placeholder="انتخاب کنید"
          form={buildingForm}
          options={qualityData ? qualityData?.data : []}
          loading={isQualityDataLoading}
          onClick={getQualityHandler}
          rules={[REQUIRED_RULE]}
        />
      </Col> */}
      <Col lg={6} md={8} sm={12} xs={24}>
        <CustomInputNumber
          name="buildingArea"
          label="مساحت زیربنای ساختمان (متر مربع)"
          placeholder="مساحت زیربنای ساختمان"
          rules={[REQUIRED_RULE, NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea
          name="buildingDesc"
          label="توضیحات ساختمان"
          placeholder="توضیحات ساختمان"
          maxLength={100}
          showCount
        />
      </Col>
    </Row>
  );
};

export default BuildingInfo;
