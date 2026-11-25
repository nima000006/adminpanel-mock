import { useEffect, memo, useState, useCallback, useMemo } from "react";

import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { MenuInfo } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  getFromLocalStorage,
  setLocalStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useLazyGetRolesMenuQuery } from "@infra/states/redux/Apis/authenticationApi";
import {
  useShortcutListQuery,
  useShortcutRewriteMutation,
} from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";

import { menuKeyToRouteMap } from "../../../infrastructure/helpers/routeConvertor";
import { isMockMode } from "../../../infrastructure/mock/mockMode";
import {
  MenuItemData,
  MenuItemDataTransformed,
} from "../../../infrastructure/states/redux/Apis/models/homeApi.model";
import { menuItemKeys } from "../../../infrastructure/states/redux/Apis/models/menuItems.model";
import { NO_SUCH_PAGE } from "../../../infrastructure/VARS/globalToasts/globalToasts";
import MainSpinner from "../../MainSpinner/MainSpinner";

import "./_sideBar.scss";

type SideBarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};
// interface SelectInfo extends MenuInfo {
//   selectedKeys: string[];
// }
const { Sider } = Layout;

const reverseObject = (obj: Record<string, string>) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[value] = key;
      return acc;
    },
    {} as Record<string, string>
  );
};
const renderIcon = (icon: string) => {
  return <img src={`/images/${icon}.svg`} alt={`${icon}-image`} width="32" height="32" />;
};

const truncateText = (text: string, maxLength = 14) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

//! TODO[SAMAN]: needed in future
// Function to find all key paths in the menu data
// const findAllPaths = (items: MenuItemData[], parentPath: string[] = []) => {
//   let paths: any = [];

//   items.forEach((item) => {
//     // Create the current path by appending the current item's key to the parent path
//     const currentPath = [...parentPath, item.key];

//     // Add the current path to the paths array
//     paths.push(currentPath);

//     // If the item has children, recursively find their paths
//     if (item.children) {
//       const childrenPaths = findAllPaths(item.children, currentPath);
//       paths = paths.concat(childrenPaths);
//     }
//   });

//   return paths;
// };

const AddShortcutMsg = "آیتم با موفقیت به لیست دسترسی سریع افزوده شد.";
const RemoveShortcutMsg = "آیتم با موفقیت از لیست دسترسی سریع حذف شد.";

const SideBar = memo(({ collapsed, toggleSidebar }: SideBarProps) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>();
  const [rawMenuItems, setRawMenuItems] = useState<MenuItemDataTransformed[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  //! UseGetMenuItems hook
  // const [getMenuItems, { isLoading: isMenuLoading }] = useGetMenuItemsMutation();
  const [getMenuItems, { isLoading: isMenuLoading }] = useLazyGetRolesMenuQuery();
  const [shortcutRewrite] = useShortcutRewriteMutation();
  const { data: pinnedItems, isFetching: isShortcutListLoading } = useShortcutListQuery();

  //
  const reversedRouteMap = useMemo(() => reverseObject(menuKeyToRouteMap), []);
  const pinnedRoutesSet = useMemo(() => {
    return new Set(
      (pinnedItems ?? [])
        .map((p) => p.menuItem)
        .filter(
          (route): route is string => typeof route === "string" && route.startsWith("/")
        )
    );
  }, [pinnedItems]);

  //
  const transformMenuItems = (
    items: MenuItemDataTransformed[] | undefined,
    pinnedRoutes: Set<string>
  ): MenuItemDataTransformed[] | [] => {
    if (!items) return [];

    return (
      items?.map((item) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const route = menuKeyToRouteMap[item.key as keyof typeof menuKeyToRouteMap];
        const isPinned = route ? pinnedRoutes.has(route) : false;
        const label =
          typeof item.label === "string"
            ? truncateText(item.label, item.label.length > 14 ? 12 : undefined)
            : item.label;
        const shortcutTitle = typeof item.label === "string" ? item.label : "";

        return {
          ...item,
          label:
            !hasChildren && route ? (
              <Link className="side-bar-menu-link" to={route}>
                {label}
              </Link>
            ) : (
              label
            ),
          ...(!hasChildren
            ? !item?.icon
              ? {
                  icon: isPinned ? (
                    <CustomTooltip title=" حذف از دسترسی سریع">
                      <PushpinFilled
                        onClick={(e) => {
                          e.stopPropagation();
                          shortcutRewrite({
                            key: route,
                            title: shortcutTitle,
                          })
                            .unwrap()
                            .then(() => {
                              toast.success(RemoveShortcutMsg, {
                                toastId: RemoveShortcutMsg,
                              });
                            });
                        }}
                      />
                    </CustomTooltip>
                  ) : (
                    <CustomTooltip title="افزودن به دسترسی سریع">
                      <PushpinOutlined
                        onClick={(e) => {
                          e.stopPropagation();
                          shortcutRewrite({
                            key: route,
                            title: shortcutTitle,
                          })
                            .unwrap()
                            .then(() => {
                              toast.success(AddShortcutMsg, {
                                toastId: AddShortcutMsg,
                              });
                            });
                        }}
                      />
                    </CustomTooltip>
                  ),
                }
              : { icon: item?.icon }
            : {}),

          ...(hasChildren && {
            children: transformMenuItems(item.children, pinnedRoutes),
          }),
        };
      }) || []
    );
  };

  const mainMenuItems = useMemo(() => {
    return transformMenuItems(rawMenuItems, pinnedRoutesSet);
  }, [rawMenuItems, pinnedRoutesSet]);

  const menuBuilder = async (cameFromLogin = false) => {
    const menuStorageInfo: string | null = getFromLocalStorage("MI");
    if (isMockMode() || !menuStorageInfo || menuStorageInfo === null || cameFromLogin) {
      return await getMenuItems().unwrap().then(onGetMenuItemsSuccess);
    }
    const menuStorageDecrypted: { info: MenuItemData[]; isFetched: boolean } =
      JSON.parse(menuStorageInfo);

    const transformedItems = menuStorageDecrypted?.info?.map((item) => ({
      ...item,
      label: truncateText(item.label, item?.label?.length > 14 ? 12 : undefined),
      icon: renderIcon(item?.icon),
    }));

    setRawMenuItems(transformedItems);
  };

  const setMenuIndicator = () => {
    // Initialize the selected keys based on current location
    const initialSelectedKey = reversedRouteMap?.[location?.pathname];
    if (initialSelectedKey) {
      setSelectedKeys([initialSelectedKey]);
      // Optionally, we can set the open keys based on our requirement
      // const allPaths: string[][] = findAllPaths(response?.data); // If needed, use a similar function to find paths
      // const chosenPath = allPaths?.find((path) => path.includes(initialSelectedKey));
      // if (chosenPath) {
      //   setOpenKeys(chosenPath);
      // }
    }
  };

  //!
  const onGetMenuItemsSuccess = useCallback(
    async (response: MenuItemData[]) => {
      // main transformation
      const transformedItems = response?.map((item) => ({
        ...item,
        label: truncateText(item.label, item.label.length > 14 ? 12 : undefined),
        icon: renderIcon(item?.icon),
      }));
      setRawMenuItems(transformedItems);

      // set items to state and localStorage
      setLocalStorage("MI", JSON.stringify({ info: response, isFetched: true }));

      // indicator
      setMenuIndicator();
    },
    [location?.pathname, reversedRouteMap]
  );

  useEffect(() => {
    menuBuilder();
  }, []);

  useEffect(() => {
    const currentKey = reversedRouteMap?.[location?.pathname];

    if (currentKey !== "default" && currentKey) {
      setSelectedKeys([currentKey]);
      // Optionally, we could set open keys here if needed
    } else {
      setSelectedKeys([]);
    }
  }, [location?.pathname, reversedRouteMap]);

  //! TODO[SAMAN]: old version of menu on click
  // const OnClickMenuItems = (meta: MenuInfo) => {
  //   const key: menuItemKeys = (meta?.key || "default") as menuItemKeys; // 'default' get used when the key is undefined
  //   const route = menuKeyToRouteMap[key];

  //   if (route) {
  //     console.log({ meta });
  //     navigate(route);
  //     scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   } else {
  //     import.meta.env.DEV ? toast.error(NO_SUCH_PAGE, { toastId: NO_SUCH_PAGE }) : "";
  //   }
  // };
  const OnClickMenuItems = (meta: MenuInfo) => {
    const key: menuItemKeys = (meta?.key || "default") as menuItemKeys; // 'default' get used when the key is undefined
    const route = menuKeyToRouteMap[key];

    setSelectedKeys([meta?.keyPath?.[0]]);
    if (route) {
      navigate(route);
      scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      import.meta.env.DEV ? toast.error(NO_SUCH_PAGE, { toastId: NO_SUCH_PAGE }) : "";
    }
  };
  // const onMenuSelect = ({ key, selectedKeys }: SelectInfo) => {
  //   //! TODO[SAMAN]: maybe needed in future
  //   // const allPaths: string[][] = findAllPaths(response?.data);
  //   // const chosenPath = allPaths?.find((item) => {
  //   //   return item?.includes(reverseObject(menuKeyToRouteMap)?.[location?.pathname]);
  //   // });

  //   setSelectedKeys(selectedKeys);
  //   // setOpenKeys(keyPath);
  //   const route = menuKeyToRouteMap[key as menuItemKeys];

  //   if (route) {
  //     navigate(route);
  //     scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   } else {
  //     import.meta.env.DEV ? toast.error(NO_SUCH_PAGE, { toastId: NO_SUCH_PAGE }) : "";
  //   }
  // };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        // background: colorBgContainer || "var(--app-bg-container)",
        overflow: "scroll",
        scrollbarWidth: "none",
        height: "100%",
      }}
      width={200}
      collapsedWidth={80}
      className="side-bar-container"
      aria-label="منو آیتم"
    >
      {isMenuLoading || isShortcutListLoading ? (
        <MainSpinner />
      ) : mainMenuItems.length > 0 ? (
        <>
          <div
            className={`fold-button-container ${collapsed ? "fold-center" : "fold-end"}`}
          >
            <CustomTooltip title={collapsed ? "بازکردن منو" : "بستن منو"}>
              <Button
                type="text"
                icon={
                  <AiOutlineArrowRight
                    className={`fold-icon ${collapsed ? "collapsed" : "expanded"}`}
                  />
                }
                onClick={() => toggleSidebar()}
                className="fold-button"
              />
            </CustomTooltip>
          </div>
          <Menu
            mode="vertical"
            items={mainMenuItems as any}
            expandIcon={() => null}
            defaultSelectedKeys={selectedKeys}
            // onSelect={onMenuSelect}
            aria-label="منو"
            onClick={(e) => OnClickMenuItems(e)}
            triggerSubMenuAction="click"
          />
        </>
      ) : (
        <div className="menu-error-container">
          <p className="menu-error-label">دریافت اطلاعات منو با خطا مواجه شد😓</p>
        </div>
      )}
    </Sider>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
