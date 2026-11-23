import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { myDoctorSurveyDetailFourthTabContentType } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/@types/@geneticsParticipantsDetailReviewStatus";
import { testStatusConfig } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/_shared/utils";

const GeneticsParticipantsDetailReviewStatusTestTableModel = ({
  openResultDrawer,
  openViewDrawer,
  openResultDrawerFromView,
}: {
  openResultDrawer: (record: myDoctorSurveyDetailFourthTabContentType) => void;
  openViewDrawer: (record: myDoctorSurveyDetailFourthTabContentType) => void;
  openResultDrawerFromView: (requestTestId: string) => void;
}): CustomColumnType<myDoctorSurveyDetailFourthTabContentType>[] => {
  return [
    {
      title: "تست",
      dataIndex: "testTitle",
      key: "testTitle",
      width: 160,
      searchable: true,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
        }),
    },
    {
      title: "تاریخ آخرین خرید",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 140,
      sorter: (
        a: myDoctorSurveyDetailFourthTabContentType,
        b: myDoctorSurveyDetailFourthTabContentType
      ) =>
        (a.createdDate ? new Date(a.createdDate).getTime() : 0) -
        (b.createdDate ? new Date(b.createdDate).getTime() : 0),
      render: (value: string) => dataPlaceHolder({ data: value, isDate: true }),
    },
    {
      title: "وضعیت اقدام درخواست",
      dataIndex: "testStatus",
      key: "statusType",
      width: 160,
      render: (_: unknown, record: myDoctorSurveyDetailFourthTabContentType) => {
        const statusId = record?.testStatus?.statusTypeId;

        const statusConfig =
          statusId !== undefined
            ? testStatusConfig[statusId as keyof typeof testStatusConfig]
            : undefined;

        return record.testStatus ? (
          <CustomTag className="w-fit" color={statusConfig?.color ?? "default"}>
            {record.testStatus?.title ?? "-"}
          </CustomTag>
        ) : (
          "-"
        );
      },
    },
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 160,
      sorter: (
        a: myDoctorSurveyDetailFourthTabContentType,
        b: myDoctorSurveyDetailFourthTabContentType
      ) =>
        (a.modifiedDate ? new Date(a.modifiedDate).getTime() : 0) -
        (b.modifiedDate ? new Date(b.modifiedDate).getTime() : 0),
      render: (value: string) =>
        dataPlaceHolder({ data: value, isDate: true, customDateFormat: "YYYY/MM/DD" }),
    },
    {
      title: "آخرین مسئول رسیدگی",
      dataIndex: "surveyCycleModifiedByFullName",
      key: "surveyCycleModifiedByFullName",
      width: 180,
      searchable: true,
    },
    {
      title: "تاریخچه",
      dataIndex: "history",
      key: "history",
      width: 120,
      render: (_: unknown, record: myDoctorSurveyDetailFourthTabContentType) => (
        <CustomButton onClick={() => openViewDrawer(record)} type="link">
          مشاهده
        </CustomButton>
      ),
    },
    {
      title: "",
      dataIndex: "result",
      key: "result",
      width: 160,
      fixed: "right" as FixedType,
      render: (_: unknown, record: myDoctorSurveyDetailFourthTabContentType) =>
        // if status is 3 (نتیجه تست ارسال شد) show view result button
        record?.testStatus?.code === 3 ? (
          <CustomButton
            onClick={() => openResultDrawerFromView(record?.id?.toString())}
            type="link"
          >
            مشاهده نتیجه
          </CustomButton>
        ) : (
          <CustomButton onClick={() => openResultDrawer(record)} type="link">
            ثبت نتیجه
          </CustomButton>
        ),
    },
  ];
};
export default GeneticsParticipantsDetailReviewStatusTestTableModel;
