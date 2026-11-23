import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { AdmissionDetailEditableTimingInfoProps } from "./@types/@admissionDetailEditableTimingInfo";
import AdmissionDetailEditableTimingInfoTableModel from "./Models/AdmissionDetailEditableTimingInfoTableModel";
import "./_admissionDetailEditableTimingInfo.scss";

const AdmissionDetailEditableTimingInfo = ({
  dataSource,
  form,
}: AdmissionDetailEditableTimingInfoProps) => {
  return (
    <div className="admission-detail-editable-timing-info-container">
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        columns={AdmissionDetailEditableTimingInfoTableModel(form)}
        pagination={false}
        className="admission-detail-editable-timing-info-table"
        {...TABLE_PROPS(dataSource?.length)}
      />
    </div>
  );
};

export default AdmissionDetailEditableTimingInfo;
