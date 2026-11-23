import { useState } from "react";

import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomInput,
  CustomInputNumber,
  CustomSelect,
  CustomTextArea,
} from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useGetBasicInfoFoodsListMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { useCreateMyFoodMutation } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import { useGetDetailMySelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CATERING_PRODUCT_CATEGORIES,
  CATERING_STATUS_TYPES,
  CATERING_STATUS_TYPES_MAIN_LIST,
} from "@pages/Catering/_shared/utils";
import { getBasicInfoFoodsListResponse } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import { REQUEST_CONTRACT_STATUS_FILTER } from "@pages/Catering/contracts/_shared/@requestContractStatus";
import { CreateMyFoodRequest } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/@types/@cateringMyFoodList";
import {
  CateringMyFoodSideDishesCreateDrawerContentProps,
  CateringMyFoodSideDishesCreateDrawerFormType,
} from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesList/helper/drawer/CateringMyFoodSideDishesListCreateDrawerContent/@types/@cateringMyFoodSideDishesListCreateDrawerContent";
import { GetDetailMySelfsContractsResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

const CREATE_MY_SIDE_DISH_SUCCESS_MSG = "مخلفات با موفقیت ایجاد شد.";

const CateringMyFoodSideDishesCreateDrawerContent = ({
  closeDrawerHandler,
  onSuccess,
}: CateringMyFoodSideDishesCreateDrawerContentProps) => {
  const [form] = Form.useForm<CateringMyFoodSideDishesCreateDrawerFormType>();
  const [sideDishOptions, setSideDishOptions] = useState<IdTitle[]>([]);
  const [contractOptions, setContractOptions] = useState<IdTitle[]>([]);

  //? ================================ Api Calls ================================
  const [createMyFood, { isLoading: isCreateMyFoodLoading }] = useCreateMyFoodMutation();

  const [
    getBasicInfoFoodsList,
    {
      isLoading: isGetBasicInfoFoodsListLoading,
      isSuccess: isGetBasicInfoFoodsListSuccess,
    },
  ] = useGetBasicInfoFoodsListMutation();

  const [
    getDetailMySelfsContracts,
    {
      isLoading: isGetDetailMySelfsContractsLoading,
      isSuccess: isGetDetailMySelfsContractsSuccess,
    },
  ] = useGetDetailMySelfsContractsMutation();

  //* ================================ Util Functions ================================
  const onGetBasicInfoFoodsListSuccess = (res: getBasicInfoFoodsListResponse) => {
    setSideDishOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetDetailMySelfsContractsSuccess = (res: GetDetailMySelfsContractsResponse) => {
    setContractOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const getSideDishesHandler = () => {
    if (isGetBasicInfoFoodsListSuccess) {
      return;
    }

    getBasicInfoFoodsList({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategoryId: CATERING_PRODUCT_CATEGORIES.SIDE_DISH,
      },
    })
      .unwrap()
      .then(onGetBasicInfoFoodsListSuccess);
  };

  const getContractsHandler = () => {
    if (isGetDetailMySelfsContractsSuccess) {
      return;
    }

    getDetailMySelfsContracts({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        contractStatus: [...REQUEST_CONTRACT_STATUS_FILTER.accepted],
      },
    })
      .unwrap()
      .then(onGetDetailMySelfsContractsSuccess);
  };

  const onCreateMySideDishSuccess = () => {
    toast.success(CREATE_MY_SIDE_DISH_SUCCESS_MSG, {
      toastId: CREATE_MY_SIDE_DISH_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
    closeDrawerHandler();
  };

  const submitHandler = (values: CateringMyFoodSideDishesCreateDrawerFormType) => {
    const price = Number(values.price);

    const request: CreateMyFoodRequest = {
      title: values.adminDisplayTitle ?? "",
      userTitle: values.userDisplayTitle ?? "",
      description: values.description ?? "",
      studentalPrice: price,
      maxPrice: price,
      contractId: values.contract!.code,
      statusType: CATERING_STATUS_TYPES.ACTIVE_SHOW,
      productBaseId: values.sideDish!.code,
    };

    createMyFood(request).unwrap().then(onCreateMySideDishSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form
      className="[&_.custom-select-container]:m-0"
      form={form}
      onFinish={submitHandler}
    >
      <CustomDrawerHeader
        title="افزودن مخلفات"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex items-center gap-2">
            <CustomButton
              htmlType="button"
              onClick={closeDrawerHandler}
              disabled={isCreateMyFoodLoading}
            >
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isCreateMyFoodLoading}
            >
              ثبت و تایید
            </CustomButton>
          </div>
        }
      />

      <div className="flex flex-col gap-6 p-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <CustomSelect
              label="مخلفات"
              name="sideDish"
              placeholder="انتخاب کنید"
              options={sideDishOptions}
              isLoading={isGetBasicInfoFoodsListLoading}
              form={form}
              rules={[REQUIRED_RULE]}
              onClick={getSideDishesHandler}
              notFoundContent={
                !isGetBasicInfoFoodsListSuccess ? selectNotFoundContent : undefined
              }
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInput
              type="text"
              label="عنوان نمایشی مخلفات در پنل ادمین"
              name="adminDisplayTitle"
              placeholder="عنوان نمایشی مخلفات در پنل ادمین را وارد نمایید."
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInput
              type="text"
              label="عنوان نمایشی مخلفات به کاربر"
              name="userDisplayTitle"
              placeholder="عنوان نمایشی مخلفات به کاربر را وارد نمایید."
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInputNumber
              type="text"
              label="قیمت"
              name="price"
              placeholder="قیمت مخلفات را وارد نمایید."
              isPrice
              suffix="ریال"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomSelect
              label="قرارداد"
              name="contract"
              placeholder="انتخاب کنید"
              options={contractOptions}
              isLoading={isGetDetailMySelfsContractsLoading}
              form={form}
              rules={[REQUIRED_RULE]}
              onClick={getContractsHandler}
              notFoundContent={
                !isGetDetailMySelfsContractsSuccess ? selectNotFoundContent : undefined
              }
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              placeholder="توضیحات را وارد نمایید..."
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default CateringMyFoodSideDishesCreateDrawerContent;
