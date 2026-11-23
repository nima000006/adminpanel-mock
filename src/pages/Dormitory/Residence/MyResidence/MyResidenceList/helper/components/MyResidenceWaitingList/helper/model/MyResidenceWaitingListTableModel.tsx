import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORMITORY_MY_RESIDENCE_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { MyResidenceListSearchContent } from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceWaitingList/@types/@myResidenceWaitingList";

const MyResidenceWaitingListTableModel = ({
  status,
}: {
  status: string;
}): CustomColumnType<MyResidenceListSearchContent>[] => [
  {
    title: "روز شمار",
    dataIndex: "createdDate",
    key: "dayCounter",
    width: 100,
    render: (value: string) => (
      <div>
        <CustomTagWithDiffDays value={value} />
      </div>
    ),
  },
  {
    title: "شماره درخواست",
    dataIndex: "requestNumber",
    key: "requestNumber",
    width: 180,
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
    render: (_: unknown, record: MyResidenceListSearchContent) => {
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
    width: 200,
  },
  {
    title: "نوع اقامتگاه",
    dataIndex: "accommodationType",
    key: "accommodationType",
    width: 150,
    render: (_: unknown, record: MyResidenceListSearchContent) =>
      record?.accommodationType?.title,
  },
  {
    title: "کسب و کار",
    dataIndex: "businessName",
    key: "businessName",
    width: 140,
  },
  {
    title: "شعبه / واحد",
    dataIndex: "branchName",
    key: "branchName",
    width: 170,
  },
  {
    title: "ظرفیت اسمی",
    dataIndex: "nominalCapacity",
    key: "nominalCapacity",
    width: 100,
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
      }),
  },
  {
    title: "ایجاد کننده",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 180,
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
    title: "",
    dataIndex: "uuid",
    key: "uuid",
    fixed: "right" as FixedType,
    width: 70,
    render: (_: unknown, records: MyResidenceListSearchContent) => (
      <div className="flex gap-2">
        <Link
          to={{
            pathname: DORMITORY_MY_RESIDENCE_DETAIL_PAGE_ROUTE,
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

export default MyResidenceWaitingListTableModel;
