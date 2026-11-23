import { Button, Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { BillingListModel } from "@infra/models/tableModels/Financial/Billing/BillingList";
import { COMMITTEE_BILLING_DETAIL_PAGE_ROUTE } from "@infra/router/routes/financial";
import "./_billingListTab.scss";

const productId = {
  room: 1,
  self: 2,
  consulting: 3,
  game: 4,
};

const dataSource = [
  {
    billingNumber: 24582,
    serviceTitle: "رزرو خوابگاه + 3",
    product: productId.room,
    billingType: "ابطال شده",
    billingReference: null,
    formal: "رسمی",
    status: "فعال",
    paymentType: "اقساطی (4)",
    factorStatus: "در انتظار تسویه",
    servicerName: "نام ارائه دهنده",
    servicerNo: 123569825,
    buyerName: "محمد احمدی",
    buyerNo: 12356,
    finalPrice: 45000,
    paymentDate: new Date(),
    paymentNoReference: 123569852,
    paymentTrackingNo: 355552355,
    key: 1,
  },
  {
    billingNumber: 24582,
    serviceTitle: "کتب ترم + 3",
    product: productId.self,
    billingType: "برگشت از فروش",
    billingReference: 12345546,
    formal: "رسمی",
    status: "فعال",
    paymentType: "اقساطی (4)",
    factorStatus: "سر رسید شده",
    servicerName: "نام ارائه دهنده",
    servicerNo: 123569825,
    buyerName: "محمد احمدی",
    buyerNo: 12356,
    finalPrice: 45000,
    paymentDate: new Date(),
    paymentNoReference: 123569852,
    paymentTrackingNo: 355552355,
    key: 2,
  },
  {
    billingNumber: 24582,
    serviceTitle: "مشاوره بالینی + 3",
    product: productId.consulting,
    billingType: "اصلاحی",
    billingReference: 12345546,
    formal: "رسمی",
    status: "فعال",
    paymentType: "اقساطی (4)",
    factorStatus: "در حال تسویه اقساط",
    servicerName: "نام ارائه دهنده",
    servicerNo: 123569825,
    buyerName: "محمد احمدی",
    buyerNo: 12356,
    finalPrice: 45000,
    paymentDate: new Date(),
    paymentNoReference: 123569852,
    paymentTrackingNo: 355552355,
    key: 3,
  },
  {
    billingNumber: 24582,
    serviceTitle: "خرید بازی + 3",
    product: productId.game,
    billingType: "پیش فاکتور",
    billingReference: null,
    formal: "غیررسمی",
    status: "غیرفعال",
    paymentType: "نقدی",
    factorStatus: "تسویه شده",
    servicerName: "نام ارائه دهنده",
    servicerNo: 123569825,
    buyerName: "محمد احمدی",
    buyerNo: 12356,
    finalPrice: 45000,
    paymentDate: new Date(),
    paymentNoReference: 123569852,
    paymentTrackingNo: 355552355,
    key: 4,
  },
  {
    billingNumber: 24582,
    serviceTitle: "خرید بازی + 3",
    product: productId.game,
    billingType: "پیش فاکتور",
    billingReference: null,
    formal: "غیررسمی",
    status: "غیرفعال",
    paymentType: "نقدی",
    factorStatus: "تسویه شده",
    servicerName: "نام ارائه دهنده",
    servicerNo: 123569825,
    buyerName: "محمد احمدی",
    buyerNo: 12356,
    finalPrice: 45000,
    paymentDate: new Date(),
    paymentNoReference: 123569852,
    paymentTrackingNo: 355552355,
    key: 5,
  },
  {
    billingNumber: 24582,
    serviceTitle: "رزرو خوابگاه + 3",
    product: productId.room,
    billingType: "فاکتور",
    billingReference: null,
    formal: "رسمی",
    status: "فعال",
    paymentType: "اقساطی (4)",
    factorStatus: "ابطال شده",
    servicerName: "نام ارائه دهنده",
    servicerNo: 123569825,
    buyerName: "محمد احمدی",
    buyerNo: 12356,
    finalPrice: 45000,
    paymentDate: new Date(),
    paymentNoReference: 123569852,
    paymentTrackingNo: 355552355,
    key: 6,
  },
];

const BillingListTab = () => {
  const navigate = useNavigate();
  const checkClickHandler = (id: number) => {
    navigate(`${COMMITTEE_BILLING_DETAIL_PAGE_ROUTE}?id=${id}`);
  };
  return (
    <div className="billing-list-tab-container">
      <div className="top-bar-container">
        <p className="table-info">
          اطلاعات زیر مربوط به بازه 12 / 12 / 1402 تا 12 / 12 / 1402 است. (تغییر در فیلتر
          پیشرفته)
        </p>
        <Form className="search-box-container">
          <Button
            type="primary"
            icon={<AiOutlineFilter />}
            className="advance-filter-btn"
          >
            فیلتر پیشرفته
          </Button>
          <CustomInput
            type="text"
            name="search"
            addonBefore={<AiOutlineSearch />}
            placeholder="جستجو با شناسه های مختلف"
            hasVerticalLabel={false}
          />
        </Form>
      </div>
      <CustomTable
        dataSource={dataSource}
        columns={BillingListModel({
          checkClickHandler: checkClickHandler,
        })}
        pagination={paginationConfig}
        rowKey="id"
        {...TABLE_PROPS(dataSource?.length)}
        className="billing-list-table-container"
      />
    </div>
  );
};

export default BillingListTab;
