import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CateringBaseInfoDetailsRecord } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";

const CateringBaseInfoDetailsTableModel = ({
  onEditHandler,
  onDeactivateHandler,
  productCategoryTitle,
}: {
  onEditHandler: (record: CateringBaseInfoDetailsRecord) => void;
  onDeactivateHandler: (record: CateringBaseInfoDetailsRecord) => void;
  productCategoryTitle: string;
}): CustomColumnType<CateringBaseInfoDetailsRecord>[] => [
  {
    title: `عنوان ${productCategoryTitle}`,
    dataIndex: "title",
    key: "title",
    ...GetServerColumnSearchProps({
      dataIndex: "title",
      label: `عنوان ${productCategoryTitle}`,
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "آخرین اقدام کننده",
    dataIndex: "modifiedBy",
    key: "modifiedBy",
    width: 180,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "تاریخ آخرین اقدام",
    dataIndex: "modifiedDate",
    key: "modifiedDate",
    width: 180,
    ...GetServerColumnSearchProps({
      dataIndex: "modifiedDate",
      label: "تاریخ آخرین اقدام",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "HH:mm، YYYY-MM-DD",
      }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    width: 200,
    className: "tables-sticky-column-left",
    render: (_: unknown, record: CateringBaseInfoDetailsRecord) => (
      <div className="flex">
        <CustomButton type="link" onClick={() => onEditHandler(record)}>
          ویرایش
        </CustomButton>
        <CustomButton type="link" danger onClick={() => onDeactivateHandler(record)}>
          غیر فعالسازی
        </CustomButton>
      </div>
    ),
  },
];

export default CateringBaseInfoDetailsTableModel;
