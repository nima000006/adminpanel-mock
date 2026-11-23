import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { renderCateringProductCategoryCustomTag } from "@pages/Catering/_shared/utils";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const MyContractsListRequestsRenewedDrawerContentFoodsTableModel =
  (): CustomColumnType<GetDetailMySelfsProductsContent>[] => [
    {
      title: "غذا",
      dataIndex: "baseProductTitle",
      key: "baseProductTitle",
      width: 160,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع غذا",
      dataIndex: "categoryId",
      key: "categoryId",
      width: 140,
      render: (value: number) => renderCateringProductCategoryCustomTag(value),
    },
    {
      title: "عنوان نمایشی در پنل ادمین",
      dataIndex: "title",
      key: "title",
      width: 260,
      ...GetServerColumnSearchProps({
        dataIndex: "viewTitle",
        label: "عنوان نمایشی در پنل ادمین",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "قیمت دانشجویی",
      dataIndex: "studentalPrice",
      key: "studentalPrice",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "studentalPrice",
        label: "قیمت دانشجویی",
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
      title: "حداکثر قیمت",
      dataIndex: "maxPrice",
      key: "maxPrice",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "maxPrice",
        label: "حداکثر قیمت",
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
  ];

export default MyContractsListRequestsRenewedDrawerContentFoodsTableModel;
