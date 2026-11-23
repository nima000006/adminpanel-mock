import { useState, useEffect } from "react";

import { Col, Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { PiArrowLeft } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import Div from "@components/Renderers/Div/Div";
import { findObjectWithKey } from "@infra/helpers/utils/findObjectWithKey";
import {
  MY_REPORT_DORM_STATIC_PAGE_ROUTE,
  MY_REPORT_FOOD_STATIC_PAGE_ROUTE,
  MY_REPORT_MY_DOCTOR_STATIC_PAGE_ROUTE,
  MY_REPORT_PAGE_ROUTE,
} from "@infra/router/routes/reports";
import { getFromLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useShortcutListQuery } from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { MenuItemData } from "@infra/states/redux/Apis/models/homeApi.model";
import { useLazyMyReportAllQuery } from "@infra/states/redux/Apis/report/myReport";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { ReportListItem } from "@pages/Reports/myReport/@types/@myReportTypes";
import { ReportCardItem } from "@pages/Reports/myReport/MyReportList/helper/components/MyReportStatisticalReports/@types/ReportCardItem";

import FoodDeliveryScanContent from "./helpers/FoodDeliveryScanContent/FoodDeliveryScanContent";
import HomePageImagePlaceHolderOn from "../../assets/images/HomePageImageOn.webp";
import useTitle from "../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

import "./home.scss";

const routeMap: Record<string, string> = {
  ROOM: MY_REPORT_DORM_STATIC_PAGE_ROUTE,
  FOOD: MY_REPORT_FOOD_STATIC_PAGE_ROUTE,
  MY_DOCTOR: MY_REPORT_MY_DOCTOR_STATIC_PAGE_ROUTE,
  SURVEY: MY_REPORT_MY_DOCTOR_STATIC_PAGE_ROUTE,
};

const gradientMap: Record<string, string> = {
  purple: "bg-dormitory-gradient",
  lime: "bg-food-gradient",
  cyan: "bg-doctor-gradient",
};

const getBgClass = (color?: string) =>
  color ? gradientMap[color] || "bg-gray-400" : "bg-gray-400";

const Home = () => {
  const [isFoodDrawerOpen, setIsFoodDrawerOpen] = useState({ isOpen: false });
  const [isFoodDelivery, setIsFoodDelivery] = useState(false);

  const [reports, setReports] = useState<ReportListItem[]>([]);

  useTitle({ text: "به پنل مدیریت دانشجویار خوش آمدید✨" });

  //? ================================  Api Calls ================================
  const [getReports, { isLoading: isGetReportsLoading }] = useLazyMyReportAllQuery();
  const { data, isFetching: isShortcutListLoading } = useShortcutListQuery();

  //? ================================  Effects ================================
  useEffect(() => {
    getReports({ typeId: 1 })
      .unwrap()
      .then(setReports)
      .catch(() => setReports([]));
  }, []);

  useEffect(() => {
    const checkMenu = () => {
      try {
        const menuString = getFromLocalStorage("MI");
        if (!menuString) {
          setIsFoodDelivery(false);
          return;
        }
        const menu = JSON.parse(menuString);
        const hasFoodDelivery =
          findObjectWithKey<MenuItemData>(menu, "foodDelivery") !== null;
        setIsFoodDelivery(hasFoodDelivery);
      } catch (error) {
        console.warn(error);
        setIsFoodDelivery(false);
      }
    };

    checkMenu();

    const handler = () => checkMenu();

    window.addEventListener("localStorage:set", handler as EventListener);
    window.addEventListener("storage", handler as EventListener);

    return () => {
      window.removeEventListener("localStorage:set", handler as EventListener);
      window.removeEventListener("storage", handler as EventListener);
    };
  }, []);

  // closeDrawerHandler
  const closeDrawerHandler = () => setIsFoodDrawerOpen({ isOpen: false });

  // ساخت کارت‌
  const mergedReports: ReportCardItem[] = reports
    .map((item): ReportCardItem | null => {
      const service = serviceOptions.find((s) => s.value === item.service);
      if (!service) return null;

      return {
        id: item.id,
        title: service.title,
        icon: service.icon,
        isIconSvg: service.isSvg ? true : false,
        bgColor: getBgClass(service.color),
        link: routeMap[item.service] ?? "#",
        counts: item.counts,
      };
    })
    .filter((x): x is ReportCardItem => x !== null); // Type narrowing

  return (
    <>
      <div className="home-page-container flex flex-col gap-6">
        {/* دسترسی سریع داشبورد */}
        <Div
          loading={isGetReportsLoading}
          className="bg-neutral-1 w-full rounded-3xl p-10"
        >
          {reports?.length > 0 ? (
            <div className="flex flex-col gap-6">
              <span className="h5-medium text-xl">دسترسی سریع داشبورد گزارشات</span>

              {/* داشبورد */}
              <div className="flex justify-center">
                <Row gutter={[16, 16]} className="w-full">
                  {mergedReports.map((card) => (
                    <Col key={card.id} xs={24} sm={12} lg={8}>
                      <div className="border-neutral-5 flex flex-col items-center gap-4 rounded-2xl border border-dashed p-4">
                        <div
                          className={`m-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-xl text-white ${card.bgColor}`}
                        >
                          {card?.isIconSvg ? (
                            <img
                              src={card.icon as string}
                              alt={card.title}
                              className="h-5 w-5"
                            />
                          ) : (
                            <card.icon />
                          )}
                        </div>

                        <h3 className="text-neutral-10 h4-medium font-medium">
                          داشبورد {card.title}
                        </h3>

                        <Link className="w-full" to={card.link}>
                          <CustomButton type="dashed" className="w-full">
                            <PiArrowLeft />
                          </CustomButton>
                        </Link>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* گزارشات پویا */}
              <div className="flex w-full flex-col items-center">
                <Link
                  to={MY_REPORT_PAGE_ROUTE}
                  className="border-neutral-5 flex w-fit items-center gap-4 rounded-2xl border border-dashed p-4"
                >
                  <div className="m-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-xl text-white">
                    <img
                      src={`/images/uni-super-app.svg`}
                      alt={`uni-super-app-image`}
                      width="24"
                      height="24"
                    />
                  </div>
                  <h3 className="text-neutral-10 h4-medium font-medium">گزارشات پویا</h3>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src={HomePageImagePlaceHolderOn}
                alt="avatar-place-holder"
                width="400"
                height="357"
                className="home-page-img"
              />
            </div>
          )}
        </Div>

        {/* دسترسی سریع */}
        <div className="bg-neutral-1 flex w-full flex-col gap-6 rounded-3xl p-10">
          <span className="h5-medium text-xl">دسترسی سریع </span>
          <Div
            loading={isShortcutListLoading}
            className="flex flex-wrap items-center gap-6"
          >
            {isFoodDelivery && (
              <CustomButton
                type="dashed"
                onClick={() => setIsFoodDrawerOpen({ isOpen: true })}
                className="delivery-food-btn"
                icon={<PiArrowLeft />}
                iconPlacement="end"
              >
                صفحه تحویل غذا
              </CustomButton>
            )}

            {data?.map((item) => (
              <Link to={item.menuItem}>
                <CustomButton
                  type="dashed"
                  className="quick-access-btn"
                  icon={<PiArrowLeft />}
                  iconPlacement="end"
                >
                  {item?.faTitle}
                </CustomButton>
              </Link>
            ))}
          </Div>
        </div>
      </div>

      {isFoodDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isFoodDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={<FoodDeliveryScanContent closeDrawerHandler={closeDrawerHandler} />}
          size="large"
          width="100vw"
          height="100vh"
          className="food-scan-delivery-container"
        />
      )}
    </>
  );
};

export default Home;
