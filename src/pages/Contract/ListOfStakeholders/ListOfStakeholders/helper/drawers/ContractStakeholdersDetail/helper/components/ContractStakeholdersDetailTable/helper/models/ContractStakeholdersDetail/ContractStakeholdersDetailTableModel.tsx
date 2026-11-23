import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

const ContractStakeholdersDetailTableModel = ({
  ReasonDisableClickHandler,
}: {
  ReasonDisableClickHandler: (id: number) => void;
}): CustomColumnType<{
  status: string;
  startData: string;
  endDate: string;
  modifiedBy: string;
  modifiedDate: string;
}>[] => {
  return [
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (value: string) => {
        return (
          <CustomTag color="green">
            {dataPlaceHolder({ data: value.toString() })}
          </CustomTag>
        );
      },
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startData",
      key: "startData",
      width: 150,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "YYYY-MM-DD",
            })}
          </>
        );
      },
    },
    {
      title: "تاریخ پایان",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "YYYY-MM-DD",
            })}
          </>
        );
      },
    },
    {
      title: " ویرایش کننده",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 200,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY-MM-DD",
            })}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (value: number, record: any) =>
        record?.status === false ? (
          <CustomButton type="link" onClick={() => ReasonDisableClickHandler(value)}>
            علت غیرفعالسازی
          </CustomButton>
        ) : null,
    },
  ];
};

export default ContractStakeholdersDetailTableModel;
