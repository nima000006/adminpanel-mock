import { useEffect } from "react";

import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_NEW_TIMING_INFO_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetTimingInfoDetailQuery } from "@infra/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";
import "./_timingInfo.scss";

const TimingInfo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getTimingInfoDetail, { data: timingInfoDetailData, isFetching }] =
    useLazyGetTimingInfoDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getTimingInfoDetail(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate({
      pathname: COMMITTEE_NEW_TIMING_INFO_PAGE_ROUTE,
      search: makeSearchParams({ id }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-timing-info-container">
      <div>
        <Button
          type="primary"
          ghost
          className="make-change-btn"
          onClick={makeChangeHandler}
        >
          ایجاد تغییرات
        </Button>
      </div>
      <CustomCard padding={PADDING_24} className="timing-info-form" loading={isFetching}>
        {timingInfoDetailData && (
          <>
            <div className="inputs-container">
              <SingleVerticalItem
                label="عنوان"
                value={dataPlaceHolder({ data: timingInfoDetailData?.data[0]?.title })}
              />
              <SingleVerticalItem
                label="مدت(دقیقه)"
                value={dataPlaceHolder({ data: timingInfoDetailData?.data[0]?.time })}
              />
              <SingleVerticalItem
                label="تاریخ ایجاد"
                value={dataPlaceHolder({
                  data: timingInfoDetailData?.data[0]?.createDate,
                  isDate: true,
                })}
              />
            </div>
            <SingleVerticalItem
              label="توضیحات"
              value={dataPlaceHolder({ data: timingInfoDetailData?.data[0]?.desc })}
            />
          </>
        )}
      </CustomCard>
    </div>
  );
};
export default TimingInfo;
