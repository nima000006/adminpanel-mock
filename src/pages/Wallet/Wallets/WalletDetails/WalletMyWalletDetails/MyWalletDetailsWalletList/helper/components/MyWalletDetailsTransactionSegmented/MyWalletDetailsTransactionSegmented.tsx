import { useState } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import MyWalletDetailsTransactionSegmentTable from "./helper/components/MyWalletDetailsTransactionSegmentTable/MyWalletDetailsTransactionSegmentTable";
import MyWalletTransactionSegmentTimeLine from "./helper/components/MyWalletDetailsTransactionSegmentTimeLine/MyWalletDetailsTransactionSegmentTimeLine";

const MyWalletDetailsTransactionSegmented = ({
  walletUuid,
}: {
  walletUuid: string | undefined;
}) => {
  const [view, setView] = useState("0");

  const segmentItems = [
    {
      id: "0",
      children: <MyWalletDetailsTransactionSegmentTable walletUuid={walletUuid} />,
    },
    {
      id: "1",
      children: <MyWalletTransactionSegmentTimeLine />,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDivider
        text="تاریخچه تراکنش‌ها"
        extraContent={
          <CustomSegmented
            options={[
              { value: "0", label: "جدول" },
              { value: "1", label: "خط زمانی", disabled: true },
            ]}
            onChange={(value) => setView(value as "0" | "1")}
            value={view}
          />
        }
      />
      {segmentItems[+view]?.children}
    </div>
  );
};
export default MyWalletDetailsTransactionSegmented;
