import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  useEditDormitoryReasonReturnAndRefuseMutation,
  useLazyGetDormitoryReasonReturnAndRefuseListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  DormitoryBaseInfoReasonReturnAndRefuseFormType,
  GetDormitoryReasonReturnAndRefuseListItemType,
  GetDormitoryReasonReturnAndRefuseListRequest,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryReasonReturnAndRefuseList/@types/@dormitoryReasonReturnAndRefuseList";
import DormitoryBasicInfoReasonReturnAndRefuseEditAndAddContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryReasonReturnAndRefuseList/helper/components/DormitoryBasicInfoReasonReturnAndRefuseEditAndAddContent/DormitoryBasicInfoReasonReturnAndRefuseEditAndAddContent";
import DormitoryBasicInfoReasonReturnAndRefuseViewContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryReasonReturnAndRefuseList/helper/components/DormitoryBasicInfoReasonReturnAndRefuseViewContent/DormitoryBasicInfoReasonReturnAndRefuseViewContent";
import DormitoryBaseInfoReasonReturnAndRefuseListTableModel from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryReasonReturnAndRefuseList/helper/models/DormitoryBaseInfoReasonReturnAndRefuseListTableModel/DormitoryBaseInfoReasonReturnAndRefuseListTableModel";

const DormitoryReasonReturnAndRefuseList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: " دلایل رد و عودت",
      },
    ],
  });
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    record: GetDormitoryReasonReturnAndRefuseListItemType | null;
  }>({ isOpen: false, record: null });
  const [isOpenViewModal, setIsOpenViewModal] = useState<{
    isOpen: boolean;
    uuid: string;
    visibility: boolean;
  }>({ isOpen: false, uuid: "", visibility: true });
  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<DormitoryBaseInfoReasonReturnAndRefuseFormType>();

  //? ================================  Api Calls ================================
  const [
    getDormitoryReasonReturnAndRefuseList,
    {
      data: reasonReturnAndRefuseListData,
      isFetching: isGetDormitoryReasonReturnAndRefuseListLoading,
    },
  ] = useLazyGetDormitoryReasonReturnAndRefuseListQuery();

  const [
    editDormitoryReasonReturnAndRefuse,
    { isLoading: isEditDormitoryReasonReturnAndRefuseLoading },
  ] = useEditDormitoryReasonReturnAndRefuseMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getDormitoryReasonReturnAndRefuseListHandler();
  }, [url?.page, url?.pageSize, url?.sortings, url?.title]);

  //* ================================ Util Functions ================================
  // list
  const getDormitoryReasonReturnAndRefuseListHandler = () => {
    const requestBody: GetDormitoryReasonReturnAndRefuseListRequest = {
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

    getDormitoryReasonReturnAndRefuseList(requestBody);
  };

  // Edit
  const onEditHandler = (record: GetDormitoryReasonReturnAndRefuseListItemType) => {
    setIsOpenEditModal({ isOpen: true, record });

    form?.setFieldsValue({
      reasonType: record?.kind?.name === "REFUSE" ? "REJECT" : record?.kind?.name,
      description: record?.description,
      checked: record?.visible,
    });
  };

  const closeEditModalHandler = () => {
    setIsOpenEditModal({ isOpen: false, record: null });
    form.resetFields();
  };

  const editRequestHandler = async () => {
    const values = await form?.validateFields();

    if (!isOpenEditModal?.record?.uuid) return;

    editDormitoryReasonReturnAndRefuse({
      uuid: isOpenEditModal.record.uuid,
      faTitle: isOpenEditModal.record.title,
      faDescription: values.description,
      visible: values.checked,
    })
      .unwrap()
      .then(() => {
        closeEditModalHandler();
        getDormitoryReasonReturnAndRefuseListHandler();
      });
  };

  const onViewHandler = (record: GetDormitoryReasonReturnAndRefuseListItemType) => {
    setIsOpenViewModal({
      isOpen: true,
      uuid: record.uuid,
      visibility: record.visible,
    });
  };

  const closeViewModal = () => {
    setIsOpenViewModal({ isOpen: false, uuid: "", visibility: true });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenViewModal?.isOpen && (
        <CustomModal
          size="small"
          title="مشاهده"
          closable
          open={isOpenViewModal?.isOpen}
          footer={false}
          onCancel={closeViewModal}
        >
          <DormitoryBasicInfoReasonReturnAndRefuseViewContent
            uuid={isOpenViewModal.uuid}
            visibility={isOpenViewModal.visibility}
          />
        </CustomModal>
      )}
      {isOpenEditModal?.isOpen && (
        <ConfirmationModalWithContent
          title="ویرایش"
          backBtnText="انصراف"
          confirmBtnText="ثبت و اعمال تغییرات"
          showIcon={false}
          isModalOpen={isOpenEditModal?.isOpen}
          onConfirmClickHandler={editRequestHandler}
          closeModalHandler={closeEditModalHandler}
          isConfirmButtonLoading={isEditDormitoryReasonReturnAndRefuseLoading}
          content={
            <DormitoryBasicInfoReasonReturnAndRefuseEditAndAddContent
              form={form}
              data={isOpenEditModal?.record}
            />
          }
        />
      )}
      <ToolBox
        className="mb-5"
        leftSide={
          <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
            خروجی
          </CustomButton>
        }
        rightSide={
          <CustomButton type="primary" disabled icon={<AiOutlineFilter />}>
            فیلتر پیشرفته
          </CustomButton>
        }
      />
      <CustomTable<GetDormitoryReasonReturnAndRefuseListItemType>
        dataSource={reasonReturnAndRefuseListData?.content || []}
        loading={isGetDormitoryReasonReturnAndRefuseListLoading}
        columns={DormitoryBaseInfoReasonReturnAndRefuseListTableModel({
          onEditHandler,
          onViewHandler,
        })}
        rowKey="uuid"
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_BASIC_INFO_DETAIL_REASON_RETURN_AND_REFUSE_LIST}
        pagination={manualPaginationConfig({
          total: reasonReturnAndRefuseListData?.totalElements || 0,
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
export default DormitoryReasonReturnAndRefuseList;
