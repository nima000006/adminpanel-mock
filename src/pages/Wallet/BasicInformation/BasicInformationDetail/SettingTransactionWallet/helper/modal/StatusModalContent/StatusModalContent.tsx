import { useState } from "react";

import { Form } from "antd";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import {
  noticesTypeData,
  WalletTransactionStatusLabels,
} from "@pages/Wallet/BasicInformation/BasicInformationDetail/_shared/utils";
import "./_statusModalContent.scss";

const StatusModalContent = ({ id }: { id: number }) => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="setting-transaction-status-modal-content">
      <p>{`آیا از تغییر وضعیت ${WalletTransactionStatusLabels[id] || ""} از حالت “فعال” به “غیرفعال” اطمینان دارید؟`}</p>
      <Form>
        <CustomRadioGroup
          name="notificationSendingType"
          hasVerticalLabel={true}
          options={noticesTypeData?.data.map((item) => ({
            label: (
              <div className="custom-radio-content">
                <div className="radio-title">{item.title}</div>
                <div className="radio-desc">{item.desc}</div>
              </div>
            ),
            value: item.id,
          }))}
          // optionType="default"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        />
      </Form>
    </div>
  );
};
export default StatusModalContent;
