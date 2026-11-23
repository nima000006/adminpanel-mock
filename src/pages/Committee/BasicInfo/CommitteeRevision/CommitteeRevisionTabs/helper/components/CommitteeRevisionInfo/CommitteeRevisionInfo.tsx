import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_REVISION_CREATE_CHANGE_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetCommitteeRevisionInfoTabQuery } from "@infra/states/redux/Apis/committee/committees/committees";

import { GetCommitteeRevisionInfoTabResponse } from "./@types/@committeeRevisionInfo";
import "./_committeeRevisionInfo.scss";

const CommitteeRevisionInfo = () => {
  const [radioValue, setRadioValue] = useState<string>();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  // get data from api for SingleVerticalItem filed
  const [
    getCommitteeRevisionInfoTab,
    {
      data: getCommitteeRevisionInfoTabData,
      isLoading: isGetCommitteeRevisionInfoTabLoading,
    },
  ] = useLazyGetCommitteeRevisionInfoTabQuery();

  //* ================================ Util Functions ================================
  const onGetCommitteeRevisionInfoTabSuccess = async (
    value: GetCommitteeRevisionInfoTabResponse
  ) => {
    setRadioValue(value?.data[0]?.AssociationVotingType_title);
  };

  //? ================================ Effects ================================
  useEffect(() => {
    getCommitteeRevisionInfoTab({ maxResults: 1 })
      .unwrap()
      .then(onGetCommitteeRevisionInfoTabSuccess);
  }, []);

  //! create change btn
  const makeChangeHandler = () => {
    navigate({
      pathname: COMMITTEE_REVISION_CREATE_CHANGE_PAGE_ROUTE,
      search: makeSearchParams({
        id: getCommitteeRevisionInfoTabData?.data[0]?.id,
        provinceId: getCommitteeRevisionInfoTabData?.data[0]?.provinceId,
      }),
    });
  };

  return (
    <Div
      className="committee-revision-info-container"
      loading={isGetCommitteeRevisionInfoTabLoading}
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
        <div className="committee-members-box">
          <SingleVerticalItem
            label="رییس دبیرخانه هیات امنا (رییس کمیته)"
            value={dataPlaceHolder({
              data: getCommitteeRevisionInfoTabData?.data[0]
                ?.AssociationBossCommitte_title,
            })}
          />
          <SingleVerticalItem
            label="رییس شورای دانشجویی و فرهنگی و ورزشی استان"
            value={dataPlaceHolder({
              data: getCommitteeRevisionInfoTabData?.data[0]
                ?.AssociationPresidentStudentCouncil_title,
            })}
          />
          <SingleVerticalItem
            label="مسئول دفتر نهاد نمایندگی رهبری دانشگاه در استان"
            value={dataPlaceHolder({
              data: getCommitteeRevisionInfoTabData?.data[0]
                ?.AssociationLeadershipBody_title,
            })}
          />
          <SingleVerticalItem
            label="عضو هیات علمی گروه حقوق"
            value={dataPlaceHolder({
              data: getCommitteeRevisionInfoTabData?.data[0]
                ?.AssociationFacultyMember_title,
            })}
          />
          <SingleVerticalItem
            label="عضو دانشجویی"
            value={dataPlaceHolder({
              data: getCommitteeRevisionInfoTabData?.data[0]
                ?.AssociationStudentRepresentative_title,
            })}
          />
          <SingleVerticalItem
            label="کارشناس امور دانشجویی، فرهنگی، ورزشی و زنان فرهیخته استان (دبیر کمیته تجدید نظر)"
            value={dataPlaceHolder({
              data: getCommitteeRevisionInfoTabData?.data[0]
                ?.AssociationSectetaryPersonnell_title,
            })}
          />
        </div>
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
export default CommitteeRevisionInfo;
