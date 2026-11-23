import { Button } from "antd";
import { useNavigate } from "react-router";

import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_NEW_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE } from "@infra/router/routes/committee";

import { BasicInfoSupplementaryPunishment } from "./@types/@accusationAndViolationsInfo";
import { getDetailsAccusationAndViolationsData } from "../../../@types/@detailsAccusationAndViolations";
import "./_accusationAndViolationsInfo.scss";

const AccusationAndViolationsInfo = ({
  data,
}: {
  data: getDetailsAccusationAndViolationsData | undefined;
}) => {
  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  const editBtnClickHandler = () => {
    if (data?.id) {
      navigate(
        `${COMMITTEE_NEW_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE}?type=edit&id=${data?.id}`
      );
    }
  };

  const supplementaryPunishmentItem = (data: BasicInfoSupplementaryPunishment[]) => {
    if (data?.length === 0) return "-";
    return data?.map(
      (item, index) =>
        item?.title && (
          <div key={item?.id} className="custom-supplementary-container">
            <span>{index + 1}- </span>
            <span>{item?.title}</span>
          </div>
        )
    );
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-accusation-violation-info-container">
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={editBtnClickHandler}
      >
        ایجاد تغییرات
      </Button>

      <div className="grid-cols-3">
        <SingleVerticalItem
          label="عنوان"
          value={dataPlaceHolder({ data: data?.title })}
        />
        <SingleVerticalItem
          label="آیین نامه"
          value={dataPlaceHolder({ data: data?.AssociationRegulations?.title })}
        />
        <SingleVerticalItem
          label="دسته بندی"
          value={dataPlaceHolder({ data: data?.AssociationInfractionType?.title })}
        />

        <SingleVerticalItem
          label="تنبیهات مجاز"
          value={dataPlaceHolder({
            data: data?.AssociationViolationPenalty,
            callBack: supplementaryPunishmentItem,
          })}
        />

        <SingleVerticalItem
          label="تاریخ ایجاد"
          value={dataPlaceHolder({ data: data?.createDate, isDate: true })}
        />
        <SingleVerticalItem
          label="توضیحات"
          value={dataPlaceHolder({ data: data?.desc })}
        />
        <SingleVerticalItem
          label="تنبیهات تکمیلی مجاز"
          value={dataPlaceHolder({
            data: data?.AssociationAdditionalViolationPunishment,
            callBack: supplementaryPunishmentItem,
          })}
        />
      </div>
    </div>
  );
};
export default AccusationAndViolationsInfo;
