import { Form } from "antd";

import { CustomInput, CustomSelect } from "@components/CustomInputs";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import {
  useCreateCategoryLevel2Mutation,
  useGetAllCategoriesSettingsListQuery,
} from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { PERSIAN_LETTERS_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB } from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";
import {
  ShopAllCategorySettingsLayer2DefineFormType,
  ShopAllCategorySettingsLayer2DefineModalProps,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/ShopAllCategorySettingsLayer2DefineModal/@types/@shopAllCategorySettingsLayer2DefineModal";

const ShopAllCategorySettingsLayer2DefineModal = ({
  open,
  onCancel,
  onSuccess,
  layerTitle,
}: ShopAllCategorySettingsLayer2DefineModalProps) => {
  const [form] = Form.useForm<ShopAllCategorySettingsLayer2DefineFormType>();

  //? ================================  Api Calls ================================
  const [createCategoryLevel2, { isLoading: isCreateCategoryLevel2Loading }] =
    useCreateCategoryLevel2Mutation();

  const { data: getLayer1CategoriesData, isFetching: isGetLayer1CategoriesLoading } =
    useGetAllCategoriesSettingsListQuery(
      {
        pageNumber: 0,
        pageSize: 100,
        level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB),
      },
      { skip: !open, refetchOnMountOrArgChange: true }
    );

  const layer1CategoryOptions =
    getLayer1CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    form.resetFields();
    onCancel();
  };

  const confirmHandler = async () => {
    const values = await form.validateFields();

    await createCategoryLevel2({
      faTitle: values.title,
      parentUuid: values.layer1Category!.value,
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
      confirmLoading={isCreateCategoryLevel2Loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical" className="flex flex-col gap-5">
        <CustomInput
          name="title"
          label="عنوان دسته‌بندی"
          placeholder="عنوان دسته‌بندی را وارد کنید"
          rules={[REQUIRED_RULE, PERSIAN_LETTERS_RULE]}
        />

        <CustomSelect
          name="layer1Category"
          label="دسته‌بندی لایه ۱"
          placeholder="انتخاب کنید"
          options={layer1CategoryOptions}
          form={form}
          isLoading={isGetLayer1CategoriesLoading}
          rules={[REQUIRED_RULE]}
        />
      </Form>
    </CustomModal>
  );
};

export default ShopAllCategorySettingsLayer2DefineModal;
