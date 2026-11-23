import { useEffect } from "react";

import { Button } from "antd";
import { useNavigate } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_NEW_AGGRAVATION_CAUSE_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetAggravationCauseDetailQuery } from "@infra/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";
import "./_aggravationCauseInfo.scss";

const AggravationCauseInfo = () => {
  const navigate = useNavigate();

  const title = "اطلاعات عامل تشدید";

  const id = new URLSearchParams(location.search).get("id");

  //? ================================  Api Calls ================================
  const [getAggravationCauseDetail, { data: aggravationCauseDetailData, isLoading }] =
    useLazyGetAggravationCauseDetailQuery();

  //! ============================ Error Handling ============================

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAggravationCauseDetail(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate(`${COMMITTEE_NEW_AGGRAVATION_CAUSE_PAGE_ROUTE}?title=${title}&id=${id}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-supplementary-punishment-info-container">
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={makeChangeHandler}
      >
        ایجاد تغییرات
      </Button>
      <CustomCard padding={PADDING_24} className="input-wrapper" loading={isLoading}>
        {aggravationCauseDetailData && (
          <>
            <div className="inputs-wrapper">
              <SingleVerticalItem
                label="عنوان"
                value={dataPlaceHolder({
                  data: aggravationCauseDetailData?.data[0]?.title,
                })}
              />
              <SingleVerticalItem
                label="تاریخ ایجاد"
                value={dataPlaceHolder({
                  data: aggravationCauseDetailData?.data[0]?.createDate,
                  isDate: true,
                })}
              />
            </div>
            <SingleVerticalItem
              label="توضیحات"
              value={dataPlaceHolder({ data: aggravationCauseDetailData?.data[0]?.desc })}
            />
          </>
        )}
      </CustomCard>
    </div>
  );
};
export default AggravationCauseInfo;
