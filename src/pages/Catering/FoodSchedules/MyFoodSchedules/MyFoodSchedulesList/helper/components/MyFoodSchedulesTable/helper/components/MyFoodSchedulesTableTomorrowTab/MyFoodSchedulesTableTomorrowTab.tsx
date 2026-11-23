import { useEffect, useState } from "react";

import { Form } from "antd";
import moment from "jalali-moment";
import { AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadCateringMySelfsFoodScheduleExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_MY_FOOD_SCHEDULES_ADD_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetDetailMySelfsFoodScheduleMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES } from "@pages/Catering/_shared/utils";
import {
  MyFoodSchedulesTableTomorrowTabAdvanceFilterFormType,
  MyFoodSchedulesTableTomorrowTabRecordType,
} from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTableTomorrowTab/@types/@myFoodSchedulesTableTomorrowTab";
import useMyFoodSchedulesTableTomorrowTabAdvanceFilter from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTableTomorrowTab/helper/modals/advanceFilterModals/myFoodSchedulesTableTomorrowTabAdvanceFilter";
import MyFoodSchedulesTableTomorrowTabTableModel from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTableTomorrowTab/helper/models/MyFoodSchedulesTableTomorrowTab/MyFoodSchedulesTableTomorrowTabTableModel";
import { GetDetailMySelfsFoodScheduleRequest } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const HAS_SIDE_DISHES_HAS_ID = 1;

const advanceFilter = [
  "selfId",
  "foodId",
  "mealId",
  "foodProgramTypeId",
  "hasSideDishesId",
];

const MyFoodSchedulesTableTomorrowTab = () => {
  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<MyFoodSchedulesTableTomorrowTabAdvanceFilterFormType>();

  const { filterItemsList } = useMyFoodSchedulesTableTomorrowTabAdvanceFilter({
    advanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [
    getDetailMySelfsFoodSchedule,
    { data: foodScheduleData, isLoading: isGetDetailMySelfsFoodScheduleLoading },
  ] = useGetDetailMySelfsFoodScheduleMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    const request: GetDetailMySelfsFoodScheduleRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "reserveDate",
        sortDirection: "DESC",
      },
      body: {
        fromReserveDate: today,
        statusType: [
          CATERING_STATUS_TYPES.ACTIVE_SHOW,
          CATERING_STATUS_TYPES.ACTIVE_NOT_SHOW,
          CATERING_STATUS_TYPES.DELETED,
        ],
        ...(url?.selfId && {
          restaurantId: url.selfId.split(",").map(Number),
        }),
        ...(url?.foodId && {
          productId: url.foodId.split(",").map(Number),
        }),
        ...(url?.mealId && {
          mealId: url.mealId.split(",").map(Number),
        }),
        ...(url?.foodProgramTypeId && {
          requestType: url.foodProgramTypeId.split(",").map(Number),
        }),
        ...(url?.hasSideDishesId !== undefined &&
          url?.hasSideDishesId !== "" && {
            hasSidePlan: Number(url.hasSideDishesId) === HAS_SIDE_DISHES_HAS_ID,
          }),
      },
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting.sortOrder?.toUpperCase();
      }
    }

    getDetailMySelfsFoodSchedule(request);
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...advanceFilter.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onGetExcelFileBtn = () => {
    const today = moment().format("YYYY-MM-DD");

    setIsDownloadLinkLoading(true);
    downloadCateringMySelfsFoodScheduleExcel({
      fromReserveDate: today,
      statusType: [
        CATERING_STATUS_TYPES.ACTIVE_SHOW,
        CATERING_STATUS_TYPES.ACTIVE_NOT_SHOW,
        CATERING_STATUS_TYPES.DELETED,
      ],
      ...(url?.selfId && {
        restaurantId: url.selfId.split(",").map(Number),
      }),
      ...(url?.foodId && {
        productId: url.foodId.split(",").map(Number),
      }),
      ...(url?.mealId && {
        mealId: url.mealId.split(",").map(Number),
      }),
      ...(url?.foodProgramTypeId && {
        requestType: url.foodProgramTypeId.split(",").map(Number),
      }),
      ...(url?.hasSideDishesId !== undefined &&
        url?.hasSideDishesId !== "" && {
          hasSidePlan: Number(url.hasSideDishesId) === HAS_SIDE_DISHES_HAS_ID,
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

  const onAddFoodScheduleHandler = () => {
    navigate(CATERING_MY_FOOD_SCHEDULES_ADD_PAGE_ROUTE);
  };

  const onViewHandler = (_record: MyFoodSchedulesTableTomorrowTabRecordType) => {};

  const onEditHandler = (_record: MyFoodSchedulesTableTomorrowTabRecordType) => {};

  const onCopyHandler = (_record: MyFoodSchedulesTableTomorrowTabRecordType) => {};

  const onDeActiveHandler = (_record: MyFoodSchedulesTableTomorrowTabRecordType) => {};

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
          defaultParams={{ ...url }}
        />
      )}

      <div className="flex flex-col gap-4">
        <ToolBox
          className="btn-wrapper"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                type="default"
                icon={<AiOutlineFilter />}
                onClick={() => setAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2">
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={onAddFoodScheduleHandler}
              >
                افزودن برنامه غذایی
              </CustomButton>
              <CustomButton
                type="default"
                loading={isDownloadLinkLoading}
                onClick={onGetExcelFileBtn}
              >
                خروجی
              </CustomButton>
            </div>
          }
        />

        <CustomTable<MyFoodSchedulesTableTomorrowTabRecordType>
          dataSource={foodScheduleData?.content ?? []}
          loading={isGetDetailMySelfsFoodScheduleLoading}
          rowKey="id"
          columns={MyFoodSchedulesTableTomorrowTabTableModel({
            onView: onViewHandler,
            onEdit: onEditHandler,
            onCopy: onCopyHandler,
            onDeActive: onDeActiveHandler,
          })}
          pagination={manualPaginationConfig({
            total: foodScheduleData?.totalElements ?? 0,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
          })}
          draggableColumns
          draggableId={ExcelCodes.CATERING_MY_FOOD_SCHEDULES_TOMORROW_TAB_TABLE}
        />
      </div>
    </>
  );
};

export default MyFoodSchedulesTableTomorrowTab;
