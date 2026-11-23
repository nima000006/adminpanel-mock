import { InterviewCardProps } from "./@types/@nterviewCard";

const InterviewCard = ({
  title,
  Icon,
  count,
  countTitle,
  active,
  clickHandler,
}: InterviewCardProps) => {
  return (
    <div className="requests-demand-card-container" onClick={clickHandler}>
      <div
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg p-3! ${active ? "border-primary-7 bg-primary-1 border" : "border-neutral-4 bg-neutral-1 border"}`}
      >
        {Icon ? <Icon fill={active ? "#096DD9" : "#8C8C8C"} /> : null}
        <h5
          className={`font-[DanaFaNum] ${active ? "text-primary-7" : "text-neutral-7"}`}
        >
          {title}
        </h5>
        {count ? (
          <div
            className={`font-[DanaFaNum] ${active ? "text-primary-7" : "text-neutral-7"}`}
          >
            ( {countTitle} )
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InterviewCard;
