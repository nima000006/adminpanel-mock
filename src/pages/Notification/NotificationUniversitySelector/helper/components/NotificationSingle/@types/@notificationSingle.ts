//! GENERAL
//! LAYOUT
export type NotificationItemsProps = {
  setIsTableShow: React.Dispatch<React.SetStateAction<boolean>>;
  isTableShow: boolean;
};
export type NotificationAdvanceFilterType = {
  university: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
};
export type NotificationSingleFormSubmitType = {
  title: string;
  message: string;
  messageRadio: string;
  codeTitleFirst: string;
  codeFirst: string;
  codeTitleSecond: string;
  codeSecond: string;
  codeTitleThird: string;
  codeThird: string;
};
export type NotificationUserInfoType = {
  nationalCode?: string;
  studentNumber?: string;
  phoneNumber?: string;
};

//! API
export type PostNotificationResponse = {
  status: number;
  msg: string;
  data: any;
};

export type PostNotificationRequest = {
  message: string;
  nationalNumber: string[];
  paramOneName: string;
  paramOneValue: string;
  paramThreeName: string;
  paramThreeValue: string;
  paramTwoName: string;
  paramTwoValue: string;
  serviceId: number;
  serviceName: string;
  title: string;
};
export type SingleUserInUserList = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  mobile: string;
  businessId: null;
  residencyName: null;
  sexStatus: "زن" | "مرد" | undefined;
  studentNumber: null;
  subgroupCode: null;
  subgroupName: null;
  uniqueId: null;
  levelName: null;
  levelCode: null;
  nationalCode: string;
  nationality: string;
  residencyCode: null;
  digitalCardQr: null;
  digitalCardSerialNumber: string;
  userPhoto: null;
  points: null;
  unitName: string;
  userRole: null;
  studentCardState: null;
  cardValidDate: null;
  receiveMethod: null;
  cardStatus: null;
  createDate: string;
  estelamAmoozesh: true;
  totalPassedUnits: null;
  fieldName: string;
  branchCode: string;
  email: null;
  enTerm: null;
  fatherName: null;
  fieldCode: null;
  healthStatus: null;
};
export type GetAllUserResponse = {
  status: number;
  msg: string;
  data: {
    userList: SingleUserInUserList[];
    totalElement: number;
    totalPage: number;
  };
};
export type GetAllUserByUserInfoRequest = {
  nationalCode?: string;
  pageNumber: number;
  pageSize: number;
  phoneNumber?: string;
  studentNumber?: string;
};
export type GetAllUserProps = {
  branchCode: string;
  fieldCode?: number;
  levelCode?: number;
  pageNumber: number;
  pageSize: number;
};
export type GetUserListResponse = {
  status: number;
  msg: string;
  data: {
    totalElement: number;
    totalUnseenElement: number;
    totalPage: number;
    currentDate: string;
    notificationDtos: [
      {
        id: number;
        message: string;
        userId: number;
        username: string;
        mobileNo: string;
        serviceId: number;
        serviceName: string;
        paramOneName: string;
        paramTwoName: string;
        paramThreeName: string;
        paramOneValue: string;
        paramTwoValue: string;
        paramThreeValue: string;
        title: string;
        branchCode: string;
        fieldName: string;
        levelName: string;
        firstName: string;
        lastName: string;
        unitName: string;
        nationalCode: string;
        createdDate: string;
        seen: boolean;
      },
    ];
  };
};
