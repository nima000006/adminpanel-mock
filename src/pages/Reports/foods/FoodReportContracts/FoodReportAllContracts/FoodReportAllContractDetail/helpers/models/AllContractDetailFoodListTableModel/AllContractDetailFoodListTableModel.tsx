import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import {
  foodTitle,
  studentPrice,
  minPrice,
  maxPrice,
  status,
  TableModelId,
} from "./utils/ContractDetailFoodTableListModel";

const AllContractDetailFoodListTableModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (foodId: number) => void;
}) => {
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

export default AllContractDetailFoodListTableModel;
