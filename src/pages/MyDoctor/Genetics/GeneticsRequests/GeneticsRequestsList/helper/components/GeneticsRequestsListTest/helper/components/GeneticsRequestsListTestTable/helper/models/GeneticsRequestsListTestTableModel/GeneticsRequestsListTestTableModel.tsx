import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MY_DOCTOR_GENETIC_PARTICIPATES_DETAIL_PAGE_ROUTE } from "@infra/router/routes/myDoctor";
import { myDoctorSurveyDetailFourthTabContentType } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/@types/@geneticsParticipantsDetailReviewStatus";
import { testStatusConfig } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/_shared/utils";

const GeneticsRequestsListTestTableModel =
  (): CustomColumnType<myDoctorSurveyDetailFourthTabContentType>[] => [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 70,
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
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کد ملی / فراگیر",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "createdDate",
      //   label: "تاریخ درخواست",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "YYYY/MM/DD, HH:mm",
        }),
    },
    {
      title: "شماره همراه",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: 130,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "mobileNumber",
      //   label: "شماره همراه",
      //   type: "text",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "وضعیت درخواست",
      dataIndex: "testStatus",
      key: "testStatus",
      width: 240,
      render: (_: unknown, record: myDoctorSurveyDetailFourthTabContentType) => {
        const statusTypeId = record?.testStatus?.statusTypeId;
        const statusConfig =
          statusTypeId !== undefined
            ? testStatusConfig[statusTypeId as keyof typeof testStatusConfig]
            : undefined;

        return record?.testStatus ? (
          <CustomTag className="w-fit" color={statusConfig?.color ?? "default"}>
            {record.testStatus?.title ?? "-"}
          </CustomTag>
        ) : (
          "-"
        );
      },
    },
    {
      title: "آزمایشگاه",
      dataIndex: "centerTitle",
      key: "centerTitle",
      width: 170,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "centerTitle",
      //   label: "آزمایشگاه",
      //   type: "text",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تست درخواست شده",
      dataIndex: "testTitle",
      key: "testTitle",
      width: 170,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "testTitle",
      //   label: "تست درخواست شده",
      //   type: "text",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ شرکت در آزمون",
      dataIndex: "surveyCycleCreatedDate",
      key: "surveyCycleCreatedDate",
      width: 170,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "surveyCycleCreatedDate",
      //   label: "تاریخ شرکت در آزمون",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
        }),
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
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "provinceTitle",
      //   label: "استان",
      //   type: "text",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "cityTitle",
      key: "cityTitle",
      width: 90,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "cityTitle",
      //   label: "شهر",
      //   type: "text",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 160,
      //todo[nima] uncomment when api will be implemented
      // ...GetServerColumnSearchProps({
      //   dataIndex: "modifiedDate",
      //   label: "آخرین تغییر وضعیت",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "YYYY/MM/DD, HH:mm",
        }),
    },
    {
      title: "آخرین مسئول رسیدگی",
      dataIndex: "surveyCycleModifiedByFirstName",
      key: "surveyCycleModifiedByFirstName",
      width: 170,
      render: (_: unknown, record: myDoctorSurveyDetailFourthTabContentType) => {
        const firstName = record?.surveyCycleModifiedByFirstName?.trim() || "";
        const lastName = record?.surveyCycleModifiedByLastName?.trim() || "";

        if (!firstName && !lastName) {
          return "-";
        }

        return `${firstName || "-"} ${lastName || "-"}`;
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      render: (_: unknown, record: myDoctorSurveyDetailFourthTabContentType) => (
        <CustomButton type="link">
          <Link
            to={{
              pathname: MY_DOCTOR_GENETIC_PARTICIPATES_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                segment: "review-status",
                tab: 2,
                id: record?.surveyCycleId,
                surveyId: record?.surveyId,
                from: "requester",
              }),
            }}
          >
            مشاهده
          </Link>
        </CustomButton>
      ),
    },
  ];

export default GeneticsRequestsListTestTableModel;
