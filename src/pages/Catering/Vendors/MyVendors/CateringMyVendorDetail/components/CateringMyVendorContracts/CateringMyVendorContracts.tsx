import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { downloadCateringMySelfsContractsExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetDetailMySelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS } from "@pages/Catering/contracts/_shared/utils";
import { GetDetailMySelfsContractsResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";
import CateringVendorContracts from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorContracts/CateringVendorContracts";
import { GetDetailMyVendorsContractsRequest } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorContracts/@types/@cateringMyVendorContracts";

const DEFAULT_PAGE_SIZE = 8;

const CateringMyVendorContracts = () => {
  const { params: url } = useQueryParams();
  const [contractsData, setContractsData] =
    useState<GetDetailMySelfsContractsResponse | null>(null);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================  Api Calls ================================
  const [getDetailMyVendorsContracts, { isLoading }] =
    useGetDetailMySelfsContractsMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    fetchDetailMyVendorsContracts();
  }, [
    url?.id,
    url?.page,
    url?.pageSize,
    url?.sortings,
    url?.title,
    url?.contractUUID,
    url?.restaurantTitle,
  ]);

  //* ================================ Util Functions ================================
  const onGetDetailMyVendorsContractsSuccess = (
    response: GetDetailMySelfsContractsResponse
  ) => {
    setContractsData(response);
  };

  const fetchDetailMyVendorsContracts = () => {
    if (!url?.id) {
      return;
    }

    const request: GetDetailMyVendorsContractsRequest = {
      params: {
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : DEFAULT_PAGE_SIZE,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        vendorIds: [Number(url.id)],
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        contractStatus: CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS,
        ...(url?.title && { title: url.title }),
        ...(url?.contractUUID && { contractUid: url.contractUUID }),
        ...(url?.restaurantTitle && { restaurantTitle: url.restaurantTitle }),
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

    getDetailMyVendorsContracts(request)
      .unwrap()
      .then(onGetDetailMyVendorsContractsSuccess);
  };

  const onGetExcelFileBtn = () => {
    if (!url?.id) {
      return;
    }

    setIsDownloadLinkLoading(true);
    downloadCateringMySelfsContractsExcel({
      vendorIds: [Number(url.id)],
      statusType: CATERING_STATUS_TYPES_MAIN_LIST,
      contractStatus: CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS,
      ...(url?.title && { title: url.title }),
      ...(url?.contractUUID && { contractUid: url.contractUUID }),
      ...(url?.restaurantTitle && { restaurantTitle: url.restaurantTitle }),
    })
      .then((downloadLink) => {
        if (downloadLink?.length) {
          toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
        } else {
          toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
        }
      })
      .catch(() => {
        toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
      })
      .finally(() => {
        setIsDownloadLinkLoading(false);
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-6">
      <ToolBox
        leftSide={
          <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
            خروجی
          </CustomButton>
        }
      />
      <CateringVendorContracts data={contractsData ?? undefined} isLoading={isLoading} />
    </div>
  );
};

export default CateringMyVendorContracts;
