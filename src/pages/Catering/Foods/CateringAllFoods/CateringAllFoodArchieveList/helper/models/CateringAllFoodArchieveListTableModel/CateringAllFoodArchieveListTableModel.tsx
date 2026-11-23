import { BsEye } from "react-icons/bs";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  getRequestContractRowStatusByStatus,
  REQUEST_CONTRACT_STATUS_COLOR,
  REQUEST_CONTRACT_STATUS_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const CateringAllFoodArchieveListTableModel = ({
  onView,
}: {
  onView: (id: number) => void;
}): CustomColumnType<GetDetailAllSelfsProductsContent>[] => {
  return [
    {
      title: "غذا",
      dataIndex: "baseProductTitle",
      key: "",
      width: 180,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "عنوان نمایشی در پنل ادمین",
      dataIndex: "title",
      key: "title",
      width: 220,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان نمایشی در پنل ادمین",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "قرارداد",
      dataIndex: "contractTitle",
      key: "contractTitle",
      width: 220,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "وضعیت قرارداد",
      dataIndex: "contractStatus",
      key: "contractStatus",
      width: 160,
      render: (status: number, record: GetDetailAllSelfsProductsContent) => {
        const rowStatus = getRequestContractRowStatusByStatus(status);

        if (!rowStatus) {
          return dataPlaceHolder({ data: record.contractStatusTitle });
        }

        return (
          <CustomTag color={REQUEST_CONTRACT_STATUS_COLOR[rowStatus]} className="w-fit">
            {REQUEST_CONTRACT_STATUS_TEXT[rowStatus]}
          </CustomTag>
        );
      },
    },
    {
      title: "سلف",
      dataIndex: "restaurantTitle",
      key: "restaurantTitle",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تأمین کننده",
      dataIndex: "vendorTitle",
      key: "vendorTitle",
      width: 220,
      render: (value: string, record: GetDetailAllSelfsProductsContent) =>
        dataPlaceHolder({ data: value || record.vendorName }),
    },
    {
      title: "شعبه / واحد",
      dataIndex: "branchName",
      key: "branchName",
      width: 160,
      render: (value: string) =>
        value ? (
          <CustomTag className="w-fit">{value}</CustomTag>
        ) : (
          dataPlaceHolder({ data: value })
        ),
    },
    {
      title: "استان",
      dataIndex: "provinceTitle",
      key: "provinceTitle",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "cityTitle",
      key: "cityTitle",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "قیمت دانشجویی",
      dataIndex: "studentalPrice",
      key: "studentalPrice",
      width: 150,
      //TODO[nima] uncomment when api will be ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "studentalPrice",
      //   label: "قیمت دانشجویی",
      //   type: "sort",
      // }),
      render: (value: number) =>
        dataPlaceHolder({
          data: value,
          isPrice: true,
          isRial: true,
          currency: { isAvailable: true, type: "تومان" },
        }),
    },
    {
      title: "حداکثر قیمت",
      dataIndex: "maxPrice",
      key: "maxPrice",
      width: 150,
      //TODO[nima] uncomment when api will be ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "maxPrice",
      //   label: "حداکثر قیمت",
      //   type: "sort",
      // }),
      render: (value: number) =>
        dataPlaceHolder({
          data: value,
          isPrice: true,
          isRial: true,
          currency: { isAvailable: true, type: "تومان" },
        }),
    },
    {
      title: "آخرین اقدام کننده",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      width: 140,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ آخرین اقدام",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 160,
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
      dataIndex: "id",
      key: "actions",
      width: 50,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: GetDetailAllSelfsProductsContent) => {
        const contentItems = [
          {
            id: 1,
            Icon: BsEye,
            title: "مشاهده",
            onclick: () => onView(record.id),
          },
        ];

        return <MenuActionPopover contentItems={contentItems} />;
      },
    },
  ];
};

export default CateringAllFoodArchieveListTableModel;
