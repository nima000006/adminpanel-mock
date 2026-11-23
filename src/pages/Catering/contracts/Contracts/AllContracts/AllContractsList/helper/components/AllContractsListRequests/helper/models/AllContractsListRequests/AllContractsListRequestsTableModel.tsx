import { BsEye } from "react-icons/bs";
import { HiOutlineDocumentCheck } from "react-icons/hi2";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  getRequestContractCompleteActionTitle,
  getRequestContractStatusLabel,
  getRequestContractStatusTagColor,
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_TYPE_COLOR,
  REQUEST_CONTRACT_TYPE_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import { AllContractsListRequestsRecordType } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/@types/@allContractsListRequests";

const AllContractsListRequestsTableModel = ({
  onView,
  onComplete,
}: {
  onView: (record: AllContractsListRequestsRecordType) => void;
  onComplete: (record: AllContractsListRequestsRecordType) => void;
}): CustomColumnType<AllContractsListRequestsRecordType>[] => [
  {
    title: "شماره درخواست",
    dataIndex: "id",
    key: "id",
    width: 140,
    ...GetServerColumnSearchProps({
      dataIndex: "id",
      label: "شماره درخواست",
      type: "text",
    }),
    render: (value: number) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نوع درخواست",
    dataIndex: "status",
    key: "requestType",
    width: 140,
    render: (status: number) => {
      const requestType = getRequestContractTypeByStatus(status);

      if (!requestType) return "-";

      return (
        <CustomTag color={REQUEST_CONTRACT_TYPE_COLOR[requestType]} className="w-fit">
          {REQUEST_CONTRACT_TYPE_TEXT[requestType]}
        </CustomTag>
      );
    },
  },
  {
    title: "وضعیت درخواست",
    dataIndex: "status",
    key: "requestStatus",
    width: 160,
    render: (status: number) => (
      <CustomTag color={getRequestContractStatusTagColor(status)} className="w-fit">
        {getRequestContractStatusLabel(status)}
      </CustomTag>
    ),
  },
  {
    title: "عنوان قرارداد",
    dataIndex: "title",
    key: "title",
    width: 220,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شماره قرارداد",
    dataIndex: "contractUUID",
    key: "contractUUID",
    width: 180,
    ...GetServerColumnSearchProps({
      dataIndex: "contractUUID",
      label: "شماره قرارداد",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "سلف",
    dataIndex: "restaurantTitle",
    key: "restaurantTitle",
    width: 180,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "تأمین کننده",
    dataIndex: "vendorTitle",
    key: "vendorTitle",
    width: 220,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "actions",
    width: 50,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (_: unknown, record: AllContractsListRequestsRecordType) => {
      const completeActionTitle = getRequestContractCompleteActionTitle(record.status);
      const contentItems = [
        {
          id: 1,
          Icon: BsEye,
          title: "مشاهده",
          onclick: () => onView(record),
        },
        ...(completeActionTitle
          ? [
              {
                id: 2,
                Icon: HiOutlineDocumentCheck,
                title: completeActionTitle,
                onclick: () => onComplete(record),
              },
            ]
          : []),
      ];

      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];

export default AllContractsListRequestsTableModel;
