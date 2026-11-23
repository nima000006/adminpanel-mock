import { useState } from "react";

import { Form } from "antd";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import { useCreateVendorBasicInfoStepMutation } from "@infra/states/redux/Apis/shop/vendors/vendorsApi";
import { GENERAL_SUBMIT_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";
import {
  CreateVendorBasicInfoStepResponse,
  ShopAllVendorsListAddDrawerBasicInfoFormType,
  ShopAllVendorsListAddDrawerContentProps,
  ShopAllVendorsListAddDrawerContractFormType,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/drawer/ShopAllVendorsListAddDrawerContent/@types/@shopAllVendorsListAddDrawerContent";
import ShopAllVendorsListAddDrawerBasicInfoStep from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/drawer/ShopAllVendorsListAddDrawerContent/helper/components/ShopAllVendorsListAddDrawerBasicInfoStep/ShopAllVendorsListAddDrawerBasicInfoStep";
import ShopAllVendorsListAddDrawerContractStep from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/drawer/ShopAllVendorsListAddDrawerContent/helper/components/ShopAllVendorsListAddDrawerContractStep/ShopAllVendorsListAddDrawerContractStep";

const ShopAllVendorsListAddDrawerContent = ({
  onCloseDrawer,
  getAllVendorsListHandler,
}: ShopAllVendorsListAddDrawerContentProps) => {
  const [current, setCurrent] = useState(0);
  const [createdVendorUuid, setCreatedVendorUuid] = useState<string | null>(null);
  const [isContractConfirmModalOpen, setIsContractConfirmModalOpen] = useState(false);
  const [basicInfoForm] = Form.useForm<ShopAllVendorsListAddDrawerBasicInfoFormType>();
  const [contractForm] = Form.useForm<ShopAllVendorsListAddDrawerContractFormType>();

  //? ================================ Api Calls ================================
  const [createVendorBasicInfoStep, { isLoading: isCreateVendorBasicInfoStepLoading }] =
    useCreateVendorBasicInfoStepMutation();

  //* ================================ Util Functions ================================
  const onCreateVendorBasicInfoStepSuccess = async (
    response: CreateVendorBasicInfoStepResponse
  ) => {
    setCreatedVendorUuid(response.uuid);
    toast.success(GENERAL_SUBMIT_SUCCESS, {
      toastId: GENERAL_SUBMIT_SUCCESS,
    });
    setCurrent(1);
  };

  const continueStepHandler = async () => {
    const values = await basicInfoForm.validateFields();

    createVendorBasicInfoStep({
      faTitle: values.vendorName,
      businessId: Number(values.business?.item?.id ?? values.business?.value),
      branchId: Number(values.branch?.item?.id ?? values.branch?.value),
      tehranEnabled: true,
      tehranCost: Number(values.tehranShippingCost ?? 0) * 10, // ارسال به صورت ریال
      tehranMinDeliveryDays: Number(values.tehranMinShippingDays ?? 0),
      tehranMaxDeliveryDays: Number(values.tehranMaxShippingDays ?? 0),
      otherCitiesEnabled: true,
      otherCitiesCost: Number(values.otherCitiesShippingCost ?? 0) * 10,
      otherCitiesMinDeliveryDays: Number(values.otherCitiesMinShippingDays ?? 0),
      otherCitiesMaxDeliveryDays: Number(values.otherCitiesMaxShippingDays ?? 0),
    })
      .unwrap()
      .then(onCreateVendorBasicInfoStepSuccess);
  };

  const confirmContractHandler = async () => {
    await contractForm.validateFields();
    setIsContractConfirmModalOpen(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex h-full flex-col">
      <CustomDrawerHeader
        title="افزودن تامین‌کننده"
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          current === 0 ? (
            <>
              <CustomButton onClick={onCloseDrawer}>انصراف</CustomButton>
              <CustomButton
                type="primary"
                onClick={continueStepHandler}
                loading={isCreateVendorBasicInfoStepLoading}
              >
                ثبت و ادامه
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton onClick={onCloseDrawer}>انصراف</CustomButton>
              <CustomButton type="primary" onClick={confirmContractHandler}>
                ثبت و تایید
              </CustomButton>
            </>
          )
        }
      />

      <CustomSteps
        current={current}
        className="[&>div]:p-0!"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات پایه",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "قرارداد",
          },
        ]}
      />

      {current === 0 && <ShopAllVendorsListAddDrawerBasicInfoStep form={basicInfoForm} />}

      {current === 1 && (
        <ShopAllVendorsListAddDrawerContractStep
          key={createdVendorUuid ?? "contract-step"}
          form={contractForm}
          supplierUuid={createdVendorUuid}
          isConfirmModalOpen={isContractConfirmModalOpen}
          onCloseConfirmModal={() => setIsContractConfirmModalOpen(false)}
          onCloseDrawer={onCloseDrawer}
          getAllVendorsListHandler={getAllVendorsListHandler}
        />
      )}
    </div>
  );
};

export default ShopAllVendorsListAddDrawerContent;
