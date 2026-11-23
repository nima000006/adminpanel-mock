import { useState } from "react";

import { Descriptions, Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { PiArrowLeft } from "react-icons/pi";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MY_DOCTOR_GENETIC_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/myDoctor";
import { useMyDoctorSurveyDetailFourthTabQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { testStatusConfig } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/_shared/utils";
import GeneticsParticipantsDetailReviewStatusConsultationDrawerContent from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusConsultation/helper/component/GeneticsParticipantsDetailReviewStatusConsultationDrawerContent/GeneticsParticipantsDetailReviewStatusConsultationDrawerContent";
import CustomConvertTimeToDays from "@pages/Ticketing/Agent/AgentTicketList/helper/components/CustomConvertTimeToDays/CustomConvertTimeToDays";

const GeneticsParticipantsDetailReviewStatusConsultation = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [currentStatusId, setCurrentStatusId] = useState<number | undefined>();
  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const { data, isLoading: isGetDataOfFourthTabLoading } =
    useMyDoctorSurveyDetailFourthTabQuery(
      {
        params: {
          page: params?.page ? Number(params.page) - 1 : 0,
          size: params?.pageSize ? Number(params.pageSize) : 8,
        },
        body: {
          surveyId: Number(params?.surveyId),
          surveyCycleId: Number(params?.id),
          testTypeIds: [0], // 0: مشاوره
        },
      },
      { skip: !params?.id || !params?.surveyId }
    );

  //* ================================ Util Functions ================================

  const openDrawerHandler = (id: string, requestTestId: string, statusId?: number) => {
    setSelectedId(id);
    setCurrentStatusId(statusId);
    setIsOpenDrawer(true);
    setSearchParams({ ...params, requestTestId: requestTestId });
  };

  const closeDrawerHandler = () => {
    setIsOpenDrawer(false);
    setSelectedId("");
    setCurrentStatusId(undefined);

    const newParams = { ...params };
    delete newParams.requestTestId;
    setSearchParams(newParams);
  };

  //* ================================ Main TSX ================================

  return (
    <>
      {isOpenDrawer && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isOpenDrawer}
          closeIcon={<AiOutlineClose />}
          content={
            <GeneticsParticipantsDetailReviewStatusConsultationDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              testId={selectedId}
              currentStatusId={currentStatusId}
            />
          }
        />
      )}
      <Div loading={isGetDataOfFourthTabLoading}>
        {!data?.content ||
          (data?.content?.length === 0 && (
            <CustomAlert
              showIcon
              action={
                <CustomButton type="primary">
                  <Link to={MY_DOCTOR_GENETIC_REQUESTS_LIST_PAGE_ROUTE}>
                    افزودن به لیست مشاوره رایگان
                  </Link>
                </CustomButton>
              }
              type="info"
              title="افزودن به لیست مشاوره"
              description="اگر نتیجه تست نشان می‌دهد که مشاوره رایگان می‌تواند برای کاربر مفید باشد، از اینجا می‌توانید درخواست دریافت مشاوره رایگان را برای کاربر ثبت کنید و پس از ثبت درخواست، فرآیند ارائه مشاوره را با کاربر پیش ببرید."
            />
          ))}

        {!data?.content ||
          (data?.content?.length !== 0 && <CustomDivider text="اطلاعات درخواست" />)}

        {!data?.content || data?.content?.length !== 0 ? (
          data?.content.map((item) => {
            const statusId = item?.testStatus?.statusEmergencyTypeId;

            const statusConfig =
              statusId !== undefined
                ? testStatusConfig[statusId as keyof typeof testStatusConfig]
                : undefined;

            return (
              <div className="mb-10!" key={item.id}>
                <div className="@container max-[900px]:[&_.ant-descriptions-item-container]:flex max-[900px]:[&_.ant-descriptions-item-container]:flex-col max-[900px]:[&_.ant-descriptions-item-container]:items-start max-[900px]:[&_.ant-descriptions-item-content]:w-full [&_.ant-descriptions-item-label]:w-[180px] [&_.ant-descriptions-item-label]:text-right [&_.ant-descriptions-item-label]:font-bold max-[900px]:[&_.ant-descriptions-item-label]:w-full max-[900px]:[&_.ant-descriptions-item-label]:pb-1 [&_.ant-descriptions-view]:w-full [&_.ant-descriptions-view_table]:w-full">
                  <Descriptions
                    column={1}
                    items={[
                      {
                        key: "1",
                        label: "روز شمار",
                        children: (
                          <CustomConvertTimeToDays
                            startedAt={item?.createdDate}
                            daysOnly
                          />
                        ),
                      },
                      {
                        key: "2",
                        label: "وضعیت درخواست",
                        children: (
                          <CustomTag color={statusConfig?.color ?? "default"}>
                            {item?.testStatus?.title ?? "-"}
                          </CustomTag>
                        ),
                      },
                      {
                        key: "3",
                        label: "تست های درخواست شده",
                        children: item?.otherTests?.length
                          ? item.otherTests.join("، ")
                          : "-",
                      },
                      {
                        key: "4",
                        label: "شماره همراه",
                        children: dataPlaceHolder({
                          data: item?.mobileNumber,
                        }),
                      },
                    ]}
                    styles={{
                      label: {
                        fontWeight: "bold",
                        textAlign: "right",
                        width: "180px",
                      },
                    }}
                  />
                </div>

                <CustomDivider dashed />

                <Row gutter={[16, 16]}>
                  <SingleVerticalWithCol
                    xl={8}
                    lg={12}
                    md={24}
                    sm={24}
                    value={item?.surveyCycleCreatedDate}
                    label="تاریخ شرکت در آزمون"
                    isDate
                  />

                  <SingleVerticalWithCol
                    xl={8}
                    lg={12}
                    md={24}
                    sm={24}
                    value={item?.createdDate}
                    label="تاریخ ایجاد درخواست"
                    isDate
                  />

                  <SingleVerticalWithCol
                    xl={8}
                    lg={12}
                    md={24}
                    sm={24}
                    value={`${item?.firstName ?? ""} ${item?.lastName ?? ""}`}
                    label="ایجاد کننده درخواست"
                  />

                  <SingleVerticalWithCol
                    xl={8}
                    lg={12}
                    md={24}
                    sm={24}
                    label="آخرین تغییر وضعیت"
                    value={item?.modifiedDate}
                    isDate
                  />

                  <SingleVerticalWithCol
                    xl={8}
                    lg={12}
                    md={24}
                    sm={24}
                    label="آخرین ویرایش کننده"
                    value={dataPlaceHolder({
                      data:
                        item?.surveyCycleModifiedByFirstName?.trim() ||
                        item?.surveyCycleModifiedByLastName?.trim()
                          ? `${item?.surveyCycleModifiedByFirstName?.trim() || "-"} ${
                              item?.surveyCycleModifiedByLastName?.trim() || "-"
                            }`
                          : "-",
                    })}
                  />
                </Row>
                <div className="mt-20 flex justify-end">
                  <CustomButton
                    type="primary"
                    onClick={() =>
                      openDrawerHandler(
                        item?.testId?.toString(),
                        item?.id.toString(),
                        item?.testStatus?.id
                      )
                    }
                    icon={<PiArrowLeft />}
                  >
                    ثبت نتیجه مشاوره
                  </CustomButton>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mt-20">
            <CustomEmpty description="کاربر درخواست دریافت مشاوره رایگان نداشته است." />
          </div>
        )}
      </Div>
    </>
  );
};

export default GeneticsParticipantsDetailReviewStatusConsultation;
