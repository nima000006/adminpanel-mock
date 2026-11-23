import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";

import {
  restaurantTitle,
  vendorTitle,
  startDate,
  endDate,
  status,
  TableModelId,
} from "../../../../../_Shared/utils/ContractTableListModel";
import { ViewClickType, MyContractsListItem } from "../../../@types/@myContractsList";

const MyContractListTableModel = ({
  viewClickHandler,
}: {
  viewClickHandler: ({ contractId, selfId, vendorId, title }: ViewClickType) => void;
}) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "contractTitle",
        label: "عنوان",
        type: "text",
        pageName: "page",
        pageSizeName: "pageSize",
      }),
    },
    {
      title: "شماره قرارداد",
      dataIndex: "contractUUID",
      key: "contractUUID",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "contractUUID",
        label: "شماره قرارداد",
        type: "text",
        pageName: "page",
        pageSizeName: "pageSize",
      }),
    },
    restaurantTitle,
    vendorTitle,
    startDate,
    endDate,
    status,
    {
      ...TableModelId,
      render: (id: number, records: MyContractsListItem) => {
        return (
          <CustomButton
            type="link"
            onClick={() =>
              viewClickHandler({
                contractId: id,
                selfId: records?.restaurantId,
                vendorId: records?.vendorId,
                title: records?.title,
              })
            }
            disabled={!id}
          >
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default MyContractListTableModel;
