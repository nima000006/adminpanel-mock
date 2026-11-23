import { Form, Switch } from "antd";

import { SessionCreationDataSource } from "../../../modules/committee/committees/sessions/sessions";

export const SessionMembersStepModel = ({ from }: { from?: string }) => {
  return [
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
    //   dataIndex: "level",
    //   key: "level",
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
      render: (status: boolean, record: SessionCreationDataSource) => {
        return (
          <Form.Item valuePropName="checked" name={record?.key} initialValue={status}>
            <Switch
              defaultChecked={status}
              checkedChildren={<span className="switch-text">حاضر</span>}
              unCheckedChildren={<span className="switch-text">غایب</span>}
              disabled={from === "finalCheck" ? true : false}
            />
          </Form.Item>
        );
      },
    },
  ];
};
