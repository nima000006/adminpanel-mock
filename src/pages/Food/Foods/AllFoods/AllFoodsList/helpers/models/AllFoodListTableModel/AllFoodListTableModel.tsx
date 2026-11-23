import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FOOD_ALL_FOODS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/food";
import { FoodType } from "@pages/Food/Foods/AllFoods/AllFoodsList/@types/allFoodsList";

import { AllFoodListTableModelProps } from "./@types/AllFoodListTableModelProps";
import {
  restaurantTitle,
  contractTitle,
  vendorTitle,
  studentPrice,
  status,
  TableModelId,
  TableModelIdDelete,
} from "../../../../../_Shared/utils/FoodTableListModel";

const AllFoodListTableModel = ({
  onAddMenuClickHandler,
  onRemoveFoodClickHandler,
  isDeletedEnabled,
  isFromAdmin,
}: AllFoodListTableModelProps): CustomColumnType<FoodType>[] => [
  {
    title: "غذا",
    dataIndex: "title",
    key: "title",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "productTitle",
      label: "غذا",
      type: "text",
      pageName: "pageNo",
      pageSizeName: "pageSize",
    }),
  },
  restaurantTitle,
  contractTitle,
  vendorTitle,
  studentPrice,
  {
    title: "قیمت حداقل (ریال)",
    dataIndex: "minPrice",
    key: "minPrice",
    width: 170,
    ...GetServerColumnSearchProps({
      dataIndex: "minPrice",
      label: "حداقل",
      type: "text",
      pageName: "pageNo",
      pageSizeName: "pageSize",
    }),
    render: (value?: string) => {
      if (value) {
        return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
      }
      return value;
    },
  },
  {
    title: "قیمت حداکثر (ریال)",
    dataIndex: "maxPrice",
    key: "maxPrice",
    width: 170,
    ...GetServerColumnSearchProps({
      dataIndex: "maxPrice",
      label: "حداکثر",
      type: "text",
      pageName: "pageNo",
      pageSizeName: "pageSize",
    }),
    render: (value?: string) => {
      if (value) {
        return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
      }
      return value;
    },
  },
  status,
  {
    ...TableModelId,
    render: (_: unknown, record: FoodType) => (
      <div className="remove-food-modal-container">
        {!isDeletedEnabled && isFromAdmin && (
          <CustomButton
            type="link"
            onClick={() => onRemoveFoodClickHandler?.(record?.id, record?.title)}
            danger
          >
            حذف
          </CustomButton>
        )}
        <CustomButton type="link">
          <Link
            to={{
              pathname: FOOD_ALL_FOODS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({ id: record?.id, title: record?.title }),
            }}
          >
            مشاهده
          </Link>
        </CustomButton>
      </div>
    ),
  },
  ...(!isDeletedEnabled
    ? [
        {
          ...TableModelIdDelete,
          width: 170,
          render: (_: number, record: FoodType) => (
            <CustomButton
              type="link"
              onClick={() => onAddMenuClickHandler(record)}
              disabled={!record?.id}
            >
              افزودن به برنامه غذایی
            </CustomButton>
          ),
        },
      ]
    : []),
];

export default AllFoodListTableModel;
