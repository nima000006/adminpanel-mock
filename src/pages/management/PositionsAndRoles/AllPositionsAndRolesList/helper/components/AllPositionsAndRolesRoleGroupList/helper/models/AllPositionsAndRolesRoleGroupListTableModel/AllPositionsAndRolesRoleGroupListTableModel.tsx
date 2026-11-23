import { ColumnsType } from "antd/es/table";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { generateFiltersGroups } from "@pages/management/PositionsAndRoles/_shared/utils/roleGenerateFilters";

import { AllRoleGroup } from "../../../@types/@allPositionsAndRolesRoleGroupList";

const AllPositionsAndRolesRoleGroupListTableModel = (
  switchHandler: (groupId: string, isActive: boolean) => void,
  onEditClickHandler: (record: AllRoleGroup) => void,
  onOverRideRoleGroups: (record: AllRoleGroup) => void,
  data: AllRoleGroup[]
): ColumnsType<AllRoleGroup> => [
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
          onChange={() => switchHandler(record.groupName, allActive)}
          valuePropName="status"
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
          <CustomButton onClick={() => onOverRideRoleGroups(record)} type="link">
            نقش‌ها
          </CustomButton>
          <CustomButton onClick={() => onEditClickHandler(record)} type="link">
            ویرایش
          </CustomButton>
        </div>
      );
    },
  },
];

export default AllPositionsAndRolesRoleGroupListTableModel;
