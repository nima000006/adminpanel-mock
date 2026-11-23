import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { transferSourceCreatorDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/BranchTab/helper/drawer/ViewBranchDrawerContent/helper/components/BranchPositionSegmentedContent/@type/@branchPositionSegmentedContent";

const BranchPositionSegmentedTableModel =
  (): CustomColumnType<transferSourceCreatorDataType>[] => {
    return [
      {
        title: "عنوان سمت",
        dataIndex: "positionTitle",
        key: "positionTitle",
        width: 150,
      },
      {
        title: "نوع سمت ",
        dataIndex: "positionType",
        key: "positionType",
        width: 150,
        render: (value: number) => {
          return <CustomTag color={"blue"}>{value}</CustomTag>;
        },
      },
      {
        title: "فعال در",
        dataIndex: "activeIn",
        key: "activeIn",
        width: 150,
      },
      {
        title: "سمت والد",
        dataIndex: "parentPosition",
        key: "parentPosition",
        width: 150,
        render: (value: number) => {
          return <CustomTag color={"purple"}>{value}</CustomTag>;
        },
      },
      {
        title: "توضیحات",
        dataIndex: "desc",
        key: "desc",
        width: 150,
      },
    ];
  };
export default BranchPositionSegmentedTableModel;
