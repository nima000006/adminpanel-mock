import { useEffect } from "react";

import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { BuildingLocationProps } from "./BuildingLocation/BuildingLocation";

const BuildingLocation = ({
  buildingForm,
  activeCity,
  setActiveCity,
  mapData: { lat, setLat, lng, setLng },
}: BuildingLocationProps) => {
  //? ================================  Api Calls ================================
  const [getProvince, { data: getProvinceListData, isFetching: getProvinceListLoading }] =
    useLazyGetDormProvinceListQuery();

  const [getCityList, { data: getCityListData, isFetching: getCityListLoading }] =
    useLazyGetDormCityListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getProvince({ firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
  }, []);

  //* ================================ Util Functions ================================
  const onProvinceChangeHandler = (provinceId: string) => {
    getCityList({ parentId_IN: +provinceId, firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    setActiveCity(false);
    buildingForm.setFieldsValue({ city: undefined });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="location-info">
      <CustomDivider text="موقعیت مکانی" />
      <Row gutter={[16, 16]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="province"
            label="استان"
            options={getProvinceListData?.data ? getProvinceListData?.data : []}
            placeholder="انتخاب کنید"
            form={buildingForm}
            isLoading={getProvinceListLoading}
            onChange={(provinceId) => onProvinceChangeHandler(provinceId as string)}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="city"
            label="شهر"
            options={getCityListData?.data ? getCityListData?.data : []}
            placeholder="انتخاب کنید"
            form={buildingForm}
            isLoading={getCityListLoading}
            rules={[REQUIRED_RULE]}
            disabled={activeCity}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            name="postalCode"
            label="کد پستی"
            placeholder="کد پستی"
            rules={[REQUIRED_RULE, NUMBER_RULE, POSTAL_CODE_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره تلفن"
            name="phoneNumber"
            rules={[REQUIRED_RULE, NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
          />
        </Col>
        <Col span={24}>
          <CustomInput
            type="text"
            label="آدرس"
            name="address"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(500)]}
          />
        </Col>
        <Col span={24}>
          <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
        </Col>
      </Row>
    </div>
  );
};

export default BuildingLocation;
