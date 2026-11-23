import { Col, FormInstance, Row, UploadFile } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import LocationInfoSection from "@pages/Organization/_shared/components/LocationInfoSection/LocationInfoSection";

import { IdentitiesStepFormType } from "../../../@types/@identitiesStepType";
import IdentitiesCallInfo from "../IdentitiesCallInfo/IdentitiesCallInfo";
import IdentitiesPersonalInfo from "../IdentitiesPersonalInfo/IdentitiesPersonalInfo";
import "./_createSeniorManagerTab.scss";

const CreateSeniorManagerTab = ({
  form,
  onUploadFileChange,
  loading,
  setPersonalImage,
  isGetDataLoading,
  personalImageList,
  setPersonalImageList,
}: {
  form: FormInstance<IdentitiesStepFormType>;
  onUploadFileChange: any;
  loading: boolean;
  isGetDataLoading: boolean;
  setPersonalImage: React.Dispatch<React.SetStateAction<string>>;
  personalImageList: UploadFile[]; // 👈 اضافه شد
  setPersonalImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetDataLoading} className="create-senior-manager-tab-container">
      <div className="uploader">
        <CustomDivider text={"عکس پرسنلی"} />
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
          imageSetter={setPersonalImage}
          isDisabled={personalImageList?.length >= 1}
          hasUploaderIcon={false}
          rules={[REQUIRED_RULE]}
          onChange={(e: any) =>
            onUploadFileChange(e, setPersonalImage, setPersonalImageList)
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
      <IdentitiesPersonalInfo form={form} />

      {/* EDUCATIONAL INFO */}
      {/* <IdentitiesEducationalInfo form={form} /> api not ready */}

      {/* CALL INFO */}
      <IdentitiesCallInfo form={form} />

      {/* LOCATION INFO */}
      <LocationInfoSection form={form} />

      {/* active period*/}
      <div>
        <CustomDivider text={"دوره فعالیت"} />
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomRangePicker
              label={""}
              name="rangePicker"
              picker={"date"}
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      </div>
    </Div>
  );
};
export default CreateSeniorManagerTab;
