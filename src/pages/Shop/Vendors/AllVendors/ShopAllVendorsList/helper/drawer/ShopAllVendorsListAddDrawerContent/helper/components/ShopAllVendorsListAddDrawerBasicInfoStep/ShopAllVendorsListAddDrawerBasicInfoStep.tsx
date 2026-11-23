import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import { CustomInput, CustomInputNumber, CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ShopAllVendorsListAddDrawerBasicInfoStepProps } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/drawer/ShopAllVendorsListAddDrawerContent/helper/components/ShopAllVendorsListAddDrawerBasicInfoStep/@types/@shopAllVendorsListAddDrawerBasicInfoStep";

const ShopAllVendorsListAddDrawerBasicInfoStep = ({
  form,
}: ShopAllVendorsListAddDrawerBasicInfoStepProps) => {
  const business = Form.useWatch("business", form);
  const businessId =
    business?.item?.id != null
      ? Number(business.item.id)
      : business?.value != null
        ? Number(business.value)
        : undefined;

  //? ================================ Api Calls ================================
  // business
  const [
    getActiveBusinessList,
    {
      data: businessData,
      isFetching: isGetActiveBusinessListLoading,
      isSuccess: isGetActiveBusinessListSuccess,
    },
  ] = useLazyGetActiveBusinessListQuery();

  // branch
  const [
    getBranchByBusiness,
    { data: branchData, isFetching: isGetBranchByBusinessLoading },
  ] = useLazyGetBranchByBusinessQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!businessId) return;

    getBranchByBusiness({ businessIds: [businessId] });
  }, [businessId]);

  //* ================================ Util Functions ================================
  const getBusinessHandler = () => {
    if (!isGetActiveBusinessListSuccess) {
      getActiveBusinessList();
    }
  };

  const getBranchHandler = () => {
    if (!businessId) return;

    getBranchByBusiness({ businessIds: [businessId] });
  };

  const onBusinessChangeHandler = () => {
    form.setFieldValue("branch", undefined);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      className="flex flex-1 flex-col gap-6 overflow-auto p-10"
      layout="vertical"
    >
      <CustomDivider text="اطلاعات پایه تامین‌کننده" />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <CustomInput
            name="vendorName"
            label="نام فروشنده"
            placeholder="وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col xs={24} md={12}>
          <CustomSelect
            name="business"
            label="کسب و کار"
            form={form}
            options={businessData ?? []}
            isLoading={isGetActiveBusinessListLoading}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
            onClick={getBusinessHandler}
            onChange={onBusinessChangeHandler}
          />
        </Col>
        <Col xs={24} md={12}>
          <CustomSelect
            name="branch"
            label="شعبه / واحد"
            form={form}
            options={branchData ?? []}
            isLoading={isGetBranchByBusinessLoading}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
            disabled={!businessId}
            onClick={getBranchHandler}
          />
        </Col>
      </Row>

      <CustomDivider text="تنظیمات ارسال" />

      <div className="flex flex-col gap-5">
        <CustomDivider text="ارسال به تهران" />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="tehranShippingCost"
              label="هزینه ارسال"
              placeholder="وارد نمایید"
              addonAfter="تومان"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="tehranMinShippingDays"
              label="حداقل زمان ارسال"
              placeholder="وارد نمایید"
              addonAfter="روز کاری"
              min={1}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="tehranMaxShippingDays"
              label="حداکثر زمان ارسال"
              placeholder="وارد نمایید"
              addonAfter="روز کاری"
              min={1}
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>

        <CustomDivider text="ارسال به شهرستان" />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="otherCitiesShippingCost"
              label="هزینه ارسال"
              placeholder="وارد نمایید"
              addonAfter="تومان"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="otherCitiesMinShippingDays"
              label="حداقل زمان ارسال"
              placeholder="وارد نمایید"
              addonAfter="روز کاری"
              min={1}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="otherCitiesMaxShippingDays"
              label="حداکثر زمان ارسال"
              placeholder="وارد نمایید"
              addonAfter="روز کاری"
              min={1}
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default ShopAllVendorsListAddDrawerBasicInfoStep;
