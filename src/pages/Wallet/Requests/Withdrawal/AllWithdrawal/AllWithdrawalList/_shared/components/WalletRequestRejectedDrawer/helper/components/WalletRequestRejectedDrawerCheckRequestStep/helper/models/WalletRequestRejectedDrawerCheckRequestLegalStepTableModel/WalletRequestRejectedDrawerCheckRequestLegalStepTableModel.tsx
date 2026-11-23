import { ReactNode } from "react";

import { PiBuildings, PiUser } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  UserStaffDetail,
  WithdrawalAmount,
} from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@walletRequestUsersList";

import { WalletRequestRejectedFlattenedDataType } from "../../../@types/@walletRequestRejectedDrawerCheckRequestStep";

import "./_walletRequestRejectedDrawerCheckRequestLegalStepTableModel.scss";

const WalletRequestRejectedDrawerCheckRequestLegalStepTableModel = ({
  openDeleteModal,
}: {
  openDeleteModal: (id: number) => void;
}): CustomColumnType<WalletRequestRejectedFlattenedDataType>[] => {
  return [
    {
      title: "روز شمار",
      dataIndex: "dayCounter",
      key: "dayCounter",
      width: 100,
      render: (_: unknown, record: WalletRequestRejectedFlattenedDataType) => (
        <div className="custom-Custom-diff-days">
          <CustomTagWithDiffDays value={record?.requestDate} />
        </div>
      ),
    },
    {
      title: "شماره درخواست",
      dataIndex: "idNumber",
      key: "idNumber",
      width: 140,
      render: (_: unknown, record: WalletRequestRejectedFlattenedDataType) =>
        dataPlaceHolder({ data: record?.id?.toString() }),
    },
    {
      title: "مبلغ درخواستی",
      dataIndex: "amount",
      key: "amount",
      width: 130,
      render: (value: WithdrawalAmount) => {
        return (
          <>
            {dataPlaceHolder({
              data: value?.totalAmount?.toString(),
              isRial: true,
              isPrice: true,
            })}{" "}
            تومان
          </>
        );
      },
    },
    {
      title: "نام کسب و کار ",
      dataIndex: "userStaffDetail",
      key: "businessName",
      width: 140,
      render: (value: UserStaffDetail) => {
        return dataPlaceHolder({ data: value?.businessName });
      },
    },
    {
      title: "واحد / شعبه",
      dataIndex: "branchName",
      key: "branchName",
      width: 130,
      render: (value: string) => {
        return (
          <CustomTag className="custom-tag">{dataPlaceHolder({ data: value })}</CustomTag>
        );
      },
    },
    {
      title: "نوع کسب و کار",
      dataIndex: "userStaffDetail",
      key: "businessType",
      width: 190,
      render: (value: UserStaffDetail) => {
        let color: string;
        let label: string;
        let icon: ReactNode;

        switch (value?.businessType) {
          case 1:
            color = "processing";
            label = "حقوقی";
            icon = <PiBuildings />;
            break;
          case 2:
            color = "warning";
            label = "حقیقی";
            icon = <PiUser />;
            break;
          default:
            color = "default";
            label = dataPlaceHolder({ data: value?.businessType?.toString() });
        }

        return (
          <CustomTag className="w-fit gap-1" color={color} icon={icon}>
            {dataPlaceHolder({ data: label })}
          </CustomTag>
        );
      },
    },
    {
      title: "کد شعبه",
      dataIndex: "userStaffDetail",
      key: "branchCode",
      width: 100,
      render: (value: UserStaffDetail) => {
        return dataPlaceHolder({ data: value?.branchCode });
      },
    },
    {
      title: "سرویس",
      dataIndex: "userStaffDetail",
      key: "serviceName",
      width: 150,
      render: (value: UserStaffDetail) => (
        <SamimServiceTag service={value?.serviceName} />
      ),
    },
    {
      title: "استان",
      dataIndex: "userStaffDetail",
      key: "province",
      width: 115,
      render: (value: UserStaffDetail) => {
        return dataPlaceHolder({ data: value?.province });
      },
    },
    {
      title: "شهر",
      dataIndex: "userStaffDetail",
      key: "city",
      width: 80,
      render: (value: UserStaffDetail) => {
        return dataPlaceHolder({ data: value?.city });
      },
    },
    {
      title: "مسئول کسب و کار",
      dataIndex: "managerBusinessName",
      key: "managerBusinessName",
      width: 150,
      render: () => emptyString,
    },
    {
      title: "شماره همراه مسئول",
      dataIndex: "managerBusinessMobileNumber",
      key: "managerBusinessMobileNumber",
      width: 160,
      render: () => emptyString,
    },
    {
      title: "تاریخ و زمان ثبت درخواست",
      dataIndex: "requestDate",
      key: "requestDate",
      width: 200,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY-MM-DD",
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
      render: (id: number) => (
        <CustomButton type="link" danger onClick={() => openDeleteModal(id)}>
          حذف از لیست
        </CustomButton>
      ),
    },
  ];
};
export default WalletRequestRejectedDrawerCheckRequestLegalStepTableModel;
