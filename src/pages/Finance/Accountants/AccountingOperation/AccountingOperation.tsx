import { useEffect } from "react";

import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import AccountingOperationPaid from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaid/AccountingOperationPaid";
import AccountingOperationPayable from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/AccountingOperationPayable";
import AccountingOperationPaymentQueue from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/AccountingOperationPaymentQueue";

const AccountingOperation = () => {
  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },

      {
        title: "حسابداران",
      },
      {
        title: "عملیات حسابداری",
      },
    ],
  });

  //? ================================ Effects ================================

  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({
        tab: "1",
      });
    }
  }, [params?.tab, setSearchParams]);

  //* ================================ Util Functions ================================
  const tabsItems = [
    {
      label: "قابل پرداخت",
      children: <AccountingOperationPayable />,
      key: "1",
    },
    {
      label: "در صف پرداخت",
      children: <AccountingOperationPaymentQueue />,
      key: "2",
    },
    {
      label: "پرداخت شده",
      children: <AccountingOperationPaid />,
      key: "3",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Tabs
      items={tabsItems}
      centered
      destroyOnHidden
      activeKey={params?.tab ?? "1"}
      onChange={(key) =>
        setSearchParams({
          tab: key,
        })
      }
    />
  );
};

export default AccountingOperation;
