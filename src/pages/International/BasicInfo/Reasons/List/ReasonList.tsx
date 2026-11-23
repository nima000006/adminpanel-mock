import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { INTERNATIONAL_BASIC_INFO_ROUTE } from "@infra/router/routes/international";

import InternationalReasonTypeTableModel from "./helper/models/InternationalReasonType/InternationalReasonTypeTableModel";
import "./_reasonList.scss";

const dataSource = [
  {
    id: 1,
    type: "رد",
    count: 4,
    statusId: 1,
  },
  {
    id: 2,
    type: "تایید",
    count: 5,
    statusId: 2,
  },
  {
    id: 3,
    type: "اصلاح",
    count: 4,
    statusId: 3,
  },
];

const Reason = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "انواع دلایل",
      },
    ],
  });
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="international-reason-type-page-container">
      <CustomDivider text="لیست نوع دلایل پاسخگویی به درخواست‌ها" />
      <CustomTable
        dataSource={dataSource}
        columns={InternationalReasonTypeTableModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        rowKey="id"
        className="international-reason-type-table-model-container"
      />
    </div>
  );
};

export default Reason;
