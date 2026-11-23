import { useEffect, useState } from "react";

import { Breadcrumb, Form } from "antd";
import { AiOutlineQrcode, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomQrScanner from "@components/CustomInputs/CustomQrScanner/CustomQrScanner";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import { useAudioNotification } from "@infra/hooks/useAudioNotification/useAudioNotification";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetManagerDeliverableFoodQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import useFoodBarcodeFlow from "./_shared/useFoodBarcodeFlow";
import DeliveredFood from "./helpers/DeliveredFood/DeliveredFood";
import NotDeliveredFood from "./helpers/NotDeliveredFood/NotDeliveredFood";
import emptyImage from "../../../../assets/images/empty-image.png";
import { DeliverableFood } from "../ReturnedMoney/helper/components/PersonsReturnedMoney/helper/drawers/FoodReturnedMoney/@types/@foodReturnedMoneyDrawerContent";

import "./_dynamicReservation.scss";

const DynamicReservation = () => {
  const [data, setData] = useState<DeliverableFood[]>([]);
  const navigate = useNavigate();
  const { playSuccess, playError } = useAudioNotification({ volume: 0.7 });
  const { params } = useQueryParams<{
    deliverUuid: string;
    manualCode: string;
  }>();
  const {
    barcodeForm,
    isScannerOpen,
    openScanner,
    closeScanner,
    handleScannerSuccess,
    submitManualBarcode,
  } = useFoodBarcodeFlow();

  // useDeliverUserPlanByIdMutation
  const [getFoodInfo, { isFetching: isFoodInfoLoading }] =
    useLazyGetManagerDeliverableFoodQuery();

  useEffect(() => {
    if (params?.deliverUuid || params?.manualCode) {
      getFoodInfo({
        ...(params?.deliverUuid && { deliverUuid: params?.deliverUuid }),
        ...(params?.manualCode && { deliveryCode: params?.manualCode?.toUpperCase() }),
        paginationRequest: {
          pageNo: 0,
          pageSize: 10,
        },
      })
        .unwrap()
        .then((response) => {
          if (params?.deliverUuid) {
            barcodeForm.setFieldValue("barcode", undefined);
          }
          if (response?.status === 200) {
            playSuccess();
            return setData(response?.data?.content);
          }
          playError();
          setData([]);
          return toast.error(response?.msg, { toastId: response?.msg });
        })
        .catch(() => {
          if (params?.deliverUuid) {
            barcodeForm.setFieldValue("barcode", undefined);
          }
          playError();
          setData([]);
        });
    }
  }, [params?.deliverUuid, params?.manualCode, getFoodInfo, playSuccess, playError]);

  return (
    <>
      <p className="fall-back-text">در صورت بروز مشکل با پشتیبانی تماس بگیرید</p>
      <CustomDrawer
        // onClose={closeDrawerHandler}
        // closeIcon={<CloseOutlined />}
        open={true}
        content={
          <Form form={barcodeForm}>
            <CustomDrawerHeader
              title={
                <Breadcrumb
                  className="scan-food-bread-container"
                  items={[
                    {
                      title: "سفارشات",
                    },
                    {
                      title: "تحویل دهندگان غذا",
                    },
                  ]}
                />
              }
              closeDrawerHandler={() => {
                navigate("/");
              }}
              // hasCloseIcon={false}
            />
            <Div className="deliver-detail-page-container" loading={isFoodInfoLoading}>
              <CustomDatePicker
                name="currentDate"
                disabled
                form={barcodeForm}
                hasFeedback={false}
                hasNullInitiator={true}
                hasVerticalLabel={false}
              />
              <CustomInput
                name="barcode"
                placeholder="جستجو بر اساس کد تحویل"
                addonAfter={<AiOutlineSearch onClick={submitManualBarcode} />}
                onKeyDown={({ code }) => {
                  if (code === "Enter" || code === "NumpadEnter") {
                    submitManualBarcode();
                  }
                }}
              />
              {data?.length ? (
                data?.map((item) => {
                  if (item?.delivered) {
                    return <DeliveredFood data={item} key={item?.id} />;
                  }
                  return (
                    <NotDeliveredFood
                      data={item}
                      key={item?.id}
                      setData={setData}
                      openScanner={openScanner}
                      // getData={getData}
                    />
                  );
                })
              ) : (
                <>
                  <div className="image-container">
                    <img src={emptyImage} alt="empty" className="empty-image" />
                  </div>
                  <section className="text-info">
                    <p>برای مشاهده سفارش، یکی از روش‌های زیر را انتخاب کنید:</p>
                    <p> ۱. وارد کردن کد تحویل</p>
                    <p>۲. اسکن بارکد تحویل</p>
                  </section>
                  <CustomButton type="primary" onClick={openScanner}>
                    <AiOutlineQrcode />
                    اسکن بارکد جدید
                  </CustomButton>
                </>
              )}
            </Div>
          </Form>
        }
        size="large"
        width="100vw"
        height="100vh"
        className="food-scan-delivery-detail-container"
      />
      {isScannerOpen && (
        <CustomQrScanner
          isScannerOpen={isScannerOpen}
          handleScanSuccess={handleScannerSuccess}
          handleCloseScan={closeScanner}
        />
      )}
    </>
  );
};

export default DynamicReservation;
