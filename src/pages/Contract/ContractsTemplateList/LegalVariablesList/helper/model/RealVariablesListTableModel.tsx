import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { UndeterminedRuleBeneficiaryContent } from "../../@types/@legalVariablesList";

const RealVariablesListTableModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (id: number) => void;
}): CustomColumnType<UndeterminedRuleBeneficiaryContent>[] => {
  return [
    {
      title: "کاربران ذینفع ",
      dataIndex: "beneficiaryFullName",
      key: "beneficiaryFullName",
      width: 100,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کدملی/فراگیر",
      dataIndex: "naturalCode",
      key: "naturalCode",
      width: 100,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 70,
      render: (value: { id: number; name: string; title: string }) => {
        return (
          <CustomTag className="w-fit" color={value?.name === "ACTIVE" ? "green" : "red"}>
            {dataPlaceHolder({ data: value?.title })}
          </CustomTag>
        );
      },
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
        }),
    },
    {
      title: "تاریخ پایان",
      dataIndex: "endDate",
      key: "endDate",
      width: 100,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
        }),
    },
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "lastModifier",
      key: "lastModifier",
      width: 150,
      render: () => emptyString,
    },
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      width: 150,
      render: () => emptyString,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right" as FixedType,
      width: 70,
      className: "tables-sticky-column-left",
      render: (_: number, records: UndeterminedRuleBeneficiaryContent) => (
        <CustomButton type="link" onClick={() => viewClickHandler(records?.id)}>
          مشاهده
        </CustomButton>
      ),
    },
  ];
};
export default RealVariablesListTableModel;
