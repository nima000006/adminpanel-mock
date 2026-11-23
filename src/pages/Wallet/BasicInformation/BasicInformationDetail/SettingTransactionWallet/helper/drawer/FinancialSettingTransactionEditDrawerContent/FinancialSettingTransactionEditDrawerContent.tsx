import { useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  noticesTypeData,
  WalletTransactionStatusLabels,
} from "@pages/Wallet/BasicInformation/BasicInformationDetail/_shared/utils";

import { FinancialSettingTransactionEditDrawerContentProps } from "./@types/@financialSettingTransactionEditDrawerContentType";
import "./_financialSettingTransactionEditDrawerContent.scss";

const FinancialSettingTransactionEditDrawerContent = ({
  closeDrawerHandler,
  id,
}: FinancialSettingTransactionEditDrawerContentProps) => {
  const [selected, setSelected] = useState(1);
  const changeBtnHandler = () => {};

  return (
    <div className="wallet-financial-setting-transaction-edit-drawer-content-container">
      <CustomDrawerHeader
        title="ویرایش"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="habitants-creditors-drawer-action-btns-wrapper">
            <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={changeBtnHandler}
              className="drawer-action-btn"
              htmlType="submit"
              //   loading={}
            >
              ثبت تغییرات
            </CustomButton>
          </div>
        }
      />
      <Form className="form-content">
        <CustomInput
          type="text"
          label={WalletTransactionStatusLabels[id] || ""}
          name="price"
          suffix="تومان"
          extra="تعداد مجاز تراکنش‌ها در روز (مثلاً 10 تراکنش)."
          className="input"
        />
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
export default FinancialSettingTransactionEditDrawerContent;
