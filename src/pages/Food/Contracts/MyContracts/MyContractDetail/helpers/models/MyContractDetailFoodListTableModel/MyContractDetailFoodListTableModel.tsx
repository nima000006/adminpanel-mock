import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { ContractsFoodDataType } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/@types/@foodsTab";

import {
  foodTitle,
  studentPrice,
  minPrice,
  maxPrice,
  status,
  TableModelId,
} from "./utils/ContractDetailFoodTableListModel";

const MyContractDetailFoodListTableModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (foodId: number) => void;
}): CustomColumnType<ContractsFoodDataType>[] => {
  return [
    foodTitle,
    studentPrice,
    minPrice,
    maxPrice,
    status,
    {
      ...TableModelId,
      render: (id: number) => {
        return (
          <CustomButton type="link" onClick={() => viewClickHandler(id)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default MyContractDetailFoodListTableModel;
