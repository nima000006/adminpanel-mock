import { useEffect } from "react";

import { Col, Row } from "antd";
import { AiFillInfoCircle } from "react-icons/ai";
import { PiPencilLine } from "react-icons/pi";
import { useNavigate } from "react-router";

import { CustomButton, CustomSwitch, CustomUploader } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllAdmissionRulesQuery,
  useLazyGetMyAdmissionRulesQuery,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import { AdmissionDetailRulesContentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailRulesContent/@types/@admissionDetailRulesContent";
import { MY_ADMISSION_STATUS } from "@pages/Dormitory/Admission/_shared/util";

const AdmissionDetailRulesContent = ({
  variant,
  editTo,
  status,
}: AdmissionDetailRulesContentProps) => {
  const navigate = useNavigate();
  const isAllVariant = variant === "all";
  const isMyVariant = variant === "my";
  const showEdit = status === MY_ADMISSION_STATUS.waiting;

  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getAllAdmissionRules,
    { data: allAdmissionRulesData, isFetching: isGetAllAdmissionRulesLoading },
  ] = useLazyGetAllAdmissionRulesQuery();

  const [
    getMyAdmissionRules,
    { data: myAdmissionRulesData, isFetching: isGetMyAdmissionRulesLoading },
  ] = useLazyGetMyAdmissionRulesQuery();

  const admissionRulesData = isMyVariant ? myAdmissionRulesData : allAdmissionRulesData;
  const isGetAdmissionRulesLoading = isMyVariant
    ? isGetMyAdmissionRulesLoading
    : isGetAllAdmissionRulesLoading;

  const hasRules =
    admissionRulesData?.regulations && admissionRulesData.regulations.length > 0;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.id) return;

    if (isMyVariant) {
      getMyAdmissionRules(url.id);
      return;
    }

    if (isAllVariant) {
      getAllAdmissionRules(url.id);
    }
  }, [url?.id, isAllVariant, isMyVariant]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col">
      {isAllVariant && showEdit && editTo && (
        <CustomDivider
          text=""
          extraContent={
            <CustomButton
              type="dashed"
              icon={<PiPencilLine />}
              onClick={() => navigate(editTo)}
            >
              ویرایش
            </CustomButton>
          }
        />
      )}

      <Div loading={isGetAdmissionRulesLoading} className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <CustomDivider text="شرایط پذیرش" />

          <CustomAlert
            type="warning"
            showIcon
            title="ظرفیت‌های این برنامه پذیرش فقط توسط کاربرانی که شرایط زیر را داشته باشند، قابل مشاهده و رزرو خواهند بود."
          />

          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="جنسیت پذیرش"
              value={admissionRulesData?.gender?.title}
              span={24}
            />
            <SingleVerticalWithCol
              label="کسب و کار (تفاهمی)"
              value={admissionRulesData?.allowBusinesses
                ?.map((business) => business.title)
                .join("، ")}
              span={24}
            />
            <SingleVerticalWithCol
              label="شعبه / واحد کاربر (تفاهمی)"
              value={admissionRulesData?.allowBranches
                ?.map((branch) => branch.title)
                .join("، ")}
              span={24}
            />
            {!!admissionRulesData?.regulations?.length && (
              <>
                <SingleVerticalWithCol
                  label="گروه کاربری"
                  value={admissionRulesData.userGroupTypes
                    .map((type) => type.title)
                    .join("، ")}
                  span={24}
                />

                {admissionRulesData?.userGroupTypes?.some(
                  (type) => type.name === "STUDENT"
                ) && (
                  <SingleVerticalWithCol
                    label="مقطع تحصیلی"
                    value={admissionRulesData?.academicDegrees
                      ?.map((degree) => degree.title)
                      .join("، ")}
                    span={24}
                  />
                )}
                {admissionRulesData?.userGroupTypes?.some(
                  (type) => type.name === "STUDENT"
                ) && (
                  <SingleVerticalWithCol
                    label="رشته تحصیلی"
                    value={admissionRulesData?.studyFields
                      ?.map((field) => field.title)
                      .join("، ")}
                    span={24}
                  />
                )}

                <SingleVerticalWithCol
                  label="ملیت"
                  value={admissionRulesData.allowCitizenShip.title}
                  span={24}
                />
              </>
            )}
          </Row>
        </div>

        <div className="flex flex-col gap-6">
          <CustomDivider text="شرایط تحویل اقامتگاه" />

          <div className="flex flex-col gap-4">
            <CustomAlert
              description={
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <AiFillInfoCircle
                      className="text-primary-6 mt-0.5 shrink-0"
                      size={16}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-neutral-11 text-sm font-medium">
                        آیا هنگام تحویل اقامتگاه، دریافت مدارک یا مستندات خاصی از کاربر
                        الزامی است؟
                      </span>
                      <span className="text-neutral-10 text-sm">
                        در صورت فعال بودن این گزینه، کاربر برای تحویل اقامتگاه باید مدارک
                        مشخص‌شده را ارائه کند. این مدارک در سامانه دریافت و بارگذاری
                        می‌شوند. لطفا در بارگذاری نمونه فایل‌ها دقت لازم رو داشته باشید و
                        فایل‌های شفاف و اسکن شده را بارگذاری نمایید.
                      </span>
                    </div>
                  </div>
                  <CustomSwitch
                    valuePropName="requiresHandoverDocuments"
                    checked={admissionRulesData?.needUploadForms}
                    checkedChildren="بله"
                    unCheckedChildren="خیر"
                    disabled
                    noStyle
                  />
                </div>
              }
            />

            {admissionRulesData?.needUploadForms &&
              admissionRulesData?.forms?.map((document) => (
                <Row key={document.uuid} gutter={[16, 16]}>
                  <SingleVerticalWithCol label="عنوان فرم" value={document.title} />
                  <Col xl={6} lg={6} md={8} sm={12} xs={24} className="h-40 md:h-32.5">
                    <CustomUploader
                      fileList={
                        document.url
                          ? [
                              {
                                uid: document.uuid,
                                name: document.url,
                                url: document.url,
                                status: "done",
                              },
                            ]
                          : []
                      }
                      setFileList={() => {}}
                      isReadOnly
                      hasUploaderIcon={false}
                      name={`handoverDocument-${document.uuid}`}
                      label="نمونه فرم"
                      hasVerticalLabel
                    />
                  </Col>
                </Row>
              ))}

            <CustomAlert
              description={
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <AiFillInfoCircle
                      className="text-primary-6 mt-0.5 shrink-0"
                      size={16}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-neutral-11 text-sm font-medium">
                        آیا در زمان تحویل اقامتگاه به اطلاعات بستگان کاربر نیاز دارید؟
                      </span>
                      <span className="text-neutral-10 text-sm">
                        در صورت فعال بودن این گزینه، هنگام تحویل اقامتگاه اطلاعات بستگان
                        کاربر شامل کد ملی / فراگیر، تاریخ تولد، نسبت و شماره تماس دریافت
                        خواهد شد.
                      </span>
                    </div>
                  </div>
                  <CustomSwitch
                    valuePropName="requiresRelativesInfo"
                    checked={admissionRulesData?.allowGuestInfo}
                    checkedChildren="بله"
                    unCheckedChildren="خیر"
                    disabled
                    noStyle
                  />
                </div>
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <CustomDivider text="قوانین و مقررات" className="mb-0!" />

          {!hasRules && (
            <CustomAlert
              type="warning"
              showIcon
              title="هیچ قانون یا مقرراتی برای این برنامه پذیرش ثبت نشده است."
            />
          )}

          {hasRules &&
            admissionRulesData?.regulations?.map((rule) => (
              <div key={rule.title} className="flex flex-col gap-4">
                <CustomDivider
                  text={rule?.kind?.title}
                  titleClassName="text-base! font-normal!"
                />

                <Row gutter={[16, 16]}>
                  <SingleVerticalWithCol
                    label="قانون انتخاب شده"
                    value={rule?.title}
                    span={8}
                  />
                  <SingleVerticalWithCol
                    label="توضیحات قانون"
                    value={rule?.description}
                    span={24}
                  />
                </Row>
              </div>
            ))}
        </div>
      </Div>
    </div>
  );
};

export default AdmissionDetailRulesContent;
