import { Link } from "react-router";

import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { DORM_REQUESTS_LIST_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { getDormType } from "../../../@types/@dormsMainList";
import {
  city,
  creator,
  editor,
  gender,
  province,
  requestNum,
  requestStatus,
  requestType,
  residenceType,
  TableModelId,
  unit,
} from "../../../utils/residenceListTableModel";

const ResidenceRequestListTableModel = () => {
  return [
    requestNum,
    requestType,
    requestStatus,
    {
      title: "نام اقامتگاه",
      dataIndex: "title",
      key: "title",
      width: 270,
      ...GetServerColumnSearchProps({
        dataIndex: "dormitory",
        label: "نام اقامتگاه",
        type: "text",
        pageName: "requestPage",
        pageSizeName: "requestPageSize",
      }),
    },
    residenceType,
    province,
    city,
    unit,
    gender,
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "updateDate",
      key: "updateDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "updateDate",
        label: "تاریخ آخرین ویرایش",
        type: "sort",
        pageName: "requestPage",
        pageSizeName: "requestPageSize",
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
        pageName: "requestPage",
        pageSizeName: "requestPageSize",
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
          <Link
            to={{
              pathname: DORM_REQUESTS_LIST_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                statusId: record?.statusId,
                requestTypeId: record?.requestTypeId,
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

export default ResidenceRequestListTableModel;
