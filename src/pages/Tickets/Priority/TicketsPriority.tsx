import TicketsPriorityTable from "./helper/components/TicketsPriority/TicketsPriority";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const TicketsPriority = () => {
  useTitle({ text: "الویت بندی تیکت ها" });

  return (
    <div style={{ width: "100%" }}>
      <TicketsPriorityTable />
    </div>
  );
};
export default TicketsPriority;
