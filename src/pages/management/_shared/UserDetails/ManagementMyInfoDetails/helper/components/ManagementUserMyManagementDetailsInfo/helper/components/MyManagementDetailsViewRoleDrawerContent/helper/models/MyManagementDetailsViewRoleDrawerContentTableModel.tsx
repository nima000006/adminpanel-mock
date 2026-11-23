import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { RoleType } from "../../../MyManagementDetailsEditRoleDrawerContent/@types/@managementUsersMyStaffInfo";

const MyManagementDetailsViewRoleDrawerContentTableModel =
  (): CustomColumnType<RoleType>[] => {
    return [
      {
        title: "نام سرویس",
        dataIndex: "serviceName",
        key: "serviceName",
        render: (value: string) => (
          <CustomTag className="w-fit">
            {serviceOptions.find((item) => item.value === value)?.title ?? "-"}
          </CustomTag>
        ),
      },
      {
        title: "نام",
        dataIndex: "title",
        key: "title",
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
    ];
  };
export default MyManagementDetailsViewRoleDrawerContentTableModel;
