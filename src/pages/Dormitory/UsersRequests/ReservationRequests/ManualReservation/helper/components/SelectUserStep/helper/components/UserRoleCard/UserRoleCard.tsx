import { Descriptions, Divider } from "antd";

import { dataPlaceHolder } from "@infra/helpers/utils";
import { UserRoleCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/components/SelectUserStep/helper/components/UserRoleCard/@types/@UserRoleCard";

import { EmployeeRoleType, StudentRoleType } from "../../../@types/@selectUserStep";

const UserRoleCard = ({ role, variant }: UserRoleCardProps) => {
  const isStudent = variant === "student";
  const studentRole = role as StudentRoleType;
  const employeeRole = role as EmployeeRoleType;

  const items = [
    {
      key: "number",
      label: "شماره دانشجویی / پرسنلی",
      children: dataPlaceHolder({
        data: isStudent ? studentRole.studentNumber : employeeRole.personnelNumber,
      }),
    },
    {
      key: "unit",
      label: "شعبه/واحد",
      children: dataPlaceHolder({ data: role.unit }),
    },
    ...(isStudent
      ? [
          {
            key: "education",
            label: "اطلاعات تحصیلی",
            children: (
              <span className="text-neutral-12 inline-flex items-center gap-2">
                <span>{dataPlaceHolder({ data: studentRole.degree })}</span>
                <Divider
                  type="vertical"
                  className="border-neutral-4! m-0! self-stretch"
                />
                <span>{dataPlaceHolder({ data: studentRole.major })}</span>
              </span>
            ),
          },
          {
            key: "entryYear",
            label: "سال ورود",
            children: dataPlaceHolder({ data: studentRole.entryYear }),
          },
        ]
      : [
          {
            key: "position",
            label: "اطلاعات کارمندی",
            children: dataPlaceHolder({ data: employeeRole.position }),
          },
        ]),
  ];

  return (
    <Descriptions
      column={1}
      colon={false}
      className="w-full min-w-0 [&_.ant-descriptions-item]:pb-0! [&_.ant-descriptions-row:last-child>td]:pb-0! [&_.ant-descriptions-row>td]:pb-4!"
      styles={{
        label: {
          color: "var(--neutral-7)",
          minWidth: 136,
          textAlign: "start",
        },
        content: {
          color: "var(--neutral-10)",
          textAlign: "start",
        },
      }}
      items={items}
    />
  );
};

export default UserRoleCard;
