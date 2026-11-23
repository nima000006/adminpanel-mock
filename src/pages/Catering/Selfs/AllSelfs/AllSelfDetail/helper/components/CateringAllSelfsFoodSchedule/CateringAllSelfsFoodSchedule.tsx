import { useEffect, useState } from "react";

import { Form } from "antd";
import moment from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { downloadCateringAllSelfsFoodScheduleExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetDetailAllSelfsFoodScheduleMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import CateringSelfsFoodSchedule from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsFoodSchedule/CateringSelfsFoodSchedule";
import {
  CateringAllSelfsFoodScheduleAdvanceFilterFormType,
  GetDetailAllSelfsFoodScheduleRequest,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";
import useCateringAllSelfsFoodScheduleAdvanceFilter from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/helper/hooks/useCateringAllSelfsFoodScheduleAdvanceFilter/useCateringAllSelfsFoodScheduleAdvanceFilter";

const advanceFilter = [
  // advance filter keys
  "productId",
  "mealId",
  "requestTypeId",
  "hasSidePlanId",
  "dateDateStart",
  "dateDateEnd",
];
const CateringAllSelfsFoodSchedule = () => {
  const { params: url } = useQueryParams();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [form] = Form.useForm<CateringAllSelfsFoodScheduleAdvanceFilterFormType>();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  const { filterItemsList } = useCateringAllSelfsFoodScheduleAdvanceFilter({
    advanceModalOpen,
  });

  //? ================================  Api Calls ================================
  const [getDetailAllSelfsFoodSchedule, { data: foodScheduleData, isLoading }] =
    useGetDetailAllSelfsFoodScheduleMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.id) {
      return;
    }

    const request: GetDetailAllSelfsFoodScheduleRequest = {
      params: {
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        sortBy: "reserveDate",
        sortDirection: "DESC",
      },
      body: {
        ...(url?.id && {
          restaurantId: [Number(url.id)],
        }),
        ...(url?.productId && {
          productId: url.productId.split(",").map(Number),
        }),
        ...(url?.mealId && {
          mealId: url.mealId.split(",").map(Number),
        }),
        ...(url?.requestTypeId && {
          requestType: url.requestTypeId.split(",").map(Number),
        }),
        ...(url?.hasSidePlanId !== undefined &&
          url?.hasSidePlanId !== "" && {
            hasSidePlan: Number(url.hasSidePlanId) === 1,
          }),
        ...(url?.dateDateStart && {
          fromReserveDate: moment(url.dateDateStart).format("YYYY-MM-DD"),
        }),
        ...(url?.dateDateEnd && {
          toReserveDate: moment(url.dateDateEnd).format("YYYY-MM-DD"),
        }),
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

    getDetailAllSelfsFoodSchedule(request);
  }, [
    url?.id,
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...advanceFilter.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onGetExcelFileBtn = () => {
    if (!url?.id) {
      return;
    }

    setIsDownloadLinkLoading(true);
    downloadCateringAllSelfsFoodScheduleExcel({
      ...(url?.id && {
        restaurantId: [Number(url.id)],
      }),
      ...(url?.productId && {
        productId: url.productId.split(",").map(Number),
      }),
      ...(url?.mealId && {
        mealId: url.mealId.split(",").map(Number),
      }),
      ...(url?.requestTypeId && {
        requestType: url.requestTypeId.split(",").map(Number),
      }),
      ...(url?.hasSidePlanId !== undefined &&
        url?.hasSidePlanId !== "" && {
          hasSidePlan: Number(url.hasSidePlanId) === 1,
        }),
      ...(url?.dateDateStart && {
        fromReserveDate: moment(url.dateDateStart).format("YYYY-MM-DD"),
      }),
      ...(url?.dateDateEnd && {
        toReserveDate: moment(url.dateDateEnd).format("YYYY-MM-DD"),
      }),
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
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => {
            setAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={url}
        />
      )}
      <div className="flex flex-col gap-6">
        <ToolBox
          leftSide={
            <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
              خروجی
            </CustomButton>
          }
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
        />
        <CateringSelfsFoodSchedule data={foodScheduleData} isLoading={isLoading} />
      </div>
    </>
  );
};

export default CateringAllSelfsFoodSchedule;
