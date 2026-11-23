import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { MyEstelamSajedDetailResponse } from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/@types/@myEstelamSajedDetailTypes";
import "./_myEstelamSajedDetailRejected.scss";

const MyEstelamSajedDetailRejected = ({
  data,
}: {
  data: MyEstelamSajedDetailResponse | null;
}) => {
  return (
    <div className="my-estelam-sajed-detail-rejected">
      <CustomDivider text="علت رد درخواست" />
      <CustomAlert
        type="error"
        description={dataPlaceHolder({ data: data?.rejectReasonDescription })}
        title={dataPlaceHolder({ data: data?.rejectReason?.title })}
      />
    </div>
  );
};

export default MyEstelamSajedDetailRejected;
