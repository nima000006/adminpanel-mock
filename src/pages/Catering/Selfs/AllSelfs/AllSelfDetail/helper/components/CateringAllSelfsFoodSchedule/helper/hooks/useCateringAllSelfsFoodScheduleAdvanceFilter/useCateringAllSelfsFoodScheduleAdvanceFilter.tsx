import { useEffect, useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetBasicInfoFoodsListMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CATERING_STATUS_TYPES_MAIN_LIST,
  CATERING_PRODUCT_CATEGORIES,
} from "@pages/Catering/_shared/utils";
import { getBasicInfoFoodsListResponse } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import {
  CATERING_FOOD_SCHEDULE_MEALS,
  CATERING_FOOD_SCHEDULE_MEALS_LABELS,
  CATERING_FOOD_SCHEDULE_REQUEST_TYPES,
  CATERING_FOOD_SCHEDULE_REQUEST_TYPES_LABELS,
} from "@pages/Catering/Selfs/_shared/utils";

const MEAL_OPTIONS: IdTitle[] = Object.values(CATERING_FOOD_SCHEDULE_MEALS).map((id) => ({
  id,
  title: CATERING_FOOD_SCHEDULE_MEALS_LABELS[id],
}));

const REQUEST_TYPE_OPTIONS: IdTitle[] = Object.values(
  CATERING_FOOD_SCHEDULE_REQUEST_TYPES
).map((id) => ({
  id,
  title: CATERING_FOOD_SCHEDULE_REQUEST_TYPES_LABELS[id],
}));

const HAS_SIDE_PLAN_OPTIONS: IdTitle[] = [
  { id: 1, title: "دارد" }, // true
  { id: 0, title: "ندارد" }, // false
];

const useCateringAllSelfsFoodScheduleAdvanceFilter = ({
  advanceModalOpen,
}: {
  advanceModalOpen: boolean;
}) => {
  const { params: url } = useQueryParams();
  const [productOptions, setProductOptions] = useState<IdTitle[]>([]);

  //? ================================ Api Calls ================================
  const [
    getBasicInfoFoodsList,
    {
      isLoading: isGetBasicInfoFoodsListLoading,
      isSuccess: isGetBasicInfoFoodsListSuccess,
    },
  ] = useGetBasicInfoFoodsListMutation();

  //* ================================ Util Functions ================================
  const onGetBasicInfoFoodsListSuccess = (res: getBasicInfoFoodsListResponse) => {
    setProductOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const getProductsHandler = () => {
    if (isGetBasicInfoFoodsListSuccess) {
      return;
    }

    getBasicInfoFoodsList({
      params: {
        pageNumber: 0, // cto told
        pageSize: 100, // cto told
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategoryId: CATERING_PRODUCT_CATEGORIES.MAIN_FOOD,
      },
    })
      .unwrap()
      .then(onGetBasicInfoFoodsListSuccess);
  };

  //? ================================ Effects ================================
  // Restore product options after reload when product filter is already applied
  useEffect(() => {
    if (advanceModalOpen && url?.productId) {
      getProductsHandler();
    }
  }, [advanceModalOpen]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "غذا",
      name: "product",
      type: "select",
      mode: "multiple",
      options: productOptions,
      loading: isGetBasicInfoFoodsListLoading,
      onClick: getProductsHandler,
      notFoundContent: !isGetBasicInfoFoodsListSuccess
        ? selectNotFoundContent
        : undefined,
    },
    {
      label: "وعده",
      name: "meal",
      type: "select",
      mode: "multiple",
      options: MEAL_OPTIONS,
    },
    {
      label: "نوع برنامه غذایی",
      name: "requestType",
      type: "select",
      mode: "multiple",
      options: REQUEST_TYPE_OPTIONS,
    },
    {
      label: "مخلفات",
      name: "hasSidePlan",
      type: "select",
      options: HAS_SIDE_PLAN_OPTIONS,
    },
    {
      label: "تاریخ",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useCateringAllSelfsFoodScheduleAdvanceFilter;
