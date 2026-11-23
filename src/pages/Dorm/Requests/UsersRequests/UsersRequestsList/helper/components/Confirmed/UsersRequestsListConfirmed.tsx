import { useEffect, useRef, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeQueryParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useDormRequestsDeliverRoomMutation,
  useLazyGetRequestsListCountQuery,
  useLazyGetRequestsListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";
import { dormWaitingTimeQueryCreator } from "@pages/Dorm/_shared/utils/DormUtils";
import { DormRequestsDeliverRoomResponse } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import RoomDeliverModalContent from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/Confirmed/helper/components/RequestsInfo/helper/modals/RoomDeliverModalContent/RoomDeliverModalContent";

import { ConfirmedRequestBedDeliverModalFormType } from "./@types/@usersRequestsListConfirmed";
import UsersRequestsListConfirmedTableModel from "./helper/Model/UsersRequestsListConfirmedTableModel";
import {
  DormUsersListRequestsType,
  GetDormUsersRequestsListResponse,
} from "../../../@types/@usersRequestsList";
import { usersListStatus } from "../../../utils/usersRequestsUtils";
import { miladiDateRange } from "../../utils/miladiDateRange";
import { UseRequestsConfirmedAdvanceFilterFormType } from "./helper/modals/advanceFilterModal/requestsConfirmedAdvanceFilter/@types/@useRequestsConfirmedAdvanceFilter";
import useRequestsConfirmedAdvanceFilter from "./helper/modals/advanceFilterModal/requestsConfirmedAdvanceFilter/RequestsConfirmedAdvanceFilter";

const DELIVER_ROOM_SUCCESS_MSG = "اتاق مورد نظر با موفقیت به کاربر تحویل داده شد.";
const DOCUMENT_NECESSARY_MSG = "آپلود تصویر فرم ها الزامی می باشد.";

const FILTER_DEPENDENCIES = [
  "confirmedRequestTypeId",
  "confirmedGenderId",
  "confirmedUserGroupId",
  "confirmedSchedulingId",
  "confirmedProvinceId",
  "confirmedCityId",
  "confirmedUniId",
  "confirmedReservationTypeId",
  "confirmedWaitingTimeId",
  "confirmedDormitoryId",
];

const TABLE_DEPENDENCIES = [
  "name",
  "sortings",
  "lastName",
  "studentNumber",
  "deliverPlanTitle",
  "dormitory",
  "nationalCode",
];
const UsersRequestsListConfirmed = () => {
  const [dataSource, setDataSource] = useState<DormUsersListRequestsType[]>([]);
  const [confirmedModal, setConfirmedModal] = useState({ isOpen: false, id: -1 });

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [deliverBedModalStep, setDeliverBedModalStep] = useState(0);

  const [form] = Form.useForm<UseRequestsConfirmedAdvanceFilterFormType>();

  const [confirmedForm] = Form.useForm<ConfirmedRequestBedDeliverModalFormType>();
  const [firstImageName, setFirstImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");

  const { filterItemsList, fetchInitialData } = useRequestsConfirmedAdvanceFilter(form);

  const excelFilesQueryRef = useRef("");

  //? ================================  Api Calls ================================
  const [getRequestsList, { isFetching: isRequestsListLoading }] =
    useLazyGetRequestsListQuery();

  const [
    getRequestsListCount,
    { data: requestsListCountData, isFetching: isRequestsListCountLoading },
  ] = useLazyGetRequestsListCountQuery();

  const [deliverRoom, { isLoading: isDeliverRoomLoading }] =
    useDormRequestsDeliverRoomMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getUsersRequestsList();
  }, [
    url?.confirmedPage,
    url?.confirmedPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getUsersRequestsListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.confirmedWaitingTimeId);

    const params = {
      statusId_IN: usersListStatus?.confirmed,
      AssociationCategoryRequestType_id_IN: url?.confirmedRequestTypeId,
      AssociationCustomer_AssociationCustomerUser_genderId_IN: url?.confirmedGenderId,
      AssociationCustomer_userGroupID_IN: url?.confirmedUserGroupId,
      AssociationCategoryDeliverPlan_schedulingId_IN: url?.confirmedSchedulingId,
      AssociationCategoryDeliverPlan_AssociationDormitory_AssociationRegion_parentId_IN:
        url?.confirmedProvinceId,
      AssociationCategoryDeliverPlan_AssociationDormitory_regionId_IN:
        url?.confirmedCityId,
      AssociationCategoryDeliverPlan_branchId_IN: url?.confirmedUniId,
      AssociationCategoryDeliverPlan_reservationTypeId_IN:
        url?.confirmedReservationTypeId,
      AssociationCategoryDeliverPlan_dormitoryId_IN: url?.confirmedDormitoryId,
      ...(waitingTime ? { [waitingTime.queryParam]: waitingTime?.value } : {}),
      createDate_BTW: miladiDateRange(url?.createDate_BTW),
      name: url?.name,
      sortings: url?.sortings,
      lastName: url?.lastName,
      deliverPlanTitle: url?.deliverPlanTitle,
      studentNumber: url?.studentNumber,
      dormitory: url?.dormitory,
      nationalCode: url?.nationalCode,
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    url?.createDate_BTW,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (advanceModalOpen) {
      fetchInitialData();
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  const getUsersRequestsList = () => {
    getRequestsList({
      firstResult: url?.confirmedPage
        ? Number((+url.confirmedPage - 1) * +url.confirmedPageSize)
        : 0,
      maxResults: url?.confirmedPageSize ? Number(url?.confirmedPageSize) : 8,
      statusId: usersListStatus?.confirmed,
      requestTypeId: url?.confirmedRequestTypeId,
      genderId: url?.confirmedGenderId,
      userGroupId: url?.confirmedUserGroupId,
      schedulingId: url?.confirmedSchedulingId,
      provinceId: url?.confirmedProvinceId,
      cityId: url?.confirmedCityId,
      branchId: url?.confirmedUniId,
      reservationTypeId: url?.confirmedReservationTypeId,
      dormitoryId: url?.confirmedDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.confirmedWaitingTimeId),
      createDate_BTW: miladiDateRange(url?.createDate_BTW),
      name: url?.name,
      sortings: url?.sortings,
      lastName: url?.lastName,
      deliverPlanTitle: url?.deliverPlanTitle,
      studentNumber: url?.studentNumber,
      dormitory: url?.dormitory,
      nationalCode: url?.nationalCode,
    })
      .unwrap()
      .then(getRequestsListSuccess);
  };
  const getRequestsListSuccess = async (values: GetDormUsersRequestsListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getUsersRequestsListCount = () => {
    getRequestsListCount({
      statusId: usersListStatus?.confirmed,
      requestTypeId: url?.confirmedRequestTypeId,
      genderId: url?.confirmedGenderId,
      userGroupId: url?.confirmedUserGroupId,
      schedulingId: url?.confirmedSchedulingId,
      provinceId: url?.confirmedProvinceId,
      cityId: url?.confirmedCityId,
      branchId: url?.confirmedUniId,
      reservationTypeId: url?.confirmedReservationTypeId,
      dormitoryId: url?.confirmedDormitoryId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.confirmedWaitingTimeId),
      createDate_BTW: miladiDateRange(url?.createDate_BTW),
      name: url?.name,
      sortings: url?.sortings,
      lastName: url?.lastName,
      deliverPlanTitle: url?.deliverPlanTitle,
      studentNumber: url?.studentNumber,
      dormitory: url?.dormitory,
    });
  };

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);

    form.resetFields();
  };

  const openConfirmedModalHandler = (id: number) =>
    setConfirmedModal({ isOpen: true, id });

  const closeConfirmedModalHandler = () => {
    setConfirmedModal({ isOpen: false, id: -1 });

    setFirstImageName("");
    setSecondImageName("");
    confirmedForm.resetFields();
  };

  const deliverRoomSuccess = async (value: DormRequestsDeliverRoomResponse) => {
    if (value?.status === 204) {
      getUsersRequestsList();
      closeConfirmedModalHandler();
      toast.success(DELIVER_ROOM_SUCCESS_MSG, { toastId: DELIVER_ROOM_SUCCESS_MSG });
      confirmedForm.resetFields();
    }
  };

  const modalBackStepHandler = () => {
    setDeliverBedModalStep(0);
  };

  const uploadDocumentHandler = () => {
    if (firstImageName && secondImageName) {
      setDeliverBedModalStep(1);
    } else {
      toast.warning(DOCUMENT_NECESSARY_MSG, { toastId: DOCUMENT_NECESSARY_MSG });
    }
  };

  const deliverBedHandler = () => {
    confirmedForm.submit();

    confirmedForm.validateFields().then((value) => {
      deliverRoom({
        form: "BedDelivery",
        data: {
          id: confirmedModal?.id,
          fatherName: value?.fatherName,
          fatherFamily: value?.fatherFamily,
          fatherPhone: value?.fatherPhone,
          motherName: value?.motherName,
          motherFamily: value?.motherFamily,
          motherPhone: value?.motherPhone,
          wifeName: value?.spouseName,
          wifeFamily: value?.spouseFamily,
          wifePhone: value?.spousePhone,
          relativesName: value?.relativeName,
          relativesFamily: value?.relativeFamily,
          relativesPhone: value?.relativePhone,
          homePhone: value?.essentialPhoneNumber,
          maritalStatus: value?.maritalStatus?.code?.toString(),
          descDeliveryRoom: value?.description,
          kinship: value?.relativeRelative,
          AssociationfileRequest: [
            {
              uploadFileId: firstImageName,
            },
            {
              uploadFileId: secondImageName,
            },
          ],
        },
      })
        .unwrap()
        .then(deliverRoomSuccess);
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* ROOM DELIVER MODAL */}
      {confirmedModal?.isOpen && (
        <ConfirmationModalWithContent
          title="تحویل تخت"
          isModalOpen={confirmedModal?.isOpen}
          confirmBtnText={
            deliverBedModalStep === 0
              ? "بارگذاری مدارک و ادامه"
              : "تایید اطلاعات و تحویل خوابگاه"
          }
          closeModalHandler={
            deliverBedModalStep === 0 ? closeConfirmedModalHandler : modalBackStepHandler
          }
          onConfirmClickHandler={
            deliverBedModalStep === 0 ? uploadDocumentHandler : deliverBedHandler
          }
          backBtnText={deliverBedModalStep === 0 ? "انصراف" : "بازگشت"}
          content={
            <RoomDeliverModalContent
              form={confirmedForm}
              current={deliverBedModalStep}
              setFirstImageName={setFirstImageName}
              setSecondImageName={setSecondImageName}
            />
          }
          isConfirmButtonLoading={isDeliverRoomLoading}
          width={800}
        />
      )}
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}
      <div className="user-requests-tab-container">
        <ToolBox
          leftSide={
            <CustomExcelDownloadButton
              excelTitle="درخواست‌های پرداخت شده"
              restOfUrl={excelFilesQueryRef.current}
              formId="UserRequestList"
              type="primary"
              ghost
              className="btn-text"
            />
          }
          rightSide={
            <>
              <CustomRangePicker
                name="dateRang"
                onChange={(dates) => {
                  if (dates?.[0] && dates?.[1]) {
                    const start = dates[0].format("YYYY-MM-DD");
                    const end = dates[1].format("YYYY-MM-DD");
                    setSearchParams({
                      ...url,
                      createDate_BTW: `${start} , ${end}`,
                    });
                  } else {
                    const { createDate_BTW, ...rest } = url;
                    setSearchParams(rest);
                  }
                }}
              />

              <CustomBadge count={badgeCount}>
                <CustomButton
                  type="primary"
                  icon={<AiOutlineFilter />}
                  onClick={openAdvanceFilterHandler}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            </>
          }
        />
        <CustomTable
          dataSource={dataSource}
          columns={UsersRequestsListConfirmedTableModel({ openConfirmedModalHandler })}
          pagination={manualPaginationConfig({
            total: requestsListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                confirmedPage: page?.toString(),
                confirmedPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.confirmedPage ? Number(url?.confirmedPage) : 1,
            defaultPageSize: url?.confirmedPageSize ? Number(url?.confirmedPageSize) : 8,
          })}
          loading={isRequestsListLoading || isRequestsListCountLoading}
          key={`table-${url?.confirmedPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="users-requests-confirmed-table-model-container"
        />
      </div>
    </>
  );
};

export default UsersRequestsListConfirmed;
