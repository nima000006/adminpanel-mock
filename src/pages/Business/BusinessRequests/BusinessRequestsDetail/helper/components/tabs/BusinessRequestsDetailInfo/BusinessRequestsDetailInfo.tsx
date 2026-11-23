import { Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import "./_businessRequestsDetailInfos.scss";
import { useGetGeneralBusinessRequestSpecificationDetailsQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import Div from "@components/Renderers/Div/Div";
const BusinessRequestsDetailInfo = () => {
  const {
    params: { businessTempHistoryId, applicantName },
  } = useQueryParams();

  //? ================================ Api ================================
  const { data, isLoading } = useGetGeneralBusinessRequestSpecificationDetailsQuery({
    businessTempHistoryId: +businessTempHistoryId!,
  });
  //? ================================ components ================================

  const alertMap: Record<
    string,
    { message: string; type: "info" | "success" | "error" | "warning" }[]
  > = {
    "در انتظار بررسی": [
      {
        message:
          "این درخواست در انتظار بررسی، ایجاد واحدهای تاپ چارت و تکمیل اطلاعات پایه توسط شماست!",
        type: "info",
      },
    ],
    "تأیید شده": [
      {
        message: "این درخواست تایید شده است!",
        type: "success",
      },
    ],
    "رد شده": [
      {
        message: "این درخواست رد شده است!",
        type: "error",
      },
    ],
    "عودت شده": [
      {
        message: "این درخواست عودت داده شده است!",
        type: "warning",
      },
    ],
    "در انتظار بررسی مجدد": [
      {
        message: "این درخواست عودت داده شده است!",
        type: "warning",
      },
      {
        message: "درخواست عودت داده شده اصلاح شده و نیازمند بررسی مجدد می‌باشد.",
        type: "info",
      },
    ],
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isLoading} className="business-requests-detail-info-container">
      {alertMap[data?.statusTitle || 0]?.map((alert, index) => (
        <CustomAlert
          key={alert.message}
          showIcon
          message={alert.message}
          type={alert.type}
          className={`custom-alert${index > 0 ? "custom-alert-duplicate" : ""}`}
        />
      ))}
      <CustomDivider className="custom-divider" text={"مشخصات درخواست"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label={"درخواست"}
          value={data?.requestType}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"شماره درخواست"}
          value={data?.requestId.toString()}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"تاریخ ثبت درخواست"}
          value={data?.requetsLocalDate}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol label={"وضعیت"} value={data?.statusTitle} lg={6} md={12} />
        <SingleVerticalWithCol
          label={"درخواست دهنده"}
          value={applicantName}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"نام کسب و کار"}
          value={data?.businessTitle}
          lg={6}
          md={12}
        />
      </Row>
      {data?.statusTitle !== "در انتظار بررسی" && (
        <>
          <CustomDivider className="custom-divider" text={"مشخصات ادمین مسئول"} />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label={"نام و نام خانوادگی"}
              value={`${data?.firstName} ${data?.lastName}`}
              lg={6}
              md={12}
            />
            <SingleVerticalWithCol label={"تاریخ آخرین ویرایش"} value="" lg={6} md={12} />
          </Row>
        </>
      )}
      {data?.statusTitle === "در انتظار بررسی مجدد" && (
        <>
          <CustomDivider className="custom-divider" text={"علت عودت"} />
          <SingleVerticalWithCol label="توضیحات" value="" xl={24} lg={24} md={24} />
        </>
      )}
    </Div>
  );
};
export default BusinessRequestsDetailInfo;
