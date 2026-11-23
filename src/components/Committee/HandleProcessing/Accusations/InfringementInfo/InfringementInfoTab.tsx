import { memo, useEffect, useState } from "react";

import { Col, Form, Row, Upload } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import {
  CheckBoxFormGenerator,
  selectDefaultValueGenerator,
} from "../../../../../infrastructure/helpers/utils";
import { useGetChargesInfoThirdTabMutation } from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import CustomCheckboxGroup from "../../../../CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";

import "./_infringementInfoTab.scss";

const AccusationCaseInfringementInfoTab = memo(({ id }: { id: string }) => {
  const [form] = Form.useForm();
  const [isOpenFraudDetails, setIsOpenFraudDetails] = useState(false);

  //? ================================  Api Calls ================================
  const [getCharges, { data: chargesData, isLoading: isChargesDataLoading }] =
    useGetChargesInfoThirdTabMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getCharges({
      _data_: {
        id,
      },
    });
  }, [id]);

  // put received data in corresponding select
  useEffect(() => {
    if (chargesData?.status === 200) {
      if (
        chargesData?.data?.AssociationInfractions?.id > 10 &&
        chargesData?.data?.AssociationInfractions?.id < 15
      ) {
        setIsOpenFraudDetails(true);
      }
      form.setFieldsValue({
        AssociationPivotRecordsDetails: selectDefaultValueGenerator(
          chargesData?.data?.AssociationPivotRecordsDetails
        ),
        AssociationTblPriiority: selectDefaultValueGenerator(
          chargesData?.data?.AssociationTblPriiority
        ),
        AssociationInfractionType: selectDefaultValueGenerator(
          chargesData?.data?.AssociationInfractionType
        ),
        AssociationInfractions: selectDefaultValueGenerator(
          chargesData?.data?.AssociationInfractions
        ),
        descViolation: chargesData?.data?.descViolation,
        primaryReferrals: [
          CheckBoxFormGenerator(
            chargesData?.data?.sentToEducationalAssistant,
            "sentToEducationalAssistant"
          ),
          CheckBoxFormGenerator(
            chargesData?.data?.sentToResearchAssistant,
            "sentToResearchAssistant"
          ),
          CheckBoxFormGenerator(
            chargesData?.data?.sentToStudentVice,
            "sentToStudentVice"
          ),
          CheckBoxFormGenerator(chargesData?.data?.sentToSecurity, "sentToSecurity"),
        ],
      });
    }
  }, [chargesData?.status]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isChargesDataLoading}>
      <Form form={form} className="accusation-case-infringement-info-tab-container">
        <div className="around-box">
          <CustomDivider text=" اطلاعات اتهام" />
          <div className="violation-information-container">
            <Row gutter={[12, 12]}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <CustomSelect
                  name="AssociationInfractionType"
                  label="نوع تخلف"
                  options={[]}
                  placeholder="آموزشی"
                  form={form}
                  disabled={true}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <CustomSelect
                  name="AssociationTblPriiority"
                  label="اولویت اتهام"
                  options={[]}
                  placeholder="انتخاب کنید"
                  disabled={true}
                  form={form}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <CustomSelect
                  name="AssociationInfractions"
                  label="اتهام"
                  options={[]}
                  disabled={true}
                  form={form}
                  placeholder="اتهام"
                  // onChange={(_: any, itemData: any) => {
                  //   return itemData?.code === 1
                  //     ? setIsOpenFraudDetails(true)
                  //     : setIsOpenFraudDetails(false);
                  // }}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <CustomSelect
                  label="جزئیات اتهام"
                  name="AssociationPivotRecordsDetails"
                  form={form}
                  options={[]}
                  mode="multiple"
                  disabled={true}
                />
              </Col>
            </Row>
            {isOpenFraudDetails ? (
              <Row gutter={[12, 12]}>
                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="ترم نمونه"
                  value={chargesData?.data?.term}
                />

                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="کد درس"
                  value={chargesData?.data?.lessonCode}
                />

                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="تاریخ وقوع"
                  value={chargesData?.data?.eventDate}
                  isDate
                />

                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="نام مراقب"
                  value={chargesData?.data?.caregiverName}
                />

                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="کد مراقب"
                  value={chargesData?.data?.caregiverCode}
                />

                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="کد مشخصه"
                  value={chargesData?.data?.characteristicCode}
                />

                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="محل اتهام"
                  value={chargesData?.data?.eventLocation}
                />
              </Row>
            ) : null}

            <div className="text-area-wrapper">
              <CustomTextArea
                label="توضیحات اتهام"
                placeholder="توضیحات"
                name="descViolation"
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="around-box">
          <CustomDivider text="پیوست ها" />
          <Upload className="upload-container" listType="picture" multiple disabled>
            {/* <Button icon={<AiOutlineUpload />} className="upload-btn" disabled>
            بارگذاری تصاویر
          </Button> */}
          </Upload>
        </div>
        <div className="around-box">
          <CustomDivider text="ارجاعات اولیه" />
          <div className="initial-referral">
            <CustomCheckboxGroup
              checkboxClassName="check-box"
              containerClassName="check-box-container"
              name="primaryReferrals"
              disabled={true}
              options={[
                { label: "ارجاع معاونت آموزشی", value: "sentToEducationalAssistant" },
                { label: "ارجاع معاونت پژوهشی", value: "sentToResearchAssistant" },
                { label: "ارجاع معاونت دانشجویی", value: "sentToStudentVice" },
                { label: "ارجاع حراست", value: "sentToSecurity" },
              ]}
            />
          </div>
        </div>
      </Form>
    </Div>
  );
});
AccusationCaseInfringementInfoTab.displayName = "AccusationCaseInfringementInfoTab";
export default AccusationCaseInfringementInfoTab;
