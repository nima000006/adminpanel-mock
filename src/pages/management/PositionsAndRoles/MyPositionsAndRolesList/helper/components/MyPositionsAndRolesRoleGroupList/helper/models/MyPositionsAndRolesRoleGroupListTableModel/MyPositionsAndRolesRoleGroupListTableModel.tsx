import { ColumnsType } from "antd/es/table";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { generateFiltersGroups } from "@pages/management/PositionsAndRoles/_shared/utils/roleGenerateFilters";

import { MyRoleGroup } from "../../../@types/@MypositionsAndRolesRoleGroupList";

const MyPositionsAndRolesRoleGroupListTableModel = (
  switchHandler: (groupId: string, isActive: boolean) => void,
  onEditClickHandler: (record: MyRoleGroup) => void,
  onOverRideRoleGroups: (record: MyRoleGroup) => void,
  data: MyRoleGroup[]
): ColumnsType<MyRoleGroup> => [
  {
    title: "گروه نقش",
    dataIndex: "title",
    key: "title",
    width: 470,
    sorter: (a, b) => {
      if (!a.title) return -1;
      if (!b.title) return 1;
      return a.title.localeCompare(b.title);
    },
    filters: generateFiltersGroups(data, "title"),
    onFilter: (value, record) => record.title === value,
    render: (value: string | null) => dataPlaceHolder({ data: value }),
  },
  {
    title: "وضعیت گروه نقش",
    key: "groupStatus",
    filters: [
      { text: "فعال", value: true },
      { text: "غیرفعال", value: false },
    ],
    onFilter: (value, record) => {
      const groupStatus = record.roles.every((role) => role.status);
      return groupStatus === value;
    },
    width: 470,
    render: (_, record) => {
      const allActive = record.roles.every((role) => role.status);
      return (
        <CustomSwitch
          key={record.groupId}
          checkedChildren="فعال"
          unCheckedChildren="غیرفعال"
          checked={allActive}
          onChange={(newChecked: boolean) => switchHandler(record.groupName, newChecked)}
          valuePropName="status"
          disabled
        />
      );
    },
  },

  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    width: 80,
    render: (_, record) => {
      return (
        <div className="table-btns-container">
          <CustomButton onClick={() => onOverRideRoleGroups(record)} type="link" disabled>
            نقش‌ها
          </CustomButton>

          <CustomButton onClick={() => onEditClickHandler(record)} type="link" disabled>
            ویرایش
          </CustomButton>
        </div>
      );
    },
  },
];

export default MyPositionsAndRolesRoleGroupListTableModel;
