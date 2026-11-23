import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  WALLET_REQUEST_STATUS_COLOR,
  WALLET_REQUEST_STATUS_TITLE,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType } from "../../components/AllWalletDetailsWithdrawWalletTab/@types/@allWalletDetailswithdrawWalletTab";

const AllWalletDetailsWithdrawWalletTabTableModel = ({
  viewBtnHandler,
}: {
  viewBtnHandler: (id: number) => void;
}): CustomColumnType<AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType>[] => {
  return [
    {
      title: "وضعیت درخواست",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (value: string) => {
        return (
          <CustomTag className="w-fit" color={WALLET_REQUEST_STATUS_COLOR[value]}>
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
      render: (value: string) => dataPlaceHolder({ data: value }),
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "id",
      //   label: "شماره درخواست",
      //   type: "text",
      // }),
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
        records: AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType
      ) => {
        return (
          dataPlaceHolder({
            data: records?.amount?.totalAmount?.toString(),
            isPrice: true,
            isRial: true,
          }) + " تومان "
        );
      },
    },
    {
      title: "تاریخ و زمان ثبت درخواست",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 200,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD",
        });
      },
    },
    {
      title: "تاریخ و زمان بررسی درخواست",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 200,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD",
        });
      },
    },
    {
      title: "مسئول پیگیری درخواست",
      dataIndex: "adminFirstname",
      key: "adminFirstname",
      width: 150,
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "adminFirstname",
      //   label: "مسئول پیگیری درخواست",
      //   type: "text",
      // }),
      render: (
        _: string,
        records: AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType
      ) => {
        return (
          <>
            {dataPlaceHolder({ data: records?.adminFirstname })}{" "}
            {dataPlaceHolder({ data: records?.adminLastname })}{" "}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (
        _: number,
        records: AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType
      ) => {
        return (
          <CustomButton type="link" onClick={() => viewBtnHandler(records?.id)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
export default AllWalletDetailsWithdrawWalletTabTableModel;
