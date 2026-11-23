import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { CustomerGroup } from "@pages/Finance/Buyers/BuyersDetails/@types/@buyersDetails";
import { BuyersDetailsBuyTableModelProps } from "@pages/Finance/Buyers/BuyersDetails/helpers/components/_shared/models/BuyersDetailsBuyTableModel/@types/@buyersDetailsBuyTable";
import { GetFinanceTransactionBuyerAdvanceFilterListItem } from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/@types/@buyersStepTypes";

const BuyersAndReturnDetailsBuyTableModel = ({
  viewClickHandler,
}: BuyersDetailsBuyTableModelProps): CustomColumnType<GetFinanceTransactionBuyerAdvanceFilterListItem>[] => {
  return [
    {
      title: "اطلاعات مالی تراکنش",
      children: [
        {
          title: "مبلغ عودت شده (تومان)",
          dataIndex: "transactionAmount",
          key: "refundAmount",
          width: 195,
          ...GetServerColumnSearchProps({
            dataIndex: "money",
            label: "کل مبلغ تراکنش اصلی (تومان)",
            type: "sort",
          }),
          render: (_: string) => {
            return dataPlaceHolder({ data: emptyString });
          },
        },
        {
          title: "کل مبلغ تراکنش اصلی (تومان)",
          dataIndex: "transactionAmount",
          key: "transactionAmount",
          width: 220,
          ...GetServerColumnSearchProps({
            dataIndex: "money",
            label: "کل مبلغ تراکنش اصلی (تومان)",
            type: "sort",
          }),
          render: (value: number) =>
            dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true }),
        },
        {
          title: "شناسه تراکنش",
          dataIndex: "uuid",
          key: "uuid",
          width: 195,
          ...GetServerColumnSearchProps({
            dataIndex: "uuid",
            label: "شناسه تراکنش",
            type: "text",
          }),
          render: (value: number) => dataPlaceHolder({ data: value }),
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
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY/MM/DD",
            }),
        },
      ],
    },
    {
      title: "اطلاعات کاربری",
      children: [
        {
          title: "گروه کاربری",
          dataIndex: "staffType",
          key: "staffType",
          width: 195,
          render: (value: string) => {
            return CustomerGroup.STUDENT === value ? (
              <CustomTag className="w-fit" color="blue">
                دانشجو
              </CustomTag>
            ) : (
              <CustomTag className="w-fit" color="orange">
                کارمند
              </CustomTag>
            );
          },
        },
        {
          title: "شماره دانشجویی / پرسنلی",
          dataIndex: "personalNumber",
          key: "personalNumber",
          width: 195,
          ...GetServerColumnSearchProps({
            dataIndex: "personalCode",
            label: "شماره دانشجویی / پرسنلی",
            type: "text",
          }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "کسب و کار",
          dataIndex: "businessName",
          key: "businessName",
          width: 195,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "شعبه/واحد",
          dataIndex: "branchName",
          key: "branchName",
          width: 195,
          render: (value: string) => (
            <CustomTag className="w-fit">{dataPlaceHolder({ data: value })}</CustomTag>
          ),
        },
      ],
    },
    {
      title: "",
      children: [
        {
          title: "سرویس",
          dataIndex: "samimService",
          key: "samimService",
          width: 195,
          render: (value: IdTitleName) => <SamimServiceTag service={value?.name} />,
        },
      ],
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 108,
      render: (_: number, record: GetFinanceTransactionBuyerAdvanceFilterListItem) => {
        return (
          <CustomButton type="link" onClick={() => viewClickHandler(record?.uuid)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default BuyersAndReturnDetailsBuyTableModel;
