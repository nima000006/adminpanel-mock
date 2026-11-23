import {
  titleColumn,
  startDateColumn,
  startTimeColumn,
  endDateColumn,
  endTimeColumn,
} from "./utils/AdmissionProgramBasicTableModel";

const AdmissionProgramBasicInfoTableModel = () => {
  return [titleColumn, startDateColumn, startTimeColumn, endDateColumn, endTimeColumn];
};

export default AdmissionProgramBasicInfoTableModel;
