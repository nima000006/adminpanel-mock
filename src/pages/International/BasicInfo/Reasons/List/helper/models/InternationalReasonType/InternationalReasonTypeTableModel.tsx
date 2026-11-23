import { PiArrowsLeftRight, PiCheck, PiX } from "react-icons/pi";
import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { INTERNATIONAL_BASIC_INFO_REASON_DETAIL_ROUTE } from "@infra/router/routes/international";

const InternationalReasonTypeTableModel = () => {
  return [
    {
      title: "نوع دلیل",
      dataIndex: "type",
      key: "type",
      width: 800,
      render: (value: string, record: any) => {
        let color = "";
        let icon = null;

        switch (record.statusId) {
          case 1: // رد
            color = "error";
            icon = <PiX />;
            break;
          case 2: // تایید
            color = "success";
            icon = <PiCheck />;
            break;
          case 3: // اصلاح
            color = "warning";
            icon = <PiArrowsLeftRight />;
            break;
          default:
            color = "";
            break;
        }

        return (
          <CustomTag color={color} icon={icon} className="w-fit gap-1">
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "تعداد دلایل تعریف شده",
      dataIndex: "count",
      key: "count",
      width: 200,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_BASIC_INFO_REASON_DETAIL_ROUTE,
              search: makeSearchParams({
                statusId: value,
              }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};

export default InternationalReasonTypeTableModel;
