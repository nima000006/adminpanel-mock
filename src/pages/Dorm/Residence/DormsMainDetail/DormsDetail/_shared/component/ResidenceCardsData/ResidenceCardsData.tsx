import useQueryParams from "@infra/hooks/useQueryParams";

import { CARD_TYPE } from "../../utils/DormMainDetailUtils";
import ResidenceCardsDataBed from "./sections/ResidenceCardsDataBed/ResidenceCardsDataBed";
import ResidenceCardsDataBuilding from "./sections/ResidenceCardsDataBuilding/ResidenceCardsDataBuilding";
import ResidenceCardsDataFloor from "./sections/ResidenceCardsDataFloor/ResidenceCardsDataFloor";
import ResidenceCardsDataRoom from "./sections/ResidenceCardsDataRoom/ResidenceCardsDataRoom";
import "./_residenceCardsData.scss";

const ResidenceCardsData = () => {
  const {
    params: { mode },
  } = useQueryParams();

  const isBuilding = mode === CARD_TYPE.building;
  const isFloor = mode === CARD_TYPE.floor;
  const isRoom = mode === CARD_TYPE.room;
  const isBed = mode === CARD_TYPE.bed;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="residence-cards-data-container">
      {isBuilding && <ResidenceCardsDataBuilding />}
      {isFloor && <ResidenceCardsDataFloor />}
      {isRoom && <ResidenceCardsDataRoom />}
      {isBed && <ResidenceCardsDataBed />}
    </div>
  );
};

export default ResidenceCardsData;
