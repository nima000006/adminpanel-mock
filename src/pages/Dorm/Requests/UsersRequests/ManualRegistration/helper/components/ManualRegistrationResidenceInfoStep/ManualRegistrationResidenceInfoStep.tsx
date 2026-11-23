import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import "./_manualRegistrationResidenceInfoStep.scss";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetDormListByBranchIdQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useLazyGetAdmissionProgramListQuery } from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  useLazyGetDormResidenceBuildingListQuery,
  useLazyGetDormResidenceFloorListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { GeneralSelectResponse } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import {
  AdmissionProgramListType,
  GetAdmissionProgramResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/@types/@usersRequestsList";

import {
  AdmissionBuildingSelectType,
  AdmissionFloorSelectType,
  AdmissionSelectType,
  MainFormDataType,
  ManualRegistrationResidenceInfoStepProps,
  RangeDatePickerType,
  SelectedBuildingFloorType,
} from "./@types/@manualRegistrationResidenceInfoStep";
import ResidenceInfoStepBuildingInfo from "./helper/sections/BuildingInfo/ResidenceInfoStepBuildingInfo";
import ResidenceInfoStepFloorInfo from "./helper/sections/FloorInfo/ResidenceInfoStepFloorInfo";

const RESERVATION_TYPES = {
  term: 1, // ترمیک
  monthly: 2, // ماهانه
  daily: 3, // روزانه
};

const ManualRegistrationResidenceInfoStep = ({
  setCurrent,
}: ManualRegistrationResidenceInfoStepProps) => {
  const [dormitoryList, setDormitoryList] = useState<GeneralSelectResponse[]>([]);
  const [admissionList, setAdmissionList] = useState<AdmissionProgramListType[]>([]);
  const [selectedAdmissionTariffId, setSelectedAdmissionTariffId] = useState<
    null | number
  >(null);

  const [selectedBuildingFloor, setSelectedBuildingFloor] =
    useState<SelectedBuildingFloorType>({
      buildingData: null,
      floorData: null,
    });

  const [isDateDisabled, setIsDateDisabled] = useState(true);
  const [isBuildingDisabled, setIsBuildingDisabled] = useState(true);
  const [isFloorDisabled, setIsFloorDisabled] = useState(true);

  const [datetype, setDateType] = useState<RangeDatePickerType>(undefined);

  const [form] = Form.useForm<MainFormDataType>();
  const { user } = useAuth();

  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  //  واحد دانشگاهی
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //خوابگاه
  const [
    getDormListByBranchId,
    { isFetching: isDormListByBranchIdDataLoading, isSuccess: isDormitorySuccess },
  ] = useLazyGetDormListByBranchIdQuery();

  const [getAdmissionProgramList, { isFetching: isAdmissionProgramListLoading }] =
    useLazyGetAdmissionProgramListQuery();

  // get building
  const [
    getBuildingsOfDormitory,
    { data: buildingsOfDormitoryData, isFetching: buildingsOfDormitoryIsLoading },
  ] = useLazyGetDormResidenceBuildingListQuery();

  // get floor
  const [
    getFloorsOfBuilding,
    { data: floorsOfBuildingData, isFetching: floorsOfBuildingIsLoading },
  ] = useLazyGetDormResidenceFloorListQuery();

  //? ================================ Effects ================================
  const branchId = user?.staff?.admin?.branchId;

  useEffect(() => {
    if (branchId) {
      getAdmissionProgramList({ branchId: branchId?.toString() })
        .unwrap()
        .then(getAdmissionProgramListSuccess);

      getAllUniversity();
    }
  }, [branchId]);

  //* ================================ Util Functions ================================
  const getAdmissionProgramListSuccess = (value: GetAdmissionProgramResponse) => {
    if (value?.status === 200) {
      setAdmissionList(value?.data);
    }
  };

  const changeAdmissionHandler = (value: AdmissionSelectType) => {
    if (value?.item?.dormitoryId) {
      getBuildingsOfDormitory({
        dormitoryId_IN: value?.item?.dormitoryId,
        firstResult: 0,
        maxResults: 2000,
      }); //we should set 0 and 2000 to get data

      setSelectedBuildingFloor({
        buildingData: null,
        floorData: null,
      });

      form.setFieldsValue({ building: undefined, floor: undefined, date: undefined });

      setSelectedAdmissionTariffId(value?.item?.priceListId);

      setIsFloorDisabled(true);

      if (value?.item?.schedulingId === RESERVATION_TYPES.term) {
        setIsDateDisabled(true);
        setIsBuildingDisabled(false);
        setSearchParams({
          startDate: value?.item?.appliedStartDate,
          endDate: value?.item?.appliedEndDate,
          username: params?.username,
        });
      } else {
        setIsDateDisabled(false);
        setIsBuildingDisabled(true);
        setSearchParams({
          username: params?.username,
        });
      }

      if (value?.item?.schedulingId === RESERVATION_TYPES.monthly) {
        setDateType("month");
      }
      if (value?.item?.schedulingId === RESERVATION_TYPES.daily) {
        setDateType(undefined);
      }
    }
  };

  const changeDateHandler = () => {
    if (form?.getFieldsValue()?.date) {
      setIsBuildingDisabled(false);
      setSelectedBuildingFloor({
        buildingData: null,
        floorData: null,
      });
    } else {
      setIsBuildingDisabled(true);
      setIsFloorDisabled(true);

      form.setFieldsValue({ building: undefined, floor: undefined });

      setSelectedBuildingFloor({
        buildingData: null,
        floorData: null,
      });
    }
  };

  // onchange branch
  const branchChangeHandler = (id: string) => {
    if (id?.length > 0) {
      getDormListByBranchId({ maxResults: 50, firstResult: 0, branchId: id })
        .unwrap()
        .then((value) => {
          setDormitoryList(value?.data);
        });
    } else {
      setDormitoryList([]);
    }
    form.setFieldsValue({
      dormitory: undefined,
    });
  };

  // onchange building
  const changeBuildingHandler = (id: string, value: AdmissionBuildingSelectType) => {
    if (id) {
      getFloorsOfBuilding({ buildingId_IN: +id, firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data

      setSelectedBuildingFloor({
        buildingData: value?.item,
        floorData: null,
      });

      form.setFieldsValue({ floor: undefined });
      setIsFloorDisabled(false);
    }
  };

  // onchange floor
  const changeFloorHandler = (id: string, value: AdmissionFloorSelectType) => {
    if (id) {
      setSelectedBuildingFloor((prev) => ({
        ...prev,
        floorData: value?.item,
      }));
    }
  };

  const backBtnHandler = () => {
    setSearchParams({
      username: params?.username,
    });
    setCurrent(0);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="manual-registration-residence-info-step-container">
      <Form form={form}>
        <Row gutter={16}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              label="شعبه / واحد"
              name="branch"
              options={universityData ? universityData : []}
              form={form}
              onChange={(id) => branchChangeHandler(id as string)}
              isLoading={isUniversityDataLoading}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              label="اقامتگاه"
              name="dormitory"
              options={
                dormitoryList?.map((item) => ({
                  id: item.id,
                  title: item.title,
                })) || []
              }
              form={form}
              onChange={(id) => branchChangeHandler(id as string)}
              isLoading={isDormListByBranchIdDataLoading}
              placeholder="انتخاب کنید"
              notFoundContent={!isDormitorySuccess ? selectNotFoundContent : undefined}
              rules={[REQUIRED_RULE]}
              disabled={form.getFieldsValue()?.branch?.code ? false : true}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              label="برنامه پذیرش"
              name="admission"
              options={admissionList}
              form={form}
              onChange={(_, value) =>
                changeAdmissionHandler(value as AdmissionSelectType)
              }
              isLoading={isAdmissionProgramListLoading}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomRangePicker
              label="تاریخ"
              name="date"
              picker={datetype}
              form={form}
              rules={[REQUIRED_RULE]}
              disabled={isDateDisabled}
              onChange={changeDateHandler}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              label="ساختمان"
              name="building"
              options={buildingsOfDormitoryData?.data}
              form={form}
              placeholder="انتخاب کنید"
              onChange={(e, value) =>
                changeBuildingHandler(e as string, value as AdmissionBuildingSelectType)
              }
              loading={buildingsOfDormitoryIsLoading}
              rules={[REQUIRED_RULE]}
              disabled={isBuildingDisabled}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              label="طبقه"
              name="floor"
              options={floorsOfBuildingData?.data}
              onChange={(e, value) =>
                changeFloorHandler(e as string, value as AdmissionFloorSelectType)
              }
              loading={floorsOfBuildingIsLoading}
              form={form}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
              disabled={isFloorDisabled}
            />
          </Col>
        </Row>
      </Form>
      {selectedBuildingFloor?.buildingData?.title &&
        selectedBuildingFloor?.floorData?.title && (
          <div className="bed-allocation-container">
            <CustomDivider text="تخصیص تخت" />
            <ResidenceInfoStepBuildingInfo
              buildingData={selectedBuildingFloor?.buildingData}
            />
            <ResidenceInfoStepFloorInfo
              floorData={selectedBuildingFloor?.floorData}
              tariffId={selectedAdmissionTariffId}
              mainFormData={form?.getFieldsValue()}
            />
          </div>
        )}
      <div className="step-btn-container">
        <CustomButton type="primary" ghost onClick={backBtnHandler}>
          بازگشت
        </CustomButton>
      </div>
    </div>
  );
};

export default ManualRegistrationResidenceInfoStep;
