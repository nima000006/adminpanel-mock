import { useEffect, useState } from "react";

import { Descriptions, Form, UploadFile } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PiFileText } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/shop";
import {
  useAcceptShopAllProductsRequestMutation,
  useGetShopAllProductsDetailQuery,
  useRejectShopAllProductsRequestMutation,
} from "@infra/states/redux/Apis/shop/products/productsApi";
import { SHOP_PRODUCT_STATUS } from "@pages/Shop/Products/_shared/utils/shopProductStatus";
import { getRequestStatusDotClassName } from "@pages/Shop/Products/ProductsRequests/AllProductsRequests/ShopAllProductsRequestDetail/helper/utils";

import { ShopAllProductsRequestDetailProductFormType } from "./@types/@shopAllProductsRequestDetail";
import ShopAllProductsRequestDetailProductFields from "./helper/components/ShopAllProductsRequestDetailProductFields/ShopAllProductsRequestDetailProductFields";
import ShopAllProductsRequestDetailAcceptModalContent from "./helper/modals/ShopAllProductsRequestDetailAcceptModalContent/ShopAllProductsRequestDetailAcceptModalContent";
import { ShopAllProductsRequestDetailRejectFormType } from "./helper/modals/ShopAllProductsRequestDetailRejectModalContent/@types/@shopAllProductsRequestDetailRejectModalContent";
import ShopAllProductsRequestDetailRejectModalContent from "./helper/modals/ShopAllProductsRequestDetailRejectModalContent/ShopAllProductsRequestDetailRejectModalContent";

import "./_shopAllProductsRequestDetail.scss";

const ShopAllProductsRequestDetail = () => {
  const navigate = useNavigate();
  const { params } = useQueryParams();
  const uuid = typeof params?.id === "string" ? params.id : "";
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [rejectForm] = Form.useForm<ShopAllProductsRequestDetailRejectFormType>();
  const [productForm] = Form.useForm<ShopAllProductsRequestDetailProductFormType>();

  //? ================================  Api Calls ================================
  const {
    data: getShopAllProductsDetailData,
    isLoading: isGetShopAllProductsDetailLoading,
    isError: isGetShopAllProductsDetailError,
  } = useGetShopAllProductsDetailQuery(
    { uuid },
    {
      skip: !uuid,
      refetchOnMountOrArgChange: true,
    }
  );

  const [
    rejectShopAllProductsRequest,
    { isLoading: isRejectShopAllProductsRequestLoading },
  ] = useRejectShopAllProductsRequestMutation();

  const [
    acceptShopAllProductsRequest,
    { isLoading: isAcceptShopAllProductsRequestLoading },
  ] = useAcceptShopAllProductsRequestMutation();

  const statusName = getShopAllProductsDetailData?.status?.name;
  const isAwaitingApproval = statusName === SHOP_PRODUCT_STATUS.AWAITING_APPROVAL;
  const isReviewedRequest =
    statusName === SHOP_PRODUCT_STATUS.ACCEPTED ||
    statusName === SHOP_PRODUCT_STATUS.REJECTED;
  const showsRejectReason = statusName === SHOP_PRODUCT_STATUS.REJECTED;

  //* ================================ bread crumb  ================================
  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link to={SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_LIST_PAGE_ROUTE}>
            درخواست‌های کالا
          </Link>
        ),
      },
      {
        title: getShopAllProductsDetailData?.title || "جزئیات درخواست",
      },
    ],
  });

  //* ================================ Effects  ================================
  useEffect(() => {
    if (!getShopAllProductsDetailData) {
      setImageFileList([]);
      return;
    }

    const galleryUrls = [
      getShopAllProductsDetailData.coverImageUrl,
      ...(getShopAllProductsDetailData.imageUrls ?? []),
    ].filter((url): url is string => Boolean(url));

    setImageFileList(
      galleryUrls.map((url) => ({
        uid: url,
        name: url,
        status: "done" as const,
        url,
      }))
    );
  }, [getShopAllProductsDetailData]);

  //* ================================ Util Functions ================================
  const reviewedDate = dataPlaceHolder({
    data: getShopAllProductsDetailData?.reviewedAt,
    isDate: true,
    customDateFormat: "D MMMM YYYY",
  });
  const requestInfoItems = [
    {
      key: "status",
      label: "وضعیت درخواست",
      children: (
        <span className="shop-all-products-request-detail-status">
          <span
            className={`shop-all-products-request-detail-status-dot ${getRequestStatusDotClassName(statusName)}`}
          />
          {dataPlaceHolder({ data: getShopAllProductsDetailData?.status?.title })}
        </span>
      ),
    },
    {
      key: "createdDate",
      label: "تاریخ ثبت",
      children: dataPlaceHolder({
        data: getShopAllProductsDetailData?.createdDate,
        isDate: true,
        customDateFormat: "D MMMM YYYY",
      }),
    },
    {
      key: "supplier",
      label: "فروشنده",
      children: dataPlaceHolder({
        data: getShopAllProductsDetailData?.supplier?.title,
      }),
    },
    ...(isReviewedRequest
      ? [
          {
            key: "reviewedAt",
            label: "تاریخ بررسی",
            children: reviewedDate,
          },
        ]
      : []),
    ...(showsRejectReason
      ? [
          {
            key: "rejectReason",
            label: "دلیل رد",
            span: 2,
            children: dataPlaceHolder({
              data: getShopAllProductsDetailData?.rejectReason?.title,
            }),
          },
          {
            key: "rejectDescription",
            label: "توضیحات رد",
            span: 2,
            children: dataPlaceHolder({
              data: getShopAllProductsDetailData?.rejectDescription,
            }),
          },
        ]
      : []),
  ];

  const closeRejectModalHandler = () => {
    rejectForm.resetFields();
    setIsRejectModalOpen(false);
  };

  const openRejectModalHandler = () => {
    setIsRejectModalOpen(true);
  };

  const closeAcceptModalHandler = () => {
    setIsAcceptModalOpen(false);
  };

  const openAcceptModalHandler = async () => {
    await productForm.validateFields(["productId"]);
    setIsAcceptModalOpen(true);
  };

  const confirmRejectHandler = async () => {
    if (!uuid) {
      return;
    }

    const values = await rejectForm.validateFields();
    const rejectReasonValue = String(
      values.rejectReason?.value ?? values.rejectReason?.item?.id ?? ""
    ).trim();

    if (!rejectReasonValue) {
      return;
    }

    await rejectShopAllProductsRequest({
      uuid,
      rejectReason: rejectReasonValue,
      rejectDescription: values.rejectDescription ?? "",
    })
      .unwrap()
      .then(() => {
        closeRejectModalHandler();
        navigate(SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_LIST_PAGE_ROUTE);
      });
  };

  const confirmAcceptHandler = async () => {
    if (!uuid) {
      return;
    }

    const values = await productForm.validateFields(["productId"]);
    const productId = Number(values.productId);

    if (!productId) {
      return;
    }

    await acceptShopAllProductsRequest({
      uuid,
      productId,
    })
      .unwrap()
      .then(() => {
        closeAcceptModalHandler();
        navigate(SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_LIST_PAGE_ROUTE);
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isRejectModalOpen ? (
        <ConfirmationModalWithContent
          title={`رد درخواست «${getShopAllProductsDetailData?.title || ""}»`}
          isModalOpen={isRejectModalOpen}
          confirmBtnText="ثبت رد"
          backBtnText="انصراف"
          isDangerous
          showIcon={false}
          width={520}
          closeModalHandler={closeRejectModalHandler}
          onConfirmClickHandler={confirmRejectHandler}
          isConfirmButtonLoading={isRejectShopAllProductsRequestLoading}
          content={<ShopAllProductsRequestDetailRejectModalContent form={rejectForm} />}
        />
      ) : null}

      {isAcceptModalOpen ? (
        <ConfirmationModalWithContent
          title={`تایید درخواست «${getShopAllProductsDetailData?.title || ""}»`}
          isModalOpen={isAcceptModalOpen}
          confirmBtnText="تایید درخواست"
          backBtnText="انصراف"
          showIcon
          iconType="info"
          titleIcon={<AiOutlineInfoCircle className="text-primary-6" size={24} />}
          width={520}
          closeModalHandler={closeAcceptModalHandler}
          onConfirmClickHandler={confirmAcceptHandler}
          isConfirmButtonLoading={isAcceptShopAllProductsRequestLoading}
          content={
            <ShopAllProductsRequestDetailAcceptModalContent
              title={getShopAllProductsDetailData?.title}
              supplierTitle={getShopAllProductsDetailData?.supplier?.title}
            />
          }
        />
      ) : null}

      <Div loading={isGetShopAllProductsDetailLoading}>
        {isGetShopAllProductsDetailError ? (
          <CustomAlert type="error" showIcon title="دریافت اطلاعات درخواست ناموفق بود." />
        ) : null}

        {!isGetShopAllProductsDetailError && !getShopAllProductsDetailData ? (
          <CustomEmpty description="درخواستی با این مشخصات یافت نشد" />
        ) : null}

        {!isGetShopAllProductsDetailError && getShopAllProductsDetailData ? (
          <CustomCard padding="2rem" className="shop-all-products-request-detail-card">
            <div>
              <CustomDivider
                text={
                  <span className="shop-all-products-request-detail-divider-title">
                    <PiFileText size={20} />
                    اطلاعات درخواست
                  </span>
                }
              />
              <div className="shop-all-products-request-detail-info">
                <Descriptions
                  column={{ xs: 1, sm: 1, md: 2 }}
                  colon={false}
                  items={requestInfoItems}
                />
              </div>
            </div>

            {statusName === SHOP_PRODUCT_STATUS.ACCEPTED ? (
              <CustomAlert
                type="success"
                showIcon
                title="درخواست تایید شد"
                description={`این کالا در ${reviewedDate} به بانک کالا اضافه شد.`}
              />
            ) : null}

            <ShopAllProductsRequestDetailProductFields
              detail={getShopAllProductsDetailData}
              imageFileList={imageFileList}
              setImageFileList={setImageFileList}
              form={productForm}
              isProductIdEditable={isAwaitingApproval}
            />

            {isAwaitingApproval ? (
              <div className="flex justify-end gap-3">
                <CustomButton type="default" danger onClick={openRejectModalHandler}>
                  رد درخواست
                </CustomButton>
                <CustomButton type="primary" onClick={openAcceptModalHandler}>
                  تایید درخواست
                </CustomButton>
              </div>
            ) : null}
          </CustomCard>
        ) : null}
      </Div>
    </>
  );
};

export default ShopAllProductsRequestDetail;
