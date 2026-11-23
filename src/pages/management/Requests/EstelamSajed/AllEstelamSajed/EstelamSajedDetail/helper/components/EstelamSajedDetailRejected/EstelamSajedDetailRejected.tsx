import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { EstelamSajedDetailResponse } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/@types/@estelamSajedDetailTypes";
import "./_estelamSajedDetailRejected.scss";

const EstelamSajedDetailRejected = ({
  data,
}: {
  data: EstelamSajedDetailResponse | null;
}) => {
  return (
    <div className="estelam-sajed-detail-rejected">
      <CustomDivider text="علت رد درخواست" />
      <CustomAlert type="error" description={data?.rejectReason?.title} />
    </div>
  );
};

export default EstelamSajedDetailRejected;
