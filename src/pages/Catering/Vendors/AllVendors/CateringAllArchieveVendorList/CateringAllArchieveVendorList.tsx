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
  downloadCateringAllVendorListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_ALL_VENDOR_DETAILS_PAGE_ROUTE,
  CATERING_ALL_VENDOR_LIST_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { useGetAllVendorListMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_ARCHIVE_LIST } from "@pages/Catering/_shared/utils";
import { CateringAllArchieveVendorListAdvanceFilterFormType } from "@pages/Catering/Vendors/AllVendors/CateringAllArchieveVendorList/@types/@cateringAllArchieveVendorList";
import CateringAllArchieveVendorListTableModel from "@pages/Catering/Vendors/AllVendors/CateringAllArchieveVendorList/helper/models/CateringAllArchieveVendorList/CateringAllArchieveVendorListTableModel";
import {
  GetAllVendorListContent,
  GetAllVendorListRequest,
  GetAllVendorListResponse,
} from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";

import useCateringAllArchieveVendorListAdvanceFilter from "./helper/hooks/useCateringAllArchieveVendorListAdvanceFilter/useCateringAllArchieveVendorListAdvanceFilter";

const COLUMN_FILTER_ITEMS = [
  "provinceId",
  "cityId",
  // column
  "title",
  "nationalNom",
  "managerFirstName",
  "managerLastName",
];

const CateringAllArchieveVendorList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={CATERING_ALL_VENDOR_LIST_PAGE_ROUTE}>تأمین کنندگان</Link>,
      },
      {
        title: "آرشیو",
      },
    ],
  });

  const [dataSource, setDataSource] = useState<GetAllVendorListResponse | null>(null);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<CateringAllArchieveVendorListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const navigate = useNavigate();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useCateringAllArchieveVendorListAdvanceFilter({
    advanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getAllVendorList, { isLoading: isGetAllVendorListLoading }] =
    useGetAllVendorListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchAllArchieveVendorList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (id: number) => {
    navigate({
      pathname: CATERING_ALL_VENDOR_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: id.toString() }),
    });
  };

  const buildAllArchieveVendorListRequest = (): GetAllVendorListRequest => {
    const request: GetAllVendorListRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate", // default
        sortDirection: "DESC", //default
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

  const fetchAllArchieveVendorList = () => {
    getAllVendorList(buildAllArchieveVendorListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildAllArchieveVendorListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringAllVendorListExcel({ params, body })
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
          <CustomTable<GetAllVendorListContent>
            dataSource={dataSource?.content}
            loading={isGetAllVendorListLoading}
            rowKey="id"
            columns={CateringAllArchieveVendorListTableModel({
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
            draggableId={ExcelCodes.CATERING_ALL_VENDOR_ARCHIEVE_LIST_TABLE}
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

export default CateringAllArchieveVendorList;
