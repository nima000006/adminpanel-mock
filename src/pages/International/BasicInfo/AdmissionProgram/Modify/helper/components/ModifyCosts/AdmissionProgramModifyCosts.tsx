import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useCreateInternationalAdmissionFeesInformationMutation,
  useLazyGetInternationalAdmissionDetailCostIfoQuery,
  useLazyGetInternationalAllCurrenciesQuery,
  useLazyGetInternationalAllPrServiceQuery,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GetInternationalAdmissionDetailCostInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailCosts/@types/@admissionProgramDetailCosts";

import { SelectItemType, TempDataType } from "./@types/@admissionProgramModifyCosts";
import CostItemElement from "./helper/components/CostItemElement/CostItemElement";
import { AdmissionProgramModifyStepsProps } from "../../../@types/@admissionProgramModify";
import "./_admissionProgramModifyCosts.scss";

const AdmissionProgramModifyCosts = ({
  setCurrent,
}: AdmissionProgramModifyStepsProps) => {
  const [currency, setCurrency] = useState<SelectItemType | null>(null);

  const [costItems, setCostsItems] = useState<{ id: number; title: string }[]>([]);

  const {
    params: { id, stepNo, copiedId },
  } = useQueryParams();

  const [form] = Form.useForm();

  //? ================================  Api Calls =============================
  const [
    getCurrenciesData,
    { data: currenciesData, isFetching: isCurrenciesDataLoading },
  ] = useLazyGetInternationalAllCurrenciesQuery();

  const [getServiceType, { data: serviceTypeData, isFetching: isServiceTypeLoading }] =
    useLazyGetInternationalAllPrServiceQuery();

  const [getData] = useLazyGetInternationalAdmissionDetailCostIfoQuery();

  const [createFeeInfo, { isLoading: isCreateFeeInfoLoading }] =
    useCreateInternationalAdmissionFeesInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+stepNo === 4 && copiedId) {
      getData(copiedId).unwrap().then(getDataSuccess); // copy
    } else {
      getData(id).unwrap().then(getDataSuccess);
    }
  }, [id, copiedId]);

  useEffect(() => {
    getCurrenciesData();
    getServiceType();
  }, []);

  //* ================================ Util Functions ================================

  const getDataSuccess = async (
    value: GetInternationalAdmissionDetailCostInfoResponse
  ) => {
    setCostsItems(
      value?.map((item) => ({ id: item?.serviceTypeId, title: item?.serviceTypeTitle }))
    );
    value?.forEach((item) => {
      const isDiscountPercent = item?.percentDiscount !== null;
      form.setFieldsValue({
        [`${item?.serviceTypeId}cost`]: item?.cost,
        [`${item?.serviceTypeId}tax`]: item?.tax ? item?.tax * 100 : null,
        [`${item?.serviceTypeId}duty`]: item?.duty ? item?.duty * 100 : null,
        [`${item?.serviceTypeId}discount`]: isDiscountPercent
          ? item?.percentDiscount * 100
          : item?.fixDiscount,
        [`${item?.serviceTypeId}unit`]: isDiscountPercent
          ? selectDefaultValueGenerator({
              title: "%",
              id: 1,
            })
          : selectDefaultValueGenerator({
              title: "دلار",
              id: 2,
            }),
      });
    });
    form.setFieldsValue({
      servicesItems: selectDefaultValueGenerator(
        value?.map((item) => ({
          id: item?.serviceTypeId,
          title: item?.serviceTypeTitle,
        }))
      ),
      currency: selectDefaultValueGenerator({
        id: value?.[0]?.currencyTypeId,
        title: value?.[0]?.currencyTypeTitle,
      }),
    });
    setCurrency({
      label: value?.[0]?.currencyTypeTitle,
      title: value?.[0]?.currencyTypeTitle,
      value: value?.[0]?.currencyTypeId?.toString(),
      key: value?.[0]?.currencyTypeId,
      item: {
        title: value?.[0]?.currencyTypeTitle,
        id: value?.[0]?.currencyTypeId,
      },
      code: value?.[0]?.currencyTypeId,
    });
  };

  const servicesChangeHandler = (data: SelectItemType[]) => {
    setCostsItems(data?.map((i) => i.item));
  };

  const changeCurrencyHandler = (item: SelectItemType) => {
    setCurrency(item);
  };

  const prevBtnClickHandler = () => {
    setCurrent(2);
  };
  const registerBtnClickHandler = () => {
    form.submit();
    form.validateFields().then((value) => {
      const services = value?.servicesItems;
      const currency = value?.currency;

      delete value?.servicesItems;
      delete value?.currency;

      const objKeys = Object.keys(value);

      const tempData: any = [];
      services.forEach((service: SelectItemType, index: number) => {
        tempData.push({ serviceTypeId: service.code, serviceTypeTitle: service.label });
        objKeys.forEach((key) => {
          if (key.includes(service.code?.toString())) {
            tempData[index][key.split(service?.code?.toString())[1]] = value[key];
          }
        });
      });
      const reqBody = tempData.map((item: TempDataType) => {
        // check discount unit
        const isDiscountPercent = !item?.unit || item?.unit?.code === 1;
        const discountPercentValue = item.discount ? item.discount / 100 : null;

        return {
          unitPrice: item?.cost, // هزینه
          measureUnit: currency?.label, // واحد پول
          dutyRate: item?.duty ? item?.duty / 100 : null, // عوارض
          percentDiscount: isDiscountPercent ? discountPercentValue : null, // تخفیف
          fixedDiscount: !isDiscountPercent ? item?.discount : null, // تخفیف
          serviceId: item?.serviceTypeId, // آیدی خدمات
          taxRate: item?.tax ? item?.tax / 100 : null, // مالیات
          financialRuleId: 1, //  در بک اند فقط عدد یک وجود دارد.
        };
      });
      if (id) {
        createFeeInfo({
          ruleId: +id,
          currencyId: currency?.code,
          serviceRequests: reqBody,
        })
          .unwrap()
          .then((value: any) => {
            if (value?.error?.data?.message) {
              toast.error(value?.error?.data?.message, {
                toastId: value?.error?.data?.message,
              });
            } else {
              setCurrent(4);
            }
          });
      }
    });
  };

  return (
    <Form
      className="international-admission-program-modify-costs-info-container"
      form={form}
    >
      <div className="costs-info-container">
        <div>
          <CustomDivider text="هزینه‌ها" />
          <Row gutter={[16, 16]}>
            <Col lg={8} md={8} sm={12} xs={24}>
              <CustomSelect
                label="واحد پول"
                name="currency"
                placeholder="انتخاب کنید"
                options={currenciesData}
                rules={[CUSTOM_REQUIRED_RULE("")]}
                loading={isCurrenciesDataLoading}
                onChange={(_, item) => changeCurrencyHandler(item as SelectItemType)}
                form={form}
              />
            </Col>
            <Col lg={8} md={8} sm={12} xs={24}>
              <CustomSelect
                label="لیست خدمات"
                name="servicesItems"
                placeholder="انتخاب کنید"
                options={
                  serviceTypeData
                    ? serviceTypeData?.map((item) => ({
                        id: item?.prServiceId,
                        title: item?.prServiceTitle,
                      }))
                    : []
                }
                rules={[CUSTOM_REQUIRED_RULE("")]}
                form={form}
                loading={isServiceTypeLoading}
                onChange={(_, data) => servicesChangeHandler(data as SelectItemType[])}
                mode="multiple"
              />
            </Col>
          </Row>
        </div>
        {costItems?.map((item) => (
          <CostItemElement
            key={item?.id}
            title={item?.title}
            prefix={item?.id}
            currency={currency?.title ? currency?.title : ""}
            form={form}
          />
        ))}
      </div>
      <div className="action-btn-container">
        <CustomButton icon={<AiOutlineArrowRight />} onClick={prevBtnClickHandler}>
          بازگشت
        </CustomButton>
        <CustomButton
          icon={<AiOutlineArrowLeft />}
          htmlType="submit"
          iconPlacement="end"
          type="primary"
          onClick={registerBtnClickHandler}
          loading={isCreateFeeInfoLoading}
        >
          ثبت نهایی
        </CustomButton>
      </div>
    </Form>
  );
};

export default AdmissionProgramModifyCosts;
