import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

const OverViewBranchTableModel = ({
  goToServices,
}: {
  goToServices: () => void;
}): CustomColumnType<any>[] => {
  return [
    {
      title: "کسب و کار",
      dataIndex: "business",
      key: "business",
      width: "250",
    },
    {
      title: "شعبه / واحد (ذینفع)",
      dataIndex: "branchName",
      key: "branchName",
      width: "250",
    },
    {
      title: "مانده ابتدای دوره",
      dataIndex: "beginningBalance",
      key: "beginningBalance",
      width: "100",
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
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 108,
      render: () => {
        return (
          <CustomButton onClick={goToServices} type="link">
            مشاهده سرویس‌ها
          </CustomButton>
        );
      },
    },
  ];
};
export default OverViewBranchTableModel;
