import { useState } from "react";

import { Badge } from "antd";
import dayjs from "dayjs";
import { AiOutlineQrcode } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomQrScanner from "@components/CustomInputs/CustomQrScanner/CustomQrScanner";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { PriceSeparator } from "@infra/helpers/utils";
import { DeliverableFood } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PersonsReturnedMoney/helper/drawers/FoodReturnedMoney/@types/@foodReturnedMoneyDrawerContent";

import useDynamicFoodNavigation from "../../_shared/useDynamicFoodNavigation";

const DeliveredFood = ({
  data,
  // setData,
  // form,
}: {
  data: DeliverableFood;
  // setData: Dispatch<SetStateAction<DeliverableFood[]>>;
  // form: FormInstance<FoodBarcodeFormValues>;
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const { handleScanSuccess: handleScanSuccessNav } = useDynamicFoodNavigation();

  const handleScanSuccess = (uuid: string) => {
    if (handleScanSuccessNav(uuid)) {
      setIsScannerOpen(false);
    }
  };

  const handleCloseScan = () => setIsScannerOpen(false);
  const requestTypesModel = {
    "0": "دانشجویی",
    "1": "آزاد",
    "2": "روزفروش",
  };
  return (
    <>
      <Badge.Ribbon
        text="تحویل داده شده"
        color="red"
        className="badge-ribbon-food-delivered"
      >
        <div className="custom-food-detail-card">
          <div className="top-bar-info">
            <div className="date">{data?.persianDate ? data?.persianDate : "-"}</div>
            <div className="self-name">{data?.restaurantTitle}</div>
            <div className="food-name">
              {data?.productTitle ? data?.productTitle : "-"}
            </div>
            <div className="count-container">
              <div className="title">تعداد</div>
              <div className="count">{data?.quantity ? data?.quantity : "-"}</div>
            </div>
            <div className="tags">
              <CustomTag color="green">{data?.mealName ? data?.mealName : "-"}</CustomTag>
              <CustomTag color="green">
                {data?.requestType?.toString()
                  ? requestTypesModel[data?.requestType?.toString() as "0" | "1" | "2"]
                  : "-"}
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
              <div className="value">{data?.userName ? data?.userName : "-"}</div>
            </div>
            <div className="name-container">
              <div className="label">شماره دانشجویی</div>
              <div className="value">
                {data?.studentNumber ? data?.studentNumber : "-"}
              </div>
            </div>
            <div className="name-container">
              <div className="label">واحد دانشگاهی</div>
              <div className="value">{data?.branchName ? data?.branchName : "-"}</div>
            </div>
            <CustomDivider variant="dashed" className="bottom-bar-divider" />
            <div className="name-container">
              <div className="label">قیمت واحد</div>
              <div className="value">
                {PriceSeparator(data?.basePrice?.toString() ?? "0", false)}
                &nbsp; ریال
              </div>
            </div>
            <div className="name-container">
              <div className="label">تاریخ و زمان تحویل</div>
              <div className="value value-direction">
                {data?.modifiedDate
                  ? dayjs(data?.modifiedDate)?.format("YYYY-MM-DD HH:mm")
                  : "-"}
              </div>
            </div>
            {/* <CustomButton
              className="dismiss-btn"
              // onClick={() => {
              //   setData([]);
              //   setSearchParams({});
              //   form.resetFields();
              // }}
            >
              متوجه شدم
            </CustomButton> */}
            <div className="order-number">شماره سفارش {data?.id}</div>
          </div>
        </div>
      </Badge.Ribbon>
      <CustomButton
        icon={<AiOutlineQrcode />}
        type="primary"
        onClick={() => setIsScannerOpen(true)}
      >
        اسکن بارکد جدید
      </CustomButton>
      {isScannerOpen && (
        <CustomQrScanner
          isScannerOpen={isScannerOpen}
          handleScanSuccess={handleScanSuccess}
          handleCloseScan={handleCloseScan}
        />
      )}
    </>
  );
};

export default DeliveredFood;
