import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { DORM_TARIFF_MODIFY_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetTariffBasicInfoCopyDetailQuery } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { massageCreatorInactiveAlert } from "@pages/Dorm/Planning/Tariff/_shared/utils/TariffUtils";

import BasicInfoSection from "../../../helper/BasicInfoSection/BasicInfoSection";
import ScheduleSection from "../../../helper/ScheduleSection/ScheduleSection";

import "./_tariffInActiveBasicInfoTab.scss";

const TariffInActiveBasicInfoTab = () => {
  const [hasSwitch] = useState(false);
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  // get data
  const [
    getBasicInfoDetail,
    { data: basicInfoDetailData, isFetching: isBasicInfoDetailLoading },
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
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="tariff-basic-info-tab-container" loading={isBasicInfoDetailLoading}>
      <CustomAlert
        message={massageCreatorInactiveAlert(
          dataPlaceHolder({
            data: basicInfoDetailData?.data[0]?.deactivationDate,
            isDate: true,
          })
        )}
        type="error"
        showIcon
        className="alert"
      />
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
export default TariffInActiveBasicInfoTab;
