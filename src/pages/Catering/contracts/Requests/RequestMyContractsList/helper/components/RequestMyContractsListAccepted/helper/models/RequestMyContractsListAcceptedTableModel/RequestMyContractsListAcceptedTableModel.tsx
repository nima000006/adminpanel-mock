import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_TYPE_COLOR,
  REQUEST_CONTRACT_TYPE_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import { GetDetailMySelfsContractsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

const RequestMyContractsListAcceptedTableModel = (
  handleViewContract: (record: GetDetailMySelfsContractsContent) => void
): CustomColumnType<GetDetailMySelfsContractsContent>[] => [
  {
    title: "شناسه قرارداد",
    dataIndex: "id",
    key: "id",
    width: 120,
    // TODO[nima]: uncomment when api will be ready
    // ...GetServerColumnSearchProps({
    //   dataIndex: "id",
    //   label: "شناسه قرارداد",
    //   type: "text",
    // }),
    render: (value: number) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نوع درخواست",
    dataIndex: "status",
    key: "status",
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
    title: "عنوان قرارداد",
    dataIndex: "title",
    key: "title",
    width: 220,
    ...GetServerColumnSearchProps({
      dataIndex: "title",
      label: "عنوان قرارداد",
      type: "text",
    }),
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
    title: "تامین کننده",
    dataIndex: "vendorTitle",
    key: "vendorTitle",
    width: 220,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  // TODO[nima]: cto told that remove it, remove when figma will be updated
  // {
  //   title: "شعبه / واحد",
  //   dataIndex: "branch",
  //   key: "branch",
  //   width: 140,
  //   render: () => <CustomTag className="w-fit">{emptyString}</CustomTag>,
  // },
  {
    title: "استان",
    dataIndex: "restaurantProvinceTitle",
    key: "restaurantProvinceTitle",
    width: 110,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شهر",
    dataIndex: "restaurantCityTitle",
    key: "restaurantCityTitle",
    width: 100,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شروع قرارداد",
    dataIndex: "startedDate",
    key: "startedDate",
    width: 130,
    ...GetServerColumnSearchProps({
      dataIndex: "startedDate",
      label: "شروع قرارداد",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "YYYY/MM/DD",
      }),
  },
  {
    title: "پایان قرارداد",
    dataIndex: "endDate",
    key: "endDate",
    width: 130,
    ...GetServerColumnSearchProps({
      dataIndex: "endDate",
      label: "پایان قرارداد",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "YYYY/MM/DD",
      }),
  },
  {
    title: "درخواست دهنده",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 140,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  // TODO[nima]: cto told that remove it, remove when figma will be updated
  // {
  //   title: "شماره تماس درخواست دهنده",
  //   dataIndex: "requesterPhone",
  //   key: "requesterPhone",
  //   width: 190,
  //   render: () => emptyString,
  // },
  {
    title: "تاریخ ارسال درخواست",
    dataIndex: "createdDate",
    key: "requestSentDate",
    width: 170,
    ...GetServerColumnSearchProps({
      dataIndex: "createdDate",
      label: "تاریخ ارسال درخواست",
      type: "sort",
    }),
    render: (value?: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "YYYY/MM/DD, HH:mm",
      }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "actions",
    fixed: "right" as FixedType,
    width: 90,
    className: "tables-sticky-column-left",
    render: (_: unknown, record: GetDetailMySelfsContractsContent) => (
      <CustomButton type="link" onClick={() => handleViewContract(record)}>
        مشاهده
      </CustomButton>
    ),
  },
];

export default RequestMyContractsListAcceptedTableModel;
