import RoomAssignEducationalParams from "./RoomAssignEducationalParams/RoomAssignEducationalParams";
import RoomFeaturesCapsule from "./RoomFeatures/RoomFeaturesCapsule";
import RoomPaymentRules from "./RoomPaymentRules/RoomPaymentRules";
import "./_roomFeatureData.scss";

const RoomFeatureData = () => {
  return (
    <div className="room-feature-data-container">
      <div className="start-date-container">شروع از 02 / 02 / 1402</div>
      <RoomFeaturesCapsule />
      {/* //Todo[atefeh]: should get edited if it's needed in the feature */}
      {/* <RoomAssignToGroups /> */}
      <RoomAssignEducationalParams />
      <RoomPaymentRules />
    </div>
  );
};

export default RoomFeatureData;
