import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export const ContractTitle = {
  title: "عنوان",
  dataIndex: "title",
  id: "title",
  width: 120,
};
export const ContractNumber = {
  title: "شماره قرارداد",
  dataIndex: "contractUUID",
  id: "contractUUID",
  width: 120,
};
export const StartContract = {
  title: "شروع قرارداد",
  dataIndex: "startedDate",
  id: "startedDate",
  width: 120,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
        })}
      </>
    );
  },
};
export const EndContract = {
  title: "پایان قرارداد",
  dataIndex: "endDate",
  id: "endDate",
  width: 120,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
        })}
      </>
    );
  },
};
export const Status = {
  title: "وضعیت",
  dataIndex: "active",
  id: "active",
  width: 120,
  render: (value: string) => {
    return (
      <CustomTag color={value ? "green" : "red"}>{value ? "فعال" : "غیرفعال"}</CustomTag>
    );
  },
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 100,
  className: "tables-sticky-column-left",
};
