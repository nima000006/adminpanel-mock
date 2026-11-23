import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_estelamAmozeshyarDetailRejected.scss";

const EstelamAmozeshyarDetailRejected = ({
  reason,
  rejectReasonDescription,
}: {
  reason:
    | {
        id: number;
        name: string;
        title: string;
      }
    | undefined;
  rejectReasonDescription?: string | undefined;
}) => {
  return (
    <div className="estelam-amozeshyar-detail-rejected">
      <CustomDivider text="علت رد درخواست" />
      <CustomAlert
        type="error"
        title={dataPlaceHolder({ data: reason?.title })}
        description={dataPlaceHolder({ data: rejectReasonDescription })}
      />
    </div>
  );
};

export default EstelamAmozeshyarDetailRejected;
