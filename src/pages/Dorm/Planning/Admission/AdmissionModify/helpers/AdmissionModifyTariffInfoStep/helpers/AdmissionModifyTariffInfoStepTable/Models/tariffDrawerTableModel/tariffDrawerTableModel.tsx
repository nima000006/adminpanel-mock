import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_tariffDrawerTableModel.scss";

export const tariffDrawerTableModel = [
  {
    title: "انواع اتاق ها",
    dataIndex: "roomTypeeTitle",
    key: "roomTypeeTitle",
    width: 150,
  },
  {
    title: (
      <div className="custom-field-container">
        <Tooltip placement="bottom" title='قیمت به صورت "تخت روز" محاسبه می‌شود.'>
          <AiOutlineQuestionCircle />
        </Tooltip>
        قیمت (ریال - تخت روز)
      </div>
    ),
    dataIndex: "price",
    key: "price",
    width: 150,
    render: (value: string) => {
      return dataPlaceHolder({ data: value, isPrice: true });
    },
  },
];
