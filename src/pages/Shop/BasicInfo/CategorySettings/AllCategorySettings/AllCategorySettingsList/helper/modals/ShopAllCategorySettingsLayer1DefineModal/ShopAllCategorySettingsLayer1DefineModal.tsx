import { useEffect } from "react";

import { Form } from "antd";

import { CustomInput } from "@components/CustomInputs";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { useCreateCategoryLevel1Mutation } from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { PERSIAN_LETTERS_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  ShopAllCategorySettingsLayer1DefineFormType,
  ShopAllCategorySettingsLayer1DefineModalProps,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/ShopAllCategorySettingsLayer1DefineModal/@types/@shopAllCategorySettingsLayer1DefineModal";

const INITIAL_VALUES: ShopAllCategorySettingsLayer1DefineFormType = {
  title: "",
};

const ShopAllCategorySettingsLayer1DefineModal = ({
  open,
  onCancel,
  onSuccess,
  layerTitle,
}: ShopAllCategorySettingsLayer1DefineModalProps) => {
  const [form] = Form.useForm<ShopAllCategorySettingsLayer1DefineFormType>();

  //? ================================  Api Calls ================================
  const [createCategoryLevel1, { isLoading: isCreateCategoryLevel1Loading }] =
    useCreateCategoryLevel1Mutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!open) return;
    form.setFieldsValue(INITIAL_VALUES);
  }, [form, open]);

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    form.resetFields();
    onCancel();
  };

  const confirmHandler = async () => {
    const values = await form.validateFields();

    await createCategoryLevel1({
      faTitle: values.title,
    })
      .unwrap()
      .then(() => {
        form.resetFields();
        onSuccess?.();
        onCancel();
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomModal
      open={open}
      onCancel={cancelHandler}
      title={`تعریف ${layerTitle}`}
      size="medium"
      variant="form"
      confirmText="ثبت"
      cancelText="انصراف"
      onConfirm={confirmHandler}
      confirmLoading={isCreateCategoryLevel1Loading}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        className="flex flex-col gap-5"
        initialValues={INITIAL_VALUES}
      >
        <CustomInput
          name="title"
          label="عنوان دسته‌بندی"
          placeholder="عنوان دسته‌بندی را وارد کنید"
          rules={[REQUIRED_RULE, PERSIAN_LETTERS_RULE]}
        />
      </Form>
    </CustomModal>
  );
};

export default ShopAllCategorySettingsLayer1DefineModal;
