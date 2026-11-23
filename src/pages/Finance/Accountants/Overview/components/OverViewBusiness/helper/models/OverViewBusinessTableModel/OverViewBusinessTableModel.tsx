import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

const OverViewBusinessTableModel = ({
  goToBeneficiaries,
}: {
  goToBeneficiaries: () => void;
}): CustomColumnType<any>[] => {
  return [
    {
      title: "کسب و کار",
      dataIndex: "businessName",
      key: "businessName",
      width: 350,
    },
    {
      title: "مانده ابتدای دوره",
      dataIndex: "beginningBalance",
      key: "beginningBalance",
      width: 100,
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
      title: "مطالبات ذینفعان (بستانکاری)",
      dataIndex: "indebtedness",
      key: "indebtedness",
      width: 170,
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }),
    },
    {
      title: "تعهدات ذینفعان (بدهکاری)",
      dataIndex: "creditor",
      key: "creditor",
      width: 150,
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }),
    },
    {
      title: "مانده انتهای دوره",
      dataIndex: "endingBalance",
      key: "endingBalance",
      width: 188,
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
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 108,
      render: () => {
        return (
          <div className="transaction-main-list-table-container">
            <CustomButton type="link" onClick={goToBeneficiaries}>
              مشاهده ذینفعان
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default OverViewBusinessTableModel;
