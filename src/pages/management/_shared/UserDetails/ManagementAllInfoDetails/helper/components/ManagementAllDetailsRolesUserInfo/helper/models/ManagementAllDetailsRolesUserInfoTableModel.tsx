import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { RoleItem } from "../../@types/@managementAllRolesCustomer";

const ManagementAllDetailsRolesUserInfoTableModel = (): CustomColumnType<RoleItem>[] => {
  return [
    {
      title: "نقش تخصیص داده شده",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: function (_: unknown, records: RoleItem) {
        return (
          <CustomTag className="custom-tag">
            {dataPlaceHolder({ data: records?.title })}
          </CustomTag>
        );
      },
    },
    {
      title: "نام سرویس",
      dataIndex: "serviceName",
      key: "serviceName",
      width: 170,
      render: function (_: unknown, records: RoleItem) {
        return (
          <CustomTag className="w-fit">
            {serviceOptions.find((item) => item.value === records?.serviceName)?.title ??
              "-"}
          </CustomTag>
        );
      },
    },
    {
      title: "وضعیت نقش",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (value: boolean) => (value ? "فعال" : "غیر فعال"),
    },
  ];
};
export default ManagementAllDetailsRolesUserInfoTableModel;
