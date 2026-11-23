import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyRoomAmenitiesSelectAndValueQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  GetRoomAmenitiesSelectAndValueContent,
  GetRoomAmenitiesSelectAndValueResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/@types/@myActiveResidenceUnitListType";
import { MyViewFacilityUnitSegmentContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/drawer/MyViewUnitDrawerContent/@types/@myViewUnitDrawerContentTypes";
import MyViewFacilityUnitSegmentContentTableModel from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/model/MyViewFacilityUnitSegmentContentTableModel";

const MyViewFacilityUnitSegmentContent = ({
  id,
}: MyViewFacilityUnitSegmentContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] =
    useState<GetRoomAmenitiesSelectAndValueResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getMyRoomAmenitiesSelectAndValue, { isFetching: isGetMyRoomAmenitiesLoading }] =
    useLazyGetMyRoomAmenitiesSelectAndValueQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (!id || id === "-1") return;

    const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

    getMyRoomAmenitiesSelectAndValue({
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
      .then((res: GetRoomAmenitiesSelectAndValueResponse) => {
        setDataSource(res);
      });
  }, [id, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  // table column
  const column = MyViewFacilityUnitSegmentContentTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-10">
      <CustomTable<GetRoomAmenitiesSelectAndValueContent>
        dataSource={dataSource?.content}
        loading={isGetMyRoomAmenitiesLoading}
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
export default MyViewFacilityUnitSegmentContent;
