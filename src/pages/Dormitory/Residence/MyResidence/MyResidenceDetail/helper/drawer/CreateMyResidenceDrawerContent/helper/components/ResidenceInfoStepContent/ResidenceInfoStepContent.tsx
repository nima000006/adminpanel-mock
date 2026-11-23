import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
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
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useLazyDormitoryTypesListQuery,
  useLazyGetQualityGradeListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  NUMBER_MAX_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetQualityGradeListContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";
import { ResidenceInfoStepContentProps } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/drawer/CreateMyResidenceDrawerContent/helper/components/ResidenceInfoStepContent/@types/@residenceInfoStepContent";

import "./_residenceInfoStepContent.scss";

const IRAN_COUNTRY_CODE = 103;

//* ================================ components ================================

const ResidenceInfoStepContent = ({
  form,
  lat,
  lng,
  setLat,
  setLng,
  firstImageList,
  setFirstImageList,
  isUploadFileLoading,
  onUploadFileChange,
}: ResidenceInfoStepContentProps) => {
  const [provinceOptions, setProvinceOptions] = useState<IdTitle[]>([]);
  const [cityOptions, setCityOptions] = useState<IdTitle[]>([]);

  const selectedBusiness = Form.useWatch("business", form);
  const selectedProvince = Form.useWatch("province", form);

  //? ================================  Api Calls ================================
  // get dormitory types list
  const [
    dormitoryTypesList,
    { data: dormitoryTypesListData, isFetching: isDormitoryTypesListLoading },
  ] = useLazyDormitoryTypesListQuery();

  // get quality grade list
  const [
    getQualityGradeList,
    { data: qualityGradeData, isFetching: isGetQualityGradeListLoading },
  ] = useLazyGetQualityGradeListQuery();

  // get business list
  const [
    getActiveBusinessList,
    {
      data: businessData,
      isFetching: isGetActiveBusinessListLoading,
      isSuccess: isGetActiveBusinessListSuccess,
    },
  ] = useLazyGetActiveBusinessListQuery();

  // get branch list
  const [
    getBranchByBusiness,
    { data: branchData, isFetching: isGetBranchByBusinessLoading },
  ] = useLazyGetBranchByBusinessQuery();

  // get province list
  const [
    getProvinceData,
    { isFetching: isGetProvinceDataLoading, isSuccess: isGetProvinceDataSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city list
  const [getCityData, { isFetching: isGetCityDataLoading }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  // ================================ Effects ================================ //

  useEffect(() => {
    dormitoryTypesList();
  }, []);

  useEffect(() => {
    form.setFieldValue("imageUploader", firstImageList);
  }, [firstImageList, form]);

  // ================================ Util Functions ================================ //

  const onResidenceTypeChangeHandler = () => {
    form?.setFieldsValue({ quality: undefined });
  };

  const getQualityHandler = () => {
    getQualityGradeList({
      pageNumber: 0,
      pageSize: 100,
      accommodationType: form?.getFieldValue("residenceType")?.value ?? "",
    });
  };

  const getBusinessHandler = () => {
    if (!isGetActiveBusinessListSuccess) {
      getActiveBusinessList();
    }
  };

  const onBusinessChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };

  const getBranchHandler = () => {
    const businessId = Number(
      selectedBusiness?.value ?? selectedBusiness?.code ?? selectedBusiness
    );

    if (!businessId) return;

    getBranchByBusiness({ businessIds: [businessId] });
  };

  const getProvinceHandler = () => {
    if (isGetProvinceDataSuccess) return;

    getProvinceData(IRAN_COUNTRY_CODE)
      .unwrap()
      .then((value) => {
        setProvinceOptions(
          value?.map((item) => ({
            id: item?.id,
            title: item?.name,
          })) ?? []
        );
      });
  };

  const onProvinceChangeHandler = () => {
    form.setFieldsValue({ city: undefined });
    setCityOptions([]);
  };

  const getCityHandler = () => {
    const provinceId = Number(
      selectedProvince?.value ?? selectedProvince?.code ?? selectedProvince
    );

    if (!provinceId) return;

    getCityData({ ids: String(provinceId) })
      .unwrap()
      .then((value) => {
        setCityOptions(
          value?.map((item) => ({
            id: item?.id,
            title: item?.name,
          })) ?? []
        );
      });
  };

  const dormitoryTypeOptions =
    dormitoryTypesListData?.map((item: IdTitleName) => ({
      id: item.name,
      title: item.title,
    })) ?? [];

  const qualityOptions =
    qualityGradeData?.content?.map((item: GetQualityGradeListContent) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  const businessOptions = businessData ?? [];

  const branchOptions = branchData ?? [];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      {/* IMAGE UPLOADER */}
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
      <div>
        <CustomDivider text="اطلاعات پایه" />

        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              name="residenceName"
              label="عنوان اقامتگاه"
              placeholder="به عنوان مثال خوابگاه شهید چمران"
              rules={[REQUIRED_RULE]}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="residenceType"
              label="نوع اقامتگاه"
              options={dormitoryTypeOptions}
              isLoading={isDormitoryTypesListLoading}
              placeholder="انتخاب کنید"
              onChange={onResidenceTypeChangeHandler}
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="quality"
              label="درجه کیفی"
              placeholder="انتخاب کنید"
              options={qualityOptions}
              isLoading={isGetQualityGradeListLoading}
              onClick={getQualityHandler}
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInputNumber
              name="capacity"
              label="ظرفیت اسمی"
              placeholder="به عنوان مثال 1,000"
              rules={[REQUIRED_RULE, NUMBER_RULE]}
              suffix="نفر"
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="business"
              label="کسب و کار"
              placeholder="انتخاب کنید"
              options={businessOptions}
              isLoading={isGetActiveBusinessListLoading}
              onClick={getBusinessHandler}
              onChange={onBusinessChangeHandler}
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="branch"
              label="شعبه / واحد"
              placeholder="انتخاب کنید"
              options={branchOptions}
              isLoading={isGetBranchByBusinessLoading}
              onClick={getBranchHandler}
              disabled={!selectedBusiness}
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInputNumber
              name="area"
              label="مساحت کل اقامتگاه"
              placeholder="به عنوان مثال 1,000 متر مربع"
              rules={[REQUIRED_RULE, NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
              suffix="متر مربع"
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInputNumber
              name="greenSpaceArea"
              label="مساحت فضای سبز"
              placeholder="به عنوان مثال 1,000 متر مربع"
              suffix="متر مربع"
              rules={[NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
            />
          </Col>
        </Row>
      </div>

      {/* اطلاعات مکانی */}
      <div>
        <CustomDivider text="اطلاعات مکانی" />

        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              name="postalCode"
              label="کد پستی"
              placeholder="کد پستی 10 رقمی به عنوان مثال: ۱۵۸۹۸۷۳۸۵1"
              rules={[REQUIRED_RULE, POSTAL_CODE_RULE]}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              name="phoneNumber"
              label="شماره تلفن اقامتگاه"
              placeholder="به همراه کد شهر به عنوان مثال: ۰۲۱۴۱۰۲۱111"
              rules={[REQUIRED_RULE]}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="province"
              label="استان"
              placeholder="انتخاب کنید"
              options={provinceOptions}
              isLoading={isGetProvinceDataLoading}
              onClick={getProvinceHandler}
              onChange={onProvinceChangeHandler}
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="city"
              label="شهر"
              placeholder="انتخاب کنید"
              options={cityOptions}
              isLoading={isGetCityDataLoading}
              onClick={getCityHandler}
              disabled={!selectedProvince}
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>

          <Col span={24}>
            <CustomTextArea
              label="آدرس"
              name="address"
              placeholder="لطفاً آدرس را به صورت کامل وارد نمایید. به عنوان مثال : خیابان قائم مقام فراهانی، خیابان صفیر، پلاک ۲۶"
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      </div>

      {/* موقعیت جغرافیایی */}
      <div>
        <label>موقعیت جغرافیایی</label>
        <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
      </div>
    </div>
  );
};

export default ResidenceInfoStepContent;
