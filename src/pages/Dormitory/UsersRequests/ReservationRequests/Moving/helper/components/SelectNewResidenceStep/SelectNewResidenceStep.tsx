import { SelectNewResidenceStepProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/@types/@selectNewResidenceStepTypes";
import SelectNewResidenceBedBase from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceBedBase/SelectNewResidenceBedBase";
import SelectNewResidenceBuildingBase from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceBuildingBase/SelectNewResidenceBuildingBase";
import SelectNewResidenceComparison from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceComparison/SelectNewResidenceComparison";
import SelectNewResidenceRoomBase from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceRoomBase/SelectNewResidenceRoomBase";
import {
  MOCK_COMPARISON_BY_BASE,
  MOCK_MOVE_NOTES,
  MOCK_SELECT_NEW_RESIDENCE_BASE,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/mock/selectNewResidenceMock";

const SelectNewResidenceStep = ({ form }: SelectNewResidenceStepProps) => {
  const base = MOCK_SELECT_NEW_RESIDENCE_BASE;
  const comparisonData = MOCK_COMPARISON_BY_BASE[base];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center">
        <SelectNewResidenceComparison
          base={base}
          current={comparisonData.current}
          alternative={comparisonData.alternative}
          moveNotes={MOCK_MOVE_NOTES}
        />
      </div>

      <div>
        {base === "bed" ? (
          <SelectNewResidenceBedBase form={form} />
        ) : base === "residence" ? (
          <SelectNewResidenceRoomBase form={form} />
        ) : base === "building" ? (
          <SelectNewResidenceBuildingBase form={form} />
        ) : null}
      </div>
    </div>
  );
};

export default SelectNewResidenceStep;
