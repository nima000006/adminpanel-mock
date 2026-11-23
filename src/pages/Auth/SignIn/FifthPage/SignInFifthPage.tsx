import { useState } from "react";

import { Grid, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { PiArrowsClockwise, PiSignInLight } from "react-icons/pi";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import TopBar from "@components/Layout/TopBar/TopBar";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import { SIGN_IN_FIRST_PAGE_ROUTE } from "@infra/router/routes/public";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import { removeFromStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  useAuthReEstelamSajedMutation,
  useLazySignInGetLoginStaffQuery,
} from "@infra/states/redux/Apis/auth/signInApis";
import { useLazyShortcutListQuery } from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";
import RequestRoleDrawerContent from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/RequestRoleDrawerContent";

import RolePlayingPosition from "./helper/components/RolePlayingPosition/RolePlayingPosition";
import WelcomeBanner from "../../../../assets/images/welcome-banner.webp";

import "./_signInFifthPage.scss";

export const ROLE_STATUS = {
  hasRole: 1,
  noRole: 3,
  inactiveRole: 2,
};

const SignInFifthPage = () => {
  const { login } = useAuth();
  const [view, setView] = useState("0");
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [isRequestRoleDrawerOpen, setIsRequestRoleDrawerOpen] = useState(false);
  const [isReEstelamSajedApiCall, setIsReEstelamSajedApiCall] = useState(false);

  useRedirectIfStepInvalid(5, SIGN_IN_FIRST_PAGE_ROUTE);

  const ESTELAM_SAJED_SUCCESS_MSG = "درخواست استعلام مجدد با موفقیت ثبت شد.";

  //? ================================  Api Calls ================================
  const [loginStaff, { isFetching: isLoginStaffLoading }] =
    useLazySignInGetLoginStaffQuery();

  // re estelam sajed
  const [reEstelamSajed, { isLoading: isReEstelamSajedLoading }] =
    useAuthReEstelamSajedMutation();

  const [getShortcuts] = useLazyShortcutListQuery();

  //* ================================ Util Functions ================================
  const segmentItems = [
    {
      id: "0",
      children: (
        <RolePlayingPosition
          status={ROLE_STATUS.hasRole}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isReEstelamSajedApiCall={isReEstelamSajedApiCall}
          isReEstelamSajedLoading={isReEstelamSajedLoading}
          setIsReEstelamSajedApiCall={setIsReEstelamSajedApiCall}
        />
      ),
    },
    {
      id: "1",
      children: (
        <RolePlayingPosition
          status={ROLE_STATUS.noRole}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isReEstelamSajedApiCall={isReEstelamSajedApiCall}
          isReEstelamSajedLoading={isReEstelamSajedLoading}
          setIsReEstelamSajedApiCall={setIsReEstelamSajedApiCall}
        />
      ),
    },
    {
      id: "2",
      children: (
        <RolePlayingPosition
          status={ROLE_STATUS.inactiveRole}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isReEstelamSajedApiCall={isReEstelamSajedApiCall}
          isReEstelamSajedLoading={isReEstelamSajedLoading}
          setIsReEstelamSajedApiCall={setIsReEstelamSajedApiCall}
        />
      ),
    },
  ];
  // onSubmitRole
  const onSubmitRole = async () => {
    if (!activeItem) {
      return toast.info("لطفا یک نقش را انتخاب فرمایید");
    }
    const loginRes = await loginStaff({ staffId: activeItem?.toString() }).unwrap();
    // remove menu items
    removeFromStorage("MI");

    login({
      token: loginRes?.access_token,
      refreshToken: loginRes?.refresh_token,
      needNavigate: true,
    });
    getShortcuts();
  };

  // handler drawer
  const closeRequestRoleDrawer = () => {
    setIsRequestRoleDrawerOpen(false);
  };

  const requestRoleHandler = () => {
    setIsRequestRoleDrawerOpen(true);
  };

  const estelamSajedHandler = () => {
    reEstelamSajed()
      .unwrap()
      .then(() => {
        toast.success(ESTELAM_SAJED_SUCCESS_MSG, {
          toastId: ESTELAM_SAJED_SUCCESS_MSG,
        });
        setActiveItem(0);
        setIsReEstelamSajedApiCall(true);
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isRequestRoleDrawerOpen && (
        <CustomDrawer
          content={
            <RequestRoleDrawerContent closeDrawerHandler={closeRequestRoleDrawer} />
          }
          onClose={() => setIsRequestRoleDrawerOpen(false)}
          open={isRequestRoleDrawerOpen}
        />
      )}

      <Layout style={{ minHeight: "100vh" }}>
        <TopBar colorBgContainer="var(--app-bg-container)" />

        <Content style={{ padding: "24px", height: "100%" }}>
          <div className="signin-auth-fifth-page-container">
            <section className="img-alert-segment-container">
              <div className="img-container">
                <img src={WelcomeBanner} alt="بنر خوش آمدگویی" className="banner-img" />
                <h1 className="banner-title">به پنل مدیریت دانشجویار خوش آمدید!</h1>
              </div>
              <CustomAlert
                title="راهنما"
                showIcon
                description={
                  <ul>
                    <li className="alert-items">
                      لطفاً برای ادامه استفاده از پنل مدیریت یکی از سمت‌های دارای نقش خود
                      را برای ورود به پنل انتخاب نمایید.
                    </li>
                    <li className="alert-items">
                      در صورتی که سمتی دارای نقش فعال ندارید با ثبت درخواست نقش خود مواردی
                      را که نیاز به دسترسی دارید توضیح دهید و کارشناسان ما در اسرع وقت به
                      درخواست شما رسیدگی خواهند نمود.
                    </li>
                    <li className="alert-items">
                      نقش : منظور از نقش سطح دسترسی های شما به سرویس های مختلف در پنل
                      مدیریت دانشجویار می‌باشد.
                    </li>
                  </ul>
                }
              />
              <div>
                <CustomDivider
                  text="سمت‌های شما"
                  extraContent={
                    <div className="flex gap-2 max-[580px]:mb-4 max-[450px]:flex-col">
                      <CustomButton
                        type="default"
                        onClick={estelamSajedHandler}
                        loading={isReEstelamSajedLoading}
                      >
                        <PiArrowsClockwise /> استعلام مجدد ساجد
                      </CustomButton>
                      <CustomButton type="default" onClick={requestRoleHandler}>
                        درخواست سمت
                      </CustomButton>
                    </div>
                  }
                />
                <div>
                  <CustomSegmented
                    options={[
                      { value: "0", label: "سمت‌های دارای نقش" },
                      { value: "1", label: "سمت‌های فاقد نقش" },
                      { value: "2", label: "سمت‌های غیر فعال" },
                    ]}
                    className="segmented-container"
                    onChange={(value) => setView(value as "0" | "1" | "2")}
                    value={view}
                    vertical={screens.xs}
                  />
                  <div className="segment-items-container">
                    {segmentItems[+view]?.children}
                  </div>
                </div>
              </div>
            </section>
            <CustomButton
              icon={<PiSignInLight size={18} />}
              iconPlacement="end"
              className="sign-in-button"
              type="primary"
              disabled={!activeItem || view !== "0"}
              onClick={onSubmitRole}
              loading={isLoginStaffLoading}
            >
              ورود به پنل
            </CustomButton>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default SignInFifthPage;
