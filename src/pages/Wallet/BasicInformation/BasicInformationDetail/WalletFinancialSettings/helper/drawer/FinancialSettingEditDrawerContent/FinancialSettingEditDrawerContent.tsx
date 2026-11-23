import { useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { noticesTypeData } from "@pages/Wallet/BasicInformation/BasicInformationDetail/_shared/utils";

import { FinancialSettingEditDrawerContentProps } from "./@types/@financialSettingEditDrawerContentType";
import "./_financialSettingEditDrawerContent.scss";

const FinancialSettingEditDrawerContent = ({
  closeDrawerHandler,
  id,
}: FinancialSettingEditDrawerContentProps) => {
  const [selected, setSelected] = useState(1);

  const labels: Record<number, string> = {
    1: "حداقل موجودی",
    2: "حداکثر موجودی",
    3: "حداقل شارژ",
    4: "حداقل برداشت",
    5: "سقف شارژ روزانه",
    6: "سقف شارژ ماهانه",
    7: "سقف برداشت روزانه",
    8: "سقف برداشت ماهانه",
    9: "محدودیت تراکنش‌های مشکوک",
  };
  const changeBtnHandler = () => {};

  return (
    <div className="wallet-financial-setting-edit-drawer-content-container">
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
          label={labels[id] || ""}
          name="price"
          suffix="تومان"
          extra="سقف مجاز موجودی کیف پول (مثلاً 50,000,000 تومان)."
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
export default FinancialSettingEditDrawerContent;
