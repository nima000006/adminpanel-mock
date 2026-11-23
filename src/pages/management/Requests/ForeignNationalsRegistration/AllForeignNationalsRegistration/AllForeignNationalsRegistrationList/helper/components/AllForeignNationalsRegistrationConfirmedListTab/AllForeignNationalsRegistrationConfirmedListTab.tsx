import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllForeignListQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import { FOREIGN_NATIONAL_CONFIRMED } from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import {
  AllForeignFiltersRequest,
  AllForeignListItemType,
  AllForeignListResponse,
  UseForeignNationalsRegistrationAdvanceFilterFormType,
} from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/@types/@allForeignNationalsRegistrationListTypes";
import useForeignNationalsRegistrationAdvanceFilter from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/helper/model/advanceFilterModals/useForeignNationalsRegistrationAdvanceFilter";
import AllForeignNationalsRegistrationReviewTableModel from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/helper/model/AllForeignNationalsRegistrationReviewTableModel";

const advanceFilterItems = [
  "dateDateStart",
  "dateDateEnd",
  //search
  "firstName",
  "lastName",
  "internationalCode",
  "mobileNumber",
  "studentNumber",
  "saurgCode",
  "sortings",
];

const AllForeignNationalsRegistrationConfirmedListTab = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [totalPages, setTotalPages] = useState(0);
  const [dataSource, setDataSource] = useState<AllForeignListItemType[] | []>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseForeignNationalsRegistrationAdvanceFilterFormType>();

  const { filterItemsList } = useForeignNationalsRegistrationAdvanceFilter();

  //? ================================  Api Calls ================================
  // list
  const [getList, { isFetching: isGetListLoading }] = useLazyGetAllForeignListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const requestParams = {
      pageNo: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
    };

    if (url?.status === FOREIGN_NATIONAL_CONFIRMED) {
      const offsetMinutes = dayjs().utcOffset();
      const filters: AllForeignFiltersRequest = {
        ...(url?.firstName && { firstName: url?.firstName }),
        ...(url?.lastName && { lastName: url?.lastName }),
        ...(url?.internationalCode && { internationalCode: url?.internationalCode }),
        ...(url?.mobileNumber && { mobileNumber: url?.mobileNumber }),
        ...(url?.studentNumber && { studentNumber: url?.studentNumber }),
        ...(url?.saurgCode && { saorgCode: url?.saurgCode }),
        ...(url?.dateDateStart && {
          fromDate: jalaliToGregorianWithoutZ(
            dayjs(url.dateDateStart).startOf("day").add(offsetMinutes, "minute")
          ),
        }),

        ...(url?.dateDateEnd && {
          toDate: (() => {
            const toDate = dayjs(url.dateDateEnd);
            const now = dayjs();
            const isToday = toDate.isSame(now, "day");

            const value = isToday
              ? now.add(offsetMinutes, "minute")
              : toDate.endOf("day").add(offsetMinutes, "minute");

            return jalaliToGregorianWithoutZ(value);
          })(),
        }),
      };

      // sortings
      if (url?.sortings) {
        const sorting = JSON.parse(url.sortings)?.[0];

        if (sorting?.sortBy && sorting?.sortOrder) {
          // filters.sortBy = sorting.sortBy;
          filters.sortDirection = sorting.sortOrder.toUpperCase();
        }
      }

      getList({
        pageNumber: requestParams.pageNo,
        pageSize: requestParams.pageSize,
        requestsStatus: FOREIGN_NATIONAL_CONFIRMED,
        ...filters,
      })
        .unwrap()
        .then(getListSuccess);
    }
  }, [
    url?.page,
    url?.pageSize,
    url?.status,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  // success
  const getListSuccess = (res: AllForeignListResponse) => {
    setDataSource(res?.content);
    setTotalPages(res?.totalElements);
  };

  // advance filter handler
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}

      <div>
        <CustomDivider text="لیست درخواست‌های ثبت نام اتباع" />
        <div className="flex flex-col gap-4">
          <ToolBox
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  type="default"
                  icon={<AiOutlineFilter />}
                  onClick={openAdvanceFilterHandler}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <CustomButton type="primary" ghost disabled>
                خروجی
              </CustomButton>
            }
          />
          <CustomTable<AllForeignListItemType>
            dataSource={dataSource}
            rowKey="id"
            loading={isGetListLoading}
            columns={AllForeignNationalsRegistrationReviewTableModel({
              type: FOREIGN_NATIONAL_CONFIRMED,
            })}
            pagination={manualPaginationConfig({
              total: totalPages,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url?.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
            })}
            key={`table-${url?.pageSize || "8"} `}
          />
        </div>
      </div>
    </>
  );
};
export default AllForeignNationalsRegistrationConfirmedListTab;
