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
import CateringSelfsContracts from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsContracts/CateringSelfsContracts";
import { GetDetailMySelfsContractsRequest } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

const CateringMySelfsContracts = () => {
  const { params: url } = useQueryParams();
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================  Api Calls ================================
  const [getDetailMySelfsContracts, { data: contractsData, isLoading }] =
    useGetDetailMySelfsContractsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.id) {
      return;
    }

    const request: GetDetailMySelfsContractsRequest = {
      params: {
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        restaurantIds: [Number(url.id)],
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        contractStatus: CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS,
        ...(url?.title && { title: url.title }),
        ...(url?.contractUUID && { contractUid: url.contractUUID }),
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

    getDetailMySelfsContracts(request);
  }, [
    url?.id,
    url?.page,
    url?.pageSize,
    url?.sortings,
    url?.title,
    url?.contractUUID,
    getDetailMySelfsContracts,
  ]);

  //* ================================ Util Functions ================================
  const onGetExcelFileBtn = () => {
    if (!url?.id) {
      return;
    }

    setIsDownloadLinkLoading(true);
    downloadCateringMySelfsContractsExcel({
      restaurantIds: [Number(url.id)],
      statusType: CATERING_STATUS_TYPES_MAIN_LIST,
      contractStatus: CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS,
      ...(url?.title && { title: url.title }),
      ...(url?.contractUUID && { contractUid: url.contractUUID }),
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
      <CateringSelfsContracts data={contractsData} isLoading={isLoading} />
    </div>
  );
};

export default CateringMySelfsContracts;
