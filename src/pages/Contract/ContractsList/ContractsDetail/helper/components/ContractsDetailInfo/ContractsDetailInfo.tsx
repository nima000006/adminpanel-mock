import { useEffect, useState } from "react";

import {
  Col,
  Descriptions,
  DescriptionsProps,
  Dropdown,
  Form,
  MenuProps,
  Row,
} from "antd";
import { FaUser, FaUsers } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import {
  PiBriefcase,
  PiUser,
  PiFileXls,
  PiFilePdf,
  PiSealCheckFill,
} from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import { useLazyGetContractsDetailBaseInfoQuery } from "@infra/states/redux/Apis/contracts/contractsDetail/contractsDetail";
import ContractsReminderModalForm from "@pages/Contract/ContractsList/_shared/components/ContractsModalForm/ContractsReminderModalForm";
import ContractService from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/components/ContractService/ContractService";

import {
  GetContractsBeneficiary,
  GetContractsDetailBaseInfoResponse,
  GetContractsDetailParty,
} from "./@types/@getContractsDetailBaseInfo";
import ContractsDetailInfoModelTable from "./helper/models/ContractsDetailInfoModelTable";
import "./_contractsDetailInfo.scss";

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
  ],
};

const ContractsDetailInfo = ({ isArchive }: { isArchive?: boolean }) => {
  const [detailInfoData, setDetailInfoData] =
    useState<GetContractsDetailBaseInfoResponse>();
  const [openReminderModal, setOpenReminderModal] = useState(false);
  const { isMobile } = useResponsive();
  const { params } = useQueryParams();
  const [form] = Form.useForm();
  const [viewType, setViewType] = useState<"card" | "table">("table");
  const options = [
    {
      label: "جدول",
      value: "table",
    },
    {
      label: "کارت",
      value: "card",
    },
  ];

  // تابع کمکی برای تبدیل عدد به ترتیب فارسی (اول، دوم و ...)
  const getOrdinalLabel = (index: number) => {
    const ordinals = [
      "اول",
      "دوم",
      "سوم",
      "چهارم",
      "پنجم",
      "ششم",
      "هفتم",
      "هشتم",
      "نهم",
      "دهم",
    ];
    return ordinals[index] || index + 1;
  };
  const isInactiveContractStatus =
    detailInfoData?.contractStatus === "غیر فعال" ||
    detailInfoData?.contractStatus === "غیرفعال";

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "وضعیت",
      children: (
        <CustomTag color={isArchive || isInactiveContractStatus ? "error" : "success"}>
          {isArchive
            ? "غیر فعال"
            : dataPlaceHolder({ data: detailInfoData?.contractStatus })}
        </CustomTag>
      ),
    },
    {
      key: "2",
      label: "شناسه قالب قرارداد",
      children: <p>{dataPlaceHolder({ data: detailInfoData?.id })}</p>,
    },
    // تولید داینامیک لیست طرفین قرارداد
    ...(detailInfoData?.parties?.map((party: GetContractsDetailParty, index: number) => ({
      key: party?.id?.toString() || `party-${index}`,
      label: `طرف ${getOrdinalLabel(index)} قرارداد`,
      children: (
        <div className="text-primary-6 flex gap-1">
          {/* اگر نام خالی بود، آیکون شخص وگرنه آیکون سازمان */}
          {!party?.name ? (
            <PiUser className="text-primary-6" size={20} />
          ) : (
            <PiBriefcase className="text-primary-6" size={20} />
          )}
          <span className="text-primary-6">{party?.name || "نامشخص"}</span>
        </div>
      ),
    })) || []),
  ];

  //? ================================ Api Calls ================================
  const [contractsDetailBaseInfo, { isFetching: isContractsDetailBaseInfoLoading }] =
    useLazyGetContractsDetailBaseInfoQuery();

  //? ================================ Effects  ================================

  useEffect(() => {
    contractsDetailBaseInfo({ contractId: +params?.id })
      .unwrap()
      .then(getContractsInfoSuccess);
  }, [params?.id]);

  // ================================ Util functions  ================================

  const getContractsInfoSuccess = (res: GetContractsDetailBaseInfoResponse) => {
    setDetailInfoData(res);
  };

  const beneficiaries = detailInfoData?.beneficiaries;
  const hasData = beneficiaries && beneficiaries.length > 0;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div
      loading={isContractsDetailBaseInfoLoading}
      className="contracts-detail-info-container"
    >
      {!isArchive && Number(params?.diffDays) <= 20 ? (
        <>
          <CustomAlert
            title={`تا پایان قرارداد ${params?.diffDays || 0} روز دیگر باقی مانده.`}
            showIcon
            type="error"
            className="my-5! border-dashed!"
            action={
              <CustomButton type="link" danger onClick={() => setOpenReminderModal(true)}>
                ارسال پیام یادآوری
              </CustomButton>
            }
          />
          <ConfirmationModalWithContent
            isModalOpen={openReminderModal}
            showIcon={false}
            closeModalHandler={() => {
              setOpenReminderModal(false);
              form.resetFields();
            }}
            title="ارسال پیام یادآوری"
            customClass="reminder-modal-custom"
            content={
              <ContractsReminderModalForm
                form={form}
                closeReminderModalHandler={() => setOpenReminderModal(false)}
              />
            }
            onConfirmClickHandler={() => {
              form.submit();
            }}
            confirmBtnText="ارسال پیام"
            backBtnText="انصراف"
            isConfirmButtonDisable={false}
            isConfirmButtonLoading={false}
          />
        </>
      ) : null}

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="تاریخ ایجاد"
          value={detailInfoData?.createdDate}
          isDate
        />
        <SingleVerticalWithCol label="ایجاد کننده" value={detailInfoData?.createdBy} />
        <SingleVerticalWithCol
          label="تاریخ شروع قرارداد"
          value={detailInfoData?.startDate}
          isDate
        />
        <SingleVerticalWithCol label="تاریخ پایان قرارداد" value={emptyString} />
        {isArchive ? (
          <>
            <SingleVerticalWithCol label="آخرین تغییر وضعیت" value={emptyString} />
            <SingleVerticalWithCol label="آخرین ویرایش کننده" value={emptyString} />
          </>
        ) : null}
      </Row>

      <Row gutter={[16, 16]} className="mt-10!">
        <Col
          xxl={2}
          xl={3}
          lg={4}
          md={6}
          sm={24}
          xs={24}
          className="flex! flex-col! justify-center"
        >
          <ContractService service={emptyString} />
        </Col>
        <Col xxl={22} xl={21} lg={20} md={18} sm={24} xs={24}>
          <Descriptions
            className="body-regular bg-neutral-2! rounded-lg p-4!"
            items={items}
            column={1}
            styles={{ label: { width: "130px" } }}
          />
        </Col>
      </Row>
      <CustomDivider
        text={`لیست خدمات فعال (${detailInfoData?.beneficiaries?.length ?? 0})`}
        extraContent={
          <CustomSegmented
            vertical={isMobile}
            className="contracts-detail-info-custom-segmented custom-segmented my-10! w-[256px]!"
            options={options}
            onChange={(val) => setViewType(val as "card" | "table")}
          />
        }
      />
      <ToolBox
        leftSide={
          <Dropdown menu={exportMenu} trigger={["click"]}>
            {/* todo[nima] enable when api got ready */}
            <CustomButton disabled>
              خروجی <IoIosArrowDown />
            </CustomButton>
          </Dropdown>
        }
      />
      {viewType === "table" &&
        (hasData ? (
          <CustomTable<GetContractsBeneficiary>
            className="contracts-detail-info-table-container mt-4!"
            dataSource={beneficiaries}
            columns={ContractsDetailInfoModelTable()}
            loading={isContractsDetailBaseInfoLoading}
            pagination={false}
          />
        ) : (
          <CustomEmpty />
        ))}

      {viewType === "card" &&
        (hasData ? (
          <Row gutter={[16, 16]} className="mt-4!">
            {beneficiaries.map((item) => (
              <Col xl={8} lg={12} md={24} sm={24} xs={24} key={item.categoryTitle}>
                <CustomCard className="bg-neutral-2! border-none!">
                  <div className="border-neutral-4 flex justify-between border-b pb-4!">
                    <h3 className="text-xl! whitespace-nowrap!">
                      {dataPlaceHolder({ data: item.categoryTitle })}
                    </h3>

                    {item?.hasTax && (
                      <CustomTag className="m-0!" color="blue">
                        شامل ارزش افزوده
                      </CustomTag>
                    )}
                  </div>

                  <div className="mt-4! flex justify-between">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <span className="flex flex-row-reverse items-center justify-center gap-2">
                        فروشنده <FaUser className="text-neutral-6" size={20} />
                      </span>
                      <p className="body-regular">{emptyString}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                      <span className="flex flex-row-reverse items-center justify-center gap-2">
                        تامین کننده{" "}
                        <PiSealCheckFill className="text-neutral-6" size={20} />
                      </span>
                      <p className="body-regular">
                        {dataPlaceHolder({ data: item?.supplierName })}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                      <span className="flex flex-row-reverse items-center justify-center gap-2">
                        ذینفعان <FaUsers className="text-neutral-6" size={20} />
                      </span>
                      <p className="body-regular">
                        {dataPlaceHolder({ data: item?.ruleBeneficiaries })}
                      </p>
                    </div>
                  </div>

                  <CustomButton className="mt-4! w-full!">قوانین مالی</CustomButton>
                </CustomCard>
              </Col>
            ))}
          </Row>
        ) : (
          <CustomEmpty />
        ))}
    </Div>
  );
};

export default ContractsDetailInfo;
