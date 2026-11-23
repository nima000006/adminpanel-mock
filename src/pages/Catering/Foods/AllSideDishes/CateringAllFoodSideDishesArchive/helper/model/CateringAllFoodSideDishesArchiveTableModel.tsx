import { BsEye } from "react-icons/bs";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CateringAllFoodSideDishesArchiveTableModelProps } from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesArchive/@types/@cateringAllFoodSideDishesArchive";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const CateringAllFoodSideDishesArchiveTableModel = ({
  onView,
}: CateringAllFoodSideDishesArchiveTableModelProps): CustomColumnType<GetDetailAllSelfsProductsContent>[] => [
  {
    title: "عنوان مخلفات",
    dataIndex: "baseProductTitle",
    key: "baseProductTitle",
    width: 160,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "عنوان نمایشی مخلفات",
    dataIndex: "title",
    key: "title",
    width: 220,
    ...GetServerColumnSearchProps({
      dataIndex: "title",
      label: "عنوان نمایشی مخلفات",
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
    title: "قیمت",
    dataIndex: "studentalPrice",
    key: "studentalPrice",
    width: 160,
    ...GetServerColumnSearchProps({
      dataIndex: "studentalPrice",
      label: "قیمت",
      type: "sort",
    }),
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        isRial: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "actions",
    width: 50,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (_: number, record: GetDetailAllSelfsProductsContent) => {
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

export default CateringAllFoodSideDishesArchiveTableModel;
