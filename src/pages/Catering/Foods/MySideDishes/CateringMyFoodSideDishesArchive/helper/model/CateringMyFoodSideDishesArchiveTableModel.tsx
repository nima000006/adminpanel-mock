import { BsEye } from "react-icons/bs";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CateringMyFoodSideDishesArchiveTableModelProps } from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesArchive/@types/@cateringMyFoodSideDishesArchive";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const CateringMyFoodSideDishesArchiveTableModel = ({
  onView,
}: CateringMyFoodSideDishesArchiveTableModelProps): CustomColumnType<GetDetailMySelfsProductsContent>[] => [
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
    render: (_: number, record: GetDetailMySelfsProductsContent) => {
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

export default CateringMyFoodSideDishesArchiveTableModel;
