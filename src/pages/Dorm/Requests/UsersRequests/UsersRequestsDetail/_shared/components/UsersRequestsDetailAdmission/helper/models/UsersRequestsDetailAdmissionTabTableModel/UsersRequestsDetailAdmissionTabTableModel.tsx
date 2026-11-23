import { AiTwotoneQuestionCircle } from "react-icons/ai";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { HabitantAdmissionTabData } from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/FourthTabAdmissionProgram/@types/@fourthTabAdmissionProgram";

import {
  startDate,
  startTime,
  endDate,
  endTime,
} from "../../utils/usersRequestsDetailAdmissionTableModel";
import "./_usersRequestsDetailAdmissionTabTableModel.scss";

const UsersRequestsDetailAdmissionTabTableModel = () => {
  return [
    {
      title: "عنوان زمان‌بندی",
      dataIndex: "title",
      key: "title",
      width: 130,
      render: (_: unknown, record: HabitantAdmissionTabData | null, index: number) => {
        // Decide tooltip text based on row index
        const tooltipText =
          index === 0
            ? "بازه زمانی مجاز برای انجام رزرو خوابگاه."
            : "تاریخ شروع و پایان حضور و اسکان متقاضی خوابگاه.";

        return (
          <div className="dorm-user-request-admission-table-field">
            {record?.title}
            <CustomTooltip title={tooltipText}>
              <AiTwotoneQuestionCircle className="question-mark" />
            </CustomTooltip>
          </div>
        );
      },
    },
    startDate,
    startTime,
    endDate,
    endTime,
  ];
};
export default UsersRequestsDetailAdmissionTabTableModel;
