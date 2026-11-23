import { Col, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import {
  CustomInput,
  CustomInputNumber,
  CustomMap,
  CustomSelect,
  CustomTextArea,
  CustomUploader,
} from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  NUMBER_MAX_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { MyBuildingInfoStepContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/@types/@myActiveResidenceBuildingListTypes";
import "./My_buildingInfoStepContent.scss";

const MyBuildingInfoStepContent = ({
  form,
  firstImageList,
  setFirstImageList,
  lat,
  lng,
  setLat,
  setLng,
  qualityOptions,
  isQualityLoading,
  getQualityHandler,
  isUploadFileLoading,
  onUploadFileChange,
  data,
  loading,
}: MyBuildingInfoStepContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <div className="attach-container">
        <CustomUploader
          fileList={firstImageList}
          setFileList={setFirstImageList}
          isDisabled={firstImageList.length >= 3}
          isReadOnly={false}
          multiple={true}
          maxCount={3}
          classNameOuterDiv="residence-upload-no-delete"
          uploaderText={
            <div className="image-attachment-container">
              <div className="upload-logo-main">
                <AiOutlinePlus />
              </div>

              <div className="upload-text-main">بارگذاری</div>
            </div>
          }
          hasUploaderIcon={false}
          isDataLoading={isUploadFileLoading}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 5 مگابایت",
            size: 5,
            sizeUnit: "MB",
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name="imageUploader"
          hasVerticalLabel={true}
          label="عکس اقامتگاه (حداقل 1 مورد الزامی)"
          rules={firstImageList.length === 0 ? [REQUIRED_RULE] : []}
          onChange={(e: any) => onUploadFileChange(e)}
        />
      </div>

      {/* اطلاعات پایه */}
      <div className="flex flex-col gap-4">
        <CustomDivider text="اطلاعات پایه" />

        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              name="buildingName"
              label="عنوان ساختمان"
              placeholder="به عنوان مثال بلوک c"
              rules={[REQUIRED_RULE]}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="quality"
              label="درجه کیفی"
              placeholder="انتخاب کنید"
              options={qualityOptions}
              isLoading={isQualityLoading}
              onClick={getQualityHandler}
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInputNumber
              name="area"
              label="مساحت زیربنای ساختمان"
              placeholder="به عنوان مثال 1,000 متر مربع"
              rules={[REQUIRED_RULE, NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
              suffix="متر مربع"
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInputNumber
              name="greenSpaceArea"
              label="مساحت فضای قابل سکونت"
              placeholder="به عنوان مثال 1,000 متر مربع"
              suffix="متر مربع"
              rules={[NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInputNumber
              name="publicSpace"
              label="مساحت فضای مشاعات"
              placeholder="به عنوان مثال 1,000 متر مربع"
              suffix="متر مربع"
              rules={[NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
            />
          </Col>
        </Row>
      </div>

      {/* اطلاعات مکانی */}
      <Div loading={loading}>
        <CustomDivider text="اطلاعات مکانی" />

        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              name="postalCode"
              label="کد پستی"
              rules={[REQUIRED_RULE, POSTAL_CODE_RULE]}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput name="phoneNumber" label="شماره تلفن " />
          </Col>

          <SingleVerticalWithCol
            lg={12}
            xl={12}
            md={12}
            label="استان"
            value={data?.provinceTitle ?? ""}
          />
          <SingleVerticalWithCol
            lg={12}
            xl={12}
            md={12}
            label="شهر"
            value={data?.cityTitle ?? ""}
          />

          <Col span={24}>
            <CustomTextArea label="آدرس" name="address" rules={[REQUIRED_RULE]} />
          </Col>
        </Row>
      </Div>

      {/* موقعیت جغرافیایی */}
      <div>
        <label>موقعیت جغرافیایی</label>
        <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
      </div>
    </div>
  );
};
export default MyBuildingInfoStepContent;
