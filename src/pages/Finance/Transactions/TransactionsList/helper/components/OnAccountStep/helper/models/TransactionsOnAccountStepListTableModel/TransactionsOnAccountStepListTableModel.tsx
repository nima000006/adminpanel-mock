import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

const TransactionsOnAccountStepListTableModel = ({
  viewBtnHandler,
}: {
  viewBtnHandler: (id: number) => void;
}): CustomColumnType<[]>[] => {
  return [
    {
      title: "مبلغ علی الحساب (تومان)",
      dataIndex: "amount",
      key: "amount",
      width: 195,
      render: (value: number) =>
        dataPlaceHolder({ data: value?.toString(), isPrice: true }),
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "شناسه تراکنش",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 120,
      //need to api to get data and search, now it sa mock data
      ...GetServerColumnSearchProps({
        dataIndex: "transactionId",
        label: "شناسه تراکنش",
        type: "text",
      }),
    },
    {
      title: "تاریخ و ساعت تراکنش",
      dataIndex: "date",
      key: "date",
      width: 195,
      render: (value: number) =>
        dataPlaceHolder({ data: value?.toString(), isDate: true }),
      sorter: (a: any, b: any) => a.date - b.date,
    },
    {
      title: "کسب و کار",
      dataIndex: "business",
      key: "business",
      width: 195,
    },
    {
      title: "واحد / شعبه",
      dataIndex: "branch",
      key: "branch",
      width: 150,
    },
    {
      title: "ذینفع",
      dataIndex: "Beneficiary",
      key: "Beneficiary",
      width: 150,
    },
    {
      title: "استان",
      dataIndex: "province",
      key: "province",
      width: 120,
      //need to api to get data and search, now it sa mock data
      ...GetServerColumnSearchProps({
        dataIndex: "استان",
        label: "province",
        type: "text",
      }),
    },
    {
      title: "شهر",
      dataIndex: "city",
      key: "city",
      width: 120,
      //need to api to get data and search, now it sa mock data
      ...GetServerColumnSearchProps({
        dataIndex: "شهر",
        label: "city",
        type: "text",
      }),
    },
    {
      title: "سرویس",
      dataIndex: "service",
      key: "service",
      width: 150,
      //todo [nima] when check with real data remove this comment
      // render: (value: string) => {
      //   return (
      //     <CustomTag
      //       className="service-tag"
      //       color={
      //         value === "خوابگاه"
      //           ? "purple"
      //           : value === "دکتر من"
      //             ? "cyan"
      //             : value === "بیمه"
      //               ? "green"
      //               : value === "تغذیه"
      //                 ? "lime"
      //                 : value === "کارت هویت دیجیتال"
      //                   ? "blue"
      //                   : "default"
      //       }
      //       icon={
      //         value === "خوابگاه" ? (
      //           <div className="icon-wrapper dorm-color">
      //             <PiBuildingApartmentFill color="#FFFFFF" size={14} />
      //           </div>
      //         ) : value === "دکتر من" ? (
      //           <div className="icon-wrapper my-doctor-color">
      //             <PiHeartbeat color="#FFFFFF" size={14} />
      //           </div>
      //         ) : value === "بیمه" ? (
      //           <div className="icon-wrapper insurance-color">
      //             <PiUmbrellaFill color="#FFFFFF" size={14} />
      //           </div>
      //         ) : value === "تغذیه" ? (
      //           <div className="icon-wrapper food-color">
      //             <PiForkKnifeFill color="#FFFFFF" size={14} />
      //           </div>
      //         ) : value === "کارت هویت دیجیتال" ? (
      //           <div className="icon-wrapper card-color">
      //             <PiIdentificationCardLight color="#FFFFFF" size={14} />
      //           </div>
      //         ) : null
      //       }
      //     >
      //       {value}
      //     </CustomTag>
      //   );
      // },
      render: (value: string) => <SamimServiceTag service={value} />,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 108,
      render: (value: number) => (
        <div>
          <CustomButton onClick={() => viewBtnHandler(value)} type="link">
            مشاهده
          </CustomButton>
        </div>
      ),
    },
  ];
};
export default TransactionsOnAccountStepListTableModel;
