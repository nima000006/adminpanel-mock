import CustomCard from "@components/CustomCard/CustomCard";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_revertBulkDeliverModalContent.scss";

const RevertBulkDeliverModalContent = () => {
  return (
    <div className="revert-bulk-room-container">
      <CustomCard className="revert-content-container">
        <CustomInputNumber
          label="مبلغ فاکتور جدید(ریال)"
          placeholder="مبلغ فاکتور جدید"
          name="price"
          isPrice={true}
          rules={[REQUIRED_RULE]}
        />
        <CustomTextArea
          label="توضیحات"
          placeholder="توضیحات"
          name="description"
          rules={[REQUIRED_RULE]}
        />
      </CustomCard>
    </div>
  );
};

export default RevertBulkDeliverModalContent;
