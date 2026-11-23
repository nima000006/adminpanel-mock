import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { OrganizationStructureSegmentContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/OrganizationalUnitsTab/helper/components/OrganizationStructureSegmentContent/@types/@organizationStructureSegmentContent";

import { OrganizationStructureSegmentContentTableModelProps } from "./@types/@OrganizationUnitSegmentContentTableModelType";

const OrganizationStructureSegmentContentTableModel = ({
  deleteHandler,
  viewHandler,
  editHandler,
  subSetHandler,
}: OrganizationStructureSegmentContentTableModelProps): CustomColumnType<OrganizationStructureSegmentContentDataType>[] => {
  return [
    {
      title: "عنوان واحد",
      dataIndex: "unitTitle",
      key: "unitTitle",
      width: 130,
    },
    {
      title: "نوع واحد ",
      dataIndex: "unitType",
      key: "unitType",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"blue"}>{value}</CustomTag>;
      },
    },
    {
      title: "شعبه",
      dataIndex: "branch",
      key: "branch",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"purple"}>{value}</CustomTag>;
      },
    },
    {
      title: "والد واحد",
      dataIndex: "parentUnit",
      key: "parentUnit",
      width: 130,
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
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 170,
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
            <CustomButton type="link" onClick={() => subSetHandler?.(+value)}>
              ایجاد زیر مجموعه
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
export default OrganizationStructureSegmentContentTableModel;
