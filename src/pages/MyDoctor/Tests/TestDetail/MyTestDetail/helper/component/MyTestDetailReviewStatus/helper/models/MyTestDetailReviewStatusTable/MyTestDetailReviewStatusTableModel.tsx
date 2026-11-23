import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MyDoctorTestReviewDetailListManagerType } from "@pages/MyDoctor/Tests/TestDetail/MyTestDetail/helper/component/MyTestDetailReviewStatus/@types/@myTestDetailReviewStatus";

import { MyTestDetailReviewStatusTableModelTypes } from "./@types/@myTestDetailReviewStatusTableModel";

const MyTestDetailReviewStatusTableModel = ({
  viewClickHandler,
  registerResultHandler,
}: MyTestDetailReviewStatusTableModelTypes): CustomColumnType<MyDoctorTestReviewDetailListManagerType>[] => {
  return [
    {
      title: "نوع اقدام",
      dataIndex: "followUpTypeTitle",
      key: "followUpTypeTitle",
      width: 130,
      render: (value: string) => {
        return <CustomTag>{value}</CustomTag>;
      },
    },
    {
      title: "نیاز به اقدام مجدد",
      dataIndex: "anotherFollowUp",
      key: "anotherFollowUp",
      width: 130,
      render: (value: boolean) => {
        return (
          <CustomTag color={value ? "green" : "red"}>
            {value ? "دارد" : "ندارد"}
          </CustomTag>
        );
      },
    },
    {
      title: "نوع اقدام مجدد",
      dataIndex: "nextFollowUpTypeTitle",
      key: "nextFollowUpTypeTitle",
      width: 130,
      render: (value: string) => {
        return <CustomTag>{value}</CustomTag>;
      },
    },
    {
      title: "تاریخ و زمان اقدام مجدد",
      dataIndex: "nextFollowUpDate",
      key: "nextFollowUpDate",
      width: 200,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm YYYY/MM/DD",
        });
      },
    },
    {
      title: "نتیجه اقدام",
      dataIndex: "followUpActionTitle",
      key: "followUpActionTitle",
      width: 250,
    },
    {
      title: "نام اقدام کننده",
      dataIndex: "followerFirstName",
      key: "followerFirstName",
      width: 125,
    },
    {
      title: "نام خانوادگی اقدام کننده",
      dataIndex: "followerLastName",
      key: "followerLastName",
      width: 175,
    },
    {
      title: "تاریخ ثبت آخرین اقدام",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm YYYY/MM/DD",
        });
      },
    },
    {
      title: "نام ایجاد کننده",
      dataIndex: "createdFirstName",
      key: "createdFirstName",
      width: 125,
    },
    {
      title: "نام خانوادگی ایجاد کننده",
      dataIndex: "createdLastName",
      key: "createdLastName",
      width: 175,
    },
    {
      title: "",
      dataIndex: "followUpId",
      key: "followUpId",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (value: number, records: MyDoctorTestReviewDetailListManagerType) => {
        return (
          <div className="actions-btn">
            <CustomButton
              onClick={() => viewClickHandler(value)}
              type="link"
              // className="buttons" //todo[Atefeh]: instead of adding classname use antd
              // todo internal feature like above with link
              disabled={!records?.followUpActionId}
            >
              مشاهده
            </CustomButton>
            <CustomButton
              type="text"
              onClick={() => registerResultHandler(value)}
              className={records?.anotherFollowUp ? "buttons" : ""}
              disabled={!records?.anotherFollowUp}
            >
              ثبت نتیجه اقدام مجدد
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default MyTestDetailReviewStatusTableModel;
