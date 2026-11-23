import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetCentralBranchBusinessRequestInformationDetailsQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import "./BusinessRequestsDetailBranchInfo.scss";
import Div from "@components/Renderers/Div/Div";

const BusinessRequestsDetailBranchInfo = () => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const {
    params: { businessTempHistoryId },
  } = useQueryParams();
  //? ================================ Api ================================
  const {
    data: GetBusinessRequestBranchInformationDetails,
    isLoading: IsGetBusinessRequestBranchInformationDetailsLoading,
  } = useGetCentralBranchBusinessRequestInformationDetailsQuery({
    businessTempHistoryId: +businessTempHistoryId,
  });

  //? ================================ Effect ================================
  useEffect(() => {
    if (
      GetBusinessRequestBranchInformationDetails?.latitude &&
      GetBusinessRequestBranchInformationDetails?.longitude
    ) {
      setLat(GetBusinessRequestBranchInformationDetails.latitude);
      setLng(GetBusinessRequestBranchInformationDetails.longitude);
    }
  }, [GetBusinessRequestBranchInformationDetails]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div
      loading={IsGetBusinessRequestBranchInformationDetailsLoading}
      className="business-requests-detail-branch-info-container"
    >
      <CustomAlert
        showIcon
        message={
          "لطفاً تمامی اطلاعات را به صورت کامل مطالعه نموده و از صحت اطلاعات تکمیل شده اطمینان حاصل فرمایید."
        }
        type={"info"}
        className="custom-alert"
      />
      <CustomDivider className="custom-divider" text={"اطلاعات شعبه مرکزی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label={"عنوان شعبه"}
          value={GetBusinessRequestBranchInformationDetails?.branchTitle}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"نوع شعبه"}
          value={GetBusinessRequestBranchInformationDetails?.branchType}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"کد شعبه"}
          value={GetBusinessRequestBranchInformationDetails?.branchCode}
          lg={6}
          md={12}
        />
      </Row>
      <CustomDivider className="custom-divider" text={"اطلاعات تماس"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label={"شماره همراه"}
          value={GetBusinessRequestBranchInformationDetails?.branchMobileNumber}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"ایمیل"}
          value={GetBusinessRequestBranchInformationDetails?.branchEmail}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"شماره تلفن"}
          value={GetBusinessRequestBranchInformationDetails?.branchPhoneNumber}
          lg={6}
          md={12}
        />
      </Row>
      <CustomDivider className="custom-divider" text={"موقعیت مکانی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label={"استان"}
          value={GetBusinessRequestBranchInformationDetails?.province}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"شهر"}
          value={GetBusinessRequestBranchInformationDetails?.city}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label={"کد پستی"}
          value={GetBusinessRequestBranchInformationDetails?.branchZipCode}
          lg={6}
          md={12}
        />
      </Row>
      <Row className="custom-desc" gutter={[16, 16]}>
        <SingleVerticalWithCol
          label={"آدرس"}
          value={GetBusinessRequestBranchInformationDetails?.branchAddress}
          lg={24}
          md={24}
        />
      </Row>
      <div className="custom-divider">
        <label>
          موقعیت جغرافیایی <b>*</b>
        </label>
        <CustomMap
          className="custom-map"
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
        />
      </div>

      <CustomDivider className="custom-divider" text={"سایر توضیحات"} />
      <Row className="custom-desc" gutter={[16, 16]}>
        <SingleVerticalWithCol
          label={"توضیحات"}
          value={GetBusinessRequestBranchInformationDetails?.branchDescription}
          xl={24}
          lg={24}
          md={24}
        />
      </Row>
    </Div>
  );
};
export default BusinessRequestsDetailBranchInfo;
