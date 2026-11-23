import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { TableModelId } from "@pages/Food/FoodSchedules/_shared/utils/FoodScheduleListTableModel";
import {
  food,
  type,
  totalFood,
  maxOrder,
  price,
  discount,
} from "@pages/Food/FoodSchedules/_shared/utils/MultiFoodMultiDayFoodScheduleListsTableModel";

import { AllMultiFoodMultiDayAllFoodScheduleProps } from "./@types/@multiFoodMultiDayAllFoodScheduleListsAddFoodTableModel";
import { foodInfoType } from "../../../@types/@multiFoodMultiDayAllFoodScheduleLists";

const AllMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel = ({
  deleteClickHandler,
  editClickHandler,
}: AllMultiFoodMultiDayAllFoodScheduleProps): CustomColumnType<foodInfoType>[] => {
  return [
    food,
    type,
    totalFood,
    maxOrder,
    price,
    discount,
    {
      ...TableModelId,
      render: (value: string, records: foodInfoType) => {
        return (
          <div className="action-btn-container">
            <CustomButton type="text" onClick={() => deleteClickHandler(value)} danger>
              حذف
            </CustomButton>
            <CustomButton
              type="text"
              onClick={() => editClickHandler(records)}
              className="text-link"
            >
              ویرایش
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default AllMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel;
