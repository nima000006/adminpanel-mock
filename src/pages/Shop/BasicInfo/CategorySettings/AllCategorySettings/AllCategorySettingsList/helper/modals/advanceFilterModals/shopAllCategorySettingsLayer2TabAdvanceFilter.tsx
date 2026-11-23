import { useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useGetAllCategoriesSettingsListQuery } from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB } from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";

const useShopAllCategorySettingsLayer2TabAdvanceFilter = () => {
  const [shouldFetchLayer1Categories, setShouldFetchLayer1Categories] = useState(false);

  //? ================================  Api Calls ================================
  const { data: getLayer1CategoriesData, isFetching: isGetLayer1CategoriesLoading } =
    useGetAllCategoriesSettingsListQuery(
      {
        pageNumber: 0,
        pageSize: 100,
        level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB),
      },
      { skip: !shouldFetchLayer1Categories, refetchOnMountOrArgChange: true }
    );

  //* ================================ Util Functions ================================
  const getLayer1CategoriesHandler = () => {
    setShouldFetchLayer1Categories(true);
  };

  const layer1CategoryOptions =
    getLayer1CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "دسته‌بندی لایه ۱",
      name: "layer1Category",
      type: "select",
      options: layer1CategoryOptions as unknown as AdvanceFilterItemsListType["options"],
      loading: isGetLayer1CategoriesLoading,
      onClick: getLayer1CategoriesHandler,
    },
  ];

  return { filterItemsList };
};

export default useShopAllCategorySettingsLayer2TabAdvanceFilter;
