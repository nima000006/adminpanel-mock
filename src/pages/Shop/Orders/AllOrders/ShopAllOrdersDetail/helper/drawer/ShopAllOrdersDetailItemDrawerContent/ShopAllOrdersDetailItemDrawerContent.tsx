import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, Form } from "antd";
import { AiOutlineShopping } from "react-icons/ai";
import { PiFileText } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetPrOrdersProductDetailQuery,
  useRejectUserOrdersMutation,
} from "@infra/states/redux/Apis/shop/orders/ordersApi";
import {
  SHOP_ORDERS_STATUS_COLORS,
  SHOP_ORDERS_STATUS_MAP,
} from "@pages/Shop/_shared/utils";
import { ShopAllOrdersDetailItemDrawerContentProps } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/drawer/ShopAllOrdersDetailItemDrawerContent/@types/@shopAllOrdersDetailItemDrawerContent";
import { ShopAllOrdersDetailRejectFormType } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailRejectModalContent/@types/@shopAllOrdersDetailRejectModalContent";
import ShopAllOrdersDetailRejectModalContent from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailRejectModalContent/ShopAllOrdersDetailRejectModalContent";

const descriptionStyles: DescriptionsProps["styles"] = {
  label: {
    color: "var(--neutral-7)",
    minWidth: 140,
    textAlign: "start",
  },
  content: {
    color: "var(--neutral-10)",
    textAlign: "start",
  },
};

const ShopAllOrdersDetailItemDrawerContent = ({
  item,
  onClose,
}: ShopAllOrdersDetailItemDrawerContentProps) => {
  const [rejectForm] = Form.useForm<ShopAllOrdersDetailRejectFormType>();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getPrOrdersProductDetail,
    { data: productDetail, isFetching: isGetPrOrdersProductDetailLoading },
  ] = useLazyGetPrOrdersProductDetailQuery();

  const [rejectUserOrders, { isLoading: isRejectUserOrdersLoading }] =
    useRejectUserOrdersMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!item?.uuid) {
      return;
    }

    getPrOrdersProductDetail({ uuid: item.uuid });
  }, [item?.uuid]);

  const productInfoItems: DescriptionsProps["items"] = [
    {
      key: "productTitle",
      label: "کالا",
      children: dataPlaceHolder({
        data: productDetail?.title,
      }),
    },
    {
      key: "unitPrice",
      label: "قیمت واحد (تومان)",
      children: dataPlaceHolder({
        data: productDetail?.unitPrice,
        isPrice: true,
      }),
    },
    {
      key: "quantity",
      label: "تعداد",
      children: dataPlaceHolder({
        data: productDetail?.quantity,
      }),
    },
    {
      key: "totalAmount",
      label: "مبلغ کل (تومان)",
      children: dataPlaceHolder({
        data: productDetail?.totalPrice,
        isPrice: true,
      }),
    },
    ...(productDetail?.paymentStatus?.name
      ? [
          {
            key: "paymentStatus",
            label: "وضعیت پرداخت",
            children: dataPlaceHolder({
              data: productDetail?.paymentStatus?.name,
            }),
          },
        ]
      : []),
  ];

  const actionInfoItems: DescriptionsProps["items"] = [
    {
      key: "action",
      label: "اقدام",
      children: dataPlaceHolder({
        data: productDetail?.lastAction?.action?.title,
      }),
    },
    {
      key: "date",
      label: "تاریخ",
      children: dataPlaceHolder({
        data: productDetail?.lastAction?.date,
        isDate: true,
        customDateFormat: "YYYY/MM/DD HH:mm",
      }),
    },
    {
      key: "actor",
      label: "توسط",
      children: dataPlaceHolder({
        data: `${productDetail?.lastAction.actorName}${productDetail?.lastAction.actorRole?.title ? ` (${productDetail?.lastAction.actorRole.title})` : ""}`,
      }),
    },
    ...(productDetail?.status?.name === SHOP_ORDERS_STATUS_MAP?.shipped
      ? [
          {
            key: "shippingNote",
            label: "توضیحات ارسال",
            children: emptyString,
          },
        ]
      : []),
    ...(productDetail?.lastAction?.rejectReason
      ? [
          {
            key: "rejectReason",
            label: "علت رد",
            children: dataPlaceHolder({
              data: productDetail?.lastAction?.rejectReason?.title,
            }),
          },
        ]
      : []),
    ...(productDetail?.lastAction?.rejectDescription
      ? [
          {
            key: "rejectDescription",
            label: "توضیحات رد",
            children: dataPlaceHolder({
              data: productDetail?.lastAction?.rejectDescription,
            }),
          },
        ]
      : []),
    ...(productDetail?.lastAction?.refundedAmount
      ? [
          {
            key: "refund",
            label: "عودت وجه",
            children: `${dataPlaceHolder({
              data: productDetail?.lastAction?.refundedAmount,
              isPrice: true,
              currency: { isAvailable: true, type: "تومان" },
            })} به کیف پول خریدار برگردانده شد`,
          },
        ]
      : []),
  ];

  //* ================================ Util Functions ================================
  // reject modal
  const closeRejectModalHandler = () => {
    rejectForm.resetFields();
    setIsRejectModalOpen(false);
  };

  const confirmRejectHandler = async () => {
    if (!item?.uuid) {
      return;
    }

    rejectForm.validateFields().then((values) => {
      rejectUserOrders({
        uuid: item.uuid,
        body: {
          rejectReason: values?.rejectReason?.item?.name || "",
          rejectDescription: values.rejectDescription || "",
        },
      })
        .unwrap()
        .then(() => {
          closeRejectModalHandler();

          getPrOrdersProductDetail({ uuid: item.uuid });
        });
    });

    closeRejectModalHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetPrOrdersProductDetailLoading || isRejectUserOrdersLoading}>
      <>
        {/* reject modal */}
        {isRejectModalOpen && (
          <ConfirmationModalWithContent
            title={`رد کالای «${productDetail?.title ?? item.title}»`}
            isModalOpen={isRejectModalOpen}
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

        <CustomDrawerHeader
          title="جزئیات کالا"
          closeDrawerHandler={onClose}
          leftSideContent={
            params?.status === SHOP_ORDERS_STATUS_MAP.awaitingApproval ? (
              <>
                <CustomButton danger onClick={() => setIsRejectModalOpen(true)}>
                  رد
                </CustomButton>
                <CustomButton type="primary">تایید</CustomButton>
              </>
            ) : undefined
          }
        />
        <div className="flex flex-col gap-4">
          <CustomTag
            className="w-fit"
            color={SHOP_ORDERS_STATUS_COLORS[productDetail?.status?.name ?? ""]}
          >
            {productDetail?.status?.title}
          </CustomTag>

          <CustomDivider
            text={
              <span className="inline-flex items-center gap-2">
                <AiOutlineShopping size={20} />
                اطلاعات کالا
              </span>
            }
          />
          <Descriptions
            column={1}
            colon={false}
            styles={descriptionStyles}
            items={productInfoItems}
          />
          <CustomDivider
            text={
              <span className="inline-flex items-center gap-2">
                <PiFileText size={20} />
                آخرین اقدام و توضیحات
              </span>
            }
          />
          <Descriptions
            column={1}
            colon={false}
            styles={descriptionStyles}
            items={actionInfoItems}
          />
        </div>
      </>
    </Div>
  );
};

export default ShopAllOrdersDetailItemDrawerContent;
