import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { AllForeignDetailResponse } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/@types/@allForeignNationalsRegistrationDetailTypes";

const AllForeignNationalsRegistrationDetailRejected = ({
  data,
}: {
  data: AllForeignDetailResponse | null;
}) => {
  return (
    <div className="mt-10 mb-10">
      <CustomDivider text="علت رد درخواست" />
      <CustomAlert
        type="error"
        title={dataPlaceHolder({
          data: data?.rejectReason?.title,
        })}
        description={dataPlaceHolder({
          data: data?.rejectDescription,
        })}
      />
    </div>
  );
};
export default AllForeignNationalsRegistrationDetailRejected;
