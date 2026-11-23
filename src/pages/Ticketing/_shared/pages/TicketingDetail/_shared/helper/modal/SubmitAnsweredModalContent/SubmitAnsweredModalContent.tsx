import { memo } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import { MAX_MIN_LENGTH_RULE } from "@infra/validation/validationSchema";
import { SubmitAnsweredModalContentProps } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/modal/SubmitAnsweredModalContent/@types/@submitAnsweredModalContent";

const SubmitAnsweredModalContent = ({
  form,
  fileList,
  setFileList,
}: SubmitAnsweredModalContentProps) => {
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomTextArea
            rules={[MAX_MIN_LENGTH_RULE(10, 2048)]}
            label=""
            name="description"
            placeholder="توضیحات"
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
            isDisabled={!!fileList?.length}
            hasUploaderIcon={false}
            maxCount={1}
            UploadSizeLimitConfig={{
              isActive: true,
              text: "حداکثر 1 مگابایت",
              size: 1,
            }}
            validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
            name="secondImage"
          />
        </Col>
      </Row>
    </Form>
  );
};
export default memo(SubmitAnsweredModalContent);
