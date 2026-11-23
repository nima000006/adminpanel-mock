import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomInputNumber,
  CustomTextArea,
} from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useUpdateMyRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useViewMyFoodQuery } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { UpdateMyRequestContractProductRequest } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentFoods/@types/@requestMyContractsListWaitedCreatedDrawerContentFoods";
import {
  CateringMyFoodSideDishesEditDrawerContentProps,
  CateringMyFoodSideDishesEditDrawerFormType,
} from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesList/helper/drawer/CateringMyFoodSideDishesListEditDrawerContent/@types/@cateringMyFoodSideDishesListEditDrawerContent";

const UPDATE_MY_SIDE_DISH_SUCCESS_MSG = "مخلفات با موفقیت ویرایش شد.";

const CateringMyFoodSideDishesEditDrawerContent = ({
  closeDrawerHandler,
  id,
  onSuccess,
}: CateringMyFoodSideDishesEditDrawerContentProps) => {
  const [form] = Form.useForm<CateringMyFoodSideDishesEditDrawerFormType>();

  //? ================================ Api Calls ================================
  const { data: sideDishViewData, isFetching: isViewMyFoodLoading } = useViewMyFoodQuery(
    { id: Number(id) },
    { skip: !id || id < 0, refetchOnMountOrArgChange: true }
  );

  const [
    updateMyRequestContractProduct,
    { isLoading: isUpdateMyRequestContractProductLoading },
  ] = useUpdateMyRequestContractProductMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!sideDishViewData) return;

    form.setFieldsValue({
      price: sideDishViewData.studentalPrice,
      description: sideDishViewData.description,
    });
  }, [sideDishViewData, form]);

  //* ================================ Util Functions ================================
  const onUpdateMySideDishSuccess = () => {
    toast.success(UPDATE_MY_SIDE_DISH_SUCCESS_MSG, {
      toastId: UPDATE_MY_SIDE_DISH_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
    closeDrawerHandler();
  };

  const submitHandler = (values: CateringMyFoodSideDishesEditDrawerFormType) => {
    if (!sideDishViewData) return;

    const price = Number(values.price);

    const request: UpdateMyRequestContractProductRequest = {
      id,
      contractId: sideDishViewData.contractId,
      title: sideDishViewData.title,
      userTitle: sideDishViewData.userTitle,
      productBaseId: sideDishViewData.baseProductId,
      description: values.description ?? "",
      studentalPrice: price,
      maxPrice: price,
      mainImage: sideDishViewData.mainImage || null,
      secondImage: sideDishViewData.secondImage || null,
      thirdImage: sideDishViewData.thirdImage || null,
      fourthImage: sideDishViewData.fourthImage || null,
    };

    updateMyRequestContractProduct(request).unwrap().then(onUpdateMySideDishSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={submitHandler}>
      <CustomDrawerHeader
        title="ویرایش مخلفات"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex items-center gap-2">
            <CustomButton
              htmlType="button"
              onClick={closeDrawerHandler}
              disabled={isUpdateMyRequestContractProductLoading}
            >
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isUpdateMyRequestContractProductLoading}
            >
              تایید و اعمال تغییرات
            </CustomButton>
          </div>
        }
      />

      <Div loading={isViewMyFoodLoading}>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="مخلفات"
            value={sideDishViewData?.baseProductTitle}
            span={12}
          />
          <SingleVerticalWithCol
            label="عنوان نمایشی مخلفات"
            value={sideDishViewData?.title}
            span={12}
          />
          <Col xs={24} sm={12}>
            <CustomInputNumber
              key={`price-${id}-${sideDishViewData?.studentalPrice ?? "loading"}`}
              type="text"
              label="قیمت"
              name="price"
              placeholder="قیمت مخلفات را وارد نمایید."
              isPrice
              suffix="ریال"
              initialValue={sideDishViewData?.studentalPrice}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <SingleVerticalWithCol
            label="قرارداد"
            value={sideDishViewData?.contractTitle}
            span={12}
          />
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              placeholder="توضیحات را وارد نمایید..."
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Col>
        </Row>
      </Div>
    </Form>
  );
};

export default CateringMyFoodSideDishesEditDrawerContent;
