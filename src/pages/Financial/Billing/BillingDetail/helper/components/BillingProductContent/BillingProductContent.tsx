import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { BillingProductContentModel } from "@infra/models/tableModels/Financial/Billing/BillingProductContentModel";
import "./_billingProductContent.scss";

const BillingProductContent = () => {
  const dataSource = [
    {
      key: 1,
      serviceTitle: "عنوان خدمت",
      serviceId: "608320",
      product: 4,
      count: "4 عدد",
      unitPrice: "1,000,000",
      unitDiscount: "1,000,000",
      finalPrice: "1,000,000",
      desc: "شرح به همراه تول تیپ",
    },
    {
      key: 2,
      serviceTitle: "عنوان خدمت",
      serviceId: "608320",
      product: 3,
      count: "4 عدد",
      unitPrice: "1,000,000",
      unitDiscount: "1,000,000",
      finalPrice: "1,000,000",
      desc: "شرح به همراه تول تیپ",
    },
    {
      key: 3,
      serviceTitle: "عنوان خدمت",
      serviceId: "608320",
      product: 2,
      count: "4 عدد",
      unitPrice: "1,000,000",
      unitDiscount: "1,000,000",
      finalPrice: "1,000,000",
      desc: "شرح به همراه تول تیپ",
    },
    {
      key: 4,
      serviceTitle: "عنوان خدمت",
      serviceId: "608320",
      product: 1,
      count: "4 عدد",
      unitPrice: "1,000,000",
      unitDiscount: "1,000,000",
      finalPrice: "1,000,000",
      desc: "شرح به همراه تول تیپ",
    },
  ];
  return (
    <div className="billing-product-content-container">
      <CustomTable
        dataSource={dataSource}
        columns={BillingProductContentModel}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="billing-product-table-container"
      />
    </div>
  );
};
export default BillingProductContent;
