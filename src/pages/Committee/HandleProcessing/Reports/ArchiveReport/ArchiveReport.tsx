import ArchiveReportTable from "./helper/components/ArchiveReportTable/ArchiveReportTable";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const ArchiveReport = () => {
  useTitle({ text: "آرشیو گزارشات" });
  return (
    <div>
      <ArchiveReportTable />
    </div>
  );
};
export default ArchiveReport;
