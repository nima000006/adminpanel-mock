import { useEffect, useState } from "react";

import { Form } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_WORK_SPACES_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useGetDormitoryTaskIdMutation,
  useLazyGetWorkSpaceDormSendingDetailQuery,
  useSubmitConfirmAndRejectAndReturnModalMutation,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { useGetResidenceDetailInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { PADDING_40 } from "@infra/VARS/globalStyles/globalStyles";
import {
  GetResidenceDetailInfoResponse,
  ResidenceDetailInfoType,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/DividerExtraContent/helper/drawers/ResidenceDetailDrawerContent/@types/@residenceDetailDrawerContent";

import {
  GetDormitoryTaskIdResponse,
  SubmitConfirmAndRejectAndReturnModalResponse,
  ResidenceFormType,
} from "./@types/@requestReceivedDormitory";
import ResidenceDetailsEditable from "./helper/components/ResidenceDetailsEditable/ResidenceDetailsEditable";
import {
  GetWorkSpaceDormListResponse,
  WorkSpaceDormListType,
} from "../../../WorkSpacesList/helper/components/WorkSpacesDormList/helper/@types/@workSpaceDormListType";
import RequestAlert from "../../_shared/components/RequestAlert/RequestAlert";
import RequestDetails from "../../_shared/components/RequestDetails/RequestDetails";
import RequesterInfo from "../../_shared/components/RequesterInfo/RequesterInfo";
import ResidenceDetails from "../../_shared/components/ResidenceDetails/ResidenceDetails";
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

import "./_requestReceivedDormitory.scss";

const RequestReceivedDormitory = () => {
  const [confirmModalOpen, setIsConfirmModalOpen] = useState({ isOpen: false, id: -1 });
  const [rejectModalOpen, setIsRejectModalOpen] = useState({ isOpen: false, id: -1 });
  const [returnedModalOpen, setIsReturnedModalOpen] = useState({ isOpen: false, id: -1 });
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<WorkSpaceDormListType[]>([]);
  const [residenceData, setResidenceData] = useState<ResidenceDetailInfoType>();
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [confirmForm] = Form.useForm<{ description: string }>();
  const [rejectForm] = Form.useForm<{ description: string }>();
  const [returnedForm] = Form.useForm<{ description: string }>();
  const [formResidence] = Form.useForm<ResidenceFormType>();
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
  const [getDormDetail, { isFetching: isDormDetailLoading }] =
    useLazyGetWorkSpaceDormSendingDetailQuery();

  const [getResidenceData, { isLoading: isResidenceDataLoading }] =
    useGetResidenceDetailInfoMutation();

  const [getDormitoryTaskId] = useGetDormitoryTaskIdMutation();

  const [submitModal, { isLoading: isSubmitModalLoading }] =
    useSubmitConfirmAndRejectAndReturnModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url.id) {
      getDormDetail(url.id).unwrap().then(getDormDetailIsSuccess);
      // residence detail
      getData();
    }
  }, [url.id]);

  //* ================================ Util Functions ================================
  const getData = () => {
    getResidenceData({
      body: {
        _data_: {
          id: url.id,
        },
      },
      params: {
        relation: "5f44b082bfb44d06a41bede67df07750", // we should set this for getting data
      },
    })
      .unwrap()
      .then(getResidenceDataSuccess);
  };

  //success
  const getDormDetailIsSuccess = (values: GetWorkSpaceDormListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
      setStatus(values?.data[0]?.statusId);
    }
  };

  const getResidenceDataSuccess = async (value: GetResidenceDetailInfoResponse) => {
    if (value?.status === 200) {
      setResidenceData(value?.data);

      const placesDesc = value?.data?.AssociationPlacesAndDormitories?.map((item) => ({
        [`description${item?.AssociationCategoryPlaces?.id}`]: item?.description,
      }));

      formResidence.setFieldsValue({
        residenceName: value?.data?.title,
        residenceType: selectDefaultValueGenerator(
          value?.data?.AssociationAccommodationType
        ),
        quality: selectDefaultValueGenerator(value?.data?.AssociationQuality),
        capacity: value?.data?.nominalCapacity,
        branch: selectDefaultValueGenerator(value?.data?.AssociationBranch),
        gender: selectDefaultValueGenerator(value?.data?.AssociationGender),
        province: selectDefaultValueGenerator(
          value?.data?.AssociationRegion?.AssociationRegionType
        ),
        city: selectDefaultValueGenerator(value?.data?.AssociationRegion),
        postalCode: value?.data?.zipCode,
        phone: value?.data?.phoneNumber,
        address: value?.data?.address,
        description: value?.data?.description,
        status: selectDefaultValueGenerator(value?.data?.AssociationRecordStatus),
        ...placesDesc.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
      });

      setSelectedRowKeys(
        value?.data?.AssociationPlacesAndDormitories?.map(
          (item) => item?.AssociationCategoryPlaces?.id
        ) || []
      );

      setLat(value?.data?.latitude);
      setLng(value?.data?.longitude);
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
      getDormitoryTaskId({
        processVariables: [{ name: "id", operator: "eq", value: +url.id }],
      })
        .unwrap()
        .then((value) => getDormitoryTaskIdIsSuccess(value, desc, code));
    }
  };

  const getDormitoryTaskIdIsSuccess = async (
    value: GetDormitoryTaskIdResponse,
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
        .then((value) => dormRequestsStatusSuccess(value, code));
    }
  };

  const dormRequestsStatusSuccess = (
    value: SubmitConfirmAndRejectAndReturnModalResponse,
    code: string
  ) => {
    if (value?.status === 204) {
      if (code === ACCEPT_CODE) {
        confirmForm.resetFields();
        closeConfirmationModalHandler();
        setSearchParams({
          ...url,
          status: String(StatusMode?.answered),
        });
      } else if (code === REJECT_CODE) {
        rejectForm.resetFields();
        closeRejectModalHandler();
        setSearchParams({
          ...url,
          status: String(StatusMode?.rejected),
        });
      } else {
        returnedForm.resetFields();
        closeReturnedModalHandler();
        setSearchParams({
          ...url,
          status: String(StatusMode?.returned),
        });
      }
      if (url.id) {
        getDormDetail(url.id).unwrap().then(getDormDetailIsSuccess);
      }
    }
  };

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

      <div className="work-spaces-request-received-dormitory-container">
        <CustomCard
          padding={PADDING_40}
          loading={isDormDetailLoading}
          className="request-received-dormitory-wrapper"
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
              {+url.type === RequestType?.createDorm ? (
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
            <ResidenceDetailsEditable
              form={formResidence}
              setLat={setLat}
              lat={lat}
              setLng={setLng}
              lng={lng}
              loading={isResidenceDataLoading}
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={setSelectedRowKeys}
              residenceData={residenceData}
              setEditMode={setEditMode}
              getData={getData}
            />
          ) : (
            <ResidenceDetails
              setLat={setLat}
              lat={lat}
              setLng={setLng}
              lng={lng}
              loading={isResidenceDataLoading}
              data={residenceData}
            />
          )}
        </CustomCard>
      </div>
    </>
  );
};
export default RequestReceivedDormitory;
