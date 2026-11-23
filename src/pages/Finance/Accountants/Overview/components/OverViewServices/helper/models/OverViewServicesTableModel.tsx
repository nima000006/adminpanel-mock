import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

const OverViewServicesTableModel = (): CustomColumnType<any>[] => {
  return [
    {
      title: "سرویس",
      dataIndex: "serviceName",
      key: "serviceName",
      width: "200",
      render: (_: unknown, record: any) => {
        return <SamimServiceTag service={record?.service} />;
      },
    },
    {
      title: "مانده ابتدای دوره",
      dataIndex: "beginningBalance",
      key: "beginningBalance",
      width: "100",
      render: (value: string) => {
        return (
          <div className="flex gap-2">
            {dataPlaceHolder({ data: value, isPrice: true, isRial: true })}
            {+value > 1 ? (
              <CustomTag className="w-fit" color="red">
                {"بستانکار"}
              </CustomTag>
            ) : null}
          </div>
        );
      },
    },
    {
      title: "مطالبات ذینفع (بستانکاری)",
      dataIndex: "creditor",
      key: "creditor",
      width: "100",
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }),
    },
    {
      title: "تعهدات ذینفع (بدهکاری)",
      dataIndex: "indebtedness",
      key: "indebtedness",
      width: "100",
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }),
    },
    {
      title: "مانده انتهای دوره (تومان)",
      dataIndex: "endingBalance",
      key: "endingBalance",
      width: "188",
      render: (value: string) => {
        return (
          <div className="flex gap-2">
            {dataPlaceHolder({ data: value, isPrice: true, isRial: true })} تومان
            {+value > 1 ? (
              <CustomTag className="w-fit" color="green">
                {"بستانکار"}
              </CustomTag>
            ) : null}
          </div>
        );
      },
    },
  ];
};
export default OverViewServicesTableModel;
