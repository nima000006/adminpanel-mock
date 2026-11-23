import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";

const FoodDeleteModalContent = () => {
  return (
    <CustomAlert
      type="warning"
      showIcon
      description="لطفا توجه فرمایید که پس از حذف، امکان بازیابی این غذا وجود نخواهد داشت و غذای انتخاب شده به لیست  غذا های حذف شده منتقل خواهد شد."
    />
  );
};

export default FoodDeleteModalContent;
