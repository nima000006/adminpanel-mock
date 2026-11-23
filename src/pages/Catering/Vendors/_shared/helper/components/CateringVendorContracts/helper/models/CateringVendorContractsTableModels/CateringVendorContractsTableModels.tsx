import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { CateringVendorContractsRecordType } from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorContracts/@types/@cateringVendorContracts";

const CateringVendorContractsTableModels =
  (): CustomColumnType<CateringVendorContractsRecordType>[] => {
    return [
      {
        title: "عنوان قرارداد",
        dataIndex: "title",
        key: "title",
        width: 150,
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
        width: 150,
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
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "restaurantTitle",
          label: "سلف",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "شروع قرارداد",
        dataIndex: "startedDate",
        key: "startedDate",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "startedDate",
          label: "شروع قرارداد",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isDate: true,
          }),
      },
      {
        title: "پایان قرارداد",
        dataIndex: "endDate",
        key: "endDate",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "endDate",
          label: "پایان قرارداد",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isDate: true,
          }),
      },
      {
        title: "آخرین اقدام کننده",
        dataIndex: "modifiedBy",
        key: "modifiedBy",
        width: 150,
        render: (value: string) => dataPlaceHolder({ data: value }),
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
          }),
      },
    ];
  };

export default CateringVendorContractsTableModels;
