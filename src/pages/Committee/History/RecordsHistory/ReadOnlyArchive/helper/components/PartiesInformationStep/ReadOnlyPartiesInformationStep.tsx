import { useEffect, useState } from "react";

import { Button, Collapse, Row } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetPartiesInfoMutation } from "@infra/states/redux/Apis/committee/committees/committees";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

import {
  GetPartiesInfoResponse,
  InfoHandlerType,
  PartiesInfoType,
  PartiesInformationStepProps,
} from "./@types/@readOnlyPartiesInformationStep";
import "./_readOnlyPartiesInformationStep.scss";

// Component to show plaintiff and accused information
const infoHandler = ({
  firstName,
  lastName,
  nationalCode,
  studentNumber,
  mobile,
}: InfoHandlerType) => {
  return [
    {
      label: (
        <Row gutter={[12, 12]}>
          <SingleVerticalWithCol span={6} label="نام" value={firstName} />

          <SingleVerticalWithCol span={6} label="نام خانوادگی" value={lastName} />

          <SingleVerticalWithCol span={6} label="شماره ملی" value={nationalCode} />

          <SingleVerticalWithCol span={6} label="شماره دانشجویی" value={studentNumber} />
        </Row>
      ),
      children: (
        <Row gutter={[12, 12]}>
          {/* <SingleVerticalItem  label="دپارتمان" value={dataPlaceHolder({ data: "_" })} />
            <SingleVerticalItem  label="سمت" value={dataPlaceHolder({ data: "_" })} />
            <SingleVerticalItem  label="سن" value={dataPlaceHolder({ data: "_" })} />
            <SingleVerticalItem  label="سال ورود" value={dataPlaceHolder({ data: "_" })} /> */}
          {/* 
            <SingleVerticalWithCol
            xs={6}
              label="رشته"
              value={dataPlaceHolder({ data: fieldName })}
            />
          
         
            <SingleVerticalWithCol
            xs={6}>
              label="مقطع"
              value={dataPlaceHolder({ data: levelName })}
            />
           */}
          {/* <SingleVerticalItem  label="معدل" value={dataPlaceHolder({ data: "_" })} />
            <SingleVerticalItem 
              label="تعداد واحدهای گذرانده"
              value={dataPlaceHolder({ data: "_" })}
            />
            <SingleVerticalItem 
              label="تعداد گزارشات دوره"
              value={dataPlaceHolder({ data: "_" })}
            />
            <SingleVerticalItem 
              label="تعداد اتهامات دوره"
              value={dataPlaceHolder({ data: "_" })}
            />
            <SingleVerticalItem 
              label="بومی/ غیربومی"
              value={dataPlaceHolder({ data: "_" })}
            /> */}

          <SingleVerticalWithCol span={6} label="شماره موبایل" value={mobile} />
        </Row>
      ),
    },
  ];
};

const ReadOnlyPartiesInformationStep = ({
  setCurrentStep,
  setDeleteRequestStatus,
  deleteRequestStatus,
}: PartiesInformationStepProps) => {
  const [partiesInfo, setPartiesInfo] = useState<PartiesInfoType | null>(null);
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getPartiesInfo, { isLoading: isPartiesInfoLoading }] =
    useGetPartiesInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getPartiesInfo({
        _data_: {
          id,
        },
      })
        .unwrap()
        .then(getPartiesInfoOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getPartiesInfoOnSuccess = async (value: GetPartiesInfoResponse) => {
    if (value?.status === 200) {
      setPartiesInfo(value?.data);
      setDeleteRequestStatus(value?.data?.recycleBin);
    }
  };

  const nextBtnHandler = () => {
    setCurrentStep(1);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="committee-records-detail-read-only-parties-information-step-container"
      loading={isPartiesInfoLoading}
    >
      {deleteRequestStatus && (
        <div className="delete-request-status-container">
          <p className="status-text">
            برای این سابقه، درخواست حذف ثبت شده و در انتظار تأیید مسئول مربوطه است.
          </p>
        </div>
      )}
      <CustomCard padding={PADDING_24} className="info-container">
        <CustomCard padding={PADDING_24}>
          <CustomDivider text="اطلاعات هویتی شاکی" />
          {partiesInfo && (
            <Collapse
              expandIcon={({ isActive }) => (
                <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
              )}
              ghost
              items={infoHandler({
                firstName: partiesInfo?.reporterName,
                lastName: partiesInfo?.reporterFamily,
                nationalCode: partiesInfo?.reporterNationalcode,
                studentNumber: partiesInfo?.reporterNumber,
                mobile: partiesInfo?.reporterPhoneNumber,
              })}
            />
          )}
        </CustomCard>
        <CustomCard padding={PADDING_24}>
          <CustomDivider text="اطلاعات هویتی متهم" />
          <Collapse
            expandIcon={({ isActive }) => (
              <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
            )}
            ghost
            items={infoHandler({
              firstName: partiesInfo?.studentName,
              lastName: partiesInfo?.studentFamily,
              nationalCode: partiesInfo?.nationalCode,
              studentNumber: partiesInfo?.studentNumber,
              mobile: partiesInfo?.studentPhoneNumber,
            })}
          />
        </CustomCard>
      </CustomCard>
      <div className="button-wrapper">
        <Button type="primary" className="btn" onClick={nextBtnHandler}>
          بعدی
        </Button>
      </div>
    </Div>
  );
};

export default ReadOnlyPartiesInformationStep;
