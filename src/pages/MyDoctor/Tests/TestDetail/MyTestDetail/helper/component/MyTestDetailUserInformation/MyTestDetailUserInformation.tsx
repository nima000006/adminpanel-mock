import { useEffect } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyDoctorTestUserInfoDetailManagerQuery } from "@infra/states/redux/Apis/myDoctor/test/testApis";
import "./_myTestDetailUserInformation.scss";

const MyTestDetailUserInformation = () => {
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getUserInfo, { data: userInfoData, isFetching: isUSerInfoDataLoading }] =
    useLazyGetMyDoctorTestUserInfoDetailManagerQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getUserInfo(id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div
      className="test-detail-all-user-information-container"
      loading={isUSerInfoDataLoading}
    >
      <div className="info-section">
        <CustomDivider text="اطلاعات هویتی" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="نام" value={userInfoData?.firstName} />
          <SingleVerticalWithCol label="نام خانوادگی" value={userInfoData?.lastName} />
          <SingleVerticalWithCol label="جنسیت" value={userInfoData?.gender} />
          <SingleVerticalWithCol label="کد ملی" value={userInfoData?.nationalCode} />
          <SingleVerticalWithCol label="سن" value={userInfoData?.age} />
        </Row>
      </div>
      <div className="info-section">
        <CustomDivider text="اطلاعات تحصیلی" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره دانشجویی"
            value={userInfoData?.studentNumber}
          />
          <SingleVerticalWithCol label="واحد" value={userInfoData?.branchName} />
          <SingleVerticalWithCol label="مقطع تحصیلی" value={userInfoData?.levelName} />
          <SingleVerticalWithCol label="رشته" value={userInfoData?.fieldName} />
          <SingleVerticalWithCol label="سال ورود" value={userInfoData?.enTerm} />
        </Row>
      </div>
      <div className="info-section">
        <CustomDivider text="سایر اطلاعات مفید" />
        <Row gutter={[16, 16]}>
          {userInfoData?.ghqbfDataDtos?.map((item) => (
            <SingleVerticalWithCol
              label={item?.questionText}
              value={item?.answerText}
              key={item?.answerId}
              md={12}
              lg={12}
              xl={12}
            />
          ))}
        </Row>
      </div>
      <div className="info-section">
        <CustomDivider text="اطلاعات تماس" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="شماره تماس" value={userInfoData?.mobile} />
        </Row>
      </div>
    </Div>
  );
};

export default MyTestDetailUserInformation;
