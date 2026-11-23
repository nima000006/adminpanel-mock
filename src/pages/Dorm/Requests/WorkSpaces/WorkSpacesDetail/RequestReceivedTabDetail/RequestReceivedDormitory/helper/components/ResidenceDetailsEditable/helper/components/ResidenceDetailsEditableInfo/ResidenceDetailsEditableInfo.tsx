import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormGenderTypesQuery,
  useLazyGetDormQualityTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
  useLazyGetResidenceTypeQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import {
  HOME_PHONE_RULE,
  NUMBER_MAX_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { GetPlacesAroundDormitoryResponse } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import { residenceDetailsEditableInfoTypes } from "./@types/@residenceDetailsEditableInfoTypes";

const ResidenceDetailsEditableInfo = ({
  getPlacesAroundDormitory,
  setPlaceData,
  form,
}: residenceDetailsEditableInfoTypes) => {
  const [activeCity, setActiveCity] = useState(true);
  //? ================================  Api Calls ================================
  const [
    getResidenceType,
    {
      data: residenceTypeData,
      isFetching: isResidenceTypeLoading,
      isSuccess: isResidenceTypeSuccess,
    },
  ] = useLazyGetResidenceTypeQuery();

  const [
    getQualityTypes,
    { data: qualityData, isFetching: isQualityDataLoading, isSuccess: isQualitySuccess },
  ] = useLazyGetDormQualityTypesQuery();

  const [
    getAllUniversity,
    {
      data: universityData,
      isLoading: isUniversityDataLoading,
      isSuccess: isUniversitySuccess,
    },
  ] = useLazyGetAllBranchesQuery();

  const [
    getGenderTypes,
    { data: genderData, isFetching: isGenderDataLoading, isSuccess: isGenderSuccess },
  ] = useLazyGetDormGenderTypesQuery();

  const [getProvince, { data: getProvinceListData, isFetching: getProvinceListLoading }] =
    useLazyGetDormProvinceListQuery();

  const [getCityList, { data: getCityListData, isFetching: getCityListLoading }] =
    useLazyGetDormCityListQuery();

  //? ================================  Effects ================================
  useEffect(() => {
    getProvince({ firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    getPlacesAroundDormitory({
      //we should set 0 and 2000 as a default and  if showInActiveData: false dont pass recordStatus_EQ
      firstResult: 0,
      maxResults: 2000,
      showInActiveData: false,
    })
      .unwrap()
      .then(getPlacesAroundDormitorySuccess);
  }, []);
  //* ================================ Util Functions ================================

  //نوع اقامتگاه
  const getResidenceTypeHandler = () => {
    if (!isResidenceTypeSuccess) {
      //we should set 0 and 2000 as a default and  if showInActiveData: false dont pass recordStatus_EQ
      getResidenceType({ firstResult: 0, maxResults: 2000, showInActiveData: false });
    }
  };

  //درجه کیفی
  const getQualityHandler = () => {
    if (!isQualitySuccess) {
      getQualityTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  //جنسیت
  const getGenderHandler = () => {
    if (!isGenderSuccess) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  //واحد
  const getBranchHandler = () => {
    if (!isUniversitySuccess) {
      getAllUniversity();
    }
  };

  //استان
  const onProvinceChangeHandler = (provinceId: string) => {
    getCityList({ parentId_IN: +provinceId, firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    setActiveCity(false);
    form.setFieldsValue({ city: [] });
  };
  const getPlacesAroundDormitorySuccess = (value: GetPlacesAroundDormitoryResponse) => {
    if (value?.status === 200) {
      setPlaceData(value?.data);
    }
  };
  //* ================================ Util Functions ================================

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="نام اقامتگاه"
            name="residenceName"
            placeholder="نام اقامتگاه"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomSelect
            name="residenceType"
            label="نوع اقامتگاه"
            form={form}
            options={residenceTypeData?.data ? residenceTypeData?.data : []}
            onClick={getResidenceTypeHandler}
            loading={isResidenceTypeLoading}
            placeholder="انتخاب کنید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomSelect
            name="quality"
            label="درجه کیفی"
            placeholder="انتخاب کنید"
            form={form}
            options={qualityData ? qualityData?.data : []}
            loading={isQualityDataLoading}
            onClick={getQualityHandler}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="ظرفیت اسمی (نفر)"
            name="capacity"
            placeholder="ظرفیت اسمی (نفر)"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomSelect
            name="branch"
            label="واحد"
            placeholder="انتخاب کنید"
            options={universityData ? universityData : []}
            loading={isUniversityDataLoading}
            form={form}
            onClick={getBranchHandler}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomSelect
            name="gender"
            label="جنسیت"
            placeholder="انتخاب کنید"
            form={form}
            options={genderData?.data ? genderData?.data : []}
            loading={isGenderDataLoading}
            onClick={getGenderHandler}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInputNumber
            name="area"
            label="مساحت کل خوابگاه (متر مربع)"
            placeholder="مساحت کل خوابگاه"
            rules={[REQUIRED_RULE, NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInputNumber
            name="greenSpaceArea"
            label="مساحت فضای سبز (متر مربع)"
            placeholder="مساحت فضای سبز"
            rules={[NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomSelect
            name="province"
            label="استان"
            options={getProvinceListData?.data ? getProvinceListData?.data : []}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={getProvinceListLoading}
            onChange={(provinceId) => onProvinceChangeHandler(provinceId as string)}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomSelect
            name="city"
            label="شهر"
            options={getCityListData?.data ? getCityListData?.data : []}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={getCityListLoading}
            rules={[REQUIRED_RULE]}
            disabled={activeCity}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomInput
            name="postalCode"
            label="کد پستی"
            placeholder="کد پستی"
            rules={[REQUIRED_RULE, POSTAL_CODE_RULE]}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomInput
            name="phone"
            label="شماره تلفن"
            placeholder="شماره تلفن"
            rules={[REQUIRED_RULE, HOME_PHONE_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomInput
            name="address"
            label="آدرس"
            placeholder="آدرس"
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </>
  );
};
export default ResidenceDetailsEditableInfo;
