import { PiArrowLeft } from "react-icons/pi";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import { MyReportStatCardProps } from "./@types/MyReportStatCardProps";

const MyReportStatCard = ({
  icon,
  title,
  information,
  bgColor,
  link,
}: MyReportStatCardProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <CustomCard className="general-report-card-container items-center">
      {/* Icon */}

      {icon ? (
        <div
          className={`m-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-xl text-white ${bgColor}`}
        >
          {icon}
        </div>
      ) : null}

      {/* Title */}
      <h3 className="dark:text-neutral-1! text-xl font-bold">{title}</h3>
      {/* description */}
      {information ? information : null}
      {/* Link button */}
      <Link className="w-full" to={link}>
        <CustomButton type="default">
          <PiArrowLeft />
        </CustomButton>
      </Link>
    </CustomCard>
  );
};

export default MyReportStatCard;
