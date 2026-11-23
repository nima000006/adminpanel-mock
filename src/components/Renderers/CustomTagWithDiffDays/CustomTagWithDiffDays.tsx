import moment from "jalali-moment";
import "./_customTagWithDiffDays.scss";

const CustomTagWithDiffDays = ({ value }: { value: string }) => {
  const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
    moment(value ?? new Date()),
    "days"
  );

  const colorGenerator =
    +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";
  return (
    <div className="custom-tag-with-diff-days-container flex- flex-col gap-2">
      <span
        className={`flex h-4.5 w-9 items-center justify-center rounded-[10px] ${colorGenerator}`}
      >
        {diffTime}
      </span>
      <span>روز</span>
    </div>
  );
};

export default CustomTagWithDiffDays;
