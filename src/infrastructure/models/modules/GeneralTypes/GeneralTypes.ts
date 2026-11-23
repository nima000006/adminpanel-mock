import StepIcon from "@rc-component/steps/lib/StepIcon";
import {
  ComponentType,
  RenderInfo,
  SemanticName,
  Status,
} from "@rc-component/steps/lib/Steps";
import { TabPaneProps } from "antd";

export type FixedType = "left" | "right" | boolean;

export type GeneralTableModelTypeWithSearch = {
  semester?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
};
export type NoUndefinedRangeValueType<DateType> = [
  start: DateType | null,
  end: DateType | null,
];

export interface Tab extends Omit<TabPaneProps, "tab"> {
  key: string;
  label: React.ReactNode;
}
export interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export type LocalStorageMetaType = {
  //!OLD
  // id?: number;
  // userName?: string;
  // firstName?: string;
  // lastName?: string;
  // mobile?: string;
  // businessId?: null;
  // residencyName?: null;
  // sexStatus?: string;
  // studentNumber?: string;
  // subgroupCode?: null;
  // subgroupName?: null;
  // uniqueId?: null;
  // levelName?: string;
  // levelCode?: string;
  // nationalCode?: string;
  // nationality?: string;
  // residencyCode?: null;
  // digitalCardQr?: null;
  // digitalCardSerialNumber?: string;
  // userPhoto?: null;
  // points?: null;
  // unitName?: string;
  // userRole?: null;
  // studentCardState?: null;
  // cardValidDate?: null;
  // receiveMethod?: null;
  // cardStatus?: null;
  // createDate?: string;
  // estelamAmoozesh?: boolean;
  // totalPassedUnits?: string;
  // fieldName?: string;
  // email?: null;
  // branchCode?: string;
  // enTerm?: null;
  // fatherName?: null;
  // fieldCode?: string;
  // healthStatus?: null;
  genderId: number;
  maritalStatusId: string;
  regionId: number;
  nationalCode: string;
  internationalCode: string;
  passportNumber: string;
  uniqueIdentifier: string;
  najaUniversalId: string;
  personalPhoto: string;
  firstName: string;
  enFirstName: string;
  middleName: string;
  lastName: string;
  enLastName: string;
  fatherName: string;
  birthDate: string;
  mobileNumber: string;
  email: string;
  mainImageMinioUrl: string;
  username: string;
  staff: {
    userResponseDto: {
      id: number;
      firstName: string;
      enFirstName: null;
      lastName: string;
      enLastName: string;
      username: string;
      mobileNumber: string;
      regionId: string;
      region: string;
      email: string;
      createdDateTime: string;
    };
    id: number;
    employeeCode: string;
    branchId: number;
    branchName: string;
    recordStatus: number;
    createdDateTime: string;
  };
};

export type GENERAL_RESPONSE<Data> = {
  msg: string;
  status: number;
  data: Data;
};

export type UPLOAD_FILE_GENERAL = {
  uid: string;
  lastModified: string;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
export interface StepsProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  rootClassName?: string;
  orientation?: "horizontal" | "vertical";
  titlePlacement?: "horizontal" | "vertical";
  /** Internal usage of antd. Do not deps on this. */
  components?: {
    root?: ComponentType;
    item?: ComponentType;
  };
  status?: Status;
  current?: number;
  initial?: number;
  items?: StepItem[];
  onChange?: (current: number) => void;
  iconRender?: (
    originNode: React.ReactElement,
    info: RenderInfo & {
      components: {
        Icon: typeof StepIcon;
      };
    }
  ) => React.ReactNode;
  itemRender?: (originNode: React.ReactElement, info: RenderInfo) => React.ReactNode;
  itemWrapperRender?: (originNode: React.ReactElement) => React.ReactNode;
}
export interface StepItem {
  className?: string;
  style?: React.CSSProperties;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  /** @deprecated Please use `content` instead */
  description?: React.ReactNode;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  status?: "wait" | "process" | "finish" | "error";
  disabled?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
}
