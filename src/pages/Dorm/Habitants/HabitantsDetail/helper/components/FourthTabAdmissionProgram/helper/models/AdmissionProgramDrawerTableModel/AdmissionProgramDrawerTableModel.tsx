import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { LimitText } from "@infra/helpers/utils";
import {
  habitantEndDate,
  habitantStartDate,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/utils/HabitantDetailTableModel";

const AdmissionProgramDrawerTableModel = () => {
  return [
    {
      title: "عنوان زمان‌بندی",
      dataIndex: "scheduleTitle",
      key: "scheduleTitle",
      width: 100,
      render: (value: string) => {
        return <CustomTooltip title={value}>{LimitText(value, 15)}</CustomTooltip>;
      },
    },
    habitantStartDate,
    {
      title: "ساعت شروع",
      dataIndex: "startTime",
      key: "startTime",
      width: 100,
      render: (value: string) => {
        return <SingleVerticalItem label="" value={value} isTime={true} />;
      },
    },
    habitantEndDate,
    {
      title: "ساعت پایان",
      dataIndex: "endTime",
      key: "endTime",
      width: 100,
      render: (value: string) => {
        return <SingleVerticalItem label="" value={value} isTime={true} />;
      },
    },
  ];
};
export default AdmissionProgramDrawerTableModel;
