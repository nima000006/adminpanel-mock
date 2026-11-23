import TicketsByProblemChart from "./helper/TicketsByProblemChart/TicketsByProblemChart";
import TicketsByServiceChart from "./helper/TicketsByServiceChart/TicketsByServiceChart";
import TicketsByTypeChart from "./helper/TicketsByTypeChart/TicketsByTypeChart";

const TicketsTemplateContent = () => {
  return (
    <div className="mt-10 grid h-full grid-cols-3 gap-6 max-[1300px]:grid-cols-1">
      {/* TICKET BY SERVICE */}
      <TicketsByServiceChart />

      {/* TICKET BY PROBLEM  */}
      <TicketsByProblemChart />

      {/* TICKETS BY TYPE */}
      <TicketsByTypeChart />
    </div>
  );
};
export default TicketsTemplateContent;
