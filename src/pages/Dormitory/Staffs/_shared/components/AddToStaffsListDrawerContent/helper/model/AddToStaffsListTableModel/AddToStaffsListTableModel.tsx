import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";

const AddToStaffsListTableModel = (isAllStaffs: boolean): CustomColumnType<any>[] => {
  return [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "firstName",
        label: "نام",
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
      title: "کد ملی / فراگیر",
      dataIndex: "username",
      key: "username",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کد ملی / فراگیر",
        type: "text",
      }),
    },
    {
      title: "کد پرسنلی",
      dataIndex: "personnelCode",
      key: "personnelCode",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "personnelCode",
        label: "کد پرسنلی",
        type: "text",
      }),
    },
    {
      title: "شماره همراه",
      dataIndex: "mobile",
      key: "mobile",
      width: 140,
      ...GetServerColumnSearchProps({
        dataIndex: "mobile",
        label: "شماره همراه",
        type: "text",
      }),
    },
    ...(isAllStaffs
      ? [
          {
            title: "کسب و کار",
            dataIndex: "business",
            key: "business",
            width: 130,
          },
          {
            title: "شعبه / واحد",
            dataIndex: "branch",
            key: "branch",
            width: 130,
          },
        ]
      : []),
  ];
};

export default AddToStaffsListTableModel;
