import { useEffect } from "react";

import { Collapse } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useGetPartiesInfoMutation } from "@infra/states/redux/Apis/committee/committees/committees";
import { PADDING_20 } from "@infra/VARS/globalStyles/globalStyles";

import {
  LegalPlaintiffInfoProps,
  LegalPlaintiffOutsideInfoProps,
  PartiesInformationStepProps,
  RealPlaintiffInfoProps,
} from "./@type/@removeHistoryPartiesInformationStep";
import "./_removeHistoryPartiesInformationStep.scss";

// شاکی حقیقی
const RealPlaintiffInfo = ({
  complainantNo,
  complainantNationalcode,
  complainantPhoneNumber,
  complainantName,
  complainantFamily,
}: RealPlaintiffInfoProps) => {
  return [
    {
      label: (
        <div className="reporter-info-items-container">
          <SingleVerticalItem
            label="نام"
            value={dataPlaceHolder({ data: complainantName })}
          />
          <SingleVerticalItem
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: complainantFamily })}
          />
          <SingleVerticalItem
            label="شماره ملی"
            value={dataPlaceHolder({ data: complainantNationalcode })}
          />
          <SingleVerticalItem
            label="شماره دانشجویی"
            value={dataPlaceHolder({ data: complainantNo })}
          />
        </div>
      ),
      children: (
        <div className="reporter-info-items-container">
          {/* <SingleVerticalItem label="دپارتمان" value="-" />
            <SingleVerticalItem label="سمت" value="-" />
            <SingleVerticalItem label="سن" value="-" />
            <SingleVerticalItem label="سال ورود" value="-" /> */}
          {/* <SingleVerticalItem label="رشته" value={dataPlaceHolder({ data: field })} />
          <SingleVerticalItem label="مقطع" value={dataPlaceHolder({ data: section })} /> */}
          {/* <SingleVerticalItem label="بومی/ غیربومی" value="-" /> */}
          <SingleVerticalItem
            label="شماره موبایل"
            value={dataPlaceHolder({ data: complainantPhoneNumber })}
          />
        </div>
      ),
    },
  ];
};

// شاکی حقوقی داخل دانشگاه
const LegalPlaintiffInfo = ({
  personnelId,
  unit,
  complainantPhoneNumber,
  complainantName,
  complainantFamily,
}: LegalPlaintiffInfoProps) => {
  return [
    {
      label: (
        <div className="reporter-info-items-container">
          <SingleVerticalItem
            label="نام"
            value={dataPlaceHolder({ data: complainantName })}
          />
          <SingleVerticalItem
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: complainantFamily })}
          />
          <SingleVerticalItem
            label="واحد آموزشی"
            value={dataPlaceHolder({ data: unit })}
          />
          <SingleVerticalItem
            label="شماره پرسنلی"
            value={dataPlaceHolder({ data: personnelId })}
          />
        </div>
      ),
      children: (
        <div className="reporter-info-items-container">
          <SingleVerticalItem
            label="شماره موبایل"
            value={dataPlaceHolder({ data: complainantPhoneNumber })}
          />
        </div>
      ),
    },
  ];
};

// شاکی حقوقی بیرون دانشگاه
const LegalPlaintiffOutsideInfo = ({
  complainantName,
  complainantFamily,
  position,
  unit,
  letterNo,
  letterDate,
}: LegalPlaintiffOutsideInfoProps) => {
  return [
    {
      label: (
        <div className="reporter-info-items-container">
          <SingleVerticalItem
            label="نام"
            value={dataPlaceHolder({ data: complainantName })}
          />
          <SingleVerticalItem
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: complainantFamily })}
          />
          <SingleVerticalItem label="سمت" value={dataPlaceHolder({ data: position })} />
          <SingleVerticalItem label="سازمان" value={dataPlaceHolder({ data: unit })} />
        </div>
      ),
      children: (
        <div className="reporter-info-items-container">
          <SingleVerticalItem
            label="شماره نامه"
            value={dataPlaceHolder({ data: letterNo })}
          />
          <SingleVerticalItem
            label="تاریخ نامه"
            value={dataPlaceHolder({ data: letterDate, isDate: true })}
          />
        </div>
      ),
    },
  ];
};

//متهم
const AccusedInfo = ({
  complainantNo,
  complainantNationalcode,
  complainantPhoneNumber,
  complainantName,
  complainantFamily,
  field,
  section,
}: RealPlaintiffInfoProps) => {
  return [
    {
      label: (
        <div className="reporter-info-items-container">
          <SingleVerticalItem
            label="نام"
            value={dataPlaceHolder({ data: complainantName })}
          />
          <SingleVerticalItem
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: complainantFamily })}
          />
          <SingleVerticalItem
            label="شماره ملی"
            value={dataPlaceHolder({ data: complainantNationalcode })}
          />
          <SingleVerticalItem
            label="شماره دانشجویی"
            value={dataPlaceHolder({ data: complainantNo })}
          />
        </div>
      ),
      children: (
        <div className="reporter-info-items-container">
          {/* <SingleVerticalItem label="دپارتمان" value="-" />
            <SingleVerticalItem label="سمت" value="-" />
            <SingleVerticalItem label="سن" value="-" />
            <SingleVerticalItem label="سال ورود" value="-" /> */}
          <SingleVerticalItem label="رشته" value={dataPlaceHolder({ data: field })} />
          <SingleVerticalItem label="مقطع" value={dataPlaceHolder({ data: section })} />
          {/* <SingleVerticalItem label="بومی/ غیربومی" value="-" /> */}
          <SingleVerticalItem
            label="شماره موبایل"
            value={dataPlaceHolder({ data: complainantPhoneNumber })}
          />
        </div>
      ),
    },
  ];
};

const RemoveHistoryPartiesInformationStep = ({
  setCurrent,
  violationId,
}: PartiesInformationStepProps) => {
  const nextStepHandler = () => {
    setCurrent((prev) => (prev < 3 ? prev + 1 : 3));
  };

  //? ================================  Api Calls ================================
  //  دریافت اطلاعات شاکی و متهم
  const [
    getPlaintiffInfo,
    { data: plaintiffInfoData, isLoading: isPlaintiffInfoLoading },
  ] = useGetPartiesInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (violationId) {
      getPlaintiffInfo({
        _data_: {
          id: violationId.toString(),
        },
      });
    }
  }, [violationId]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      loading={isPlaintiffInfoLoading}
      className="remove-history-parties-info-step-container"
    >
      <div className="around-box">
        <div className="plaintiff-item-wrapper">
          <CustomDivider text="اطلاعات هویتی شاکی" />
          {plaintiffInfoData?.data?.plaintiffType === 2 ? (
            <Collapse
              expandIcon={({ isActive }) => (
                <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
              )}
              ghost
              items={RealPlaintiffInfo({
                complainantName: plaintiffInfoData?.data?.reporterName,
                complainantFamily: plaintiffInfoData?.data?.reporterFamily,
                complainantNationalcode: plaintiffInfoData?.data?.reporterNationalcode,
                complainantNo: plaintiffInfoData?.data?.reporterNumber,
                complainantPhoneNumber: plaintiffInfoData?.data?.reporterPhoneNumber,
                section: plaintiffInfoData?.data?.gradeStudent,
                field: plaintiffInfoData?.data?.fieldStudent,
              })}
            />
          ) : plaintiffInfoData?.data?.plaintiffType === 1 ? (
            <Collapse
              expandIcon={({ isActive }) => (
                <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
              )}
              ghost
              items={LegalPlaintiffInfo({
                complainantName: plaintiffInfoData?.data?.reporterName,
                complainantFamily: plaintiffInfoData?.data?.reporterFamily,
                personnelId: plaintiffInfoData?.data?.reporterNumber,
                complainantPhoneNumber: plaintiffInfoData?.data?.reporterPhoneNumber,
                unit: plaintiffInfoData?.data?.reporterUni,
              })}
            />
          ) : (
            <Collapse
              expandIcon={({ isActive }) => (
                <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
              )}
              ghost
              items={LegalPlaintiffOutsideInfo({
                complainantName: plaintiffInfoData?.data?.reporterName,
                complainantFamily: plaintiffInfoData?.data?.reporterFamily,
                unit: plaintiffInfoData?.data?.reporterUni,
                letterNo: plaintiffInfoData?.data?.letterNumber,
                letterDate: plaintiffInfoData?.data?.letterDate,
                position: plaintiffInfoData?.data?.reporterPost,
              })}
            />
          )}
        </div>
      </div>
      <div className="around-box">
        <div className="plaintiff-item-wrapper">
          <CustomDivider text="اطلاعات هویتی متهم" />
          <Collapse
            expandIcon={({ isActive }) => (
              <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
            )}
            ghost
            items={AccusedInfo({
              complainantName: plaintiffInfoData?.data?.studentName,
              complainantFamily: plaintiffInfoData?.data?.studentFamily,
              complainantNationalcode: plaintiffInfoData?.data?.nationalCode,
              complainantNo: plaintiffInfoData?.data?.studentNumber,
              complainantPhoneNumber: plaintiffInfoData?.data?.studentPhoneNumber,
              section: plaintiffInfoData?.data?.gradeStudent,
              field: plaintiffInfoData?.data?.fieldStudent,
            })}
          />
        </div>
      </div>
      <div className="button-wrapper">
        <CustomButton type="primary" onClick={nextStepHandler}>
          بعدی
        </CustomButton>
      </div>
    </CustomCard>
  );
};
export default RemoveHistoryPartiesInformationStep;
