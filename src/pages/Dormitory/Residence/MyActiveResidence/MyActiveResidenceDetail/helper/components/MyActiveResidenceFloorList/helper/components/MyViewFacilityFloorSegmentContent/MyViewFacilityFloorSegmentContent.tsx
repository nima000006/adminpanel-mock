import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyActiveResidenceFloorDetailFacilitySegmentQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  getMyActiveResidenceFloorDetailFacilitySegmentResponse,
  MyViewFacilityFloorSegmentContentProps,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/components/MyViewFacilityFloorSegmentContent/@types/@myViewFacilityFloorSegmentContentTypes";
import { getMyActiveResidenceFloorDetailFacilitySegmentContent } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/components/MyViewFacilityFloorSegmentContent/@types/@myViewFacilityFloorSegmentContentTypes";
import MyViewFacilityFloorSegmentContentTableModel from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/model/MyViewFacilityFloorSegmentContentTableModel";

const MyViewFacilityFloorSegmentContent = ({
  id,
}: MyViewFacilityFloorSegmentContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [data, setData] =
    useState<getMyActiveResidenceFloorDetailFacilitySegmentResponse | null>(null);

  //? ================================ Api Calls ================================
  const [
    getMyActiveResidenceFloorDetailFacilitySegment,
    { isLoading: isGetMyActiveResidenceFloorDetailFacilitySegmentLoading },
  ] = useLazyGetMyActiveResidenceFloorDetailFacilitySegmentQuery();

  //? ================================ Effects ================================
  const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

  useEffect(() => {
    if (id) {
      getMyActiveResidenceFloorDetailFacilitySegment({
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
        .then((res: getMyActiveResidenceFloorDetailFacilitySegmentResponse) => {
          setData(res);
        });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // table column
  const column = MyViewFacilityFloorSegmentContentTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-10">
      <CustomTable<getMyActiveResidenceFloorDetailFacilitySegmentContent>
        dataSource={data?.content}
        loading={isGetMyActiveResidenceFloorDetailFacilitySegmentLoading}
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
export default MyViewFacilityFloorSegmentContent;
