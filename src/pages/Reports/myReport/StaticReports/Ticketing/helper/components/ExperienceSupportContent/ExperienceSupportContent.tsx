import AverageWaitingResponseChart from "./helper/AverageWaitingResponseChart/AverageWaitingResponseChart";
import UserSatisfactionChart from "./helper/UserSatisfactionChart/UserSatisfactionChart";

const ExperienceSupportContent = () => {
  return (
    <div className="mt-10 grid h-full grid-cols-2 gap-6 max-[800px]:grid-cols-1">
      {/* AVERAGE WAITING */}
      <AverageWaitingResponseChart />
      {/* USER SATISFACTION  */}
      <UserSatisfactionChart />
    </div>
  );
};
export default ExperienceSupportContent;
