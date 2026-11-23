import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { AdmissionDetailTimingInfoProps } from "./@types/@admissionDetailTimingInfo";
import AdmissionDetailTimingInfoTableModel from "./Model/AdmissionDetailTimingInfoTableModel";
import "./_admissionDetailTimingInfo.scss";

const AdmissionDetailTimingInfo = ({ dataSource }: AdmissionDetailTimingInfoProps) => {
  return (
    <div className="admission-detail-timing-info-container">
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        columns={AdmissionDetailTimingInfoTableModel}
        pagination={false}
        className="admission-detail-active-list-table"
        {...TABLE_PROPS(dataSource?.length)}
      />
    </div>
  );
};

export default AdmissionDetailTimingInfo;
