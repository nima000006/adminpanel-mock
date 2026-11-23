import { useEffect, useState } from "react";

import { Form, Steps, Tabs } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_WORK_SPACES_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetPricingStepCountQuery,
  useLazyGetPricingStepQuery,
  useLazyGetTariffBasicInfoCopyDetailQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import {
  useGetTariffTaskIdMutation,
  useLazyGetWorkSpaceTariffDetailQuery,
  useSubmitConfirmAndRejectAndReturnModalMutation,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { PADDING_40 } from "@infra/VARS/globalStyles/globalStyles";
import {
  GetPricingStepData,
  GetPricingStepResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

import { GetTariffTaskIdResponse } from "./@types/@requestReceivedTariff";
import {
  BaseModalFormValues,
  MainFormValues,
} from "./helper/@types/@requestReceivedTariff";
import BasicInfoStep from "./helper/components/BasicInfoStep/BasicInfoStep";
import PricingStep from "./helper/components/PricingStep/PricingStep";
import {
  GetWorkSpaceTariffResponse,
  WorkSpaceTariffListType,
} from "../../../WorkSpacesList/helper/components/WorkSpacesTariffList/helper/@types/@workSpaceTariffListType";
import RequestAlert from "../../_shared/components/RequestAlert/RequestAlert";
import RequestDetails from "../../_shared/components/RequestDetails/RequestDetails";
import RequesterInfo from "../../_shared/components/RequesterInfo/RequesterInfo";
import TariffAdmissionSchedule from "../../_shared/components/TariffAdmissionSchedule/TariffAdmissionSchedule";
import TariffBasicInfo from "../../_shared/components/TariffBasicInfo/TariffBasicInfo";
import TariffPricing from "../../_shared/components/TariffPricing/TariffPricing";
import ConfirmationModalContent from "../../_shared/modals/ConfirmationModalContent/ConfirmationModalContent";
import RejectModalContent from "../../_shared/modals/RejectModalContent/RejectModalContent";
import ReturnedModalContent from "../../_shared/modals/ReturnedModalContent/ReturnedModalContent";
import {
  ACCEPT_CODE,
  REJECT_CODE,
  RequestType,
  RETURN_CODE,
  StatusMode,
} from "../../_shared/utils/WorkSpaceDetailUtils";
import { SubmitConfirmAndRejectAndReturnModalResponse } from "../RequestReceivedDormitory/@types/@requestReceivedDormitory";

import "./_requestReceivedTariff.scss";

const RequestReceivedTariff = () => {
  const [confirmModalOpen, setIsConfirmModalOpen] = useState({ isOpen: false, id: -1 });
  const [rejectModalOpen, setIsRejectModalOpen] = useState({ isOpen: false, id: -1 });
  const [returnedModalOpen, setIsReturnedModalOpen] = useState({ isOpen: false, id: -1 });
  const [status, setStatus] = useState<number>(0);
  const [dataSource, setDataSource] = useState<WorkSpaceTariffListType[]>([]);
  const [priceData, setPriceData] = useState<GetPricingStepData[]>();
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isSemester, setIsSemester] = useState<boolean>(false);

  const [confirmForm] = Form.useForm<BaseModalFormValues>();
  const [rejectForm] = Form.useForm<BaseModalFormValues>();
  const [returnedForm] = Form.useForm<BaseModalFormValues>();
  const [form] = Form.useForm<MainFormValues>();

  const { params: url, setSearchParams } = useQueryParams();

  const isWaiting = status === StatusMode.waiting;

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_WORK_SPACES_LIST_PAGE_ROUTE}>کار پوشه</Link>,
      },
      ...(url.id
        ? [
            {
              title: `درخواست شماره ${url.id}`,
            },
          ]
        : []),
    ],
  });

  //? ================================  Api Calls ================================
  const [getTariffDetail, { isFetching: isTariffDetailLoading }] =
    useLazyGetWorkSpaceTariffDetailQuery();

  // get basic info detail
  const [
    getBasicInfoDetail,
    { data: basicInfoDetailData, isFetching: isBasicInfoDetailLoading },
  ] = useLazyGetTariffBasicInfoCopyDetailQuery();

  //get pricing detail
  const [getPricingTab, { isFetching: getPricingTabLoading }] =
    useLazyGetPricingStepQuery();

  const [
    getPricingStepCount,
    { data: getPricingTabCountData, isFetching: getPricingTabCountLoading },
  ] = useLazyGetPricingStepCountQuery();

  const [getTariffTaskId] = useGetTariffTaskIdMutation();

  const [submitModal, { isLoading: isSubmitModalLoading }] =
    useSubmitConfirmAndRejectAndReturnModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url.id) {
      getTariffDetail(url.id).unwrap().then(getTariffDetailIsSuccess);
      basicInfoGetData(url.id);
    }
  }, [url.id]);

  useEffect(() => {
    pricingGetData(url.id);

    // get count
    getPricingStepCount({ priceListId_EQ: +url.id });
  }, [url.id, url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  const basicInfoGetData = (id: string) => {
    getBasicInfoDetail({ id_EQ: +id, firstResult: 0, maxResults: 50 });
  };

  const pricingGetData = (id: string) => {
    getPricingTab({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      priceListId_EQ: +id,
    })
      .unwrap()
      .then(getPricingTabIsSuccess);
  };

  //success
  const getTariffDetailIsSuccess = (values: GetWorkSpaceTariffResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
      setStatus(values?.data[0]?.statusId);
    }
  };

  const getPricingTabIsSuccess = (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setPriceData(value?.data);
    }
  };
  // btn handler
  const confirmRequestHandler = () => {
    setIsConfirmModalOpen({ isOpen: true, id: -1 });
  };
  const rejectRequestHandler = () => {
    setIsRejectModalOpen({ isOpen: true, id: -1 });
  };
  const returnedRequestHandler = () => {
    setIsReturnedModalOpen({ isOpen: true, id: -1 });
  };
  const editRequestHandler = () => {
    setEditMode(true);
  };

  // confirmation modal handler
  const submitConfirmationModalHandler = () => {
    confirmForm?.submit?.();
    confirmForm.validateFields().then(() => {
      requestStatusHandler(confirmForm?.getFieldValue("description"), ACCEPT_CODE);
    });
  };

  const closeConfirmationModalHandler = () => {
    setIsConfirmModalOpen({ isOpen: false, id: -1 });
  };

  // reject modal handler
  const submitRejectModalHandler = () => {
    rejectForm?.submit?.();
    rejectForm.validateFields().then(() => {
      requestStatusHandler(rejectForm?.getFieldValue("description"), REJECT_CODE);
    });
  };
  const closeRejectModalHandler = () => {
    setIsRejectModalOpen({ isOpen: false, id: -1 });
  };

  // returned modal handler
  const submitReturnedModalHandler = () => {
    returnedForm?.submit?.();
    returnedForm.validateFields().then(() => {
      requestStatusHandler(returnedForm?.getFieldValue("description"), RETURN_CODE);
    });
  };
  const closeReturnedModalHandler = () => {
    setIsReturnedModalOpen({ isOpen: false, id: -1 });
  };

  const requestStatusHandler = (desc: string, code: string) => {
    if (url.id) {
      getTariffTaskId({
        processVariables: [{ name: "id", operator: "eq", value: +url.id }],
      })
        .unwrap()
        .then((value) => getTariffTaskIdIsSuccess(value, desc, code));
    }
  };

  const getTariffTaskIdIsSuccess = async (
    value: GetTariffTaskIdResponse,
    desc: string,
    code: string
  ) => {
    if (value?.status === 200) {
      submitModal({
        body: {
          variables: {
            validation: {
              value: code,
            },
            descriptionAdmin: {
              value: desc,
            },
          },
        },
        statusCode: value?.data?.[0]?.id,
      })
        .unwrap()
        .then((value) => TariffRequestsStatusSuccess(value, code));
    }
  };

  const TariffRequestsStatusSuccess = (
    value: SubmitConfirmAndRejectAndReturnModalResponse,
    code: string
  ) => {
    if (value?.status === 204) {
      if (code === ACCEPT_CODE) {
        confirmForm.resetFields();
        closeConfirmationModalHandler();
        setSearchParams({ ...url, status: String(StatusMode?.answered) });
      } else if (code === REJECT_CODE) {
        rejectForm.resetFields();
        closeRejectModalHandler();
        setSearchParams({ ...url, status: String(StatusMode?.rejected) });
      } else {
        returnedForm.resetFields();
        closeReturnedModalHandler();
        setSearchParams({ ...url, status: String(StatusMode?.returned) });
      }
      if (url.id) {
        getTariffDetail(url.id).unwrap().then(getTariffDetailIsSuccess);
      }
    }
  };
  //? ================================ Components  ================================
  // tab item
  const items = [
    {
      key: "1",
      label: "اطلاعات اولیه",
      children: (
        <TariffBasicInfo data={basicInfoDetailData} loading={isBasicInfoDetailLoading} />
      ),
    },
    {
      key: "2",
      label: "قیمت گذاری",
      children: (
        <TariffPricing
          data={priceData}
          loading={getPricingTabLoading || getPricingTabCountLoading}
          countData={getPricingTabCountData?.data}
        />
      ),
    },
    {
      key: "3",
      label: "برنامه پذیرش‌ها",
      children: <TariffAdmissionSchedule data={dataSource} />,
    },
    // todo[shirin]:"api not ready"
    // {
    //   key: "4",
    //   label: "تاریخچه تغییرات",
    //   children: <TariffChangeHistory />,
    // },
  ];

  //steps item
  const stepsItem = [
    {
      id: "1",
      children: (
        <BasicInfoStep
          setCurrentStep={setCurrent}
          setEditMode={setEditMode}
          form={form}
        />
      ),
    },
    {
      id: "2",
      children: (
        <PricingStep
          setCurrentStep={setCurrent}
          setEditMode={setEditMode}
          BasicInfoData={basicInfoGetData}
          pricingData={pricingGetData}
          form={form}
          isSemester={isSemester}
          setIsSemester={setIsSemester}
        />
      ),
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* اگر از حالت در انتظار بررسی امدیم این مودال ها رندر شود */}
      {isWaiting && !editMode ? (
        <>
          {/* CONFIRM REQUEST MODAL */}
          {confirmModalOpen?.isOpen && (
            <ConfirmationModalWithContent
              title="تأیید درخواست"
              isModalOpen={confirmModalOpen?.isOpen}
              isConfirmButtonLoading={isSubmitModalLoading}
              confirmBtnText="تأیید درخواست"
              backBtnText="انصراف"
              closeModalHandler={closeConfirmationModalHandler}
              onConfirmClickHandler={() => submitConfirmationModalHandler()}
              content={<ConfirmationModalContent form={confirmForm} />}
            />
          )}

          {/* REJECT REQUEST MODAL */}
          {rejectModalOpen?.isOpen && (
            <ConfirmationModalWithContent
              title="رد درخواست"
              isModalOpen={rejectModalOpen?.isOpen}
              isConfirmButtonLoading={isSubmitModalLoading}
              confirmBtnText="رد درخواست"
              backBtnText="انصراف"
              isDangerous={true}
              closeModalHandler={closeRejectModalHandler}
              onConfirmClickHandler={() => submitRejectModalHandler()}
              content={<RejectModalContent form={rejectForm} />}
            />
          )}

          {/* RETURNED REQUEST HANDLER */}
          {returnedModalOpen?.isOpen && (
            <ConfirmationModalWithContent
              title="عودت درخواست"
              isModalOpen={returnedModalOpen?.isOpen}
              isConfirmButtonLoading={isSubmitModalLoading}
              confirmBtnText="عودت درخواست"
              backBtnText="انصراف"
              isDangerous={true}
              closeModalHandler={closeReturnedModalHandler}
              onConfirmClickHandler={() => submitReturnedModalHandler()}
              content={<ReturnedModalContent form={returnedForm} />}
              customClass="work-spaces-returned-modal"
            />
          )}
        </>
      ) : null}

      <div className="work-spaces-request-received-tariff-container">
        <CustomCard
          padding={PADDING_40}
          loading={isTariffDetailLoading}
          className="request-received-tariff-wrapper"
        >
          <RequestAlert status={status} />
          <RequestDetails data={dataSource} />
          <RequesterInfo data={dataSource} />
          {/* اگر از حالت در انتظار بررسی امدیم این دکمه ها نمایش داده شود */}
          {isWaiting && !editMode ? (
            <div className="btn-container">
              <div className="lef-side-btn-wrapper">
                <CustomButton type="primary" onClick={confirmRequestHandler}>
                  تأیید درخواست
                </CustomButton>
                <CustomButton type="primary" danger onClick={rejectRequestHandler}>
                  رد درخواست
                </CustomButton>
              </div>
              {/* اگر نوع درخواست ها ایجاد بود این دکمه ها نمایش داده شود و اگر نوع درخواست غیر فعال کردن بود این دکمه ها نمایش داده نمیشود. */}
              {+url.type === RequestType?.createTariff ? (
                <div className="right-side-btn-wrapper">
                  <CustomButton type="dashed" onClick={editRequestHandler}>
                    ویرایش
                  </CustomButton>
                  <CustomButton
                    type="primary"
                    isWarning
                    onClick={returnedRequestHandler}
                    className="disable-hover"
                  >
                    عودت
                  </CustomButton>
                </div>
              ) : null}
            </div>
          ) : null}
        </CustomCard>
        <CustomCard padding={PADDING_40}>
          {editMode ? (
            <div className="dorm-tariff-steps-page-container">
              <Steps
                type="navigation"
                current={current}
                className="site-navigation-steps"
                items={[
                  {
                    status: stepStatusCreator(current, 0),
                    title: "اطلاعات اولیه",
                  },
                  {
                    status: stepStatusCreator(current, 1),
                    title: "قیمت گذاری",
                  },
                ]}
              />
              {stepsItem[current].children}
            </div>
          ) : (
            <Tabs
              defaultActiveKey="1"
              items={items}
              type="card"
              className="request-received-tariff-tab"
            />
          )}
        </CustomCard>
      </div>
    </>
  );
};
export default RequestReceivedTariff;
