import { useCallback, useEffect, useMemo, useState } from "react";

import { Descriptions, DescriptionsProps, Form } from "antd";
import { AiOutlineInfoCircle, AiOutlineShopping } from "react-icons/ai";
import { PiFileText, PiUser } from "react-icons/pi";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import { emptyString } from "@infra/config/global.vars";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { SHOP_ALL_ORDERS_LIST_PAGE_ROUTE } from "@infra/router/routes/shop";
import {
  useConfirmShipOrdersMutation,
  useConfirmShopOrdersMutation,
  useLazyGetShopAllOrdersDetailQuery,
  useRejectUserOrdersMutation,
} from "@infra/states/redux/Apis/shop/orders/ordersApi";
import { SHOP_ORDERS_STATUS_MAP } from "@pages/Shop/_shared/utils";
import { GetShopAllOrdersDetailItem } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/@types/@shopAllOrdersDetail";
import ShopAllOrdersDetailItemDrawerContent from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/drawer/ShopAllOrdersDetailItemDrawerContent/ShopAllOrdersDetailItemDrawerContent";
import ShopAllOrdersDetailConfirmOrderModalContent from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailConfirmOrderModalContent/ShopAllOrdersDetailConfirmOrderModalContent";
import { ShopAllOrdersDetailConfirmShipFormType } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailConfirmShipModalContent/@types/@shopAllOrdersDetailConfirmShipModalContent";
import ShopAllOrdersDetailConfirmShipModalContent from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailConfirmShipModalContent/ShopAllOrdersDetailConfirmShipModalContent";
import { ShopAllOrdersDetailRejectFormType } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailRejectModalContent/@types/@shopAllOrdersDetailRejectModalContent";
import ShopAllOrdersDetailRejectModalContent from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailRejectModalContent/ShopAllOrdersDetailRejectModalContent";
import ShopAllOrdersDetailItemsTableModel from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/models/ShopAllOrdersDetailItems/ShopAllOrdersDetailItemsTableModel";

const ShopAllOrdersDetail = () => {
  const { params } = useQueryParams();
  const [rejectForm] = Form.useForm<ShopAllOrdersDetailRejectFormType>();
  const [confirmShipForm] = Form.useForm<ShopAllOrdersDetailConfirmShipFormType>();
  const [rejectItem, setRejectItem] = useState<GetShopAllOrdersDetailItem>();
  const [viewItem, setViewItem] = useState<GetShopAllOrdersDetailItem>();
  const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false);
  const [isConfirmShipModalOpen, setIsConfirmShipModalOpen] = useState(false);

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={SHOP_ALL_ORDERS_LIST_PAGE_ROUTE}>سفارشات</Link>,
      },
      {
        title: `جزئیات سفارش ${params?.id}`,
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [
    getShopAllOrdersDetail,
    { data: orderDetailData, isFetching: isGetShopAllOrdersDetailLoading },
  ] = useLazyGetShopAllOrdersDetailQuery();

  const [rejectUserOrders, { isLoading: isRejectUserOrdersLoading }] =
    useRejectUserOrdersMutation();

  const [confirmShopOrders, { isLoading: isConfirmShopOrdersLoading }] =
    useConfirmShopOrdersMutation();

  const [confirmShipOrders, { isLoading: isConfirmShipOrdersLoading }] =
    useConfirmShipOrdersMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.id) {
      return;
    }

    getShopAllOrdersDetail({ uuid: params.id });
  }, [params?.id]);

  // description items
  const orderInfoItems: DescriptionsProps["items"] = [
    {
      key: "orderCode",
      label: "کد سفارش",
      children: dataPlaceHolder({ data: orderDetailData?.uuid }),
    },
    {
      key: "status",
      label: "وضعیت سفارش",
      children: dataPlaceHolder({ data: orderDetailData?.status?.title }),
    },
    {
      key: "vendorName",
      label: "فروشنده",
      children: dataPlaceHolder({ data: orderDetailData?.supplierTitle }),
    },
    {
      key: "createdDate",
      label: "تاریخ ثبت سفارش",
      children: orderDetailData?.createdDate
        ? convertDateToPersianTextDateWithoutHours(orderDetailData?.createdDate)
        : dataPlaceHolder({ data: "" }),
    },
    {
      key: "itemQuantity",
      label: "تعداد کالا",
      children: dataPlaceHolder({
        data: `${orderDetailData?.itemsCount} قلم / ${orderDetailData?.quantity} عدد`,
      }),
    },
    {
      key: "totalAmount",
      label: "مبلغ کل (تومان)",
      children: dataPlaceHolder({ data: orderDetailData?.totalPrice, isPrice: true }),
    },
    {
      key: "paidAmount",
      label: "مبلغ پرداخت‌شده",
      children: emptyString,
    },
    {
      key: "walletRefundAmount",
      label: "عودت به کیف پول",
      children: dataPlaceHolder({
        data: orderDetailData?.refundedAmount,
        isPrice: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
    },
    ...(params?.status === SHOP_ORDERS_STATUS_MAP.rejected
      ? [
          {
            key: "rejectDateTime",
            label: "تاریخ و ساعت رد شده",
            children: emptyString,
          },
        ]
      : []),
    ...(params?.status === SHOP_ORDERS_STATUS_MAP.expired
      ? [
          {
            key: "expiredDateTime",
            label: "تاریخ و ساعت انقضا",
            children: emptyString,
          },
        ]
      : []),
  ];

  const buyerInfoItems: DescriptionsProps["items"] = [
    {
      key: "buyerFirstName",
      label: "نام خریدار",
      children: dataPlaceHolder({ data: orderDetailData?.buyerFirstName }),
    },
    {
      key: "buyerLastName",
      label: "نام خانوادگی خریدار",
      children: dataPlaceHolder({ data: orderDetailData?.buyerLastName }),
    },
    {
      key: "buyerNationalCode",
      label: "کد ملی خریدار",
      children: dataPlaceHolder({ data: orderDetailData?.nationalCode }),
    },
    {
      key: "buyerMobile",
      label: "شماره موبایل خریدار",
      children: dataPlaceHolder({ data: orderDetailData?.mobileNumber }),
    },
    {
      key: "receiverName",
      label: "تحویل گیرنده",
      children: dataPlaceHolder({ data: orderDetailData?.receiverName }),
    },
    {
      key: "provinceCity",
      label: "استان / شهر",
      children: `${dataPlaceHolder({ data: orderDetailData?.provinceName })} / ${dataPlaceHolder({ data: orderDetailData?.cityName })}`,
    },
    {
      key: "postalCode",
      label: "کد پستی",
      children: dataPlaceHolder({ data: orderDetailData?.postalCode }),
    },
    {
      key: "plaqueUnit",
      label: "پلاک / واحد",
      children: emptyString,
    },
    {
      key: "address",
      label: "آدرس",
      span: 2,
      children: dataPlaceHolder({ data: orderDetailData?.address }),
    },
  ];

  //* ================================ Util Functions ================================
  // reject modal
  const closeRejectModalHandler = () => {
    rejectForm.resetFields();
    setRejectItem(undefined);
  };

  const openRejectModalHandler = useCallback((record: GetShopAllOrdersDetailItem) => {
    setRejectItem(record);
  }, []);

  const confirmRejectHandler = () => {
    if (!rejectItem?.uuid) {
      return;
    }

    rejectForm.validateFields().then((values) => {
      rejectUserOrders({
        uuid: rejectItem.uuid,
        body: {
          rejectReason: values?.rejectReason?.item?.name || "",
          rejectDescription: values.rejectDescription || "",
        },
      })
        .unwrap()
        .then(() => {
          closeRejectModalHandler();

          if (params?.id) {
            getShopAllOrdersDetail({ uuid: params.id });
          }
        });
    });
  };

  // confirm order modal
  const openConfirmOrderModalHandler = () => {
    setIsConfirmOrderModalOpen(true);
  };

  const closeConfirmOrderModalHandler = () => {
    setIsConfirmOrderModalOpen(false);
  };

  const confirmOrderHandler = async () => {
    if (!params?.id) {
      return;
    }

    await confirmShopOrders({ uuid: params.id }).unwrap();
    closeConfirmOrderModalHandler();
    getShopAllOrdersDetail({ uuid: params.id });
  };

  // confirm ship modal
  const openConfirmShipModalHandler = () => {
    setIsConfirmShipModalOpen(true);
  };

  const closeConfirmShipModalHandler = () => {
    confirmShipForm.resetFields();
    setIsConfirmShipModalOpen(false);
  };

  const confirmShipHandler = async () => {
    const values = await confirmShipForm.validateFields();

    if (!params?.id) {
      return;
    }

    await confirmShipOrders({
      uuid: params.id,
      body: {
        shippingDescription: values?.shippingDescription || "",
      },
    }).unwrap();

    closeConfirmShipModalHandler();
    getShopAllOrdersDetail({ uuid: params.id });
  };

  // view drawer
  const closeViewDrawerHandler = () => {
    setViewItem(undefined);
  };

  const openViewDrawerHandler = useCallback((record: GetShopAllOrdersDetailItem) => {
    setViewItem(record);
  }, []);

  // columns
  const columns = useMemo(
    () =>
      ShopAllOrdersDetailItemsTableModel({
        showRejectAction: params?.status === SHOP_ORDERS_STATUS_MAP.awaitingApproval,
        onView: openViewDrawerHandler,
        onReject: openRejectModalHandler,
      }),
    [openRejectModalHandler, openViewDrawerHandler, params?.status]
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div loading={isGetShopAllOrdersDetailLoading}>
      <>
        {/* reject modal */}
        {rejectItem && (
          <ConfirmationModalWithContent
            title={`رد کالای «${rejectItem.title}»`}
            isModalOpen={!!rejectItem}
            confirmBtnText="ثبت رد"
            backBtnText="انصراف"
            isDangerous
            showIcon={false}
            width={520}
            closeModalHandler={closeRejectModalHandler}
            onConfirmClickHandler={confirmRejectHandler}
            isConfirmButtonLoading={isRejectUserOrdersLoading}
            content={<ShopAllOrdersDetailRejectModalContent form={rejectForm} />}
          />
        )}

        {/* confirm order modal */}
        {isConfirmOrderModalOpen && (
          <ConfirmationModalWithContent
            title={`تایید سفارش ${params?.id}`}
            isModalOpen={isConfirmOrderModalOpen}
            confirmBtnText="تایید سفارش"
            backBtnText="انصراف"
            showIcon
            iconType="info"
            titleIcon={<AiOutlineInfoCircle className="text-primary-6" size={24} />}
            closeModalHandler={closeConfirmOrderModalHandler}
            onConfirmClickHandler={confirmOrderHandler}
            isConfirmButtonLoading={isConfirmShopOrdersLoading}
            content={<ShopAllOrdersDetailConfirmOrderModalContent />}
          />
        )}

        {/* confirm ship modal */}
        {isConfirmShipModalOpen && (
          <ConfirmationModalWithContent
            title={`ثبت ارسال سفارش ${params?.id}`}
            isModalOpen={isConfirmShipModalOpen}
            confirmBtnText="ثبت ارسال"
            backBtnText="انصراف"
            showIcon
            iconType="info"
            titleIcon={<AiOutlineInfoCircle className="text-primary-6" size={24} />}
            width={600}
            closeModalHandler={closeConfirmShipModalHandler}
            onConfirmClickHandler={confirmShipHandler}
            isConfirmButtonLoading={isConfirmShipOrdersLoading}
            content={
              <ShopAllOrdersDetailConfirmShipModalContent form={confirmShipForm} />
            }
          />
        )}

        {/* view drawer */}
        {viewItem && (
          <CustomDrawer
            open={!!viewItem}
            onClose={closeViewDrawerHandler}
            closable={false}
            destroyOnHidden
            content={
              <ShopAllOrdersDetailItemDrawerContent
                item={viewItem}
                onClose={closeViewDrawerHandler}
              />
            }
          />
        )}
        <div className="bg-neutral-1 flex flex-col gap-6 rounded-2xl p-4 md:p-8">
          <section className="flex flex-col gap-4">
            {/* برای حالت تحویل نگرفتم*/}
            {params?.status === SHOP_ORDERS_STATUS_MAP.NOT_RECEIVED ? (
              <CustomAlert
                type="error"
                showIcon
                title="خریدار اعلام کرده این سفارش را تحویل نگرفته است"
                description={emptyString}
              />
            ) : null}
            <CustomDivider
              text={
                <span className="inline-flex items-center gap-2">
                  <PiFileText size={20} />
                  اطلاعات سفارش
                </span>
              }
            />
            <Descriptions
              column={2}
              colon={false}
              styles={{
                label: {
                  color: "var(--neutral-7)",
                  minWidth: 160,
                  textAlign: "start",
                },
                content: {
                  color: "var(--neutral-10)",
                  textAlign: "start",
                },
              }}
              items={orderInfoItems}
            />
          </section>

          <section className="flex flex-col gap-4">
            <CustomDivider
              text={
                <span className="inline-flex items-center gap-2">
                  <PiUser size={20} />
                  اطلاعات خریدار
                </span>
              }
            />
            <Descriptions
              column={2}
              colon={false}
              styles={{
                label: {
                  color: "var(--neutral-7)",
                  minWidth: 160,
                  textAlign: "start",
                },
                content: {
                  color: "var(--neutral-10)",
                  textAlign: "start",
                },
              }}
              items={buyerInfoItems}
            />
          </section>

          <section className="flex flex-col gap-4">
            <CustomDivider
              text={
                <span className="inline-flex items-center gap-2">
                  <AiOutlineShopping size={20} />
                  کالاهای سفارش
                </span>
              }
            />
            {params?.status === SHOP_ORDERS_STATUS_MAP.canceled && (
              <CustomAlert
                type="warning"
                showIcon
                title="این سفارش توسط خریدار لغو شد"
                description={emptyString}
              />
            )}
            {(params?.status === SHOP_ORDERS_STATUS_MAP.awaitingApproval ||
              params?.status === SHOP_ORDERS_STATUS_MAP.awaitingShipment ||
              params?.status === SHOP_ORDERS_STATUS_MAP.shipped ||
              params?.status === SHOP_ORDERS_STATUS_MAP.canceled) && (
              <CustomAlert
                type="info"
                showIcon
                title="تا وقتی کالاها تایید و ارسال نشده‌اند، خریدار می‌تواند کل سفارش را لغو کند و مبلغ آن به کیف پولش برمی‌گردد."
              />
            )}
            <CustomTable
              dataSource={orderDetailData?.items || []}
              columns={columns}
              rowKey="id"
              pagination={paginationConfig}
            />
            {params?.status === SHOP_ORDERS_STATUS_MAP.awaitingApproval && (
              <div className="flex justify-end">
                <CustomButton type="primary" onClick={openConfirmOrderModalHandler}>
                  تایید سفارش
                </CustomButton>
              </div>
            )}
            {params?.status === SHOP_ORDERS_STATUS_MAP.awaitingShipment && (
              <div className="flex justify-end">
                <CustomButton type="primary" onClick={openConfirmShipModalHandler}>
                  تایید ارسال
                </CustomButton>
              </div>
            )}
          </section>
        </div>
      </>
    </Div>
  );
};

export default ShopAllOrdersDetail;
