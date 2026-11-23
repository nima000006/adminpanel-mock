import { DormBuildingSingleCardProps } from "./@types/@dormBuildingSingleCard";
import DormBuildingSingleCardActions from "./helper/components/Actions/DormBuildingSingleCardActions";
import DormBuildingSingleCardSubTitle from "./helper/components/SubTitle/DormBuildingSingleCardSubTitle";
import DormBuildingSingleCardTitle from "./helper/components/Title/DormBuildingSingleCardTitle";
import "./_dormBuildingSingleCard.scss";

const DormBuildingSingleCard = ({ data }: DormBuildingSingleCardProps) => {
  return (
    <div className="dorm-building-single-card-container">
      <DormBuildingSingleCardTitle
        title={data?.title}
        statusId={data?.recordStatus}
        statusTitle={data?.AssociationActiveStatus_title}
      />
      <DormBuildingSingleCardSubTitle
        NumberOfFloors={data?.NumberOfFloors}
        genderId={data?.genderId}
        genderTitle={data?.AssociationGender_title}
      />
      <DormBuildingSingleCardActions
        buildingTitle={data?.title}
        NumberOfFloors={data?.NumberOfFloors}
        id={data?.id}
        genderTitle={data?.AssociationGender_title}
        genderId={data?.genderId}
      />
    </div>
  );
};

export default DormBuildingSingleCard;
