import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { BranchOrganUnitSegmentedContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/BranchTab/helper/drawer/ViewBranchDrawerContent/helper/components/BranchOrganUnitSegmentedContent/@types/@branchOrganUnitSegmentedContent";

const BranchOrganUnitSegmentedTableModel =
  (): CustomColumnType<BranchOrganUnitSegmentedContentDataType>[] => {
    return [
      {
        title: "عنوان واحد",
        dataIndex: "unitTitle",
        key: "unitTitle",
        width: 150,
      },
      {
        title: "نوع واحد ",
        dataIndex: "unitType",
        key: "unitType",
        width: 150,
        render: (value: number) => {
          return <CustomTag color={"blue"}>{value}</CustomTag>;
        },
      },
      {
        title: "شعبه",
        dataIndex: "branch",
        key: "branch",
        width: 150,
        render: (value: number) => {
          return <CustomTag color={"blue"}>{value}</CustomTag>;
        },
      },
      {
        title: "والد واحد",
        dataIndex: "parentUnit",
        key: "parentUnit",
        width: 150,
      },
    ];
  };
export default BranchOrganUnitSegmentedTableModel;
