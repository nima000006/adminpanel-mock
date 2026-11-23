import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";
import { businessTypeConfig } from "@pages/Wallet/Requests/BankAccount/BankAccountList/_shared/utils";

const PendingConfirmAllRequestDrawerTableModel = ({
  deleteHandler,
}: {
  deleteHandler: (value: number) => void;
}): CustomColumnType<RequestBankAccountDataType>[] => {
  return [
    {
      title: "روز شمار",
      dataIndex: "dataAndTimeRequest",
      key: "dataAndTimeRequest",
      width: 100,
      render: (_: unknown, records: RequestBankAccountDataType) => (
        <div className="custom-Custom-diff-days">
          <CustomTagWithDiffDays value={records?.createdDate} />
        </div>
      ),
    },
    {
      title: "شماره درخواست",
      dataIndex: "requestNumber",
      key: "requestNumber",
      width: 140,
      render: (_: unknown, records) => {
        return <> {dataPlaceHolder({ data: records?.id })}</>;
      },
    },
    {
      title: "شماره کارت",
      dataIndex: "cardNumber",
      key: "cardNumber",
      width: 130,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره شبا",
      dataIndex: "iban",
      key: "iban",
      width: 130,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام کسب و کار ",
      dataIndex: "businessName",
      key: "businessName",
      width: 130,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شعبه / واحد",
      dataIndex: "branchName",
      key: "branchName",
      width: 130,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع کسب و کار",
      dataIndex: "personalityGroupType",
      key: "personalityGroupType",
      width: 150,
      render: (value: IdTitleName) => {
        const config = businessTypeConfig[value?.name as keyof typeof businessTypeConfig];

        return (
          <CustomTag color={config?.color ?? "default"} icon={config?.icon}>
            {config ? dataPlaceHolder({ data: value?.title }) : "نامشخص"}
          </CustomTag>
        );
      },
    },
    {
      title: "کد شعبه",
      dataIndex: "branchCode",
      key: "branchCode",
      width: 150,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام بانک",
      dataIndex: "bankName",
      key: "bankName",
      width: 150,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: " سرویس",
      dataIndex: "services",
      key: "services",
      width: 150,
      render: (value: IdTitleName[]) => (
        <div className="flex flex-wrap gap-1">
          {value?.map((service) => (
            <SamimServiceTag key={service?.id ?? service?.name} service={service?.name} />
          ))}
        </div>
      ),
    },
    {
      title: "استان",
      dataIndex: "province",
      key: "province",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "city",
      key: "city",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "مسئول کسب وکار",
      dataIndex: "businessManager",
      key: "businessManager",
      width: 150,
      render: (_: unknown, records) => (
        <>
          {dataPlaceHolder({ data: records?.createdBy?.firstName })}{" "}
          {dataPlaceHolder({ data: records?.createdBy?.lastName })}{" "}
        </>
      ),
    },
    {
      title: "شماره همراه مسئول",
      dataIndex: "mobileManager",
      key: "mobileManager",
      width: 150,
      render: (_: unknown, records) => (
        <>{dataPlaceHolder({ data: records?.createdBy?.mobileNumber })}</>
      ),
    },
    {
      title: "تاریخ و زمان ثبت درخواست",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 170,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY-MM-DD",
        });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 78,
      className: "tables-sticky-column-left",
      render: (value: number) => (
        <CustomButton danger type="link" onClick={() => deleteHandler(value)}>
          حذف از لیست
        </CustomButton>
      ),
    },
  ];
};
export default PendingConfirmAllRequestDrawerTableModel;
