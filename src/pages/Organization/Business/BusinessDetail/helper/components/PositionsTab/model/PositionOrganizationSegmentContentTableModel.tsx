import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { PositionOrganizationSegmentContentType } from "@pages/Organization/Business/BusinessDetail/helper/components/PositionsTab/components/PositionOrganizationSegmentContent/@types/@positionOrganizationSegmentContent";

import { PositionOrganizationSegmentContentTableModelProps } from "./@type/@positionSegmentContentTableModelProps";

const PositionOrganizationSegmentContentTableModel = ({
  deleteHandler,
  viewHandler,
  editHandler,
}: PositionOrganizationSegmentContentTableModelProps): CustomColumnType<PositionOrganizationSegmentContentType>[] => {
  return [
    {
      title: "عنوان سمت",
      dataIndex: "positionTitle",
      key: "positionTitle",
      width: 150,
    },
    {
      title: "نوع سمت ",
      dataIndex: "positionType",
      key: "positionType",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"blue"}>{value}</CustomTag>;
      },
    },
    {
      title: "توضیحات",
      dataIndex: "desc",
      key: "desc",
      width: 150,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      width: 130,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
      },
    },
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "lastEditDate",
      key: "lastEditDate",
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
      render: (value: string) => {
        return (
          <div className="checkout-container">
            <CustomButton type="link" onClick={() => deleteHandler?.(+value)} danger>
              حذف
            </CustomButton>
            <CustomButton type="link" onClick={() => viewHandler?.(+value)}>
              مشاهده
            </CustomButton>
            <CustomButton type="link" onClick={() => editHandler?.(+value)}>
              ویرایش
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default PositionOrganizationSegmentContentTableModel;
