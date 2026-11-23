import TicketAdminsChart from "./helper/TicketAdminsChart/TicketAdminsChart";
import TicketsAllocationChart from "./helper/TicketsAllocationChart/TicketsAllocationChart";
import TicketsPriorityChart from "./helper/TicketsPriorityChart/TicketsPriorityChart";

const TicketsHandlingManagementContent = () => {
  return (
    <div className="mt-10 grid h-full grid-cols-3 gap-6 max-[1300px]:grid-cols-1">
      {/* TICKET ADMINS*/}
      <TicketAdminsChart />

      {/* TICKETS PRIORITY */}
      <TicketsPriorityChart />

      {/* TICKETS ALLOCATION */}
      <TicketsAllocationChart />
    </div>
  );
};
export default TicketsHandlingManagementContent;
