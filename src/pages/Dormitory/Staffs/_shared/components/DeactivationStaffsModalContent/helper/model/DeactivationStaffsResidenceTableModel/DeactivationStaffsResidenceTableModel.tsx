import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";

const DeactivationStaffsResidenceTableModel = (): CustomColumnType<any>[] => {
  return [
    {
      title: "اقامتگاه",
      dataIndex: "residenceName",
      key: "residenceName",
    },
  ];
};

export default DeactivationStaffsResidenceTableModel;
