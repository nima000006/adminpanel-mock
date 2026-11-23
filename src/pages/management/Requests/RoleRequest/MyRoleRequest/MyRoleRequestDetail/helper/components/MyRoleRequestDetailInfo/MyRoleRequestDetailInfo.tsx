import { Row } from "antd";
import moment from "jalali-moment";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  ROLE_REQUEST_CONFIRMED,
  ROLE_REQUEST_REJECTED,
  ROLE_REQUEST_WAITING_REVIEW,
} from "@pages/management/Requests/RoleRequest/_shared/utils/roleRequestUtil";

import { ManagementMyRoleRequestDetailEmployeeDto } from "../../../@types/@myRoleRequestDetail";
import "./_myRoleRequestDetailInfo.scss";

const MyRoleRequestDetailInfo = ({
  data,
  message,
  createdDate,
  modifiedDate,
  modifiedByName,
}: {
  data: ManagementMyRoleRequestDetailEmployeeDto | undefined;
  message: string | undefined;
  createdDate: string | undefined;
  modifiedDate: string | undefined;
  modifiedByName: string | undefined;
}) => {
  const { params: url } = useQueryParams();

  // ================================ Util Functions ================================
  const statusTagMap: Record<number, { color: string; label: string }> = {
    [ROLE_REQUEST_WAITING_REVIEW]: { color: "warning", label: "در انتظار بررسی" },
    [ROLE_REQUEST_CONFIRMED]: { color: "success", label: "تأیید شده" },
    [ROLE_REQUEST_REJECTED]: { color: "error", label: "رد شده" },
  };
  const status = Number(url.status);
  const tagInfo = statusTagMap[status];

  const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
    moment(createdDate ?? new Date()),
    "days"
  );

  const colorGenerator =
    +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="management-requests-my-role-request-detail-info-container">
      <div className="info-container">
        <div>
          <CustomDivider
            text="اطلاعات درخواست"
            extraContent={
              <div className="extra-content-class flex gap-2">
                {tagInfo && <CustomTag color={tagInfo.color}>{tagInfo.label}</CustomTag>}
                {status === ROLE_REQUEST_WAITING_REVIEW && (
                  <div className="ant-tag-container">
                    <CustomTag color={colorGenerator}>{diffTime} روز</CustomTag>
                  </div>
                )}
              </div>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="شماره درخواست" value={url?.id} />
            <SingleVerticalWithCol
              label="ثبت درخواست"
              value={data?.createdDateTime}
              isDate
              customDateFormat="HH:mm, YYYY/MM/DD"
            />
            <SingleVerticalWithCol label="آخرین اقدام" value={modifiedDate} isDate />
            <SingleVerticalWithCol label="آخرین اقدام کننده" value={modifiedByName} />
          </Row>
        </div>
        <div>
          <CustomDivider text="اطلاعات درخواست دهنده" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="نام" value={data?.userResponseDto?.firstName} />
            <SingleVerticalWithCol
              label="نام خانوادگی"
              value={data?.userResponseDto?.lastName}
            />
            <SingleVerticalWithCol
              label="کد ملی"
              value={data?.userResponseDto?.username}
            />
            <SingleVerticalWithCol label="کد پرسنلی" value={data?.employeeCode} />
            <SingleVerticalWithCol label="نام واحد سازمانی" value={data?.branchName} />
            <SingleVerticalWithCol label="عنوان سمت" value={data?.positionTitle} />
            <SingleVerticalWithCol
              label="شماره همراه"
              value={data?.userResponseDto?.mobileNumber}
            />
          </Row>
        </div>
      </div>
      <div className="request-text-container">
        <CustomDivider text="متن درخواست" />
        <div className="text-container">{message}</div>
      </div>
    </div>
  );
};

export default MyRoleRequestDetailInfo;
