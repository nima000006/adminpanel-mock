import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { downloadCateringMyFoodHistoryExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetMyFoodHistoryMutation } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CateringFoodHistoryRecordType } from "@pages/Catering/Foods/_shared/helper/components/CateringFoodHistory/@types/@cateringFoodHistory";
import CateringFoodHistory from "@pages/Catering/Foods/_shared/helper/components/CateringFoodHistory/CateringFoodHistory";
import {
  GetMyFoodHistoryRequest,
  GetMyFoodHistoryResponse,
} from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/@types/@cateringMyFoodHistory";
import CateringMyFoodHistoryDrawer from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/helper/components/CateringMyFoodHistoryDrawer/CateringMyFoodHistoryDrawer";

const CateringMyFoodHistory = () => {
  const { params: url } = useQueryParams();
  const [historyData, setHistoryData] = useState<GetMyFoodHistoryResponse | null>(null);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [selectedRevisionNumber, setSelectedRevisionNumber] = useState<number | null>(
    null
  );
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================  Api Calls ================================
  const [getMyFoodHistory, { isLoading }] = useGetMyFoodHistoryMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    fetchMyFoodHistory();
  }, [url?.id, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const onGetMyFoodHistorySuccess = (response: GetMyFoodHistoryResponse) => {
    setHistoryData(response);
  };

  const fetchMyFoodHistory = () => {
    if (!url?.id) {
      return;
    }

    const request: GetMyFoodHistoryRequest = {
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

    getMyFoodHistory(request).unwrap().then(onGetMyFoodHistorySuccess);
  };

  const openHistoryDrawerHandler = (record: CateringFoodHistoryRecordType) => {
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
    downloadCateringMyFoodHistoryExcel({
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

  //* ???????????????????????????? Main TSX ???????????????????????????? */
  return (
    <div className="flex flex-col gap-6">
      <ToolBox
        leftSide={
          <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
            ?????
          </CustomButton>
        }
      />
      <CateringFoodHistory
        data={historyData ?? undefined}
        isLoading={isLoading}
        onViewHandler={openHistoryDrawerHandler}
      />
      <CateringMyFoodHistoryDrawer
        open={isHistoryDrawerOpen}
        onClose={closeHistoryDrawerHandler}
        foodId={url?.id ? Number(url.id) : undefined}
        revisionNumber={selectedRevisionNumber}
      />
    </div>
  );
};

export default CateringMyFoodHistory;
