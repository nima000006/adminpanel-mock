import { CustomButton } from "@components/CustomInputs";
import DynamicFormRows from "@components/Renderers/CustomForm/CustomDynamicFormRows/CustomDynamicFormRows";
import { useGetAllCategoriesSettingsListQuery } from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB } from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";

import ShopAllProductsDetailCategoryRow from "./ShopAllProductsDetailCategoryRow";
import { ShopAllProductsDetailCategoryPickerProps } from "../../../@types/@shopAllProductsDetail";
import { mergeOptions, toSelectOption } from "../../utils";

const ShopAllProductsDetailCategoryPicker = ({
  form,
  categories = [],
  isSaveLoading = false,
  onSave,
}: ShopAllProductsDetailCategoryPickerProps) => {
  const { data: getLayer1CategoriesData } = useGetAllCategoriesSettingsListQuery(
    {
      pageNumber: 0,
      pageSize: 100,
      level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const layer1Options = mergeOptions(
    getLayer1CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [],
    categories.map((category) => toSelectOption(category.level1))
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <DynamicFormRows
        name="categories"
        minRows={1}
        addButtonText="افزودن دسته‌بندی"
        initialValue={[{}]}
      >
        {(field, remove, canRemove) => (
          <ShopAllProductsDetailCategoryRow
            field={field}
            form={form}
            seedCategory={categories[field.name]}
            layer1Options={layer1Options}
            remove={remove}
            canRemove={canRemove}
          />
        )}
      </DynamicFormRows>

      <div className="flex justify-end">
        <CustomButton
          size="small"
          htmlType="button"
          loading={isSaveLoading}
          onClick={onSave}
        >
          ذخیره دسته‌بندی
        </CustomButton>
      </div>
    </div>
  );
};

export default ShopAllProductsDetailCategoryPicker;
