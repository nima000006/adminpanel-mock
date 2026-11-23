import useQueryParams from "@infra/hooks/useQueryParams";
import { CreateStepMode } from "@pages/Organization/Business/CreateBusiness/utils/createBusinessUtils";

import CreateBusinessPendingReview from "../CreateBusinessPendingReview/CreateBusinessPendingReview";
import CreateBusinessReject from "../CreateBusinessReject/CreateBusinessReject";
import CreateBusinessReturned from "../CreateBusinessReturned/CreateBusinessReturned";

const RequestStatusStep = () => {
  const {
    params: { requestStatus },
  } = useQueryParams();

  return (
    <div>
      {requestStatus === CreateStepMode?.process ? (
        <CreateBusinessPendingReview />
      ) : requestStatus === CreateStepMode?.reject ? (
        <CreateBusinessReject />
      ) : requestStatus === CreateStepMode?.returned ? (
        <CreateBusinessReturned />
      ) : null}
    </div>
  );
};
export default RequestStatusStep;
