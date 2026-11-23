import { Row } from "antd";
import { PiPlus } from "react-icons/pi";
import { Link } from "react-router";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { AdmissionDetailRequestInfoProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailRequestInfo/@types/@admissionDetailRequestInfo";
import { MY_ADMISSION_STATUS_CONFIG } from "@pages/Dormitory/Admission/_shared/util";

const AdmissionDetailRequestInfo = ({
  variant,
  data,
  statusFlags,
}: AdmissionDetailRequestInfoProps) => {
  const currentStatus = MY_ADMISSION_STATUS_CONFIG[data.status];
  const isAllVariant = variant === "all";
  const fieldColLg = isAllVariant ? 6 : 8; // size in lg screen

  const { isReturned, isRejected, isCancelled, isAwaitingReReview, isAccepted } =
    statusFlags;

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      {isAwaitingReReview && (
        <div className="flex flex-col gap-4">
          <CustomAlert
            type="warning"
            showIcon
            className="border border-dashed! font-medium"
            title={`این درخواست در تاریخ ${dataPlaceHolder({ data: data.returnDate, customDateFormat: "YYYY/MM/DD", isDate: true })} عودت شده بود و در انتظار بررسی مجدد می‌باشد.`}
          />
          <CustomAlert
            type="warning"
            showIcon
            className="border border-dashed! font-medium"
            title={data.returnReasonTitle}
            description={data.returnReasonDescription}
          />
        </div>
      )}

      {isReturned && (
        <div className="flex flex-col gap-4">
          <CustomAlert
            type="warning"
            showIcon
            className="border border-dashed! font-medium"
            title={`این درخواست در تاریخ ${dataPlaceHolder({ data: data.returnDate, customDateFormat: "YYYY/MM/DD", isDate: true })} عودت شده است.`}
          />
          <CustomAlert
            type="warning"
            showIcon
            title={data.returnReasonTitle}
            description={data.returnReasonDescription}
          />
        </div>
      )}

      {isRejected && (
        <div className="flex flex-col gap-4">
          <CustomAlert
            type="error"
            showIcon
            className="border border-dashed! font-medium"
            title={`این درخواست در تاریخ ${dataPlaceHolder({ data: data.rejectDate, customDateFormat: "YYYY/MM/DD", isDate: true })} رد شده است.`}
          />
          <CustomAlert
            type="error"
            showIcon
            title={data.rejectReasonTitle}
            description={data.rejectReasonDescription}
          />
        </div>
      )}

      {isCancelled && (
        <CustomAlert
          type="warning"
          showIcon
          className="border border-dashed! font-medium"
          title={`این درخواست در تاریخ ${dataPlaceHolder({ data: data.cancelledAt, customDateFormat: "YYYY/MM/DD", isDate: true })} توسط "${dataPlaceHolder({ data: data.cancelledBy })}" لغو شده است.`}
        />
      )}
      {isAllVariant && isAccepted && (
        <CustomAlert
          type="success"
          showIcon
          className="bg-green-1! border border-dashed! font-medium"
          title={
            <div className="flex justify-between">
              <span>{`این درخواست در تاریخ  ${dataPlaceHolder({ data: data.acceptedDate, customDateFormat: "YYYY/MM/DD", isDate: true })} تایید شده است.`}</span>
              <Link className="text-primary-6!" to="">
                مشاهده برنامه پذیرش
              </Link>
            </div>
          }
        />
      )}

      <div className="flex flex-col gap-4">
        <CustomDivider
          text="اطلاعات درخواست"
          extraContent={
            <div className="flex gap-2">
              <CustomTag icon={<PiPlus />} color="green">
                {data.requestTypeLabel}
              </CustomTag>
              <CustomTag color={currentStatus.color}>{currentStatus.title}</CustomTag>
            </div>
          }
        />

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره درخواست"
            value={data.requestNumber}
            lg={fieldColLg}
            md={12}
          />
          <SingleVerticalWithCol
            label="تاریخ ایجاد درخواست"
            value={data.createdAt ?? undefined}
            lg={fieldColLg}
            md={12}
            isDate
            customDateFormat="HH:mm، YYYY/MM/DD"
          />
          {isAllVariant && (
            <SingleVerticalWithCol
              label="مسئول پیگیری (آخرین اقدام کننده)"
              value={data.followUpOfficer ?? undefined}
              lg={fieldColLg}
              md={12}
            />
          )}
          <SingleVerticalWithCol
            label="آخرین اقدام"
            value={data.lastAction ?? undefined}
            lg={fieldColLg}
            md={12}
            isDate
            customDateFormat="YYYY/MM/DD HH:mm"
          />
        </Row>
      </div>
    </div>
  );
};

export default AdmissionDetailRequestInfo;
