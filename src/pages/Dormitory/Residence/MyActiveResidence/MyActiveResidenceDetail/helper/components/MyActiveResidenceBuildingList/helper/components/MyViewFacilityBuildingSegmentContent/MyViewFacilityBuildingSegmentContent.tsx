import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyActiveResidenceBuildingDetailFacilitySegmentQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  getMyActiveResidenceBuildingDetailFacilitySegmentContent,
  getMyActiveResidenceBuildingDetailFacilitySegmentResponse,
  MyViewFacilityBuildingSegmentContentProps,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyViewFacilityBuildingSegmentContent/@types/@myViewFacilityBuildingSegmentContentTypes";
import MyViewFacilityBuildingSegmentContentTableModel from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/model/MyViewFacilityBuildingSegmentContentTableModel";

const MyViewFacilityBuildingSegmentContent = ({
  id,
}: MyViewFacilityBuildingSegmentContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  const [dataSource, setDataSource] =
    useState<getMyActiveResidenceBuildingDetailFacilitySegmentResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getFacilitySegment, { isLoading: isFacilitySegmentLoading }] =
    useLazyGetMyActiveResidenceBuildingDetailFacilitySegmentQuery();

  //? ================================ Effects ================================
  const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

  useEffect(() => {
    if (id) {
      getFacilitySegment({
        uuid: id,
        params: {
          pageNumber: url?.page ? Number(url.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url.pageSize) : 8,
          ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
          ...(sorting?.sortOrder && {
            sortDirection: String(sorting.sortOrder).toUpperCase(),
          }),
        },
      })
        .unwrap()
        .then((res: getMyActiveResidenceBuildingDetailFacilitySegmentResponse) => {
          setDataSource(res);
        });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // table column
  const column = MyViewFacilityBuildingSegmentContentTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-10">
      <CustomTable<getMyActiveResidenceBuildingDetailFacilitySegmentContent>
        dataSource={dataSource?.content}
        loading={isFacilitySegmentLoading}
        columns={column}
        rowKey="uuid"
        pagination={manualPaginationConfig({
          total: dataSource?.totalElements || 0,
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
        key={`table-${url?.pageSize || "8"}`}
      />
    </div>
  );
};
export default MyViewFacilityBuildingSegmentContent;
