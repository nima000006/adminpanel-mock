import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { BasicInformationListDataType } from "@pages/Wallet/BasicInformation/BasicInformationList/types/@basicInformationList";

import WalletBasicInformationTableModel from "./helper/model/WalletBasicInformationTableModel/WalletBasicInformationTableModel";

const dataSource: BasicInformationListDataType[] = [
  {
    id: 1,
    title: "تنظیمات مالی کیف پول",
    settingCount: 10,
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 2,
    title: "تنظیمات تراکنش‌های کیف پول",
    settingCount: 5,
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 3,
    title: "تنظیمات زمانی کیف پول",
    settingCount: 5,
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 4,
    title: "تنظیمات امنیتی کیف پول",
    settingCount: 8,
    date: "2025-10-04T11:25:19.650126971",
  },
];

const BasicInformationList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: "اطلاعات پایه",
      },
    ],
  });
  return (
    <div className="wallet-basic-info-list">
      <CustomDivider text="لیست اطلاعات پایه" />
      <CustomTable<BasicInformationListDataType>
        dataSource={dataSource}
        rowKey="id"
        columns={WalletBasicInformationTableModel()}
        pagination={paginationConfig}
        // loading={}
        {...TABLE_PROPS(dataSource?.length)}
        draggableColumns
        draggableId={ExcelCodes.WALLET_BASIC_INFORMATION_LIST_TABLE}
      />
    </div>
  );
};

export default BasicInformationList;
