import { Button } from "antd";
import moment from "jalali-moment";

import { CommitteeSubmitListDataSource } from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsList/helper/components/CommitteeSubmitList/@types/@committeeSubmitList";

import CustomTag from "../../../../../../../components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "../../../../../../helpers/utils";
import { FixedType } from "../../../../../modules/GeneralTypes/GeneralTypes";

type CommitteeHistorySubmitListTableModelProps = {
  onCheckoutClickHandler: (value: string, status: number, nationalCode: string) => void;
};

const CommitteeHistoryRequestSubmitListTableModel = ({
  onCheckoutClickHandler,
}: CommitteeHistorySubmitListTableModelProps) => {
  return [
    {
      title: "شماره ملی متهم",
      dataIndex: "nationalCodeOffender",
      key: "nationalCodeOffender",
      width: 150,
    },
    {
      title: "شماره دانشجویی متهم",
      dataIndex: "studentNumberOffender",
      key: "studentNumberOffender",
      width: 150,
    },
    {
      title: "علت درخواست",
      dataIndex: "AssociationReasoneRequest_title",
      key: "AssociationReasoneRequest_title",
      width: 100,
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "dateRegistration",
      key: "dateRegistration",
      width: 150,
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isDate: true });
      },
    },
    {
      title: "انتظار",
      dataIndex: "dateRegistration",
      key: "dateRegistration",
      width: 150,
      render: (value: string) => {
        const diffTime = moment(new Date(), "YYYY/M/D").diff(
          moment(value ?? new Date()),
          "days"
        );
        const colorGenerator =
          +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";
        return (
          <div className="waiting-time-container">
            <span className={`waiting-time ${colorGenerator}`}>{diffTime}</span>
            <span>روز</span>
          </div>
        );
      },
    },
    {
      title: "وضعیت",
      dataIndex: "AssociationInquiryRequestStatus_title",
      key: "AssociationInquiryRequestStatus_title",
      width: 150,
      render: (value: string) => {
        const colorTagGenerator =
          value === "پاسخ داده شده"
            ? "success"
            : value === "در انتظار بررسی"
              ? "gold"
              : "volcano";
        return (
          <CustomTag className="request-type" color={colorTagGenerator}>
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: string, records: CommitteeSubmitListDataSource) => {
        return (
          <Button
            type="link"
            onClick={() =>
              onCheckoutClickHandler(
                value,
                records?.AssociationInquiryRequestStatus_id,
                records?.nationalCodeOffender
              )
            }
          >
            بررسی
          </Button>
        );
      },
    },
  ];
};

export default CommitteeHistoryRequestSubmitListTableModel;
