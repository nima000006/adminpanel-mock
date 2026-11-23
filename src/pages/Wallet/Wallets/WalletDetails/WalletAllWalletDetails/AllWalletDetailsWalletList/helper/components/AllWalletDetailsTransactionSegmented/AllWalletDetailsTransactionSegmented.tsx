import { useState } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import AllWalletDetailsTransactionSegmentTable from "./helper/components/AllWalletDetailsTransactionSegmentTable/AllWalletDetailsTransactionSegmentTable";
import AllWalletDetailsTransactionSegmentTimeLine from "./helper/components/AllWalletDetailsTransactionSegmentTimeLine/AllWalletDetailsTransactionSegmentTimeLine";

const AllWalletDetailsTransactionSegmented = ({
  walletUuid,
}: {
  walletUuid: string | undefined;
}) => {
  const [view, setView] = useState("0");

  const segmentItems = [
    {
      id: "1",
      children: <AllWalletDetailsTransactionSegmentTable walletUuid={walletUuid} />,
    },
    {
      id: "2",
      children: <AllWalletDetailsTransactionSegmentTimeLine />,
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
export default AllWalletDetailsTransactionSegmented;
