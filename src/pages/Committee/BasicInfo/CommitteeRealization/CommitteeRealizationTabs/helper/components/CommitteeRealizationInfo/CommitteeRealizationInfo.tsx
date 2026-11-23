import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_REALIZATION_CREATE_CHANGE_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetRealizationCommitteeInfoTabQuery } from "@infra/states/redux/Apis/committee/committees/committees";
import "./_committeeRealizationInfo.scss";

const CommitteeRealizationInfo = () => {
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getRealizationData, { data, isLoading }] =
    useLazyGetRealizationCommitteeInfoTabQuery();

  //! ============================ Error Handling ============================

  //? ================================ Effects ================================
  useEffect(() => {
    getRealizationData();
  }, []);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate(COMMITTEE_REALIZATION_CREATE_CHANGE_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-realization-info-container">
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={makeChangeHandler}
      >
        ایجاد تغییرات
      </Button>
      <Form>
        <Div loading={isLoading}>
          <div className="committee-members-box-wrapper">
            <CustomDivider text="افراد کمیته" />

            <div className="committee-members-box">
              <SingleVerticalItem
                label="رییس دانشکده"
                value={dataPlaceHolder({
                  data: data?.data?.[0]?.AssociationBossCollege_title,
                })}
              />
              <SingleVerticalItem
                label="معاون دانشجویی دانشکده"
                value={dataPlaceHolder({
                  data: data?.data?.[0]?.AssociationStudentVicePresidentCollege_title,
                })}
              />
              <SingleVerticalItem
                label="مدیر گروه"
                value={dataPlaceHolder({
                  data: data?.data?.[0]?.AssociationHeadDepartment_title,
                })}
              />
            </div>
          </div>
          <div className="voting-type-box-wrapper">
            <CustomDivider text="نوع رای گیری" />
            <CustomRadioGroup
              name="system"
              label=""
              key={data?.data?.[0]?.AssociationVotingType_title}
              defaultValue={data?.data?.[0]?.AssociationVotingType_title}
              disabled={true}
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
      </Form>
    </div>
  );
};
export default CommitteeRealizationInfo;
