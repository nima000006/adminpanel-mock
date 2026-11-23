import { Link } from "react-router";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_DETAIL_ROUTE,
  INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_MODIFY_ROUTE,
} from "@infra/router/routes/international";
import { INTERNATIONAL_ADMISSION_LIST_STATUS } from "@pages/International/BasicInfo/AdmissionProgram/utils/admissionProgramUtils";

import { InternationalAdmissionTableModelProps } from "./@types/@internationalAdmissionTableModel";
import {
  citizenshipStatusColor,
  internationalGenderStatusColor,
  internationalHasStatusColor,
  trainingStatusColor,
} from "./helper/utils";
import { InternationalAdmissionListContentType } from "../../../@types/@internationalAdmissionTab";

const InternationalAdmissionTableModel = ({
  activeInactiveHandler,
  isArchiveActive,
}: InternationalAdmissionTableModelProps) => {
  return [
    {
      title: "اطلاعات اولیه",
      children: [
        {
          title: "عنوان برنامه پذیرش",
          dataIndex: "ruleTitle",
          key: "ruleTitle",
          width: 180,
        },
        {
          title: "ترم تحصیلی",
          dataIndex: "semester",
          key: "semester",
          width: 170,
          render: (value: { title: string }) => {
            return <>{value?.title}</>;
          },
        },
        {
          title: "نوع اقامت",
          dataIndex: "citizenship",
          key: "citizenship",
          width: 130,
          render: (value: string, records: InternationalAdmissionListContentType) => {
            return (
              <CustomTag
                className="w-fit"
                color={citizenshipStatusColor[records?.citizenId]}
              >
                {value}
              </CustomTag>
            );
          },
        },
        {
          title: "نوع سیستم آموزشی",
          dataIndex: "trainingType",
          key: "trainingType",
          width: 180,
          render: (value: string, records: InternationalAdmissionListContentType) => {
            return (
              <CustomTag
                className="w-fit"
                color={trainingStatusColor[records?.trainingId]}
              >
                {value}
              </CustomTag>
            );
          },
        },
        // todo[Atefeh]: uncomment when api got ready
        // {
        //   title: "شیوه آموزش",
        //   dataIndex: "educationalWay",
        //   key: "educationalWay",
        //   width: 250,
        //   render: (value: string, records: InternationalAdmissionListContentType) => {
        //     return (
        //       <CustomTag
        //         className="w-fit"
        //         color={internationalEducationalWayColor[records?.educationalWayId || 0]}
        //       >
        //         {value}
        //       </CustomTag>
        //     );
        //   },
        // },
        {
          title: "جنسیت",
          dataIndex: "genderType",
          key: "genderType",
          width: 120,
          render: (value: string, records: InternationalAdmissionListContentType) => {
            return (
              <CustomTag
                className="w-fit"
                color={internationalGenderStatusColor[records?.genderId]}
              >
                {value}
              </CustomTag>
            );
          },
        },
        {
          title: "تعداد ملیت ها",
          dataIndex: "allRegions",
          key: "allRegions",
          width: 150,
          render: (value: boolean, records: InternationalAdmissionListContentType) => {
            return <>{value ? "همه" : records?.regions?.length}</>;
          },
        },
        {
          title: "تعداد رشته ‌ها",
          dataIndex: "requiredFields",
          key: "requiredFields",
          width: 150,
          render: (value: { id: number; title: string }[]) => {
            return <>{value?.length}</>;
          },
        },
      ],
    },
    {
      title: "نیازمندی و شرایط",
      children: [
        {
          title: "مصاحبه",
          dataIndex: "interview",
          key: "interview",
          width: 120,
          render: (value: boolean) => {
            return (
              <CustomTag
                className="w-fit"
                color={internationalHasStatusColor[`${value}`]}
              >
                {value ? "دارد" : "ندارد"}
              </CustomTag>
            );
          },
        },
        {
          title: "انگیزه‌نامه",
          dataIndex: "sop",
          key: "sop",
          width: 120,
          render: (value: boolean) => {
            return (
              <CustomTag
                className="w-fit"
                color={internationalHasStatusColor[`${value}`]}
              >
                {value ? "دارد" : "ندارد"}
              </CustomTag>
            );
          },
        },
        {
          title: "روزمه",
          dataIndex: "cv",
          key: "cv",
          width: 100,
          render: (value: string) => {
            return (
              <CustomTag
                className="w-fit"
                color={internationalHasStatusColor[`${value}`]}
              >
                {value ? "دارد" : "ندارد"}
              </CustomTag>
            );
          },
        },
        {
          title: "مدرک زبان فارسی",
          dataIndex: "faCertificate",
          key: "faCertificate",
          width: 160,
          render: (value: string) => {
            return (
              <CustomTag
                className="w-fit"
                color={internationalHasStatusColor[`${value}`]}
              >
                {value ? "دارد" : "ندارد"}
              </CustomTag>
            );
          },
        },
      ],
    },
    {
      title: "زمان بندی",
      children: [
        {
          title: "تاریخ و زمان شروع نمایش",
          dataIndex: "displayStartDate",
          key: "displayStartDate",
          width: 220,
          render: (value: string) => {
            return (
              <>
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </>
            );
          },
        },
        {
          title: "تاریخ و زمان پایان نمایش",
          dataIndex: "displayEndDate",
          key: "displayEndDate",
          width: 220,
          render: (value: string) => {
            return (
              <>
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </>
            );
          },
        },
        {
          title: "تاریخ و زمان شروع بررسی",
          dataIndex: "applicationStartDate",
          key: "applicationStartDate",
          width: 220,
          render: (value: string) => {
            return (
              <>
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </>
            );
          },
        },
        {
          title: "تاریخ و زمان پایان بررسی",
          dataIndex: "applicationEndDate",
          key: "applicationEndDate",
          width: 220,
          render: (value: string) => {
            return (
              <>
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </>
            );
          },
        },
        {
          title: "تاریخ و زمان شروع  پیش ثبت نام",
          dataIndex: "preRegistrationStartDate",
          key: "preRegistrationStartDate",
          width: 220,
          render: (value: string) => {
            return (
              <>
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </>
            );
          },
        },
        {
          title: "تاریخ و زمان پایان  پیش ثبت نام",
          dataIndex: "preRegistrationEndDate",
          key: "preRegistrationEndDate",
          width: 220,
          render: (value: string) => {
            return (
              <>
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </>
            );
          },
        },
        {
          title: "تاریخ و زمان شروع ثبت نام",
          dataIndex: "registrationStartDate",
          key: "registrationStartDate",
          width: 220,
          render: (value: string) => {
            return (
              <>
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </>
            );
          },
        },
        {
          title: "تاریخ و زمان پایان ثبت نام",
          dataIndex: "registrationEndDate",
          key: "registrationEndDate",
          width: 220,
          render: (value: string) => {
            return (
              <>
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </>
            );
          },
        },
      ],
    },
    ...(!isArchiveActive
      ? [
          {
            title: "وضعیت",
            fixed: "right" as FixedType,
            dataIndex: "recordStatus",
            key: "recordStatus",
            width: 110,
            render: (value: number, records: InternationalAdmissionListContentType) => {
              const isActive = value === +INTERNATIONAL_ADMISSION_LIST_STATUS.active; //2: active , 1: inactive
              return (
                <CustomSwitch
                  checked={isActive}
                  checkedChildren="فعال"
                  unCheckedChildren="غیرفعال"
                  valuePropName="activeMode"
                  onChange={() => activeInactiveHandler(isActive, records?.id)}
                />
              );
            },
          },
        ]
      : [{}]),
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <div className="action-btns-container">
            <Link
              to={{
                pathname: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_DETAIL_ROUTE,
                search: makeSearchParams({
                  id: value,
                }),
              }}
              className="text-link"
            >
              مشاهده
            </Link>
            {!isArchiveActive && (
              <Link
                to={{
                  pathname: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_MODIFY_ROUTE,
                  search: makeSearchParams({
                    copiedId: value,
                  }),
                }}
                className="text-link"
              >
                کپی برنامه
              </Link>
            )}
          </div>
        );
      },
    },
  ];
};

export default InternationalAdmissionTableModel;
