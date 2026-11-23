import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiPlus } from "react-icons/pi";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  useCreateDormitoryFacilityMutation,
  useEditDormitoryFacilityMutation,
  useLazyDormitoryFacilitiesListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  DormitoryBasicInfoFacilitiesListFormType,
  DormitoryFacilitiesListItemType,
  DormitoryFacilitiesListRequest,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoFacilitiesList/@types/@dormitoryBaseInfoFacilitiesList";
import DormitoryBasicInfoFacilitiesListAddAndEditContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoFacilitiesList/helper/components/DormitoryBasicInfoFacilitiesListAddAndEditContent/DormitoryBasicInfoFacilitiesListAddAndEditContent";
import DormitoryBasicInfoFacilitiesListTableModel from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoFacilitiesList/helper/models/DormitoryBasicInfoFacilitiesListTableModel/DormitoryBasicInfoFacilitiesListTableModel";

const DormitoryBaseInfoFacilitiesList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "امکانات",
      },
    ],
  });
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    record: DormitoryFacilitiesListItemType | null;
  }>({ isOpen: false, record: null });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<DormitoryBasicInfoFacilitiesListFormType>();

  //? ================================  Api Calls ================================
  const [
    dormitoryFacilitiesList,
    { data: facilitiesListData, isFetching: isDormitoryFacilitiesListLoading },
  ] = useLazyDormitoryFacilitiesListQuery();

  const [createDormitoryFacility, { isLoading: isCreateDormitoryFacilityLoading }] =
    useCreateDormitoryFacilityMutation();

  const [editDormitoryFacility, { isLoading: isEditDormitoryFacilityLoading }] =
    useEditDormitoryFacilityMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    dormitoryFacilitiesListHandler();
  }, [url?.page, url?.pageSize, url?.sortings, url?.title]);

  //* ================================ Util Functions ================================
  const dormitoryFacilitiesListHandler = () => {
    const requestBody: DormitoryFacilitiesListRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      title: url?.title,
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        requestBody.sort = sorting.sortBy;
      } else {
        delete requestBody.sort;
      }

      if (sorting?.sortOrder) {
        requestBody.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete requestBody.sortDirection;
      }
    }

    dormitoryFacilitiesList(requestBody);
  };

  // Add
  const onAddHandler = () => {
    setIsOpenAddModal(true);
  };

  const closeAddModalHandler = () => {
    setIsOpenAddModal(false);
    form.resetFields();
  };

  const addRequestHandler = async () => {
    const values = await form.validateFields();

    createDormitoryFacility({
      faTitle: values.title,
      unitOfMeasure: values.measurement?.value,
      amenityCategory: values.typeOfFacility?.value,
      unitLevels: values.facilitiesRelatedTo?.map((item) => item.value) || [],
      visible: values.checked,
    })
      .unwrap()
      .then(() => {
        closeAddModalHandler();
        dormitoryFacilitiesListHandler();
      });
  };

  // Edit
  const onEditHandler = (record: DormitoryFacilitiesListItemType) => {
    setIsOpenEditModal({ isOpen: true, record });

    form.setFieldsValue({
      checked: record?.visible,
    });
  };

  const closeEditModalHandler = () => {
    setIsOpenEditModal({ isOpen: false, record: null });
    form.resetFields();
  };

  const editRequestHandler = async () => {
    const values = await form.validateFields();

    if (!isOpenEditModal?.record?.uuid) return;

    editDormitoryFacility({
      id: isOpenEditModal.record.uuid,
      body: {
        visible: values.checked,
      },
    })
      .unwrap()
      .then(() => {
        closeEditModalHandler();
        dormitoryFacilitiesListHandler();
      });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenEditModal?.isOpen && (
        <ConfirmationModalWithContent
          title="ویرایش"
          backBtnText="انصراف"
          confirmBtnText="ثبت و اعمال تغییرات"
          showIcon={false}
          isModalOpen={isOpenEditModal?.isOpen}
          onConfirmClickHandler={editRequestHandler}
          closeModalHandler={closeEditModalHandler}
          isConfirmButtonLoading={isEditDormitoryFacilityLoading}
          content={
            <DormitoryBasicInfoFacilitiesListAddAndEditContent
              form={form}
              mode="edit"
              data={isOpenEditModal?.record}
            />
          }
        />
      )}
      {isOpenAddModal && (
        <ConfirmationModalWithContent
          title="افزودن به لیست"
          backBtnText="انصراف"
          confirmBtnText="تایید و افزودن"
          showIcon={false}
          isModalOpen={isOpenAddModal}
          onConfirmClickHandler={addRequestHandler}
          closeModalHandler={closeAddModalHandler}
          isConfirmButtonLoading={isCreateDormitoryFacilityLoading}
          content={
            <DormitoryBasicInfoFacilitiesListAddAndEditContent form={form} mode="add" />
          }
        />
      )}
      <ToolBox
        className="mb-5"
        leftSide={
          <div className="flex gap-2">
            <CustomButton
              icon={<PiPlus />}
              type="primary"
              onClick={onAddHandler}
              iconPlacement="end"
            >
              افزودن به لیست
            </CustomButton>
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          </div>
        }
        rightSide={
          <CustomButton type="primary" disabled icon={<AiOutlineFilter />}>
            فیلتر پیشرفته
          </CustomButton>
        }
      />
      <CustomTable<DormitoryFacilitiesListItemType>
        dataSource={facilitiesListData?.content || []}
        loading={isDormitoryFacilitiesListLoading}
        columns={DormitoryBasicInfoFacilitiesListTableModel({
          onEditHandler: onEditHandler,
        })}
        rowKey="uuid"
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_BASIC_INFO_DETAIL_FACILITIES_LIST}
        pagination={manualPaginationConfig({
          total: facilitiesListData?.totalElements || 0,
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
        key={`table-${url?.pageSize || "8"}`}
      />
    </>
  );
};
export default DormitoryBaseInfoFacilitiesList;
