import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { ContractStackHoldersListItem } from "../../@types/@listOfStakeholdersTypes";

const ListOfStakeholdersTableModel = ({
  openDetailDrawerHandler,
}: {
  openDetailDrawerHandler: (id: number) => void;
}): CustomColumnType<ContractStackHoldersListItem>[] => {
  return [
    {
      title: "ذینغع",
      dataIndex: "beneficiaryName",
      key: "beneficiaryName",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (value: IdTitleName) => {
        return (
          <CustomTag color={value?.name === "ACTIVE" ? "green" : "red"}>
            {dataPlaceHolder({ data: value?.title.toString() })}
          </CustomTag>
        );
      },
    },
    {
      title: "قرارداد",
      dataIndex: "contractId",
      key: "contractId",
      width: 150,
      render: (value: number) => dataPlaceHolder({ data: value.toString() }),
    },
    {
      title: "سهم",
      dataIndex: "partitionCoefficient",
      key: "partitionCoefficient",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "قالب ذینفع",
      dataIndex: "beneficiaryRuleType",
      key: "beneficiaryRuleType",
      width: 150,
      render: (value: IdTitleName) => {
        return <span>{dataPlaceHolder({ data: value?.title.toString() })}</span>;
      },
    },
    {
      title: "نوع ",
      dataIndex: "personalityType",
      key: "personalityType",
      width: 150,
      render: (value: IdTitleName, records: ContractStackHoldersListItem) => {
        return (
          <div className="flex gap-2">
            <CustomTag
              color={
                value?.title === "حقوقی"
                  ? "blue"
                  : value?.title === "حقیقی"
                    ? "gold"
                    : "default"
              }
            >
              {dataPlaceHolder({ data: value?.title?.toString() })}
            </CustomTag>
            {records?.isMain ? <span>تامین کننده</span> : null}
          </div>
        );
      },
    },
    {
      title: "خدمت سهامدار",
      dataIndex: "shareHolderService",
      key: "shareHolderService",
      width: 150,
      render: () => emptyString,
    },
    {
      title: "فروشنده",
      dataIndex: "supplierName",
      key: "supplierName",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "اکوسیستم",
      dataIndex: "ecosystem",
      key: "ecosystem",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سرویس",
      dataIndex: "samimService",
      key: "samimService",
      width: 150,
      render: (value: IdTitleName) => {
        return <SamimServiceTag service={value?.name} />;
      },
    },
    {
      title: "خدمت",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value?.toString() })}</CustomTag>;
      },
    },
    {
      title: "نوع شعبه ",
      dataIndex: "branchType",
      key: "branchType",
      width: 150,
      render: (value: IdTitleName) => {
        return <span>{dataPlaceHolder({ data: value?.title?.toString() })}</span>;
      },
    },
    {
      title: "کسب وکار",
      dataIndex: "businessName",
      key: "businessName",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startDate",
      key: "startDate",
      width: 150,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
        });
      },
    },
    {
      title: "تاریخ پایان",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
        });
      },
    },
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 250,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
        });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 75,
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      render: (value: number) => {
        return (
          <CustomButton type="link" onClick={() => openDetailDrawerHandler(value)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default ListOfStakeholdersTableModel;
