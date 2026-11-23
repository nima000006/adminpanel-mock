import { useEffect } from "react";

import { Button } from "antd";
import { useNavigate } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_NEW_SUPPLEMENTARY_PUNISHMENT_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetReportAdditionalPunishmentDetailQuery } from "@infra/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";
import "./_supplementaryPunishmentInfo.scss";

const SupplementaryPunishmentInfo = () => {
  const id = new URLSearchParams(location.search).get("id");

  const title = "اطلاعات تنبیه تکمیلی";
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [
    getReportAdditionalPunishmentDetail,
    { data: reportAdditionalPunishmentDetailData, isLoading },
  ] = useLazyGetReportAdditionalPunishmentDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getReportAdditionalPunishmentDetail(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate(
      `${COMMITTEE_NEW_SUPPLEMENTARY_PUNISHMENT_PAGE_ROUTE}?title=${title}&id=${id}`
    );
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
        {reportAdditionalPunishmentDetailData && (
          <>
            <div className="grid-cols-2">
              <SingleVerticalItem
                label="عنوان"
                value={dataPlaceHolder({
                  data: reportAdditionalPunishmentDetailData?.data[0]?.title,
                })}
              />
              <SingleVerticalItem
                label="تاریخ جلسه"
                value={dataPlaceHolder({
                  data: reportAdditionalPunishmentDetailData?.data[0]?.createDate,
                  isDate: true,
                })}
              />
            </div>
            <SingleVerticalItem
              label="توضیحات"
              value={dataPlaceHolder({
                data: reportAdditionalPunishmentDetailData?.data[0]?.desc,
              })}
            />
          </>
        )}
      </CustomCard>
    </div>
  );
};
export default SupplementaryPunishmentInfo;
