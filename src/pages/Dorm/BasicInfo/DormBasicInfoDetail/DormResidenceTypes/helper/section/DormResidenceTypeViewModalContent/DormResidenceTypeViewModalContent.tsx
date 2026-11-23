import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_dormResidenceTypeViewModalContent.scss";

const DormResidenceTypeViewModalContent = () => {
  return (
    <div className="dorm-residence-view-content-modal">
      <SingleVerticalItem
        label="نوع اقامتگاه"
        value={dataPlaceHolder({
          data: "ماک دیتا",
        })}
      />
      <SingleVerticalItem
        label="ارائه شده به شعبه‌های"
        value={dataPlaceHolder({
          data: "ماک دیتا",
        })}
      />
    </div>
  );
};
export default DormResidenceTypeViewModalContent;
