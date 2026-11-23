import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { PiDownloadSimple, PiTrash, PiUser } from "react-icons/pi";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomDatePicker,
  CustomInput,
  CustomRadioGroup,
  CustomSelect,
  CustomSingleCheckbox,
  CustomUploader,
} from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  NATIONALITY,
  NATIONALITY_OPTIONS,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";
import { DeliveryResidenceDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/DeliveryResidenceDrawerContent/@types/@deliveryResidenceDrawerContentTypes";
import ReservationConfirmModalContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/modal/ReservationConfirmModalContent/ReservationConfirmModalContent";
import "./_deliveryResidenceDrawerContent.scss";

const mockData = {
  hasPaid: false, //  وضعیت پرداخت اگر فالس باشد یعنی پرداخت نشده و اگر ترو باشد یعنی پرداخت شده
};

const DELIVERY_RESIDENCE_SUCCESS_MSG =
  "تحویل اسکان درخواست با موفقیت انجام شد. از این پس می‌توانید آن را در بخش «تحویل داده‌ها» و یا «ساکنین»مشاهده و پیگیری کنید.";

const DeliveryResidenceDrawerContent = ({
  closeDrawerHandler,
}: DeliveryResidenceDrawerContentProps) => {
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [isConfirmModal, setIsConfirmModal] = useState({
    isOpen: false,
    id: -1,
  });

  const [form] = Form.useForm();

  const formValues = Form.useWatch([], form);

  const isFormFilled =
    formValues?.appealSessionDate &&
    formValues?.marriageStatus &&
    formValues?.birthDate &&
    formValues?.nationalCode &&
    formValues?.phoneNumber &&
    formValues?.relationship;

  //* ================================ Util Functions ================================
  const submitFormHandler = () => {
    if (!mockData?.hasPaid) {
      setIsConfirmModal({
        isOpen: true,
        id: -1,
      });
    } else {
      toast.success(DELIVERY_RESIDENCE_SUCCESS_MSG, {
        toastId: DELIVERY_RESIDENCE_SUCCESS_MSG,
      });
      closeDrawerHandler();
    }
  };

  const CloseConfirmModalHandler = () => {
    setIsConfirmModal({
      isOpen: false,
      id: -1,
    });
  };

  const submitConfirmModalHandler = () => {
    setIsConfirmModal({
      isOpen: false,
      id: -1,
    });
    closeDrawerHandler();
    toast.success(DELIVERY_RESIDENCE_SUCCESS_MSG, {
      toastId: DELIVERY_RESIDENCE_SUCCESS_MSG,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div>
      {/* مودال کانفرم تحویل بدون پرداخت */}
      {isConfirmModal?.isOpen && (
        <ConfirmationModalWithContent
          title="تمدید مهلت پرداخت و تحویل اسکان"
          isModalOpen={isConfirmModal?.isOpen}
          confirmBtnText="تایید و تحویل اقامتگاه"
          backBtnText="انصراف"
          closeModalHandler={CloseConfirmModalHandler}
          onConfirmClickHandler={submitConfirmModalHandler}
          content={<ReservationConfirmModalContent />}
          isConfirmButtonLoading={false}
          showIcon={false}
        />
      )}

      <CustomDrawerHeader
        title="تحویل اقامتگاه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton loading={false} onClick={closeDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton type="primary" loading={false} onClick={submitFormHandler}>
              ثبت و تحویل
            </CustomButton>
          </div>
        }
      />
      <Form form={form} className="flex flex-col gap-10 p-10">
        {!mockData?.hasPaid ? (
          <div className="flex flex-col gap-4">
            <CustomDivider
              text="تمدید مهلت پرداخت"
              extraContent={
                <CustomButton type="link" loading={false}>
                  جزییات فاکتور
                </CustomButton>
              }
            />

            <CustomAlert
              showIcon
              description="با ویرایش تاریخ سررسید، مهلت جدید برای پرداخت ملاک خواهد بود."
              type="warning"
            />
            <Row gutter={16}>
              <Col lg={12} md={12} sm={12} xs={24}>
                <SingleVerticalItem
                  label="تاریخ سر رسید فعلی"
                  value={dataPlaceHolder({
                    data: "2026/09/21",
                    isDate: true,
                  })}
                />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomDatePicker
                  label="تاریخ سر رسید جدید"
                  placeholder="انتخاب کنید"
                  name="appealSessionDate"
                  form={form}
                  defaultValue={"2026/09/21"}
                  // key={}
                  rules={[REQUIRED_RULE]}
                />
              </Col>
            </Row>
          </div>
        ) : null}

        <div className="flex flex-col gap-4">
          <CustomDivider
            text="مدارک"
            extraContent={
              <CustomButton
                type="link"
                iconPlacement="start"
                loading={false}
                icon={<PiDownloadSimple size={16} />}
              >
                دانلود فرم مدارک
              </CustomButton>
            }
          />
          <CustomAlert
            showIcon
            description="در صورت نیاز، فرم را دانلود کرده و پس از تکمیل، تصویر فرم تکمیل‌شده را در این بخش بارگذاری کنید."
            type="info"
          />
          <Row className="attach-container">
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomUploader
                fileList={firstImageList}
                setFileList={setFirstImageList}
                isDisabled={firstImageList.length >= 3}
                isReadOnly={false}
                multiple={true}
                maxCount={3}
                classNameOuterDiv="residence-upload-no-delete"
                uploaderText={
                  <div className="image-attachment-container">
                    <div className="upload-logo-main">
                      <AiOutlinePlus />
                    </div>

                    <div className="upload-text-main">بارگذاری</div>
                  </div>
                }
                hasUploaderIcon={false}
                isDataLoading={false}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 5 مگابایت",
                  size: 5,
                  sizeUnit: "MB",
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="imageUploader"
                hasVerticalLabel={true}
                label="عنوان فرم نمونه یک"
                rules={firstImageList.length === 0 ? [REQUIRED_RULE] : []}
              />
            </Col>
            <Col lg={6} md={6} sm={8} xs={12}>
              <CustomUploader
                fileList={secondImageList}
                setFileList={setSecondImageList}
                isDisabled={secondImageList.length >= 3}
                isReadOnly={false}
                multiple={true}
                maxCount={3}
                classNameOuterDiv="residence-upload-no-delete"
                uploaderText={
                  <div className="image-attachment-container">
                    <div className="upload-logo-main">
                      <AiOutlinePlus />
                    </div>

                    <div className="upload-text-main">بارگذاری</div>
                  </div>
                }
                hasUploaderIcon={false}
                isDataLoading={false}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 5 مگابایت",
                  size: 5,
                  sizeUnit: "MB",
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="imageUploader"
                hasVerticalLabel={true}
                label="عنوان فرم نمونه دو"
                rules={secondImageList.length === 0 ? [REQUIRED_RULE] : []}
              />
            </Col>
          </Row>
        </div>

        <div>
          <CustomDivider text="اطلاعات تکمیلی" />
          <Row gutter={16}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                label="وضعیت تأهل"
                name="marriageStatus"
                isLoading={false}
                options={[
                  { id: 1, title: "مجرد" },
                  { id: 2, title: "متاهل" },
                ]}
                form={form}
                placeholder="انتخاب کنید"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="تلفن ثابت منزل"
                name="phoneNumber"
                placeholder="تلفن ثابت منزل"
              />
            </Col>
          </Row>
        </div>

        <div className="flex flex-col gap-6">
          <CustomDivider text="اطلاعات بستگان" />
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomRadioGroup
                name="nationality"
                label="ملیت"
                hasVerticalLabel
                rules={[REQUIRED_RULE]}
                initialValue={NATIONALITY.iranianNationality}
                options={NATIONALITY_OPTIONS}
              />
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="کد ملی"
                name="nationalCode"
                placeholder="تلفن ثابت منزل"
                rules={[REQUIRED_RULE]}
              />
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="شماره تماس"
                name="phoneNumber"
                placeholder="شماره تماس"
                rules={[REQUIRED_RULE]}
              />
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                label="نسبت"
                name="relationship"
                isLoading={false}
                options={[
                  { id: 1, title: "پدر" },
                  { id: 2, title: "مادر" },
                  { id: 3, title: "خواهر" },
                  { id: 4, title: "برادر" },
                ]}
                form={form}
                placeholder="انتخاب کنید"
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSingleCheckbox
                name="isIranianNationality"
                valuePropName="checked"
                initialValue={true}
              >
                ملیت ایرانی میباشد.
              </CustomSingleCheckbox>
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomButton type="primary" block loading={false}>
                افزودن و استعلام
              </CustomButton>
            </Col>
          </Row>
        </div>
      </Form>

      {isFormFilled ? (
        <div>
          <CustomDivider
            text={
              <div className="flex items-center gap-2">
                <PiUser /> <span> پدر</span>
              </div>
            }
            extraContent={
              <div className="cursor-pointer rounded-md border border-[#F5222D] p-1">
                <PiTrash size={16} color="#F5222D" />
              </div>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={12}
              label="نام"
              value={"علی"}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={12}
              label="نام خانوادگی"
              value={"کرمی"}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={12}
              label="شماره تماس"
              value={"09124487968"}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={12}
              label="نام پدر"
              value={"اکبر"}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={12}
              label="تاریخ تولد"
              value={"1990/01/01"}
            />

            <SingleVerticalWithCol lg={12} md={12} label="کد ملی" value={"1234567890"} />
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default DeliveryResidenceDrawerContent;
