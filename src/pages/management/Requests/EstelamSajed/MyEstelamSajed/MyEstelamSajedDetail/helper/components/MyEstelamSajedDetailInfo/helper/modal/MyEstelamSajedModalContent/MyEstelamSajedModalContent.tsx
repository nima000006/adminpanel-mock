const MyEstelamSajedModalContent = ({
  lastName,
  firstName,
  nationalCode,
}: {
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
}) => {
  return (
    <p>
      آیا می‌خواهید برای “{firstName} {lastName}” با کدملی“{nationalCode}” استعلام ساجد
      بگیرید؟ پس از استعلام در صورتی که نتیجه استعلام مثبت باشد می‌توانید از طریق “سایر
      سمت‌ها” نتیجه استعلام را چک نمایید.
    </p>
  );
};
export default MyEstelamSajedModalContent;
