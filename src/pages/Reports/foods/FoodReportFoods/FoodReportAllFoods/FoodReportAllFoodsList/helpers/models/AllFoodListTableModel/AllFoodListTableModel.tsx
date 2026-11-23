import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { REPORT_FOOD_ALL_FOODS_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import { FoodType } from "@pages/Food/Foods/AllFoods/AllFoodsList/@types/allFoodsList";

import { AllFoodListTableModelProps } from "./@types/AllFoodListTableModelProps";
import {
  restaurantTitle,
  contractTitle,
  vendorTitle,
  studentPrice,
  status,
  TableModelId,
} from "../../../../../_Shared/utils/FoodTableListModel";

const AllFoodListTableModel = ({
  isDeletedEnabled,
  isFromAdmin,
}: AllFoodListTableModelProps) => [
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
    width: 150,
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
    width: 150,
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
    render: (value: number, record: FoodType) => (
      <div className="remove-food-modal-container">
        {!isDeletedEnabled && isFromAdmin && (
          <CustomButton type="link" danger disabled>
            حذف
          </CustomButton>
        )}
        <CustomButton type="link">
          <Link
            to={{
              pathname: REPORT_FOOD_ALL_FOODS_DETAILS_PAGE_ROUTE,
              search: makeSearchParams({ id: value, title: record?.title }),
            }}
          >
            مشاهده
          </Link>
        </CustomButton>
      </div>
    ),
  },
];

export default AllFoodListTableModel;
