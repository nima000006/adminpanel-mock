import { ReactNode } from "react";

import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, ConfigProviderProps, theme as antdTheme } from "antd";
import { ConfigContext, ThemeConfig } from "antd/es/config-provider";
import useConfig from "antd/es/config-provider/hooks/useConfig";
import { SizeType } from "antd/es/config-provider/SizeContext";
import fa_IR from "antd/es/locale/fa_IR";
import { GlobalConfigProps } from "antd/es/notification/interface";

import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import { useTheme } from "@infra/context/ThemeContext";

type Config = ConfigProviderProps & {
  ConfigContext?: typeof ConfigContext;
  SizeContext?: React.Context<SizeType>;
  config?: (props: GlobalConfigProps) => void;
  useConfig?: typeof useConfig;
};

const AntdConfigProviderWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Common tokens shared between light and dark modes
  const commonTokens = {
    // Border radius - synced with Tailwind
    borderRadiusSM: 4,
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusXS: 2,

    // Typography - using DanaFaNum font
    fontFamily:
      "'DanaFaNum', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,

    wireframe: false,

    // Common Colors
    colorPrimary: "#1890ff",
    colorInfo: "#1890ff",
    colorWarning: "#faad14",
    colorSuccess: "#389e0d",
  };

  // Light mode specific overrides (from original file)
  const lightTokens = {
    colorError: "#ff4d4f",
    colorTextBase: "rgba(0, 0, 0, 0.88)",
    colorText: "rgba(0, 0, 0, 0.88)",
    colorTextSecondary: "rgba(0, 0, 0, 0.65)",
    colorBgContainer: "#ffffff",
    colorBorder: "#d9d9d9",
  };

  const commonComponents = {
    Tag: {
      marginXS: 8,
    },
    Checkbox: {
      borderRadiusSM: 4,
    },
    Radio: {
      borderRadiusSM: 4,
    },
    Menu: {
      itemPaddingInline: 16,
      itemMarginBlock: 4,
      itemMarginInline: 8,
      itemBorderRadius: 8,
    },
  };

  // Restoring v6 fixes ONLY for light mode so we don't break dark mode
  const lightComponents = {
    Layout: {
      headerBg: "#ffffff",
      headerHeight: 64,
      headerPadding: "0 24px",
      bodyBg: "#f0f2f5",
      siderBg: "#ffffff",
      lightSiderBg: "#ffffff",
    },
    Button: {
      primaryColor: "#ffffff",
      colorPrimary: "#1890ff",
      colorPrimaryHover: "#40a9ff",
      colorPrimaryActive: "#096dd9",
      colorPrimaryText: "#ffffff",
      colorText: "rgba(0, 0, 0, 0.88)",
      colorTextLightSolid: "#ffffff",
      defaultColor: "rgba(0, 0, 0, 0.88)",
      defaultBg: "#ffffff",
      defaultBorderColor: "#d9d9d9",
      colorLink: "#1890ff",
      colorLinkHover: "#40a9ff",
      colorLinkActive: "#096dd9",
      primaryShadow: "none",
      defaultShadow: "none",
      dangerShadow: "none",
      boxShadow: "none",
      paddingBlock: 4,
      paddingBlockLG: 7,
      paddingBlockSM: 0,
      paddingInline: 15,
      paddingInlineLG: 15,
      paddingInlineSM: 7,
    },
    Menu: {
      ...commonComponents.Menu,
      itemBg: "#ffffff",
      itemSelectedBg: "#e6f4ff",
      itemSelectedColor: "#1890ff",
      subMenuItemBg: "#ffffff",
    },
    Input: {
      colorText: "rgba(0, 0, 0, 0.88)",
      colorTextPlaceholder: "rgba(0, 0, 0, 0.45)",
      colorBgContainer: "#ffffff",
      colorBorder: "#d9d9d9",
      colorFillAlter: "#ffffff", // affix wrapper background
      colorBgContainerDisabled: "rgba(0, 0, 0, 0.04)",
      paddingBlock: 4,
      paddingBlockLG: 7,
      paddingBlockSM: 0,
      paddingInline: 11,
      paddingInlineLG: 11,
      paddingInlineSM: 7,
    },
    Select: {
      colorText: "rgba(0, 0, 0, 0.88)",
      colorTextPlaceholder: "rgba(0, 0, 0, 0.45)",
      colorBgContainer: "#ffffff",
      colorBorder: "#d9d9d9",
    },
    DatePicker: {
      colorText: "rgba(0, 0, 0, 0.88)",
      colorTextPlaceholder: "rgba(0, 0, 0, 0.45)",
      colorBgContainer: "#ffffff",
      colorBorder: "#d9d9d9",
    },
    InputNumber: {
      colorText: "rgba(0, 0, 0, 0.88)",
      colorTextPlaceholder: "rgba(0, 0, 0, 0.45)",
      colorBgContainer: "#ffffff",
      colorBorder: "#d9d9d9",
    },
  };

  const darkComponents: ThemeConfig["components"] = {
    Alert: {
      colorWarningBg: "rgba(255, 169, 64, 0.1)",
      colorWarningBorder: "rgba(255, 169, 64, 0.4)", // correct token is colorWarning for border tint

      // Info variant
      colorInfoBg: "#188fff34",
      colorInfoBorder: "#188fff60",

      // Error variant
      colorErrorBg: "#ff4d5039",
      colorErrorBorder: "#ff4d5060",

      // Success variant
      colorSuccessBg: "#bae63734",
      colorSuccessBorder: "#bae63760",
    },
    Layout: {
      siderBg: "#1e1e1e", // matches --app-bg-container in dark
      headerBg: "#1e1e1e",
      bodyBg: "#121212", // matches --app-bg-layout in dark
    },
    Menu: {
      ...commonComponents.Menu,
      itemBg: "#1e1e1e", // --ant-menu-item-bg
      itemSelectedBg: "#111d2c", // dark equivalent of the light blue selected bg
      itemSelectedColor: "#177ddc",
      subMenuItemBg: "#1e1e1e", // submenu popups bg
    },
    Input: {
      colorFillAlter: "transparent",
      colorBgContainer: "transparent",
    },
    DatePicker: {
      colorFillAlter: "transparent",
      colorBgContainer: "transparent",
    },
    InputNumber: {
      colorFillAlter: "transparent",
      colorBgContainer: "transparent",
    },
    Select: {
      colorFillAlter: "transparent",
      colorBgContainer: "transparent",
    },
  };

  const config: Config = {
    locale: fa_IR,
    direction: "rtl",
    renderEmpty: () => <CustomEmpty />,
    theme: {
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        ...commonTokens,
        ...(isDark ? {} : lightTokens),
      },
      cssVar: {
        key: "app",
      },
      hashed: true,
      components: {
        ...commonComponents,
        ...(isDark ? darkComponents : lightComponents),
      },
    },
    virtual: true,
  };
  return (
    <StyleProvider layer hashPriority="high">
      <ConfigProvider {...config}>{children}</ConfigProvider>
    </StyleProvider>
  );
};

// theme={antdThemeConfig(currentTheme)}

export default AntdConfigProviderWrapper;
