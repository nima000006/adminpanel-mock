import { memo, useMemo } from "react";

import { Layout, Breadcrumb } from "antd";
import { shallowEqual, useSelector } from "react-redux";
import { Outlet, useMatches } from "react-router";

import { WHITE } from "@infra/VARS/globalColors/globalColors";

import SideBar from "../../components/Layout/SideBar/SideBar";
import TopBar from "../../components/Layout/TopBar/TopBar";
import { useSidebarState } from "../hooks/useSidebarState";
import { selectGeneral } from "../states/redux/store";

import "./_layout.scss";

type RouteHandle = {
  isBgContentCustom?: boolean;
};

const { Content } = Layout;

const LAYOUT_STYLE = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
} as const;
const INNER_LAYOUT_STYLE = { flex: 1, overflow: "hidden" } as const;

export const PrivateLayout = memo(() => {
  const { collapsed, toggleSidebar } = useSidebarState();
  const isBgContentCustom =
    (useMatches().at(-1)?.handle as RouteHandle | undefined)?.isBgContentCustom ?? false;

  const { title = "پنل", breadcrumbItems } = useSelector(selectGeneral, shallowEqual);

  const contentLayoutStyle = useMemo(
    () => ({
      display: "flex",
      flexDirection: "column" as const,
      // overflow: "hidden",
    }),
    []
  );

  // Dynamic background style using CSS variables instead of hardcoded hex
  const contentStyle = useMemo(
    () => ({
      // If custom bg is requested, we use layout bg (grayish), else container bg (white/dark-gray)
      // STRICTLY adhere to variables that are confirmed to switch
      backgroundColor: isBgContentCustom
        ? "var(--app-bg-layout)"
        : "var(--app-bg-container)",
    }),
    [isBgContentCustom]
  );

  const wrapperBoxClass = useMemo(
    () =>
      isBgContentCustom ? "custom-page-content-container" : "page-content-container",
    [isBgContentCustom]
  );

  return (
    <Layout style={LAYOUT_STYLE}>
      <TopBar colorBgContainer={WHITE} />

      <Layout hasSider style={INNER_LAYOUT_STYLE}>
        <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Layout style={contentLayoutStyle}>
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <div className="page-title-container px-5! py-6!">
              {breadcrumbItems ? <Breadcrumb items={breadcrumbItems} /> : title}
            </div>
            <div className={wrapperBoxClass} style={contentStyle}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
});
PrivateLayout.displayName = "PrivateLayout";

export default PrivateLayout;
