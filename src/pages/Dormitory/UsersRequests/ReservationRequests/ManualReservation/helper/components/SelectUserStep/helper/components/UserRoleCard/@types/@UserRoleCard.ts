import {
  EmployeeRoleType,
  StudentRoleType,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/components/SelectUserStep/@types/@selectUserStep";

export type UserRoleCardProps = {
  role: StudentRoleType | EmployeeRoleType;
  variant: "student" | "employee";
};
