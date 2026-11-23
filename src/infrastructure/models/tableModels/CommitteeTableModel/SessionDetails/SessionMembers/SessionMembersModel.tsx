import { Form, Switch } from "antd";

type DataSource = {
  key: string;
  name: string;
  familyName: string;
  role: string;
  userNumber: string;
  mobile: string;
  presence: boolean;
};

export const SessionMembersModel = [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "familyName",
    key: "familyName",
    width: 100,
  },
  // todo[Atefeh]:uncomment when api got ready
  // {
  //   title: "سمت",
  //   dataIndex: "degree",
  //   key: "degree",
  //   width: 100,
  // },
  {
    title: "نقش",
    dataIndex: "role",
    key: "role",
    width: 280,
  },
  {
    title: "شماره پرسنلی",
    dataIndex: "userNumber",
    key: "userNumber",
    width: 120,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobile",
    key: "mobile",
    width: 120,
  },
  {
    title: "حضور",
    dataIndex: "presence",
    key: "presence",
    width: 100,
    render: (status: boolean, record: DataSource) => {
      return (
        <Form.Item valuePropName="checked" name={record?.key} initialValue={status}>
          <Switch
            defaultChecked={status}
            checkedChildren={<span className="switch-text">حاضر</span>}
            unCheckedChildren={<span className="switch-text">غایب</span>}
            disabled={true}
          />
        </Form.Item>
      );
    },
  },
];
