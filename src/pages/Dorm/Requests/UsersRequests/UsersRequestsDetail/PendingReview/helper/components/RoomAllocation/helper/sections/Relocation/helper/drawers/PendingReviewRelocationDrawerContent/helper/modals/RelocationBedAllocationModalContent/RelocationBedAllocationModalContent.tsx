import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";

import { RelocationBedAllocationModalContentProps } from "./@types/@relocationBedAllocationModalContent";
import "./_relocationBedAllocationModalContent.scss";

const RelocationBedAllocationModalContent = ({
  form,
}: RelocationBedAllocationModalContentProps) => {
  return (
    <Form className="relocation-bed-allocation-modal-content-container" form={form}>
      <p className="text">
        با جابجایی کاربر به یک تخت از یک اتاق دیگر، مبلغ نهایی فاکتور به‌روز رسانی می‌شود.
        آیا از جابجایی کاربر به این تخت از این اتاق اطمینان دارید؟
      </p>
      <CustomTextArea label="توضیحات" name="description" showCount maxLength={100} />
    </Form>
  );
};

export default RelocationBedAllocationModalContent;
