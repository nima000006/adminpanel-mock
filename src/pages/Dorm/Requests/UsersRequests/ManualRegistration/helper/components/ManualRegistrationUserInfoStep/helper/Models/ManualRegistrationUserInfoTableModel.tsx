import {
  firstName,
  lastName,
  genderName,
  studentNumber,
  nationalCode,
  branchName,
  levelName,
  fieldName,
} from "./utils/manualRegistrationUserTableInfoModel";
const ManualRegistrationUserInfoTableModel = () => {
  return [
    firstName,
    lastName,
    genderName,
    studentNumber,
    nationalCode,
    branchName,
    levelName,
    fieldName,
  ];
};

export default ManualRegistrationUserInfoTableModel;
