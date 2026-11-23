import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { ShopAllSendingSettingsListRecordType } from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/@types/@shopAllSendingSettingsList";
import { formatDeliveryDays } from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/helper/models/ShopAllSendingSettingsListTableModel/helper/utils";

const ShopAllSendingSettingsListTableModel = ({
  onEdit,
}: {
  onEdit: (record: ShopAllSendingSettingsListRecordType) => void;
}): CustomColumnType<ShopAllSendingSettingsListRecordType>[] => {
  return [
    {
      title: "نام فروشنده",
      dataIndex: "supplierTitle",
      key: "supplierTitle",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "supplierTitle",
        label: "نام فروشنده",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "هزینه ارسال تهران (تومان)",
      dataIndex: "tehranCost",
      key: "tehranCost",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "tehranCost",
        label: "هزینه ارسال شهرستان (تومان)",
        type: "sort",
      }),
      render: (value: number) =>
        dataPlaceHolder({
          data: value,
          isPrice: true,
        }),
    },
    {
      title: "زمان ارسال تهران",
      dataIndex: "tehranMinDeliveryDays",
      key: "tehranDeliveryTime",
      width: 160,
      render: (_: number, record: ShopAllSendingSettingsListRecordType) =>
        dataPlaceHolder({
          data: formatDeliveryDays(
            record.tehranMinDeliveryDays,
            record.tehranMaxDeliveryDays
          ),
        }),
    },
    {
      title: "هزینه ارسال شهرستان (تومان)",
      dataIndex: "otherCitiesCost",
      key: "otherCitiesCost",
      width: 250,
      ...GetServerColumnSearchProps({
        dataIndex: "otherCitiesCost",
        label: "هزینه ارسال شهرستان (تومان)",
        type: "sort",
      }),
      render: (value: number) =>
        dataPlaceHolder({
          data: value,
          isPrice: true,
        }),
    },
    {
      title: "زمان ارسال شهرستان",
      dataIndex: "otherCitiesMinDeliveryDays",
      key: "otherCitiesDeliveryTime",
      width: 180,
      render: (_: number, record: ShopAllSendingSettingsListRecordType) =>
        dataPlaceHolder({
          data: formatDeliveryDays(
            record.otherCitiesMinDeliveryDays,
            record.otherCitiesMaxDeliveryDays
          ),
        }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "actions",
      width: 100,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: ShopAllSendingSettingsListRecordType) => (
        <CustomButton type="link" onClick={() => onEdit(record)}>
          ویرایش
        </CustomButton>
      ),
    },
  ];
};

export default ShopAllSendingSettingsListTableModel;
