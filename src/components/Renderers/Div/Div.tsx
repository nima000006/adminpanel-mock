import MainSpinner from "../../MainSpinner/MainSpinner";
const Div = ({
  children,
  className,
  loading,
  customHeight = "20vh",
  isSkeleton = true,
}: {
  children: React.ReactNode;
  className?: string;
  customHeight?: string;
  loading?: boolean;
  isSkeleton?: boolean;
}) => {
  return (
    <div className={className && className}>
      {loading ? <MainSpinner height={customHeight} isSkeleton={isSkeleton} /> : children}
    </div>
  );
};

export default Div;
