import { BsEye } from "react-icons/bs";
import { PiCopy } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GetDetailMySelfsContractsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

const MyContractsArchieveListTableModel = ({
  onView,
  onCopy,
}: {
  onView: (record: GetDetailMySelfsContractsContent) => void;
  onCopy: (record: GetDetailMySelfsContractsContent) => void;
}): CustomColumnType<GetDetailMySelfsContractsContent>[] => [
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
    width: 160,
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
    title: "شعبه / واحد",
    dataIndex: "id",
    key: "branch",
    width: 140,
    render: () => <CustomTag className="w-fit">{emptyString}</CustomTag>,
  },
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
    title: "آخرین اقدام کننده",
    dataIndex: "modifiedBy",
    key: "modifiedBy",
    width: 150,
    //todo[nima]: uncomment when api will be ready
    // ...GetServerColumnSearchProps({
    //   dataIndex: "modifiedBy",
    //   label: "آخرین اقدام کننده",
    //   type: "text",
    // }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "تاریخ آخرین اقدام",
    dataIndex: "modifiedDate",
    key: "modifiedDate",
    width: 170,
    ...GetServerColumnSearchProps({
      dataIndex: "modifiedDate",
      label: "تاریخ آخرین اقدام",
      type: "sort",
    }),
    render: (value: string) =>
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
    width: 50,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (_: unknown, record: GetDetailMySelfsContractsContent) => {
      const contentItems = [
        {
          id: 1,
          Icon: BsEye,
          title: "مشاهده",
          onclick: () => onView(record),
        },
        {
          id: 2,
          Icon: PiCopy,
          title: "کپی",
          onclick: () => onCopy(record),
        },
      ];

      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];

export default MyContractsArchieveListTableModel;
