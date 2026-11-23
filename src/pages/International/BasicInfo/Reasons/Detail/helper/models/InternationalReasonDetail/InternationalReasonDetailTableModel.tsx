import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { InternationalReasonDetailTableModelPropsTypes } from "./@types/@internationalReasonDetailTableModelPropsTypes";

const InternationalReasonDetailTableModel = ({
  onClickHandlerView,
  onClickHandlerEdit,
}: InternationalReasonDetailTableModelPropsTypes) => {
  return [
    {
      title: "عنوان دلیل",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "متن توضیحات نمایش داده شده به متقاضی",
      dataIndex: "description",
      key: "description",
      width: 550,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: () => {
        return (
          <div className="actions-btn-container">
            <CustomButton type="link" onClick={onClickHandlerView}>
              مشاهده
            </CustomButton>
            <CustomButton type="link" onClick={onClickHandlerEdit}>
              ویرایش
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default InternationalReasonDetailTableModel;
