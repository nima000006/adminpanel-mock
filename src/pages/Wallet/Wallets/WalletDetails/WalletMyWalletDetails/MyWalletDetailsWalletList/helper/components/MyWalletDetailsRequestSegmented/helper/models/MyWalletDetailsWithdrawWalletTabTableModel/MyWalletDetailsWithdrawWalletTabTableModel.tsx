import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  WALLET_REQUEST_STATUS_COLOR,
  WALLET_REQUEST_STATUS_TITLE,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { MyWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType } from "../../components/MyWalletDetailsWithdrawWalletTab/@types/@myWalletDetailswithdrawWalletTab";

const MyWalletDetailsWithdrawWalletTabTableModel = ({
  viewBtnHandler,
}: {
  viewBtnHandler: (id: number) => void;
}): CustomColumnType<MyWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType>[] => {
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
      dataIndex: "id",
      key: "id",
      width: 150,
      //todo
      // ...GetServerColumnSearchProps({
      //   dataIndex: "id",
      //   label: "شماره درخواست",
      //   type: "text",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    //Todo[Atefeh]: uncomment when api got ready
    // {
    //   title: "شماره حساب",
    //   dataIndex: "accountNumber",
    //   key: "accountNumber",
    //   width: 150,
    // },
    {
      title: "مبلغ درخواستی",
      dataIndex: "requestedAmount",
      key: "requestedAmount",
      width: 150,
      render: (
        _: string,
        records: MyWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType
      ) => {
        return dataPlaceHolder({
          data: records?.amount?.totalAmount?.toString(),
          isPrice: true,
        });
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
      title: "تاریخ و زمان بررسی درخواست",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 200,
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isDate: true });
      },
    },
    {
      title: "مسئول پیگیری درخواست",
      dataIndex: "adminFirstname",
      key: "adminFirstname",
      width: 150,
      //todo
      // ...GetServerColumnSearchProps({
      //   dataIndex: "adminFirstname",
      //   label: "مسئول پیگیری درخواست",
      //   type: "text",
      // }),
      render: (
        _: string,
        records: MyWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType
      ) => {
        return (
          <>
            {dataPlaceHolder({ data: records?.adminFirstname })}{" "}
            {dataPlaceHolder({ data: records?.adminLastname })}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (
        _: number,
        record: MyWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType
      ) => {
        return (
          <CustomButton type="link" onClick={() => viewBtnHandler(record?.id)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
export default MyWalletDetailsWithdrawWalletTabTableModel;
