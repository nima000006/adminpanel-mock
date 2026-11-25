import { Breadcrumb, Form } from "antd";
import { AiOutlineQrcode, AiOutlineSearch } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomQrScanner from "@components/CustomInputs/CustomQrScanner/CustomQrScanner";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { linkBreadcrumbItems } from "@infra/helpers/BreadcrumbHelpers/linkBreadcrumbItems";

import { FoodDeliveryScanContentProps } from "./@types/food-delivery-scan-content.types";
import emptyImage from "../../../../assets/images/empty-image.png";
import useFoodBarcodeFlow from "../../../Food/Reservation/DynamicReservation/_shared/useFoodBarcodeFlow";
import "./_foodDeliveryScanContent.scss";

const FoodDeliveryScanContent = ({
  closeDrawerHandler,
}: FoodDeliveryScanContentProps) => {
  const {
    barcodeForm,
    isScannerOpen,
    openScanner,
    closeScanner,
    handleScannerSuccess,
    submitManualBarcode,
  } = useFoodBarcodeFlow();

  return (
    <Form form={barcodeForm}>
      <CustomDrawerHeader
        title={
          <Breadcrumb
            className="scan-food-bread-container"
            items={linkBreadcrumbItems([
              {
                title: "سفارشات",
              },
              {
                title: "تحویل دهندگان غذا",
              },
            ])}
          />
        }
        closeDrawerHandler={closeDrawerHandler}
        // leftSideContent={<div>saman</div>}
      />
      <div className="deliver-page-container">
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
          addonAfter={<AiOutlineSearch onClick={submitManualBarcode} size={18} />}
          onKeyDown={({ code }) => {
            if (code === "Enter" || code === "NumpadEnter") {
              submitManualBarcode();
            }
          }}
        />
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
          اسکن بارکد تحویل
        </CustomButton>
      </div>
      {isScannerOpen && (
        <CustomQrScanner
          isScannerOpen={isScannerOpen}
          handleScanSuccess={handleScannerSuccess}
          handleCloseScan={closeScanner}
        />
      )}
    </Form>
  );
};

export default FoodDeliveryScanContent;
