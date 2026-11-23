import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import { CustomInputNumber, CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import {
  useCreateAllSendingSettingsMutation,
  useGetAdminSuppliersQuery,
  useUpdateAllSendingSettingsMutation,
} from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  ShopAllSendingSettingsDefineFormType,
  ShopAllSendingSettingsDefineModalProps,
} from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/helper/modals/ShopAllSendingSettingsDefineModal/@types/@shopAllSendingSettingsDefineModal";

const INITIAL_VALUES: ShopAllSendingSettingsDefineFormType = {
  tehranShippingCost: null,
  tehranMinDeliveryDays: null,
  tehranMaxDeliveryDays: null,
  townshipShippingCost: null,
  townshipMinDeliveryDays: null,
  townshipMaxDeliveryDays: null,
};

const ShopAllSendingSettingsDefineModal = ({
  open,
  onCancel,
  onSuccess,
  record,
}: ShopAllSendingSettingsDefineModalProps) => {
  const [form] = Form.useForm<ShopAllSendingSettingsDefineFormType>();
  const [selectedSupplierUuid, setSelectedSupplierUuid] = useState<string>("");
  const [isSupplierOptionsOpen, setIsSupplierOptionsOpen] = useState(false);
  const isEditMode = Boolean(record);

  //? ================================  Api Calls ================================
  const [createAllSendingSettings, { isLoading: isCreateAllSendingSettingsLoading }] =
    useCreateAllSendingSettingsMutation();

  const [updateAllSendingSettings, { isLoading: isUpdateAllSendingSettingsLoading }] =
    useUpdateAllSendingSettingsMutation();

  const { data: getAdminSuppliersData, isFetching: isGetAdminSuppliersLoading } =
    useGetAdminSuppliersQuery(
      {
        pageNumber: 0,
        pageSize: 100,
      },
      {
        skip: !open || !isSupplierOptionsOpen || isEditMode,
        refetchOnMountOrArgChange: true,
      }
    );

  const sellerOptionsFromApi =
    getAdminSuppliersData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  const sellerOptions: { id: string; title: string }[] =
    isEditMode && record
      ? [{ id: record.supplierUuid, title: record.supplierTitle }]
      : sellerOptionsFromApi;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!open) {
      setSelectedSupplierUuid("");
      setIsSupplierOptionsOpen(false);
      return;
    }

    if (record) {
      setSelectedSupplierUuid(record.supplierUuid);
      form.setFieldsValue({
        supplierUuid: record.supplierUuid,
        tehranShippingCost: record.tehranCost,
        tehranMinDeliveryDays: record.tehranMinDeliveryDays,
        tehranMaxDeliveryDays: record.tehranMaxDeliveryDays,
        townshipShippingCost: record.otherCitiesCost,
        townshipMinDeliveryDays: record.otherCitiesMinDeliveryDays,
        townshipMaxDeliveryDays: record.otherCitiesMaxDeliveryDays,
      });
      return;
    }

    setSelectedSupplierUuid("");
    setIsSupplierOptionsOpen(false);
    form.setFieldsValue(INITIAL_VALUES);
  }, [form, open, record]);

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    form.resetFields();
    setSelectedSupplierUuid("");
    setIsSupplierOptionsOpen(false);
    onCancel();
  };

  const onSupplierChange = (value: unknown) => {
    setSelectedSupplierUuid(value as string);
  };

  const onSupplierOptionsOpenChange = (visible: boolean) => {
    setIsSupplierOptionsOpen(visible);
  };

  const confirmHandler = async () => {
    const values = await form.validateFields();

    const tehranEnabled = record?.tehranEnabled ?? true;
    const otherCitiesEnabled = record?.otherCitiesEnabled ?? true;

    const payload = {
      tehranEnabled,
      tehranCost: values.tehranShippingCost ?? 0,
      tehranMinDeliveryDays: values.tehranMinDeliveryDays ?? 0,
      tehranMaxDeliveryDays: values.tehranMaxDeliveryDays ?? 0,
      otherCitiesEnabled,
      otherCitiesCost: values.townshipShippingCost ?? 0,
      otherCitiesMinDeliveryDays: values.townshipMinDeliveryDays ?? 0,
      otherCitiesMaxDeliveryDays: values.townshipMaxDeliveryDays ?? 0,
    };

    const request = record?.uuid
      ? updateAllSendingSettings({
          uuid: record.uuid,
          body: payload,
        })
      : createAllSendingSettings({
          supplierUuid: selectedSupplierUuid!,
          ...payload,
        });

    await request.unwrap().then(() => {
      form.resetFields();
      setSelectedSupplierUuid("");
      onSuccess?.();
      onCancel();
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomModal
      open={open}
      onCancel={cancelHandler}
      title={isEditMode ? "ویرایش تنظیمات ارسال" : "تعریف تنظیمات ارسال"}
      size="large"
      variant="form"
      confirmText="ثبت"
      cancelText="انصراف"
      onConfirm={confirmHandler}
      className="[&_.ant-modal-body]:px-0!"
      confirmLoading={
        isCreateAllSendingSettingsLoading || isUpdateAllSendingSettingsLoading
      }
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        className="flex flex-col gap-5"
        initialValues={INITIAL_VALUES}
      >
        <CustomSelect
          name="supplierUuid"
          label="فروشنده"
          placeholder="انتخاب فروشنده"
          options={sellerOptions}
          form={form}
          rules={[REQUIRED_RULE]}
          isLoading={isGetAdminSuppliersLoading}
          onChange={onSupplierChange}
          onOpenChange={onSupplierOptionsOpenChange}
          disabled={isEditMode}
        />

        <CustomDivider titlePlacement="right" text="ارسال به تهران" />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="tehranShippingCost"
              label="هزینه ارسال"
              placeholder="مثلاً 130,000"
              isPrice
              suffix="تومان"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="tehranMinDeliveryDays"
              label="حداقل زمان ارسال"
              placeholder="مثلاً 3"
              suffix="روز کاری"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="tehranMaxDeliveryDays"
              label="حداکثر زمان ارسال"
              placeholder="مثلاً 4"
              suffix="روز کاری"
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>

        <CustomDivider titlePlacement="right" text="ارسال به شهرستان" />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="townshipShippingCost"
              label="هزینه ارسال"
              placeholder="مثلاً 250,000"
              isPrice
              suffix="تومان"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="townshipMinDeliveryDays"
              label="حداقل زمان ارسال"
              placeholder="مثلاً 7"
              suffix="روز کاری"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInputNumber
              name="townshipMaxDeliveryDays"
              label="حداکثر زمان ارسال"
              placeholder="مثلاً 10"
              suffix="روز کاری"
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};

export default ShopAllSendingSettingsDefineModal;
