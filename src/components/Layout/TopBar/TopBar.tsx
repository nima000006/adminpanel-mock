import { memo, useCallback } from "react";

import { Layout, Dropdown, Space, MenuProps } from "antd";
import moment from "jalali-moment";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiGear, PiSignIn, PiUser, PiUserSwitch, PiWalletLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import CustomClock from "@components/Renderers/CustomClock/CustomClock";
import Div from "@components/Renderers/Div/Div";
import ThemeToggle from "@components/ThemeToggle/ThemeToggle";
import { TOP_BAR_PROFILE_PAGE_ROUTE } from "@infra/router/routes/topBarItem";
import { WALLET_MY_WALLET_DETAILS_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import { FONTSIZE_10 } from "@infra/VARS/globalStyles/globalStyles";

import UniLogo from "../../../assets/icons/UniLogo";
import { MenuInfo } from "../../../infrastructure/models/modules/GeneralTypes/GeneralTypes";
import { LANDING_PAGE_ROUTE } from "../../../infrastructure/router/routes/general";
import { SIGN_IN_FIFTH_PAGE_ROUTE } from "../../../infrastructure/router/routes/public";
import { logoutUser } from "../../../infrastructure/states/redux/Slices/AuthSlice";
import "./_topBar.scss";

type TopBarProps = {
  colorBgContainer?: string;
};

const getRandomColor = () => {
  const colors = [
    "#FF8A65",
    "#9575CD",
    "#4DB6AC",
    "#FFD54F",
    "#7986CB",
    "#BA68C8",
    "#4FC3F7",
    "#81C784",
    "#E57373",
    "#A1887F",
    "#F06292",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const TopBar = memo(({ colorBgContainer }: TopBarProps) => {
  const { Header } = Layout;
  const { user, isFetchingUser, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fullName = (user?.firstName ?? "ثبت نشده") + " " + (user?.lastName ?? "");

  const initial = (user?.firstName || "؟").charAt(0);
  const bgColor = getRandomColor();
  const hasToken = !getToken();
  const items: MenuProps["items"] = [
    {
      label: "پروفایل",
      key: "profile",
      icon: <PiUser size={16} />,
      disabled: hasToken,
    },
    {
      label: "تنظیمات",
      key: "settings",
      icon: <PiGear size={16} />,
      disabled: true,
    },
    {
      label: "تغییر نقش",
      key: "switchRole",
      icon: <PiUserSwitch size={16} />,
      disabled: hasToken,
    },
    {
      label: "کیف پول",
      key: "wallet",
      icon: <PiWalletLight size={16} />,
      // disabled: hasToken,
      disabled: true,
    },
    {
      label: <span className="logout-item">خروج</span>,
      key: "logout",
      icon: <PiSignIn size={16} color="red" />,
    },
  ];

  const onClickProfileHandler = useCallback(
    (e: MenuInfo) => {
      switch (e.key) {
        case "profile":
          navigate(TOP_BAR_PROFILE_PAGE_ROUTE);
          break;
        case "settings":
          navigate("/settings");
          break;
        case "switchRole":
          navigate(SIGN_IN_FIFTH_PAGE_ROUTE);
          break;
        case "wallet":
          navigate(WALLET_MY_WALLET_DETAILS_PAGE_ROUTE);
          break;
        case "logout":
          dispatch(logoutUser());
          logout();
          // old version
          // localStorage.clear();
          // toast.warn(SUCCESS_EXITING_MESSAGE, {
          //   toastId: SUCCESS_EXITING_MESSAGE,
          // });
          // navigate(LOGIN_PAGE_ROUTE);
          break;
        default:
          break;
      }
    },
    [dispatch, navigate, logout]
  );

  //!
  const onClickUniLogoHandler = useCallback(() => {
    navigate(LANDING_PAGE_ROUTE);
  }, [navigate]);

  return (
    <Header
      className="top-bar-container"
      style={{
        padding: 0,
        backgroundColor: colorBgContainer || "var(--app-bg-container)",
        color: "var(--app-text)",
      }}
    >
      <div className="uni-collapse-and-logo-container">
        <div className="uni-logo-container" onClick={onClickUniLogoHandler}>
          <UniLogo />
        </div>
      </div>

      <div className="dashboard-container">
        <div className="date-and-time-container">
          <div className="d-flex">
            <AiOutlineCalendar className="top-bar-icon" />
          </div>
          <div className="calendar-label">
            <CustomClock />
            <span>-</span>
            <div className="calendar-value">
              {moment().locale("fa").format("D / M / YYYY")}
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="theme-toggle-container flex items-center">
          <ThemeToggle />
        </div>

        {/* //todo [saman]: notification icon commented out as PO said it doesn't have backend or any logic for it  */}
        {/* <div className="notifications-container">
          <div className="d-flex">
            <NotificationOutlined className="top-bar-icon" />
          </div>
          <div className="notification-label">اعلان</div>
        </div> */}
        <Div className="user-status-container" loading={isFetchingUser}>
          <Dropdown
            menu={{ items, onClick: onClickProfileHandler }}
            trigger={["click"]}
            className="d-flex"
            openClassName="user-profile-drop-down"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <div className="profile-name-container">
                  <div
                    className="user-initial-avatar"
                    style={{
                      backgroundColor: bgColor,
                    }}
                  >
                    <span className="initial">{initial}</span>
                  </div>
                  <div className="name-label">{fullName}</div>
                  <div className="">
                    <IoIosArrowDown style={{ fontSize: FONTSIZE_10 }} />
                  </div>
                </div>
              </Space>
            </a>
          </Dropdown>
        </Div>
      </div>
    </Header>
  );
});
TopBar.displayName = "TopBar";

export default TopBar;
