import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_DETAIL_ROUTE } from "@infra/router/routes/international";

import {
  internationalGenderStatusColor,
  internationalHasStatusColor,
  residenceStatusColor,
  trainingStatusColor,
  trainingTypeStatusColor,
} from "./helper/utils";
import { AllCoursesByAdvanceFilterTypes } from "../../../@types/@internationalHasAdmissionFieldsTab";

const InternationalHasAdmissionFieldTableModel = () => {
  return [
    {
      title: "اطلاعات اولیه",
      children: [
        { title: "رشته", dataIndex: "filedTitle", key: "filedTitle", width: 100 },
        {
          title: "مقطع",
          dataIndex: "degreeTitle",
          key: "degreeTitle",
          width: 160,
          render: (value: string) => {
            return <CustomTag className="w-fit">{value}</CustomTag>;
          },
        },
        { title: "واحد", dataIndex: "branchTitle", key: "branchTitle", width: 100 },
        { title: "برنامه پذیرش", dataIndex: "ruleTitle", key: "ruleTitle", width: 170 },
        {
          title: "ترم تحصیلی",
          dataIndex: "semesterTitle",
          key: "semesterTitle",
          width: 170,
        },
        {
          title: "نوع اقامت",
          dataIndex: "residenceTitle",
          key: "residenceTitle",
          width: 130,
          render: (value: string, records: AllCoursesByAdvanceFilterTypes) => {
            return (
              <CustomTag
                className="w-fit"
                color={residenceStatusColor[records?.residenceId]}
              >
                {value}
              </CustomTag>
            );
          },
        },
        {
          title: "نوع سیستم آموزشی",
          dataIndex: "trainingTitle",
          key: "trainingTitle",
          width: 180,
          render: (value: string, records: AllCoursesByAdvanceFilterTypes) => {
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
        {
          title: "شیوه آموزش",
          dataIndex: "trainingTypeTitle",
          key: "trainingTypeTitle",
          width: 140,
          render: (value: string, records: AllCoursesByAdvanceFilterTypes) => {
            return (
              <CustomTag
                className="w-fit"
                color={trainingTypeStatusColor[records?.trainingTypeId]}
              >
                {value}
              </CustomTag>
            );
          },
        },
        {
          title: "جنسیت",
          dataIndex: "genderTypeTitle",
          key: "genderTypeTitle",
          width: 120,
          render: (value: string, records: AllCoursesByAdvanceFilterTypes) => {
            return (
              <CustomTag
                className="w-fit"
                color={internationalGenderStatusColor[records?.genderTypeId]}
              >
                {value}
              </CustomTag>
            );
          },
        },
        {
          title: "تعداد ملیت ها",
          dataIndex: "regionsCount",
          key: "regionsCount",
          width: 150,
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
          dataIndex: "farsiProficiency",
          key: "farsiProficiency",
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
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (_: number, records: AllCoursesByAdvanceFilterTypes) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_DETAIL_ROUTE,
              search: makeSearchParams({
                id: records?.ruleId,
              }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};

export default InternationalHasAdmissionFieldTableModel;
