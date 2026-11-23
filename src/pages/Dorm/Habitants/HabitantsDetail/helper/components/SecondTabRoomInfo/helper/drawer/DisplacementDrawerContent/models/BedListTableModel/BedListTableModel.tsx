import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dormBedAllocationStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";

import { BedListData } from "../../@type/@displacementDrawerContent";
const BedListTableModel = () => {
  return [
    {
      title: "عنوان تخت",
      dataIndex: "bedTitle",
      key: "bedTitle",
      width: 130,
      searchable: true,
    },
    {
      title: "شماره تخت",
      dataIndex: "bedNumber",
      key: "bedNumber",
      width: 130,
      searchable: true,
    },
    {
      title: "نوع تخت",
      dataIndex: "bedTypeTitle",
      key: "bedTypeTitle",
      width: 130,
    },
    {
      title: "وضعیت",
      dataIndex: "bedStateTitle",
      key: "bedStateTitle",
      width: 130,
      render: (value: number, records: BedListData) => {
        return (
          <CustomTag color={dormBedAllocationStatusColor[records?.bedStateId]}>
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "نام",
      dataIndex: "customerFirstname",
      key: "customerFirstname",
      width: 130,
    },
  ];
};

export default BedListTableModel;
