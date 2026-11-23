import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

const ActiveRoleTableModel = () => {
  return [
    {
      title: "نقش‌ها",
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (value: string) => {
        return (
          <CustomTag className="w-fit" color="default">
            {dataPlaceHolder({ data: value })}
          </CustomTag>
        );
      },
    },
    {
      title: "سرویس",
      dataIndex: "serviceName",
      key: "serviceName",
      width: 100,
      render: (value: string) => {
        return <SamimServiceTag service={value} />;
      },
    },
  ];
};
export default ActiveRoleTableModel;
