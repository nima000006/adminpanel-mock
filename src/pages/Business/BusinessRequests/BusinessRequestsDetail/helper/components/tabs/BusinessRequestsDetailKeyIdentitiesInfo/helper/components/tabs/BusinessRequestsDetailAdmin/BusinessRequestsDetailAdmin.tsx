import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetBusinessRequestAdminInformationDetailsQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";

import sampleUserImg from "../../../../../../../../../../../../assets/images/selfDefaultAvatar.webp";
import "./_businessRequestsDetailAdmin.scss";

const BusinessRequestsDetailAdmin = () => {
  const {
    params: { businessTempHistoryId },
  } = useQueryParams();
  //? ================================ Api ================================
  const { data, isLoading } = useGetBusinessRequestAdminInformationDetailsQuery({
    businessTempHistoryId: businessTempHistoryId!,
  });
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div loading={isLoading} className="business-requests-details-admin">
      <CustomDivider className="custom-divider" text={"عکس پرسنلی"} />
      <div className="img-container">
        <img src={data?.personalPhoto || sampleUserImg} alt="user" />
      </div>
      <CustomDivider className="custom-divider" text={"اطلاعات پرسنلی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نام" value={data?.firstName} lg={6} md={12} />
        <SingleVerticalWithCol
          label="نام خانوادگی"
          value={data?.lastName}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol label="جنسیت" value={data?.gender} lg={6} md={12} />
        <SingleVerticalWithCol label="نام پدر" value={data?.fatherName} lg={6} md={12} />
        <SingleVerticalWithCol
          label="تاریخ تولد"
          value={data?.birthDate}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label="ملیت"
          value={String(data?.nationality)}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label="کد ملی / کد فراگیر"
          value={data?.nationalCode}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label="کد پرسنلی"
          value={data?.personalityCode}
          lg={6}
          md={12}
        />
      </Row>
      <CustomDivider className="custom-divider" text={"اطلاعات تحصیلی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="مقطع تحصیلی" value={data?.degree} lg={6} md={12} />
        <SingleVerticalWithCol
          label="رشته تحصیلی"
          value={data?.studyField}
          lg={6}
          md={12}
        />
      </Row>
      <CustomDivider className="custom-divider" text={"اطلاعات تماس"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="شماره همراه"
          value={data?.mobileNumber}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol label="ایمیل" value={data?.email} lg={6} md={12} />
        <SingleVerticalWithCol
          label="شماره تلفن محل فعالیت"
          value={data?.phoneNumber}
          lg={6}
          md={12}
        />
      </Row>
      <CustomDivider className="custom-divider" text={"موقعیت مکانی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="استان" value={data?.province} lg={6} md={12} />
        <SingleVerticalWithCol label="شهر" value={data?.city} lg={6} md={12} />
        <SingleVerticalWithCol label="کد پستی" value={data?.zipCode} lg={6} md={12} />
        <SingleVerticalWithCol
          label="آدرس"
          value={data?.address}
          xl={24}
          lg={24}
          md={24}
        />
      </Row>
      <CustomDivider className="custom-divider" text={"دوره فعالیت"} />
      <Row className="custom-statistic-container">
        <SingleVerticalWithCol
          className="custom-statistic"
          label="شروع از"
          value={data?.activityStartDate}
          suffix={<span className="custom-suffix">_</span>}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          className="custom-statistic"
          label="پایان در"
          value={data?.activityEndDate}
          lg={6}
          md={12}
        />
      </Row>
    </Div>
  );
};
export default BusinessRequestsDetailAdmin;
