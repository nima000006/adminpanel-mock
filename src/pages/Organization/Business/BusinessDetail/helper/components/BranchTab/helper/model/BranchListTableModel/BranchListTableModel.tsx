import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { BranchTabDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/BranchTab/@type/@branchTab";
import { branchTypeModeTag } from "@pages/Organization/Business/BusinessDetail/helper/utils/businessDetailUtils";

import { BranchListTableModelProps } from "../@types/@branchListTableModelType";

const BranchListTableModel = ({
  deleteBranchHandler,
  viewBranchHandler,
  editBranchHandler,
}: BranchListTableModelProps): CustomColumnType<BranchTabDataType>[] => {
  return [
    {
      title: "عنوان شعبه",
      dataIndex: "branchTitle",
      key: "branchTitle",
      width: 130,
    },
    {
      title: "نوع شعبه ",
      dataIndex: "branchType",
      key: "branchType",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"blue"}>{branchTypeModeTag(value)}</CustomTag>;
      },
    },
    {
      title: "والد شعبه",
      dataIndex: "branchParent",
      key: "branchParent",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"geekblue"}>{value}</CustomTag>;
      },
    },
    {
      title: "استان",
      dataIndex: "province",
      key: "province",
      width: 130,
    },
    {
      title: "شهر",
      dataIndex: "city",
      key: "city",
      width: 130,
    },
    {
      title: "کد شعبه",
      dataIndex: "branchCode",
      key: "branchCode",
      width: 130,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDateBranch",
      key: "createDateBranch",
      width: 130,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
      },
    },
    {
      title: "ایجاد شده توسط",
      dataIndex: "creator",
      key: "creator",
      width: 130,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      width: 100,
      render: (value: string, records: BranchTabDataType) => {
        return (
          <div className="checkout-container">
            <CustomButton
              type="link"
              onClick={() => deleteBranchHandler?.(+value)}
              danger
            >
              حذف
            </CustomButton>
            <CustomButton
              type="link"
              onClick={() =>
                viewBranchHandler?.({ id: +value, title: records?.branchTitle })
              }
            >
              مشاهده
            </CustomButton>
            <CustomButton type="link" onClick={() => editBranchHandler?.(+value)}>
              ویرایش
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default BranchListTableModel;
