import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { getTariffAdmissionScheduleTabData } from "../../../TariffDetailActiveTab/helpers/AdmissionScheduleTab/@types/@admissionScheduleTab";

const InActiveAdmissionScheduleTableModel = () => {
  return [
    {
      title: "عنوان برنامه پذیرش",
      dataIndex: "title",
      key: "title",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "name",
        label: "نام",
        type: "text",
      }),
    },
    {
      title: "شناسه",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "اقامتگاه",
      dataIndex: "AssociationDormitory_title",
      key: "AssociationDormitory_title",
      width: 150,
    },
    {
      title: "استان",
      dataIndex:
        "AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
      key: "AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
      width: 150,
    },
    {
      title: "شهر",
      dataIndex: "AssociationCategoryBranch_AssociationCategoryRegion_title",
      key: "AssociationCategoryBranch_AssociationCategoryRegion_title",
      width: 150,
    },
    {
      title: "شعبه / واحد ",
      dataIndex: "AssociationCategoryBranch_title",
      key: "AssociationCategoryBranch_title",
      width: 150,
    },
    {
      title: "نوع زمان‌بندی",
      dataIndex: "schedulingId",
      key: "schedulingId",
      width: 100,
      render: (value: number) => {
        return (
          <div>
            {value === 1 ? (
              <CustomTag color="blue">ترمیک</CustomTag>
            ) : value === 2 ? (
              <CustomTag color="green">ماهانه</CustomTag>
            ) : (
              <CustomTag color="yellow">روزانه</CustomTag>
            )}
          </div>
        );
      },
    },
    {
      title: "نوع رزرو",
      dataIndex: "reservationTypeId",
      key: "reservationTypeId",
      width: 150,
      render: (value: number) => {
        return (
          <div>
            {value === 1 ? (
              <CustomTag color="red">رزرو خوابگاه</CustomTag>
            ) : value === 2 ? (
              <CustomTag color="green">رزرو قطعی اتاق</CustomTag>
            ) : (
              <CustomTag color="orange">رزرو غیر قطعی اتاق</CustomTag>
            )}
          </div>
        );
      },
    },
    {
      title: "نوع مدیریت",
      dataIndex: "managementTypeId",
      key: "managementTypeId",
      width: 150,
      render: (value: number) => {
        return (
          <div>
            {value === 1 ? (
              <CustomTag color="green">دانشگاهی</CustomTag>
            ) : value === 2 ? (
              <CustomTag color="blue">خودگردان</CustomTag>
            ) : value === 3 ? (
              <CustomTag color="yellow">آزاد</CustomTag>
            ) : value === 4 ? (
              <CustomTag color="red">اجاره ای</CustomTag>
            ) : null}
          </div>
        );
      },
    },
    {
      title: "تاریخ شروع اعمال موثر",
      dataIndex: "appliedStartDate",
      key: "appliedStartDate",
      width: 150,
      render: (value: string, records: getTariffAdmissionScheduleTabData) => {
        return (
          <>
            {dataPlaceHolder({
              data: records?.appliedStartDate,
              isTime: true,
            })}
            {" , "}
            {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
    },
    {
      title: "تاریخ پایان اعمال موثر",
      dataIndex: "appliedEndDate",
      key: "appliedEndDate",
      width: 150,
      render: (value: string, records: getTariffAdmissionScheduleTabData) => {
        return (
          <>
            {dataPlaceHolder({
              data: records?.appliedEndTime,
              isTime: true,
            })}
            {" , "} {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "createDate",
      key: "createDate",
      width: 150,
      render: (value: string, records: getTariffAdmissionScheduleTabData) => {
        return (
          <>
            {dataPlaceHolder({
              data: records?.createTime,
              isTime: true,
            })}
            {" , "} {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
    },
    {
      title: "وضعیت",
      dataIndex: "statusId",
      id: "statusId",
      width: 120,
      render: (value: number, records: getTariffAdmissionScheduleTabData) => {
        return (
          <>
            {records?.AssociationRecordStatus_title ? (
              <CustomTag color={value === 2 ? "green" : "red"}>
                {records?.AssociationRecordStatus_title}
              </CustomTag>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
  ];
};

export default InActiveAdmissionScheduleTableModel;
