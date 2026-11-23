import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { date } from "@pages/Food/Reservation/helpers/models/cancelledTableModel";

import { AllHolidaysListTypes } from "../../../@types/@allCanceledDaysTab";

const AllCanceledDaysListTableModels = ({
  viewClickHandler,
}: {
  viewClickHandler: (id: number, date: string) => void;
}) => {
  return [
    date,
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: number, records: AllHolidaysListTypes) => {
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

export default AllCanceledDaysListTableModels;
