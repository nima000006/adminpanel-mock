import AdmissionDetailInfoCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailInfoCard/AdmissionDetailInfoCard";
import { ActiveAdmissionDetailStatisticsContentProps } from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailStatisticsContent/@types/@activeAdmissionDetailStatisticsContent";

const ActiveAdmissionDetailStatisticsContent = ({
  statistics,
}: ActiveAdmissionDetailStatisticsContentProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AdmissionDetailInfoCard
        title="تعداد کل ظرفیت‌های اقامتگاه"
        value={statistics.totalResidenceCapacities}
      />
      <AdmissionDetailInfoCard
        title="ظرفیت‌های این برنامه پذیرش"
        value={statistics.admissionProgramCapacities}
      />
      <AdmissionDetailInfoCard
        title="ظرفیت‌های اشغال‌شده (در حال حاضر)"
        value={statistics.occupiedCapacities}
      />
      <AdmissionDetailInfoCard title="کمترین قیمت" value={statistics.minPrice} isPrice />
      <AdmissionDetailInfoCard title="بیشترین قیمت" value={statistics.maxPrice} isPrice />
      <AdmissionDetailInfoCard
        title="کمترین ودیعه"
        value={statistics.minDeposit}
        isPrice
      />
      <AdmissionDetailInfoCard
        title="بیشترین ودیعه"
        value={statistics.maxDeposit}
        isPrice
      />
    </div>
  );
};

export default ActiveAdmissionDetailStatisticsContent;
