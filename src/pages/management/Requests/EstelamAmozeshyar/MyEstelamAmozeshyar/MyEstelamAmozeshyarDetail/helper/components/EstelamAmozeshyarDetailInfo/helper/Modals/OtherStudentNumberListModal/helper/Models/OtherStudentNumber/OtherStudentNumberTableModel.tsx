import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

const OtherStudentNumberTableModel = () => [
  {
    title: "شماره دانشجویی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 144,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },

  {
    title: "واحد دانشگاهی",
    dataIndex: "branchName",
    key: "branchName",
    width: 145,
    render: (value: string) => {
      if (!value) return "-";
      return (
        <CustomTag className="management-custom-tag">
          {dataPlaceHolder({ data: value })}
        </CustomTag>
      );
    },
  },
  {
    title: "نوع استعلام",
    dataIndex: "manuallyCreated",
    key: "manuallyCreated",
    width: 144,
    render: (value: boolean) => {
      const isActive = value === true;
      return (
        <CustomTag className="management-custom-tag" color={isActive ? "error" : "blue"}>
          {isActive ? "دستی" : "سیستمی"}
        </CustomTag>
      );
    },
  },
];

export default OtherStudentNumberTableModel;
