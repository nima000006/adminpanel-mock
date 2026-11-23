import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  WALLET_BASIC_INFO_FINANCE_SETTING_PAGE_ROUTE,
  WALLET_BASIC_INFO_SECURITY_SETTING_PAGE_ROUTE,
  WALLET_BASIC_INFO_SETTING_TRANSACTION_PAGE_ROUTE,
  WALLET_BASIC_INFO_TIME_SETTING_PAGE_ROUTE,
} from "@infra/router/routes/wallet";
import { BasicInformationListDataType } from "@pages/Wallet/BasicInformation/BasicInformationList/types/@basicInformationList";

const WalletBasicInformationTableModel =
  (): CustomColumnType<BasicInformationListDataType>[] => {
    const routeMap: Record<number, string> = {
      1: WALLET_BASIC_INFO_FINANCE_SETTING_PAGE_ROUTE,
      2: WALLET_BASIC_INFO_SETTING_TRANSACTION_PAGE_ROUTE,
      3: WALLET_BASIC_INFO_TIME_SETTING_PAGE_ROUTE,
      4: WALLET_BASIC_INFO_SECURITY_SETTING_PAGE_ROUTE,
    };
    return [
      {
        title: "عنوان",
        dataIndex: "title",
        key: "title",
        width: 400,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "تعداد تنظیمات",
        dataIndex: "settingCount",
        key: "settingCount",
        width: 150,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "تاریخ و زمان آخرین تغییر",
        dataIndex: "date",
        key: "date",
        width: 170,
        render: (value: string) => {
          return (
            <>
              {dataPlaceHolder({
                data: value,
                isDate: true,
                customDateFormat: "HH:mm, YYYY-MM-DD",
              })}
            </>
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        key: "id",
        fixed: "right" as FixedType,
        width: 150,
        className: "tables-sticky-column-left",
        render: (_: string, records: BasicInformationListDataType) => {
          return (
            <Link to={routeMap[records?.id]} className="text-link">
              مشاهده
            </Link>
          );
        },
      },
    ];
  };

export default WalletBasicInformationTableModel;
