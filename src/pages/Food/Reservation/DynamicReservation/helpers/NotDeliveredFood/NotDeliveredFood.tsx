import { Dispatch, SetStateAction } from "react";

import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { PriceSeparator } from "@infra/helpers/utils";
import { useDeliverUserPlanByIdMutation } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { DeliverableFood } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PersonsReturnedMoney/helper/drawers/FoodReturnedMoney/@types/@foodReturnedMoneyDrawerContent";

const requestTypesModel = {
  "0": "دانشجویی",
  "1": "آزاد",
  "2": "روزفروش",
};
const DELIVER_SUCCESS = "تحویل شد";
const DELIVER_FAIL = "درخواست با خطا مواجه شد";

const NotDeliveredFood = ({
  data,
  setData,
  openScanner,
  // getData,
}: {
  data: DeliverableFood;
  setData: Dispatch<SetStateAction<DeliverableFood[]>>;
  openScanner: () => void;
  // getData: () => void;
}) => {
  const [deliverFoodById, { isLoading: isDeliveringFoodDataLoading }] =
    useDeliverUserPlanByIdMutation();

  return (
    <>
      <div className="custom-food-detail-card">
        <div className="top-bar-info">
          <div className="date">{data?.persianDate}</div>
          <div className="self-name">{data?.restaurantTitle}</div>
          <div className="food-name">{data?.productTitle}</div>
          <div className="count-container">
            <div className="title">تعداد</div>
            <div className="count">{data?.quantity}</div>
          </div>
          <div className="tags">
            <CustomTag color="green">{data?.mealName}</CustomTag>
            <CustomTag color="green">
              {requestTypesModel[data?.requestType?.toString() as "0" | "1" | "2"]}
            </CustomTag>
          </div>
        </div>
        <div className="bottom-bar-info">
          <div className="name-container">
            <div className="label">نام و نام خانوادگی</div>
            <div className="value">{`${data?.firstName} ${data?.lastName}`}</div>
          </div>
          <div className="name-container">
            <div className="label">کد ملی</div>
            <div className="value">{data?.userName}</div>
          </div>
          <div className="name-container">
            <div className="label">شماره دانشجویی</div>
            <div className="value">{data?.studentNumber}</div>
          </div>
          <div className="name-container">
            <div className="label">واحد دانشگاهی</div>
            <div className="value">{data?.branchName}</div>
          </div>
          <CustomDivider variant="dashed" className="bottom-bar-divider" />
          <div className="name-container">
            <div className="label">قیمت واحد</div>
            <div className="value">
              {PriceSeparator(data?.basePrice?.toString() ?? "0", false)} &nbsp; ریال
            </div>
          </div>
        </div>
      </div>
      <CustomButton
        type="primary"
        onClick={() => {
          deliverFoodById({ basketPlanId: data?.id?.toString() })
            .unwrap()
            .then(() => {
              toast.success(DELIVER_SUCCESS, { toastId: DELIVER_SUCCESS });
              // getData();
              setData([]);
              openScanner();
            })
            .catch(() => toast.error(DELIVER_FAIL, { toastId: DELIVER_FAIL }));
        }}
        loading={isDeliveringFoodDataLoading}
      >
        تحویل
      </CustomButton>

      <div className="order-number">شماره سفارش {data?.id}</div>
      {/* {isScannerOpen && (
        <CustomQrScanner
          isScannerOpen={isScannerOpen}
          handleScanSuccess={handleScanSuccess}
          handleCloseScan={handleCloseScan}
        />
      )} */}
    </>
  );
};
export default NotDeliveredFood;
