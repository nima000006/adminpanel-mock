import { StatisticTabCardProps } from "./@types/@statisticTabCard";

const StatisticTabCard = ({ active, title, icon, onClick }: StatisticTabCardProps) => {
  return (
    <div
      className={`h5-regular flex cursor-pointer items-center gap-2 rounded-lg border p-3! ${
        active
          ? "bg-primary-1 border-primary-7 text-primary-7!"
          : "border-[#8C8C8C] bg-inherit text-[#8C8C8C]"
      }`}
      onClick={onClick}
    >
      {icon}

      <span
        className="block truncate"
        title={title} // 👈 full title on hover
      >
        {title}
      </span>
    </div>
  );
};

export default StatisticTabCard;
