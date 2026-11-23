import { DormBedSingleCardProps } from "./@types/@dormBedSingleCard";
import DormBedSingleCardActions from "./helper/components/Actions/DormBedSingleCardActions";
import DormBedSingleCardSubTitle from "./helper/components/SubTitle/DormBedSingleCardSubTitle";
import DormBedSingleCardTitle from "./helper/components/Title/DormBedSingleCardTitle";
import "./_dormBedSingleCard.scss";

const DormBedSingleCard = ({ data }: DormBedSingleCardProps) => {
  return (
    <div className="dorm-bed-single-card-container">
      <DormBedSingleCardTitle
        title={data?.title}
        statusId={data?.recordStatus}
        statusTitle={data?.AssociationCategoryRecordStatus_title}
      />
      <DormBedSingleCardSubTitle
        bedNumber={data?.bedNumber}
        bedType={data?.AssociationCategoryBedType_title}
        bedRate={data?.qualityId}
      />
      <DormBedSingleCardActions id={data?.id} />
    </div>
  );
};

export default DormBedSingleCard;
