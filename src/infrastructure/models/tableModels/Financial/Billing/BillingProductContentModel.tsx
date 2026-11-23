import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import UniConsulting from "../../../../../assets/icons/UniConsulting";
import UniFood from "../../../../../assets/icons/UniFood";
import UniGame from "../../../../../assets/icons/UniGame";
import UniRoom from "../../../../../assets/icons/UniRoomIcon";
import { LimitText } from "../../../../helpers/utils";

export const BillingProductContentModel = [
  {
    title: "عنوان خدمت",
    dataIndex: "serviceTitle",
    key: "serviceTitle",
    width: 150,
  },
  {
    title: "شناسه خدمت",
    dataIndex: "serviceId",
    key: "serviceId",
    width: 150,
  },
  {
    title: "محصول",
    dataIndex: "product",
    key: "product",
    width: 100,
    render: (value: number) => {
      return (
        <>
          {value === 1 ? (
            <span className="product-svg-container">
              <UniRoom />
              خوابگاه
            </span>
          ) : value === 2 ? (
            <span className="product-svg-container">
              <UniFood />
              سلف
            </span>
          ) : value === 3 ? (
            <span className="product-svg-container">
              <UniConsulting />
              مشاوره
            </span>
          ) : value === 4 ? (
            <span className="product-svg-container">
              <UniGame />
              گیم
            </span>
          ) : (
            <></>
          )}
        </>
      );
    },
  },
  {
    title: "مقدار",
    dataIndex: "count",
    key: "count",
    width: 150,
  },
  {
    title: "قیمت واحد",
    dataIndex: "unitPrice",
    key: "unitPrice",
    width: 130,
  },
  {
    title: "تخفیف واحد",
    dataIndex: "unitDiscount",
    key: "unitDiscount",
    width: 100,
  },
  {
    title: "قیمت نهایی",
    dataIndex: "finalPrice",
    key: "finalPrice",
    width: 100,
  },
  {
    title: "شرح",
    dataIndex: "desc",
    key: "desc",
    width: 150,
    render: (desc: string) => {
      return (
        <CustomTooltip title={desc}>
          <p>{LimitText(desc, 10)}</p>
        </CustomTooltip>
      );
    },
  },
];
