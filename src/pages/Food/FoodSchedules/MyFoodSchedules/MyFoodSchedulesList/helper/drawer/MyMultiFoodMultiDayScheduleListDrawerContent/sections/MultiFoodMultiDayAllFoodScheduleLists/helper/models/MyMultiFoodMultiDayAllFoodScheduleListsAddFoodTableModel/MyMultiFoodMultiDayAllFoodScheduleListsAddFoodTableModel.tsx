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

import { MyMultiFoodMultiDayAllFoodScheduleProps } from "./@types/@myMultiFoodMultiDayAllFoodSchedule";
import { MyFoodInfoType } from "../../../@types/@myMultiFoodMultiDayAllFoodScheduleLists";

const MyMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel = ({
  deleteClickHandler,
  editClickHandler,
}: MyMultiFoodMultiDayAllFoodScheduleProps): CustomColumnType<MyFoodInfoType>[] => {
  return [
    food,
    type,
    totalFood,
    maxOrder,
    price,
    discount,
    {
      ...TableModelId,
      render: (value: string, records: MyFoodInfoType) => {
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
export default MyMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel;
