import {
  habitantEndDate,
  habitantStartDate,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/utils/HabitantDetailTableModel";

const GeneralInfoAdmissionProgramTableModel = [
  {
    title: "عنوان زمان‌بندی",
    dataIndex: "title",
    key: "title",
    width: 130,
  },
  habitantStartDate,
  habitantEndDate,
];
export default GeneralInfoAdmissionProgramTableModel;
