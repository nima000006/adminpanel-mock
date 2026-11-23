import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { ShopAllCategorySettingsLayer3RecordType } from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";

type ShopAllCategorySettingsLayer3TabTableModelProps = {
  onEdit: (record: ShopAllCategorySettingsLayer3RecordType) => void;
};

const ShopAllCategorySettingsLayer3TabTableModel = ({
  onEdit,
}: ShopAllCategorySettingsLayer3TabTableModelProps): CustomColumnType<ShopAllCategorySettingsLayer3RecordType>[] => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 280,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "دسته‌بندی‌های لایه 2",
      dataIndex: "childCount",
      key: "childCount",
      width: 200,
      render: (value: number) => dataPlaceHolder({ data: value }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "actions",
      width: 100,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: ShopAllCategorySettingsLayer3RecordType) => (
        <CustomButton type="link" onClick={() => onEdit(record)}>
          ویرایش
        </CustomButton>
      ),
    },
  ];
};

export default ShopAllCategorySettingsLayer3TabTableModel;
