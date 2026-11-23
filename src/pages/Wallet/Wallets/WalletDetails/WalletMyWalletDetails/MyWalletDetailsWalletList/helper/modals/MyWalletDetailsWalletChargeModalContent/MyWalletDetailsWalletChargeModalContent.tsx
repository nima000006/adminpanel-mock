import { PiWalletFill } from "react-icons/pi";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { dataPlaceHolder } from "@infra/helpers/utils";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";
import "./_myWalletDetailsWalletChargeModalContent.scss";
const MyWalletDetailsWalletChargeModalContent = () => {
  return (
    <div className="my-wallet-details-charge-modal-content-container">
      <WalletDetailCards
        title="موجودی کیف پول"
        price={dataPlaceHolder({ data: "525522", isPrice: true })}
        icon={<PiWalletFill color="#262626" size={16} />}
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
export default MyWalletDetailsWalletChargeModalContent;
