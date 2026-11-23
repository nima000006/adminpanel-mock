import { useEffect } from "react";

import { Form } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ShopVendorBeneficiaryFormContentProps } from "@pages/Shop/Vendors/_shared/helper/components/ShopVendorBeneficiaryFormContent/@types/@shopVendorBeneficiaryFormContent";

const ShopVendorBeneficiaryFormContent = ({
  form,
  showAlert = false,
}: ShopVendorBeneficiaryFormContentProps) => {
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
    form?.setFieldValue("branch", undefined);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="flex flex-col gap-6" layout="vertical">
      {showAlert && (
        <CustomAlert
          type="info"
          showIcon
          className="border border-dashed! font-medium"
          title="کسب و کار و شعبه / واحد ذینفع را مشخص نمایید."
        />
      )}

      <CustomSelect
        name="business"
        label="کسب و کار ذینفع"
        form={form}
        options={businessData ?? []}
        isLoading={isGetActiveBusinessListLoading}
        rules={[REQUIRED_RULE]}
        placeholder="انتخاب کنید"
        onClick={getBusinessHandler}
        onChange={onBusinessChangeHandler}
      />

      <CustomSelect
        name="branch"
        label="شعبه / واحد ذینفع"
        form={form}
        options={branchData ?? []}
        isLoading={isGetBranchByBusinessLoading}
        rules={[REQUIRED_RULE]}
        placeholder="انتخاب کنید"
        disabled={!businessId}
        onClick={getBranchHandler}
      />
    </Form>
  );
};

export default ShopVendorBeneficiaryFormContent;
