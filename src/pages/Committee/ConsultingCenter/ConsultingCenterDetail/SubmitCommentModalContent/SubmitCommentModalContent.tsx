import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import { useLazyGetOpinionRegisterCommentQuery } from "../../../../../infrastructure/states/redux/Apis/committee/consultingCenter/consultingCenterApi";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { SelectInputType } from "../../ConsultingCenterDocuments/helper/components/DocumentsTable/@types/@documentsTable";
import "./_submitCommentModalContent.scss";

const SubmitCommentModalContent = ({
  opinionForm,
}: {
  opinionForm: FormInstance<{
    comment: SelectInputType;
    description: string;
  }>;
}) => {
  //? ================================  Api Calls ================================
  // دریافت اطلاعات فیلد نظر
  const [
    getOpinionRegisterComment,
    { data: opinionRegisterCommentData, isLoading: isOpinionRegisterCommentLoading },
  ] = useLazyGetOpinionRegisterCommentQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getOpinionRegisterComment({ firstResult: 0, maxResults: 8 });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-report-detail-reject-report-modal-container"
    >
      <Form form={opinionForm} className="consulting-submit-comment-modal-container">
        <div className="comment-and-desc-wrapper">
          <CustomSelect
            label="نظر"
            name="comment"
            form={opinionForm}
            options={opinionRegisterCommentData?.data}
            placeholder="انتخاب کنید"
            isLoading={isOpinionRegisterCommentLoading}
          />
          <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
        </div>

        {/* <div className="attachment-container">
          <h3 className="step-title">پیوست ها</h3>
          <Upload className="upload-container" listType="picture" multiple>
            <Button icon={<AiOutlineUpload />} className="custom-btn">
              بارگذاری تصاویر
            </Button>
          </Upload>
        </div> */}
      </Form>
    </CustomCard>
  );
};
export default SubmitCommentModalContent;
