import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import "./_rejectSessionModalContent.scss";

export const RejectSessionModalContent = () => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-appeal-accusation-case-return-to-session-modal-container"
    >
      <p>از عودت به آماده جلسه مطمئن هستید؟</p>
    </CustomCard>
  );
};
