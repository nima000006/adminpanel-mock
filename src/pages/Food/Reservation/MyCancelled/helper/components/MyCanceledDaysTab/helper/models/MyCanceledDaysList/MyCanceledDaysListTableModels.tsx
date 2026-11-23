import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { date } from "@pages/Food/Reservation/helpers/models/cancelledTableModel";

import { MyHolidaysListTypes } from "../../../@types/@myCanceledDaysTab";

const MyCanceledDaysListTableModels = ({
  viewClickHandler,
}: {
  viewClickHandler: (id: number, date: string) => void;
}): CustomColumnType<MyHolidaysListTypes>[] => {
  return [
    date,
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: number, records: MyHolidaysListTypes) => {
        return (
          <CustomButton
            type="link"
            onClick={() => viewClickHandler(value, records?.reserveDate)}
          >
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default MyCanceledDaysListTableModels;
