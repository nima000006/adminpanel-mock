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
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { PiBriefcase, PiFilePdf, PiFileXls, PiUser } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { emptyString } from "@infra/config/global.vars";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import {
  CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_NEW_SERVICE_LIST_PAGE_ROUTE,
} from "@infra/router/routes/contracts";
import {
  useAddNewServiceMutation,
  useCopyToDraftContractMutation,
  useDeActiveTemplateContractMutation,
} from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { partiesPersianOrder } from "@pages/Contract/_shared/utils";

import ContractService from "../ContractService/ContractService";
import {
  ChangeModalFormType,
  ContractBasicInfoTabProps,
} from "./@types/@contractBasicInfoTabTypes";
import TemplateServiceCardList from "./helper/components/TemplateServiceCardList/TemplateServiceCardList";
import TemplateServiceTableList from "./helper/components/TemplateServiceTableList/TemplateServiceTableList";
import { AddServiceModalContentFormType } from "./helper/modal/AddServiceModalContent/@types/@addServiceModalContentTypes";
import AddServiceModalContent from "./helper/modal/AddServiceModalContent/AddServiceModalContent";
import ChangeStatusModalContent from "./helper/modal/ChangeStatusModalContent/ChangeStatusModalContent";

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
const ContractBasicInfoTab = ({
  dataSource,
  onRefresh,
  loading,
  isArchive,
}: ContractBasicInfoTabProps) => {
  const { isMobile } = useResponsive();
  const { params, setSearchParams } = useQueryParams();

  const [viewType, setViewType] = useState<"card" | "table">(
    (params?.viewType as "card" | "table") || "table"
  );

  const [switchStatus, setSwitchStatus] = useState(true);
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false);
  const [openCopyModal, setCopyModal] = useState(false);
  const [openChangeStatusModal, setChangeStatusModal] = useState(false);

  const [form] = Form.useForm<AddServiceModalContentFormType>();
  const [changeModalForm] = Form.useForm<ChangeModalFormType>();
  const navigate = useNavigate();

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

  //? ================================  Api calls ================================
  // copy to draft
  const [copyToDraft, { isLoading: isCopyToDraftLoading }] =
    useCopyToDraftContractMutation();

  // add new service
  const [addNewService, { isLoading: isAddNewServiceLoading }] =
    useAddNewServiceMutation();

  // deactivate contract
  const [deActiveTemplate, { isLoading: isDeActiveTemplateLoading }] =
    useDeActiveTemplateContractMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (dataSource?.status?.id != null) {
      setSwitchStatus(dataSource.status.name === "ACTIVE");
    }
  }, [dataSource]);

  useEffect(() => {
    if (params?.viewType) {
      setViewType(params.viewType as "card" | "table");
    }
  }, [params?.viewType]);
  //* ================================ Util Functions ================================

  const switchHandler = (checked: boolean) => {
    if (switchStatus && !checked) {
      setChangeStatusModal(true);
    }
  };

  // copy to draft
  const copyClickHandler = () => {
    setCopyModal(true);
  };

  const closeCopyModalHandler = () => {
    setCopyModal(false);
  };
  const confirmCopyBtnHandler = () => {
    copyToDraft({
      contractId: +params?.id, // طبق هماهنگی ای دی قالب را باید ارسال کنیم
      body: {
        title: dataSource?.title ?? "",
        subject: dataSource?.subject ?? "",
      },
    })
      .unwrap()
      .then(copyToDraftIsSuccess);
  };

  // success
  const copyToDraftIsSuccess = () => {
    closeCopyModalHandler();
  };

  // add service
  const addNewServiceHandler = () => {
    setOpenAddServiceModal(true);
  };

  const closeAddServiceModalHandler = () => {
    setOpenAddServiceModal(false);
    form.resetFields();
  };

  const confirmServiceBtnHandler = () => {
    form.validateFields().then(() => {
      const { services } = form.getFieldsValue();

      addNewService({
        contractId: +params?.id,
        categoryId: services?.code,
      })
        .unwrap()
        .then(addNewServiceIsSuccess);
    });
  };
  const addNewServiceIsSuccess = () => {
    closeAddServiceModalHandler();
    navigate(CONTRACTS_TEMPLATE_NEW_SERVICE_LIST_PAGE_ROUTE);
  };

  // change status
  const closeChangeStatusModalHandler = () => {
    setChangeStatusModal(false);
  };
  const confirmChangeStatusBtnHandler = () => {
    changeModalForm.validateFields().then((value) => {
      const { reasonChange, desc } = value;

      deActiveTemplate({
        id: +params?.id,
        reason: reasonChange?.item?.name,
        description: desc,
      })
        .unwrap()
        .then(deActiveTemplateIsSuccess);
    });
  };

  const deActiveTemplateIsSuccess = () => {
    setChangeStatusModal(false);
    setSwitchStatus(false);
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "شناسه قالب قرارداد",
      span: { xs: 2, sm: 2, md: 2, lg: 1, xl: 1, xxl: 1 },
      children: (
        <div>
          <p>{dataSource?.id}</p>
        </div>
      ),
    },
    {
      key: "2",
      span: { xs: 2, sm: 2, md: 2, lg: 1, xl: 1, xxl: 1 },
      children: (
        <div className="flex max-h-5! w-full items-baseline justify-start gap-2 lg:justify-end">
          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={copyClickHandler}
          >
            <FiCopy color="#1890FF" />
            <span className="text-primary-6">کپی بعنوان پیش نویس</span>
          </div>
          <CustomSwitch
            checked={!isArchive ? switchStatus : false}
            checkedChildren="فعال"
            unCheckedChildren="غیرفعال"
            valuePropName="status"
            onChange={switchHandler}
            disabled={isArchive}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "اکوسیستم",
      span: 2,
      children: <p>{dataSource?.ecosystem?.title}</p>,
    },
    ...(dataSource?.parties?.map((item, index) => ({
      key: `party-${item.id ?? index}`,
      label: `طرف ${partiesPersianOrder[index]} قرارداد`,
      span: 2,
      children: (
        <div className="text-primary-6 flex items-center gap-1">
          {item?.personalityGroupType?.name === "PERSONAL" ? (
            <PiUser size={20} />
          ) : (
            <PiBriefcase size={20} />
          )}
          <span>
            {item.title} ({item.id})
          </span>
        </div>
      ),
    })) ?? []),
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* مودال افزودن خدمت */}
      <ConfirmationModalWithContent
        isModalOpen={openAddServiceModal}
        showIcon={false}
        closeModalHandler={closeAddServiceModalHandler}
        title="افزودن خدمت جدید"
        content={<AddServiceModalContent form={form} data={dataSource} />}
        onConfirmClickHandler={confirmServiceBtnHandler}
        confirmBtnText="تایید خدمت"
        backBtnText="انصراف"
        isConfirmButtonLoading={isAddNewServiceLoading}
      />

      {/* مودال کپی به عنوان پیش نویس */}
      <ConfirmationModalWithContent
        isModalOpen={openCopyModal}
        closeModalHandler={closeCopyModalHandler}
        title="ذخیره پیش نویس"
        content={
          <div className="body-regular">
            آیا از کپی این قالب قرارداد در پیش نویس مطمئن هستید ؟
          </div>
        }
        onConfirmClickHandler={confirmCopyBtnHandler}
        confirmBtnText="تایید و ذخیره"
        backBtnText="انصراف"
        isConfirmButtonLoading={isCopyToDraftLoading}
      />

      {/* مودال تغییر وضعیت */}
      <ConfirmationModalWithContent
        isModalOpen={openChangeStatusModal}
        closeModalHandler={closeChangeStatusModalHandler}
        title="آیا از تغییر وضعیت اطمینان دارید؟"
        content={<ChangeStatusModalContent form={changeModalForm} />}
        onConfirmClickHandler={confirmChangeStatusBtnHandler}
        confirmBtnText="تایید وضعیت"
        backBtnText="انصراف"
        isConfirmButtonLoading={isDeActiveTemplateLoading}
      />

      <Div className="flex flex-col gap-10" loading={loading}>
        <div className="flex flex-col gap-6">
          {dataSource && dataSource?.countConnectedContract > 0 ? (
            <CustomAlert
              showIcon
              title={`قراردادهای متصل :${dataSource?.countConnectedContract} `}
              type="info"
              action={
                <Link
                  to={{
                    pathname: CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
                    search: makeSearchParams({ templateId: dataSource?.id }),
                  }}
                  className="text-primary-6!"
                >
                  نمایش قراردادهای متصل
                </Link>
              }
            />
          ) : (
            <CustomAlert
              showIcon
              description="هیچ قراردادی به این قالب متصل نمیباشد."
              type="error"
            />
          )}

          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="تاریخ ایجاد"
              value={dataSource?.createdDate}
              isDate
            />

            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ایجاد کننده"
              value={dataSource?.createdBy}
            />

            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="تاریخ شروع قالب قرارداد"
              value={dataSource?.startDate}
              isDate
            />

            {isArchive ? (
              <>
                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="تاریخ آخرین ویرایش"
                  value={emptyString}
                />
                <SingleVerticalWithCol
                  xl={8}
                  lg={8}
                  label="آخرین ویرایش کننده"
                  value={emptyString}
                />
              </>
            ) : null}
          </Row>
          <Row gutter={[16, 16]}>
            <Col
              xxl={2}
              xl={3}
              lg={4}
              md={6}
              sm={24}
              xs={24}
              className="flex! flex-col! justify-center"
            >
              <ContractService service={dataSource?.samimService?.name} />
            </Col>
            <Col xxl={22} xl={21} lg={20} md={18} sm={24} xs={24}>
              <Descriptions
                className="body-regular bg-neutral-2! rounded-lg p-4!"
                items={items}
                column={2}
                styles={{ label: { width: "130px" } }}
              />
            </Col>
          </Row>
        </div>

        <CustomDivider
          text={`لیست خدمات قالب (${dataSource?.beneficiaryBanner?.length})`}
          extraContent={
            <CustomSegmented
              value={viewType}
              vertical={isMobile}
              className="custom-segmented"
              options={options}
              onChange={(val) => {
                const newView = val as "card" | "table";

                setViewType(newView);

                setSearchParams({
                  ...params,
                  viewType: newView,
                });
              }}
            />
          }
        />
        <div className="flex flex-col gap-4">
          <ToolBox
            leftSide={
              <div className="flex gap-4">
                {!isArchive ? (
                  <CustomButton
                    type="primary"
                    icon={<AiOutlinePlusCircle />}
                    onClick={addNewServiceHandler}
                  >
                    افزودن خدمات قالب
                  </CustomButton>
                ) : null}

                <Dropdown menu={exportMenu} trigger={["click"]} disabled={true}>
                  <CustomButton>
                    خروجی <IoIosArrowDown />
                  </CustomButton>
                </Dropdown>
              </div>
            }
          />
          {dataSource?.beneficiaryBanner && dataSource.beneficiaryBanner.length > 0 ? (
            viewType === "table" ? (
              <TemplateServiceTableList
                data={dataSource.beneficiaryBanner}
                onRefresh={onRefresh}
                isArchive={isArchive}
              />
            ) : (
              <TemplateServiceCardList
                data={dataSource.beneficiaryBanner}
                onRefresh={onRefresh}
                isArchive={isArchive}
              />
            )
          ) : (
            <CustomEmpty />
          )}
        </div>
      </Div>
    </>
  );
};
export default ContractBasicInfoTab;
