import { useState, type Dispatch, type SetStateAction } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { PiPlusCircle } from "react-icons/pi";

import { CustomButton, CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { EvacuationReasonCostDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/drawer/EvacuationReasonCostDrawerContent/@types/@evacuationReasonCostDrawerContentTypes";
import EvacuationAmountSummaryCard from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/drawer/EvacuationReasonCostDrawerContent/helper/components/EvacuationAmountSummaryCard/EvacuationAmountSummaryCard";
import EvacuationAttachmentCard from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/drawer/EvacuationReasonCostDrawerContent/helper/components/EvacuationAttachmentCard/EvacuationAttachmentCard";

type AttachmentSlot = {
  id: string;
  fileList: UploadFile[];
};

const REASON_OPTIONS = [
  { id: 1, title: "تخفیف دانشجویی" },
  { id: 2, title: "هزینه خدمات مازاد" },
  { id: 3, title: "سایر" },
];

const COPY_BY_MODE: Record<
  string,
  {
    title: string;
    selectedLabel: string;
    systemLabel: string;
    differencePrefix: string;
    differenceSuffix: string;
  }
> = {
  increase: {
    title: "علت افزایش هزینه",
    selectedLabel: "مبلغ منتخب بابت روزهای باقی‌مانده",
    systemLabel: "۱۰۰٪ مبلغ باقی‌مانده اقامت",
    differencePrefix: "مبلغی که بابت پرداختی روزهای باقی‌مانده اقامت انتخاب کردید",
    differenceSuffix: "بیشتر میباشد لطفا علت هزینه مازاد را وارد نمایید.",
  },
  decrease: {
    title: "علت کاهش هزینه",
    selectedLabel: "مبلغ منتخب بابت هزینه روزهای مازاد اقامت",
    systemLabel: "۱۰۰٪ مبلغ مازاد اقامت",
    differencePrefix: "مبلغی که بابت پرداختی روزهای مازاد اقامت انتخاب کردید",
    differenceSuffix: "کمتر میباشد لطفا علت کاهش هزینه را وارد نمایید.",
  },
};

const createAttachmentSlot = (): AttachmentSlot => ({
  id: crypto.randomUUID(),
  fileList: [],
});

const EvacuationReasonCostDrawerContent = ({
  mode,
  selectedAmountRial,
  systemAmountRial,
  closeDrawerHandler,
}: EvacuationReasonCostDrawerContentProps) => {
  const [form] = Form.useForm();
  const [attachments, setAttachments] = useState<AttachmentSlot[]>([
    createAttachmentSlot(),
  ]);

  const copy = COPY_BY_MODE[mode];
  const differenceRial = Math.abs(selectedAmountRial - systemAmountRial);

  //* ================================ Util Functions ================================
  const addAttachmentHandler = () => {
    setAttachments((prev) => [...prev, createAttachmentSlot()]);
  };

  const updateAttachmentFilesHandler =
    (id: string): Dispatch<SetStateAction<UploadFile[]>> =>
    (updater) => {
      setAttachments((prev) =>
        prev.map((item) => {
          if (item.id !== id) {
            return item;
          }

          const nextFileList =
            typeof updater === "function" ? updater(item.fileList) : updater;

          return { ...item, fileList: nextFileList };
        })
      );
    };

  const submitHandler = async () => {
    await form.validateFields();
    closeDrawerHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title={copy.title}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton loading={false} onClick={closeDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton type="primary" loading={false} onClick={submitHandler}>
              تایید و ثبت
            </CustomButton>
          </div>
        }
      />

      <Form form={form} className="flex flex-col gap-10 p-10">
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-wrap gap-6">
            <EvacuationAmountSummaryCard
              label={copy.systemLabel}
              amountRial={systemAmountRial}
            />
            <EvacuationAmountSummaryCard
              label={copy.selectedLabel}
              amountRial={selectedAmountRial}
            />
          </div>

          <p className="text-neutral-11 m-0 w-full text-right text-sm">
            {copy.differencePrefix}{" "}
            <span className="font-bold">
              {dataPlaceHolder({
                data: differenceRial,
                isPrice: true,
                isRial: true,
                currency: { isAvailable: true, type: "تومان" },
              })}
            </span>{" "}
            {copy.differenceSuffix}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <CustomSelect
            label="علت"
            name="reason"
            form={form}
            options={REASON_OPTIONS}
            placeholder="انتخاب کنید"
            rules={[REQUIRED_RULE]}
          />

          <CustomTextArea
            label="توضیحات"
            name="description"
            placeholder="توضیحات"
            dir="rtl"
            hasVerticalLabel={false}
          />
        </div>

        <CustomAlert
          showIcon
          type="info"
          description="در صورت داشتن مدارک یا مستندات مرتبط با این فاکتور، آن‌ها را بارگذاری کنید"
          action={
            <CustomButton
              type="link"
              iconPlacement="start"
              loading={false}
              icon={<PiPlusCircle size={16} />}
              onClick={addAttachmentHandler}
            >
              افزودن فایل پیوست
            </CustomButton>
          }
        />

        <div className="flex w-full flex-col gap-4">
          <CustomDivider text="فایل پیوست" />
          <Row gutter={[16, 16]}>
            {attachments.map((item, index) => (
              <Col key={item?.id} xs={24} sm={24} md={12} lg={12} xl={12}>
                <EvacuationAttachmentCard
                  titleName={`attachments.${index}.title`}
                  uploaderName={`attachments.${index}.file`}
                  fileList={item?.fileList}
                  setFileList={updateAttachmentFilesHandler(item?.id)}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default EvacuationReasonCostDrawerContent;
