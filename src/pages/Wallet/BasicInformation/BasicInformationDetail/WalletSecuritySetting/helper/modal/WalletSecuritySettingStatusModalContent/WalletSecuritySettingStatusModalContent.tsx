import { useState } from "react";

import { Form } from "antd";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { noticesTypeData } from "@pages/Wallet/BasicInformation/BasicInformationDetail/_shared/utils";
import "./_walletSecuritySettingStatusModalContent.scss";

const WalletSecuritySettingStatusModalContent = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="wallet-security-setting-status-modal-content">
      <p>آیا از تغییر وضعیت کیف پول از حالت “فعال” به “مسدود” اطمینان دارید؟</p>
      <Form>
        <CustomRadioGroup
          name="notificationSendingType"
          hasVerticalLabel={true}
          options={noticesTypeData?.data.map((item) => ({
            label: (
              <div className="custom-radio-content">
                <div className="radio-title">
                  {dataPlaceHolder({ data: item?.title })}
                </div>
                <div className="radio-desc">{dataPlaceHolder({ data: item?.desc })}</div>
              </div>
            ),
            value: item.id,
          }))}
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        />
      </Form>
    </div>
  );
};
export default WalletSecuritySettingStatusModalContent;
