import { useEffect, useState } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import { useGetFoodReturnedMoneyTotalAmountMutation } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { FoodTransInstantSettlementDrawerContentProps } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/helper/drawers/FoodTransInstantSettlement/@types/@foodTransInstantSettlementDrawerContent";

import { GetFoodReturnedMoneyTotalAmountResponse } from "../FoodTransformRequests/@types/@foodTransformRequestsDrawerContent";
import FoodReturnTransactionInfo from "./helper/components/FoodReturnTransactionInfo/FoodReturnTransactionInfo";
import FoodTransformSelectedProcessing from "../FoodTransformRequests/helper/components/FoodTransformSelectedProcessing/FoodTransformSelectedProcessing";

const FoodTransInstantSettlementDrawerContent = ({
  closeDrawerHandler,
  selectedRequests,
}: FoodTransInstantSettlementDrawerContentProps) => {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedData, setSelectedData] = useState<any[]>(selectedRequests || []);

  const requestIds = selectedRequests.map((item: any) => item.id);

  //? ================================  Api Calls ================================
  const [getTotalAmount, { isLoading: isGetTotalAmountLoading }] =
    useGetFoodReturnedMoneyTotalAmountMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, []);

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

  const onRemove = (removedIds: React.Key[]) => {
    const filtered = selectedData.filter((item: any) => !removedIds.includes(item.id));
    setSelectedData(filtered);
  };

  // btn handler
  const nextBtnHandler = () => {
    setCurrent(1);
  };
  const backBtnHandler = () => {
    setCurrent(0);
  };
  const confirmBtnHandler = () => {};

  //* ================================ Steps ================================
  const stepsItem = [
    {
      id: "1",
      children: (
        <FoodTransformSelectedProcessing
          dataSource={selectedRequests}
          total={total}
          loading={isGetTotalAmountLoading}
          onRemove={onRemove}
        />
      ),
    },
    {
      id: "2",
      children: (
        <FoodReturnTransactionInfo total={total} loading={isGetTotalAmountLoading} />
      ),
    },
  ];
  return (
    <div>
      <CustomDrawerHeader
        title=""
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
                >
                  تایید و تسویه
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
              title: "اطلاعات تراکنش عودت",
            },
          ]}
        />
        {stepsItem[current].children}
      </div>
    </div>
  );
};

export default FoodTransInstantSettlementDrawerContent;
