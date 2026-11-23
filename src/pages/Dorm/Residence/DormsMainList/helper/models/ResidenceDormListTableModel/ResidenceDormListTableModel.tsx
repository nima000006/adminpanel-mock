import { Link } from "react-router";

import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import {
  DORM_LIST_DETAIL_PAGE_ROUTE,
  DORM_MODIFY_RESIDENCE_PAGE_ROUTE,
} from "@infra/router/routes/dorm";
import { CARD_TYPE } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/utils/DormMainDetailUtils";

import { getDormType } from "../../../@types/@dormsMainList";
import {
  city,
  creator,
  editor,
  gender,
  presentStatus,
  province,
  quality,
  residenceId,
  residenceType,
  TableModelId,
  unit,
} from "../../../utils/residenceListTableModel";

import "./_residenceDormListTableModel.scss";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";

const ResidenceDormListTableModel = () => {
  return [
    {
      title: "نام اقامتگاه",
      dataIndex: "title",
      key: "title",
      width: 270,
      ...GetServerColumnSearchProps({
        dataIndex: "dormitory",
        label: "نام اقامتگاه",
        type: "text",
      }),
    },
    residenceType,
    province,
    city,
    unit,
    {
      title: "ظرفیت اسمی",
      dataIndex: "nominalCapacity",
      key: "nominalCapacity",
      width: 120,
      ...GetServerColumnSearchProps({
        dataIndex: "nominalCapacity",
        label: "ظرفیت اسمی",
        type: "sort",
      }),
    },
    {
      title: "ظرفیت قابل رزرو",
      dataIndex: "OpenBed",
      key: "OpenBed",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "OpenBed",
        label: "ظرفیت قابل رزرو",
        type: "sort",
      }),
    },
    {
      title: "ضریب اشغال",
      dataIndex: "percentFull",
      key: "percentFull",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "percentFull",
        label: "ضریب اشغال",
        type: "sort",
      }),
      render: (value: number) => {
        return value != null ? (
          <CustomTag
            color={`${value < 20 ? "#389E0D" : value >= 20 ? "#FA8C16" : "#CF1322"}`}
          >
            {value} %
          </CustomTag>
        ) : (
          <CustomTag>-</CustomTag>
        );
      },
    },
    residenceId,
    quality,
    gender,
    presentStatus,
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "updateDate",
      key: "updateDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "updateDate",
        label: "تاریخ آخرین ویرایش",
        type: "sort",
      }),
      render: (value: string, records: getDormType) => {
        return (
          <>
            {dataPlaceHolder({
              data: records?.updateTime,
              isTime: true,
            })}{" "}
            ,
            {dataPlaceHolder({
              data: value,
              isDate: true,
            })}
          </>
        );
      },
    },
    editor,
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "createDate",
        label: "تاریخ ایجاد",
        type: "sort",
      }),
      render: (value: string, records: getDormType) => {
        return (
          <>
            {dataPlaceHolder({
              data: records?.createTime,
              isTime: true,
            })}{" "}
            ,
            {dataPlaceHolder({
              data: value,
              isDate: true,
            })}
          </>
        );
      },
    },
    creator,
    {
      ...TableModelId,
      render: (value: number, record: getDormType) => {
        return (
          <div className="residence-dorm-list-table-container">
            <Link
              to={{
                pathname: DORM_LIST_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: value,
                  title: record?.title, // نام اقامتگاه
                  mode: CARD_TYPE?.building,
                  type: record?.AssociationAccommodationType_title, //نوع اقامتگاه
                  capacity: record?.nominalCapacity, // ظرفیت اسمی
                  statusTitle: record?.AssociationRecordStatus_title, // وضعیت نمایش
                  statusId: record?.recordStatus,
                  statusBtn: record?.statusId,
                  genderId: record?.genderId, // آیدی جنسیت
                  genderTitle: record?.AssociationGender_title, // عنوان جنسیت
                  qualityTitle: record?.AssociationQuality_title, // عنوان درجه کیفی
                }),
              }}
              className="text-link"
            >
              مشاهده
            </Link>
            <Link
              className="text-link"
              to={{
                pathname: DORM_MODIFY_RESIDENCE_PAGE_ROUTE,
                search: makeSearchParams({
                  id: value,
                  title: record?.title,
                  status: record?.statusId,
                }),
              }}
            >
              ویرایش
            </Link>
          </div>
        );
      },
    },
  ];
};

export default ResidenceDormListTableModel;
