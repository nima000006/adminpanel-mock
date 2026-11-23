import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { getCateringFoodHistoryRevisionTypeLabel } from "@pages/Catering/Foods/_shared/utils";
import { CateringMyFoodSideDishesListViewHistoryTableModelProps } from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesList/@types/@cateringMyFoodSideDishesList";
import { CateringMyFoodSideDishesListViewHistoryRecordType } from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesList/helper/drawer/CateringMyFoodSideDishesListViewDrawerContent/@types/@cateringMyFoodSideDishesListViewDrawerContent";

const CateringMyFoodSideDishesListViewHistoryTableModel = ({
  onViewHandler,
}: CateringMyFoodSideDishesListViewHistoryTableModelProps = {}): CustomColumnType<CateringMyFoodSideDishesListViewHistoryRecordType>[] => [
  {
    title: "اقدام انجام شده",
    dataIndex: "revisionType",
    key: "revisionType",
    width: 160,
    render: (value: string) =>
      dataPlaceHolder({ data: getCateringFoodHistoryRevisionTypeLabel(value) }),
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
      dataIndex: "modifiedDateDate",
      label: "تاریخ آخرین اقدام",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "YYYY/MM/DD، HH:mm",
      }),
  },
  {
    title: "",
    dataIndex: "revisionNumber",
    key: "actions",
    width: 100,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (_value, record) => (
      <div className="flex">
        <CustomButton type="link" onClick={() => onViewHandler?.(record)}>
          مشاهده
        </CustomButton>
      </div>
    ),
  },
];

export default CateringMyFoodSideDishesListViewHistoryTableModel;
