import { useCallback, useEffect, useState } from "react";

import { Row } from "antd";
import { PiArrowRight, PiFingerprint, PiUserPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import imagePlaceHolder from "@assets/images/selfDefaultAvatar.webp";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { removeFromStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useLazyRegisterStepSixthQuery } from "@infra/states/redux/Apis/auth/registerApis";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";

import { AuthRegistrationSixthStepResponse } from "../@types/@authRegisterTypes";
import "./_registerSixthPage.scss";

const RegisterSixthPage = () => {
  const [userData, setUserData] = useState<AuthRegistrationSixthStepResponse | null>(
    null
  );
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [registerSixthStep, { isLoading: isRegisterSixthStepLoading }] =
    useLazyRegisterStepSixthQuery();

  //* ================================ Util Functions ================================
  const handleRedirect = useCallback(() => {
    removeFromStorage("currentPage");
    navigate(SIGN_IN_FIRST_PAGE_ROUTE, { replace: true });
  }, [navigate]);

  const getUserData = useCallback(() => {
    registerSixthStep()
      .unwrap()
      .then((res) => {
        setUserData(res);
      })
      .catch((error) => {
        console.error("Failed to fetch sixth step data:", error);
        toast.error("خطا در بارگذاری اطلاعات. لطفا دوباره تلاش کنید.", {
          toastId: "sixth-step-error",
        });
        // Redirect to sign in if the step fails
        handleRedirect();
      });
  }, [registerSixthStep, handleRedirect]);

  const handleContinueClick = useCallback(() => {
    handleRedirect();
  }, [handleRedirect]);

  //? ================================ Effects ================================
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AuthLayout
      bannerLeftSide={
        <LeftSideBannerItem
          icon={PiFingerprint}
          linkLabel="ورود به حساب کاربری"
          to={SIGN_IN_FIRST_PAGE_ROUTE}
        />
      }
    >
      <Div
        className="register-auth-sixth-page-container"
        loading={isRegisterSixthStepLoading}
      >
        <div>
          <AuthTitle icon={PiUserPlus} label="ثبت نام" />
          <AuthStepper currentStep={6} itemCount={6} />
          <div className="avatar-container">
            <img
              src={userData?.mainImageMinioUrl || imagePlaceHolder}
              width={64}
              height={64}
              onError={(e) => {
                e.currentTarget.src = imagePlaceHolder;
              }}
              alt="عکس کاربر"
              loading="lazy"
            />
          </div>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="نام"
              value={userData?.firstName || "-"}
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="نام خانوادگی"
              value={userData?.lastName || "-"}
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="نام پدر"
              value={userData?.fatherName || "-"}
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="جنسیت"
              value={
                userData?.genderId === 1 ? "مرد" : userData?.genderId === 2 ? "زن" : "-"
              }
            />
          </Row>
        </div>
        <div className="auth-btn-container">
          <CustomButton htmlType="button" type="primary" onClick={handleContinueClick}>
            ثبت و ادامه
          </CustomButton>
          <CustomButton htmlType="submit" type="link">
            <Link className="auth-btn-container-a" to={REGISTER_FIRST_PAGE_ROUTE}>
              <PiArrowRight size={16} /> بازگشت
            </Link>
          </CustomButton>
        </div>
      </Div>
    </AuthLayout>
  );
};

export default RegisterSixthPage;
