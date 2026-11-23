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
import { useLazyDormitoryCourseListQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  useCreateDormitoryCourseMutation,
  useEditDormitoryCourseMutation,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  DormitoryBasicInfoCourseListFormType,
  DormitoryCourseListItemType,
  DormitoryCourseListRequest,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoCourseList/@types/@dormitoryBasicInfoCourseList";
import DormitoryBasicInfoCourseListAddAndEditContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoCourseList/helper/components/DormitoryBasicInfoCourseListAddAndEditContent/DormitoryBasicInfoCourseListAddAndEditContent";
import DormitoryBasicInfoCourseListTableModel from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoCourseList/helper/models/DormitoryBasicInfoCourseListTableModel/DormitoryBasicInfoCourseListTableModel";

const DormitoryBasicInfoCourseList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "ترم (دوره)",
      },
    ],
  });

  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    record: DormitoryCourseListItemType | null;
  }>({ isOpen: false, record: null });
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<DormitoryBasicInfoCourseListFormType>();

  //? ================================  Api Calls ================================
  // list
  const [
    dormitoryCourseList,
    { data: courseListData, isFetching: isDormitoryCourseListLoading },
  ] = useLazyDormitoryCourseListQuery();

  // create
  const [createDormitoryCourse, { isLoading: isCreateDormitoryCourseLoading }] =
    useCreateDormitoryCourseMutation();

  // edit
  const [editDormitoryCourse, { isLoading: isEditDormitoryCourseLoading }] =
    useEditDormitoryCourseMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    dormitoryCourseListHandler();
  }, [url?.page, url?.pageSize, url?.sortings, url?.title]);

  //* ================================ Util Functions ================================
  // list
  const dormitoryCourseListHandler = () => {
    const requestBody: DormitoryCourseListRequest = {
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

    dormitoryCourseList(requestBody);
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

    createDormitoryCourse({
      faTitle: values.title,
      visible: values.checked,
    })
      .unwrap()
      .then(() => {
        closeAddModalHandler();
        dormitoryCourseListHandler();
      });
  };

  // Edit
  const onEditHandler = (record: DormitoryCourseListItemType) => {
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

    editDormitoryCourse({
      uuid: isOpenEditModal.record.uuid,
      visible: values.checked,
    })
      .unwrap()
      .then(() => {
        closeEditModalHandler();
        dormitoryCourseListHandler();
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
          isConfirmButtonLoading={isEditDormitoryCourseLoading}
          content={
            <DormitoryBasicInfoCourseListAddAndEditContent
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
          isConfirmButtonLoading={isCreateDormitoryCourseLoading}
          content={
            <DormitoryBasicInfoCourseListAddAndEditContent form={form} mode="add" />
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
      <CustomTable<DormitoryCourseListItemType>
        dataSource={courseListData?.content || []}
        loading={isDormitoryCourseListLoading}
        columns={DormitoryBasicInfoCourseListTableModel({
          onEditHandler: onEditHandler,
        })}
        rowKey="uuid"
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_BASIC_INFO_DETAIL_COURSE_LIST}
        pagination={manualPaginationConfig({
          total: courseListData?.totalElements || 0,
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
export default DormitoryBasicInfoCourseList;
