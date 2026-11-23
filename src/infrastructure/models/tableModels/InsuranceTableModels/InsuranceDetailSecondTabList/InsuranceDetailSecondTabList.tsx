import { Button } from "antd";

import { InsuranceRequestStatus } from "@pages/Insurance/InsuranceRequests/InsuranceRequestsDetail/_shared/components/StatusGenerator/StatusGenerator";

import { dataPlaceHolder } from "../../../../helpers/utils";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const InsuranceDetailSecondTabListTableModel = ({
  onInsuranceRequestDetailClickHandler,
}: {
  onInsuranceRequestDetailClickHandler: (id: string) => void;
}) => {
  return [
    {
      title: "شماره درخواست",
      dataIndex: "requestNumber",
      key: "requestNumber",
      width: 130,
    },
    {
      title: "بیمه‌گر",
      dataIndex: "insuranceName",
      key: "insuranceName",
      width: 100,
    },
    {
      title: "نوع بیمه",
      dataIndex: "insuranceType",
      key: "insuranceType",
      width: 150,
    },
    {
      title: "تاریخ ثبت درخواست",
      dataIndex: "requestDate",
      key: "requestDate",
      width: 150,
      render: (value: string) => {
        return <span>{dataPlaceHolder({ data: value, isDate: true })}</span>;
      },
    },
    {
      title: "وضعیت بیمه‌شده",
      dataIndex: "insuranceStatus",
      key: "insuranceStatus",
      width: 130,
      render: (value: string) => {
        return <InsuranceRequestStatus status={+value} />;
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      width: 100,
      render: (value: string) => {
        return (
          <div className="checkout-container">
            <Button
              onClick={() => onInsuranceRequestDetailClickHandler(value)}
              type="link"
              disabled
            >
              جزئیات
            </Button>
          </div>
        );
      },
    },
  ];
};
