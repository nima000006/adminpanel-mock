import ArchiveAnnualReportsTable from "./helper/coponents/ArchiveAnnualReports/ArchiveAnnualReportsTable";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const ArchiveReport = () => {
  const year = new URLSearchParams(location.search).get("year");

  useTitle({ text: ` آرشیو گزارشات ${year}` });
  return (
    <div>
      <ArchiveAnnualReportsTable />
    </div>
  );
};
export default ArchiveReport;
