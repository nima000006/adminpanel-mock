import { PiWalletFill } from "react-icons/pi";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_10 } from "@infra/VARS/globalColors/globalColors";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";
import "./_allWalletDetailsWalletChargeModalContent.scss";
const AllWalletDetailsWalletChargeModalContent = () => {
  return (
    <div className="all-wallet-details-charge-modal-content-container">
      <WalletDetailCards
        title="موجودی کیف پول"
        price={dataPlaceHolder({ data: "525522", isPrice: true })}
        icon={<PiWalletFill color={NEUTRAL_10} size={16} />}
      />
      <CustomInput
        type="text"
        label=""
        name="reporterNationalcode"
        placeholder="مبلغ مورد نظر را وارد نمایید."
        suffix={"ریال"}
      />
    </div>
  );
};
export default AllWalletDetailsWalletChargeModalContent;
