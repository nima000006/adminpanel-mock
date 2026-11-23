import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { RefundRequestListAndAdvanceFilterContent } from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyList/@types/@returnMoneyList";

const PendingConfirmAllRequestDrawerTableModel = ({
  deleteHandler,
}: {
  deleteHandler: (value: number) => void;
}): CustomColumnType<RefundRequestListAndAdvanceFilterContent>[] => {
  return [
    {
      title: "روز شمار",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 100,
      render: (value: string) => (
        <div className="custom-Custom-diff-days">
          <CustomTagWithDiffDays value={value} />
        </div>
      ),
    },
    {
      title: "شماره درخواست",
      dataIndex: "id",
      key: "id",
      width: 140,
      ...GetServerColumnSearchProps({
        dataIndex: "id",
        label: "شماره درخواست",
        type: "text",
      }),
    },
    {
      title: "مبلغ عودت وجه",
      dataIndex: "amount",
      key: "amount",
      width: 130,
      render: (_: number, records: RefundRequestListAndAdvanceFilterContent) => {
        return dataPlaceHolder({
          data: records?.amount?.amount?.toString(),
          isPrice: true,
        });
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
      width: 130,
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
      width: 130,
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
    //  کلید از سمت بک نداریم
    // {
    //   title: "استان",
    //   dataIndex: "province",
    //   key: "province",
    //   width: 200,
    //   ...GetServerColumnSearchProps({
    //     dataIndex: "province",
    //     label: "استان",
    //     type: "text",
    //   }),
    // },
    // {
    //   title: "شهر",
    //   dataIndex: "province",
    //   key: "province",
    //   width: 200,
    //   ...GetServerColumnSearchProps({
    //     dataIndex: "province",
    //     label: "شهر",
    //     type: "text",
    //   }),
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
      render: (value: number) => (
        <CustomButton danger type="link" onClick={() => deleteHandler(value)}>
          حذف از لیست
        </CustomButton>
      ),
    },
  ];
};
export default PendingConfirmAllRequestDrawerTableModel;
