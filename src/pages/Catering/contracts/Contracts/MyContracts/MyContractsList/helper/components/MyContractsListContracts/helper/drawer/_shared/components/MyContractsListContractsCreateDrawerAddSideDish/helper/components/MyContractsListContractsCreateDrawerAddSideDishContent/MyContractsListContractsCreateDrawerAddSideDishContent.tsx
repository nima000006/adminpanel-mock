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
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CATERING_PRODUCT_CATEGORIES,
  CATERING_STATUS_TYPES,
  CATERING_STATUS_TYPES_MAIN_LIST,
} from "@pages/Catering/_shared/utils";
import { getBasicInfoFoodsListResponse } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import {
  MyContractsListContractsCreateDrawerAddSideDishFormType,
  MyContractsListContractsCreateDrawerAddSideDishProps,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddSideDish/@types/@myContractsListContractsCreateDrawerAddSideDish";
import { CreateMyFoodRequest } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/@types/@cateringMyFoodList";

const CREATE_SIDE_DISH_SUCCESS_MSG = "مخلفات با موفقیت به قرارداد اضافه شد.";
const REQUIRED_CONTRACT_ID_MSG = "ابتدا قرارداد را ثبت کنید.";
const LIST_PAGE_NUMBER = 0;
const LIST_PAGE_SIZE = 100;

const MyContractsListContractsCreateDrawerAddSideDishContent = ({
  contractId,
  onClose,
  onSuccess,
}: Omit<MyContractsListContractsCreateDrawerAddSideDishProps, "open">) => {
  const [form] = Form.useForm<MyContractsListContractsCreateDrawerAddSideDishFormType>();
  const [sideDishOptions, setSideDishOptions] = useState<IdTitle[]>([]);

  //? ================================  Api Calls ================================
  const [createMyFood, { isLoading: isCreateMyFoodLoading }] = useCreateMyFoodMutation();
  const [
    getBasicInfoFoodsList,
    {
      isLoading: isGetBasicInfoFoodsListLoading,
      isSuccess: isGetBasicInfoFoodsListSuccess,
    },
  ] = useGetBasicInfoFoodsListMutation();

  //* ================================ Util Functions ================================
  const onGetBasicInfoFoodsListSuccess = (res: getBasicInfoFoodsListResponse) => {
    setSideDishOptions(
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
        pageNumber: LIST_PAGE_NUMBER,
        pageSize: LIST_PAGE_SIZE,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategoryId: CATERING_PRODUCT_CATEGORIES.SIDE_DISH,
      },
    })
      .unwrap()
      .then(onGetBasicInfoFoodsListSuccess);
  };

  const onCreateSideDishSuccess = () => {
    toast.success(CREATE_SIDE_DISH_SUCCESS_MSG, {
      toastId: CREATE_SIDE_DISH_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
    onClose();
  };

  const submitHandler = (
    values: MyContractsListContractsCreateDrawerAddSideDishFormType
  ) => {
    if (contractId == null) {
      toast.error(REQUIRED_CONTRACT_ID_MSG, {
        toastId: REQUIRED_CONTRACT_ID_MSG,
      });
      return;
    }

    const price = Number(values.price);

    const request: CreateMyFoodRequest = {
      title: values.adminDisplayTitle,
      userTitle: values.userDisplayTitle,
      description: values.description ?? "",
      studentalPrice: price,
      maxPrice: price,
      contractId,
      statusType: CATERING_STATUS_TYPES.ACTIVE_SHOW,
      productBaseId: values.sideDish.code,
    };

    createMyFood(request).unwrap().then(onCreateSideDishSuccess);
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
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="flex items-center gap-2">
            <CustomButton
              htmlType="button"
              onClick={onClose}
              disabled={isCreateMyFoodLoading}
            >
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isCreateMyFoodLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />

      <div className="flex flex-col gap-6">
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

export default MyContractsListContractsCreateDrawerAddSideDishContent;
