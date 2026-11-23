import { useEffect, useMemo } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import { CustomInputNumber } from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useUpdateMyRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  MyContractsListContractsCreateDrawerEditFoodPriceFormType,
  MyContractsListContractsCreateDrawerEditFoodPriceProps,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerEditFoodPrice/@types/@myContractsListContractsCreateDrawerEditFoodPrice";
import {
  UpdateMyRequestContractProductRequest,
  UpdateMyRequestContractProductResponse,
} from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentFoods/@types/@requestMyContractsListWaitedCreatedDrawerContentFoods";

import "./_myContractsListContractsCreateDrawerEditFoodPrice.scss";

const UPDATE_MY_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG = "قیمت غذا با موفقیت ویرایش شد.";
const EDIT_FOOD_PRICE_MODAL_Z_INDEX = 1200;

const MyContractsListContractsCreateDrawerEditFoodPrice = ({
  open,
  product,
  onClose,
  onSuccess,
}: MyContractsListContractsCreateDrawerEditFoodPriceProps) => {
  const [form] =
    Form.useForm<MyContractsListContractsCreateDrawerEditFoodPriceFormType>();

  const previewFileList = useMemo((): UploadFile[] => {
    if (!product?.mainImage) {
      return [];
    }

    return [
      {
        uid: product.mainImage,
        name: product.mainImage,
        status: "done",
        url: product.mainImage,
      },
    ];
  }, [product?.mainImage]);

  //? ================================ Api Calls ================================
  const [
    updateMyRequestContractProduct,
    { isLoading: isUpdateMyRequestContractProductLoading },
  ] = useUpdateMyRequestContractProductMutation();

  //* ================================ Effects  ================================
  useEffect(() => {
    if (!open || !product) {
      form.resetFields();
      return;
    }

    form.setFieldsValue({
      studentalPrice: product.studentalPrice,
      maxPrice: product.maxPrice,
    });
  }, [form, open, product]);

  //* ================================ Util Functions ================================
  const onUpdateSuccess = (_res: UpdateMyRequestContractProductResponse) => {
    toast.success(UPDATE_MY_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG, {
      toastId: UPDATE_MY_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
    onClose();
  };

  const submitHandler = (
    values: MyContractsListContractsCreateDrawerEditFoodPriceFormType
  ) => {
    if (!product) return;

    const request: UpdateMyRequestContractProductRequest = {
      id: product.id,
      contractId: product.contractId,
      title: product.title,
      description: product.description,
      studentalPrice: Number(values.studentalPrice),
      maxPrice: Number(values.maxPrice),
      mainImage: product.mainImageTitle || null,
      secondImage: product.secondImageTitle || null,
      thirdImage: product.thirdImageTitle || null,
      fourthImage: product.fourthImageTitle || null,
    };

    updateMyRequestContractProduct(request).unwrap().then(onUpdateSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomModal
      open={open && Boolean(product)}
      onCancel={onClose}
      title="ویرایش قیمت"
      size="medium"
      width={640}
      confirmText="ثبت تغییرات"
      cancelText="انصراف"
      confirmLoading={isUpdateMyRequestContractProductLoading}
      onConfirm={() => form.submit()}
      destroyOnClose
      showHeaderDivider={false}
      zIndex={EDIT_FOOD_PRICE_MODAL_Z_INDEX}
      className="my-contracts-list-contracts-create-drawer-edit-food-price-modal"
    >
      {product ? (
        <Form
          form={form}
          onFinish={submitHandler}
          className="my-contracts-list-contracts-create-drawer-edit-food-price-modal__body"
        >
          <CustomUploader
            fileList={previewFileList}
            setFileList={() => undefined}
            isReadOnly
            isDisabled
            hasUploaderIcon={false}
            maxCount={1}
            classNameOuterDiv="my-contracts-list-contracts-create-drawer-edit-food-price-modal__image"
            UploadSizeLimitConfig={{ isActive: false }}
          />

          <Row
            gutter={[16, 16]}
            className="my-contracts-list-contracts-create-drawer-edit-food-price-modal__fields"
          >
            <SingleVerticalWithCol
              label="غذا"
              value={product.baseProductTitle}
              span={12}
            />
            <SingleVerticalWithCol
              label="عنوان نمایشی به کاربر"
              value={product.userTitle}
              span={12}
            />
            <SingleVerticalWithCol
              label="عنوان نمایشی در پنل مدیریت تغذیه"
              value={product.title}
              span={24}
            />
            <SingleVerticalWithCol
              label="توضیحات نمایشی به کاربر"
              value={product.description}
              span={24}
            />
            <Col xs={24} sm={12}>
              <CustomInputNumber
                type="text"
                label="قیمت دانشجویی"
                name="studentalPrice"
                placeholder="قیمت دانشجویی"
                isPrice
                suffix="ریال"
                initialValue={product.studentalPrice}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col xs={24} sm={12}>
              <CustomInputNumber
                type="text"
                label="حداکثر قیمت"
                name="maxPrice"
                placeholder="حداکثر قیمت"
                isPrice
                suffix="ریال"
                initialValue={product.maxPrice}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>
        </Form>
      ) : null}
    </CustomModal>
  );
};

export default MyContractsListContractsCreateDrawerEditFoodPrice;
