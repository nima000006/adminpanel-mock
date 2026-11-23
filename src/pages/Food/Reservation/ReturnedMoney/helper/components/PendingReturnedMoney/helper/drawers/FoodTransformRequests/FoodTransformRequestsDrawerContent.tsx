import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import {
  useGetFoodReturnedMoneyTotalAmountMutation,
  useSendTransferToPendingPaymentListMutation,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  FoodTransformRequestsDrawerContentProps,
  GetFoodReturnedMoneyTotalAmountResponse,
  SendTransferToPendingPaymentListResponse,
} from "./@types/@foodTransformRequestsDrawerContent";
import FoodTransformPendingPayment from "./helper/components/FoodTransformPendingPayment/FoodTransformPendingPayment";
import FoodTransformSelectedProcessing from "./helper/components/FoodTransformSelectedProcessing/FoodTransformSelectedProcessing";
import { CancelRequestsType } from "../../../@types/@foodPendingReturnedMoney";

const SUCCESS_ADD_TRANSACTION =
  "تراکنش‌های انتخاب شده شما با موفقیت به لیست “در انتظار پرداخت” اضافه شد.";

const FoodTransformRequestsDrawerContent = ({
  closeDrawerHandler,
  selectedRequests,
  setActiveKey,
  setSelectedRequests,
  updateTable,
}: FoodTransformRequestsDrawerContentProps) => {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [filteredRequests, setFilteredRequests] = useState(selectedRequests);
  const [form] = Form.useForm<{ listName: string }>();

  const requestIds = filteredRequests.map((item: CancelRequestsType) => item.id);
  //? ================================  Api Calls ================================
  // get total amount
  const [getTotalAmount, { isLoading: isGetTotalAmountLoading }] =
    useGetFoodReturnedMoneyTotalAmountMutation();

  // send pending payment list
  const [sendPendingPayment, { isLoading: isSendPendingPayment }] =
    useSendTransferToPendingPaymentListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [filteredRequests]);

  //* ================================ Util Functions ================================
  const getData = () => {
    getTotalAmount(requestIds).unwrap().then(getTotalAmountSuccess);
  };

  // success
  const getTotalAmountSuccess = async (
    values: GetFoodReturnedMoneyTotalAmountResponse
  ) => {
    if (values?.status === 200) {
      setTotal(values?.data?.totalBasePrice);
    }
  };

  // success
  const sendPendingPaymentIsSuccess = (
    value: SendTransferToPendingPaymentListResponse
  ) => {
    if (value?.status === 200) {
      closeDrawerHandler();
      updateTable?.();
      toast.success(SUCCESS_ADD_TRANSACTION, { toastId: SUCCESS_ADD_TRANSACTION });
      setActiveKey("2");
    }
  };

  const handleRemove = (ids: React.Key[]) => {
    const updated = filteredRequests.filter((item: any) => !ids.includes(item.id));
    setFilteredRequests(updated);
    setSelectedRequests(updated);
  };

  // btn handler
  const nextBtnHandler = () => {
    setCurrent(1);
  };
  const backBtnHandler = () => {
    setCurrent(0);
  };
  const confirmBtnHandler = () => {
    form.submit();
    form?.validateFields().then(() => {
      const { listName } = form.getFieldsValue();
      sendPendingPayment({
        requestIds: requestIds,
        title: listName,
      })
        .unwrap()
        .then(sendPendingPaymentIsSuccess);
    });
  };

  //* ================================ Steps ================================
  const stepsItem = [
    {
      id: "1",
      children: (
        <FoodTransformSelectedProcessing
          dataSource={selectedRequests}
          total={total}
          loading={isGetTotalAmountLoading}
          onRemove={handleRemove}
        />
      ),
    },
    {
      id: "2",
      children: <FoodTransformPendingPayment form={form} />,
    },
  ];
  return (
    <div>
      <CustomDrawerHeader
        title="انتقال به لیست در انتظار پرداخت"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-action-btns-container">
            {current === 0 ? (
              <>
                <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
                <CustomButton
                  type="primary"
                  icon={<AiOutlineArrowLeft />}
                  iconPlacement="end"
                  onClick={nextBtnHandler}
                >
                  تایید و ادامه
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton onClick={backBtnHandler}>بازگشت</CustomButton>
                <CustomButton
                  type="primary"
                  icon={<AiOutlineArrowLeft />}
                  iconPlacement="end"
                  onClick={confirmBtnHandler}
                  loading={isSendPendingPayment}
                >
                  انتقال به لیست در انتظار پرداخت
                </CustomButton>
              </>
            )}
          </div>
        }
      />
      <div className="drawer-body">
        <CustomSteps
          type="navigation"
          current={current}
          items={[
            {
              status: stepStatusCreator(current, 0),
              title: "بررسی انتخاب شده‌ها",
            },
            {
              status: stepStatusCreator(current, 1),
              title: "انتقال به لیست در انتظار پرداخت",
            },
          ]}
        />
        {stepsItem[current].children}
      </div>
    </div>
  );
};

export default FoodTransformRequestsDrawerContent;
