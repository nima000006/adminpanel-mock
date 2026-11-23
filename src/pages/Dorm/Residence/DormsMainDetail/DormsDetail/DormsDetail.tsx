import { Row } from "antd";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import DividerExtraContent from "./_shared/component/DividerExtraContent/DividerExtraContent";
import ResidenceCardsData from "./_shared/component/ResidenceCardsData/ResidenceCardsData";
import ResidenceDetailMainCard from "./_shared/component/ResidenceDetailMainCard/ResidenceDetailMainCard";
import ResidenceSelectItems from "./_shared/component/ResidenceSelectItems/ResidenceSelectItems";
import { CARD_TYPE, cardList } from "./_shared/utils/DormMainDetailUtils";
import "./_dormsDetail.scss";

const DormsDetail = () => {
  const { params: url, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_LIST_PAGE_ROUTE}>اقامتگاه ها</Link>,
      },
      ...(url?.title
        ? [
            {
              title: url?.title,
            },
          ]
        : []),
    ],
  });

  //* ================================ Util Functions ================================
  const tabChangeHandler = (type: string) => {
    if (type === CARD_TYPE?.building) {
      // delete building urls
      if (url?.buildingId) {
        delete url.buildingId;
        delete url?.buildingTitle;
        delete url?.buildingGenderId;
        delete url?.buildingGenderTitle;
      }
    }
    if (type === CARD_TYPE?.building || type === CARD_TYPE?.floor) {
      // delete floor urls
      if (url?.floorId) {
        delete url.floorId;
        delete url?.floorTitle;
      }
    }
    if (
      type === CARD_TYPE?.building ||
      type === CARD_TYPE?.floor ||
      type === CARD_TYPE?.room
    ) {
      // delete room urls
      if (url?.roomId) {
        delete url.roomId;
        delete url.roomTitle;
      }
    }
    setSearchParams({ ...url, mode: type });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="dorm-main-detail-container">
      <div className="residence-info-container">
        <CustomDivider text="اقامتگاه" extraContent={<DividerExtraContent />} />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="نام اقامتگاه" value={url?.title} />
          <SingleVerticalWithCol label="نوع اقامتگاه" value={url?.type} />
          <SingleVerticalWithCol label="ظرفیت اسمی (نفر)" value={url?.capacity} />
        </Row>
      </div>
      <div>
        <div className="residence-items-info-container">
          <div className="card-container">
            {cardList?.map((card) => (
              <ResidenceDetailMainCard
                key={card?.type}
                icon={
                  <card.icon
                    fillColor={`${url?.mode === card?.type ? "#096DD9" : "#bfbfbf"}`}
                  />
                }
                text={card?.title}
                active={url?.mode === card?.type && true}
                onClick={() => tabChangeHandler(card?.type)}
              />
            ))}
          </div>
          <ResidenceSelectItems />
        </div>
        <ResidenceCardsData />
      </div>
    </div>
  );
};

export default DormsDetail;
