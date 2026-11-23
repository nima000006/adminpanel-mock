import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, Form } from "antd";
import { PiStorefront, PiTruck } from "react-icons/pi";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useEditShippingSettingsMutation,
  useLazyGetVendorProfileDetailQuery,
} from "@infra/states/redux/Apis/shop/vendors/vendorsApi";
import { GENERAL_SUBMIT_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";
import { ShopAllVendorsDetailBaseInfoEditShippingFormType } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailBaseInfo/helper/modal/ShopAllVendorsDetailBaseInfoEditShippingModalContent/@types/@shopAllVendorsDetailBaseInfoEditShippingModalContent";
import ShopAllVendorsDetailBaseInfoEditShippingModalContent from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailBaseInfo/helper/modal/ShopAllVendorsDetailBaseInfoEditShippingModalContent/ShopAllVendorsDetailBaseInfoEditShippingModalContent";

const formatDeliveryDays = (min?: number, max?: number) => {
  if (min == null && max == null) return undefined;
  if (min != null && max != null) return `${min} تا ${max} روز کاری`;
  if (min != null) return `${min} روز کاری`;
  return `${max} روز کاری`;
};

const ShopAllVendorsDetailBaseInfo = () => {
  const { params } = useQueryParams();
  const [form] = Form.useForm<ShopAllVendorsDetailBaseInfoEditShippingFormType>();
  const [isEditShippingModalOpen, setIsEditShippingModalOpen] = useState(false);

  //? ================================ Api Calls ================================
  // get vendor profile detail
  const [
    getVendorProfileDetail,
    { data: getVendorProfileDetailData, isFetching: isGetVendorProfileDetailLoading },
  ] = useLazyGetVendorProfileDetailQuery();

  // edit shipping settings
  const [editShippingSettings, { isLoading: isEditShippingSettingsLoading }] =
    useEditShippingSettingsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getVendorProfileDetailHandler();
  }, [params?.id]);

  //* ================================ Util Functions ================================
  const getVendorProfileDetailHandler = () => {
    if (!params?.id) return;

    getVendorProfileDetail({ supplierUuid: params.id });
  };

  const shippingMethod = getVendorProfileDetailData?.shippingMethods?.[0];

  const openEditShippingModalHandler = () => {
    form?.setFieldsValue({
      tehranShippingCost:
        shippingMethod?.tehranCost != null ? shippingMethod.tehranCost / 10 : null,
      tehranMinShippingDays: shippingMethod?.tehranMinDeliveryDays,
      tehranMaxShippingDays: shippingMethod?.tehranMaxDeliveryDays,
      otherCitiesShippingCost:
        shippingMethod?.otherCitiesCost != null
          ? shippingMethod.otherCitiesCost / 10
          : null,
      otherCitiesMinShippingDays: shippingMethod?.otherCitiesMinDeliveryDays,
      otherCitiesMaxShippingDays: shippingMethod?.otherCitiesMaxDeliveryDays,
    });
    setIsEditShippingModalOpen(true);
  };

  const closeEditShippingModalHandler = () => {
    form.resetFields();
    setIsEditShippingModalOpen(false);
  };

  const onEditShippingSettingsSuccess = async () => {
    closeEditShippingModalHandler();
    toast.success(GENERAL_SUBMIT_SUCCESS, {
      toastId: GENERAL_SUBMIT_SUCCESS,
    });
    getVendorProfileDetailHandler();
  };

  const confirmEditShippingHandler = async () => {
    if (!shippingMethod?.uuid) return;

    const values = await form.validateFields();

    editShippingSettings({
      uuid: shippingMethod.uuid,
      tehranEnabled: true,
      tehranCost: Number(values.tehranShippingCost ?? 0) * 10,
      tehranMinDeliveryDays: Number(values.tehranMinShippingDays ?? 0),
      tehranMaxDeliveryDays: Number(values.tehranMaxShippingDays ?? 0),
      otherCitiesEnabled: true,
      otherCitiesCost: Number(values.otherCitiesShippingCost ?? 0) * 10,
      otherCitiesMinDeliveryDays: Number(values.otherCitiesMinShippingDays ?? 0),
      otherCitiesMaxDeliveryDays: Number(values.otherCitiesMaxShippingDays ?? 0),
    })
      .unwrap()
      .then(onEditShippingSettingsSuccess);
  };

  //* ================================ Descriptions Items ================================
  const vendorInfoItems: DescriptionsProps["items"] = [
    {
      key: "vendorName",
      label: "نام فروشنده",
      children: dataPlaceHolder({ data: getVendorProfileDetailData?.title }),
    },
  ];

  const shippingSettingsItems: DescriptionsProps["items"] = [
    {
      key: "tehranShippingCost",
      label: "هزینه ارسال تهران",
      children: dataPlaceHolder({
        data: shippingMethod?.tehranCost,
        isPrice: true,
        isRial: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
    },
    {
      key: "tehranShippingTime",
      label: "زمان ارسال تهران",
      children: dataPlaceHolder({
        data: formatDeliveryDays(
          shippingMethod?.tehranMinDeliveryDays,
          shippingMethod?.tehranMaxDeliveryDays
        ),
      }),
    },
    {
      key: "otherCitiesShippingCost",
      label: "هزینه ارسال شهرستان",
      children: dataPlaceHolder({
        data: shippingMethod?.otherCitiesCost,
        isPrice: true,
        isRial: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
    },
    {
      key: "otherCitiesShippingTime",
      label: "زمان ارسال شهرستان",
      children: dataPlaceHolder({
        data: formatDeliveryDays(
          shippingMethod?.otherCitiesMinDeliveryDays,
          shippingMethod?.otherCitiesMaxDeliveryDays
        ),
      }),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isEditShippingModalOpen && (
        <ConfirmationModalWithContent
          title="ویرایش تنظیمات ارسال"
          isModalOpen={isEditShippingModalOpen}
          confirmBtnText="ثبت تغییرات"
          backBtnText="انصراف"
          showIcon={false}
          width={760}
          closeModalHandler={closeEditShippingModalHandler}
          onConfirmClickHandler={confirmEditShippingHandler}
          isConfirmButtonLoading={isEditShippingSettingsLoading}
          content={<ShopAllVendorsDetailBaseInfoEditShippingModalContent form={form} />}
        />
      )}

      <Div loading={isGetVendorProfileDetailLoading}>
        <div className="flex flex-col gap-6">
          <CustomDivider
            text={
              <span className="flex items-center gap-2">
                <PiStorefront size={20} />
                اطلاعات فروشنده
              </span>
            }
          />
          <Descriptions
            column={1}
            items={vendorInfoItems}
            styles={{ label: { width: "min(200px, 40%)" } }}
          />

          <CustomDivider
            text={
              <span className="flex items-center gap-2">
                <PiTruck size={20} />
                تنظیمات ارسال
              </span>
            }
            extraContent={
              <CustomButton type="default" onClick={openEditShippingModalHandler}>
                ویرایش
              </CustomButton>
            }
          />
          <Descriptions
            column={{ xs: 1, sm: 1, md: 2 }}
            items={shippingSettingsItems}
            styles={{ label: { width: "min(200px, 60%)" } }}
          />
        </div>
      </Div>
    </>
  );
};

export default ShopAllVendorsDetailBaseInfo;
