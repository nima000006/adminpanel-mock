import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";

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
import { DORM_TARIFFS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetAllCurrencyQuery,
  useLazyGetAllDormitoryQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useGetTariffBasicInfoStepMutation } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import {
  MAX_LENGTH_RULE,
  NUMBER_RULE,
  PERSIAN_LETTERS_RULE,
  REQUIRED_NO_SPACE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import {
  BasicInfoStepPropsType,
  GetTariffBasicInfoStepResponse,
} from "./@types/@basicInfoStepPropsType";

import "./_basicInfoStep.scss";

const BasicInfoStep = ({
  setCurrentStep,
  form,
  setIsLastDormId,
}: BasicInfoStepPropsType) => {
  const navigate = useNavigate();
  const { params, setSearchParams } = useQueryParams();

  const { id } = params;

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

  // Request
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
      if (setIsLastDormId) {
        setIsLastDormId(value.data.AssociationDormitory.id);
      }

      setSearchParams({
        ...params,
        dormitoryId: value?.data?.AssociationDormitory?.id?.toString(),
      });
      form.setFieldsValue({
        uni: selectDefaultValueGenerator(value?.data?.AssociationBranchid),
        dormitory: selectDefaultValueGenerator(value?.data?.AssociationDormitory),
        currency: selectDefaultValueGenerator(value?.data?.AssociationCurrencyId),
        tax: value?.data?.tax,
        toll: value?.data?.toll,
        desc: value?.data?.description,
        startDate: value?.data?.appliedStartDate,
        startTime: timeDefaultValueGenerator(value?.data?.appliedStartTime),
        endDate: value?.data?.appliedEndDate,
        endTime: timeDefaultValueGenerator(value?.data?.appliedEndTime),
      });
    }
  };

  // btn handler
  const nextLevelBtnHandler = () => {
    form?.submit();
    form.validateFields().then(() => {
      setCurrentStep(1);
    });
  };

  const cancelBtnHandler = () => {
    navigate(DORM_TARIFFS_LIST_PAGE_ROUTE);
  };

  //lazy load
  const getAllUniversityHandler = () => {
    if (!isUniversityDataSuccess) {
      getAllUniversity();
    }
  };

  const getDormitoryHandler = (dormId: string) => {
    setSearchParams({
      ...params,
      dormitoryId: dormId,
    });
    if (!isDormitoryDataSuccess) {
      getAllDormitory({ maxResults: 2000, firstResult: 0 });
    }
  };

  const getAllCurrencyHandler = () => {
    if (!isCurrencyDataSuccess) {
      getAllCurrency({ maxResults: 2000, firstResult: 0 });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isBasicInfoDetailLoading}>
      <Form form={form} className="dorm-basic-info-step-container">
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="عنوان"
              name="title"
              placeholder="عنوان"
              rules={[REQUIRED_NO_SPACE_RULE, MAX_LENGTH_RULE(64), PERSIAN_LETTERS_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="uni"
              label="واحد دانشگاهی"
              options={universityData ? universityData : []}
              loading={isUniversityDataLoading}
              placeholder="انتخاب کنید"
              form={form}
              onClick={getAllUniversityHandler}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="dormitory"
              label="اقامتگاه"
              options={dormitoryData?.data?.map((item) => {
                return item;
              })}
              loading={isDormitoryDataLoading}
              placeholder="انتخاب کنید"
              form={form}
              onChange={(value) => getDormitoryHandler(value as string)}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="currency"
              label="واحد پول"
              options={currencyData?.data?.map((item) => {
                return item;
              })}
              loading={isCurrencyDataLoading}
              placeholder="انتخاب کنید"
              form={form}
              rules={[REQUIRED_RULE]}
              onChange={getAllCurrencyHandler}
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
              name="desc"
              placeholder="توضیحات"
              maxLength={100}
              showCount
            />
          </Col>
        </Row>

        <section>
          <CustomDivider text="زمان بندی" />
          <Row gutter={[16, 16]}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomDatePicker
                label="تاریخ شروع اعمال موثر"
                defaultValue={basicInfoStepDetail?.data?.appliedStartDate}
                placeholder="انتخاب کنید"
                name="startDate"
                form={form}
                rules={[REQUIRED_RULE]}
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
                rules={[REQUIRED_RULE]}
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
        </section>

        <div className="tariff-copy-btn-wrapper">
          <CustomButton type="primary" onClick={nextLevelBtnHandler}>
            مرحله بعد
          </CustomButton>
          <CustomButton type="primary" ghost onClick={cancelBtnHandler}>
            انصراف
          </CustomButton>
        </div>
      </Form>
    </Div>
  );
};
export default BasicInfoStep;
