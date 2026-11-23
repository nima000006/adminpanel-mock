// import { PiBuildingsLight, PiHeartbeat, PiPizza, PiUmbrella } from "react-icons/pi";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  WALLET_REQUEST_STATUS_COLOR,
  WALLET_REQUEST_STATUS_TITLE,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { MyWalletDetailsWalletBankAccountsDataType } from "../../../../../drawer/MyWalletDetailsYourAccountDrawerContent/@types/@myWalletDetailsyourAccountDrawerContent";

const MyWalletDetailsBankAccountTabTableModel = ({
  viewBtnHandler,
}: {
  viewBtnHandler: (id: number) => void;
}): CustomColumnType<MyWalletDetailsWalletBankAccountsDataType>[] => {
  return [
    {
      title: "وضعیت درخواست",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (value: string) => {
        return (
          <CustomTag color={WALLET_REQUEST_STATUS_COLOR[value]}>
            {WALLET_REQUEST_STATUS_TITLE[value]}
          </CustomTag>
        );
      },
    },
    {
      title: "شماره درخواست",
      dataIndex: "requestNUmber",
      key: "requestNUmber",
      width: 150,
      render: (_: unknown, records) => dataPlaceHolder({ data: records?.id }),
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "id",
      //   label: "شماره درخواست",
      //   type: "text",
      // }),
    },
    //Todo[Atefeh]: uncomment when api got ready
    // {
    //   title: "کیف پول سرویس",
    //   dataIndex: "serviceWallet",
    //   key: "serviceWallet",
    //   width: 150,
    //   render: (value: string) => {
    //     return (
    //       <CustomTag
    //         color="default"
    //         icon={
    //           value === "خوابگاه" ? (
    //             <PiBuildingsLight />
    //           ) : value === "دکتر من" ? (
    //             <PiHeartbeat />
    //           ) : value === "بیمه" ? (
    //             <PiUmbrella />
    //           ) : value === "تغذیه" ? (
    //             <PiPizza />
    //           ) : null
    //         }
    //       >
    //         {value}
    //       </CustomTag>
    //     );
    //   },
    // },
    {
      title: "شماره کارت",
      dataIndex: "cardNumber",
      key: "cardNumber",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "cardNumber",
      //   label: "شماره کارت",
      //   type: "text",
      // }),
    },
    //Todo[Atefeh]: uncomment when api got ready
    // {
    //   title: "شماره حساب",
    //   dataIndex: "accountNumber",
    //   key: "accountNumber",
    //   width: 150,
    //   ...GetServerColumnSearchProps({
    //     dataIndex: "accountNumber",
    //     label: "شماره حساب",
    //     type: "text",
    //   }),
    // },
    {
      title: "شماره شبا",
      dataIndex: "iban",
      key: "iban",
      width: 175,
      render: (value: string) => dataPlaceHolder({ data: value }),
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "iban",
      //   label: "شماره شبا",
      //   type: "text",
      // }),
    },
    {
      title: "مسئول پیگیری درخواست",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 200,
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "createdBy",
      //   label: "مسئول پیگیری درخواست",
      //   type: "text",
      // }),
      render: (_: string, records: MyWalletDetailsWalletBankAccountsDataType) => {
        return (
          <>
            {" "}
            {dataPlaceHolder({ data: records?.createdBy?.firstName })}{" "}
            {dataPlaceHolder({ data: records?.createdBy?.lastName })}{" "}
          </>
        );
      },
    },
    {
      title: "تاریخ و زمان بررسی درخواست",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 200,
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isDate: true });
      },
    },
    {
      title: "تاریخ و زمان ثبت درخواست",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 200,
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isDate: true });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return (
          <CustomButton type="link" onClick={() => viewBtnHandler(value)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
export default MyWalletDetailsBankAccountTabTableModel;
