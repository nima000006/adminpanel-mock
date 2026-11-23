import LeaveRequestTable from "../../../../components/RoomComponents/Timing/LeaveRequestTable/LeaveRequestTable";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const LeaveRequest = () => {
  useTitle({ text: "درخواست مرخصی" });
  return (
    <div style={{ width: "100%" }}>
      <LeaveRequestTable />
    </div>
  );
};
export default LeaveRequest;
