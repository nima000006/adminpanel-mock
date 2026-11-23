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
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  useCreateDormitoryQualityGradeMutation,
  useEditDormitoryQualityGradeMutation,
  useLazyGetDormitoryBasicInfoQualityGradeListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  DormitoryBasicInfoQualityGradeType,
  DormitoryBasicInfoQualityListFormType,
  GetDormitoryBasicInfoQualityGradeListRequest,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoQualityList/@types/@dormitoryBasicInfoQualityList";
import DormitoryBasicInfoQualityListAddAndEditContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoQualityList/helper/components/DormitoryBasicInfoQualityListEditContent/DormitoryBasicInfoQualityListEditContent";
import DormitoryBasicInfoQualityListTableModel from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoQualityList/helper/models/DormitoryBasicInfoQualityListTableModel/DormitoryBasicInfoQualityListTableModel";

const DormitoryBasicInfoQualityList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "درجه کیفی",
      },
    ],
  });

  const [isOpenEditModal, setIsOpenEditModal] = useState({ isOpen: false, id: "" });
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<DormitoryBasicInfoQualityListFormType>();

  //? ================================  Api Calls ================================
  const [
    getDormitoryBasicInfoQualityGradeList,
    {
      data: qualityGradeListData,
      isFetching: isGetDormitoryBasicInfoQualityGradeListLoading,
    },
  ] = useLazyGetDormitoryBasicInfoQualityGradeListQuery();

  const [
    createDormitoryQualityGrade,
    { isLoading: isCreateDormitoryQualityGradeLoading },
  ] = useCreateDormitoryQualityGradeMutation();

  const [editDormitoryQualityGrade, { isLoading: isEditDormitoryQualityGradeLoading }] =
    useEditDormitoryQualityGradeMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getDormitoryBasicInfoQualityGradeListHandler();
  }, [url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const getDormitoryBasicInfoQualityGradeListHandler = () => {
    const requestBody: GetDormitoryBasicInfoQualityGradeListRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
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

    getDormitoryBasicInfoQualityGradeList(requestBody);
  };

  const onEditHandler = (record: DormitoryBasicInfoQualityGradeType) => {
    form.setFieldsValue({
      title: record?.title,
      displayOrder: record?.displayOrder,
      dormitoryType: selectDefaultValueGenerator({
        id: record?.accommodationType?.name,
        title: record?.accommodationType?.title,
      }),
      checked: record?.visible,
    });

    setIsOpenEditModal({ isOpen: true, id: record?.uuid });
  };

  const onAddHandler = () => {
    setIsOpenAddModal(true);
  };

  const closeEditModalHandler = () => {
    setIsOpenEditModal({ isOpen: false, id: "" });
    form.resetFields();
  };

  const closeAddModalHandler = () => {
    setIsOpenAddModal(false);
    form.resetFields();
  };

  const editRequestHandler = async () => {
    const values = await form.validateFields();

    editDormitoryQualityGrade({
      id: isOpenEditModal?.id,
      body: {
        displayOrder: values.displayOrder,
        visible: values.checked,
      },
    })
      .unwrap()
      .then(() => {
        closeEditModalHandler();
        getDormitoryBasicInfoQualityGradeListHandler();
      });
  };

  const addRequestHandler = async () => {
    const values = await form.validateFields();

    createDormitoryQualityGrade({
      faTitle: values.title,
      accommodationType: values.dormitoryType?.value,
      displayOrder: values.displayOrder,
      visible: values.checked,
    })
      .unwrap()
      .then(() => {
        closeAddModalHandler();
        getDormitoryBasicInfoQualityGradeListHandler();
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
          isConfirmButtonLoading={isEditDormitoryQualityGradeLoading}
          content={
            <DormitoryBasicInfoQualityListAddAndEditContent form={form} mode="edit" />
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
          isConfirmButtonLoading={isCreateDormitoryQualityGradeLoading}
          content={<DormitoryBasicInfoQualityListAddAndEditContent form={form} />}
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
      <CustomTable<DormitoryBasicInfoQualityGradeType>
        dataSource={qualityGradeListData?.content || []}
        loading={isGetDormitoryBasicInfoQualityGradeListLoading}
        columns={DormitoryBasicInfoQualityListTableModel({
          onEditHandler: onEditHandler,
        })}
        rowKey="uuid"
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_BASIC_INFO_DETAIL_QUALITY_LIST}
        pagination={manualPaginationConfig({
          total: qualityGradeListData?.totalElements || 0,
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

export default DormitoryBasicInfoQualityList;
