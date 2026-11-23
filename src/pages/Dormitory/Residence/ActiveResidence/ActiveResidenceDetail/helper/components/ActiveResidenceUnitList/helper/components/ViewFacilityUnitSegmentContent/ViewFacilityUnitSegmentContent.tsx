import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetRoomAmenitiesSelectAndValueQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  GetRoomAmenitiesSelectAndValueContent,
  GetRoomAmenitiesSelectAndValueResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/@types/@activeResidenceUnitListType";
import { ViewFacilityUnitSegmentContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ViewUnitDrawerContent/@types/@viewUnitDrawerContentTypes";
import ViewFacilityUnitSegmentContentTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/model/ViewFacilityUnitSegmentContentTableModel";

const ViewFacilityUnitSegmentContent = ({ id }: ViewFacilityUnitSegmentContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] =
    useState<GetRoomAmenitiesSelectAndValueResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getRoomAmenitiesSelectAndValue, { isFetching: isGetRoomAmenitiesLoading }] =
    useLazyGetRoomAmenitiesSelectAndValueQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (!id || id === "-1") return;

    const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

    getRoomAmenitiesSelectAndValue({
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
  const column = ViewFacilityUnitSegmentContentTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-10">
      <CustomTable<GetRoomAmenitiesSelectAndValueContent>
        dataSource={dataSource?.content}
        loading={isGetRoomAmenitiesLoading}
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
export default ViewFacilityUnitSegmentContent;
