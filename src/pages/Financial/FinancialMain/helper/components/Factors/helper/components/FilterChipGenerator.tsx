import { useSearchParams } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import "./_filterChip.scss";

const FilterChipGenerator = ({ isPaymentDisabled }: { isPaymentDisabled: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  const handleRemoveFilter = (keysToRemove: string[]) => {
    // Create a copy of the URL params
    const updatedUrl = { ...url };

    // Remove the specified key
    if (Array.isArray(keysToRemove)) {
      keysToRemove.forEach((key) => {
        delete updatedUrl[key];
      });
    } else {
      const keyToRemove = keysToRemove;
      delete updatedUrl[keyToRemove];
    }
    // Update the URL search params
    setSearchParams(updatedUrl);
  };

  return (
    <div className="finance-filter-chip-container">
      {url?.beneficiaryBranchCode && (
        <CustomTag
          color="orange"
          closable
          onClose={(e) => {
            e.preventDefault();
            handleRemoveFilter(["beneficiaryBranchCode"]);
          }}
        >
          فیلتر بر حسب ذینفع
        </CustomTag>
      )}
      {url?.branchCode && (
        <CustomTag
          color="orange"
          closable
          onClose={(e) => {
            e.preventDefault();
            handleRemoveFilter(["branchCode"]);
          }}
        >
          فیلتر بر حسب واحد دانشجو
        </CustomTag>
      )}
      {url?.nationalNumber && (
        <CustomTag
          color="orange"
          closable
          onClose={(e) => {
            e.preventDefault();
            handleRemoveFilter(["nationalNumber"]);
          }}
        >
          فیلتر بر حسب کد ملی
        </CustomTag>
      )}
      {url?.referenceNumber && (
        <CustomTag
          color="orange"
          closable
          onClose={(e) => {
            e.preventDefault();
            handleRemoveFilter(["referenceNumber"]);
          }}
        >
          فیلتر بر حسب ref
        </CustomTag>
      )}
      {url?.serviceName && (
        <CustomTag
          color="orange"
          closable
          onClose={(e) => {
            e.preventDefault();
            handleRemoveFilter(["serviceName"]);
          }}
        >
          فیلتر بر حسب نام سرویس
        </CustomTag>
      )}
      {url?.trackingNumber && (
        <CustomTag
          color="orange"
          closable
          onClose={(e) => {
            e.preventDefault();
            handleRemoveFilter(["trackingNumber"]);
          }}
        >
          فیلتر بر حسب کد پیگیری
        </CustomTag>
      )}
      {(url?.from || url?.to) && (
        <CustomTag
          color="orange"
          closable
          onClose={(e) => {
            e.preventDefault();
            handleRemoveFilter(["from", "to"]);
          }}
        >
          فیلتر بر حسب بازه زمانی
        </CustomTag>
      )}
      {url?.paymentStatus && !isPaymentDisabled && (
        <CustomTag
          color="orange"
          closable
          onClose={(e) => {
            e.preventDefault();
            handleRemoveFilter(["paymentStatus"]);
          }}
        >
          فیلتر بر حسب وضعیت پرداخت
        </CustomTag>
      )}
    </div>
  );
};

export default FilterChipGenerator;
