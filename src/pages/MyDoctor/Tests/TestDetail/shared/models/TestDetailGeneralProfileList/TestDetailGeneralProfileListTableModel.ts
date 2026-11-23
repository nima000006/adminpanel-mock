import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { testDetailGeneralProfileListDataSourceType } from "@pages/MyDoctor/Tests/TestDetail/shared/models/TestDetailGeneralProfileList/@types/@testDetailGeneralProfileListTableModel";

export const TestDetailGeneralProfileListTableModel: CustomColumnType<testDetailGeneralProfileListDataSourceType>[] =
  [
    {
      title: "نام محور",
      dataIndex: "axisName",
      key: "axisName",
      width: 100,
    },
    {
      title: "بازه نمره",
      dataIndex: "scoreRange",
      key: "scoreRange",
      width: 100,
    },
    {
      title: "عدم نیاز پیگیری",
      dataIndex: "noNeedToFollowUp",
      key: "noNeedToFollowUp",
      width: 100,
    },
    {
      title: "نیازمند پیگیری",
      dataIndex: "needToFollowUp",
      key: "needToFollowUp",
      width: 100,
    },
    {
      title: "نیازمند پیگیری فوری",
      dataIndex: "needImmediateFollowUp",
      key: "needImmediateFollowUp",
      width: 100,
    },
  ];
