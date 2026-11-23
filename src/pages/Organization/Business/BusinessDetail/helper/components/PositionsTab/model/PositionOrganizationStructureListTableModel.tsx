import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { PositionOrganizationStructureSegmentContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/PositionsTab/components/PositionOrganizationStructureSegmentContent/@types/@positionOrganizationStructureSegmentContent";

import { PositionOrganizationSegmentContentTableModelProps } from "./@type/@positionSegmentContentTableModelProps";

const PositionOrganizationStructureListTableModel = ({
  deleteHandler,
  viewHandler,
  editHandler,
}: PositionOrganizationSegmentContentTableModelProps): CustomColumnType<PositionOrganizationStructureSegmentContentDataType>[] => {
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
      title: "فعال در",
      dataIndex: "activeIn",
      key: "activeIn",
      width: 150,
    },
    {
      title: "سمت والد",
      dataIndex: "parentPosition",
      key: "parentPosition",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"purple"}>{value}</CustomTag>;
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
            <CustomButton type="link" danger onClick={() => deleteHandler?.(+value)}>
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
export default PositionOrganizationStructureListTableModel;
