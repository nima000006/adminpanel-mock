import { useEffect } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { UserInfoSegmentContentProps } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/drawer/TicketingInfoDrawerContent/helper/components/UserInfoSegmentContent/@types/@userInfoSegmentContent";

const UserInfoSegmentContent = ({
  detailUserInfoData,
  isDetailUserInfoLoading,
  onDetailUserInfo,
}: UserInfoSegmentContentProps) => {
  const { params } = useQueryParams();
  const data = detailUserInfoData;

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.ticketId && onDetailUserInfo) {
      onDetailUserInfo({ ticketId: params.ticketId });
    }
  }, [params?.ticketId, onDetailUserInfo]);

  //* ================================ Util Functions ================================
  const userInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام",
      children: dataPlaceHolder({ data: data?.firstName }),
    },
    {
      key: "2",
      label: "نام خانوادگی",
      children: dataPlaceHolder({ data: data?.lastName }),
    },
    {
      key: "3",
      label: "کد ملی / فراگیر",
      children: dataPlaceHolder({ data: data?.username }),
    },

    ...(data?.staffType === "STUDENT"
      ? [
          {
            key: "4",
            label: "شماره دانشجویی",
            children: dataPlaceHolder({ data: data?.studentNumber }),
          },
        ]
      : [
          {
            key: "5",
            label: "شماره پرسنلی",
            children: dataPlaceHolder({ data: data?.personalCode }),
          },
        ]),

    {
      key: "6",
      label: "شماره همراه",
      children: dataPlaceHolder({ data: data?.mobileNumber }),
    },

    ...(data?.staffType === "STUDENT"
      ? [
          {
            key: "7",
            label: "مقطع تحصیلی",
            children: dataPlaceHolder({ data: data?.degreeName }),
          },
          {
            key: "8",
            label: "رشته تحصیلی",
            children: dataPlaceHolder({ data: data?.studyFieldName }),
          },
        ]
      : []),
    {
      key: "9",
      label: "شعبه / واحد",
      children: dataPlaceHolder({ data: data?.branchName }),
    },

    ...(data?.staffType === "STUDENT"
      ? [
          {
            key: "10",
            label: "نام دانشکده",
            children: emptyString,
          },
        ]
      : [
          {
            key: "11",
            label: "سمت",
            children: (
              <CustomTag
                variant="outlined"
                className="flex items-center gap-1"
                color={"default"}
              >
                {dataPlaceHolder({ data: data?.employeePosition })}
              </CustomTag>
            ),
          },
        ]),
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isDetailUserInfoLoading}>
      <CustomDivider
        text="اطلاعات کاربر"
        extraContent={
          <Link
            className="text-primary-6! flex items-center justify-center gap-1"
            to={{
              pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: data?.userId,
              }),
            }}
          >
            <PiUser />
            پروفایل کاربر
          </Link>
        }
      />

      <div>
        <Descriptions
          column={1}
          items={userInfoItems}
          styles={{
            label: {
              fontWeight: "bold",
              textAlign: "right",
              width: "180px",
            },
          }}
        />
      </div>
    </Div>
  );
};
export default UserInfoSegmentContent;
