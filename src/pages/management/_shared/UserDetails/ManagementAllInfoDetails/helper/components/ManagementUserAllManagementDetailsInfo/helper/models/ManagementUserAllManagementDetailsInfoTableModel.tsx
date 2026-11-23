import { Key, useEffect } from "react";

import moment from "jalali-moment";

import { CustomSwitch } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  manuallyInquiryTagDataGenerator,
  USER_DETAIL_INFO_USER_GROUP_FILTER_OPTIONS,
  USER_GROUP_STAFF_COLOR,
  USER_GROUP_STAFF_TEXT,
} from "@pages/management/_shared/utils";

import { Staff } from "../../@types/@managementAllListsOfStaff";

const ManagementUserAllManagementDetailsInfoTableModel = ({
  onViewRoles,
  onEditRoles,
  changePositionStatus,
}: {
  onViewRoles: (record: Staff) => void;
  onEditRoles: (record: Staff) => void;
  changePositionStatus: (status: boolean, id: number) => void;
}): CustomColumnType<Staff>[] => {
  const [getAllUniversity, { data: universityData }] = useLazyGetAllBranchesQuery();

  useEffect(() => {
    getAllUniversity();
  }, []);

  return [
    {
      title: "گروه کاربری",
      dataIndex: "staffType",
      key: "staffType",
      filters: USER_DETAIL_INFO_USER_GROUP_FILTER_OPTIONS,
      onFilter: (value: boolean | Key, record: Staff) => {
        return record?.staffType === value;
      },
      render: function (_: unknown, record: Staff) {
        return (
          <CustomTag
            className="custom-tag"
            color={USER_GROUP_STAFF_COLOR[record?.staffType]}
          >
            {USER_GROUP_STAFF_TEXT[record?.staffType]}
          </CustomTag>
        );
      },
    },
    {
      title: "سمت",
      dataIndex: "position",
      key: "position",
      searchable: true,
      render: function (value: string) {
        return (
          <CustomTag className="custom-tag">{dataPlaceHolder({ data: value })}</CustomTag>
        );
      },
    },
    {
      title: "واحد دانشگاهی",
      dataIndex: "branchTitle",
      key: "branchTitle",
      width: 150,
      filters: universityData?.map((item) => ({
        text: item?.title,
        value: item?.title,
      })),
      onFilter: (value: boolean | Key, record: Staff) => {
        return record?.branchTitle === value;
      },
      render: function (value: string) {
        return (
          <CustomTag className="custom-tag">{dataPlaceHolder({ data: value })}</CustomTag>
        );
      },
    },
    {
      title: "نوع استعلام",
      dataIndex: "branchTitle",
      key: "requestType",
      width: 150,
      filters: [
        {
          text: "دستی",
          value: true,
        },
        {
          text: "سیستمی",
          value: false,
        },
      ],
      onFilter: (value: boolean | Key, record: Staff) => {
        return record?.isManual === value;
      },
      render: function (_: unknown, record: Staff) {
        const manuallyTagData = manuallyInquiryTagDataGenerator(record.isManual);
        return (
          <CustomTag className="custom-tag" color={manuallyTagData?.color}>
            {manuallyTagData?.text}
          </CustomTag>
        );
      },
    },
    {
      title: "وضعیت سمت",
      dataIndex: "recordStatus",
      key: "recordStatus",
      width: 120,
      render: function (value: number, record: Staff) {
        const isActive = value === 1;
        return (
          <CustomSwitch
            valuePropName=""
            checkedChildren="فعال"
            unCheckedChildren="غیرفعال"
            defaultChecked={isActive}
            onChange={(e: boolean) => changePositionStatus(e, record.staffId)}
          />
        );
      },
    },
    {
      title: "آخرین ویرایش",
      dataIndex: "lastModified",
      key: "lastModified",
      width: 120,
      sorter: (a: Staff, b: Staff) => {
        return (
          moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
            moment(a.lastModified ?? new Date()),
            "seconds"
          ) -
          moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
            moment(b.lastModified ?? new Date()),
            "seconds"
          )
        );
      },
      render: (value: string) => {
        if (!value) return <>-</>;
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              isTime: true,
            })}
          </>
        );
      },
    },

    //! need key of that
    // {
    //   title: "ویرایش کننده",
    //   dataIndex: "editor",
    //   key: "editor",
    // },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 70,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: Staff) => {
        return (
          <div className="custom-button-container">
            <CustomButton
              type="link"
              disabled={record.staffType !== "ADMIN"}
              onClick={() => onViewRoles(record)}
            >
              مشاهده نقش‌ها
            </CustomButton>

            <CustomButton
              type="link"
              disabled={record.staffType !== "ADMIN"}
              onClick={() => onEditRoles(record)}
            >
              ویرایش نقش
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default ManagementUserAllManagementDetailsInfoTableModel;
