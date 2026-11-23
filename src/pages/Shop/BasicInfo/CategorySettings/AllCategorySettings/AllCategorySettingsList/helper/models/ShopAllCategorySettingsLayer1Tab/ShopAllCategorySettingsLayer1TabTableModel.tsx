import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { ShopAllCategorySettingsLayer1RecordType } from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";

type ShopAllCategorySettingsLayer1TabTableModelProps = {
  onEdit: (record: ShopAllCategorySettingsLayer1RecordType) => void;
};

const ShopAllCategorySettingsLayer1TabTableModel = ({
  onEdit,
}: ShopAllCategorySettingsLayer1TabTableModelProps): CustomColumnType<ShopAllCategorySettingsLayer1RecordType>[] => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 280,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تعداد دسته‌های لایه 2",
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
      render: (_: unknown, record: ShopAllCategorySettingsLayer1RecordType) => (
        <CustomButton type="link" onClick={() => onEdit(record)}>
          ویرایش
        </CustomButton>
      ),
    },
  ];
};

export default ShopAllCategorySettingsLayer1TabTableModel;
