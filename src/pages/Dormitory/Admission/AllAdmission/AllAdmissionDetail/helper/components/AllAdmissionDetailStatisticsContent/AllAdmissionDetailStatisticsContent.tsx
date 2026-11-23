import { useEffect } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllAdmissionDetailStatisticsPriceQuery,
  useLazyGetAllAdmissionDetailStatisticsTabQuery,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import AdmissionDetailInfoCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailInfoCard/AdmissionDetailInfoCard";
import {
  GetAllAdmissionDetailStatisticsPriceContent,
  GetAllAdmissionDetailStatisticsPriceRequest,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/helper/components/AllAdmissionDetailStatisticsContent/@types/@allAdmissionDetailStatisticsContent";
import AllAdmissionDetailStatisticsContentTableModel from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/helper/components/AllAdmissionDetailStatisticsContent/helper/models/AllAdmissionDetailStatisticsContentTableModel/AllAdmissionDetailStatisticsContentTableModel";

const AllAdmissionDetailStatisticsContent = () => {
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================ Api Calls ================================
  const [
    getAllAdmissionDetailStatisticsTab,
    {
      data: getAllAdmissionDetailStatisticsTabData,
      isFetching: isGetAllAdmissionDetailStatisticsTabLoading,
    },
  ] = useLazyGetAllAdmissionDetailStatisticsTabQuery();

  // price
  const [
    getAllAdmissionDetailStatisticsPrice,
    {
      data: getAllAdmissionDetailStatisticsPriceData,
      isFetching: isGetAllAdmissionDetailStatisticsPriceLoading,
    },
  ] = useLazyGetAllAdmissionDetailStatisticsPriceQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (!url?.id) return;

    getAllAdmissionDetailStatisticsTab(url.id);
  }, [url?.id]);

  // price
  useEffect(() => {
    if (!url?.id) return;

    const request: GetAllAdmissionDetailStatisticsPriceRequest = {
      uuid: url.id,
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        request.sortBy = sorting.sortBy;
      } else {
        delete request.sortBy;
      }

      if (sorting?.sortOrder) {
        request.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete request.sortDirection;
      }
    }

    getAllAdmissionDetailStatisticsPrice(request);
  }, [url?.id, url?.page, url?.pageSize, url?.sortings]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <Div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        loading={isGetAllAdmissionDetailStatisticsTabLoading}
      >
        <AdmissionDetailInfoCard
          title="ظرفیت اسمی اقامتگاه"
          value={getAllAdmissionDetailStatisticsTabData?.nominalCapacity}
        />
        <AdmissionDetailInfoCard
          title="تعداد کل ظرفیت‌های اقامتگاه"
          value={getAllAdmissionDetailStatisticsTabData?.totalBedCount}
        />
        <AdmissionDetailInfoCard
          title="ظرفیت‌های برنامه پذیرش"
          value={getAllAdmissionDetailStatisticsTabData?.planBedCount}
        />
        <AdmissionDetailInfoCard
          title="ظرفیت‌های اشغال‌شده (در حال حاضر)"
          value={getAllAdmissionDetailStatisticsTabData?.occupiedCount}
        />
        <AdmissionDetailInfoCard
          title="ظرفیت‌های بدون برنامه پذیرش (در بازه مجاز اسکان این برنامه پذیرش)"
          value={getAllAdmissionDetailStatisticsTabData?.unassignedBedCount}
        />
        <AdmissionDetailInfoCard
          title="کمترین قیمت"
          value={getAllAdmissionDetailStatisticsTabData?.minPrice}
          isPrice
        />
        <AdmissionDetailInfoCard
          title="بیشترین قیمت"
          value={getAllAdmissionDetailStatisticsTabData?.maxPrice}
          isPrice
        />
        <AdmissionDetailInfoCard
          title="کمترین ودیعه"
          value={getAllAdmissionDetailStatisticsTabData?.minDeposit}
          isPrice
        />
        <AdmissionDetailInfoCard
          title="بیشترین ودیعه"
          value={getAllAdmissionDetailStatisticsTabData?.maxDeposit}
          isPrice
        />
      </Div>

      <div className="flex flex-col gap-4">
        <CustomDivider text="قیمت‌های استفاده شده" />
        <CustomTable<GetAllAdmissionDetailStatisticsPriceContent>
          loading={isGetAllAdmissionDetailStatisticsPriceLoading}
          dataSource={getAllAdmissionDetailStatisticsPriceData?.content ?? []}
          columns={AllAdmissionDetailStatisticsContentTableModel()}
          rowKey={(_, index) => `${index}`}
          pagination={manualPaginationConfig({
            total: getAllAdmissionDetailStatisticsPriceData?.totalElements ?? 0,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
          })}
        />
      </div>
    </div>
  );
};

export default AllAdmissionDetailStatisticsContent;
