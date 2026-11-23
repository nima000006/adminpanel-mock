import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { downloadCateringMySelfsHistoryExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetDetailMySelfsHistoryMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CateringSelfsHistoryRecordType } from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsHistory/@types/@cateringSelfsHistory";
import CateringSelfsHistory from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsHistory/CateringSelfsHistory";
import { GetDetailMySelfsHistoryRequest } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsHistory/@types/@cateringMySelfsHistory";
import CateringMySelfsHistoryDrawer from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsHistory/helper/components/CateringMySelfsHistoryDrawer/CateringMySelfsHistoryDrawer";

const CateringMySelfsHistory = () => {
  const { params: url } = useQueryParams();
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [selectedRevisionNumber, setSelectedRevisionNumber] = useState<number | null>(
    null
  );
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================  Api Calls ================================
  const [getDetailMySelfsHistory, { data: historyData, isLoading }] =
    useGetDetailMySelfsHistoryMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.id) {
      return;
    }

    const request: GetDetailMySelfsHistoryRequest = {
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

    getDetailMySelfsHistory(request);
  }, [url?.id, url?.page, url?.pageSize, url?.sortings, getDetailMySelfsHistory]);

  //* ================================ Util Functions ================================
  const openHistoryDrawerHandler = (record: CateringSelfsHistoryRecordType) => {
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
    downloadCateringMySelfsHistoryExcel({
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
      <CateringSelfsHistory
        data={historyData}
        isLoading={isLoading}
        onViewHandler={openHistoryDrawerHandler}
      />
      <CateringMySelfsHistoryDrawer
        open={isHistoryDrawerOpen}
        onClose={closeHistoryDrawerHandler}
        restaurantId={url?.id ? Number(url.id) : undefined}
        revisionNumber={selectedRevisionNumber}
      />
    </div>
  );
};

export default CateringMySelfsHistory;
