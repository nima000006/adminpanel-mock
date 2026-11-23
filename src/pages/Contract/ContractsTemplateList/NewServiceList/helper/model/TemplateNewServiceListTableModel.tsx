import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { NewServiceListDataTypes } from "@pages/Contract/ContractsTemplateList/NewServiceList/@types/@newServiceList";

const TemplateNewServiceListTableModel = ({
  editClickHandler,
  deleteClickHandler,
}: {
  editClickHandler: (id: number) => void;
  deleteClickHandler: (id: number) => void;
}): CustomColumnType<NewServiceListDataTypes>[] => {
  return [
    {
      title: "ذينفع",
      dataIndex: "beneficiary",
      key: "beneficiary",
      width: 150,
    },
    {
      title: "نوع ذینفع",
      dataIndex: "type",
      key: "type",
      width: 70,
      render: () => {
        return <CustomTag>حقیقی</CustomTag>;
      },
    },
    {
      title: "فروشنده",
      dataIndex: "branchType",
      key: "branchType",
      width: 100,
    },
    {
      title: "نوع شعبه",
      dataIndex: "branchType",
      key: "branchType",
      width: 100,
    },
    {
      title: " شعبه",
      dataIndex: "branchType",
      key: "branchType",
      width: 150,
    },
    {
      title: " خدمت سهامدار",
      dataIndex: "branchType",
      key: "branchType",
      width: 150,
    },
    {
      title: "درصد سهم",
      dataIndex: "share",
      key: "share",
      width: 150,
    },
    {
      title: "مشاهده",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 170,
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return (
          <div className="flex gap-1">
            <CustomButton type="link" onClick={() => editClickHandler(value)}>
              ویرایش
            </CustomButton>
            <CustomButton type="link" danger onClick={() => deleteClickHandler(value)}>
              حذف
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default TemplateNewServiceListTableModel;
