import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GetFinanceTransactionBuyerAdvanceFilterListItem } from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/@types/@buyersStepTypes";
const TransactionsBuyerStepListTableModel = ({
  viewBtnHandler,
}: {
  viewBtnHandler: (uuid: string) => void;
}): CustomColumnType<GetFinanceTransactionBuyerAdvanceFilterListItem>[] => {
  return [
    {
      title: "اطلاعات مالی تراکنش",
      children: [
        {
          title: "مبلغ کل تراکنش (تومان)",
          dataIndex: "transactionAmount",
          key: "transactionAmount",
          width: 200,
          ...GetServerColumnSearchProps({
            dataIndex: "money",
            label: "مبلغ کل تراکنش (تومان)",
            type: "sort",
          }),
          render: (value: number) =>
            dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true }),
        },
        {
          title: "شناسه تراکنش",
          dataIndex: "uuid",
          key: "uuid",
          width: 200,
          ...GetServerColumnSearchProps({
            dataIndex: "uuid",
            label: "شناسه تراکنش",
            type: "text",
          }),
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "تاریخ و ساعت تراکنش",
          dataIndex: "paymentDate",
          key: "paymentDate",
          width: 195,
          ...GetServerColumnSearchProps({
            dataIndex: "paymentDate",
            label: "تاریخ و ساعت تراکنش",
            type: "sort",
          }),
          render: (value: number) =>
            dataPlaceHolder({
              data: value?.toString(),
              isDate: true,
              customDateFormat: "HH:mm, YYYY/MM/DD",
            }),
        },
      ],
    },
    {
      title: "اطلاعات پرداخت کننده",
      children: [
        {
          title: "نام",
          dataIndex: "firstName",
          key: "firstName",
          width: 120,
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "نام خانوادگی",
          dataIndex: "lastName",
          key: "lastName",
          width: 120,
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "کد ملی / فراگیر",
          dataIndex: "userName",
          key: "userName",
          width: 120,
          ...GetServerColumnSearchProps({
            dataIndex: "nationalCode",
            label: "کد ملی / فراگیر",
            type: "text",
          }),
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "شماره دانشجویی / پرسنلی",
          dataIndex: "personalNumber",
          key: "personalNumber",
          width: 200,
          ...GetServerColumnSearchProps({
            dataIndex: "personalCode",
            label: "شماره دانشجویی / پرسنلی",
            type: "text",
          }),
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "شماره موبایل",
          dataIndex: "phoneNumber",
          key: "phoneNumber",
          width: 120,
          ...GetServerColumnSearchProps({
            dataIndex: "mobileNumber",
            label: "شماره موبایل",
            type: "text",
          }),
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "کسب و کار",
          dataIndex: "businessName",
          key: "businessName",
          width: 150,
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "شعبه / واحد",
          dataIndex: "branchName",
          key: "branchName",
          width: 150,
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "استان",
          dataIndex: "province",
          key: "province",
          width: 120,
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
        {
          title: "شهر",
          dataIndex: "city",
          key: "city",
          width: 120,
          render: (value: string) => {
            return dataPlaceHolder({ data: value });
          },
        },
      ],
    },
    {
      title: "اطلاعات ذینفعان",
      children: [
        {
          title: "سرویس",
          dataIndex: "samimService ",
          key: "samimService ",
          width: 150,
          render: (
            _: unknown,
            record: GetFinanceTransactionBuyerAdvanceFilterListItem
          ) => <SamimServiceTag service={record?.samimService?.name} />,
        },
        {
          title: "شعب / واحدها (ذینفعان)",
          dataIndex: "supplierBeneficiaries",
          key: "supplierBeneficiaries",
          width: 180,
          render: (
            _: unknown,
            record: GetFinanceTransactionBuyerAdvanceFilterListItem
          ) => {
            const list = record?.supplierBeneficiaries ?? [];

            if (list.length === 0) return "-";

            const first = list[0]?.branchName;
            const restCount = list.length - 1;

            return restCount > 0 ? (
              <div className="flex items-center justify-center gap-1">
                {first}
                <CustomTag className="">{restCount}+</CustomTag>
              </div>
            ) : (
              first
            );
          },
        },
      ],
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 108,
      render: (_: unknown, record: GetFinanceTransactionBuyerAdvanceFilterListItem) => (
        <div>
          <CustomButton onClick={() => viewBtnHandler(record?.uuid)} type="link">
            مشاهده
          </CustomButton>
        </div>
      ),
    },
  ];
};
export default TransactionsBuyerStepListTableModel;
