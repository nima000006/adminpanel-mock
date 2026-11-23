import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { GroupsListDataType } from "@pages/Contract/ContractsTemplateList/UsersList/@types/@groupsList";

import TemplateUserListTableModel from "./helper/model/TemplateUserListTableModel";

const mockData: GroupsListDataType[] = [
  {
    id: 1,
    user: "علی احمدی",
    nationalCode: "46543513520",
    status: "فعال",
    startDate: "1403/02/02",
    endtDate: "1403/02/02",
    share: 10,
  },
  {
    id: 2,
    user: "علی احمدی",
    nationalCode: "46543513520",
    status: "فعال",
    startDate: "1403/02/02",
    endtDate: "1403/02/02",
    share: 10,
  },
  {
    id: 3,
    user: "علی احمدی",
    nationalCode: "46543513520",
    status: "فعال",
    startDate: "1403/02/02",
    endtDate: "1403/02/02",
    share: 10,
  },
];

const GroupsList = () => {
  const {
    params: { id },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "مدیریت قرارداد ها",
      },
      {
        title: "لیست قالب ها",
      },
      {
        title: id,
      },
      {
        title: "قالب گروهی",
      },
      {
        title: "کاربران",
      },
    ],
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <div className="bg-neutral-2 body-regular flex flex-col items-center justify-center gap-2 rounded-md p-2!">
        <div>
          {` قراداد اکوسیستم دانشگاه آزاد /  سرویس مشاوره/ خدمت ارائه مشاوره ویزیت / قالب ذینفع گروهی / ${"x"}`}
        </div>

        <div>{`ایجاد کننده گروه : ${"مرکز مشاوره"}`}</div>

        <div className="bg-neutral-2 body-regular flex flex-col items-center justify-center gap-2 rounded-md p-2!">
          <div className="flex gap-2">
            <CustomTag color={"purple"}>{`کل سهم گروه ${10} %`}</CustomTag>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <CustomDivider text="لیست ذینفعان گروه" />
        <CustomTable<GroupsListDataType>
          dataSource={mockData}
          columns={TemplateUserListTableModel()}
          // loading={}
          {...TABLE_PROPS(mockData.length ?? 0)}
          rowKey="id"
        />
      </div>
    </div>
  );
};
export default GroupsList;
