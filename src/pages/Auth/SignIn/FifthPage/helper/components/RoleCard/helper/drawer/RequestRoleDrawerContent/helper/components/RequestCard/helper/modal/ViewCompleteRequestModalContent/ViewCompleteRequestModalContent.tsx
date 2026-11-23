import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  REQUEST_TYPE_STATUS,
  REQUEST_TYPE_STATUS_TEXT,
  REQUEST_TYPE_STATUS_COLOR,
} from "@pages/Auth/_shared/utils";

import { GetAdminRequestListItem } from "../../../../../../@types/@requestRoleDrawerContentType";

const ViewCompleteRequestModalContent = ({ item }: { item: GetAdminRequestListItem }) => {
  const statusColor = REQUEST_TYPE_STATUS_COLOR[item?.status];

  const alertType =
    statusColor === "gold"
      ? "warning"
      : statusColor === "green"
        ? "success"
        : statusColor === "red"
          ? "error"
          : "info";

  return (
    <div className="body-regular mt-5! flex flex-col gap-6">
      <div className="flex justify-between">
        <span className="h5-medium text-neutral-13">{item?.id}</span>
        <span>
          {dataPlaceHolder({
            data: item?.createdDate,
            isDate: true,
            customDateFormat: "HH:mm - YYYY/M/D",
          })}
        </span>
      </div>

      <CustomAlert
        showIcon
        title={REQUEST_TYPE_STATUS_TEXT[item?.status] || "نامشخص"}
        description={
          item?.status === REQUEST_TYPE_STATUS.REJECTED
            ? item?.description || item?.reason
            : item?.status === REQUEST_TYPE_STATUS.NEW
              ? "درخواست شما برای بررسی به کارشناسان دانشجویار ارسال شده. لطفاً کمی صبور باشید."
              : item?.status === REQUEST_TYPE_STATUS.ACCEPTED
                ? "درخواست شما توسط کارشناس مربوطه تایید شد."
                : "-"
        }
        type={alertType}
        className="custom-alert"
      />

      <CustomAlert
        showIcon
        title="متن درخواست شما"
        description={item?.message || "-"}
        type="info"
        className="custom-alert"
      />
    </div>
  );
};
export default ViewCompleteRequestModalContent;
