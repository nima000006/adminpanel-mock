import { Button, Modal } from "antd";

import { PADDING_40 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import "./_groupAdjustModal.scss";

type GroupAdjustModalType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GroupAdjustModal = ({ isModalOpen, setIsModalOpen }: GroupAdjustModalType) => {
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
          className="group-adjust-modal"
        >
          <CustomCard padding={PADDING_40} className="group-adjust-modal-container">
            <CustomInput type="text" label="مقطع" name="degree" placeholder="مقطع" />
            <CustomInput type="text" label="ملیت" name="nationality" placeholder="ملیت" />
            <CustomInput type="text" label="دین" name="religious" placeholder="دین" />
            <CustomInput
              type="text"
              label="درصد کاهش"
              name="discount-percent"
              placeholder="درصد کاهش"
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
export default GroupAdjustModal;
