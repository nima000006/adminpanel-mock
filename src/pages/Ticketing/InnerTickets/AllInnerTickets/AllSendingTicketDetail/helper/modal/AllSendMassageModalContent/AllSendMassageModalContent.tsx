import { Col, Form, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import { MAX_MIN_LENGTH_RULE } from "@infra/validation/validationSchema";
import { AllSendMassageModalContentProps } from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/helper/modal/AllSendMassageModalContent/@types/@allSendMassageModalContentTypes";

const AllSendMassageModalContent = ({
  form,
  fileList,
  setFileList,
}: AllSendMassageModalContentProps) => {
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomTextArea
            label=""
            name="note"
            placeholder="متن پیام خود را وارد نمایید..."
            rules={[MAX_MIN_LENGTH_RULE(10, 2048)]}
          />
        </Col>
        <Col span={12}>
          <CustomUploader
            fileList={fileList || []}
            setFileList={setFileList || (() => {})}
            isReadOnly={false}
            isDisabled={!!fileList?.length}
            uploaderText={
              <div className="flex items-center justify-center gap-3">
                <div>آپلود تصویر</div>
                <div className="mx-0.5!">
                  <AiOutlinePlus />
                </div>
              </div>
            }
            hasUploaderIcon={false}
            maxCount={1}
            multiple={false}
            UploadSizeLimitConfig={{
              isActive: true,
              text: "حداکثر 1 مگابایت",
              size: 1,
            }}
            validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
            name="file"
            imageGetterSource="dorm"
          />
        </Col>
      </Row>
    </Form>
  );
};
export default AllSendMassageModalContent;
