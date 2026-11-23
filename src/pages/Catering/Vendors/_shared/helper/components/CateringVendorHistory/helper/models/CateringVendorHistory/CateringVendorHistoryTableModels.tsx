import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CateringVendorHistoryRecordType } from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/@types/@cateringVendorHistory";
import { getCateringVendorHistoryRevisionTypeLabel } from "@pages/Catering/Vendors/_shared/utils";

const CateringVendorHistoryTableModels = ({
  onViewHandler,
}: {
  onViewHandler?: (record: CateringVendorHistoryRecordType) => void;
}): CustomColumnType<CateringVendorHistoryRecordType>[] => {
  return [
    {
      title: "اقدام انجام شده",
      dataIndex: "revisionType",
      key: "revisionType",
      width: 160,
      render: (value: string) =>
        dataPlaceHolder({ data: getCateringVendorHistoryRevisionTypeLabel(value) }),
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
      dataIndex: "revisionNumber",
      key: "actions",
      width: 100,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: CateringVendorHistoryRecordType) => (
        <div className="flex">
          <CustomButton type="link" onClick={() => onViewHandler?.(record)}>
            مشاهده
          </CustomButton>
        </div>
      ),
    },
  ];
};

export default CateringVendorHistoryTableModels;
