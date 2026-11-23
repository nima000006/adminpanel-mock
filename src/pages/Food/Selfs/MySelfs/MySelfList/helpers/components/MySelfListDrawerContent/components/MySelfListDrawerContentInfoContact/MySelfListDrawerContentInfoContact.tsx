import { useState } from "react";

import { Col, Row } from "antd";
import { toast } from "react-toastify";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import {
  useGetProvinceQuery,
  useLazyGetCityQuery,
} from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  CityType,
  GetCityResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import { MySelfListDrawerContentInfoContactProps } from "./@types/MySelfListDrawerContentInfoContactProps";

const MySelfListDrawerContentInfoContact = ({
  form,
  lng,
  setLng,
  lat,
  setLat,
  rerenderTrigger,
  isProvinceSelected,
  setIsProvinceSelected,
}: MySelfListDrawerContentInfoContactProps) => {
  const [cityList, setCityList] = useState<CityType[]>([]);

  //? ================================  Api Calls ================================

  const { data: getProvinceListData, isLoading: getProvinceListLoading } =
    useGetProvinceQuery();

  const [getCityList, { isFetching: getCityListLoading }] = useLazyGetCityQuery();

  //* ================================ Util Functions ================================
  const getCityListSuccess = async (value: GetCityResponse) => {
    if (value?.status === 200) {
      setCityList(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const onProvinceChangeHandler = (event: unknown) => {
    getCityList({ stateId: event as string })
      .unwrap()
      .then(getCityListSuccess);
    setIsProvinceSelected(true);
    form.setFieldsValue({ city: [] });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      <div className="info-contact-divider">
        <CustomDivider text="اطلاعات تماس" />
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={8} sm={12} xs={24}>
          <CustomSelect
            name="province"
            label="استان"
            options={getProvinceListData?.data ? getProvinceListData?.data : []}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={getProvinceListLoading}
            onChange={onProvinceChangeHandler}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <CustomSelect
            name="city"
            label="شهر"
            options={cityList}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={getCityListLoading}
            rules={[REQUIRED_RULE]}
            disabled={!isProvinceSelected}
          />
        </Col>

        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کدپستی"
            name="postalCode"
            placeholder="10 رقمی"
            rules={[REQUIRED_RULE, NUMBER_RULE, POSTAL_CODE_RULE]}
          />
        </Col>

        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره تلفن 1"
            name="phoneOne"
            placeholder="02112345678"
            rules={[REQUIRED_RULE, NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
          />
        </Col>
        <Col span={24}>
          <CustomInput
            type="text"
            label="آدرس"
            name="address"
            placeholder="آدرس"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(500)]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CustomMap
            className="my-self-map-container"
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            triggerRerender={rerenderTrigger}
          />
        </Col>
      </Row>
    </>
  );
};
export default MySelfListDrawerContentInfoContact;
