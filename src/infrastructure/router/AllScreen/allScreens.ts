import { BusinessScreens } from "../Screens/business";
import { CateringScreens } from "../Screens/catering";
import { CommitteeScreens } from "../Screens/committee";
import { ContractsScreens } from "../Screens/contracts";
import { BPMSDormScreens } from "../Screens/dorm";
import { DormitoryScreens } from "../Screens/dormitory";
import { FinanceScreens } from "../Screens/finance";
import { FinancialScreens } from "../Screens/financial";
import { FoodScreens } from "../Screens/food";
import { GeneralScreens } from "../Screens/general";
import { InsuranceScreens } from "../Screens/insurance";
import { InternationalScreens } from "../Screens/international";
import { ManagementScreens } from "../Screens/management";
import { MyDoctorScreens } from "../Screens/myDoctor";
import { NotificationScreens } from "../Screens/notification";
import { ModifyBusinessScreens } from "../Screens/organization";
import { ReportsScreens } from "../Screens/reports";
import { DormScreens } from "../Screens/room";
import { SettingScreens } from "../Screens/settings";
import { ShopScreens } from "../Screens/shop";
import { StudentScreens } from "../Screens/student";
import { TicketScreens } from "../Screens/ticket";
import { TicketingScreens } from "../Screens/ticketing";
import { topBarScreens } from "../Screens/topBarItem";
import { WalletScreens } from "../Screens/wallet";

export const allScreens = [
  ...StudentScreens,
  ...DormScreens,
  ...BPMSDormScreens,
  ...BusinessScreens,
  ...TicketScreens,
  ...GeneralScreens,
  ...FoodScreens,
  ...CateringScreens,
  ...FinancialScreens,
  ...CommitteeScreens,
  ...ReportsScreens,
  ...NotificationScreens,
  ...InsuranceScreens,
  ...SettingScreens,
  ...InternationalScreens,
  ...FinanceScreens,
  ...MyDoctorScreens,
  ...ManagementScreens,
  ...ModifyBusinessScreens,
  ...topBarScreens,
  ...WalletScreens,
  ...ContractsScreens,
  ...TicketingScreens,
  ...DormitoryScreens,
  ...ShopScreens,
];
