import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import { CustomInputNumber, CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { useGetAdminSuppliersQuery } from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { useCreateShopAllProductsDetailSupplierBookMutation } from "@infra/states/redux/Apis/shop/products/productsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  ShopAllProductsDetailAddSellerFormType,
  ShopAllProductsDetailAddSellerModalProps,
} from "./@types/@shopAllProductsDetailAddSellerModal";

const SUPPLIERS_PAGE_NUMBER = 0;
const SUPPLIERS_PAGE_SIZE = 100;

const INITIAL_VALUES: ShopAllProductsDetailAddSellerFormType = {
  supplierUuid: undefined,
  payablePrice: null,
  quantity: null,
  strikePrice: null,
};

const ShopAllProductsDetailAddSellerModal = ({
  open,
  bookUuid,
  onCancel,
  onSuccess,
}: ShopAllProductsDetailAddSellerModalProps) => {
  const [form] = Form.useForm<ShopAllProductsDetailAddSellerFormType>();
  const [selectedSupplierUuid, setSelectedSupplierUuid] = useState("");
  const [isSupplierOptionsOpen, setIsSupplierOptionsOpen] = useState(false);

  //? ================================  Api Calls ================================
  const [
    createShopAllProductsDetailSupplierBook,
    { isLoading: isCreateShopAllProductsDetailSupplierBookLoading },
  ] = useCreateShopAllProductsDetailSupplierBookMutation();

  const { data: getAdminSuppliersData, isFetching: isGetAdminSuppliersLoading } =
    useGetAdminSuppliersQuery(
      {
        pageNumber: SUPPLIERS_PAGE_NUMBER,
        pageSize: SUPPLIERS_PAGE_SIZE,
      },
      {
        skip: !open || !isSupplierOptionsOpen,
        refetchOnMountOrArgChange: true,
      }
    );

  const sellerOptions =
    getAdminSuppliersData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  //* ================================ Effects  ================================
  useEffect(() => {
    if (!open) {
      setSelectedSupplierUuid("");
      setIsSupplierOptionsOpen(false);
      return;
    }

    setSelectedSupplierUuid("");
    form.setFieldsValue(INITIAL_VALUES);
  }, [form, open]);

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    form.resetFields();
    setSelectedSupplierUuid("");
    setIsSupplierOptionsOpen(false);
    onCancel();
  };

  const onSupplierChange = (value: unknown) => {
    setSelectedSupplierUuid(value as string);
  };

  const onSupplierOptionsOpenChange = (visible: boolean) => {
    setIsSupplierOptionsOpen(visible);
  };

  const confirmHandler = async () => {
    if (!bookUuid) {
      return;
    }

    const values = await form.validateFields();

    await createShopAllProductsDetailSupplierBook({
      supplierUuid: selectedSupplierUuid,
      bookUuid,
      price: Number(values.payablePrice ?? 0) * 10,
      discountedPrice: Number(values.strikePrice ?? 0) * 10,
      quantity: values.quantity ?? 0,
    })
      .unwrap()
      .then(() => {
        form.resetFields();
        setSelectedSupplierUuid("");
        setIsSupplierOptionsOpen(false);
        onSuccess?.();
        onCancel();
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomModal
      open={open}
      onCancel={cancelHandler}
      title="افزودن فروشنده"
      size="medium"
      variant="form"
      confirmText="افزودن"
      cancelText="انصراف"
      onConfirm={confirmHandler}
      confirmLoading={isCreateShopAllProductsDetailSupplierBookLoading}
      className="[&_.ant-modal-body]:px-0!"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        className="flex flex-col gap-5"
        initialValues={INITIAL_VALUES}
      >
        <CustomSelect
          name="supplierUuid"
          label="فروشنده"
          placeholder="انتخاب از تامین‌کنندگان"
          options={sellerOptions}
          form={form}
          rules={[REQUIRED_RULE]}
          isLoading={isGetAdminSuppliersLoading}
          onChange={onSupplierChange}
          onOpenChange={onSupplierOptionsOpenChange}
        />

        <CustomDivider titlePlacement="right" text="تنظیمات مالی" />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <CustomInputNumber
              name="payablePrice"
              label="قیمت قابل پرداخت"
              placeholder="مثلاً 108,900"
              suffix="تومان"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} md={12}>
            <CustomInputNumber
              name="quantity"
              label="موجودی"
              placeholder="مثلاً 10"
              suffix="عدد"
              min={0}
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>

        <CustomDivider titlePlacement="right" text="تنظیمات تخفیف" />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <CustomInputNumber
              name="strikePrice"
              label="قیمت خط خورده"
              placeholder="مثلاً 121,000"
              suffix="تومان"
              extra="فقط برای نمایش؛ در مبلغ پرداخت اثری ندارد."
            />
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};

export default ShopAllProductsDetailAddSellerModal;
