import { memo, useEffect, useState } from "react";

import { Button, Steps, Switch, Tag, Upload } from "antd";
import { AiOutlineCloseCircle, AiOutlineUpload } from "react-icons/ai";

import { ResearchFilter, StepDataType } from "./@types/@additionalResearchTab";
import { dataPlaceHolder } from "../../../../../infrastructure/helpers/utils";
import {
  useLazyGetEducationalDataInResearchSectionQuery,
  useLazyGetResearchDataInResearchSectionQuery,
  useLazyGetSecurityDataInResearchSectionQuery,
  useLazyGetStudentDataInResearchSectionQuery,
  useLazyGetTotalDataInResearchSectionQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { BLUE_03 } from "../../../../../infrastructure/VARS/globalColors/globalColors";
import Div from "../../../../Renderers/Div/Div";
import SingleVerticalItem from "../../../../Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_additionalResearchTab.scss";

const stepItem = (item: StepDataType) => {
  return {
    title: (
      <div className="step-item-container">
        <div className="header-container">
          <div>
            <h3 className="step-title">{`${item?.section} (${item?.label})`}</h3>
            <span className="step-subtitle">
              {dataPlaceHolder({ data: item?.generalDate, isDate: true })}
            </span>
          </div>
          <div className="switch-container">
            <Switch
              defaultChecked={false}
              checkedChildren={<span className="switch-text">نمایش</span>}
              unCheckedChildren={<span className="switch-text">مخفی</span>}
            />
            <span className="switch-title">نمایش به دانشجو</span>
          </div>
        </div>
        <div className="step-body">
          <div className="around-box referral-section">
            <div className="title-container">
              <span className="step-subtitle">ارجاع: </span>
              <h3 className="step-title">
                {dataPlaceHolder({ data: item?.date, isDate: true })}
              </h3>
            </div>
            <SingleVerticalItem
              label="نظر"
              value={dataPlaceHolder({
                data: item?.comment,
              })}
            />
            <SingleVerticalItem
              label="توضیح"
              value={dataPlaceHolder({ data: item?.desc })}
            />

            <div className="attachment-container">
              <h3 className="step-title">پیوست ها</h3>
              <Upload className="upload-container" listType="picture" multiple disabled>
                <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
                  بارگذاری تصاویر
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
    ),
  };
};

const AdditionalResearchTab = memo(({ id }: { id: string }) => {
  const [selectedItem, setSelectedItem] = useState<ResearchFilter>(undefined);
  const [stepData, setStepData] = useState<StepDataType[]>();

  //? ================================  Api Calls ================================
  const [GetSecurityData, { data: securityData, isFetching: isSecurityDataLoading }] =
    useLazyGetSecurityDataInResearchSectionQuery();

  const [
    GetEducationalData,
    { data: educationalData, isFetching: isEducationalDataLoading },
  ] = useLazyGetEducationalDataInResearchSectionQuery();

  const [getResearchData, { data: researchData, isFetching: isResearchDataLoading }] =
    useLazyGetResearchDataInResearchSectionQuery();

  const [getStudentData, { data: studentData, isFetching: isStudentDataLoading }] =
    useLazyGetStudentDataInResearchSectionQuery();

  const [getTotalData, { data: totalData, isFetching: isTotalDataLoading }] =
    useLazyGetTotalDataInResearchSectionQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (selectedItem === "SECURITY") {
      GetSecurityData({ id, maxResults: 1 });
    } else if (selectedItem === "EDUCATIONAL") {
      GetEducationalData({ id, maxResults: 1 });
    } else if (selectedItem === "RESEARCH") {
      getResearchData({ id, maxResults: 1 });
    } else if (selectedItem === "STUDENT") {
      getStudentData({ id, maxResults: 1 });
    } else if (!selectedItem) {
      getTotalData({ id, maxResults: 1 });
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItem === "SECURITY" && securityData?.data) {
      setStepData(securityData?.data);
    } else if (selectedItem === "EDUCATIONAL" && educationalData?.data) {
      setStepData(educationalData?.data);
    } else if (selectedItem === "RESEARCH" && researchData?.data) {
      setStepData(researchData?.data);
    } else if (selectedItem === "STUDENT" && studentData?.data) {
      setStepData(studentData?.data);
    } else if (!selectedItem) {
      setStepData(totalData?.data);
    }
  }, [
    selectedItem,
    securityData?.data,
    educationalData?.data,
    researchData?.data,
    studentData?.data,
    totalData?.data,
  ]);

  //* ================================ Util Functions ================================
  const onSecurityClickHandler = () => {
    setSelectedItem((prev) => {
      if (prev === "SECURITY") {
        return undefined;
      }
      return "SECURITY";
    });
  };
  const onEducationalClickHandler = () => {
    setSelectedItem((prev) => {
      if (prev === "EDUCATIONAL") {
        return undefined;
      }
      return "EDUCATIONAL";
    });
  };
  const onResearchClickHandler = () => {
    setSelectedItem((prev) => {
      if (prev === "RESEARCH") {
        return undefined;
      }
      return "RESEARCH";
    });
  };
  const onStudentClickHandler = () => {
    setSelectedItem((prev) => {
      if (prev === "STUDENT") {
        return undefined;
      }
      return "STUDENT";
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="accusation-case-additional-research-tab-container">
      <div className="filter-container">
        <span className="title-text">فیلترها:</span>
        <div className="capsule-container">
          <Tag
            className={`capsule ${selectedItem === "SECURITY" ? "capsule-active" : ""}`}
            onClick={() => onSecurityClickHandler()}
            closeIcon={
              selectedItem === "SECURITY" ? (
                <AiOutlineCloseCircle style={{ color: BLUE_03 }} />
              ) : null
            }
            onClose={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault();
              onSecurityClickHandler();
            }}
          >
            حراست
          </Tag>
          <Tag
            className={`capsule ${
              selectedItem === "EDUCATIONAL" ? "capsule-active" : ""
            }`}
            onClick={() => onEducationalClickHandler()}
            closeIcon={
              selectedItem === "EDUCATIONAL" ? (
                <AiOutlineCloseCircle style={{ color: BLUE_03 }} />
              ) : null
            }
            onClose={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault();
              onEducationalClickHandler();
            }}
          >
            معاونت آموزشی
          </Tag>
          <Tag
            className={`capsule ${selectedItem === "RESEARCH" ? "capsule-active" : ""}`}
            onClick={() => onResearchClickHandler()}
            closeIcon={
              selectedItem === "RESEARCH" ? (
                <AiOutlineCloseCircle style={{ color: BLUE_03 }} />
              ) : null
            }
            onClose={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault();
              onResearchClickHandler();
            }}
          >
            معاونت پژوهشی
          </Tag>
          <Tag
            className={`capsule ${selectedItem === "STUDENT" ? "capsule-active" : ""}`}
            onClick={() => onStudentClickHandler()}
            closeIcon={
              selectedItem === "STUDENT" ? (
                <AiOutlineCloseCircle style={{ color: BLUE_03 }} />
              ) : null
            }
            onClose={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault();
              onStudentClickHandler();
            }}
          >
            معاونت دانشجویی
          </Tag>
        </div>
      </div>
      <Div
        loading={
          isSecurityDataLoading ||
          isEducationalDataLoading ||
          isStudentDataLoading ||
          isResearchDataLoading ||
          isTotalDataLoading
        }
      >
        <Steps
          orientation="vertical"
          size="small"
          current={stepData?.length ? stepData?.length - 1 : 0}
          items={stepData?.map((item) => stepItem(item))}
        />
      </Div>
    </div>
  );
});
AdditionalResearchTab.displayName = "AdditionalResearchTab";
export default AdditionalResearchTab;
