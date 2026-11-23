import TicketsCountChart from "./helper/components/TicketsCountChart/TicketsCountChart";
import TicketsStatusChart from "./helper/components/TicketsStatusChart/TicketsStatusChart";

const OverviewContent = () => {
  return (
    <div className="mt-10 grid h-full grid-cols-2 gap-6 max-[1300px]:grid-cols-1">
      {/* TICKETS STATUS */}
      <TicketsStatusChart />
      {/* TICKETS COUNT  */}
      <TicketsCountChart />
    </div>
  );
};
export default OverviewContent;
