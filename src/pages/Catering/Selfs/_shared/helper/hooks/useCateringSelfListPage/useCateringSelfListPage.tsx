import { useEffect, useState } from "react";

import { Form, MenuProps } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import {
  downloadCateringAllSelfListExcel,
  downloadCateringMySelfListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_ALL_SELF_DETAILS_PAGE_ROUTE,
  CATERING_MY_SELF_DETAILS_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
  THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  CateringSelfListAdvanceFilterFormType,
  CateringSelfRecordType,
  GetCateringSelfsListRequest,
  GetCateringSelfsListResponse,
} from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import useCateringSelfListAdvanceFilter from "@pages/Catering/Selfs/_shared/helper/hooks/useCateringSelfListAdvanceFilter/useCateringSelfListAdvanceFilter";
import {
  CateringSelfListDrawerState,
  UseCateringSelfListPageParams,
} from "@pages/Catering/Selfs/_shared/helper/hooks/useCateringSelfListPage/@types/@useCateringSelfListPage";

export const CATERING_SELF_LIST_EXPORT_MENU: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const LIST_ADVANCE_FILTER_ITEMS = [
  // modal search
  "branchId",
  "provinceId",
  "cityId",
  "genderId",
  // column search
  "title",
];

const ARCHIVE_COLUMN_FILTER_ITEMS = ["title"];

const useCateringSelfListPage = ({
  getCateringSelfsList,
  isSelfDataLoading,
  statusType,
  variant,
  accessMode,
  defaultPageSize = 8, // default page size
}: UseCateringSelfListPageParams) => {
  const isListVariant = variant === "list";
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState<GetCateringSelfsListResponse | null>(null);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [drawerState, setDrawerState] = useState<CateringSelfListDrawerState>({
    open: false,
    mode: "create",
  });
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  const [form] = Form.useForm<CateringSelfListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const { filterItemsList } = useCateringSelfListAdvanceFilter({
    advanceModalOpen: isListVariant ? advanceModalOpen : false,
    form,
  });

  const filterDeps = isListVariant
    ? LIST_ADVANCE_FILTER_ITEMS
    : ARCHIVE_COLUMN_FILTER_ITEMS;

  const buildCateringSelfsListRequest = (): GetCateringSelfsListRequest => {
    const request: GetCateringSelfsListRequest = {
      params: {
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : defaultPageSize,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        statusType,
        ...(isListVariant && {
          ...(url?.branchId && { ownerBranchCode: Number(url.branchId) }),
          ...(url?.genderId && { genderType: Number(url.genderId) }),
          ...(url?.provinceId && {
            provinceIds: url.provinceId.split(",").map(Number),
          }),
          ...(url?.cityId && {
            cityIds: url.cityId.split(",").map(Number),
          }),
        }),

        ...(url?.title && { title: url.title }),
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

    return request;
  };

  const fetchCateringSelfsList = () => {
    getCateringSelfsList(buildCateringSelfsListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildCateringSelfsListRequest();
    const downloadExcel =
      accessMode === "my"
        ? downloadCateringMySelfListExcel
        : downloadCateringAllSelfListExcel;

    setIsDownloadLinkLoading(true);
    downloadExcel({ params, body })
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

  //? ================================ Effects ================================
  useEffect(() => {
    fetchCateringSelfsList();
  }, [url?.page, url?.pageSize, url?.sortings, ...filterDeps.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================
  const advanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const onNewSelfHandler = () => {
    setDrawerState({
      open: true,
      mode: "create",
    });
  };

  const onCloseDrawer = () => {
    setDrawerState({
      open: false,
      mode: "create",
    });
  };

  const onViewHandler = (id: number) => {
    navigate({
      pathname:
        accessMode === "my"
          ? CATERING_MY_SELF_DETAILS_PAGE_ROUTE
          : CATERING_ALL_SELF_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: id.toString() }),
    });
  };

  const onEditHandler = (record: CateringSelfRecordType) => {
    setDrawerState({
      open: true,
      mode: "edit",
      record,
    });
  };

  const onDeActiveHandler = () => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  return {
    dataSource,
    isSelfDataLoading,
    url,
    setSearchParams,
    defaultPageSize,
    advanceModalOpen,
    setAdvanceModalOpen,
    form,
    filterItemsList,
    badgeCount,
    setBadgeCount,
    advanceFilterHandler,
    drawerState,
    onNewSelfHandler,
    onCloseDrawer,
    onViewHandler,
    onEditHandler,
    onDeActiveHandler,
    fetchCateringSelfsList,
    isDownloadLinkLoading,
    onGetExcelFileBtn,
  };
};

export default useCateringSelfListPage;
