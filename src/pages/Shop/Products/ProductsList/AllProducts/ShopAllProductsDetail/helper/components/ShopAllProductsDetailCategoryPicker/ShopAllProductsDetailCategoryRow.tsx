import { Col, Form, Row } from "antd";
import { AiOutlineMinusCircle } from "react-icons/ai";

import { CustomSelect } from "@components/CustomInputs";
import { useGetAllCategoriesSettingsListQuery } from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB,
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";

import { ShopAllProductsDetailCategoryRowProps } from "./@types/@shopAllProductsDetailCategoryPicker";
import { getSelectUuid, mergeOptions, toSelectOption } from "../../utils";

const ShopAllProductsDetailCategoryRow = ({
  field,
  form,
  seedCategory,
  layer1Options,
  remove,
  canRemove,
}: ShopAllProductsDetailCategoryRowProps) => {
  const categories = Form.useWatch("categories", form);
  const layer1Value = getSelectUuid(categories?.[field.name]?.layer1);
  const layer2Value = getSelectUuid(categories?.[field.name]?.layer2);

  //? ================================  Api Calls ================================
  const { data: getLayer2CategoriesData, isFetching: isGetLayer2CategoriesLoading } =
    useGetAllCategoriesSettingsListQuery(
      {
        pageNumber: 0,
        pageSize: 100,
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
        pageSize: 100,
        level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB),
        parentUuids: layer2Value ? [layer2Value] : undefined,
      },
      {
        skip: !layer2Value,
        refetchOnMountOrArgChange: true,
      }
    );
  //* ================================ Util Functions ================================
  const layer2Options = mergeOptions(
    getLayer2CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [],
    [toSelectOption(seedCategory?.level2)]
  );

  const layer3Options = mergeOptions(
    getLayer3CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [],
    seedCategory?.level3?.map((item) => toSelectOption(item)) ?? []
  );
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Row key={field.key} gutter={[16, 16]} align="top">
      <Col xs={24} md={8}>
        <CustomSelect
          form={form}
          name={[field.name, "layer1"]}
          label="دسته‌بندی لایه ۱"
          placeholder="انتخاب کنید"
          options={layer1Options}
          rules={[REQUIRED_RULE]}
          onChange={() => {
            form.setFieldValue(["categories", field.name, "layer2"], undefined);
            form.setFieldValue(["categories", field.name, "layer3"], undefined);
          }}
        />
      </Col>
      <Col xs={24} md={8}>
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
      <Col xs={24} md={8}>
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
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
          </div>
          {canRemove ? (
            <AiOutlineMinusCircle
              className="mt-8 shrink-0 cursor-pointer text-red-500"
              size={20}
              onClick={remove}
            />
          ) : null}
        </div>
      </Col>
    </Row>
  );
};

export default ShopAllProductsDetailCategoryRow;
