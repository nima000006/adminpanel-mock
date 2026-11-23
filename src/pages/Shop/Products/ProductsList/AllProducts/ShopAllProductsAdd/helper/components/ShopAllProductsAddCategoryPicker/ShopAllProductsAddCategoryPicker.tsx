import { Col, Form, FormListFieldData, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import DynamicFormRows from "@components/Renderers/CustomForm/CustomDynamicFormRows/CustomDynamicFormRows";
import { useGetAllCategoriesSettingsListQuery } from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB,
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB,
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";

import { ShopAllProductsAddCategoryPickerProps } from "../../../@types/@shopAllProductsAdd";

const CATEGORY_FIELD_MD_SPAN = 8; // Three category layers share one row on tablet and desktop.
const CATEGORY_OPTIONS_PAGE_SIZE = 100;

type CategorySelectOption = {
  id: string;
  title: string;
};

type CategoryRowProps = {
  field: FormListFieldData;
  form: ShopAllProductsAddCategoryPickerProps["form"];
  layer1Options: CategorySelectOption[];
  isLayer1Loading: boolean;
};

const getSelectUuid = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && "value" in value) {
    const selectValue = (value as { value?: unknown }).value;
    return typeof selectValue === "string" ? selectValue : undefined;
  }

  return undefined;
};

const ShopAllProductsAddCategoryRow = ({
  field,
  form,
  layer1Options,
  isLayer1Loading,
}: CategoryRowProps) => {
  const categories = Form.useWatch("categories", form);
  const layer1Value = getSelectUuid(categories?.[field.name]?.layer1);
  const layer2Value = getSelectUuid(categories?.[field.name]?.layer2);

  const { data: getLayer2CategoriesData, isFetching: isGetLayer2CategoriesLoading } =
    useGetAllCategoriesSettingsListQuery(
      {
        pageNumber: 0,
        pageSize: CATEGORY_OPTIONS_PAGE_SIZE,
        level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB),
        parentUuids: layer1Value ? [layer1Value] : undefined,
      },
      {
        skip: !layer1Value,
        refetchOnMountOrArgChange: true,
      }
    );

  const { data: getLayer3CategoriesData, isFetching: isGetLayer3CategoriesLoading } =
    useGetAllCategoriesSettingsListQuery(
      {
        pageNumber: 0,
        pageSize: CATEGORY_OPTIONS_PAGE_SIZE,
        level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB),
        parentUuids: layer2Value ? [layer2Value] : undefined,
      },
      {
        skip: !layer2Value,
        refetchOnMountOrArgChange: true,
      }
    );

  const layer2Options: CategorySelectOption[] =
    getLayer2CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  const layer3Options: CategorySelectOption[] =
    getLayer3CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  return (
    <Row key={field.key} gutter={[16, 16]}>
      <Col xs={24} md={CATEGORY_FIELD_MD_SPAN}>
        <CustomSelect
          form={form}
          name={[field.name, "layer1"]}
          label="دسته‌بندی لایه ۱"
          placeholder="انتخاب کنید"
          options={layer1Options}
          rules={[REQUIRED_RULE]}
          isLoading={isLayer1Loading}
          onChange={() => {
            form.setFieldValue(["categories", field.name, "layer2"], undefined);
            form.setFieldValue(["categories", field.name, "layer3"], undefined);
          }}
        />
      </Col>
      <Col xs={24} md={CATEGORY_FIELD_MD_SPAN}>
        <CustomSelect
          form={form}
          name={[field.name, "layer2"]}
          label="دسته‌بندی لایه ۲"
          placeholder="ابتدا لایه ۱ را انتخاب کنید"
          options={layer2Options}
          rules={[REQUIRED_RULE]}
          disabled={!layer1Value}
          isLoading={isGetLayer2CategoriesLoading}
          onChange={() => {
            form.setFieldValue(["categories", field.name, "layer3"], undefined);
          }}
        />
      </Col>
      <Col xs={24} md={CATEGORY_FIELD_MD_SPAN}>
        <CustomSelect
          form={form}
          name={[field.name, "layer3"]}
          label="دسته‌بندی لایه ۳"
          placeholder="ابتدا لایه ۲ را انتخاب کنید"
          options={layer3Options}
          mode="multiple"
          maxTagCount="responsive"
          rules={[REQUIRED_RULE]}
          disabled={!layer2Value}
          isLoading={isGetLayer3CategoriesLoading}
        />
      </Col>
    </Row>
  );
};

const ShopAllProductsAddCategoryPicker = ({
  form,
}: ShopAllProductsAddCategoryPickerProps) => {
  const { data: getLayer1CategoriesData, isFetching: isGetLayer1CategoriesLoading } =
    useGetAllCategoriesSettingsListQuery(
      {
        pageNumber: 0,
        pageSize: CATEGORY_OPTIONS_PAGE_SIZE,
        level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB),
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const layer1Options: CategorySelectOption[] =
    getLayer1CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <DynamicFormRows
      name="categories"
      form={form}
      minRows={1}
      addButtonText="افزودن دسته‌بندی"
      initialValue={[{}]}
    >
      {(field) => (
        <ShopAllProductsAddCategoryRow
          field={field}
          form={form}
          layer1Options={layer1Options}
          isLayer1Loading={isGetLayer1CategoriesLoading}
        />
      )}
    </DynamicFormRows>
  );
};

export default ShopAllProductsAddCategoryPicker;
