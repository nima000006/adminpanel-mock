import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_myRoleRequestDetailRejected.scss";

const MyRoleRequestDetailRejected = ({
  description,
  title,
}: {
  description: string | undefined;
  title: string | undefined;
}) => {
  return (
    <div className="all-role-request-detail-rejected">
      <CustomDivider text="علت رد درخواست" />
      <CustomAlert
        type="error"
        title={dataPlaceHolder({ data: title })}
        description={dataPlaceHolder({ data: description })}
      />
    </div>
  );
};

export default MyRoleRequestDetailRejected;
