import { Button, Modal } from "antd";

import { PADDING_40 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import "./_pricingBasicDetailModal.scss";

type PricingBasicDetailModalType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PricingBasicDetailModal = ({
  isModalOpen,
  setIsModalOpen,
}: PricingBasicDetailModalType) => {
  //* ================================ Util Functions ================================
  const registerHandler = () => {};
  const backBtnHandler = () => {
    setIsModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <form>
      {isModalOpen && (
        <Modal
          title="ایجاد قیمت پایه"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={800}
          className="pricing-basic-detail-modal"
        >
          <CustomCard
            padding={PADDING_40}
            className="pricing-basic-detail-modal-container"
          >
            <CustomInput
              type="text"
              label="درجه کیفی"
              name="quality-degree"
              placeholder="درجه کیفی"
            />
            <CustomInput
              type="text"
              label="ظرفیت اتاق"
              name="room-capacity"
              placeholder="ظرفیت اتاق"
            />
            <CustomInput
              type="text"
              label="قیمت پایه روزانه"
              name="daily-base-price"
              placeholder="مالک"
            />
            <CustomInput
              type="text"
              label="شماره موبایل"
              name="mobile"
              placeholder="شماره موبایل"
            />
            <CustomInput
              type="text"
              label="نام کاربری"
              name="username"
              placeholder="نام کاربری"
            />
            <CustomInput
              type="text"
              label="رمز عبور"
              name="password"
              placeholder="رمز عبور"
            />
            <CustomInput
              type="text"
              label="تکرار رمز عبور"
              name="rePassword"
              placeholder="تکرار رمز عبور"
            />
          </CustomCard>
          <div className="btn-container">
            <Button type="primary" htmlType="submit" onClick={registerHandler}>
              ثبت
            </Button>
            <Button onClick={backBtnHandler}>بازگشت</Button>
          </div>
        </Modal>
      )}
    </form>
  );
};
export default PricingBasicDetailModal;
