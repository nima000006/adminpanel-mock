import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GroupsListDataType } from "@pages/Contract/ContractsTemplateList/UsersList/@types/@groupsList";

const TemplateUserListTableModel = (): CustomColumnType<GroupsListDataType>[] => {
  return [
    {
      title: "کاربران ذینفع گروه",
      dataIndex: "user",
      key: "user",
      width: 350,
    },
    {
      title: "کدملی/فراگیر",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 350,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (value: string) => {
        return (
          <CustomTag className="w-fit" color={value === "فعال" ? "green" : "red"}>
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      render: (value: string) => (
        <>
          {dataPlaceHolder({
            data: value,
            isDate: true,
          })}
        </>
      ),
    },
    {
      title: "تاریخ پایان",
      dataIndex: "endtDate",
      key: "endtDate",
      width: 100,
      render: (value: string) => (
        <>
          {dataPlaceHolder({
            data: value,
            isDate: true,
          })}
        </>
      ),
    },
    {
      title: "سهم",
      dataIndex: "share",
      key: "share",
      width: 100,
      render: (value: number) => <div>{`%${value}`}</div>,
    },
    {
      title: "مشاهده",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return (
          <CustomButton type="link">
            <Link
              to={{
                pathname: "",
                search: makeSearchParams({
                  id: value,
                }),
              }}
              className="text-primary-6 cursor-pointer"
            >
              مشاهده پروفایل
            </Link>
          </CustomButton>
        );
      },
    },
  ];
};

export default TemplateUserListTableModel;
