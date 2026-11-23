import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import {
  downloadCateringMyVendorListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_MY_VENDOR_DETAILS_PAGE_ROUTE,
  CATERING_MY_VENDOR_LIST_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { useGetMyVendorListMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_ARCHIVE_LIST } from "@pages/Catering/_shared/utils";
import { CateringMyArchieveVendorListAdvanceFilterFormType } from "@pages/Catering/Vendors/MyVendors/CateringMyArchieveVendorList/@types/@cateringMyArchieveVendorList";
import CateringMyArchieveVendorListTableModel from "@pages/Catering/Vendors/MyVendors/CateringMyArchieveVendorList/helper/models/CateringMyArchieveVendorList/CateringMyArchieveVendorListTableModel";
import {
  GetMyVendorListContent,
  GetMyVendorListRequest,
  GetMyVendorListResponse,
} from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

import useCateringMyArchieveVendorListAdvanceFilter from "./helper/hooks/useCateringMyArchieveVendorListAdvanceFilter/useCateringMyArchieveVendorListAdvanceFilter";

const COLUMN_FILTER_ITEMS = [
  "provinceId",
  "cityId",
  // column
  "title",
  "nationalNom",
  "managerFirstName",
  "managerLastName",
];

const CateringMyArchieveVendorList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={CATERING_MY_VENDOR_LIST_PAGE_ROUTE}>تأمین کنندگان من</Link>,
      },
      {
        title: "آرشیو",
      },
    ],
  });

  const [dataSource, setDataSource] = useState<GetMyVendorListResponse | null>(null);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<CateringMyArchieveVendorListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const navigate = useNavigate();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useCateringMyArchieveVendorListAdvanceFilter({
    advanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getMyVendorList, { isLoading: isGetMyVendorListLoading }] =
    useGetMyVendorListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchMyArchieveVendorList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (id: number) => {
    navigate({
      pathname: CATERING_MY_VENDOR_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: id.toString() }),
    });
  };

  const buildMyArchieveVendorListRequest = (): GetMyVendorListRequest => {
    const request: GetMyVendorListRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate", // default
        sortDirection: "DESC", // default
      },
      body: {
        statusType: CATERING_STATUS_TYPES_ARCHIVE_LIST,
        ...(url?.title && { title: url.title }),
        ...(url?.nationalNom && { nationalNom: url.nationalNom }),
        ...(url?.managerFirstName && { managerFirstName: url.managerFirstName }),
        ...(url?.managerLastName && { managerLastName: url.managerLastName }),
        ...(url?.provinceId && {
          provinceIds: url.provinceId.split(",").map(Number),
        }),
        ...(url?.cityId && {
          cityIds: url.cityId.split(",").map(Number),
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

    return request;
  };

  const fetchMyArchieveVendorList = () => {
    getMyVendorList(buildMyArchieveVendorListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildMyArchieveVendorListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringMyVendorListExcel({ params, body })
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
          className="btn-wrapper"
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
          leftSide={
            <div className="flex gap-2">
              <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
                خروجی
              </CustomButton>
            </div>
          }
        />
        <div>
          <CustomTable<GetMyVendorListContent>
            dataSource={dataSource?.content}
            loading={isGetMyVendorListLoading}
            rowKey="id"
            columns={CateringMyArchieveVendorListTableModel({
              onView: onViewHandler,
            })}
            pagination={manualPaginationConfig({
              total: dataSource?.totalElements || 0,
              onChange: (page: number, pageSize: number) => {
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
            draggableId={ExcelCodes.CATERING_MY_VENDOR_ARCHIEVE_LIST_TABLE}
          />
        </div>
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل تأمین کننده‌ها:"
        />
      </div>
    </>
  );
};

export default CateringMyArchieveVendorList;
