import { Button, Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { BuyerReportModel } from "@infra/models/tableModels/Financial/Billing/BuyerReport";

import { BuyerReportTabProps } from "./@types/@buyerReportTab";
import "./_buyerReportTab.scss";

const dataSource = [
  {
    buyerName: "محمد احمدی",
    buyerNo: 1235682859,
    factorsQty: 1587,
    factorsTotalPrice: 25300000,
    waitingForPaymentQty: 23,
    waitingForPaymentPrice: 1825000,
    finishedPaymentQty: 253,
    finishedPaymentPrice: 1820000,
    settledQty: 253,
    settledPrice: 1820000,
    id: 1,
  },
  {
    buyerName: "محمد احمدی",
    buyerNo: 1235682859,
    factorsQty: 1587,
    factorsTotalPrice: 25300000,
    waitingForPaymentQty: 23,
    waitingForPaymentPrice: 1825000,
    finishedPaymentQty: 253,
    finishedPaymentPrice: 1820000,
    settledQty: 253,
    settledPrice: 1820000,
    id: 2,
  },
  {
    buyerName: "محمد احمدی",
    buyerNo: 1235682859,
    factorsQty: 1587,
    factorsTotalPrice: 25300000,
    waitingForPaymentQty: 23,
    waitingForPaymentPrice: 1825000,
    finishedPaymentQty: 253,
    finishedPaymentPrice: 1820000,
    settledQty: 253,
    settledPrice: 1820000,
    id: 3,
  },
  {
    buyerName: "محمد احمدی",
    buyerNo: 1235682859,
    factorsQty: 1587,
    factorsTotalPrice: 25300000,
    waitingForPaymentQty: 23,
    waitingForPaymentPrice: 1825000,
    finishedPaymentQty: 253,
    finishedPaymentPrice: 1820000,
    settledQty: 253,
    settledPrice: 1820000,
    id: 4,
  },
  {
    buyerName: "محمد احمدی",
    buyerNo: 1235682859,
    factorsQty: 1587,
    factorsTotalPrice: 25300000,
    waitingForPaymentQty: 23,
    waitingForPaymentPrice: 1825000,
    finishedPaymentQty: 253,
    finishedPaymentPrice: 1820000,
    settledQty: 253,
    settledPrice: 1820000,
    id: 5,
  },
];

const BuyerReportTab = ({ setActiveKey }: BuyerReportTabProps) => {
  const watchBillsClickHandler = () => setActiveKey("1");
  return (
    <div className="buyer-report-tab-container">
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
        columns={BuyerReportModel({
          watchBillsClickHandler: watchBillsClickHandler,
        })}
        pagination={paginationConfig}
        rowKey="id"
        {...TABLE_PROPS(dataSource?.length)}
        className="buyer-reports-table-container"
      />
    </div>
  );
};

export default BuyerReportTab;
