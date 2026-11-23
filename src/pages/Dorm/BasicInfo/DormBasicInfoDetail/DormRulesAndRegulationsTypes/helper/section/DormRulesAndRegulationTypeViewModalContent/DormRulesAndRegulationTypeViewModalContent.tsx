import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_dormRulesAndRegulationTypeViewModalContent.scss";

const DormRulesAndRegulationTypeViewModalContent = () => {
  return (
    <div className="dorm-rules-regulations-view-content-modal">
      <SingleVerticalItem
        label="عنوان نوع قوانین و مقررات"
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
export default DormRulesAndRegulationTypeViewModalContent;
