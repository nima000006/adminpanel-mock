import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { PositionTypeSegmentContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/BusinessBaseInfoTab/helper/components/PositionTypeSegmentContent/@types/@positionTypeSegmentContent";

const BusinessBaseInfoPositionTypeTableModel = ({
  allocationHandler,
}: {
  allocationHandler: (id: number) => void;
}): CustomColumnType<PositionTypeSegmentContentDataType>[] => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return [
    {
      title: "عنوان نوع سمت",
      dataIndex: "unitName",
      key: "unitName",
      width: 250,
    },
    {
      title: "ارائه شده به",
      dataIndex: "presentTo",
      key: "presentTo",
      width: 100,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      width: 70,
      render: (value: string) => {
        return (
          <div className="checkout-container">
            <CustomButton type="link" onClick={() => allocationHandler?.(+value)}>
              تخصیص به
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default BusinessBaseInfoPositionTypeTableModel;
