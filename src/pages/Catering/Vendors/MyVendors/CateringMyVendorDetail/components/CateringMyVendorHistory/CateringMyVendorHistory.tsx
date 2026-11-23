import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { downloadCateringMyVendorHistoryExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetMyVendorHistoryMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CateringVendorHistoryRecordType } from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/@types/@cateringVendorHistory";
import CateringVendorHistory from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/CateringVendorHistory";
import {
  GetMyVendorHistoryRequest,
  GetMyVendorHistoryResponse,
} from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorHistory/@types/@cateringMyVendorHistory";
import CateringMyVendorHistoryDrawer from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorHistory/helper/components/CateringMyVendorHistoryDrawer/CateringMyVendorHistoryDrawer";

const CateringMyVendorHistory = () => {
  const { params: url } = useQueryParams();
  const [historyData, setHistoryData] = useState<GetMyVendorHistoryResponse | null>(null);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [selectedRevisionNumber, setSelectedRevisionNumber] = useState<number | null>(
    null
  );
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================  Api Calls ================================
  const [getMyVendorHistory, { isLoading }] = useGetMyVendorHistoryMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    fetchMyVendorHistory();
  }, [url?.id, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const onGetMyVendorHistorySuccess = (response: GetMyVendorHistoryResponse) => {
    setHistoryData(response);
  };

  const fetchMyVendorHistory = () => {
    if (!url?.id) {
      return;
    }

    const request: GetMyVendorHistoryRequest = {
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

    getMyVendorHistory(request).unwrap().then(onGetMyVendorHistorySuccess);
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
    downloadCateringMyVendorHistoryExcel({
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
      <CateringMyVendorHistoryDrawer
        open={isHistoryDrawerOpen}
        onClose={closeHistoryDrawerHandler}
        vendorId={url?.id ? Number(url.id) : undefined}
        revisionNumber={selectedRevisionNumber}
      />
    </div>
  );
};

export default CateringMyVendorHistory;
