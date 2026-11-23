import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { AppFaqTableModelProps } from "../../@types/@faqManagement";

const AppFaqTableModel = ({
  onVisitClickHandler,
  onDeleteClickHandler,
}: AppFaqTableModelProps) => {
  return [
    {
      title: "شناسه",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "شماره سوال",
      dataIndex: "orderId",
      key: "orderId",
      width: 80,
    },
    {
      title: "سوال",
      dataIndex: "question",
      key: "question",
      width: 250,
    },
    {
      title: "جواب",
      dataIndex: "answer",
      key: "answer",
      width: 250,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 170,
      render: (value: number) => {
        return (
          <div className="table-btns-container">
            <CustomButton type="link" onClick={() => onVisitClickHandler(value)}>
              مشاهده
            </CustomButton>
            <CustomButton type="text" danger onClick={() => onDeleteClickHandler(value)}>
              حذف
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default AppFaqTableModel;
