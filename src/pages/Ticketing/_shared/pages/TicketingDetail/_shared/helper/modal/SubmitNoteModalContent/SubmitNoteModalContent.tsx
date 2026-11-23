import { Col, Form, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import { MAX_MIN_LENGTH_RULE } from "@infra/validation/validationSchema";
import { SubmitNoteModalContentProps } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/modal/SubmitNoteModalContent/@types/@submitNoteModalContent";

const SubmitNoteModalContent = ({
  form,
  fileList,
  setFileList,
}: SubmitNoteModalContentProps) => {
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomTextArea
            rules={[MAX_MIN_LENGTH_RULE(10, 2048)]}
            label=""
            name="note"
            placeholder="متن یادداشت خود را وارد نمایید..."
          />
        </Col>
        <Col span={12}>
          <CustomUploader
            fileList={fileList || []}
            setFileList={setFileList || (() => {})}
            isReadOnly={false}
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
            isDisabled={!!fileList?.length}
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
export default SubmitNoteModalContent;
