import { BsEye } from "react-icons/bs";
import { PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";

const MyStaffsListTableModel = ({
  viewStaffDetailHandler,
  disableStaffHandler,
}: {
  viewStaffDetailHandler: (id: number) => void;
  disableStaffHandler: (id: number) => void;
}): CustomColumnType<any>[] => {
  return [
    {
      title: "نام ",
      dataIndex: "firstName",
      key: "firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "firstName",
        label: "نام ",
        type: "text",
      }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "نام خانوادگی",
        type: "text",
      }),
    },
    {
      title: "سمت",
      dataIndex: "position",
      key: "position",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "position",
        label: "سمت",
        type: "text",
      }),
    },
    {
      title: "اقامتگاه",
      dataIndex: "residenceName",
      key: "residenceName",
      width: 130,
      render: (value: string) => (
        <div className="flex items-center justify-center gap-4">
          <span className="text-xs">{value}</span>
          <div className="border-neutral-5 flex items-center justify-center gap-4 rounded-[4px] border px-2 py-1">
            {2} +
          </div>
        </div>
      ),
    },
    {
      title: "کدملی/فراگیر",
      dataIndex: "username",
      key: "username",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کدملی/فراگیر",
        type: "text",
      }),
    },
    {
      title: "کد پرسنلی",
      dataIndex: "personnelCode",
      key: "personnelCode",
      width: 130,
    },
    {
      title: "شماره همراه",
      dataIndex: "mobile",
      key: "mobile",
      width: 130,
    },
    {
      title: "",
      dataIndex: "grade",
      key: "grade",
      width: 50,
      className: "tables-sticky-column-left",
      fixed: "right",
      render: (_: string, record: any) => {
        const contentItems = [
          {
            id: 1,
            Icon: BsEye,
            title: "مشاهده",
            onclick: () => {
              viewStaffDetailHandler(record?.id);
            },
          },
          {
            id: 2,
            Icon: PiTrash,
            title: "غیرفعالسازی (انتقال به آرشیو)",
            onclick: () => {
              disableStaffHandler(record?.id);
            },
          },
        ];
        return <MenuActionPopover contentItems={contentItems} />;
      },
    },
  ];
};

export default MyStaffsListTableModel;
