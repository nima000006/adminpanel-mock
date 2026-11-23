import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { InternationalAdmissionDetailFieldsInfoType } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/@types/@admissionProgramDetailFields";
import AdmissionProgramDetailFieldsTableModel from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/helper/models/AdmissionProgramDetailFields/AdmissionProgramDetailFieldsTableModel";
import "./_admissionDeleteDrawerStepConfirmSelectedList.scss";

const AdmissionDeleteDrawerStepConfirmSelectedList = ({
  dataSource,
}: {
  dataSource: InternationalAdmissionDetailFieldsInfoType[];
}) => {
  return (
    <div className="admission-delete-drawer-step-confirm-selected-list-container">
      <CustomAlert
        message="توجه"
        description="رشته مقطع واحدهای موجود در لیست زیر از برنامه پذیرش حذف خواهد شد."
        showIcon
        type="warning"
      />
      <CustomTable
        dataSource={dataSource}
        columns={AdmissionProgramDetailFieldsTableModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        rowKey="branchFieldId"
        className="international-admission-table"
      />
    </div>
  );
};

export default AdmissionDeleteDrawerStepConfirmSelectedList;
