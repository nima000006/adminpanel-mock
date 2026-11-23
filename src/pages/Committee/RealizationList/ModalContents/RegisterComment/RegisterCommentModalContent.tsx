import { Button, Form, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import "./_registerCommentModalContent.scss";

const RegisterCommentModalContent = () => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-realization-detail-register-comment-modal-container"
    >
      <Form className="form">
        <div className="inputs-container">
          <CustomSelect
            label="نظر"
            name="registerComment"
            options={[]}
            placeholder="انتخاب کنید"
          />
          <CustomTextArea
            label="دلیل برگزاری جلسه"
            name="registerDescription"
            placeholder="توضیحات"
          />
        </div>
        <div className="attachment-container">
          <h3 className="step-title">پیوست ها</h3>
          <Upload className="upload-container" listType="picture" multiple>
            <Button icon={<AiOutlineUpload />} className="custom-btn">
              بارگذاری تصاویر
            </Button>
          </Upload>
        </div>
      </Form>
    </CustomCard>
  );
};

export default RegisterCommentModalContent;
