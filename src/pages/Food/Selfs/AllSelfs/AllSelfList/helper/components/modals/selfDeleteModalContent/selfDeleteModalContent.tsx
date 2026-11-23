import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";

const SelfDeleteModalContent = () => {
  return (
    <CustomAlert
      type="warning"
      showIcon
      description="لطفا توجه فرمایید که پس از حذف، امکان بازیابی این سلف وجود نخواهد داشت و سلف انتخاب شده به لیست  سلف های حذف شده منتقل خواهد شد."
    />
  );
};

export default SelfDeleteModalContent;
