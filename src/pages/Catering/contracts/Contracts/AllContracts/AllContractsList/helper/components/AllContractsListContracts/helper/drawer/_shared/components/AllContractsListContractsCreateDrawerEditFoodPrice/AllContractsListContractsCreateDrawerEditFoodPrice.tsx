import { useEffect, useMemo } from "react";

import { Col, Form, Row } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-toastify";

import { CustomInputNumber } from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useUpdateAllRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  AllContractsListContractsCreateDrawerEditFoodPriceFormType,
  AllContractsListContractsCreateDrawerEditFoodPriceProps,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerEditFoodPrice/@types/@allContractsListContractsCreateDrawerEditFoodPrice";
import {
  UpdateAllRequestContractProductRequest,
  UpdateAllRequestContractProductResponse,
} from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/@types/@requestsContractsListWaitedCreatedDrawerContentFoods";

import "./_allContractsListContractsCreateDrawerEditFoodPrice.scss";

const UPDATE_ALL_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG = "قیمت غذا با موفقیت ویرایش شد.";
const EDIT_FOOD_PRICE_MODAL_Z_INDEX = 1200;

const AllContractsListContractsCreateDrawerEditFoodPrice = ({
  open,
  product,
  onClose,
  onSuccess,
}: AllContractsListContractsCreateDrawerEditFoodPriceProps) => {
  const [form] =
    Form.useForm<AllContractsListContractsCreateDrawerEditFoodPriceFormType>();

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
    updateAllRequestContractProduct,
    { isLoading: isUpdateAllRequestContractProductLoading },
  ] = useUpdateAllRequestContractProductMutation();

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
  const onUpdateSuccess = (_res: UpdateAllRequestContractProductResponse) => {
    toast.success(UPDATE_ALL_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG, {
      toastId: UPDATE_ALL_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
    onClose();
  };

  const submitHandler = (
    values: AllContractsListContractsCreateDrawerEditFoodPriceFormType
  ) => {
    if (!product) return;

    const request: UpdateAllRequestContractProductRequest = {
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

    updateAllRequestContractProduct(request).unwrap().then(onUpdateSuccess);
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
      confirmLoading={isUpdateAllRequestContractProductLoading}
      onConfirm={() => form.submit()}
      destroyOnClose
      showHeaderDivider={false}
      zIndex={EDIT_FOOD_PRICE_MODAL_Z_INDEX}
      className="all-contracts-list-contracts-create-drawer-edit-food-price-modal"
    >
      {product ? (
        <Form
          form={form}
          onFinish={submitHandler}
          className="all-contracts-list-contracts-create-drawer-edit-food-price-modal__body"
        >
          <CustomUploader
            fileList={previewFileList}
            setFileList={() => undefined}
            isReadOnly
            isDisabled
            hasUploaderIcon={false}
            maxCount={1}
            classNameOuterDiv="all-contracts-list-contracts-create-drawer-edit-food-price-modal__image"
            UploadSizeLimitConfig={{ isActive: false }}
          />

          <Row
            gutter={[16, 16]}
            className="all-contracts-list-contracts-create-drawer-edit-food-price-modal__fields"
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

export default AllContractsListContractsCreateDrawerEditFoodPrice;
