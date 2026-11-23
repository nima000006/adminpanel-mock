import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetActiveResidenceFloorDetailFacilitySegmentQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  getActiveResidenceFloorDetailFacilitySegmentResponse,
  ViewFacilityFloorSegmentContentProps,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/components/ViewFacilityFloorSegmentContent/@types/@viewFacilityFloorSegmentContentTypes";
import { getActiveResidenceFloorDetailFacilitySegmentContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/components/ViewFacilityFloorSegmentContent/@types/@viewFacilityFloorSegmentContentTypes";
import ViewFacilityFloorSegmentContentTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/model/ViewFacilityFloorSegmentContentTableModel";

const ViewFacilityFloorSegmentContent = ({
  id,
}: ViewFacilityFloorSegmentContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [data, setData] =
    useState<getActiveResidenceFloorDetailFacilitySegmentResponse | null>(null);

  //? ================================ Api Calls ================================
  const [
    getActiveResidenceFloorDetailFacilitySegment,
    { isLoading: isGetActiveResidenceFloorDetailFacilitySegmentLoading },
  ] = useLazyGetActiveResidenceFloorDetailFacilitySegmentQuery();

  //? ================================ Effects ================================
  const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

  useEffect(() => {
    if (id) {
      getActiveResidenceFloorDetailFacilitySegment({
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
        .then((res: getActiveResidenceFloorDetailFacilitySegmentResponse) => {
          setData(res);
        });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // table column
  const column = ViewFacilityFloorSegmentContentTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-10">
      <CustomTable<getActiveResidenceFloorDetailFacilitySegmentContent>
        dataSource={data?.content}
        loading={isGetActiveResidenceFloorDetailFacilitySegmentLoading}
        columns={column}
        rowKey="uuid"
        pagination={manualPaginationConfig({
          total: data?.totalElements || 0,
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
export default ViewFacilityFloorSegmentContent;
