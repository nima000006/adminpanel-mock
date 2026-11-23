import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_TARIFF_MODIFY_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetTariffBasicInfoCopyDetailQuery } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";

import BasicInfoSection from "../../../helper/BasicInfoSection/BasicInfoSection";
import ScheduleSection from "../../../helper/ScheduleSection/ScheduleSection";
import "./_tariffAwaitingReviewBasicInfoTab.scss";

const TariffAwaitingReviewBasicInfoTab = () => {
  const [hasSwitch] = useState(false);
  const { params } = useQueryParams<{ id: string; priceListId: string }>();
  const { id, priceListId } = params;
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  // get data
  const [
    getBasicInfoDetail,
    { data: basicInfoDetailData, isFetching: isBasicInfoDetailLoading },
  ] = useLazyGetTariffBasicInfoCopyDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (priceListId) {
      getBasicInfoDetail({ id_EQ: +priceListId, firstResult: 0, maxResults: 50 }); // we should set 0 and 50 as default
    }
  }, [priceListId]);

  //* ================================ Util Functions ================================
  // btn handler
  const tariffCopyBtnHandler = () => {
    navigate({
      pathname: DORM_TARIFF_MODIFY_PAGE_ROUTE,
      search: makeSearchParams({
        id: id,
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="tariff-awaiting-review-basic-info-tab-container"
      loading={isBasicInfoDetailLoading}
    >
      <BasicInfoSection infoData={basicInfoDetailData} hasSwitch={hasSwitch} />
      <ScheduleSection infoData={basicInfoDetailData} />

      <div className="tariff-copy-btn">
        <CustomButton type="primary" ghost onClick={tariffCopyBtnHandler}>
          کپی کردن تعرفه
        </CustomButton>
      </div>
    </Div>
  );
};
export default TariffAwaitingReviewBasicInfoTab;
