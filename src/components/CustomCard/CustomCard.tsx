import MainSpinner from "../MainSpinner/MainSpinner";
import "./_customCard.scss";
const CustomCard = ({
  children,
  padding = "1rem",
  className,
  loading,
  isSkeleton = true,
}: {
  children: React.ReactNode;
  padding?: string;
  className?: string;
  loading?: boolean;
  isSkeleton?: boolean;
}) => {
  return (
    <div
      className={`custom-card-renderer-container ${className ? className : ""}`}
      style={{ padding: padding }}
    >
      {loading ? <MainSpinner height="20vh" isSkeleton={isSkeleton} /> : children}
    </div>
  );
};

export default CustomCard;
