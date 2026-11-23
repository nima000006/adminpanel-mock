import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { PiPlusCircle } from "react-icons/pi";

import {
  CustomButton,
  CustomInput,
  CustomInputNumber,
  CustomSelect,
  CustomTextArea,
  CustomUploader,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { AddFactorFirstStepDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/AddFactorDrawerContent/helper/components/AddFactorFirstStepDrawerContent/@types/@addFactorFirstStepDrawerContentTypes";
import "./_addFactorFirstStepDrawerContent.scss";

const AddFactorFirstStepDrawerContent = ({
  form,
}: AddFactorFirstStepDrawerContentProps) => {
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);

  const isService = true; // اگر خدمت یا کالایی انتخاب شده باشه یا خیرو بعد از کانکت کردن بک این قسمت پاک شود

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={form} className="flex flex-col gap-10">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomSelect
            label="خدمت/محصول"
            name="service"
            isLoading={false}
            options={[
              { id: 1, title: "a" },
              { id: 2, title: "b" },
            ]}
            form={form}
            placeholder="انتخاب کنید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomSelect
            label="مقدار"
            name="quantity"
            isLoading={false}
            options={[
              { id: 1, title: "a" },
              { id: 2, title: "b" },
            ]}
            form={form}
            placeholder="انتخاب کنید"
            rules={[REQUIRED_RULE]}
          />
        </Col>

        <Col span={24}>
          <CustomInputNumber
            isPrice={true}
            type="text"
            label="مبلغ فاکتور"
            name="price"
            placeholder="مبلغ"
            rules={[REQUIRED_RULE]}
            suffix={"ریال"}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <SingleVerticalItem
            label="مالیات بر ارزش افزوده خدمت/محصول"
            value={dataPlaceHolder({
              data: "2026/09/21",
              isDate: true,
            })}
          />
        </Col>

        <Col span={24}>
          <CustomSelect
            label="علت"
            name="reason"
            isLoading={false}
            options={[
              { id: 1, title: "a" },
              { id: 2, title: "b" },
            ]}
            form={form}
            placeholder="انتخاب کنید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات"
            dir="rtl"
            name="description"
            hasVerticalLabel={false}
          />
        </Col>
      </Row>

      <CustomAlert
        showIcon
        description="در صورت داشتن مدارک یا مستندات مرتبط با این فاکتور، آن‌ها را بارگذاری کنید"
        type="info"
        action={
          <CustomButton
            type="link"
            iconPlacement="start"
            loading={false}
            icon={<PiPlusCircle size={16} />}
          >
            افزودن فایل پیوست
          </CustomButton>
        }
      />
      {isService ? (
        <div>
          <CustomDivider text="فایل پیوست " />
          <Row gutter={[16, 16]} className="flex flex-col gap-3">
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="عنوان فایل"
                name="fileName"
                placeholder=""
                rules={[REQUIRED_RULE]}
              />
            </Col>

            <Col lg={12} md={12} sm={12} xs={24} className="attach-container">
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
                label="فایل پیوست"
                rules={firstImageList.length === 0 ? [REQUIRED_RULE] : []}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </Form>
  );
};

export default AddFactorFirstStepDrawerContent;
