import { useEffect, useState } from "react";

import { Button } from "antd";
import { useNavigate } from "react-router";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { PRIMARY_COMMITTEE_CREATE_CHANGE_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetPrimaryCommitteeInfoTabQuery } from "@infra/states/redux/Apis/committee/committees/committees";

import { GetPrimaryCommitteeInfoTabResponse } from "../PrimaryChangeRecords/@types/@primaryChangeRecords";
import "./_primaryCommitteeInfo.scss";

const PrimaryCommitteeInfo = () => {
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState<string>();

  //? ================================  Api Calls ================================
  // get data from api for SingleVerticalItem filed
  const [
    getPrimaryCommittee,
    { data: getPrimaryCommitteeData, isLoading: isGetPrimaryCommitteeLoading },
  ] = useLazyGetPrimaryCommitteeInfoTabQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getPrimaryCommittee({ maxResults: 1 }).unwrap().then(onGetPrimaryCommitteeSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate({
      pathname: PRIMARY_COMMITTEE_CREATE_CHANGE_PAGE_ROUTE,
      search: makeSearchParams({
        id: getPrimaryCommitteeData?.data[0]?.id,
        uniId: getPrimaryCommitteeData?.data[0]?.uniId,
      }),
    });
  };

  const onGetPrimaryCommitteeSuccess = async (
    value: GetPrimaryCommitteeInfoTabResponse
  ) => {
    setRadioValue(value?.data[0]?.AssociationVotingType_title);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="primary-committee-info-container">
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={makeChangeHandler}
      >
        ایجاد تغییرات
      </Button>
      <Div
        className="committee-members-box-wrapper"
        loading={isGetPrimaryCommitteeLoading}
      >
        <CustomDivider text="افراد کمیته" />
        <div className="committee-members-box">
          <SingleVerticalItem
            label="معاونت دانشجویی (رییس کمیته)"
            value={dataPlaceHolder({
              data: getPrimaryCommitteeData?.data[0]?.AssociationBosPersonnel_title,
            })}
          />
          <SingleVerticalItem
            label="مدیر کل امور فرهنگی واحد"
            value={dataPlaceHolder({
              data: getPrimaryCommitteeData?.data[0]?.AssociationCulturalPersonnel_title,
            })}
          />
          <SingleVerticalItem
            label="عضو هیأت علمی گروه حقوق یا الهیات"
            value={dataPlaceHolder({
              data: getPrimaryCommitteeData?.data[0]?.AssociationLegalPersonnel_title,
            })}
          />
          <SingleVerticalItem
            label="عضو هیأت علمی واحد روانشناسی و مشاوره"
            value={dataPlaceHolder({
              data: getPrimaryCommitteeData?.data[0]?.AssociationAcademicPersonnel_title,
            })}
          />
          <SingleVerticalItem
            label="عضو دانشجویی"
            value={dataPlaceHolder({
              data: getPrimaryCommitteeData?.data[0]?.AssociationStudentInfo_title,
            })}
          />
          <SingleVerticalItem
            label="دبیر کمیته بدوی"
            value={dataPlaceHolder({
              data: getPrimaryCommitteeData?.data[0]?.AssociationSectetaryPersonnel_title,
            })}
          />
        </div>
      </Div>
      <div className="voting-type-box-wrapper">
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
      </div>
    </Div>
  );
};
export default PrimaryCommitteeInfo;
