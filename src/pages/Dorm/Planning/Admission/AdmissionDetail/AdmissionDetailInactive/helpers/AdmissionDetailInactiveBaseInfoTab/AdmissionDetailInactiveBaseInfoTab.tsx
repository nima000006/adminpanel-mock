import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_ADMISSIONS_MODIFY_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { massageCreatorInactiveAlert } from "@pages/Dorm/Planning/Admission/utils/AdmissionUtils";

import { AdmissionDetailBaseInfo } from "../../../AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";
import AdmissionDetailBasicInfo from "../../../helpers/BasicInfo/AdmissionDetailBasicInfo";
import AdmissionDetailRegisterInfo from "../../../helpers/RegisterInfo/AdmissionDetailRegisterInfo";
import AdmissionDetailTimingInfo from "../../../helpers/TimingInfo/AdmissionDetailTimingInfo";
import { admissionDetailTableDataCreator } from "../../../utils/admissionDetailUtils";
import "./_admissionDetailInactiveBaseInfoTab.scss";

const AdmissionDetailInactiveBaseInfoTab = ({
  dataSource,
  loading,
}: {
  dataSource: AdmissionDetailBaseInfo | null;
  loading: boolean;
}) => {
  const {
    params: { id, title },
  } = useQueryParams<{ id: string; title: string }>();

  const navigate = useNavigate();

  //* ================================ Util Functions ================================

  const copyAdmissionHandler = () => {
    navigate({
      pathname: DORM_ADMISSIONS_MODIFY_PAGE_ROUTE,
      search: makeSearchParams({ id, title }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div className="admission-detail-inactive-basic-info-container" loading={loading}>
      <CustomAlert
        message={massageCreatorInactiveAlert(
          dataPlaceHolder({
            data: dataSource?.deactivationDate,
            isDate: true,
          })
        )}
        type="error"
        showIcon
      />
      <AdmissionDetailBasicInfo data={dataSource} />
      <AdmissionDetailTimingInfo
        dataSource={admissionDetailTableDataCreator(dataSource)}
      />
      <AdmissionDetailRegisterInfo
        registerDate={dataSource?.createDate}
        registerTime={dataSource?.createTime}
        creator={dataSource?.AssociationUserStaffNew?.AssociationCustomerUser}
      />
      <div className="copy-btn-container">
        <CustomButton type="primary" ghost onClick={copyAdmissionHandler}>
          کپی کردن برنامه پذیرش
        </CustomButton>
      </div>
    </Div>
  );
};

export default AdmissionDetailInactiveBaseInfoTab;
