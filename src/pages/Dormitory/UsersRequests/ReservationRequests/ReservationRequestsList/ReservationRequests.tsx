import { useEffect } from "react";

import { Col, Row, Tabs } from "antd";

import { CustomRangePicker, CustomSelect } from "@components/CustomInputs";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  ReservationCompletedRequestsStatus,
  ReservationOpeningRequestsStatus,
} from "@pages/Dormitory/_shared/utils";
import ReservationAllRequests from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationAllRequests/ReservationAllRequests";
import ReservationCompletedRequests from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationCompletedRequests/ReservationCompletedRequests";
import ReservationInResidenceRequests from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationInResidenceRequests/ReservationInResidenceRequests";
import ReservationOpeningRequests from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationOpeningRequests/ReservationOpeningRequests";

const TAB_ITEMS_KEY = {
  opening: "1",
  inResidence: "2",
  completed: "3",
  all: "4",
};

const ReservationRequests = () => {
  const { setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست اقامت",
      },
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    setSearchParams({ status: ReservationOpeningRequestsStatus.pendingExtension });
  }, []);

  const tabsItems = [
    {
      label: `درخواست های باز(${10})`,
      children: <ReservationOpeningRequests />,
      key: TAB_ITEMS_KEY.opening,
    },
    {
      label: `درخواست های در حال سکونت(${20})`,
      children: <ReservationInResidenceRequests />,
      key: TAB_ITEMS_KEY.inResidence,
    },
    {
      label: `درخواست های پایان یافته(${20})`,
      children: <ReservationCompletedRequests />,
      key: TAB_ITEMS_KEY.completed,
    },
    {
      label: `همه درخواست ها(${10})`,
      children: <ReservationAllRequests />,
      key: TAB_ITEMS_KEY.all,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  return (
    <div className="flex flex-col gap-6">
      <Row gutter={[16, 16]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="residence"
            options={[]}
            // form={form}
            // isLoading={getProvinceListLoading}
            placeholder="انتخاب اقامتگاه"
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="admission"
            options={[]}
            // form={form}
            // isLoading={getProvinceListLoading}
            placeholder="برنامه پذیرش"
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomRangePicker
            // onChange={changeDateHandler}
            name="rangeDate"
            placeholder={["از تاریخ ایجاد", "تا تاریخ ایجاد"]}
          />
        </Col>
      </Row>

      <Tabs
        items={tabsItems}
        onChange={(key) => {
          if (key === TAB_ITEMS_KEY.opening) {
            setSearchParams({ status: ReservationOpeningRequestsStatus.pendingReview });
          } else if (key === TAB_ITEMS_KEY.completed) {
            setSearchParams({
              status: ReservationCompletedRequestsStatus.accommodationCompleted,
            });
          } else {
            setSearchParams({});
          }
        }}
      />
    </div>
  );
};

export default ReservationRequests;
