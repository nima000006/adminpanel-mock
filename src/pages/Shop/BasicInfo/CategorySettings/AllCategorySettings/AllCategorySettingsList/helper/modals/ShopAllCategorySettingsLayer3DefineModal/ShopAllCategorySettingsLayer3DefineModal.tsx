import { useEffect } from "react";

import { Form } from "antd";

import { CustomInput, CustomSelect } from "@components/CustomInputs";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import {
  useCreateCategoryLevel3Mutation,
  useGetAllCategoriesSettingsListQuery,
} from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { PERSIAN_LETTERS_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB } from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";
import {
  ShopAllCategorySettingsLayer3DefineFormType,
  ShopAllCategorySettingsLayer3DefineModalProps,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/ShopAllCategorySettingsLayer3DefineModal/@types/@shopAllCategorySettingsLayer3DefineModal";

const INITIAL_VALUES: ShopAllCategorySettingsLayer3DefineFormType = {
  title: "",
  layer2Category: undefined,
};

const ShopAllCategorySettingsLayer3DefineModal = ({
  open,
  onCancel,
  onSuccess,
  layerTitle,
}: ShopAllCategorySettingsLayer3DefineModalProps) => {
  const [form] = Form.useForm<ShopAllCategorySettingsLayer3DefineFormType>();

  //? ================================  Api Calls ================================
  const [createCategoryLevel3, { isLoading: isCreateCategoryLevel3Loading }] =
    useCreateCategoryLevel3Mutation();

  const { data: getLayer2CategoriesData, isFetching: isGetLayer2CategoriesLoading } =
    useGetAllCategoriesSettingsListQuery(
      {
        pageNumber: 0,
        pageSize: 100,
        level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB),
      },
      { skip: !open, refetchOnMountOrArgChange: true }
    );

  const layer2CategoryOptions =
    getLayer2CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

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

    await createCategoryLevel3({
      faTitle: values.title,
      parentUuids: (values.layer2Category ?? []).map((item) =>
        String(item?.value ?? item?.item?.id ?? "")
      ),
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
      confirmLoading={isCreateCategoryLevel3Loading}
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

        <CustomSelect
          name="layer2Category"
          label="دسته‌بندی لایه ۲"
          placeholder="انتخاب کنید"
          options={layer2CategoryOptions}
          form={form}
          isLoading={isGetLayer2CategoriesLoading}
          mode="multiple"
          rules={[REQUIRED_RULE]}
        />
      </Form>
    </CustomModal>
  );
};

export default ShopAllCategorySettingsLayer3DefineModal;
