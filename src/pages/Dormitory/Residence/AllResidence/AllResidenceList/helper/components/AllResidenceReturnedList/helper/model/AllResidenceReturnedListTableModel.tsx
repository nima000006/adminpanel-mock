import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORMITORY_ALL_RESIDENCE_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { AllResidenceListSearchContent } from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceWaitingList/@types/@allResidenceWaitingList";

const AllResidenceReturnedListTableModel = ({
  status,
}: {
  status: string;
}): CustomColumnType<AllResidenceListSearchContent>[] => [
  {
    title: "شماره درخواست",
    dataIndex: "requestNumber",
    key: "requestNumber",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "requestNumber",
      label: "شماره درخواست",
      type: "text",
    }),
  },
  {
    title: "نوع درخواست",
    dataIndex: "requestKind",
    key: "requestKind",
    width: 150,
    render: (_: unknown, record: AllResidenceListSearchContent) => {
      return (
        <CustomTag className="w-fit" color={"green"}>
          <AiOutlinePlus /> {record?.requestKind?.title}
        </CustomTag>
      );
    },
  },
  {
    title: "اقامتگاه",
    dataIndex: "faTitle",
    key: "faTitle",
    width: 170,
  },
  {
    title: "نوع اقامتگاه",
    dataIndex: "accommodationType",
    key: "accommodationType",
    width: 110,
    render: (_: unknown, record: AllResidenceListSearchContent) =>
      record?.accommodationType?.title,
  },
  {
    title: "شعبه / واحد",
    dataIndex: "branchName",
    key: "branchName",
    width: 110,
  },
  {
    title: "ایجاد کننده",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 150,
  },
  {
    title: "تاریخ ایجاد",
    dataIndex: "createdDate",
    key: "createdDate",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "createdDate",
      label: "تاریخ ایجاد",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "HH:mm, YYYY/MM/DD ",
      }),
  },
  {
    title: "آخرین اقدام کننده",
    dataIndex: "modifiedBy",
    key: "modifiedBy",
    width: 150,
  },
  {
    title: "تاریخ آخرین اقدام",
    dataIndex: "modifiedDate",
    key: "modifiedDate",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "modifiedDate",
      label: "تاریخ آخرین اقدام",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "HH:mm, YYYY/MM/DD ",
      }),
  },
  {
    title: "",
    dataIndex: "uuid",
    key: "uuid",
    fixed: "right" as FixedType,
    width: 70,
    render: (_: unknown, records: AllResidenceListSearchContent) => (
      <div className="flex gap-2">
        <Link
          to={{
            pathname: DORMITORY_ALL_RESIDENCE_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              id: records?.uuid,
              status,
            }),
          }}
        >
          <CustomButton iconPlacement="end" type="link">
            مشاهده
          </CustomButton>
        </Link>
      </div>
    ),
  },
];
export default AllResidenceReturnedListTableModel;
