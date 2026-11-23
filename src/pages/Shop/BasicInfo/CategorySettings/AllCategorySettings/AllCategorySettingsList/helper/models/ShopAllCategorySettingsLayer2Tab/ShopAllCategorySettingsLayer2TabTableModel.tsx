import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { ShopAllCategorySettingsLayer2RecordType } from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";

type ShopAllCategorySettingsLayer2TabTableModelProps = {
  onEdit: (record: ShopAllCategorySettingsLayer2RecordType) => void;
};

const ShopAllCategorySettingsLayer2TabTableModel = ({
  onEdit,
}: ShopAllCategorySettingsLayer2TabTableModelProps): CustomColumnType<ShopAllCategorySettingsLayer2RecordType>[] => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 280,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تعداد دسته‌های لایه 1",
      dataIndex: "childCount",
      key: "childCount",
      width: 220,
      render: (value: number) => dataPlaceHolder({ data: value }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "actions",
      width: 100,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: ShopAllCategorySettingsLayer2RecordType) => (
        <CustomButton type="link" onClick={() => onEdit(record)}>
          ویرایش
        </CustomButton>
      ),
    },
  ];
};

export default ShopAllCategorySettingsLayer2TabTableModel;
