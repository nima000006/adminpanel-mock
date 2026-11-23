import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormGenderTypesQuery,
  useLazyGetDormListByBranchIdQuery,
  useLazyGetEducationGradeQuery,
  useLazyGetSchedulingTypeQuery,
  useLazyGetSemesterQuery,
  useLazyGetUserGroupQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
  useLazyGetDormResidenceBuildingListQuery,
  useLazyGetDormResidenceFloorListQuery,
  useLazyGetDormResidenceRoomListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import { GeneralSelectResponse } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import { GetDormCityType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";
import { GetDormResidenceBuildingListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataBuilding/@types/@residenceCardsDataBuilding";
import { GetDormResidenceFloorListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataFloor/@types/@residenceCardsDataFloor";
import { GetDormResidenceRoomListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataRoom/@types/@residenceCardsDataRoom";

import {
  UseHabitantsAdvanceFilterFormType,
  UseHabitantsParamsType,
} from "./@types/@useHabitantsAdvanceFilter";

const useHabitantsAdvanceFilter = (
  form: FormInstance<UseHabitantsAdvanceFilterFormType>
) => {
  const [dormitoryList, setDormitoryList] = useState<GeneralSelectResponse[]>([]);

  const [buildingList, setBuildingList] = useState<GetDormResidenceBuildingListTypes[]>(
    []
  );

  const [floorList, setFloorList] = useState<GetDormResidenceFloorListTypes[]>([]);

  const [roomList, setRoomList] = useState<GetDormResidenceRoomListTypes[]>([]);

  const [cityList, setCityList] = useState<GetDormCityType[]>([]);

  const { params } = useQueryParams<UseHabitantsParamsType>();

  //? ================================  Api Calls ================================
  //استان
  const [
    getProvince,
    {
      data: getProvinceListData,
      isFetching: getProvinceListLoading,
      isSuccess: isProvinceSuccess,
    },
  ] = useLazyGetDormProvinceListQuery();

  //شهر
  const [getCityList, { isFetching: getCityListLoading, isSuccess: isCitySuccess }] =
    useLazyGetDormCityListQuery();

  // جنسیت
  const [
    getGenderTypes,
    { data: genderData, isFetching: isGenderDataLoading, isSuccess: isGenderSuccess },
  ] = useLazyGetDormGenderTypesQuery();

  //گروه کاربری
  const [
    getUserGroup,
    {
      data: userGroupData,
      isFetching: isUserGroupLoading,
      isSuccess: isUserGroupSuccess,
    },
  ] = useLazyGetUserGroupQuery();

  //  واحد دانشگاهی
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //خوابگاه
  const [
    getDormListByBranchId,
    { isFetching: isDormListByBranchIdDataLoading, isSuccess: isDormitorySuccess },
  ] = useLazyGetDormListByBranchIdQuery();

  // ساختمان
  const [
    getBuildingList,
    { isFetching: isBuildingListLoading, isSuccess: isBuildingListSuccess },
  ] = useLazyGetDormResidenceBuildingListQuery();

  // طبقه
  const [
    getFloorList,
    { isFetching: isFloorListLoading, isSuccess: isFloorListSuccess },
  ] = useLazyGetDormResidenceFloorListQuery();

  // اتاق
  const [getRoomList, { isFetching: isRoomListLoading, isSuccess: isRoomListSuccess }] =
    useLazyGetDormResidenceRoomListQuery();

  //مقطع تحصیلی
  const [
    getEducationGrade,
    {
      data: educationGradeData,
      isFetching: isEducationGradeLoading,
      isSuccess: isEducationGradeSuccess,
    },
  ] = useLazyGetEducationGradeQuery();

  //نوع زمان‌بندی
  const [
    getSchedulingType,
    {
      data: schedulingTypeData,
      isFetching: isSchedulingTypeLoading,
      isSuccess: isSchedulingTypeSuccess,
    },
  ] = useLazyGetSchedulingTypeQuery();

  // نیمسال
  const [
    getSemesterTypes,
    { data: semesterData, isFetching: isSemesterLoading, isSuccess: isSemesterSuccess },
  ] = useLazyGetSemesterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.uniId) {
      branchChangeHandler(params?.uniId);
    }
  }, [params?.uniId]);

  useEffect(() => {
    if (params?.genderId) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
    if (params?.userGroupId) {
      getUserGroup({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
    if (params?.educationDegreeId) {
      getEducationGrade({ maxResults: 2000, firstResult: 0 });
    }
    if (params?.schedulingId) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  }, [
    params?.genderId,
    params?.userGroupId,
    params?.educationDegreeId,
    params?.schedulingId,
  ]);

  //* ================================ Util Functions ================================
  const fetchInitialData = () => {
    getAllUniversity();
  };

  const getProvinceHandler = () =>
    fetchDataIfNeeded(
      !isProvinceSuccess,
      () => getProvince({ firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
    );

  const onProvinceChangeHandler = (id: string) => {
    if (id?.length > 0) {
      getCityList({ parentId_IN: +id, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then((value) => {
          setCityList(value?.data);
        });
    } else {
      setCityList([]);
    }
    form.setFieldsValue({
      city: [],
    });
  };

  //جنسیت
  const getGenderHandler = () => {
    if (!isGenderSuccess) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  // نیمسال
  const getSemesterHandler = () => {
    if (!isSemesterSuccess) {
      getSemesterTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  //گروه کاربری
  const getUserGroupHandler = () => {
    if (!isUserGroupSuccess) {
      getUserGroup({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  // شعبه
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
      dormitory: [],
      building: [],
      floor: [],
      room: [],
    });
  };

  //خوابگاه
  const dormChangeHandler = (id: string) => {
    if (id?.length > 0) {
      getBuildingList({ dormitoryId_IN: +id, firstResult: 0, maxResults: 2000 }) // we should set 0 and 2000 to get data
        .unwrap()
        .then((value) => {
          setBuildingList(value?.data);
        });
    } else {
      setBuildingList([]);
    }
    form.setFieldsValue({
      building: [],
      floor: [],
      room: [],
    });
  };

  // ساختمان
  const buildingChangeHandler = (id: string) => {
    if (id?.length > 0) {
      getFloorList({ buildingId_IN: id, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then((value) => {
          setFloorList(value?.data);
        });
    } else {
      setFloorList([]);
    }
    form.setFieldsValue({
      floor: [],
      room: [],
    });
  };

  // طبقه
  const floorChangeHandler = (id: string) => {
    if (id?.length > 0) {
      getRoomList({ floorId_IN: +id, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then((value) => {
          setRoomList(value?.data);
        });
    } else {
      setRoomList([]);
    }
    form.setFieldsValue({
      room: [],
    });
  };

  // مقطع تحصیلی
  const getEducationGradeHandler = () => {
    if (!isEducationGradeSuccess) {
      getEducationGrade({ maxResults: 2000, firstResult: 0 });
    }
  };

  //نوع زمان‌بندی
  const getSchedulingTypeHandler = () => {
    if (!isSchedulingTypeSuccess) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "province",
      mode: "multiple",
      type: "select",
      options: getProvinceListData?.data || [],
      loading: getProvinceListLoading,
      onChange: (id) => onProvinceChangeHandler(id as string),
      onClick: getProvinceHandler,
    },
    {
      label: "شهر",
      name: "city",
      mode: "multiple",
      type: "select",
      options: cityList,
      loading: getCityListLoading,
      notFoundContent: !isCitySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.province?.length > 0 ? false : true,
    },
    {
      label: "واحد دانشگاهی",
      name: "uni",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      onChange: (id) => branchChangeHandler(id as string),
    },
    {
      label: "اقامتگاه",
      name: "dormitory",
      mode: "multiple",
      type: "select",
      options:
        dormitoryList?.map((item) => ({
          id: item.id,
          title: item.title,
        })) || [],
      loading: isDormListByBranchIdDataLoading,
      notFoundContent: !isDormitorySuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.uni?.length > 0 ? false : true,
      onChange: (id) => dormChangeHandler(id as string),
    },
    {
      label: "ساختمان",
      name: "building",
      mode: "multiple",
      type: "select",
      options: buildingList,
      loading: isBuildingListLoading,
      notFoundContent: !isBuildingListSuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.dormitory?.length > 0 ? false : true,
      onChange: (id) => buildingChangeHandler(id as string),
    },
    {
      label: "طبقه",
      name: "floor",
      mode: "multiple",
      type: "select",
      options: floorList,
      loading: isFloorListLoading,
      notFoundContent: !isFloorListSuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.building?.length > 0 ? false : true,
      onChange: (id) => floorChangeHandler(id as string),
    },
    {
      label: "اتاق",
      name: "room",
      mode: "multiple",
      type: "select",
      options: roomList,
      loading: isRoomListLoading,
      notFoundContent: !isRoomListSuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.floor?.length > 0 ? false : true,
    },
    //TODO[Atefeh]: uncomment when api got ready
    // {
    //   label: "رشته تحصیلی",
    //   name: "fieldOfStudy",
    //   mode: "multiple",
    //   type: "select",
    //   options: fieldsData ? fieldsData : [],
    //   loading: isFieldsDataLoading,
    // },
    {
      label: "مقطع تحصیلی",
      name: "educationDegree",
      mode: "multiple",
      type: "select",
      options: educationGradeData?.data ? educationGradeData?.data : [],
      loading: isEducationGradeLoading,
      onClick: getEducationGradeHandler,
      notFoundContent: !isEducationGradeSuccess ? selectNotFoundContent : undefined,
    },
    //TODO[Atefeh]: uncomment when api got ready
    // {
    //   label: "سال ورود",
    //   name: "entranceYear",
    //   mode: "multiple",
    //   type: "select",
    //   options: [],
    //     onClick: getRequestTypeHandler,
    //     loading: isRequestTypesDataLoading,
    //     notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    // },
    // {
    //   label: "نیمسال",
    //   name: "term",
    //   mode: "multiple",
    //   type: "select",
    //   options: [],
    //     onClick: getRequestTypeHandler,
    //     loading: isRequestTypesDataLoading,
    //     notFoundContent: !isRequestTypesDataSuccess ? selectNotFoundContent : undefined,
    // },
    {
      label: "جنسیت",
      name: "gender",
      mode: "multiple",
      type: "select",
      options: genderData?.data ? genderData?.data : [],
      loading: isGenderDataLoading,
      notFoundContent: !isGenderSuccess ? selectNotFoundContent : undefined,
      onClick: getGenderHandler,
    },
    {
      label: "نیمسال",
      name: "semester",
      mode: "multiple",
      type: "select",
      options: semesterData?.data ? semesterData?.data : [],
      loading: isSemesterLoading,
      notFoundContent: !isSemesterSuccess ? selectNotFoundContent : undefined,
      onClick: getSemesterHandler,
    },
    {
      label: "نوع زمان‌بندی",
      name: "scheduling",
      mode: "multiple",
      type: "select",
      options: schedulingTypeData?.data || [],
      loading: isSchedulingTypeLoading,
      onClick: getSchedulingTypeHandler,
      notFoundContent: !isSchedulingTypeSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "گروه کاربری",
      name: "userGroup",
      mode: "multiple",
      type: "select",
      options: userGroupData?.data ? userGroupData?.data : [],
      loading: isUserGroupLoading,
      notFoundContent: !isUserGroupSuccess ? selectNotFoundContent : undefined,
      onClick: getUserGroupHandler,
    },
    {
      label: "مانده به پایان اسکان",
      name: "remainDays",
      mode: "multiple",
      type: "select",
      // options: userGroupData?.data ? userGroupData?.data : [],
      // loading: isUserGroupLoading,
      // notFoundContent: !isUserGroupSuccess ? selectNotFoundContent : undefined,
      // onClick: getUserGroupHandler,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useHabitantsAdvanceFilter;
