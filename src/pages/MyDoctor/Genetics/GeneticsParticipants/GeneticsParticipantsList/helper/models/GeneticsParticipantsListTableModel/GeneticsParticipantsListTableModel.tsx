import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils/index";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MY_DOCTOR_GENETIC_PARTICIPATES_DETAIL_PAGE_ROUTE } from "@infra/router/routes/myDoctor";
import { myDoctorSurveyAllAdvanceFilterContentType } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsList/@types/@geneticsParticipantsList";

const GeneticsParticipantsListTableModel =
  (): CustomColumnType<myDoctorSurveyAllAdvanceFilterContentType>[] => [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 90,
      ...GetServerColumnSearchProps({
        dataIndex: "firstName",
        label: "نام",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "نام خانوادگی",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کد ملی / فراگیر",
      dataIndex: "username",
      key: "username",
      width: 140,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کد ملی / فراگیر",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ شرکت در آزمون",
      dataIndex: "startDate",
      key: "startDate",
      width: 170,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "startDate",
      //   label: "تاریخ شرکت در آزمون",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({ data: value, isDate: true, customDateFormat: "YYYY/MM/DD" }),
    },
    {
      title: "وضعیت محور",
      dataIndex: "mainStatusDto",
      key: "mainStatusDto",
      width: 190,
      //todo[nima] remove figma will be updated
      // render: (value: GeneticType) => {
      //   const geneticType = geneticPersonalityTypeOptions.find(
      //     (item) => item.value === value
      //   );

      //   return geneticType ? (
      //     <CustomTag className="w-fit" color={geneticType.color}>
      //       {geneticType.title}
      //     </CustomTag>
      //   ) : (
      //     "-"
      //   );
      // },
      render: (value: string) =>
        value ? <CustomTag className="w-fit">{value}</CustomTag> : "-",
    },
    {
      title: "شماره همراه",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "mobileNumber",
        label: "شماره همراه",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    // it should be added to the  API
    {
      title: "سن",
      dataIndex: "age",
      key: "age",
      width: 80,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "age",
      //   label: "سن",
      //   type: "sort",
      // }),
      render: (value: number) => dataPlaceHolder({ data: value }),
    },
    {
      title: "مقطع تحصیلی",
      dataIndex: "levelName",
      key: "levelName",
      width: 190,
      ...GetServerColumnSearchProps({
        dataIndex: "levelName",
        label: "مقطع تحصیلی",
        type: "text",
      }),
      //todo[nima] remove figma will be updated
      // render: (value: Degree) => {
      //   const degree = educationLevelOptions.find((item) => item.value === value);

      //   return degree ? (
      //     <CustomTag className="w-fit" color={degree.color}>
      //       {degree.title}
      //     </CustomTag>
      //   ) : (
      //     "-"
      //   );
      // },
      render: (value: string) =>
        value ? <CustomTag className="w-fit">{value}</CustomTag> : "-",
    },
    {
      title: "رشته تحصیلی",
      dataIndex: "fieldName",
      key: "fieldName",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "fieldName",
        label: "رشته تحصیلی",
        type: "text",
      }),
      render: (value: string) =>
        value ? <CustomTag className="w-fit">{value}</CustomTag> : "-",
    },
    {
      title: "شعبه / واحد",
      dataIndex: "branchName",
      key: "branchName",
      width: 140,
      render: (value: string) =>
        value ? <CustomTag className="w-fit">{value}</CustomTag> : "-",
    },
    {
      title: "استان",
      dataIndex: "provinceTitle",
      key: "provinceTitle",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "cityTitle",
      key: "cityTitle",
      width: 90,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      render: (value: string, records: myDoctorSurveyAllAdvanceFilterContentType) => (
        <CustomButton type="link">
          <Link
            to={{
              pathname: MY_DOCTOR_GENETIC_PARTICIPATES_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({ id: value, surveyId: records?.surveyId }),
            }}
          >
            مشاهده
          </Link>
        </CustomButton>
      ),
    },
  ];

export default GeneticsParticipantsListTableModel;
