import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { allocationHandlerDataTypes } from "@pages/Organization/Business/BusinessDetail/helper/components/BusinessBaseInfoTab/helper/components/UnitTypeSegmentContent/@types/@unitTypeSegmentContent";

const BusinessBaseInfoTableModel = ({
  allocationHandler,
}: {
  allocationHandler: (id: number) => void;
}): CustomColumnType<allocationHandlerDataTypes>[] => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return [
    {
      title: "عنوان نوع واحد",
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
export default BusinessBaseInfoTableModel;
