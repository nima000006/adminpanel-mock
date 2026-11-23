import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { downloadCateringAllSelfsContractsExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetDetailAllSelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS } from "@pages/Catering/contracts/_shared/utils";
import { GetDetailAllSelfsContractsResponse } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";
import CateringVendorContracts from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorContracts/CateringVendorContracts";
import { GetDetailAllVendorsContractsRequest } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorContracts/@types/@cateringAllVendorContracts";

const DEFAULT_PAGE_SIZE = 8;

const CateringAllVendorContracts = () => {
  const { params: url } = useQueryParams();
  const [contractsData, setContractsData] =
    useState<GetDetailAllSelfsContractsResponse | null>(null);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================  Api Calls ================================
  const [getDetailAllVendorsContracts, { isLoading }] =
    useGetDetailAllSelfsContractsMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    fetchDetailAllVendorsContracts();
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
  const onGetDetailAllVendorsContractsSuccess = (
    response: GetDetailAllSelfsContractsResponse
  ) => {
    setContractsData(response);
  };

  const fetchDetailAllVendorsContracts = () => {
    if (!url?.id) {
      return;
    }

    const request: GetDetailAllVendorsContractsRequest = {
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

    getDetailAllVendorsContracts(request)
      .unwrap()
      .then(onGetDetailAllVendorsContractsSuccess);
  };

  const onGetExcelFileBtn = () => {
    if (!url?.id) {
      return;
    }

    setIsDownloadLinkLoading(true);
    downloadCateringAllSelfsContractsExcel({
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

export default CateringAllVendorContracts;
