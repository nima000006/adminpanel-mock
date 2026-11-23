import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { REPORT_FOOD_MY_FOODS_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import { MyFoodDetailDataType } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";

import {
  restaurantTitle,
  contractTitle,
  vendorTitle,
  studentPrice,
  status,
  TableModelId,
} from "../../../../../_Shared/utils/FoodTableListModel";

const ReportMyFoodListTableModel = () => [
  {
    title: "غذا",
    dataIndex: "title",
    key: "title",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "productTitle",
      label: "غذا",
      type: "text",
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
    render: (value: number, record: MyFoodDetailDataType) => (
      <div className="remove-food-modal-container">
        <CustomButton type="link">
          <Link
            to={{
              pathname: REPORT_FOOD_MY_FOODS_DETAILS_PAGE_ROUTE,
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

export default ReportMyFoodListTableModel;
