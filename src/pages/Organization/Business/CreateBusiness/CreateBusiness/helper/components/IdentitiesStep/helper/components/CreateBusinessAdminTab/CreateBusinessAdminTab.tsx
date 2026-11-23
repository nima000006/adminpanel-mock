import { useState } from "react";

import { Col, Form, FormInstance, Row, UploadFile } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import AdminTabCallInfo from "./helper/components/AdminTabCallInfo/AdminTabCallInfo";
import AdminTabLocationInfo from "./helper/components/AdminTabLocationInfo/AdminTabLocationInfo";
import AdminTabPersonalInfo from "./helper/components/AdminTabPersonalInfo/AdminTabPersonalInfo";
import { IdentitiesStepFormType } from "../../../@types/@identitiesStepType";
import "./_CreateBusinessAdminTab.scss";

const CreateBusinessAdminTab = ({
  form,
  onUploadFileChange,
  loading,
  setAdminPersonalImage,
}: {
  form: FormInstance<IdentitiesStepFormType>;
  onUploadFileChange: any;
  loading: boolean;
  setAdminPersonalImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [personalImageList, setPersonalImageList] = useState<UploadFile[]>([]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="create-business-admin-tab-container">
      <div className="uploader">
        <CustomUploader
          fileList={personalImageList}
          setFileList={setPersonalImageList}
          label={"عکس پرسنلی"}
          hasVerticalLabel={true}
          isReadOnly={false}
          className="attach-file"
          name="unitMainImage"
          maxCount={1}
          isDataLoading={loading}
          imageSetter={setAdminPersonalImage}
          isDisabled={personalImageList?.length >= 1}
          hasUploaderIcon={false}
          rules={[REQUIRED_RULE]}
          onChange={(e: any) =>
            onUploadFileChange(e, setAdminPersonalImage, setPersonalImageList)
          }
          uploaderText={
            <div className="all-self-upload-text-container">
              <div className="upload-logo">
                <AiOutlinePlus />
                <span>بارگذاری</span>
              </div>
            </div>
          }
        />
      </div>

      {/* PERSONAL INFO */}
      <AdminTabPersonalInfo form={form} />

      {/* EDUCATIONAL INFO */}
      {/* <AdminEducationalInfo form={form} /> api not ready */}

      {/* CALL INFO */}
      <AdminTabCallInfo form={form} />

      {/* LOCATION INFO */}
      <AdminTabLocationInfo form={form} />

      {/* active period*/}
      <Form form={form}>
        <CustomDivider text={"دوره فعالیت"} />
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomRangePicker
              label={""}
              name={""}
              picker={"date"}
              form={form}
              // rules={data?.rules ? data?.rules : []}
              //    defaultValue={[dayjs(startDate), dayjs(endDate)]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default CreateBusinessAdminTab;
