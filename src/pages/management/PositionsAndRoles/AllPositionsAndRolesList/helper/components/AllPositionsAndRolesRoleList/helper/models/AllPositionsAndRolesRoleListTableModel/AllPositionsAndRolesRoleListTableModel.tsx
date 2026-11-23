// PositionsAndRolesRoleListTableModel.tsx
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_ALL_POSITIONS_AND_ROLES_ROLES_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { ManagementRole } from "@pages/management/PositionsAndRoles/_shared/utils/@types/@managementRole";
import { generateFilters } from "@pages/management/PositionsAndRoles/_shared/utils/roleGenerateFilters";
import { roleRecordStatus } from "@pages/management/PositionsAndRoles/_shared/utils/roleRecordStatus";

import { AllPositionsAndRolesRoleListTableModelProps } from "./@types/@allPositionsAndRolesRoleListTableModel";

const AllPositionsAndRolesRoleListTableModel = ({
  switchHandler,
  data,
  onEditClickHandler,
}: AllPositionsAndRolesRoleListTableModelProps): ColumnsType<
  ManagementRole & { recordStatus: keyof typeof roleRecordStatus }
> => [
  {
    title: "نام نقش",
    dataIndex: "title",
    key: "title",
    width: 299,
    sorter: (a, b) => {
      if (!a.title) return -1;
      if (!b.title) return 1;
      return a.title.localeCompare(b.title);
    },
    render: (value: string | null) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نام سرویس",
    dataIndex: "serviceName",
    key: "serviceName",
    width: 299,
    filters: generateFilters(data, "serviceName"),
    onFilter: (value, record) => record.serviceName === value,
    render: (value: string | null) => {
      return <SamimServiceTag service={value} isText={true} />;
    },
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    width: 299,
    filters: [
      { text: "فعال", value: true },
      { text: "غیرفعال", value: false },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status: boolean, record) => (
      <CustomSwitch
        key={`${record.id}-${status}`}
        checkedChildren="فعال"
        unCheckedChildren="غیرفعال"
        valuePropName="status"
        checked={status}
        onChange={(newChecked: boolean) => {
          if (!record.name) return;
          switchHandler(record.name, newChecked);
        }}
      />
    ),
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    width: 169,
    render: (value: number, record: ManagementRole) => {
      return (
        <div className="table-btns-container">
          <CustomButton type="link">
            <Link
              to={{
                pathname: MANAGEMENT_ALL_POSITIONS_AND_ROLES_ROLES_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: value,
                  name: record?.name,
                  title: record?.title,
                  serviceName: record?.serviceName,
                }),
              }}
            >
              مشاهده کاربران
            </Link>
          </CustomButton>

          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        </div>
      );
    },
  },
];

export default AllPositionsAndRolesRoleListTableModel;
