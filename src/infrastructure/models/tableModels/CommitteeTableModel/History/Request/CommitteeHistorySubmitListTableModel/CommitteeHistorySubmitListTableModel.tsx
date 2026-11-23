import moment from "jalali-moment";

import { COMMITTEE_SUBMITTER_REQUESTS_ALL_CODE } from "@pages/Committee/History/Requests/_shared/helper/RequestListUtil/RequestListUtil";
import { SubmitterRequest } from "@pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/RemoveHistory/helper/components/RequestDetail/@ytypes/@requestDetail";

import CustomButton from "../../../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "../../../../../../../components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "../../../../../../helpers/utils";
import { FixedType } from "../../../../../modules/GeneralTypes/GeneralTypes";

type CommitteeHistorySubmitListTableModelProps = {
  onCheckoutClickHandler: (value: number) => void;
  onCheckoutDeleteHistoryClickHandler: (value: number) => void;
  type: string;
};

const CommitteeHistorySubmitListTableModel = ({
  onCheckoutClickHandler,
  onCheckoutDeleteHistoryClickHandler,
  type,
}: CommitteeHistorySubmitListTableModelProps) => {
  return [
    {
      title: "شماره درخواست",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "نام",
      dataIndex: "inquirerFirstName",
      key: "inquirerFirstName",
      width: 150,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "inquirerLastName",
      key: "inquirerLastName",
      width: 150,
    },
    {
      title: "سمت",
      dataIndex: "inquirerPost",
      key: "inquirerPost",
      width: 150,
    },
    {
      title: "واحد",
      dataIndex: "UniCode",
      key: "UniCode",
      width: 100,
    },
    {
      title: "سازمان",
      dataIndex: "inquirerOrganization",
      key: "inquirerOrganization",
      width: 150,
    },
    {
      title: "نوع درخواست",
      dataIndex: "AssociationUserRequestType_title",
      key: "AssociationUserRequestType_title",
      width: 150,
      render: (value: string) => {
        const colorTagGenerator =
          value === "امحاء"
            ? "default"
            : value === "حذف سابقه"
              ? "processing"
              : value === "استعلام"
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
      title: "علت درخواست",
      dataIndex: "AssociationReasoneRequest_title",
      key: "AssociationReasoneRequest_title",
      width: 150,
    },
    {
      title: "تاریخ ثبت درخواست",
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
    ...(type === COMMITTEE_SUBMITTER_REQUESTS_ALL_CODE
      ? [
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
        ]
      : []),
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: number, record: SubmitterRequest) => {
        return record?.AssociationUserRequestType_title === "استعلام" ? (
          <CustomButton type="link" onClick={() => onCheckoutClickHandler(value)}>
            بررسی
          </CustomButton>
        ) : (
          <CustomButton
            type="link"
            onClick={() => onCheckoutDeleteHistoryClickHandler(value)}
          >
            بررسی
          </CustomButton>
        );
      },
    },
  ];
};

export default CommitteeHistorySubmitListTableModel;
