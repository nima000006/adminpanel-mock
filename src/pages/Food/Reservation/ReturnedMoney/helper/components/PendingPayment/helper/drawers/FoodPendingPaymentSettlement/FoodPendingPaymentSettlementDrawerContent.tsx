import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import moment from "jalali-moment";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import { IconCalculator } from "@components/icons/icons";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  dataPlaceHolder,
  isImageFormatValid,
  isImageSizeValid,
} from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  useLazyGetAllBankQuery,
  useSendFoodSettleMutation,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { AllFoodOnUploadFileSuccess } from "@pages/Food/Foods/AllFoods/AllFoodsList/helpers/components/AllFoodsListDrawerContent/@types/@allFoodsListDrawerContent";

import {
  FoodPendingPaymentSettlementDrawerContentProps,
  FoodPendingPaymentSettlementFormType,
  GetAllBankResponse,
  IdTitleType,
  SendFoodSettleResponse,
} from "./@types/@foodPendingPaymentSettlementDrawerContent";
import "./_foodPendingPaymentSettlementDrawerContent.scss";

const FoodPendingPaymentSettlementDrawerContent = ({
  closeDrawerHandler,
  total,
  id,
}: FoodPendingPaymentSettlementDrawerContentProps) => {
  const [bankData, setBankData] = useState<IdTitleType[] | []>([]);
  const [attachmentFileName, setAttachmentFileName] = useState<string>("");
  const [attachmentList, setAttachmentList] = useState<any[]>([]);
  const [bankId, setBankId] = useState<number>(0);
  const [form] = Form.useForm<FoodPendingPaymentSettlementFormType>();

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [getAllBank, { isFetching: isGetAllBankLoading }] = useLazyGetAllBankQuery();

  //send data
  const [sendConfirmAndSettle, { isLoading: isConfirmAndSettleLoading }] =
    useSendFoodSettleMutation();

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

  //btn handler
  const confirmAndSettleHandler = () => {
    form?.validateFields().then(() => {
      const values = form.getFieldsValue();

      sendConfirmAndSettle({
        bankId: bankId,
        docId: id,
        fileUrl: attachmentFileName,
        fromIBAN: values.iban,
        paymentDate: moment(values.date).format("YYYY-MM-DD"),
        referenceNo: values.transactionNumber,
      })
        .unwrap()
        .then(sendConfirmAndSettleSuccess);
    });
  };

  //success
  const sendConfirmAndSettleSuccess = (value: SendFoodSettleResponse) => {
    if (value?.status === 200) {
      closeDrawerHandler();
    }
  };

  const bankChangeHandler = (e: any) => {
    setBankId(e);
  };

  // onUploadFileSuccess
  const onUploadFileSuccess = ({ setImage, response }: AllFoodOnUploadFileSuccess) => {
    if (response?.status === 200) {
      setImage(response?.data);
    }
  };

  // onUploadFileChange
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  ) => {
    const formData = new FormData();
    formData.append("file", image?.file as any);

    const isFileFormatCorrect = isImageFormatValid({ fileFormat: image?.file?.type });
    if (!isFileFormatCorrect) {
      return toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
    }

    const isUploadable = isImageSizeValid({ fileSize: image?.file?.size });
    if (!isUploadable) {
      return toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
    }
    uploadFile(formData)
      .unwrap()
      .then((response: any) => onUploadFileSuccess({ response, setImage }))
      .catch(() => {
        imageListSetter?.([]);
        setImage("");
      });
  };

  return (
    <div className="food-pending-payment-settlement-drawer-container">
      <CustomDrawerHeader
        title="تسویه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-action-btns-container">
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              onClick={confirmAndSettleHandler}
              loading={isConfirmAndSettleLoading}
            >
              تایید و تسویه
            </CustomButton>
          </div>
        }
      />
      <div className="total-price-card-container">
        <IconCalculator viewBox="0 0 24 24" fill="#1890FF" />
        <span className="title">مجموع مبلغ قابل عودت</span>
        <span className="price-title">
          {dataPlaceHolder({ data: total?.toString(), isPrice: true, isRial: true })}{" "}
          تومان
        </span>
      </div>
      <Form form={form}>
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
              form={form}
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
              form={form}
              onChange={(e) => {
                bankChangeHandler(e);
              }}
            />
          </Col>
          <Col lg={12} xs={24}>
            <CustomInput
              name="iban"
              label="شماره شبا مبداء"
              rules={[REQUIRED_RULE]}
              placeholder="شماره شبا مبداء را اینجا وارد نمایید"
            />
          </Col>
          <Col span={24}>
            <CustomUploader
              fileList={attachmentList}
              setFileList={setAttachmentList}
              isReadOnly={false}
              uploaderText={
                <div className="upload-text-container">
                  <div className="upload-text">بارگذاری فیش پرداخت</div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
              hasUploaderIcon={false}
              hasVerticalLabel={true}
              label="بارگذاری فیش واریزی(اختیاری)"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              isDisabled={attachmentList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={[
                "image/png",
                "image/jpeg",
                "image/jpg",
                "application/pdf",
              ]}
              name="attachment"
              imageSetter={setAttachmentFileName}
              onChange={(e: any) =>
                onUploadFileChange(e, setAttachmentFileName, setAttachmentList)
              }
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FoodPendingPaymentSettlementDrawerContent;
