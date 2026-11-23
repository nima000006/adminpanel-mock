import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetDetailAllSelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { AllContractsListRequestsCopiedDrawerContentFoodsProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/helper/components/AllContractsListRequestsCopiedDrawerContent/helper/components/AllContractsListRequestsCopiedDrawerContentFoods/@types/@allContractsListRequestsCopiedDrawerContentFoods";
import AllContractsListRequestsCopiedDrawerContentFoodsTableModel from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/helper/components/AllContractsListRequestsCopiedDrawerContent/helper/components/AllContractsListRequestsCopiedDrawerContentFoods/helper/models/AllContractsListRequestsCopiedDrawerContentFoodsTableModel/AllContractsListRequestsCopiedDrawerContentFoodsTableModel";
import {
  GetDetailAllSelfsProductsContent,
  GetDetailAllSelfsProductsRequest,
  GetDetailAllSelfsProductsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

function AllContractsListRequestsCopiedDrawerContentFoods({
  contractId,
  onFoodsCountChange,
}: AllContractsListRequestsCopiedDrawerContentFoodsProps) {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetDetailAllSelfsProductsContent[]>([]);
  const [total, setTotal] = useState(0);

  //? ================================ Api Calls ================================
  const [getDetailAllSelfsProducts, { isLoading: isGetDetailAllSelfsProductsLoading }] =
    useGetDetailAllSelfsProductsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!contractId) {
      setDataSource([]);
      setTotal(0);
      onFoodsCountChange?.(0);
      return;
    }

    const request: GetDetailAllSelfsProductsRequest = {
      params: {
        pageNumber: url?.foodsPage ? Number(url.foodsPage) - 1 : 0,
        pageSize: url?.foodsPageSize ? Number(url.foodsPageSize) : 8,
      },
      body: {
        contractIds: [contractId],
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

    getDetailAllSelfsProducts(request)
      .unwrap()
      .then((res: GetDetailAllSelfsProductsResponse) => {
        const content = res?.content ?? [];
        const totalElements = res?.totalElements ?? content.length;
        setDataSource(content);
        setTotal(totalElements);
        onFoodsCountChange?.(totalElements);
      });
  }, [
    contractId,
    getDetailAllSelfsProducts,
    onFoodsCountChange,
    url?.foodsPage,
    url?.foodsPageSize,
    url?.sortings,
    url?.viewTitle,
  ]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-5!">
      <CustomTable<GetDetailAllSelfsProductsContent>
        dataSource={dataSource}
        rowKey="id"
        loading={isGetDetailAllSelfsProductsLoading}
        columns={AllContractsListRequestsCopiedDrawerContentFoodsTableModel()}
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

export default AllContractsListRequestsCopiedDrawerContentFoods;
