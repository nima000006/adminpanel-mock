import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";

const DeleteModalContent = () => {
  return (
    <CustomAlert
      type="warning"
      showIcon
      description="لطفا توجه فرمایید که پس از حذف، امکان بازیابی تأمین کننده وجود نخواهد داشت و  تأمین کننده انتخاب شده به لیست  تأمین کننده‌های حذف شده منتقل خواهد شد."
    />
  );
};

export default DeleteModalContent;
