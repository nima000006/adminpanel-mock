import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetDetailMySelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoodsProps } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListRejected/helper/components/RequestMyContractsListRejectedRenewedAndCopiedDrawerContent/helper/components/RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoods/@types/@requestMyContractsListRejectedRenewedAndCopiedDrawerContentFoods";
import RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoodsTableModel from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListRejected/helper/components/RequestMyContractsListRejectedRenewedAndCopiedDrawerContent/helper/components/RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoods/helper/models/RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoodsTableModel/RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoodsTableModel";
import {
  GetDetailMySelfsProductsContent,
  GetDetailMySelfsProductsRequest,
  GetDetailMySelfsProductsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

function RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoods({
  contractId,
  onFoodsCountChange,
}: RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoodsProps) {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetDetailMySelfsProductsContent[]>([]);
  const [total, setTotal] = useState(0);

  //? ================================ Api Calls ================================
  const [getDetailMySelfsProducts, { isLoading: isGetDetailMySelfsProductsLoading }] =
    useGetDetailMySelfsProductsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!contractId) {
      setDataSource([]);
      setTotal(0);
      onFoodsCountChange?.(0);
      return;
    }

    const request: GetDetailMySelfsProductsRequest = {
      params: {
        pageNumber: url?.foodsPage ? Number(url.foodsPage) - 1 : 0,
        pageSize: url?.foodsPageSize ? Number(url.foodsPageSize) : 8,
      },
      body: {
        contractIds: [contractId],
        // todo[nima]: uncomment this when the API is ready
        // ...(url?.baseProductTitle && { baseProductTitle: url.baseProductTitle }),
        ...(url?.viewTitle && { title: url.viewTitle }),
      },
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting?.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting?.sortOrder?.toUpperCase();
      }
    }

    getDetailMySelfsProducts(request)
      .unwrap()
      .then((res: GetDetailMySelfsProductsResponse) => {
        const content = res?.content ?? [];
        const totalElements = res?.totalElements ?? content.length;
        setDataSource(content);
        setTotal(totalElements);
        onFoodsCountChange?.(totalElements);
      });
  }, [
    contractId,
    getDetailMySelfsProducts,
    onFoodsCountChange,
    url?.foodsPage,
    url?.foodsPageSize,
    url?.sortings,
    url?.viewTitle,
  ]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-5!">
      <CustomTable<GetDetailMySelfsProductsContent>
        dataSource={dataSource}
        rowKey="id"
        loading={isGetDetailMySelfsProductsLoading}
        columns={RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoodsTableModel()}
        pagination={manualPaginationConfig({
          total,
          onChange: (page: number, pageSize: number) => {
            setSearchParams({
              ...url,
              foodsPage: page?.toString(),
              foodsPageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.foodsPage ? Number(url.foodsPage) : 1,
          defaultPageSize: url?.foodsPageSize ? Number(url.foodsPageSize) : 8,
        })}
      />
    </div>
  );
}

export default RequestMyContractsListRejectedRenewedAndCopiedDrawerContentFoods;
