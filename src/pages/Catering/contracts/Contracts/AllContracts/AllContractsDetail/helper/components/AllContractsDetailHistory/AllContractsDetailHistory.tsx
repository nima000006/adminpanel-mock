import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { downloadCateringAllContractHistoryExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAllContractHistoryMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { ContractsDetailHistoryRecordType } from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailHistory/@types/@contractsDetailHistory";
import ContractsDetailHistory from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailHistory/ContractsDetailHistory";
import {
  GetAllContractHistoryRequest,
  GetAllContractHistoryResponse,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailHistory/@types/@allContractsDetailHistory";
import AllContractsDetailHistoryDrawer from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailHistory/helper/components/AllContractsDetailHistoryDrawer/AllContractsDetailHistoryDrawer";

const AllContractsDetailHistory = () => {
  const { params: url } = useQueryParams();
  const [historyData, setHistoryData] = useState<GetAllContractHistoryResponse | null>(
    null
  );
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [selectedRevisionNumber, setSelectedRevisionNumber] = useState<number | null>(
    null
  );
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================  Api Calls ================================
  const [getAllContractHistory, { isLoading }] = useGetAllContractHistoryMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    fetchAllContractHistory();
  }, [url?.id, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const onGetAllContractHistorySuccess = (response: GetAllContractHistoryResponse) => {
    setHistoryData(response);
  };

  const fetchAllContractHistory = () => {
    if (!url?.id) {
      return;
    }

    const request: GetAllContractHistoryRequest = {
      params: {
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      },
      body: {
        id: Number(url.id),
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

    getAllContractHistory(request).unwrap().then(onGetAllContractHistorySuccess);
  };

  const openHistoryDrawerHandler = (record: ContractsDetailHistoryRecordType) => {
    setSelectedRevisionNumber(record.revisionNumber);
    setIsHistoryDrawerOpen(true);
  };

  const closeHistoryDrawerHandler = () => {
    setIsHistoryDrawerOpen(false);
    setSelectedRevisionNumber(null);
  };

  const onGetExcelFileBtn = () => {
    if (!url?.id) {
      return;
    }

    setIsDownloadLinkLoading(true);
    downloadCateringAllContractHistoryExcel({
      id: Number(url.id),
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
      <ContractsDetailHistory
        data={historyData ?? undefined}
        isLoading={isLoading}
        onViewHandler={openHistoryDrawerHandler}
      />
      <AllContractsDetailHistoryDrawer
        open={isHistoryDrawerOpen}
        onClose={closeHistoryDrawerHandler}
        contractId={url?.id ? Number(url.id) : undefined}
        revisionNumber={selectedRevisionNumber}
      />
    </div>
  );
};

export default AllContractsDetailHistory;
