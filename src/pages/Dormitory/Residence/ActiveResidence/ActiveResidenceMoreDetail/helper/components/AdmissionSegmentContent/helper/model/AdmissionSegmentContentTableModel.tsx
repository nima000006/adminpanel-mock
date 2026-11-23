import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

const AdmissionSegmentContentTableModel = (): CustomColumnType<any>[] => [
  {
    title: "برنامه پذیرش",
    dataIndex: "admission",
    key: "admission",
    width: 300,
  },
  {
    title: "نوع مدیریت",
    dataIndex: "managementType",
    key: "managementType",
    width: 170,
  },
  {
    title: "نوع رزرو",
    dataIndex: "reserveType",
    key: "reserveType",
    width: 150,

    render: (value: string) => {
      const reserveType = RESERVE_TYPE[value as keyof typeof RESERVE_TYPE];
      const Icon = reserveType.icon;
      return (
        <CustomTag className="w-fit" color={reserveType.color}>
          <Icon size={16} />
          {reserveType.label}
        </CustomTag>
      );
    },
  },
  {
    title: "امکان پرداخت",
    dataIndex: "paymentOption",
    key: "paymentOption",
    width: 150,

    render: (value: string) => {
      const paymentOption = PAYMENT_OPTION[value as keyof typeof PAYMENT_OPTION];

      return (
        <CustomTag className="w-fit" color={paymentOption.color}>
          {paymentOption.label}
        </CustomTag>
      );
    },
  },

  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    width: 70,
    render: (_: unknown, records: any) => (
      <div className="flex gap-2">
        <Link
          to={{
            pathname: "",
            search: makeSearchParams({
              id: records?.id,
            }),
          }}
        >
          <CustomButton iconPlacement="end" type="link">
            مشاهده
          </CustomButton>
        </Link>
      </div>
    ),
  },
];
export default AdmissionSegmentContentTableModel;
