import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FOOD_MY_FOODS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/food";
import { MyFoodDetailDataType } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";

import { MyFoodListTableModelProps } from "./@types/MyFoodListTableModelProps";
import {
  restaurantTitle,
  contractTitle,
  vendorTitle,
  studentPrice,
  status,
} from "../../../../../_Shared/utils/FoodTableListModel";

const MyFoodListTableModel = ({
  onAddMenuClickHandler,
}: MyFoodListTableModelProps): CustomColumnType<MyFoodDetailDataType>[] => [
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
    title: "",
    dataIndex: "foodActions",
    key: "foodActions",
    fixed: "right" as FixedType,
    width: 150,
    className: "tables-sticky-column-left",
    render: (_: number, record: MyFoodDetailDataType) => (
      <div className="remove-food-modal-container">
        <CustomButton type="link">
          <Link
            to={{
              pathname: FOOD_MY_FOODS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({ id: record?.id, title: record?.title }),
            }}
          >
            مشاهده
          </Link>
        </CustomButton>
      </div>
    ),
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    width: 150,
    render: (_: number, record: MyFoodDetailDataType) => (
      <CustomButton
        type="link"
        onClick={() => onAddMenuClickHandler(record)}
        disabled={!record?.id}
      >
        افزودن به برنامه غذایی
      </CustomButton>
    ),
  },
];

export default MyFoodListTableModel;
