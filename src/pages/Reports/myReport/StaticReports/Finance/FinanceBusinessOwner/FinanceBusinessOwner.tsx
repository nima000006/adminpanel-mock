import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import { PiFolder, PiGauge, PiGavel, PiTableDuotone } from "react-icons/pi";

import { CustomRangePicker, CustomSelect } from "@components/CustomInputs";
import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FinanceBusinessOwnerFormType,
  REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS,
} from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/@types/@financeBusinessOwner";
import FinanceBusinessOwnerDetails from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerDetails/FinanceBusinessOwnerDetails";
import FinanceBusinessOwnerOverall from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerOverall/FinanceBusinessOwnerOverall";
import FinanceBusinessOwnerPayment from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerPayment/FinanceBusinessOwnerPayment";
import FinanceBusinessOwnerService from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerService/FinanceBusinessOwnerService";

const FinanceBusinessOwner = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },
      { title: "داشبورد" },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<FinanceBusinessOwnerFormType>();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ status: REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.OVERALL });
    }
  }, [url?.status]);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col xl={6} lg={8} md={12} xs={24}>
            <CustomRangePicker label="سال مالی (بازه تاریخ)" name="rangeDate" />
          </Col>
          <Col xl={6} lg={8} md={12} xs={24}>
            <CustomSelect label="استان" name="province" options={[]} />
          </Col>
          <Col xl={6} lg={8} md={12} xs={24}>
            <CustomSelect label="شهر" name="city" options={[]} />
          </Col>
          <Col xl={6} lg={8} md={12} xs={24}>
            <CustomSelect label="کسب و کار" name="business" options={[]} />
          </Col>
          <Col xl={6} lg={8} md={12} xs={24}>
            <CustomSelect label="شعبه / واحد (ذینفع)" name="branch" options={[]} />
          </Col>
          <Col xl={6} lg={8} md={12} xs={24}>
            <CustomSelect label="سرویس" name="service" options={[]} />
          </Col>
        </Row>
      </Form>
      <div>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 [&>.requests-demand-card-container>.card-container]:flex! [&>.requests-demand-card-container>.card-container]:flex-row!">
          <DemandCard
            title="عملکرد کلی"
            active={url?.status == REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.OVERALL}
            clickHandler={() =>
              changeCardHandler(REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.OVERALL)
            }
            badgeColor="transparent"
            className={
              url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.OVERALL
                ? "text-primary-6"
                : "text-neutral-7"
            }
            badge={false}
            Icon={PiGauge}
          />
          <DemandCard
            title="وضعیت پرداخت اسناد"
            active={url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.PAYMENT}
            clickHandler={() =>
              changeCardHandler(REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.PAYMENT)
            }
            badge={false}
            badgeColor="transparent"
            className={
              url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.PAYMENT
                ? "text-primary-6"
                : "text-neutral-7"
            }
            Icon={PiFolder}
          />
          <DemandCard
            title="عملکرد سرویس‌ها"
            active={url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.SERVICE}
            clickHandler={() =>
              changeCardHandler(REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.SERVICE)
            }
            badge={false}
            badgeColor="transparent"
            className={
              url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.SERVICE
                ? "text-primary-6"
                : "text-neutral-7"
            }
            Icon={PiGavel}
          />

          <DemandCard
            title="جزئیات درآمد"
            active={url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.DETAILS}
            clickHandler={() =>
              changeCardHandler(REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.DETAILS)
            }
            badge={false}
            badgeColor="transparent"
            className={
              url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.DETAILS
                ? "text-primary-6"
                : "text-neutral-7"
            }
            Icon={PiTableDuotone}
          />
        </div>
        {url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.OVERALL ? (
          <FinanceBusinessOwnerOverall />
        ) : url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.PAYMENT ? (
          <FinanceBusinessOwnerPayment />
        ) : url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.SERVICE ? (
          <FinanceBusinessOwnerService />
        ) : url?.status === REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS.DETAILS ? (
          <FinanceBusinessOwnerDetails />
        ) : null}
      </div>
    </>
  );
};
export default FinanceBusinessOwner;
