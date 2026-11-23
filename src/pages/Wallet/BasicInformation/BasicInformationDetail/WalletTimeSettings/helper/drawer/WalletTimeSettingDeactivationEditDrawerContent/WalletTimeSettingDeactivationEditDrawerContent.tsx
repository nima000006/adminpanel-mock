import { useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { noticesTypeData } from "@pages/Wallet/BasicInformation/BasicInformationDetail/_shared/utils";

import { WalletTimeSettingDeactivationEditDrawerContentProps } from "./@types/@walletTimeSettingDeactivationEditDrawerContentType";
import "./_walletTimeSettingDeactivationEditDrawerContent.scss";

const WalletTimeSettingDeactivationEditDrawerContent = ({
  closeDrawerHandler,
}: WalletTimeSettingDeactivationEditDrawerContentProps) => {
  const [selected, setSelected] = useState(1);
  const changeBtnHandler = () => {};

  return (
    <div className="wallet-time-setting-deactivation-edit-drawer-content-container">
      <CustomDrawerHeader
        title="ویرایش"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-action-btns-wrapper">
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
          label="قفل خودکار"
          name="automaticLock"
          suffix="روز"
          extra={`تغییر وضعیت کیف پول از فعال به غیر فعال پس از ${360} روز عدم انجام تراکنش.`}
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
export default WalletTimeSettingDeactivationEditDrawerContent;
