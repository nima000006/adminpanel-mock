import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CONTRACTS_TEMPLATE_USERS_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { GroupsListDataTypes } from "@pages/Contract/ContractsTemplateList/GroupsList/@types/@groupsList";

const TemplateGroupsListTableModel = (): CustomColumnType<GroupsListDataTypes>[] => {
  return [
    {
      title: "کاربران عضو گروه",
      dataIndex: "count",
      key: "count",
      width: 250,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 150,
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
                pathname: CONTRACTS_TEMPLATE_USERS_LIST_PAGE_ROUTE,
                search: makeSearchParams({
                  id: value,
                }),
              }}
              className="text-primary-6 cursor-pointer"
            >
              مشاهده کاربران
            </Link>
          </CustomButton>
        );
      },
    },
  ];
};

export default TemplateGroupsListTableModel;
