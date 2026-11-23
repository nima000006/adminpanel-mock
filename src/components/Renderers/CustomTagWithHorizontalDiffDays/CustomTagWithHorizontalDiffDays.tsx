import moment from "jalali-moment";
import "./_customTagWithHorizontalDiffDays.scss";

const CustomTagWithHorizontalDiffDays = ({ value }: { value: string }) => {
  const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
    moment(value ?? new Date()),
    "days"
  );

  const colorGenerator =
    +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";
  return (
    <div className="custom-tag-with-horizontal-diff-days-container">
      <div className={`waiting-time ${colorGenerator}`}>
        <span>{diffTime}</span>
        <span>روز</span>
      </div>
    </div>
  );
};

export default CustomTagWithHorizontalDiffDays;
