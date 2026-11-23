import { useEffect } from "react";

import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetAllCategoriesSettingsListCountQuery,
  useGetCategoryLevelsQuery,
} from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import {
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB,
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB,
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";
import ShopAllCategorySettingsLayer1Tab from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/components/ShopAllCategorySettingsLayer1Tab/ShopAllCategorySettingsLayer1Tab";
import ShopAllCategorySettingsLayer2Tab from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/components/ShopAllCategorySettingsLayer2Tab/ShopAllCategorySettingsLayer2Tab";
import ShopAllCategorySettingsLayer3Tab from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/components/ShopAllCategorySettingsLayer3Tab/ShopAllCategorySettingsLayer3Tab";

const ShopAllCategorySettingsList = () => {
  useTitle({
    breadcrumbItems: [{ title: "اطلاعات پایه" }, { title: "تنظیمات دسته‌بندی" }],
  });

  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB;

  //? ================================  Api Calls ================================
  const { data: getAllCategoriesSettingsListCountData } =
    useGetAllCategoriesSettingsListCountQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const { data: getCategoryLevelsData } = useGetCategoryLevelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  //* ================================ Util Functions ================================
  const getLayerTitle = (layerId: string, fallback: string) =>
    getCategoryLevelsData?.find((item) => String(item.id) === layerId)?.title ?? fallback;

  const tabCounts = {
    layer1:
      getAllCategoriesSettingsListCountData?.find(
        (item) => String(item.level.id) === SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB
      )?.count ?? 0,
    layer2:
      getAllCategoriesSettingsListCountData?.find(
        (item) => String(item.level.id) === SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB
      )?.count ?? 0,
    layer3:
      getAllCategoriesSettingsListCountData?.find(
        (item) => String(item.level.id) === SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB
      )?.count ?? 0,
  };
  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({ tab: SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB });
    }
  }, [params?.tab]);

  const onTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  //? ================================ compenents ================================

  const tabsItems = [
    {
      label: `${getLayerTitle(SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB, "دسته‌بندی لایه ۱")} (${tabCounts.layer1})`,
      children: <ShopAllCategorySettingsLayer1Tab />,
      key: SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB,
    },
    {
      label: `${getLayerTitle(SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB, "دسته‌بندی لایه ۲")} (${tabCounts.layer2})`,
      children: <ShopAllCategorySettingsLayer2Tab />,
      key: SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB,
    },
    {
      label: `${getLayerTitle(SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB, "دسته‌بندی لایه ۳")} (${tabCounts.layer3})`,
      children: <ShopAllCategorySettingsLayer3Tab />,
      key: SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="body-regular"
      activeKey={activeKey}
      destroyOnHidden
      onChange={onTabChange}
    />
  );
};

export default ShopAllCategorySettingsList;
