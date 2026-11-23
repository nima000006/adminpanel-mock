import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import {
  downloadCateringBaseProductListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_BASE_INFO_DETAILS_ARCHIVES_PAGE_ROUTE,
  CATERING_BASE_LIST_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import {
  useDeactivateBasicInfoFoodMutation,
  useGetBasicInfoFoodsListMutation,
} from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { hasCateringProductCategoryId } from "@pages/Catering/BasicInfo/_shared/cateringBaseInfoCategory";
import {
  CateringBaseInfoDetailsRecord,
  deactivateBasicInfoFoodRequest,
  getBasicInfoFoodsListRequest,
  getBasicInfoFoodsListResponse,
} from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import CateringBaseInfoDetailsAddDrawerContent from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/helper/drawer/CateringBaseInfoDetailsAddDrawerContent/CateringBaseInfoDetailsAddDrawerContent";
import CateringBaseInfoDetailsEditDrawerContent from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/helper/drawer/CateringBaseInfoDetailsEditDrawerContent/CateringBaseInfoDetailsEditDrawerContent";
import { CateringBaseInfoDetailsDeactivateModalFormData } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/helper/modal/CateringBaseInfoDetailsDeactivateModalContent/@types/@cateringBaseInfoDetailsDeactivateModalContent";
import CateringBaseInfoDetailsDeactivateModalContent from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/helper/modal/CateringBaseInfoDetailsDeactivateModalContent/CateringBaseInfoDetailsDeactivateModalContent";
import CateringBaseInfoDetailsTableModel from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/helper/models/CateringBaseInfoDetailsTableModel/CateringBaseInfoDetailsTableModel";

const DEFAULT_PRODUCT_CATEGORY_TITLE = "غذا";
const DEACTIVATE_CATERING_SUCCESS_MSG = "غذا با موفقیت غیرفعال شد.";

const advanceFilterItems = ["title"];

const CateringBaseInfoDetails = () => {
  const [dataSource, setDataSource] = useState<CateringBaseInfoDetailsRecord[]>([]);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<CateringBaseInfoDetailsRecord | null>(null);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [deactivateForm] = Form.useForm<CateringBaseInfoDetailsDeactivateModalFormData>();

  const { params: url } = useQueryParams();
  const productCategoryTitle =
    (typeof url?.productCategoryTitle === "string" && url.productCategoryTitle) ||
    DEFAULT_PRODUCT_CATEGORY_TITLE;

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={CATERING_BASE_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: productCategoryTitle,
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getBasicInfoFoodsList, { isLoading: isGetBasicInfoFoodsListLoading }] =
    useGetBasicInfoFoodsListMutation();

  const [deactivateBasicInfoFood, { isLoading: isDeactivateBasicInfoFoodLoading }] =
    useDeactivateBasicInfoFoodMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    refetchFoodsList();
  }, [
    url?.page,
    url?.pageSize,
    url?.productCategoryId,
    url?.sortings,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const buildBasicInfoFoodsListRequest = (): getBasicInfoFoodsListRequest | null => {
    if (!hasCateringProductCategoryId(url?.productCategoryId)) return null;

    const request: getBasicInfoFoodsListRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategoryId: +url.productCategoryId,

        // search
        ...(url?.title && { title: url.title }),
      },
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting.sortOrder.toUpperCase() as "ASC" | "DESC";
      }
    }

    return request;
  };

  const refetchFoodsList = () => {
    const request = buildBasicInfoFoodsListRequest();
    if (!request) return;

    getBasicInfoFoodsList(request)
      .unwrap()
      .then((res: getBasicInfoFoodsListResponse) => {
        setDataSource(res?.content ?? []);
      });
  };

  const onGetExcelFileBtn = () => {
    const request = buildBasicInfoFoodsListRequest();
    if (!request) return;

    setIsDownloadLinkLoading(true);
    downloadCateringBaseProductListExcel({
      params: request.params,
      body: request.body,
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

  const onAddHandler = () => {
    setIsAddDrawerOpen(true);
  };

  const onCloseAddDrawerHandler = () => {
    setIsAddDrawerOpen(false);
  };

  const onEditHandler = (record: CateringBaseInfoDetailsRecord) => {
    setSelectedRecord(record);
    setIsEditDrawerOpen(true);
  };

  const onCloseEditDrawerHandler = () => {
    setIsEditDrawerOpen(false);
    setSelectedRecord(null);
  };

  const onDeactivateHandler = (record: CateringBaseInfoDetailsRecord) => {
    setSelectedRecord(record);
    deactivateForm.resetFields();
    setIsDeactivateModalOpen(true);
  };

  const onCloseDeactivateModalHandler = () => {
    setIsDeactivateModalOpen(false);
    setSelectedRecord(null);
    deactivateForm.resetFields();
  };

  const onDeactivateBasicInfoFoodSuccess = () => {
    toast.success(DEACTIVATE_CATERING_SUCCESS_MSG, {
      toastId: DEACTIVATE_CATERING_SUCCESS_MSG,
    });
    onCloseDeactivateModalHandler();
    refetchFoodsList();
  };

  const onConfirmDeactivateHandler = () => {
    deactivateForm.validateFields().then(() => {
      if (!selectedRecord) return;

      const request: deactivateBasicInfoFoodRequest = {
        id: selectedRecord.id,
      };

      deactivateBasicInfoFood(request).unwrap().then(onDeactivateBasicInfoFoodSuccess);
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAddDrawerOpen && (
        <CustomDrawer
          open={isAddDrawerOpen}
          onClose={onCloseAddDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringBaseInfoDetailsAddDrawerContent
              closeDrawerHandler={onCloseAddDrawerHandler}
              getData={refetchFoodsList}
              productCategoryTitle={productCategoryTitle}
              existingTitles={dataSource.map((item) => item.title)}
            />
          }
        />
      )}
      {isEditDrawerOpen && (
        <CustomDrawer
          open={isEditDrawerOpen}
          onClose={onCloseEditDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringBaseInfoDetailsEditDrawerContent
              closeDrawerHandler={onCloseEditDrawerHandler}
              getData={refetchFoodsList}
              record={selectedRecord}
              productCategoryTitle={productCategoryTitle}
            />
          }
        />
      )}
      {isDeactivateModalOpen && (
        <ConfirmationModalWithContent
          title={`غیر فعال سازی ${productCategoryTitle}`}
          showIcon={false}
          isModalOpen={isDeactivateModalOpen}
          closeModalHandler={onCloseDeactivateModalHandler}
          onConfirmClickHandler={onConfirmDeactivateHandler}
          confirmBtnText="تایید و غیرفعال سازی"
          backBtnText="انصراف"
          isDangerous
          isConfirmButtonLoading={isDeactivateBasicInfoFoodLoading}
          content={
            <CateringBaseInfoDetailsDeactivateModalContent
              form={deactivateForm}
              record={selectedRecord}
              productCategoryTitle={productCategoryTitle}
            />
          }
        />
      )}
      <ToolBox
        className="mb-5"
        leftSide={
          <div className="flex gap-2">
            <Link
              to={{
                pathname: CATERING_BASE_INFO_DETAILS_ARCHIVES_PAGE_ROUTE,
                search: makeSearchParams({
                  ...(hasCateringProductCategoryId(url?.productCategoryId) && {
                    productCategoryId: String(url?.productCategoryId),
                  }),
                  productCategoryTitle,
                }),
              }}
            >
              <CustomButton type="default" icon={<FiArchive />}>
                آرشیو
              </CustomButton>
            </Link>
            <CustomButton type="primary" icon={<AiOutlinePlus />} onClick={onAddHandler}>
              {`افزودن ${productCategoryTitle}`}
            </CustomButton>
            <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
              خروجی
            </CustomButton>
          </div>
        }
      />
      <CustomTable<CateringBaseInfoDetailsRecord>
        dataSource={dataSource}
        loading={isGetBasicInfoFoodsListLoading}
        columns={CateringBaseInfoDetailsTableModel({
          onEditHandler,
          onDeactivateHandler,
          productCategoryTitle,
        })}
        rowKey="id"
        draggableColumns
        draggableId={ExcelCodes.FOOD_BASIC_INFO_DETAILS_TABLE}
        pagination={paginationConfig}
        key={`table-${url?.pageSize || "8"}`}
      />
    </>
  );
};

export default CateringBaseInfoDetails;
