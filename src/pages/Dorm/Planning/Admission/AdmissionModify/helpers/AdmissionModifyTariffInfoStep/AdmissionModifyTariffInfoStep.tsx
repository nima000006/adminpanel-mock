import { Key, useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomCascader from "@components/CustomInputs/CustomCascader/CustomCascader";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_ADMISSIONS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import {
  AdmissionModifyTariffInfoStepProps,
  mapItemType,
  SendCreateAdmissionResponse,
} from "./@types/@admissionModifyTariffInfoStep";

import "./_admissionModifyTariffInfoStep.scss";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormitoryTreeViewByIdQuery,
  useLazyGetAllDormitoryQuery,
  useLazyGetFloorsOfBuildingQuery,
  useLazyGetNumberInstallmentsQuery,
  useLazyGetRoomsOfFloorQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useSendCreateAdmissionMutation } from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";
import { NUMBER_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  GENERAL_REQUEST_SUCCESS,
  REPETITIVE_ADMISSION,
} from "@infra/VARS/globalToasts/globalToasts";

import AdmissionModifyTariffInfoStepTable from "./helpers/AdmissionModifyTariffInfoStepTable/AdmissionModifyTariffInfoStepTable";
import CreateAdmissionModalContent from "../../../_shared/modals/CreateAdmissionModalContent/CreateAdmissionModalContent";
import { ADMISSION_PROGRAM_MONTHLY_SCHEDULE_ID } from "../AdmissionModifyBasicInfoStep/AdmissionModifyBasicInfoStep";

const INSTALLMENT_METHOD_ID = 2;
const SELECT_TARIFF_WARNING_MESSAGE = "انتخاب تعرفه الزامی می باشد.";

const customTimeCreator = (time: dayjs.ConfigType) => {
  return dayjs(time).format("HH:mm:ss.000");
};

const AdmissionModifyTariffInfoStep = ({
  setCurrent,
  form,
  loading,
  isReject,
}: AdmissionModifyTariffInfoStepProps) => {
  const [openSubmitModal, setIsOpenSubmitModal] = useState({
    isOpen: false,
    id: -1,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState({ isOpen: false, id: -1 });
  const [isPaymentMethodInstalment, setIsPaymentMethodInstalment] = useState(false);

  const [selectedTariffKeys, setSelectedTariffKeys] = useState<Key[]>([]);

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getAllDormitory, { data: dormitoryData, isLoading: isDormitoryDataLoading }] =
    useLazyGetAllDormitoryQuery();

  const [getDormitoryTreeViewById, { data: dormTree, isLoading: isTreeViewLoading }] =
    useLazyGetDormitoryTreeViewByIdQuery();

  const [
    getNumberInstallments,
    {
      data: numberInstallmentsData,
      isLoading: isNumberInstallmentsLoading,
      isSuccess: isNumberInstallmentsSuccess,
    },
  ] = useLazyGetNumberInstallmentsQuery();

  const [
    getAllUniversity,
    {
      data: universityData,
      isLoading: isUniversityDataLoading,
      isSuccess: isUniversityDataSuccess,
    },
  ] = useLazyGetAllBranchesQuery();

  const [getFloorsOfBuilding] = useLazyGetFloorsOfBuildingQuery();

  const [getRoomsOfFloor] = useLazyGetRoomsOfFloorQuery();

  // send data
  const [sendAdmissionStepData, { isLoading: isSendAdmissionStepLoading }] =
    useSendCreateAdmissionMutation();

  //? ================================ Effects ================================

  useEffect(() => {
    getAllDormitory({ maxResults: 2000, firstResult: 0 });

    const paymentType = form?.getFieldsValue(true)?.paymentType;
    if (paymentType?.length === 1) {
      if (paymentType[0]?.code === INSTALLMENT_METHOD_ID) {
        setIsPaymentMethodInstalment(false);
      } else {
        setIsPaymentMethodInstalment(true);
      }
    }

    if (form.getFieldValue("residence")?.value) {
      getDormitoryTreeViewById({
        maxResults: 900,
        firstResult: 0,
        DormitoryId_EQ: form.getFieldValue("residence")?.value,
      });
    }
  }, []);

  const getNumberInstallmentsHandler = () => {
    if (!isNumberInstallmentsSuccess) {
      getNumberInstallments({ maxResults: 2000, firstResult: 0 });
    }
  };

  const getAllUniversityHandler = () => {
    if (!isUniversityDataSuccess) {
      getAllUniversity();
    }
  };
  useEffect(() => {
    if (isPaymentMethodInstalment && form) {
      form.setFieldsValue({
        installmentsNumber: null,
      });
    }
  }, [isPaymentMethodInstalment, form]);
  //* ================================ Util Functions ================================
  //modal handler
  const backBtnHandler = () => {
    setCurrent(0);
  };
  const admissionModifyHandler = () => {
    form?.submit();
    form.validateFields().then(() => {
      if (selectedTariffKeys.length < 1) {
        toast.error(SELECT_TARIFF_WARNING_MESSAGE, {
          toastId: "select-tariff-warning",
        });
        return;
      }
      setIsOpenSubmitModal({ isOpen: true, id: -1 });
    });
  };
  const closeModalHandler = () => {
    setIsOpenSubmitModal({ isOpen: false, id: -1 });
  };

  const transformApplicationLevel = (collectedRoomIds: number[][]) => {
    return collectedRoomIds?.map(([buildingId, floorId, roomId]) => ({
      buildingId: String(buildingId),
      floorId: String(floorId),
      roomId: String(roomId),
    }));
  };

  const submitModalHandler = async () => {
    form?.submit();

    const value = form.getFieldsValue(true);

    // handling roomId[]
    const collectedRoomIds: number[][] = [];

    const { applicationLevel } = form.getFieldsValue();

    const promises: Promise<void>[] = [];

    applicationLevel?.forEach((item: number[]) => {
      //! WITH LENGTH OF 3
      if (item?.length === 3) {
        collectedRoomIds.push(item);
      }

      //! WITH LENGTH OF 2
      if (item?.length === 2) {
        const p = getRoomsOfFloor({
          floorId_EQ: item[1],
          maxResults: 2000,
          firstResult: 0,
        })
          .unwrap()
          .then((res) => {
            res?.data?.forEach((room) => {
              collectedRoomIds.push([item[0], item[1], room.id]);
            });
          });
        promises.push(p);
      }

      //! WITH LENGTH OF 1
      if (item?.length === 1) {
        const p = getFloorsOfBuilding({
          buildingId_EQ: item[0],
          maxResults: 2000,
          firstResult: 0,
        })
          .unwrap()
          .then((res) => {
            const floorPromises = res?.data.map((floor) =>
              getRoomsOfFloor({
                floorId_EQ: floor.id,
                maxResults: 2000,
                firstResult: 0,
              })
                .unwrap()
                .then((roomRes) => {
                  roomRes?.data?.forEach((room) => {
                    collectedRoomIds.push([item[0], floor.id, room.id]);
                  });
                })
            );
            return Promise.all(floorPromises);
          });
        promises.push(p as any);
      }
    });

    await Promise.all(promises);

    await form.validateFields();

    sendAdmissionStepData({
      form: "CreateDeliverPlan",
      data: {
        ...(isReject && { id: url?.id }),
        id: null,
        title: value?.title,
        showTitle: value?.displayTitle,
        managementTypeId: value?.managementType?.code,
        branchId: value?.uni?.code,
        schedulingId: value?.timingType?.code,
        semesterId: value?.semester?.code,
        reservationTypeId: value?.reservationType?.code,
        AssociationDeliverPlanPaymenttype: value?.paymentType?.map(
          (item: mapItemType) => ({
            paymentTypeId: item?.code,
          })
        ),
        AssociationDeliverPlanPaymetMethod: value?.paymentMethod?.map(
          (item: mapItemType) => ({
            paymentMethodId: item?.code,
          })
        ),
        AssociationDeliverPlanUserGroup: value?.userGroup?.map((item: mapItemType) => ({
          userGroupId: item?.code,
        })),
        AssociationDeliverPlanNationality: value?.nationality?.map(
          (item: mapItemType) => ({
            nationalityId: item?.code,
          })
        ),
        AssociationDeliverPlanGrade: value?.educationDegree?.map((item: mapItemType) => ({
          gradeId: item?.code,
        })),
        AssociationDeliverPlanSpecialStatus: value?.specialConditions?.map(
          (item: mapItemType) => ({
            specialStatusId: item?.code,
          })
        ),
        isRequestForAnother: value?.applyingForAnother?.id,
        canDebt: value?.canDebt?.code?.toString(),
        reviewDeadline: value?.applicationReviewDeadline?.code,
        paymentDeadline: value?.paymentDeadline?.code,
        ...(value?.canDebt?.code === 1 && {
          maxDebt: value?.maxDebt ? value?.maxDebt : null,
          maxNumberInstallmentForDebt: value?.installmentMaxNumber
            ? value?.installmentMaxNumber
            : null,
        }),
        description: value?.desc ? value?.desc : null,
        appliedStartDate: value?.startDateApplied,
        reservationStartDate: value?.startDateReservation,
        residenceStartDate: value?.startDateDelivery,
        ...(value?.timingType?.code !== ADMISSION_PROGRAM_MONTHLY_SCHEDULE_ID && {
          appliedStartTime: customTimeCreator(value?.startTimeApplied),
          appliedEndTime: customTimeCreator(value?.endTimeApplied),
        }),
        reservationStartTime: customTimeCreator(value?.startTimeReservation),
        residenceStartTime: customTimeCreator(value?.startTimeDelivery),
        appliedEndDate: value?.endDateApplied,
        reservationEndDate: value?.endDateReservation,
        residenceEndDate: value?.endDateDelivery,
        reservationEndTime: customTimeCreator(value?.endTimeReservation),
        residenceEndTime: customTimeCreator(value?.endTimeDelivery),
        dormitoryId: value?.residence?.code,
        installmentNumber: value?.installmentsNumber?.code,
        percentDiscount: value?.discountPercent ? value?.discountPercent : null,
        // latePercentagepenalty: value?.latePenaltyPercent
        //   ? value?.latePenaltyPercent
        //   : null,
        fixedDiscount: value?.constDiscount ? value?.constDiscount : null,
        // fixedLatePenalty: value?.constPenaltyPercent ? value?.constPenaltyPercent : null,
        AssociationPresentationBranch: value?.unitsPresent?.map((item: mapItemType) => ({
          branchId: item?.code,
        })),
        AssociationDeliverPlanRoom: transformApplicationLevel(collectedRoomIds),
        priceListId: selectedTariffKeys[0] as number,
        descRequest: value?.description,
      },
    })
      .unwrap()
      .then(sendStepDataSuccess)
      .catch(sendStepDataCatch);
  };

  //success send request
  const sendStepDataSuccess = async (value: SendCreateAdmissionResponse) => {
    if (value?.status === 204) {
      setIsOpenSubmitModal({ isOpen: false, id: -1 });
      navigate(DORM_ADMISSIONS_LIST_PAGE_ROUTE);
      toast.success(GENERAL_REQUEST_SUCCESS);
    }
  };
  //catch send request
  const sendStepDataCatch = async (value: SendCreateAdmissionResponse) => {
    if (value?.status === 500) {
      setIsOpenSubmitModal({ isOpen: false, id: -1 });
      navigate(DORM_ADMISSIONS_LIST_PAGE_ROUTE);
      toast.error(REPETITIVE_ADMISSION);
    }
  };

  const selectedResidenceHandler = (dormId: string) => {
    if (dormId) {
      getDormitoryTreeViewById({
        maxResults: 900,
        firstResult: 0,
        DormitoryId_EQ: dormId,
      });

      form.setFieldsValue({
        applicationLevel: undefined,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {openSubmitModal && (
        <ConfirmationModalWithContent
          title="ایجاد برنامه پذیرش"
          isModalOpen={openSubmitModal?.isOpen}
          isConfirmButtonLoading={isSendAdmissionStepLoading}
          confirmBtnText="ثبت درخواست"
          customClass="dorm-pricing-step-modal-container"
          backBtnText="انصراف"
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={submitModalHandler}
          content={<CreateAdmissionModalContent form={form} />}
        />
      )}
      <Div loading={loading}>
        <Form className="admission-modify-tariff-info-step" form={form}>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                name="residence"
                label="اقامتگاه"
                options={dormitoryData?.data}
                placeholder="انتخاب کنید"
                form={form}
                onChange={(value) => selectedResidenceHandler(value as string)}
                isLoading={isDormitoryDataLoading}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInput
                type="text"
                label="درصد تخفیف (%)"
                name="discountPercent"
                placeholder="درصد تخفیف (%)"
                rules={[NUMBER_RULE]}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInput
                type="text"
                label="تخفیف ثابت (ریال)"
                name="constDiscount"
                placeholder="تخفیف ثابت (ریال)"
                rules={[NUMBER_RULE]}
              />
            </Col>
            {!isPaymentMethodInstalment && (
              <Col lg={6} md={12} sm={24} xs={24}>
                <CustomSelect
                  name="installmentsNumber"
                  label="تعداد اقساط"
                  options={isPaymentMethodInstalment ? [] : numberInstallmentsData?.data}
                  placeholder="انتخاب کنید"
                  onClick={getNumberInstallmentsHandler}
                  form={form}
                  isLoading={isNumberInstallmentsLoading}
                  rules={!isPaymentMethodInstalment ? [REQUIRED_RULE] : []}
                  disabled={isPaymentMethodInstalment}
                />
              </Col>
            )}
            {/* <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInput
                type="text"
                label="جریمه دیرکرد درصدی (%)"
                name="latePenaltyPercent"
                placeholder="جریمه دیرکرد درصدی (%)"
                rules={[NUMBER_RULE]}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInput
                type="text"
                label="جریمه دیرکرد ثابت (ریال)"
                name="constPenaltyPercent"
                placeholder="جریمه دیرکرد ثابت (ریال)"
                rules={[NUMBER_RULE]}
              />
            </Col> */}
            <Col span={24}>
              <CustomCascader
                name="applicationLevel"
                label="سطح اعمال برنامه پذیرش"
                options={dormTree as any}
                loading={isTreeViewLoading}
                // loadData={loadData}
                changeOnSelect
                multiple
                placeholder="انتخاب کنید"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={24}>
              <CustomSelect
                name="unitsPresent"
                label="ارائه به واحدهای"
                options={universityData ? universityData : []}
                placeholder="انتخاب کنید"
                onClick={getAllUniversityHandler}
                form={form}
                isLoading={isUniversityDataLoading}
                mode="multiple"
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>

          <AdmissionModifyTariffInfoStepTable
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            form={form}
            onSelectionChange={setSelectedTariffKeys}
          />

          <div className="btn-container">
            <CustomButton type="primary" ghost onClick={backBtnHandler}>
              بازگشت
            </CustomButton>
            <CustomButton type="primary" onClick={admissionModifyHandler}>
              ثبت
            </CustomButton>
          </div>
        </Form>
      </Div>
    </>
  );
};

export default AdmissionModifyTariffInfoStep;
