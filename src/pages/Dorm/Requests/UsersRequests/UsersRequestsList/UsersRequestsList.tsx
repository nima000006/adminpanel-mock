import { useEffect, useState } from "react";

import { Form, Tabs } from "antd";
import { useNavigate } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_MANUAL_REGISTRATION_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import { useLazyGetAdmissionProgramListQuery } from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { PADDING_40 } from "@infra/VARS/globalStyles/globalStyles";

import {
  AdmissionFormFields,
  AdmissionProgramListType,
  GetAdmissionProgramResponse,
} from "./@types/@usersRequestsList";
import UsersRequestsListAll from "./helper/components/All/UsersRequestsListAll";
import UsersRequestsListCancellation from "./helper/components/Cancellation/UsersRequestsListCancellation";
import UsersRequestsListCancelled from "./helper/components/Cancelled/UsersRequestsListCancelled";
import UsersRequestsListConfirmed from "./helper/components/Confirmed/UsersRequestsListConfirmed";
import UsersRequestsListDelivered from "./helper/components/Delivered/UsersRequestsListDelivered";
import UsersRequestsListPendingList from "./helper/components/PendingList/UsersRequestsListPendingList";
import UsersRequestsListPendingPayment from "./helper/components/PendingPayment/UsersRequestsListPendingPayment";
import UsersRequestsListPendingReview from "./helper/components/PendingReview/UsersRequestsListPendingReview";
import "./_usersRequestsList.scss";

const UsersRequestsList = () => {
  const [, setAdmissionList] = useState<AdmissionProgramListType[]>([]);

  useTitle({ text: "درخواست‌های کاربران" });

  const navigate = useNavigate();
  const { user, isFetchingUser } = useAuth();
  const { params, setSearchParams } = useQueryParams<{ tab: string }>();

  const activeTab = params?.tab || "1";

  const [admissionForm] = Form.useForm<AdmissionFormFields>();

  const items = [
    {
      key: "0",
      label: "همه",
      children: <UsersRequestsListAll />,
    },
    {
      key: "1",
      label: "در انتظار بررسی",
      children: <UsersRequestsListPendingReview />,
    },
    {
      key: "2",
      label: "در انتظار پرداخت",
      children: <UsersRequestsListPendingPayment />,
    },
    {
      key: "3",
      label: "پرداخت شده",
      children: <UsersRequestsListConfirmed />,
    },
    {
      key: "4",
      label: "تحویل داده شده",
      children: <UsersRequestsListDelivered />,
    },
    {
      key: "5",
      label: "درخواست کنسلی",
      children: <UsersRequestsListCancellation />,
    },
    {
      key: "6",
      label: "ابطال شده",
      children: <UsersRequestsListCancelled />,
    },
    {
      key: "7",
      label: "لیست انتظار خوابگاه",
      children: <UsersRequestsListPendingList />,
    },
  ];

  //? ================================  Api Calls ================================
  const [getAdmissionProgramList] = useLazyGetAdmissionProgramListQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (user?.staff?.admin?.branchId) {
      getAdmissionProgramList({ branchId: user?.staff?.admin?.branchId?.toString() })
        .unwrap()
        .then(getAdmissionProgramListSuccess);
    }
  }, []);

  //* ================================ Util Functions ================================
  const getAdmissionProgramListSuccess = (value: GetAdmissionProgramResponse) => {
    if (value?.status === 200) {
      setAdmissionList(value?.data);
      admissionForm.setFieldsValue({
        admissionSchedule: selectDefaultValueGenerator(value?.data?.[0]),
      });
    }
  };

  const manualRegistrationHandler = () => {
    navigate({
      pathname: DORM_USERS_REQUESTS_MANUAL_REGISTRATION_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="users-requests-list-page-container">
      <CustomCard
        padding={PADDING_40}
        className="users-requests-list-container"
        loading={isFetchingUser}
      >
        <ToolBox
          className="user-request-list-toolbox"
          leftSide={
            <div className="left-side">
              <CustomButton type="primary" ghost disabled>
                آرشیو
              </CustomButton>
              <CustomButton type="primary" onClick={manualRegistrationHandler}>
                ثبت نام دستی
              </CustomButton>
            </div>
          }
        />
        <Tabs
          activeKey={activeTab}
          items={items}
          type="card"
          onChange={(key) => {
            setSearchParams({ tab: key });
          }}
          className="dorm-users-requests-tab-container"
          destroyOnHidden
        />
      </CustomCard>
    </div>
  );
};

export default UsersRequestsList;
