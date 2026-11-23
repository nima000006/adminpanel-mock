import { useEffect } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_HABITANTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { HabitantsDetailsTabsProps } from "./@types/@habitantsDetails";
import FifthTabUserHistory from "./helper/components/FifthTabUserHistory/FifthTabUserHistory";
import HabitantsUserInfo from "./helper/components/FirstTabUserInfo/FirstTabUserInfo";
import FourthTabAdmissionProgram from "./helper/components/FourthTabAdmissionProgram/FourthTabAdmissionProgram";
import SecondTabRoomInfo from "./helper/components/SecondTabRoomInfo/SecondTabRoomInfo";
import SeventhTabNotifications from "./helper/components/SeventhTabNotifications/SeventhTabNotifications";
import SixthTabPresenceAbsence from "./helper/components/SixthTabPresenceAbsence/SixthTabPresenceAbsence";
import ThirdTabFactor from "./helper/components/ThirdTabFactor/ThirdTabFactor";

const HabitantsDetail = () => {
  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_HABITANTS_LIST_PAGE_ROUTE}>ساکنین</Link>,
      },
      ...(params?.title
        ? [
            {
              title: params?.title,
            },
          ]
        : []),
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.habitantRoomPage) delete params["habitantRoomPage"];

    if (params?.habitantRoomPageSize) delete params["habitantRoomPageSize"];

    if (params?.page) delete params["page"];

    if (params?.pageSize) delete params["pageSize"];

    setSearchParams(params);
  }, []);

  const HabitantsDetailsTabs: HabitantsDetailsTabsProps = () => {
    return [
      {
        label: "اطلاعات کاربر",
        children: <HabitantsUserInfo />,
        key: "1",
      },
      {
        label: "اطلاعات اتاق",
        children: <SecondTabRoomInfo />,
        key: "2",
      },
      {
        label: "فاکتور",
        children: <ThirdTabFactor />,
        key: "3",
      },
      {
        label: "برنامه پذیرش",
        children: <FourthTabAdmissionProgram />,
        key: "4",
      },
      {
        label: "سوابق کاربر",
        children: <FifthTabUserHistory />,
        key: "5",
      },
      {
        label: "حضور و غیاب",
        children: <SixthTabPresenceAbsence />,
        key: "6",
      },
      {
        label: "اعلان ها",
        children: <SeventhTabNotifications />,
        key: "7",
      },
    ];
  };
  return (
    <div>
      <Tabs
        items={HabitantsDetailsTabs()}
        className="body-regular"
        type="card"
        defaultActiveKey={params?.tab ? params?.tab : "1"}
        onChange={() => {
          delete params["tab"];
          setSearchParams(params);
        }}
      />
    </div>
  );
};

export default HabitantsDetail;
