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
import { useGetAdmissionDetailBaseInfoMutation } from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";
import {
  useGetAdmissionTaskIdMutation,
  useLazyGetWorkSpaceAdmissionDetailQuery,
  useSubmitConfirmAndRejectAndReturnModalMutation,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { PADDING_40 } from "@infra/VARS/globalStyles/globalStyles";
import {
  AdmissionDetailBaseInfo,
  GetAdmissionDetailBaseInfoResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";

import {
  GetAdmissionTaskIdResponse,
  RequestSendingAdmissionFormData,
} from "./@types/@requestReceivedAdmissionProgram";
import WorkSpacesAdmissionTariffInfoStep from "./helper/components/WorkSpacesAdmissionTariffInfoStep/WorkSpacesAdmissionTariffInfoStep";
import {
  GetWorkSpaceAdmissionResponse,
  WorkSpaceAdmissionListType,
} from "../../../WorkSpacesList/helper/components/WorkSpacesAdmissionList/helper/@types/@workSpacesAdmissionListType";
import AdmissionProgramBasicInfo from "../../_shared/components/AdmissionProgramBasicInfo/AdmissionProgramBasicInfo";
import AdmissionProgramLevelsOfAction from "../../_shared/components/AdmissionProgramLevelsOfAction/AdmissionProgramLevelsOfAction";
import RequestAlert from "../../_shared/components/RequestAlert/RequestAlert";
import RequestDetails from "../../_shared/components/RequestDetails/RequestDetails";
import RequesterInfo from "../../_shared/components/RequesterInfo/RequesterInfo";
import {
  ACCEPT_CODE,
  REJECT_CODE,
  RequestType,
  RETURN_CODE,
  StatusMode,
} from "../../_shared/utils/WorkSpaceDetailUtils";
import { SubmitConfirmAndRejectAndReturnModalResponse } from "../RequestReceivedDormitory/@types/@requestReceivedDormitory";
import WorkSpacesAdmissionBasicInfoStep from "./helper/components/WorkSpacesAdmissionBasicInfoStep/WorkSpacesAdmissionBasicInfoStep";
import { mapAdmissionBaseInfoToFormValues } from "./helper/utils/mapAdmissionBaseInfoToFormValues";
import TariffAdmissionProgram from "../../_shared/components/TariffAdmissionProgram/TariffAdmissionProgram";
import ConfirmationModalContent from "../../_shared/modals/ConfirmationModalContent/ConfirmationModalContent";
import RejectModalContent from "../../_shared/modals/RejectModalContent/RejectModalContent";
import ReturnedModalContent from "../../_shared/modals/ReturnedModalContent/ReturnedModalContent";

import "./_requestReceivedAdmissionProgram.scss";

const RequestReceivedAdmissionProgram = () => {
  const [confirmModalOpen, setIsConfirmModalOpen] = useState({ isOpen: false, id: -1 });
  const [rejectModalOpen, setIsRejectModalOpen] = useState({ isOpen: false, id: -1 });
  const [returnedModalOpen, setIsReturnedModalOpen] = useState({ isOpen: false, id: -1 });
  const [dataSource, setDataSource] = useState<WorkSpaceAdmissionListType[]>([]);
  const [basicInfoData, setBasicInfoData] = useState<AdmissionDetailBaseInfo | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const [current, setCurrent] = useState(0);

  const [confirmForm] = Form.useForm<{ description: string }>();
  const [rejectForm] = Form.useForm<{ description: string }>();
  const [returnedForm] = Form.useForm<{ description: string }>();
  const [form] = Form.useForm<RequestSendingAdmissionFormData>();

  const {
    params: { id, type },
  } = useQueryParams();

  const isWaiting = status === StatusMode.waiting;

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_WORK_SPACES_LIST_PAGE_ROUTE}>کار پوشه</Link>,
      },
      ...(id
        ? [
            {
              title: `درخواست شماره ${id}`,
            },
          ]
        : []),
    ],
  });

  //? ================================  Api Calls ================================
  const [getAdmissionDetail, { isFetching: isAdmissionDetailLoading }] =
    useLazyGetWorkSpaceAdmissionDetailQuery();

  const [getAdmissionTaskId] = useGetAdmissionTaskIdMutation();

  const [submitModal, { isLoading: isSubmitModalLoading }] =
    useSubmitConfirmAndRejectAndReturnModalMutation();

  const [getAdmissionDetailBaseInfo, { isLoading: isAdmissionDetailBaseInfoLoading }] =
    useGetAdmissionDetailBaseInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAdmissionDetail(id).unwrap().then(getAdmissionDetailIsSuccess);
      getDetailData(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  //success
  const getAdmissionDetailIsSuccess = (values: GetWorkSpaceAdmissionResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
      setStatus(values?.data[0]?.statusId);
    }
  };

  const getDetailData = (id: string) => {
    getAdmissionDetailBaseInfo({
      _data_: {
        id: id,
      },
    })
      .unwrap()
      .then(getAdmissionDetailBaseInfoSuccess);
  };

  // Success
  const getAdmissionDetailBaseInfoSuccess = async (
    value: GetAdmissionDetailBaseInfoResponse
  ) => {
    if (value?.status === 200) {
      setBasicInfoData(value?.data);
      const formValues = mapAdmissionBaseInfoToFormValues(value.data);
      // Only set fields if form is initialized and formValues is an object
      if (
        form &&
        typeof form.setFieldsValue === "function" &&
        formValues &&
        typeof formValues === "object"
      ) {
        form.setFieldsValue(formValues as Partial<RequestSendingAdmissionFormData>);
      }
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

  const requestStatusHandler = (desc: string, code: string) => {
    if (id) {
      getAdmissionTaskId({
        processVariables: [{ name: "id", operator: "eq", value: +id }],
      })
        .unwrap()
        .then((value) => getAdmissionTaskIdIsSuccess(value, desc, code));
    }
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

  //success
  const getAdmissionTaskIdIsSuccess = async (
    value: GetAdmissionTaskIdResponse,
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
        .then((value) => AdmissionRequestsStatusSuccess(value, code));
    }
  };

  const AdmissionRequestsStatusSuccess = (
    value: SubmitConfirmAndRejectAndReturnModalResponse,
    code: string
  ) => {
    if (value?.status === 204) {
      if (code === ACCEPT_CODE) {
        confirmForm.resetFields();
        closeConfirmationModalHandler();
      } else if (code === REJECT_CODE) {
        rejectForm.resetFields();
        closeRejectModalHandler();
      } else {
        returnedForm.resetFields();
        closeReturnedModalHandler();
      }
      if (id) {
        getAdmissionDetail(id).unwrap().then(getAdmissionDetailIsSuccess);
      }
    }
  };
  //? ================================ Components ================================
  // tab item
  const items = [
    {
      key: "1",
      label: "اطلاعات اولیه",
      children: (
        <AdmissionProgramBasicInfo
          data={basicInfoData}
          loading={isAdmissionDetailBaseInfoLoading}
        />
      ),
    },
    {
      key: "2",
      label: "سطوح اعمال",
      children: (
        <AdmissionProgramLevelsOfAction
          data={basicInfoData}
          loading={isAdmissionDetailBaseInfoLoading}
        />
      ),
    },
    {
      key: "3",
      label: "تعرفه",
      children: <TariffAdmissionProgram data={basicInfoData} />,
    },
    // todo:[shirin]: api not ready
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
        <WorkSpacesAdmissionBasicInfoStep
          setCurrent={setCurrent}
          form={form}
          loading={isAdmissionDetailBaseInfoLoading}
          data={getDetailData}
          setEditMode={setEditMode}
        />
      ),
    },
    {
      id: "2",
      children: (
        <WorkSpacesAdmissionTariffInfoStep
          setCurrent={setCurrent}
          form={form}
          loading={isAdmissionDetailBaseInfoLoading}
          data={getDetailData}
          setEditMode={setEditMode}
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
              onConfirmClickHandler={submitConfirmationModalHandler}
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
              onConfirmClickHandler={submitRejectModalHandler}
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
              onConfirmClickHandler={submitReturnedModalHandler}
              content={<ReturnedModalContent form={returnedForm} />}
              customClass="work-spaces-returned-modal"
            />
          )}
        </>
      ) : null}

      <div className="work-spaces-request-received-admission-program-container">
        <CustomCard
          padding={PADDING_40}
          loading={isAdmissionDetailLoading}
          className="request-received-admission-program-wrapper"
        >
          <RequestAlert status={status} />
          <RequestDetails data={dataSource} />
          <RequesterInfo data={dataSource} />

          {/* اگر از حالت در انتظار بررسی امدیم این دکمه ها نمایش داده شود */}
          {isWaiting && !editMode ? (
            <div className="btn-container">
              <div className="lef-side-btn-wrapper">
                <CustomButton type="primary" danger onClick={rejectRequestHandler}>
                  رد درخواست
                </CustomButton>
                <CustomButton type="primary" onClick={confirmRequestHandler}>
                  تأیید درخواست
                </CustomButton>
              </div>
              {/* اگر نوع درخواست ها ایجاد بود این دکمه ها نمایش داده شود و اگر نوع درخواست غیر فعال کردن بود این دکمه ها نمایش داده نمیشود. */}
              {+type === RequestType?.createAdmission ? (
                <div className="right-side-btn-wrapper">
                  <CustomButton type="dashed" onClick={editRequestHandler}>
                    ویرایش
                  </CustomButton>
                  <CustomButton
                    type="primary"
                    className="disable-hover"
                    isWarning
                    onClick={returnedRequestHandler}
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
            <Form form={form}>
              <Steps
                type="navigation"
                current={current}
                className="site-navigation-steps-container"
                items={[
                  {
                    status: stepStatusCreator(current, 0),
                    title: "اطلاعات اولیه",
                  },
                  {
                    status: stepStatusCreator(current, 1),
                    title: "تعرفه و سطوح اعمال",
                  },
                ]}
              />
              {stepsItem[current].children}
            </Form>
          ) : (
            <Tabs
              defaultActiveKey="1"
              items={items}
              type="card"
              className="request-received-admission-program-tab"
            />
          )}
        </CustomCard>
      </div>
    </>
  );
};
export default RequestReceivedAdmissionProgram;
