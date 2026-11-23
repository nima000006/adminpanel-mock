import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { Key } from "antd/es/table/interface";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomCascader from "@components/CustomInputs/CustomCascader/CustomCascader";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { mapItemType } from "./@types/@workSpacesAdmissionTariffInfoStep";
import { WorkSpacesAdmissionStepProps } from "../../../@types/@requestReceivedAdmissionProgram";

import "./_workSpacesAdmissionTariffInfoStep.scss";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormitoryTreeViewByIdQuery,
  useLazyGetAllDormitoryQuery,
  useLazyGetFloorsOfBuildingQuery,
  useLazyGetNumberInstallmentsQuery,
  useLazyGetRoomsOfFloorQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetApplicableTariffsCountQuery,
  useLazyGetApplicableTariffsQuery,
  useSendCreateAdmissionMutation,
} from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { SUCCESS_EDIT_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import {
  GetApplicableTariffsData,
  GetApplicableTariffsResponse,
  SendCreateAdmissionResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/helpers/AdmissionModifyTariffInfoStep/@types/@admissionModifyTariffInfoStep";

import WorkSpacesAdmissionTariffInfoStepDrawerContent from "../../drawer/WorkSpacesAdmissionTariffInfoStepDrawerContent/WorkSpacesAdmissionTariffInfoStepDrawerContent";
import WorkSpacesAdmissionTariffTableModel from "../../models/WorkSpacesAdmissionTariffTableModel/WorkSpacesAdmissionTariffTableModel";

const INSTALLMENT_METHOD_ID = 2;
const ACTIVE_TARIFFS_ERROR_MSG = "انتخاب تعرفه الزامی می باشد.";

const WorkSpacesAdmissionTariffInfoStep = ({
  setCurrent,
  form,
  data,
  loading,
  setEditMode,
}: WorkSpacesAdmissionStepProps) => {
  const [isPaymentMethodInstalment, setIsPaymentMethodInstalment] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [dataSource, setDataSource] = useState<GetApplicableTariffsData[]>();
  const [isDrawerOpen, setIsDrawerOpen] = useState({ isOpen: false, id: -1 });

  const { params: url, setSearchParams } = useQueryParams();

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

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

  const [getApplicableTariffs, { isFetching: getApplicableTariffsLoading }] =
    useLazyGetApplicableTariffsQuery();

  const [
    getApplicableTariffsCount,
    { data: getApplicableTariffsCountData, isFetching: getApplicableTariffsCountLoading },
  ] = useLazyGetApplicableTariffsCountQuery();
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

  const dormitoryId = form.getFieldValue("residence")?.code;
  const schedulingId = form.getFieldValue("timingType")?.code;

  useEffect(() => {
    getApplicableTariffs({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      dormitoryId,
      schedulingId,
    })
      .unwrap()
      .then(getApplicableTariffsIsSuccess);

    // get count
    getApplicableTariffsCount({ dormitoryId, schedulingId });
    // }
  }, [dormitoryId, schedulingId, url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  // success
  const getApplicableTariffsIsSuccess = (value: GetApplicableTariffsResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

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

  // btn handler
  const backBtnHandler = () => {
    setCurrent(0);
  };

  // drawer handler
  const viewTableClickHandler = (id: number) => {
    setIsDrawerOpen({ isOpen: true, id });
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen({ isOpen: false, id: -1 });
  };

  const value = form.getFieldsValue(true);

  const transformApplicationLevel = (collectedRoomIds: number[][]) => {
    return collectedRoomIds?.map(([buildingId, floorId, roomId]) => ({
      buildingId: String(buildingId),
      floorId: String(floorId),
      roomId: String(roomId),
    }));
  };

  const admissionSubmitHandler = async () => {
    if (selectedRowKeys.length === 0)
      return toast.error(ACTIVE_TARIFFS_ERROR_MSG, { toastId: ACTIVE_TARIFFS_ERROR_MSG });
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
        promises.push(p as unknown as Promise<void>);
      }
    });

    await Promise.all(promises);

    await form.validateFields();
    sendAdmissionStepData({
      form: "CreateDeliverPlan",
      data: {
        id: +url?.id,
        title: value?.title,
        showTitle: value?.displayTitle,
        semesterId: value?.semester?.code,
        managementTypeId: value?.managementType?.code,
        branchId: value?.uni?.code,
        schedulingId: value?.timingType?.code,
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
        isRequestForAnother: value?.applyingForAnother?.value,
        canDebt: value?.canDebt?.value,
        reviewDeadline: value?.applicationReviewDeadline?.code,
        paymentDeadline: value?.paymentDeadline?.code,
        maxDebt: value?.maxDebt ? value?.maxDebt : null,
        maxNumberInstallmentForDebt: value?.installmentMaxNumber
          ? value?.installmentMaxNumber
          : null,
        description: value?.desc ? value?.desc : null,
        appliedStartDate: value?.startDateApplied,
        reservationStartDate: value?.startDateReservation,
        residenceStartDate: value?.startDateDelivery,
        extensionStartDate: value?.startDateExtension,
        appliedStartTime: value?.startTimeApplied,
        reservationStartTime: value?.startTimeReservation,
        residenceStartTime: value?.startTimeDelivery,
        extensionStartTime: value?.startTimeExtension,
        appliedEndDate: value?.endDateApplied,
        reservationEndDate: value?.endDateReservation,
        residenceEndDate: value?.endDateDelivery,
        extensionEndDate: value?.endDateExtension,
        appliedEndTime: value?.endTimeApplied,
        reservationEndTime: value?.endTimeReservation,
        residenceEndTime: value?.endTimeDelivery,
        extensionEndTime: value?.endTimeExtension,
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
        priceListId: selectedRowKeys[0] as number,
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
      setEditMode(false);
      toast.success(SUCCESS_EDIT_MESSAGE);
      setCurrent(0);
      data(url?.id);
    }
  };
  //catch send request
  const sendStepDataCatch = async (value: SendCreateAdmissionResponse) => {
    if (value?.status === 500) {
      setEditMode(false);
      setCurrent(0);
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
      {isDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <WorkSpacesAdmissionTariffInfoStepDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={isDrawerOpen?.id}
            />
          }
        />
      )}
      <Div loading={loading}>
        <Form
          className="request-sending-admission-tariff-info-step-container"
          form={form}
        >
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
              <CustomInputNumber
                type="text"
                label="درصد تخفیف (%)"
                name="discountPercent"
                placeholder="درصد تخفیف (%)"
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInputNumber
                type="text"
                label="تخفیف ثابت (ریال)"
                name="constDiscount"
                placeholder="تخفیف ثابت (ریال)"
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomSelect
                name="installmentsNumber"
                label="تعداد اقساط"
                options={numberInstallmentsData?.data}
                placeholder="انتخاب کنید"
                onClick={getNumberInstallmentsHandler}
                form={form}
                isLoading={isNumberInstallmentsLoading}
                rules={!isPaymentMethodInstalment ? [REQUIRED_RULE] : []}
                disabled={isPaymentMethodInstalment}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInputNumber
                type="text"
                label="جریمه دیرکرد درصدی (%)"
                name="latePenaltyPercent"
                placeholder="جریمه دیرکرد درصدی (%)"
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInputNumber
                type="text"
                label="جریمه دیرکرد ثابت (ریال)"
                name="constPenaltyPercent"
                placeholder="جریمه دیرکرد ثابت (ریال)"
              />
            </Col>
            <Col span={24}>
              <CustomCascader
                name="applicationLevel"
                label="سطح اعمال برنامه پذیرش"
                options={dormTree as any}
                loading={isTreeViewLoading}
                changeOnSelect
                multiple
                placeholder="انتخاب کنید"
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

          <div>
            <CustomDivider text="تعرفه‌های فعال قابل استفاده" />
            <ToolBox
              className="work-spaces-list-toolbox"
              leftSide={
                <div className="left-side">
                  <CustomButton type="primary" ghost disabled>
                    خروجی اکسل
                  </CustomButton>
                </div>
              }
              rightSide={
                <>
                  <CustomInput
                    suffix={<AiOutlineSearch />}
                    placeholder="جستجو"
                    hasVerticalLabel={false}
                    disabled
                  />
                  <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
                    فیلتر پیشرفته
                  </CustomButton>
                </>
              }
            />
            <CustomTable
              dataSource={dataSource}
              rowKey="id"
              loading={getApplicableTariffsLoading || getApplicableTariffsCountLoading}
              columns={WorkSpacesAdmissionTariffTableModel({ viewTableClickHandler })}
              pagination={manualPaginationConfig({
                total: getApplicableTariffsCountData?.data,
                onChange: (page, pageSize) => {
                  setSearchParams({
                    ...url,
                    page: page?.toString(),
                    pageSize: pageSize?.toString(),
                  });
                },
                pageNumber: url?.page ? Number(url?.page) : 1,
                defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
              })}
              rowSelection={{
                type: "radio",
                ...rowSelection,
              }}
              key={`table-${url?.pageSize || "8"} `}
              {...TABLE_PROPS(dataSource?.length || 0)}
            />
          </div>

          <div className="btn-wrapper">
            <CustomButton type="primary" ghost onClick={backBtnHandler}>
              بازگشت
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={admissionSubmitHandler}
              loading={isSendAdmissionStepLoading}
            >
              ثبت تغییرات
            </CustomButton>
          </div>
        </Form>
      </Div>
    </>
  );
};
export default WorkSpacesAdmissionTariffInfoStep;
