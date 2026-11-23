import { DormFloorSingleCardProps } from "./@types/@dormFloorSingleCard";
import DormFloorSingleCardActions from "./helper/components/Actions/DormFloorSingleCardActions";
import DormFloorSingleCardSubTitle from "./helper/components/SubTitle/DormFloorSingleCardSubtitle";
import DormFloorSingleCardTitle from "./helper/components/Title/DormFloorSingleCardTitle";
import "./_dormFloorSingleCard.scss";

const DormFloorSingleCard = ({ data }: DormFloorSingleCardProps) => {
  return (
    <div className="dorm-floor-single-card-container">
      <DormFloorSingleCardTitle
        title={data?.title}
        statusId={data?.recordStatus}
        statusTitle={data?.AssociationActiveStatus_title}
      />
      <DormFloorSingleCardSubTitle
        numberOfRooms={data?.NumberOfRooms}
        genderId={data?.AssociationBuilding_genderId}
        genderTitle={data?.AssociationBuilding_AssociationGender_title}
      />
      <DormFloorSingleCardActions
        numberOfRooms={data?.NumberOfRooms}
        id={data?.id}
        floorTitle={data?.title}
      />
    </div>
  );
};

export default DormFloorSingleCard;
