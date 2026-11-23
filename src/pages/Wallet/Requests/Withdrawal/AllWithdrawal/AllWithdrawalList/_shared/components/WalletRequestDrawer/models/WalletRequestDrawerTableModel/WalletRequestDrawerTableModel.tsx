import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import {
  UserStaffDetail,
  WithdrawalAmount,
} from "../../../../@types/@walletRequestUsersList";
import { WalletRequestAcceptFlattenedDataType } from "../../@types/@withdrawalAcceptRequest";

import "./_walletRequestDrawerTableModel.scss";

const WalletRequestDrawerTableModel = ({
  openDeleteModal,
}: {
  openDeleteModal: (id: number) => void;
}): CustomColumnType<WalletRequestAcceptFlattenedDataType>[] => {
  return [
    {
      title: "روز شمار",
      dataIndex: "dayCounter",
      key: "dayCounter",
      width: 100,
      render: (_: unknown, record: WalletRequestAcceptFlattenedDataType) => (
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
      render: (_: unknown, record: WalletRequestAcceptFlattenedDataType) =>
        dataPlaceHolder({ data: record?.id }),
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
      title: "گروه کاربری",
      dataIndex: "staffType",
      key: "staffType",
      width: 85,
      render: (value: string) => {
        let color: string;
        let label: string;

        switch (value) {
          case "STUDENT":
            color = "blue";
            label = "دانشجو";
            break;
          case "EMPLOYEE":
            color = "volcano";
            label = "کارمند";
            break;
          case "ADMIN":
            color = "";
            label = "ادمین";
            break;
          default:
            color = "default";
            label = dataPlaceHolder({ data: value });
        }

        return <CustomTag color={color}>{dataPlaceHolder({ data: label })}</CustomTag>;
      },
    },
    {
      title: "نام",
      dataIndex: "firstname",
      key: "firstname",
      width: 125,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "LastName",
      key: "LastName",
      width: 125,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کد ملی / کد فراگیر",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 160,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره دانشجویی / پرسنلی",
      dataIndex: "userStaffDetail",
      key: "code",
      width: 200,
      render: (value: UserStaffDetail) => {
        return dataPlaceHolder({ data: value?.code });
      },
    },
    {
      title: "شماره همراه",
      dataIndex: "userStaffDetail",
      key: "mobile",
      width: 130,
      render: (value: UserStaffDetail) => {
        return dataPlaceHolder({ data: value?.mobile });
      },
    },
    {
      title: "شناسه کیف پول",
      dataIndex: "walletId",
      key: "walletId",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "مقطع تحصیلی",
      dataIndex: "degreeTitle",
      key: "degreeTitle",
      width: 190,
      render: (value: string) => {
        let color: string;

        switch (value) {
          case "کارشناسی - نا پیوسته":
            color = "blue";
            break;
          case "کارشناسی ارشد - پیوسته":
            color = "purple";
            break;
          case "فوق دکترا":
            color = "magenta";
            break;
          case "دکتری تخصصی":
            color = "volcano";
            break;
          default:
            color = "default";
        }

        return (
          <CustomTag className="custom-tag" color={color}>
            {dataPlaceHolder({ data: value })}
          </CustomTag>
        );
      },
    },
    {
      title: "رشته تحصیلی",
      dataIndex: "studyFieldTitle",
      key: "studyFieldTitle",
      render: (value: string) => {
        return (
          <CustomTag className="custom-tag">{dataPlaceHolder({ data: value })}</CustomTag>
        );
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
      title: "نام دانشگاه",
      dataIndex: "userStaffDetail",
      key: "unitBranch",
      width: 190,
      render: (value: UserStaffDetail) => {
        return (
          <CustomTag className="custom-tag">
            {dataPlaceHolder({ data: value?.branchName })}
          </CustomTag>
        );
      },
    },
    {
      title: "عنوان سمت",
      dataIndex: "postname",
      key: "postname",
      width: 220,
      render: () => {
        return <CustomTag className="custom-tag">{emptyString}</CustomTag>;
      },
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
export default WalletRequestDrawerTableModel;
