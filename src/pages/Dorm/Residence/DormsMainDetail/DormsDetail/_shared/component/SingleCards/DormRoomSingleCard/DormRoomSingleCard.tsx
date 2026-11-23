import { DormRoomSingleCardProps } from "./@types/@dormRoomSingleCard";
import DormRoomSingleCardActions from "./helper/components/Actions/DormRoomSingleCardActions";
import DormRoomSingleCardSubTitle from "./helper/components/SubTitle/DormRoomSingleCardSubTitle";
import DormRoomSingleCardTitle from "./helper/components/Title/DormRoomSingleCardTitle";
import "./_dormRoomSingleCard.scss";

const DormRoomSingleCard = ({ data }: DormRoomSingleCardProps) => {
  return (
    <div className="dorm-room-single-card-container">
      <DormRoomSingleCardTitle
        title={data?.title}
        statusId={data?.recordStatus}
        statusTitle={data?.AssociationRecordStatus_title}
      />
      <DormRoomSingleCardSubTitle
        numberOfBeds={data?.NumberOfBeds}
        genderId={data?.AssociationFloor_AssociationBuilding_genderId}
        genderTitle={data?.AssociationFloor_AssociationBuilding_AssociationGender_title}
      />
      <DormRoomSingleCardActions
        numberOfBeds={data?.NumberOfBeds}
        id={data?.id}
        roomTitle={data?.title}
      />
    </div>
  );
};

export default DormRoomSingleCard;
