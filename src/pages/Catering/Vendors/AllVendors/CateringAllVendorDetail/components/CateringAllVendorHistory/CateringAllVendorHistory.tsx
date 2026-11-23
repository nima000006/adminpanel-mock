import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { downloadCateringAllVendorHistoryExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAllVendorHistoryMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CateringVendorHistoryRecordType } from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/@types/@cateringVendorHistory";
import CateringVendorHistory from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/CateringVendorHistory";
import {
  GetAllVendorHistoryRequest,
  GetAllVendorHistoryResponse,
} from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorHistory/@types/@cateringAllVendorHistory";
import CateringAllVendorHistoryDrawer from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorHistory/helper/components/CateringAllVendorHistoryDrawer/CateringAllVendorHistoryDrawer";

const CateringAllVendorHistory = () => {
  const { params: url } = useQueryParams();
  const [historyData, setHistoryData] = useState<GetAllVendorHistoryResponse | null>(
    null
  );
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [selectedRevisionNumber, setSelectedRevisionNumber] = useState<number | null>(
    null
  );
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================  Api Calls ================================
  const [getAllVendorHistory, { isLoading }] = useGetAllVendorHistoryMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    fetchAllVendorHistory();
  }, [url?.id, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const onGetAllVendorHistorySuccess = (response: GetAllVendorHistoryResponse) => {
    setHistoryData(response);
  };

  const fetchAllVendorHistory = () => {
    if (!url?.id) {
      return;
    }

    const request: GetAllVendorHistoryRequest = {
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

    getAllVendorHistory(request).unwrap().then(onGetAllVendorHistorySuccess);
  };

  const openHistoryDrawerHandler = (record: CateringVendorHistoryRecordType) => {
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
    downloadCateringAllVendorHistoryExcel({
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
      <CateringVendorHistory
        data={historyData ?? undefined}
        isLoading={isLoading}
        onViewHandler={openHistoryDrawerHandler}
      />
      <CateringAllVendorHistoryDrawer
        open={isHistoryDrawerOpen}
        onClose={closeHistoryDrawerHandler}
        vendorId={url?.id ? Number(url.id) : undefined}
        revisionNumber={selectedRevisionNumber}
      />
    </div>
  );
};

export default CateringAllVendorHistory;
