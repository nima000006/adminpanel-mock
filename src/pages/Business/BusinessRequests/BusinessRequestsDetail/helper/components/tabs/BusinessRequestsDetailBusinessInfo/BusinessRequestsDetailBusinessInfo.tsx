import { Row } from "antd";
import { GrAttachment } from "react-icons/gr";
import { PiBuildings, PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetBusinessRequestInformationDetailsQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";

import "./_businessRequestsDetailBusinessInfo.scss";

const BusinessRequestsDetailBusinessInfo = () => {
  const {
    params: { businessTempHistoryId },
  } = useQueryParams();
  //? ================================ Api ================================
  const {
    data: GetBusinessRequestInformationDetails,
    isLoading: IsGetBusinessRequestInformationDetailsLoading,
  } = useGetBusinessRequestInformationDetailsQuery({
    businessTempHistoryId: Number(businessTempHistoryId),
  });
  // ================================ Util functions ================================
  const fileKeys = Object.keys(GetBusinessRequestInformationDetails?.filesUrl || {});
  const firstFileUrl = GetBusinessRequestInformationDetails?.filesUrl?.[fileKeys[0]];
  const secondFileUrl = GetBusinessRequestInformationDetails?.filesUrl?.[fileKeys[1]];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={IsGetBusinessRequestInformationDetailsLoading}
      className="business-requests-detail-business-info-container"
    >
      <CustomAlert
        showIcon
        message={
          "لطفاً تمامی اطلاعات را به صورت کامل مطالعه نموده و از صحت اطلاعات تکمیل شده اطمینان حاصل فرمایید."
        }
        type={"info"}
        className="custom-alert"
      />
      <div className="custom-label-value-container">
        <span>نوع شخصیت:</span>
        {GetBusinessRequestInformationDetails?.personalityTypeTitle === "حقیقی" && (
          <CustomTag
            className="custom-tag"
            icon={<PiUser />}
            color="warning"
            children={"حقیقی"}
          />
        )}
        {GetBusinessRequestInformationDetails?.personalityTypeTitle === "حقوقی" && (
          <CustomTag
            className="custom-tag"
            icon={<PiBuildings />}
            color="processing"
            children={"حقوقی"}
          />
        )}
      </div>
      <CustomDivider className="custom-divider" text={"اطلاعات کسب و کار"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={"نام کسب و کار"}
          value={GetBusinessRequestInformationDetails?.businessTitle}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={"نوع گروه شخصیت حقوقی"}
          value={GetBusinessRequestInformationDetails?.legalPersonalityGroupTypeId}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={"شناسه ثبت"}
          value={GetBusinessRequestInformationDetails?.businessTempId?.toString()}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={"شناسه ملی"}
          value={GetBusinessRequestInformationDetails?.nationalCodeLegal}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={"شماره اقتصادی"}
          value={GetBusinessRequestInformationDetails?.economicNumberLegal}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={"کد رهگیری پرونده مالیاتی"}
          value={GetBusinessRequestInformationDetails?.taxTrackingNumberNatural}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={"نوع مالیات"}
          value={GetBusinessRequestInformationDetails?.taxType}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={"نام تجاری"}
          value={GetBusinessRequestInformationDetails?.tradeTitle}
        />
      </Row>
      {GetBusinessRequestInformationDetails?.personalityTypeTitle === "حقیقی" && (
        <>
          <CustomDivider className="custom-divider" text="اطلاعات شخصی" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label={"نام"}
              value={GetBusinessRequestInformationDetails?.personalInformation?.firstname}
            />
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label={"نام خانوادگی"}
              value={GetBusinessRequestInformationDetails?.personalInformation?.lastname}
            />
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label={"تاریخ تولد"}
              value={GetBusinessRequestInformationDetails?.personalInformation?.birthDate}
            />
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label={"کد ملی"}
              value={
                GetBusinessRequestInformationDetails?.personalInformation?.nationalCode
              }
            />
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label={"ملیت"}
              value={
                GetBusinessRequestInformationDetails?.personalInformation?.nationality
              }
            />
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label={"جنسیت"}
              value={GetBusinessRequestInformationDetails?.personalInformation?.gender}
            />
          </Row>
          <CustomDivider className="custom-divider" text="اطلاعات تماس" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label={"شماره همراه"}
              value={
                GetBusinessRequestInformationDetails?.personalInformation?.phoneNumber
              }
            />
          </Row>
        </>
      )}
      <CustomDivider
        className="custom-divider"
        text="سایر توضیحات و مستندات روزنامه رسمی"
      />
      <Row gutter={[8, 8]}>
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={""}
          value={fileKeys[0] || "-"}
          suffix={
            firstFileUrl ? (
              <Link to={firstFileUrl} target="_blank" rel="noopener noreferrer">
                <span className="custom-suffix">دانلود</span>
              </Link>
            ) : (
              "-"
            )
          }
          prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
          className="custom-statistic"
        />

        <SingleVerticalWithCol
          lg={6}
          md={12}
          label={""}
          value={fileKeys[1] || "-"}
          suffix={
            secondFileUrl ? (
              <Link to={secondFileUrl} target="_blank" rel="noopener noreferrer">
                <span className="custom-suffix">دانلود</span>
              </Link>
            ) : (
              "-"
            )
          }
          prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
          className="custom-statistic"
        />
      </Row>

      <Row className="custom-desc">
        <SingleVerticalWithCol xl={24} lg={24} md={24} label={"توضیحات"} value="" />
      </Row>
    </Div>
  );
};
export default BusinessRequestsDetailBusinessInfo;
