import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";

const ResolveConflictResultModalContent = ({ showResult }: { showResult: boolean }) => {
  return (
    <div>
      {showResult ? (
        <CustomAlert
          showIcon
          title="تراکنش موفق!"
          description={`مبلغ ${1000} تومان از بانک دریافت گردیده است و به کیف پول کاربر واریز شد.`}
          type="success"
          className="body-regular"
        />
      ) : (
        <CustomAlert
          showIcon
          title="تراکنش ناموفق!"
          description="وضعیت تراکنش از “مغایرت بانکی” به “ناموفق” تغییر کرد."
          type="error"
          className="body-regular"
        />
      )}
    </div>
  );
};
export default ResolveConflictResultModalContent;
