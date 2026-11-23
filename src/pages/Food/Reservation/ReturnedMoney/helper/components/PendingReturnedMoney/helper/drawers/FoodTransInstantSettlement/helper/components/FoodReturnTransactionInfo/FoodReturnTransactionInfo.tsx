import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import { IconCalculator } from "@components/icons/icons";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { useLazyGetAllBankQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  GetAllBankResponse,
  IdTitleType,
} from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentSettlement/@types/@foodPendingPaymentSettlementDrawerContent";

import { FoodReturnTransactionInfoProps } from "./@types/@foodReturnTransactionInfoProps";
import "./_foodReturnTransactionInfo.scss";

const FoodReturnTransactionInfo = ({
  total,
  loading,
}: FoodReturnTransactionInfoProps) => {
  const [bankData, setBankData] = useState<IdTitleType[] | []>([]);

  //? ================================  Api Calls ================================
  const [getAllBank, { isFetching: isGetAllBankLoading }] = useLazyGetAllBankQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, []);

  //* ================================ Util Functions ================================
  const getData = () => {
    getAllBank(null).unwrap().then(getAllBankSuccess);
  };

  //success
  const getAllBankSuccess = (value: GetAllBankResponse) => {
    if (value?.status === 200) {
      setBankData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  return (
    <div className="food-return-transaction-info-tab-container">
      <Div className="total-price-card-container" loading={loading}>
        <IconCalculator viewBox="0 0 24 24" fill="#1890FF" />
        <span className="title">مجموع مبلغ قابل عودت</span>
        <span className="price-title">{total} تومان</span>
      </Div>
      <div>
        <CustomDivider text="اطلاعات تراکنش عودت" />
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <CustomInput
              name="transactionNumber"
              label="شماره پیگیری تراکنش"
              rules={[REQUIRED_RULE]}
              placeholder="شماره پیگیری تراکنش عودت را اینجا وارد نمایید"
            />
          </Col>
          <Col lg={12} xs={24}>
            <CustomDatePicker
              name="date"
              label="تاریخ"
              rules={[REQUIRED_RULE]}
              placeholder="تاریخ پرداخت را تعیین کنید"
            />
          </Col>
          <Col lg={12} xs={24}>
            <CustomSelect
              isLoading={isGetAllBankLoading}
              label="بانک عامل مبداء"
              name="banckName"
              options={bankData}
              rules={[REQUIRED_RULE]}
              placeholder="بانک عامل مبداء را اینجا وارد نمایید"
              // onChange={(e) => {
              //   bankChangeHandler(e);
              // }}
              // form={form}
            />
          </Col>
          <Col lg={12} xs={24}>
            <CustomInput
              name="shaba"
              label="شماره شبا مبداء"
              rules={[REQUIRED_RULE]}
              placeholder="شماره شبا مبداء را اینجا وارد نمایید"
            />
          </Col>
          <Col span={24}>
            <CustomUploader
              fileList={fileList}
              setFileList={setFileList}
              isReadOnly={false}
              uploaderText={
                <div className="upload-text-container">
                  <div className="upload-text">بارگذاری فیش پرداخت</div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
              hasVerticalLabel={true}
              label="بارگذاری فیش واریزی(اختیاری)"
              hasUploaderIcon={false}
              maxCount={1}
              // isDataLoading={isUploadFileLoading}
              isDisabled={fileList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="secondImage"
              // imageSetter={setSecondImageName}
              // onChange={(e: any) =>
              //   onUploadFileChange(e, setSecondImageName, setSecondImageList)
              // }
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FoodReturnTransactionInfo;
