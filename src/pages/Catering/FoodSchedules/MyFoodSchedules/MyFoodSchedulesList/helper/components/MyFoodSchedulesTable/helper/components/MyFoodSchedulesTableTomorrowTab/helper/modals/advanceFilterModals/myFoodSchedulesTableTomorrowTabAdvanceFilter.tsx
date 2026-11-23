import { useEffect, useState } from "react";

import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetCateringMySelfsListMutation,
  useGetDetailMySelfsProductsMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CATERING_PRODUCT_CATEGORIES,
  CATERING_STATUS_TYPES_MAIN_LIST,
} from "@pages/Catering/_shared/utils";
import { MyFoodSchedulesTableTomorrowTabAdvanceFilterParams } from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTableTomorrowTab/@types/@myFoodSchedulesTableTomorrowTab";
import {
  CATERING_ORDER_FOOD_PROGRAM_TYPES,
  CATERING_ORDER_FOOD_PROGRAM_TYPES_LABELS,
  CATERING_ORDER_MEAL_TYPES,
  CATERING_ORDER_MEAL_TYPES_LABELS,
} from "@pages/Catering/Orders/_shared/utils";
import { GetCateringMySelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import { GetDetailMySelfsProductsResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const HAS_SIDE_DISHES_HAS_ID = 1;
const HAS_SIDE_DISHES_HAS_NOT_ID = 0;

const MEAL_OPTIONS: IdTitle[] = Object.values(CATERING_ORDER_MEAL_TYPES).map((id) => ({
  id,
  title: CATERING_ORDER_MEAL_TYPES_LABELS[id],
}));

const FOOD_PROGRAM_TYPE_OPTIONS: IdTitle[] = Object.values(
  CATERING_ORDER_FOOD_PROGRAM_TYPES
).map((id) => ({
  id,
  title: CATERING_ORDER_FOOD_PROGRAM_TYPES_LABELS[id],
}));

const HAS_SIDE_DISHES_OPTIONS: IdTitle[] = [
  { id: HAS_SIDE_DISHES_HAS_ID, title: "دارد" },
  { id: HAS_SIDE_DISHES_HAS_NOT_ID, title: "ندارد" },
];

const useMyFoodSchedulesTableTomorrowTabAdvanceFilter = ({
  advanceModalOpen,
  form,
}: MyFoodSchedulesTableTomorrowTabAdvanceFilterParams) => {
  const { params: url } = useQueryParams();
  const [selfOptions, setSelfOptions] = useState<IdTitle[]>([]);
  const [foodOptions, setFoodOptions] = useState<IdTitle[]>([]);
  const [isFoodsSuccess, setIsFoodsSuccess] = useState(false);
  const selectedSelf = useWatch("self", form);

  //? ================================ Api Calls ================================
  const [
    getCateringMySelfsList,
    {
      isLoading: isGetCateringMySelfsListLoading,
      isSuccess: isGetCateringMySelfsListSuccess,
    },
  ] = useGetCateringMySelfsListMutation();

  const [getDetailMySelfsProducts, { isLoading: isGetDetailMySelfsFoodsLoading }] =
    useGetDetailMySelfsProductsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!advanceModalOpen) {
      return;
    }

    if (url?.selfId) {
      getSelfsHandler();
    }

    if (url?.foodId) {
      getFoodsHandler(
        url?.selfId ? url.selfId.split(",").map((id) => Number(id)) : undefined
      );
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  const onGetSelfsSuccess = (res: GetCateringMySelfsListResponse) => {
    setSelfOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetFoodsSuccess = (res: GetDetailMySelfsProductsResponse) => {
    setFoodOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
    setIsFoodsSuccess(true);
  };

  const getSelfsHandler = () => {
    if (isGetCateringMySelfsListSuccess) {
      return;
    }

    getCateringMySelfsList({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
      },
    })
      .unwrap()
      .then(onGetSelfsSuccess);
  };

  const getFoodsHandler = (restaurantIds?: number[]) => {
    if (isFoodsSuccess) {
      return;
    }

    getDetailMySelfsProducts({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategories: [CATERING_PRODUCT_CATEGORIES.MAIN_FOOD],
        ...(restaurantIds?.length && { restaurantIds }),
      },
    })
      .unwrap()
      .then(onGetFoodsSuccess);
  };

  const onSelfChangeHandler = (event: number[] | undefined) => {
    form.setFieldsValue({
      food: undefined,
    });
    setFoodOptions([]);
    setIsFoodsSuccess(false);

    if (event?.length) {
      getDetailMySelfsProducts({
        params: {
          pageNumber: 0,
          pageSize: 100,
        },
        body: {
          statusType: CATERING_STATUS_TYPES_MAIN_LIST,
          productCategories: [CATERING_PRODUCT_CATEGORIES.MAIN_FOOD],
          restaurantIds: event,
        },
      })
        .unwrap()
        .then(onGetFoodsSuccess);
    }
  };

  // ================================ Filter Items ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "سلف",
      name: "self",
      type: "select",
      mode: "multiple",
      options: selfOptions,
      loading: isGetCateringMySelfsListLoading,
      onClick: getSelfsHandler,
      onChange: (value) => onSelfChangeHandler(value as number[]),
      notFoundContent: !isGetCateringMySelfsListSuccess
        ? selectNotFoundContent
        : undefined,
    },
    {
      label: "غذا",
      name: "food",
      type: "select",
      mode: "multiple",
      options: foodOptions,
      loading: isGetDetailMySelfsFoodsLoading,
      onClick: () =>
        getFoodsHandler(
          selectedSelf?.length ? selectedSelf.map((value) => value.code) : undefined
        ),
      notFoundContent: !isFoodsSuccess ? selectNotFoundContent : undefined,
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
      name: "foodProgramType",
      type: "select",
      mode: "multiple",
      options: FOOD_PROGRAM_TYPE_OPTIONS,
    },
    {
      label: "مخلفات",
      name: "hasSideDishes",
      type: "select",
      options: HAS_SIDE_DISHES_OPTIONS,
    },
  ];

  return { filterItemsList };
};

export default useMyFoodSchedulesTableTomorrowTabAdvanceFilter;
