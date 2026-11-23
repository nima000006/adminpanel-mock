import { CustomButton } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { SajedPositionRequestRecordType } from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/@types/@requestRoleDrawerContentTypes";
import {
  REQUEST_STATUS_COLOR,
  REQUEST_STATUS_TEXT,
  WAITING_COMPLETION,
} from "@pages/Auth/SignIn/FifthPage/helper/utils";

const RequestRoleDrawerContentTableModel = ({
  viewHandler,
  completeInfoHandler,
}: {
  viewHandler: (value: number) => void;
  completeInfoHandler: (value: number) => void;
}) => {
  return [
    {
      title: "شماره درخواست ",
      dataIndex: "requestId",
      key: "requestId",
      width: 130,

      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "وضعیت درخواست",
      dataIndex: "status",
      key: "status",
      width: 130,

      render: (value: { id: number; name: string; title: string }) => {
        return (
          <CustomTag color={REQUEST_STATUS_COLOR[value?.id]}>
            {REQUEST_STATUS_TEXT[value?.id]}
          </CustomTag>
        );
      },
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY/MM/DD ",
            })}
          </>
        );
      },
    },
    {
      title: "کد پرسنلی",
      dataIndex: "employeeCode",
      key: "employeeCode",
      width: 130,

      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام سازمان / واحد محل فعالیت",
      dataIndex: "branchName",
      key: "branchName",
      width: 250,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
      },
    },
    {
      title: " محل خدمت",
      dataIndex: "organizationTitle",
      key: "organizationTitle",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سمت",
      dataIndex: "positionTitle",
      key: "positionTitle",
      width: 130,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (_: unknown, records: SajedPositionRequestRecordType) =>
        records?.status?.id === WAITING_COMPLETION ? (
          <CustomButton
            type="link"
            onClick={() => completeInfoHandler(records?.requestId)}
          >
            تکمیل اطلاعات
          </CustomButton>
        ) : (
          <CustomButton type="link" onClick={() => viewHandler(records?.requestId)}>
            مشاهده
          </CustomButton>
        ),
    },
  ];
};
export default RequestRoleDrawerContentTableModel;
