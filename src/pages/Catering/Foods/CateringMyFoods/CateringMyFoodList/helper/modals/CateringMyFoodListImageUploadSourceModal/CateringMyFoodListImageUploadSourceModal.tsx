import { AiOutlineLaptop, AiOutlinePicture } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";

import { CateringMyFoodListImageUploadSourceModalProps } from "./@types/@cateringMyFoodListImageUploadSourceModal";

const CateringMyFoodListImageUploadSourceModal = ({
  open,
  onCancel,
  onSelectFromSystem,
  onSelectFromPanelDefaults,
}: CateringMyFoodListImageUploadSourceModalProps) => {
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title="بارگذاری عکس غذا"
      size="medium"
      hideConfirm
      cancelText="انصراف"
      destroyOnClose
    >
      <div className="flex w-full flex-col gap-3">
        <CustomButton
          htmlType="button"
          className="flex w-full justify-start! gap-2 py-5!"
          onClick={onSelectFromSystem}
        >
          <AiOutlineLaptop size={20} />
          <p>انتخاب عکس از سیستم</p>
        </CustomButton>

        <CustomButton
          htmlType="button"
          className="flex w-full justify-start! gap-2 py-5!"
          onClick={onSelectFromPanelDefaults}
        >
          <AiOutlinePicture size={20} />
          <p>انتخاب از عکس‌های پیش فرض پنل مدیریت تغذیه</p>
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default CateringMyFoodListImageUploadSourceModal;
