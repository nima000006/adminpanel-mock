import { useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useGetAllCategoriesSettingsListQuery } from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB } from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";

const useShopAllCategorySettingsLayer3TabAdvanceFilter = () => {
  const [shouldFetchLayer2Categories, setShouldFetchLayer2Categories] = useState(false);

  //? ================================  Api Calls ================================
  const { data: getLayer2CategoriesData, isFetching: isGetLayer2CategoriesLoading } =
    useGetAllCategoriesSettingsListQuery(
      {
        pageNumber: 0,
        pageSize: 100,
        level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB),
      },
      { skip: !shouldFetchLayer2Categories, refetchOnMountOrArgChange: true }
    );

  //* ================================ Util Functions ================================
  const getLayer2CategoriesHandler = () => {
    setShouldFetchLayer2Categories(true);
  };

  const layer2CategoryOptions =
    getLayer2CategoriesData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "دسته‌بندی لایه ۲",
      name: "layer2Category",
      type: "select",
      options: layer2CategoryOptions as unknown as AdvanceFilterItemsListType["options"],
      loading: isGetLayer2CategoriesLoading,
      onClick: getLayer2CategoriesHandler,
    },
  ];

  return { filterItemsList };
};

export default useShopAllCategorySettingsLayer3TabAdvanceFilter;
