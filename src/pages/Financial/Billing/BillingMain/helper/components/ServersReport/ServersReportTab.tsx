import { Button, Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { ServicersReportModel } from "@infra/models/tableModels/Financial/Billing/ServicersReportModel";

import { ServersReportTabProps } from "./@types/@serversReportTab";
import "./_serversReportTab.scss";

const dataSource = [
  {
    servicerName: "خدمت دهنده",
    servicerNo: 1235682859,
    productOwnerName: "مالک خدمات",
    productOwnerNo: 457565554,
    productQty: 12,
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
    servicerName: "خدمت دهنده",
    servicerNo: 1235682859,
    productOwnerName: "مالک خدمات",
    productOwnerNo: 457565554,
    productQty: 12,
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
    servicerName: "خدمت دهنده",
    servicerNo: 1235682859,
    productOwnerName: "مالک خدمات",
    productOwnerNo: 457565554,
    productQty: 12,
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
    servicerName: "خدمت دهنده",
    servicerNo: 1235682859,
    productOwnerName: "مالک خدمات",
    productOwnerNo: 457565554,
    productQty: 12,
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
];

const ServersReportTab = ({ setActiveKey }: ServersReportTabProps) => {
  const watchBillsClickHandler = () => {
    setActiveKey("1");
  };
  const checkClickHandler = () => {};
  return (
    <div className="servers-report-tab-container">
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
        columns={ServicersReportModel({
          watchBillsClickHandler: watchBillsClickHandler,
          checkClickHandler: checkClickHandler,
        })}
        pagination={paginationConfig}
        rowKey="id"
        {...TABLE_PROPS(dataSource?.length)}
        className="server-reports-table-container"
      />
    </div>
  );
};

export default ServersReportTab;
