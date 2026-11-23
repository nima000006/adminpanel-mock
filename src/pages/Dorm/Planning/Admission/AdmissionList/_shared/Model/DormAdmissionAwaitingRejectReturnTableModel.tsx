import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  DORM_ADMISSIONS_DETAIL_AWAITING_REVIEW_PAGE_ROUTE,
  DORM_ADMISSIONS_DETAIL_REJECTED_PAGE_ROUTE,
  DORM_ADMISSIONS_DETAIL_RETURNED_PAGE_ROUTE,
} from "@infra/router/routes/dorm";

import {
  DORM_ADMISSION_LIST_AWAITING_REVIEW,
  DORM_ADMISSION_LIST_REJECTED,
  DORM_ADMISSION_LIST_RETURNED,
} from "../../../utils/AdmissionUtils";
import { AdmissionListData } from "../@types/@admissionListTab";

const DormAdmissionAwaitingRejectReturnTableModel = ({
  type,
  status,
}: {
  type: number;
  status: "AWAIT" | "REJECT" | "RETURN";
}) => {
  const STATUS_PAGE_MAP: Record<
    "AWAIT" | "REJECT" | "RETURN",
    { page: string; pageSize: string }
  > = {
    AWAIT: { page: "awaitingPage", pageSize: "awaitingPageSize" },
    REJECT: { page: "rejectPage", pageSize: "rejectPageSize" },
    RETURN: { page: "returnedPage", pageSize: "returnedPageSize" },
  };
  const { page, pageSize } = STATUS_PAGE_MAP[status];
  return [
    ...(type !== DORM_ADMISSION_LIST_REJECTED
      ? [
          {
            title: "انتظار",
            dataIndex: "createDate",
            key: "createDate",
            width: 100,
            ...GetServerColumnSearchProps({
              dataIndex: "createDate",
              label: "انتظار",
              type: "sort",
              pageName: page,
              pageSizeName: pageSize,
            }),
            render: (value: string) => <CustomTagWithDiffDays value={value} />,
          },
        ]
      : []),
    {
      title: "شماره درخواست",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "نوع درخواست",
      dataIndex: "requestTypeId",
      key: "requestTypeId",
      width: 150,
      render: (value: number) => {
        return (
          <div>
            {value === 5 ? (
              <CustomTag color="green">برنامه پذیرش جدید</CustomTag>
            ) : (
              <CustomTag color="red">غیر فعال کردن</CustomTag>
            )}
          </div>
        );
      },
    },
    {
      title: "عنوان برنامه پذیرش",
      dataIndex: "title",
      key: "title",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان برنامه پذیرش",
        type: "text",
        pageName: page,
        pageSizeName: pageSize,
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
      ...GetServerColumnSearchProps({
        dataIndex: "dormitory",
        label: "اقامتگاه",
        type: "text",
        pageName: page,
        pageSizeName: pageSize,
      }),
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
      title: "شعبه / واحد",
      dataIndex: "AssociationCategoryBranch_title",
      key: "AssociationCategoryBranch_title",
      width: 150,
    },
    {
      title: "نوع زمان‌بندی",
      dataIndex: "schedulingId",
      key: "schedulingId",
      width: 150,
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
      width: 175,
      ...GetServerColumnSearchProps({
        dataIndex: "appliedStartDate",
        label: "تاریخ شروع اعمال موثر",
        type: "sort",
        pageName: page,
        pageSizeName: pageSize,
      }),
      render: (value: string, records: AdmissionListData) => {
        return (
          <>
            {dataPlaceHolder({
              data: records?.appliedStartTime,
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
      width: 175,
      ...GetServerColumnSearchProps({
        dataIndex: "appliedEndDate",
        label: "تاریخ پایان اعمال موثر",
        type: "sort",
        pageName: page,
        pageSizeName: pageSize,
      }),
      render: (value: string, records: AdmissionListData) => {
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
      title: "تاریخ ثبت درخواست",
      dataIndex: "createDate",
      key: "createDate",
      width: 175,
      ...GetServerColumnSearchProps({
        dataIndex: "createDate",
        label: "تاریخ ثبت درخواست",
        type: "sort",
        pageName: page,
        pageSizeName: pageSize,
      }),
      render: (value: string, records: AdmissionListData) => {
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
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: number, records: AdmissionListData) => {
        return (
          <Link
            to={{
              pathname:
                type === DORM_ADMISSION_LIST_AWAITING_REVIEW
                  ? DORM_ADMISSIONS_DETAIL_AWAITING_REVIEW_PAGE_ROUTE
                  : type === DORM_ADMISSION_LIST_RETURNED
                    ? DORM_ADMISSIONS_DETAIL_RETURNED_PAGE_ROUTE
                    : DORM_ADMISSIONS_DETAIL_REJECTED_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                title: records?.title,
                priceListId: records?.priceListId,
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

export default DormAdmissionAwaitingRejectReturnTableModel;
