import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import { insuranceTable } from "./helper/components/insuranceListUtils/insuranceListUtils";
import InsuranceRequestTable from "./helper/components/InsuranceRequestTable/InsuranceRequestTable";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { Tab } from "../../../../infrastructure/models/modules/GeneralTypes/GeneralTypes";
import "./_insuranceRequestList.scss";

const InsuranceRequestsList = () => {
  useTitle({ text: "لیست درخواست های بیمه" });
  const [, setSearchParams] = useSearchParams();

  const items: Tab[] = [
    {
      key: insuranceTable.all?.label,
      label: insuranceTable.all?.label,
      children: <InsuranceRequestTable type={insuranceTable.all?.code} />,
    },
    {
      key: insuranceTable.pending?.label,
      label: insuranceTable.pending?.label,
      children: <InsuranceRequestTable type={insuranceTable.pending?.code} />,
    },
    {
      key: insuranceTable.readyToIssue?.label,
      label: insuranceTable.readyToIssue?.label,
      children: <InsuranceRequestTable type={insuranceTable.readyToIssue?.code} />,
    },
    {
      key: insuranceTable.issued?.label,
      label: insuranceTable.issued?.label,
      children: <InsuranceRequestTable type={insuranceTable.issued?.code} />,
    },
    {
      key: insuranceTable.suspended?.label,
      label: insuranceTable.suspended?.label,
      children: <InsuranceRequestTable type={insuranceTable.suspended?.code} />,
    },
  ];
  //todo [saman]: below comments are incomplete code, dont delete
  // const onClickSearchInput = () => {
  //   console.log("s");
  // };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="insurance-request-list-container">
      {/* <InsuranceRequestsStatistics /> */}
      <div className="insurance-request-bottom-section-container">
        <div className="table-action-bar-container">
          <div className="inner-action-filter-container">
            {/* <CustomInput
              addonAfter={
                <AiOutlineSearch 
                //  onClick={onClickSearchInput}
                />
              }
              placeholder="جستجو"
              className="search-box"
              hasVerticalLabel={false}
              // onClick={onClickSearchInput}
            /> */}
            {/* <Button
              type="primary"
              icon={<AiOutlineFilter />}
              size="middle"
              //   onClick={onClickHomeActionBarFilter}
            >
              فیلتر پیشرفته
            </Button> */}
          </div>
          {/* <CustomRangePicker name="rangeDate" /> */}
        </div>
        <Tabs
          defaultActiveKey={insuranceTable.all?.label}
          items={items}
          className="insurance-request-tabs-container"
          dir="rtl"
          type="card"
          onChange={() => setSearchParams({})}
        />
      </div>
    </div>
  );
};

export default InsuranceRequestsList;
