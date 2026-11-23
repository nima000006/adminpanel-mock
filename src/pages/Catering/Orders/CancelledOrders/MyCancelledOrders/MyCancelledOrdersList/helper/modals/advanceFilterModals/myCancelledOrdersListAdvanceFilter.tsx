import { useEffect, useState } from "react";

import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useGetCateringMySelfsListMutation,
  useGetDetailMySelfsProductsMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CATERING_PRODUCT_CATEGORIES,
  CATERING_STATUS_TYPES_MAIN_LIST,
} from "@pages/Catering/_shared/utils";
import {
  CATERING_ORDER_FOOD_PROGRAM_TYPES,
  CATERING_ORDER_FOOD_PROGRAM_TYPES_LABELS,
} from "@pages/Catering/Orders/_shared/utils";
import { MyCancelledOrdersListAdvanceFilterParams } from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/@types/@myCancelledOrdersList";
import { GetCateringMySelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import {
  CATERING_FOOD_SCHEDULE_MEALS,
  CATERING_FOOD_SCHEDULE_MEALS_LABELS,
} from "@pages/Catering/Selfs/_shared/utils";
import { GetDetailMySelfsProductsResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const MEAL_OPTIONS: IdTitle[] = Object.values(CATERING_FOOD_SCHEDULE_MEALS).map((id) => ({
  id,
  title: CATERING_FOOD_SCHEDULE_MEALS_LABELS[id],
}));

const FOOD_PROGRAM_TYPE_OPTIONS: IdTitle[] = Object.values(
  CATERING_ORDER_FOOD_PROGRAM_TYPES
).map((id) => ({
  id,
  title: CATERING_ORDER_FOOD_PROGRAM_TYPES_LABELS[id],
}));

const getSelectIds = (value?: unknown): number[] => {
  if (value == null) {
    return [];
  }

  if (typeof value === "number") {
    return Number.isNaN(value) ? [] : [value];
  }

  if (!Array.isArray(value)) {
    const selectValue = value as SelectType<IdTitle>;
    const id = Number(selectValue?.value ?? selectValue?.code ?? selectValue?.item?.id);
    return Number.isNaN(id) ? [] : [id];
  }

  if (!value.length) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "number") {
        return item;
      }

      const selectItem = item as SelectType<IdTitle>;
      return Number(selectItem?.value ?? selectItem?.code ?? selectItem?.item?.id);
    })
    .filter((id) => !Number.isNaN(id));
};

const getIdsKey = (ids?: number[]) =>
  ids?.length ? [...ids].sort((a, b) => a - b).join(",") : "";

const useMyCancelledOrdersListAdvanceFilter = ({
  advanceModalOpen,
  form,
}: MyCancelledOrdersListAdvanceFilterParams) => {
  const [selfOptions, setSelfOptions] = useState<IdTitle[]>([]);
  const [foodOptions, setFoodOptions] = useState<IdTitle[]>([]);
  const [sideDishOptions, setSideDishOptions] = useState<IdTitle[]>([]);
  const [isSelfsSuccess, setIsSelfsSuccess] = useState(false);
  const [isFoodsSuccess, setIsFoodsSuccess] = useState(false);
  const [isSideDishesSuccess, setIsSideDishesSuccess] = useState(false);
  const [selfFetchKey, setSelfFetchKey] = useState("");
  const [foodFetchKey, setFoodFetchKey] = useState("");
  const [sideDishFetchKey, setSideDishFetchKey] = useState("");

  const { params: url } = useQueryParams();

  const selectedBranch = useWatch("branch", form);
  const selectedSelf = useWatch("self", form);
  const selectedBranchIds = getSelectIds(selectedBranch);
  const selectedSelfIds = getSelectIds(selectedSelf);
  const currentSelfFetchKey = getIdsKey(selectedBranchIds);
  const currentProductsFetchKey = `${getIdsKey(selectedBranchIds)}|${getIdsKey(selectedSelfIds)}`;

  //? ================================ Api Calls ================================
  const [
    getBranchByBusiness,
    {
      data: branchOptions,
      isLoading: isGetBranchByBusinessLoading,
      isSuccess: isGetBranchByBusinessSuccess,
    },
  ] = useLazyGetBranchByBusinessQuery();

  const [getCateringMySelfsList, { isLoading: isGetCateringMySelfsListLoading }] =
    useGetCateringMySelfsListMutation();

  const [getDetailMySelfsProducts, { isLoading: isGetDetailMySelfsFoodsLoading }] =
    useGetDetailMySelfsProductsMutation();

  const [getDetailMySelfsSideDishes, { isLoading: isGetDetailMySelfsSideDishesLoading }] =
    useGetDetailMySelfsProductsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (advanceModalOpen) {
      if (url?.branchId) {
        getBranchesHandler();
      }

      if (url?.selfId) {
        const branchCode = url?.branchId ? Number(url.branchId) : undefined;
        getSelfsByBranch(branchCode);
      }

      if (url?.foodId) {
        const branchIds = url?.branchId ? url.branchId.split(",").map(Number) : undefined;
        const restaurantIds = url?.selfId ? url.selfId.split(",").map(Number) : undefined;
        getFoods(branchIds, restaurantIds);
      }

      if (url?.sideDishesId) {
        const branchIds = url?.branchId ? url.branchId.split(",").map(Number) : undefined;
        const restaurantIds = url?.selfId ? url.selfId.split(",").map(Number) : undefined;
        getSideDishes(branchIds, restaurantIds);
      }
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  const mapProductOptions = (res: GetDetailMySelfsProductsResponse): IdTitle[] =>
    res?.content?.map((item) => ({
      id: item.id,
      title: item.title,
    })) ?? [];

  const getSelfsByBranch = (branchCode?: number) => {
    // single ownerBranchCode (API does not accept array)
    const fetchKey = branchCode == null ? "" : String(branchCode);
    setIsSelfsSuccess(false);

    getCateringMySelfsList({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        ...(branchCode != null && { ownerBranchCode: branchCode }),
      },
    })
      .unwrap()
      .then((res: GetCateringMySelfsListResponse) => {
        setSelfOptions(
          res?.content?.map((item) => ({
            id: item.id,
            title: item.title,
          })) ?? []
        );
        setSelfFetchKey(fetchKey);
        setIsSelfsSuccess(true);
      });
  };

  const getFoods = (branchIds?: number[], restaurantIds?: number[]) => {
    const fetchKey = `${getIdsKey(branchIds)}|${getIdsKey(restaurantIds)}`;
    setIsFoodsSuccess(false);

    getDetailMySelfsProducts({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategories: [CATERING_PRODUCT_CATEGORIES.MAIN_FOOD],
        ...(branchIds?.length && { branchIds }),
        ...(restaurantIds?.length && { restaurantIds }),
      },
    })
      .unwrap()
      .then((res) => {
        setFoodOptions(mapProductOptions(res));
        setFoodFetchKey(fetchKey);
        setIsFoodsSuccess(true);
      });
  };

  const getSideDishes = (branchIds?: number[], restaurantIds?: number[]) => {
    const fetchKey = `${getIdsKey(branchIds)}|${getIdsKey(restaurantIds)}`;
    setIsSideDishesSuccess(false);

    getDetailMySelfsSideDishes({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategories: [CATERING_PRODUCT_CATEGORIES.SIDE_DISH],
        ...(branchIds?.length && { branchIds }),
        ...(restaurantIds?.length && { restaurantIds }),
      },
    })
      .unwrap()
      .then((res) => {
        setSideDishOptions(mapProductOptions(res));
        setSideDishFetchKey(fetchKey);
        setIsSideDishesSuccess(true);
      });
  };

  const getBranchesHandler = () => {
    if (!isGetBranchByBusinessSuccess) {
      getBranchByBusiness({ businessIds: [4] }); //cto told
    }
  };

  const getSelfsHandler = () => {
    if (!(isSelfsSuccess && selfFetchKey === currentSelfFetchKey)) {
      getSelfsByBranch(selectedBranchIds[0]);
    }
  };

  const getFoodsHandler = () => {
    if (!(isFoodsSuccess && foodFetchKey === currentProductsFetchKey)) {
      getFoods(selectedBranchIds, selectedSelfIds);
    }
  };

  const getSideDishesHandler = () => {
    if (!(isSideDishesSuccess && sideDishFetchKey === currentProductsFetchKey)) {
      getSideDishes(selectedBranchIds, selectedSelfIds);
    }
  };

  const onBranchChangeHandler = (value?: unknown) => {
    form.setFieldsValue({
      self: undefined,
      food: undefined,
      sideDishes: undefined,
    });
    setSelfOptions([]);
    setFoodOptions([]);
    setSideDishOptions([]);
    setSelfFetchKey("");
    setFoodFetchKey("");
    setSideDishFetchKey("");
    setIsSelfsSuccess(false);
    setIsFoodsSuccess(false);
    setIsSideDishesSuccess(false);

    const branchIds = getSelectIds(value);

    if (!branchIds.length) {
      return;
    }

    getSelfsByBranch(branchIds[0]);
    getFoods(branchIds);
    getSideDishes(branchIds);
  };

  const onSelfChangeHandler = (value?: unknown) => {
    form.setFieldsValue({
      food: undefined,
      sideDishes: undefined,
    });
    setFoodOptions([]);
    setSideDishOptions([]);
    setFoodFetchKey("");
    setSideDishFetchKey("");
    setIsFoodsSuccess(false);
    setIsSideDishesSuccess(false);

    const branchIds = getSelectIds(form.getFieldValue("branch"));
    const selfIds = getSelectIds(value);

    if (!selfIds.length) {
      return;
    }

    getFoods(branchIds, selfIds);
    getSideDishes(branchIds, selfIds);
  };

  // ================================ Filter Items ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      // single: self API accepts one ownerBranchCode, not an array
      label: "شعبه / واحد",
      name: "branch",
      type: "select",
      options: branchOptions ?? [],
      loading: isGetBranchByBusinessLoading,
      onClick: getBranchesHandler,
      onChange: (value) => onBranchChangeHandler(value),
      notFoundContent: !isGetBranchByBusinessSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "سلف",
      name: "self",
      type: "select",
      mode: "multiple",
      options: selfOptions,
      loading: isGetCateringMySelfsListLoading,
      onClick: getSelfsHandler,
      onChange: (value) => onSelfChangeHandler(value),
      notFoundContent: !isSelfsSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "تاریخ برنامه غذایی",
      name: "foodScheduleDate",
      type: "range",
    },
    // todo[nima] uncomment when api will be ready
    // {
    //   label: "مقطع تحصیلی",
    //   name: "educationLevel",
    //   type: "select",
    //   mode: "multiple",
    //   options: [],
    // },
    // {
    //   label: "رشته تحصیلی",
    //   name: "fieldOfStudy",
    //   type: "select",
    //   mode: "multiple",
    //   options: [],
    // },
    {
      label: "غذا",
      name: "food",
      type: "select",
      mode: "multiple",
      options: foodOptions,
      loading: isGetDetailMySelfsFoodsLoading,
      onClick: getFoodsHandler,
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
      name: "sideDishes",
      type: "select",
      mode: "multiple",
      options: sideDishOptions,
      loading: isGetDetailMySelfsSideDishesLoading,
      onClick: getSideDishesHandler,
      notFoundContent: !isSideDishesSuccess ? selectNotFoundContent : undefined,
    },
  ];

  return { filterItemsList };
};

export default useMyCancelledOrdersListAdvanceFilter;
