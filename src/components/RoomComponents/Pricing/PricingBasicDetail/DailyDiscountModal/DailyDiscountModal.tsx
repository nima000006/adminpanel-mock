import { Button, Modal } from "antd";

import { PADDING_40 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import "./_dailyDiscountModal.scss";

type PricingBasicDetailModalType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DailyDiscountModal = ({
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
          title=" تخفیف روزانه"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={800}
          className="daily-discount-modal"
        >
          <CustomCard padding={PADDING_40} className="daily-discount-modal-container">
            <CustomInput type="text" label="از" name="start-discount" placeholder="از" />
            <CustomInput type="text" label="تا" name="end-discount" placeholder="تا" />
            <CustomInput
              type="text"
              label="درصد تخفیف"
              name="percent-discount"
              placeholder="درصدتخفیف"
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
export default DailyDiscountModal;
