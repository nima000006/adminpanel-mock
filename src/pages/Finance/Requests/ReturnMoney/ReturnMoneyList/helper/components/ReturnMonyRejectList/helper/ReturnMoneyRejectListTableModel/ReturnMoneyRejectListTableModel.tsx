import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_REQUESTS_RETURN_MONEY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { REQUEST_DEMAND_IDS } from "@pages/Finance/Requests/_shared/utils";
import { RefundRequestListAndAdvanceFilterContent } from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyList/@types/@returnMoneyList";
const ReturnMoneyRejectListTableModel =
  (): CustomColumnType<RefundRequestListAndAdvanceFilterContent>[] => {
    return [
      {
        title: "تاریخ و زمان رد درخواست",
        dataIndex: "modifiedDate",
        key: "modifiedDate",
        width: 180,
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm, YYYY-MM-DD ",
          });
        },
      },
      {
        title: "شماره درخواست",
        dataIndex: "id",
        key: "id",
        width: 140,
      },
      {
        title: "مبلغ عودت وجه",
        dataIndex: "amount",
        key: "amount",
        width: 130,
        render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
          return (
            dataPlaceHolder({
              data: records?.amount.amount?.toString(),
              isPrice: true,
              isRial: true,
            }) + " تومان"
          );
        },
      },
      {
        title: "سرویس",
        dataIndex: "samimService",
        key: "samimService",
        width: 150,
        render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
          return <SamimServiceTag service={records?.transaction?.samimService} />;
        },
      },
      {
        title: "گروه کاربری",
        dataIndex: "userGroup",
        key: "userGroup",
        width: 150,
        render: (_: number, records: RefundRequestListAndAdvanceFilterContent) => {
          return (
            <CustomTag
              className="w-fit"
              color={
                records?.transaction?.userStaffType === "STUDENT"
                  ? "blue"
                  : records?.transaction?.userStaffType === "EMPLOYEE"
                    ? "volcano"
                    : "default"
              }
            >
              {records?.transaction?.userStaffType === "STUDENT"
                ? "دانشجو"
                : records?.transaction?.userStaffType === "EMPLOYEE"
                  ? "کارمند"
                  : "ادمین"}
            </CustomTag>
          );
        },
      },
      {
        title: "نام ",
        dataIndex: "firstName",
        key: "firstName",
        width: 130,
        render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
          return dataPlaceHolder({
            data: records?.transaction?.firstName,
          });
        },
      },
      {
        title: "نام خانوادگی",
        dataIndex: "lastName",
        key: "lastName",
        width: 130,
        render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
          return dataPlaceHolder({
            data: records?.transaction?.lastName,
          });
        },
      },
      {
        title: "کد ملی / کد فراگیر",
        dataIndex: "username",
        key: "username",
        width: 170,
        ...GetServerColumnSearchProps({
          dataIndex: "username",
          label: "کد ملی / کد فراگیر",
          type: "text",
        }),
      },
      {
        title: "شماره دانشجویی / پرسنلی",
        dataIndex: "personalCode",
        key: "personalCode",
        width: 170,
        render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
          return dataPlaceHolder({
            data: records?.transaction?.personalCode,
          });
        },
      },
      {
        title: "شماره همراه",
        dataIndex: "phone",
        key: "phone",
        width: 130,
        render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
          return dataPlaceHolder({
            data: records?.transaction?.phone,
          });
        },
      },
      {
        title: "کسب و کار",
        dataIndex: "businessName",
        key: "businessName",
        width: 130,
        render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
          return dataPlaceHolder({
            data: records?.transaction?.businessName,
          });
        },
      },
      {
        title: "واحد / شعبه",
        dataIndex: "branchName",
        key: "branchName",
        width: 130,
        render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
          return dataPlaceHolder({
            data: records?.transaction?.branchName,
          });
        },
      },
      //todo[nima] uncomment when api got ready
      // {
      //   title: "استان", //  کلید از سمت بک نداریم
      //   dataIndex: "province",
      //   key: "province",
      //   width: 200,
      // },
      // {
      //   title: "شهر", //  کلید از سمت بک نداریم
      //   dataIndex: "province",
      //   key: "province",
      //   width: 200,
      // },
      // {
      //   title: "مسئول پیگیری درخواست", // کلید قرار است اضافه شود
      //   dataIndex: "responsibleRequest",
      //   key: "responsibleRequest",
      //   width: 170,
      //   render: (_: string, records: RefundRequestListAndAdvanceFilterContent) => {
      //     return dataPlaceHolder({
      //       data: `${records?.transaction?.modifiedByFirstName}  ${records?.transaction?.modifiedByLastName}`,
      //     });
      //   },
      // },
      {
        title: "تاریخ و زمان ثبت درخواست",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 180,
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "YYYY-MM-DD , HH:mm",
          });
        },
      },

      {
        title: "",
        dataIndex: "id",
        key: "id",
        fixed: "right" as FixedType,
        width: 78,
        className: "tables-sticky-column-left",
        render: (value: number, records: RefundRequestListAndAdvanceFilterContent) => (
          <Link
            className="text-link"
            to={{
              pathname: FINANCE_REQUESTS_RETURN_MONEY_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                uuid: records?.uuid,
                status: REQUEST_DEMAND_IDS?.rejected,
              }),
            }}
          >
            مشاهده
          </Link>
        ),
      },
    ];
  };
export default ReturnMoneyRejectListTableModel;
