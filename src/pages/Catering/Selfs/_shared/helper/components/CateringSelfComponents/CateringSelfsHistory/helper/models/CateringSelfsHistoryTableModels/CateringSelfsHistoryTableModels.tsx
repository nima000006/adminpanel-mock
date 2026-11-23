import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CateringSelfsHistoryRecordType } from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsHistory/@types/@cateringSelfsHistory";
import { getCateringSelfHistoryRevisionTypeLabel } from "@pages/Catering/Selfs/_shared/utils";

const CateringSelfsHistoryTableModels = ({
  onViewHandler,
}: {
  onViewHandler?: (record: CateringSelfsHistoryRecordType) => void;
}): CustomColumnType<CateringSelfsHistoryRecordType>[] => {
  return [
    {
      title: "اقدام انجام شده",
      dataIndex: "revisionType",
      key: "revisionType",
      width: 160,
      render: (value: string) =>
        dataPlaceHolder({ data: getCateringSelfHistoryRevisionTypeLabel(value) }),
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
          customDateFormat: "YYYY/MM/DD، HH:mm",
        }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "actions",
      width: 100,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: CateringSelfsHistoryRecordType) => (
        <div className="flex">
          <CustomButton type="link" onClick={() => onViewHandler?.(record)}>
            مشاهده
          </CustomButton>
        </div>
      ),
    },
  ];
};

export default CateringSelfsHistoryTableModels;
