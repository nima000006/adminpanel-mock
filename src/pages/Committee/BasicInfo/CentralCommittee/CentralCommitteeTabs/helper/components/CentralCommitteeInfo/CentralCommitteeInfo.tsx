import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { CENTRAL_COMMITTEE_CREATE_CHANGE_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetCentralCommitteeInfoTabQuery } from "@infra/states/redux/Apis/committee/committees/committees";

import { GetCentralCommitteeInfoTabResponse } from "./@types/@centralCommitteeInfo";
import "./_centralCommitteeInfo.scss";

const CentralCommitteeInfo = () => {
  const [radioValue, setRadioValue] = useState<string>();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  // get data from api for SingleVerticalItem filed
  const [
    getCentralCommitteeInfoTab,
    {
      data: getCentralCommitteeInfoTabData,
      isLoading: isGetCentralCommitteeInfoTabLoading,
    },
  ] = useLazyGetCentralCommitteeInfoTabQuery();

  //! ============================ Error Handling ============================

  //? ================================ Effects ================================
  useEffect(() => {
    getCentralCommitteeInfoTab({ maxResults: 1 })
      .unwrap()
      .then(onGetCentralCommitteeInfoTabSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const onGetCentralCommitteeInfoTabSuccess = async (
    value: GetCentralCommitteeInfoTabResponse
  ) => {
    setRadioValue(value?.data[0]?.AssociationVotingType_title);
  };

  const makeChangeHandler = () => {
    navigate({
      pathname: CENTRAL_COMMITTEE_CREATE_CHANGE_PAGE_ROUTE,
      search: makeSearchParams({ id: getCentralCommitteeInfoTabData?.data[0]?.id }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="central-committee-info-container"
      loading={isGetCentralCommitteeInfoTabLoading}
    >
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={makeChangeHandler}
      >
        ایجاد تغییرات
      </Button>
      <div className="committee-members-box-wrapper">
        <CustomDivider text="افراد کمیته" />
        <Form className="committee-members-box">
          <SingleVerticalItem
            label="معاون دانشجویی فرهنگی دانشگاه ( رییس کمیته)"
            value={dataPlaceHolder({
              data: getCentralCommitteeInfoTabData?.data[0]
                ?.AssociationCulturalBoss_title,
            })}
          />
          <SingleVerticalItem
            label="معاون آموزشی دانشگاه"
            value={dataPlaceHolder({
              data: getCentralCommitteeInfoTabData?.data[0]
                ?.AssociationEducationAssistant_title,
            })}
          />
          <SingleVerticalItem
            label="معاون پژوهشی دانشگاه"
            value={dataPlaceHolder({
              data: getCentralCommitteeInfoTabData?.data[0]
                ?.AssociationResearchAssistant_title,
            })}
          />
          <SingleVerticalItem
            label="مدیر کل دفتر امور حقوقی"
            value={dataPlaceHolder({
              data: getCentralCommitteeInfoTabData?.data[0]
                ?.AssociationDirectorGeneralLegal_title,
            })}
          />
          <SingleVerticalItem
            label="مدیر کل دفتر گزینش"
            value={dataPlaceHolder({
              data: getCentralCommitteeInfoTabData?.data[0]
                ?.AssociationGeneralManagerSelection_title,
            })}
          />
          <SingleVerticalItem
            label="روحانی عضو کمیته"
            value={dataPlaceHolder({
              data: getCentralCommitteeInfoTabData?.data[0]?.AssociationCleric_title,
            })}
          />
          <SingleVerticalItem
            label="رییس سازمان سما"
            value={dataPlaceHolder({
              data: getCentralCommitteeInfoTabData?.data[0]
                ?.AssociationHeadSamaOrganization_title,
            })}
          />
          <SingleVerticalItem
            label="مدیر کل امور دانشجویی دانشگاه (دبیر کمیته)"
            value={dataPlaceHolder({
              data: getCentralCommitteeInfoTabData?.data[0]
                ?.AssociationDirectorGeneralStudent_title,
            })}
          />
        </Form>
      </div>
      <Form className="voting-type-box-wrapper">
        <CustomDivider text="نوع رای گیری" />
        <CustomRadioGroup
          name="system"
          label=""
          key={radioValue}
          defaultValue={radioValue}
          options={[
            {
              label: "سیستمی",
              value: "سیستمی",
            },
            {
              label: "دستی",
              value: "دستی",
            },
          ]}
        />
      </Form>
    </Div>
  );
};
export default CentralCommitteeInfo;
