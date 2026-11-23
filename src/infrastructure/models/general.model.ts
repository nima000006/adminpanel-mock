import { ComponentProps } from "react";
import { JSX } from "react";

import { Breadcrumb } from "antd";
import { ColumnsType } from "antd/es/table";

/**
 * Breadcrumb items type - derived directly from Ant Design to ensure future version compatibility.
 * Using Ant Design's own type definition ensures we stay in sync with library updates.
 */
export type BreadcrumbItems = ComponentProps<typeof Breadcrumb>["items"];

type StudentTableTypes =
  | "ALL"
  | "READY_TO_PRINT"
  | "PRINT_SUCCESS"
  | "READY_TO_DELIVER"
  | "DELIVERED_TO_STUDENT"
  | "PACKET_GETTING_READY"
  | "READY_TO_POST"
  | "DELIVERED_TO_POST"
  | "DELIVERED_FINAL"
  | "RETURNED"
  | "LOST";

export type isActive = { isActive: boolean; activeColor?: string };
export type ReactChildren = { children: React.ReactNode };
export type LoginShape = { username: string; password: string };
export type ConsultingFilteredItem = { id: string; value: string };
export type ConsultingFilterProps = {
  setSelectedFilterList: React.Dispatch<React.SetStateAction<ConsultingFilteredItem[]>>;
  onSetCloseHandler: () => void;
  selectedFilterList: ConsultingFilteredItem[];
};
export type TConsultingMethodRenderer = {
  id: number;
  label: string;
  IconComponent: JSX.Element;
  backgroundColorClassName: string;
};
export type IconProps = { size?: string; color?: string };
export type HeroProps = { backgroundSvg: JSX.Element; banner: JSX.Element };
export type StudentCardProps = {
  fieldName: string;
  firstName: string;
  image: string;
  key: number;
  lastName: string;
  levelName: string;
  unitName: string;
  link: string | null;
  collegeCode: null;
  nationality: string;
  nationalCode: string | null;
  nationalNumber: string | null;
  requestDate: string;
  requestStatusDescription: any[];
  requestType: number;
  studentNumber: string;
  waitingTime: string | null;
  status: string;
  printCount?: string;

  //

  digitalCardSerialNumber: string;
  cardTypeDto: { id: number; name: string };
};
export type DataIndex = keyof StudentCardProps;
export type actionInfoButton = { id: number; name: string };
export type userData = {
  address: string;
  branchCode: string;
  cityId: number;
  cityName: string;
  createDate: null | string;
  countPrintCard: number;
  countConfirmDelivery: number;
  collegeCode: number;
  digitalCardQr: null;
  digitalCardSerialNumber: string;
  email: string;
  enTerm: string;
  fatherName: string;
  fieldCode: string;
  fieldName: string;
  firstName: string;
  healthStatus: string;
  id: number;
  key: number;
  image: string;
  lastName: string;
  levelName: string;
  mobile: string;
  nationalCode: string;
  nationality: string;
  password: null;
  paymentStatus: number;
  postalCode: null;
  provinceId: number;
  provinceName: string;
  requestStatus: { id: number; name: string };
  requestStatusDescription: [];
  residencyCode: null;
  residencyName: null;
  sexStatus: string;
  studentNumber: string;
  subgroupCode: string;
  subgroupName: string;
  type: number;
  uniqueId: null;
  userFlag: string;
  userId: number;
  username: string;
  unitName: string;
  actionsDtos: actionInfoButton[];
  //! newly added types
  requestType: number;
  status: string;
  levelCode: string;
  fieldOfStudyCode: number;
  degreeCode: number;
  groupCode: number;
  cardType: number;
  requestStatusId: number;
  invoiceNo: number;
  state: string;
};

export type ListOfCollegeData = { uniid: number; id: number; code: number; name: string };
export type TableSelectorProps = {
  tableType: StudentTableTypes;
  tableStatus: number;
  column: ColumnsType<any>[];
  modalData: number; // | undefiend
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetTableSelectorHookStates: () => void;
};
export type AdvancedFilterResponse = {
  status: number;
  msg: string;
  data: StudentCardProps[] | null;
};
export type RequestStatusByStudentCardId = {
  id: number;
  name: string;
  comment: null;
  requestDate: string;
};
export type GetAllRequestStatusByStudentCardIdResponse = {
  status: number;
  msg: string;
  data: RequestStatusByStudentCardId[];
};
export type rooomTypeProps = {
  allcapacity: number;
  bedcount: number;
  freecapacity: number;
  grade: string;
  id: number;
  key: number;
  name: string;
  price: string;
  timeType: string;
  type: string;
};
export type TicketListData = {
  id: number;
  title: string;
  imgname: string;
  createdate: string;
  time: null;
  status: number;
  servicename: string;
  typeOfProblem: string;
};
export type FinancialPaymentDTOS = {
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobileNo: string;
  unitName: string;
  serviceName: string;
  factorNo: string;
  factorCreateDate: string;
  amount: number;
  universityPercentage: number;
  universityReceive: number;
  paymentStatus: number;
  referenceNo: string;
  trackingNo: string;
  key: number;
  documentNumber: null;
  // desc: null;
  providerReceive: number;
};
type FileType = {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: { uid: string };
  error: { status: number; method: string; url: string };
  response: string;
  status: string;
  thumbUrl: string;
};
export type UploadFile = { file: FileType; fileList: FileType[] };

export type SelectType = {
  tenant_id: null;
  disabled?: boolean;
  id: number;
  title: string;
  createDate: string;
  desc?: string | null;
  lastModifiedDate?: string;
  number: string;
  date: string;
  attach?: null;
};
export type SINGLE_VALUE_TYPE<TYPE> = { value: TYPE };
