import { useEffect } from "react";

import { Grid, Steps } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder, stepStatusCreator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/dormitory";

import AllocateResidenceStep from "./helper/components/AllocateResidenceStep/AllocateResidenceStep";
import ProformaInvoiceStep from "./helper/components/ProformaInvoiceStep/ProformaInvoiceStep";
import SelectResidenceStep from "./helper/components/SelectResidenceStep/SelectResidenceStep";
import SelectUserStep from "./helper/components/SelectUserStep/SelectUserStep";
import "./_manualReservation.scss";

const TOTAL_STEPS = 4;
const NOT_SELECTED_DESCRIPTION = "انتخاب نشده";

const ManualReservation = () => {
  const { params, setSearchParams } = useQueryParams();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link to={DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE}>
            درخواست های رزرو
          </Link>
        ),
      },
      {
        title: "رزرو دستی",
      },
    ],
  });

  const stepFromUrl = parseInt(params?.step, 10);
  const step =
    !isNaN(stepFromUrl) && stepFromUrl >= 1 && stepFromUrl <= TOTAL_STEPS
      ? stepFromUrl
      : 1;

  const userDescription =
    step > 1 && params?.userName ? params.userName : NOT_SELECTED_DESCRIPTION;
  const residenceDescription =
    step > 2 && params?.residenceName ? params.residenceName : NOT_SELECTED_DESCRIPTION;
  const allocationDescription =
    step > 3 && params?.allocationSummary
      ? params.allocationSummary
      : NOT_SELECTED_DESCRIPTION;
  const payableAmountDescription =
    step >= 4 && params?.payableAmount
      ? String(
          dataPlaceHolder({
            data: params.payableAmount,
            isPrice: true,
            currency: { isAvailable: true, type: "تومان" },
          })
        )
      : NOT_SELECTED_DESCRIPTION;

  //? ================================ Effects  ================================

  useEffect(() => {
    if (!params?.step) {
      setSearchParams({ ...params, step: "1" });
    }
  }, [params, setSearchParams]);

  //* ================================ Util Functions ================================

  const stepsItem = [
    {
      key: "1",
      children: <SelectUserStep />,
    },
    {
      key: "2",
      children: <SelectResidenceStep />,
    },
    {
      key: "3",
      children: <AllocateResidenceStep />,
    },
    {
      key: "4",
      children: <ProformaInvoiceStep />,
    },
  ];

  return (
    <div className="manual-reservation-page-container flex flex-col gap-10">
      <Steps
        orientation={screens.xl ? "horizontal" : "vertical"}
        current={step - 1}
        items={[
          {
            status: stepStatusCreator(step, 1),
            title: "انتخاب کاربر",
            description: userDescription,
          },
          {
            status: stepStatusCreator(step, 2),
            title: "انتخاب اقامتگاه",
            description: residenceDescription,
          },
          {
            status: stepStatusCreator(step, 3),
            title: "تخصیص اقامت",
            description: allocationDescription,
          },
          {
            status: stepStatusCreator(step, 4),
            title: "پیش فاکتور",
            description: payableAmountDescription,
          },
        ]}
        className="body-regular"
      />
      {stepsItem[step - 1].children}
    </div>
  );
};

export default ManualReservation;
