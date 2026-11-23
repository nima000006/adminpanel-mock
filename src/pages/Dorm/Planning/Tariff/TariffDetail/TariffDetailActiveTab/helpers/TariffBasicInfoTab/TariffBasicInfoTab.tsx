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
import "./_tariffBasicInfoTab.scss";

const TariffBasicInfoTab = () => {
  const [hasSwitch] = useState(true);
  const {
    params: { id, title },
  } = useQueryParams();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  // get data
  const [
    getBasicInfoDetail,
    { data: basicInfoDetailData, isLoading: isBasicInfoDetailLoading },
  ] = useLazyGetTariffBasicInfoCopyDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getBasicInfoDetail({ id_EQ: +id, firstResult: 0, maxResults: 50 }); // we should set 0 and 50 as default
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // btn handler
  const tariffCopyBtnHandler = () => {
    navigate({
      pathname: DORM_TARIFF_MODIFY_PAGE_ROUTE,
      search: makeSearchParams({
        id: id,
        title: title,
      }),
    });
  };

  return (
    <Div className="tariff-basic-info-tab-container" loading={isBasicInfoDetailLoading}>
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
export default TariffBasicInfoTab;
