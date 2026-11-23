import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { PaymentOnAccountListDataType } from "@pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/@types/@paymentOnAccountList";

import { REQUEST_DEMAND_IDS } from "../../_shared/utils";
import PaymentOnAccountAllList from "./helper/components/PaymentOnAccountAllList/PaymentOnAccountAllList";
import PaymentOnAccountConfirmList from "./helper/components/PaymentOnAccountConfirmList/PaymentOnAccountConfirmList";
import PaymentOnAccountPendingList from "./helper/components/PaymentOnAccountPendingList/PaymentOnAccountPendingList";
import PaymentOnAccountRejectList from "./helper/components/PaymentOnAccountRejectList/PaymentOnAccountRejectList";
import "./_paymentOnAccountList.scss";

const mockData: PaymentOnAccountListDataType[] = [
  {
    id: 1,
    requestId: "REQ-001",
    amount: 75000000,
    service: "CONSULTANT",
    userGroup: 0, // دانشجو
    firstName: "سارا",
    lastName: "احمدی",
    nationalId: "1234567890",
    birthCertNo: "54321",
    mobile: "09120001122",
    business: "دانشگاه ازاد",
    university: "دانشگاه آزاد تهران",
    province: "تهران",
    job: "دانشجو",
    requestDate: "2025-11-23T05:15:16.438Z",
    rejectDate: "2025-11-23T05:15:16.438Z",
    responsibleRequest: "شیرین نجفی",
    statusId: 1,
  },
  {
    id: 2,
    requestId: "REQ-002",
    amount: 50000000,
    service: "FOOD",
    userGroup: 1, // کارمند
    firstName: "محمد",
    lastName: "رضایی",
    nationalId: "1122334455",
    birthCertNo: "67890",
    mobile: "09121113344",
    business: "دانشگاه ازاد",
    email: "m.rezaei@email.com",
    province: "اصفهان",
    university: "دانشگاه آزاد اصفهان",
    job: "کارمند",
    requestDate: "2024-11-23T05:15:16.438Z",
    rejectDate: "2024-11-23T05:15:16.438Z",
    responsibleRequest: "شیرین نجفی",
    statusId: 2,
  },
  {
    id: 3,
    requestId: "REQ-003",
    amount: 120000000,
    service: "INSURANCE",
    userGroup: 0,
    firstName: "نرگس",
    lastName: "موسوی",
    nationalId: "9988776655",
    birthCertNo: "13579",
    mobile: "09351234567",
    business: "دانشگاه ازاد",
    email: "n.mousavi@email.com",
    province: "فارس",
    university: "دانشگاه آزاد شیراز",
    job: "استاد",
    requestDate: "2025-11-23T05:15:16.438Z",
    rejectDate: "2025-11-23T05:15:16.438Z",
    responsibleRequest: "شیرین نجفی",
    statusId: 3,
  },
  {
    id: 4,
    requestId: "REQ-004",
    amount: 90000000,
    service: "WALLET",
    userGroup: 1,
    firstName: "علی",
    lastName: "کریمی",
    nationalId: "5566778899",
    birthCertNo: "24680",
    mobile: "09135556677",
    business: "دانشگاه ازاد",
    email: "ali.karimi@email.com",
    province: "آذربایجان",
    university: "دانشگاه آزاد تبریز",
    job: "دانشجو",
    requestDate: "2025-11-23T05:15:16.438Z",
    rejectDate: "2025-11-23T05:15:16.438Z",
    responsibleRequest: "شیرین نجفی",
    statusId: 1,
  },
];
const PaymentOnAccountList = () => {
  const { params: url, setSearchParams } = useQueryParams();
  // const [form] = Form.useForm();

  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },
      {
        title: "درخواست‌ها",
      },
      {
        title: "علی الحساب",
      },
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ status: REQUEST_DEMAND_IDS.pending });
    }
  }, [setSearchParams, url?.status]);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="finance-payment-on-account-list-container">
      <div className="demand-wrapper">
        <DemandCard
          title="در انتظار بررسی"
          active={url?.status == REQUEST_DEMAND_IDS.pending}
          clickHandler={() => changeCardHandler(REQUEST_DEMAND_IDS.pending)}
          className={
            url?.status === REQUEST_DEMAND_IDS.pending
              ? "text-primary-6"
              : "text-neutral-7"
          }
          badgeColor="transparent"
          badge={false}
          badgeTitle="(100)"
        />
        <DemandCard
          title="تایید شده"
          active={url?.status === REQUEST_DEMAND_IDS.confirm}
          clickHandler={() => changeCardHandler(REQUEST_DEMAND_IDS.confirm)}
          className={
            url?.status === REQUEST_DEMAND_IDS.confirm
              ? "text-primary-6"
              : "text-neutral-7"
          }
          badge={false}
          badgeColor="transparent"
          badgeTitle="(100)"
        />
        <DemandCard
          title="رد شده"
          active={url?.status === REQUEST_DEMAND_IDS.rejected}
          clickHandler={() => changeCardHandler(REQUEST_DEMAND_IDS.rejected)}
          className={
            url?.status === REQUEST_DEMAND_IDS.rejected
              ? "text-primary-6"
              : "text-neutral-7"
          }
          badge={false}
          badgeColor="transparent"
          badgeTitle="(100)"
        />
        <DemandCard
          title="همه"
          active={url?.status === REQUEST_DEMAND_IDS.all}
          clickHandler={() => changeCardHandler(REQUEST_DEMAND_IDS.all)}
          className={
            url?.status === REQUEST_DEMAND_IDS.all ? "text-primary-6" : "text-neutral-7"
          }
          badge={false}
          badgeColor="transparent"
          badgeTitle="(100)"
        />
      </div>
      {url?.status === REQUEST_DEMAND_IDS.pending ? (
        <PaymentOnAccountPendingList
          data={mockData}
          // todo:[shirin]:uncomit this when api ready
          // setSearchParams={setSearchParams}
          // url={url}
          //   loading={}
          //   getListData={getListData}
          //   filterItemsList={filterItemsList}
          //   loadingAdvance={isAdvanceFilterLoading}
          //   refreshCount={getListCount}
          // form={form}
        />
      ) : url?.status === REQUEST_DEMAND_IDS.confirm ? (
        <PaymentOnAccountConfirmList data={mockData} />
      ) : url?.status === REQUEST_DEMAND_IDS.rejected ? (
        <PaymentOnAccountRejectList data={mockData} />
      ) : url?.status === REQUEST_DEMAND_IDS.all ? (
        <PaymentOnAccountAllList data={mockData} />
      ) : null}
    </div>
  );
};
export default PaymentOnAccountList;
