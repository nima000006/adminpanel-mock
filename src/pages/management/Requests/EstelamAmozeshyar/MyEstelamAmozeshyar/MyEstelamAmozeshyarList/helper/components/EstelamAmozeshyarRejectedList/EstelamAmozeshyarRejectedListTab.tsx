import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetMyAmozeshyarListAdvanceFilterMutation,
  useLazyGetMyEstelamAmozeshyarListQuery,
} from "@infra/states/redux/Apis/management/requests/requestApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import {
  ESTELAM_AMOZESHYAR_REJECTED,
  EstelamAmozeshyarListTabsKeys,
} from "@pages/management/Requests/EstelamAmozeshyar/_shared/utils/estelamAmozeshyarUtil";

import useEstelamMyAmozeshyarAdvanceFilter from "../../modals/advanceFilterModals/EstelamMyAmozeshyarAdvanceFilter";
import ManagementMyEstelamAmozeshyarTableModel from "../../models/ManagementEstelamAmozeshyar/ManagementEstelamAmozeshyarTableModel";
import {
  EstelamMyAmozeshyarByAdvanceFilterRequest,
  EstelamMyAmozeshyarListItemType,
  UseEstelamMyAmozeshyarAdvanceFilterFormType,
} from "../EstelamAmozeshyarWaitingReviewList/@types/@estelamAmozeshyarWaitingReviewListTab";
import "./_estelamAmozeshyarRejectedListTab.scss";

const advanceFilterItems = [
  "username",
  "studentNumber",
  "firstName",
  "lastName",
  "mobileNo",
  "dateDateStart",
  "dateDateEnd",
];

const EstelamAmozeshyarRejectedListTab = () => {
  const [dataSource, setDataSource] = useState<EstelamMyAmozeshyarListItemType[] | []>(
    []
  );
  const [totalPages, setTotalPages] = useState(0);

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseEstelamMyAmozeshyarAdvanceFilterFormType>();

  const { filterItemsList } = useEstelamMyAmozeshyarAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isGetListLoading }] =
    useLazyGetMyEstelamAmozeshyarListQuery();

  const [getListByAdvanceFilter, { isLoading: isAdvanceFilterListLoading }] =
    useGetMyAmozeshyarListAdvanceFilterMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (EstelamAmozeshyarListTabsKeys.rejected === url?.tab) {
      if (hasActiveKey(url, advanceFilterItems)) {
        const filters: EstelamMyAmozeshyarByAdvanceFilterRequest = {
          ...(url?.username && { username: url?.username?.trim() }),
          ...(url?.studentNumber && { studentNumber: url?.studentNumber?.trim() }),
          ...(url?.mobileNo && { mobileNumber: url?.mobileNo?.trim() }),
          ...(url?.firstName && { firstname: url?.firstName?.trim() }),
          ...(url?.lastName && { lastname: url?.lastName?.trim() }),
          ...(url?.dateDateStart && { requestDateFrom: url?.dateDateStart }),
          ...(url?.dateDateEnd && { requestDateTo: url?.dateDateEnd }),
        };
        getListByAdvanceFilter({
          statusId: ESTELAM_AMOZESHYAR_REJECTED,
          pageNumber: url?.page ? Number(url?.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          ...filters,
        })
          .unwrap()
          .then((value) => setDataSource(value?.content));
      } else {
        const requestParams = {
          pageNo: url?.page ? Number(url?.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        };

        getList({
          status: ESTELAM_AMOZESHYAR_REJECTED,
          params: requestParams,
        })
          .unwrap()
          .then((value) => {
            setDataSource(value?.content);
            setTotalPages(value?.totalElements);
          });
      }
    }
  }, [
    url?.page,
    url?.pageSize,
    url?.tab,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);
  //* ================================ Util Functions ================================
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
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
      <div className="management-requests-estelam-amozeshyar-rejected-list-tab">
        <CustomDivider text="لیست درخواست های استعلام آموزشیار" />
        <div className="table-container">
          <ToolBox
            rightSide={
              <>
                <CustomBadge count={badgeCount}>
                  <CustomButton
                    type="primary"
                    icon={<AiOutlineFilter />}
                    onClick={openAdvanceFilterHandler}
                  >
                    فیلتر پیشرفته
                  </CustomButton>
                </CustomBadge>
                {/* //Todo[Atefeh]: در جدول، ستون مورد نظر جستجو دارد. */}
                {/* <CustomInput
                  suffix={<AiOutlineSearch  />}
                  placeholder="جستجو بر اساس کد ملی / فراگیر"
                  hasVerticalLabel={false}
                /> */}
              </>
            }
            leftSide={
              <CustomButton type="primary" ghost disabled>
                خروجی
              </CustomButton>
            }
          />
          <CustomTable<EstelamMyAmozeshyarListItemType>
            dataSource={dataSource}
            rowKey="id"
            columns={ManagementMyEstelamAmozeshyarTableModel({
              type: ESTELAM_AMOZESHYAR_REJECTED,
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
            loading={isGetListLoading || isAdvanceFilterListLoading}
            className="rejected-list-table-container"
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      </div>
    </>
  );
};

export default EstelamAmozeshyarRejectedListTab;
