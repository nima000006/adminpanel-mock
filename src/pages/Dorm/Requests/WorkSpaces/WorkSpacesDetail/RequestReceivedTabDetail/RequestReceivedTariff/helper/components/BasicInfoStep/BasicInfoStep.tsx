import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import {
  selectDefaultValueGenerator,
  timeDefaultValueGenerator,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllCurrencyQuery,
  useLazyGetAllDormitoryQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useGetTariffBasicInfoStepMutation } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { NUMBER_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GetTariffBasicInfoStepResponse } from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/BasicInfoStep/@types/@basicInfoStepPropsType";

import { BasicInfoStepProps } from "./@types/@basicInfoStep";

import "./_basicInfoStep.scss";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

const BasicInfoStep = ({ setCurrentStep, setEditMode, form }: BasicInfoStepProps) => {
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  // get uni list
  const [
    getAllUniversity,
    {
      data: universityData,
      isLoading: isUniversityDataLoading,
      isSuccess: isUniversityDataSuccess,
    },
  ] = useLazyGetAllBranchesQuery();

  // get dormitory list
  const [
    getAllDormitory,
    {
      data: dormitoryData,
      isLoading: isDormitoryDataLoading,
      isSuccess: isDormitoryDataSuccess,
    },
  ] = useLazyGetAllDormitoryQuery();

  // get currency list
  const [
    getAllCurrency,
    {
      data: currencyData,
      isLoading: isCurrencyDataLoading,
      isSuccess: isCurrencyDataSuccess,
    },
  ] = useLazyGetAllCurrencyQuery();

  // get default data
  const [
    getBasicInfoStepDetail,
    { data: basicInfoStepDetail, isLoading: isBasicInfoDetailLoading },
  ] = useGetTariffBasicInfoStepMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    getAllUniversity();
    getAllDormitory({ maxResults: 2000, firstResult: 0 });
    getAllCurrency({ maxResults: 2000, firstResult: 0 });
  }, []);

  //* ================================ Util Functions ================================
  const getData = () => {
    getBasicInfoStepDetail({
      body: {
        _data_: {
          id: id,
        },
      },
      params: {
        relation: "6d2a8d8abe4a419b851bd51345e48356",
      }, //we should set this to get data
    })
      .unwrap()
      .then(getBasicInfoDetailIsSuccess);
  };

  // success
  const getBasicInfoDetailIsSuccess = async (value: GetTariffBasicInfoStepResponse) => {
    if (value?.status === 200) {
      form.setFieldsValue({
        title: value?.data?.title,
        uni: selectDefaultValueGenerator(value?.data?.AssociationBranchid),
        dormitory: selectDefaultValueGenerator(value?.data?.AssociationDormitory),
        currency: selectDefaultValueGenerator(value?.data?.AssociationCurrencyId),
        tax: value?.data?.tax,
        toll: value?.data?.toll,
        description: value?.data?.description,
        startDate: value?.data?.appliedStartDate,
        startTime: timeDefaultValueGenerator(value?.data?.appliedStartTime),
        endDate: value?.data?.appliedEndDate,
        endTime: timeDefaultValueGenerator(value?.data?.appliedEndTime),
      });
    }
  };

  //lazy load
  const getAllUniversityHandler = () => {
    if (!isUniversityDataSuccess) {
      getAllUniversity();
    }
  };

  const getDormitoryHandler = () => {
    if (!isDormitoryDataSuccess) {
      getAllDormitory({ maxResults: 2000, firstResult: 0 });
    }
  };

  const getAllCurrencyHandler = () => {
    if (!isCurrencyDataSuccess) {
      getAllCurrency({ maxResults: 2000, firstResult: 0 });
    }
  };

  // btn handler
  const nextLevelBtnHandler = () => {
    form?.submit();
    setCurrentStep(1);
  };
  const cancelBtnHandler = () => {
    setEditMode(false);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isBasicInfoDetailLoading}>
      <Form form={form} className="work-spaces-basic-info-step-container">
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="عنوان"
              name="title"
              placeholder="عنوان"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="uni"
              label="واحد دانشگاهی"
              options={universityData ? universityData : []}
              loading={isUniversityDataLoading}
              onClick={getAllUniversityHandler}
              placeholder="انتخاب کنید"
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="dormitory"
              label="اقامتگاه"
              options={dormitoryData?.data?.map((item: any) => {
                return item;
              })}
              loading={isDormitoryDataLoading}
              onChange={getDormitoryHandler}
              placeholder="انتخاب کنید"
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="currency"
              label="واحد پول"
              options={currencyData?.data?.map((item: any) => {
                return item;
              })}
              loading={isCurrencyDataLoading}
              onChange={getAllCurrencyHandler}
              placeholder="انتخاب کنید"
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="مالیات(%)"
              name="tax"
              placeholder="مالیات"
              rules={[NUMBER_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="عوارض(%)"
              name="toll"
              placeholder="عوارض"
              rules={[NUMBER_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              placeholder="توضیحات"
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>

        <div className="scheduling">
          <CustomDivider text="زمان بندی" />
          <Row gutter={[16, 16]}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomDatePicker
                label="تاریخ شروع اعمال موثر"
                defaultValue={basicInfoStepDetail?.data?.appliedStartDate}
                placeholder="انتخاب کنید"
                name="startDate"
                form={form}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomTimePicker
                label="ساعت شروع اعمال موثر"
                name="startTime"
                placeholder="انتخاب کنید"
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomDatePicker
                label="تاریخ پایان اعمال موثر"
                placeholder="انتخاب کنید"
                name="endDate"
                form={form}
                defaultValue={basicInfoStepDetail?.data?.appliedEndDate}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomTimePicker
                label="ساعت پایان اعمال موثر"
                name="endTime"
                placeholder="انتخاب کنید"
              />
            </Col>
          </Row>
        </div>

        <div className="btn-wrapper">
          <CustomButton type="primary" onClick={nextLevelBtnHandler}>
            مرحله بعد
          </CustomButton>
          <CustomButton type="primary" ghost onClick={cancelBtnHandler}>
            خروج از حالت ویرایش
          </CustomButton>
        </div>
      </Form>
    </Div>
  );
};
export default BasicInfoStep;
