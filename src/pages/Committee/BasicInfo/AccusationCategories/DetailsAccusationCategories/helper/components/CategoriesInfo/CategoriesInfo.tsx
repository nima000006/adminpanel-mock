import { useEffect } from "react";

import { Button } from "antd";
import { useNavigate } from "react-router";

import "./_categoriesInfo.scss";
import CustomCard from "@components/CustomCard/CustomCard";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_NEW_ACCUSATION_CATEGORIES_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useGetAccusationDetailMutation } from "@infra/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

const CategoriesInfo = () => {
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get("id");
  const type = new URLSearchParams(location.search).get("type");

  //? ================================  Api Calls ================================
  const [getAccusationDetail, { data: accusationDetailData, isLoading }] =
    useGetAccusationDetailMutation();

  //! ============================ Error Handling ============================

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAccusationDetail({ _data_: { id } });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate(`${COMMITTEE_NEW_ACCUSATION_CATEGORIES_PAGE_ROUTE}?id=${id}&type=${type}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-categories-info-container">
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={makeChangeHandler}
      >
        ایجاد تغییرات
      </Button>
      <CustomCard padding={PADDING_24} className="input-wrapper" loading={isLoading}>
        {accusationDetailData && (
          <>
            <div className="grid-cols-3">
              <SingleVerticalItem
                label="عنوان"
                value={dataPlaceHolder({ data: accusationDetailData?.data?.title })}
              />
              <SingleVerticalItem
                label="آیین نامه"
                value={dataPlaceHolder({
                  data: accusationDetailData?.data?.AssociationRegulation?.title,
                })}
              />
              <SingleVerticalItem
                label="تاریخ جلسه"
                value={dataPlaceHolder({
                  data: accusationDetailData?.data?.createDate,
                  isDate: true,
                })}
              />
            </div>
            <SingleVerticalItem
              label="توضیحات"
              value={dataPlaceHolder({ data: accusationDetailData?.data?.desc })}
            />
          </>
        )}
      </CustomCard>
    </div>
  );
};
export default CategoriesInfo;
