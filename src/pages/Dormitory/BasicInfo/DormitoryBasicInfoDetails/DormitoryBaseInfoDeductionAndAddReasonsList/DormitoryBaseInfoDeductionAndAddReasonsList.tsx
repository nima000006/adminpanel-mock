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
  useEditDormitoryBaseInfoDeductionAndAddReasonsMutation,
  useLazyGetDormitoryBaseInfoDeductionAndAddReasonsListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  DormitoryBaseInfoDeductionAndAddReasonsFormType,
  GetDormitoryBaseInfoDeductionAndAddReasonsListItemType,
  GetDormitoryBaseInfoDeductionAndAddReasonsListRequest,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeductionAndAddReasonsList/@types/@dormitoryBaseInfoDeductionAndAddReasonsList";
import DormitoryBasicInfoDeductionAndAddReasonsEditAndAddContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeductionAndAddReasonsList/helper/components/DormitoryBasicInfoDeductionAndAddReasonsEditAndAddContent/DormitoryBasicInfoDeductionAndAddReasonsEditAndAddContent";
import DormitoryBasicInfoDeductionAndAddReasonsViewContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeductionAndAddReasonsList/helper/components/DormitoryBasicInfoDeductionAndAddReasonsViewContent/DormitoryBasicInfoDeductionAndAddReasonsViewContent";
import DormitoryBaseInfoDeductionAndAddReasonsListTableModel from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeductionAndAddReasonsList/helper/models/DormitoryBaseInfoDeductionAndAddReasonsListTableModel/DormitoryBaseInfoDeductionAndAddReasonsListTableModel";

const mapReasonTypeToFormValue = (kindName?: string) => {
  if (kindName === "REFUSE") return "DEDUCTION";
  if (kindName === "RETURN") return "ADDITION";
  return kindName;
};

const DormitoryBaseInfoDeductionAndAddReasonsList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "دلایل کسورات و اضافات",
      },
    ],
  });

  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    record: GetDormitoryBaseInfoDeductionAndAddReasonsListItemType | null;
  }>({ isOpen: false, record: null });
  const [isOpenViewModal, setIsOpenViewModal] = useState<{
    isOpen: boolean;
    uuid: string;
    visibility: boolean;
  }>({ isOpen: false, uuid: "", visibility: true });
  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<DormitoryBaseInfoDeductionAndAddReasonsFormType>();

  //? ================================  Api Calls ================================
  const [
    getDormitoryBaseInfoDeductionAndAddReasonsList,
    {
      data: deductionAndAddReasonsListData,
      isFetching: isGetDormitoryBaseInfoDeductionAndAddReasonsListLoading,
    },
  ] = useLazyGetDormitoryBaseInfoDeductionAndAddReasonsListQuery();

  const [
    editDormitoryBaseInfoDeductionAndAddReasons,
    { isLoading: isEditDormitoryBaseInfoDeductionAndAddReasonsLoading },
  ] = useEditDormitoryBaseInfoDeductionAndAddReasonsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getDormitoryBaseInfoDeductionAndAddReasonsListHandler();
  }, [url?.page, url?.pageSize, url?.sortings, url?.title]);

  //* ================================ Util Functions ================================
  const getDormitoryBaseInfoDeductionAndAddReasonsListHandler = () => {
    const requestBody: GetDormitoryBaseInfoDeductionAndAddReasonsListRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      title: url?.title,
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        requestBody.sortBy = sorting.sortBy;
      } else {
        delete requestBody.sortBy;
      }

      if (sorting?.sortOrder) {
        requestBody.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete requestBody.sortDirection;
      }
    }

    getDormitoryBaseInfoDeductionAndAddReasonsList(requestBody);
  };

  // Edit
  const onEditHandler = (
    record: GetDormitoryBaseInfoDeductionAndAddReasonsListItemType
  ) => {
    setIsOpenEditModal({ isOpen: true, record });

    form.setFieldsValue({
      reasonType: mapReasonTypeToFormValue(record?.kind?.name),
      description: record?.description,
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

    editDormitoryBaseInfoDeductionAndAddReasons({
      uuid: isOpenEditModal.record.uuid,
      faDescription: values.description,
      visible: values.checked,
    })
      .unwrap()
      .then(() => {
        closeEditModalHandler();
        getDormitoryBaseInfoDeductionAndAddReasonsListHandler();
      });
  };

  // View

  const onViewHandler = (
    record: GetDormitoryBaseInfoDeductionAndAddReasonsListItemType
  ) => {
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
          title="مشاهده"
          closable
          open={isOpenViewModal?.isOpen}
          footer={false}
          onCancel={closeViewModal}
        >
          <DormitoryBasicInfoDeductionAndAddReasonsViewContent
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
          isConfirmButtonLoading={isEditDormitoryBaseInfoDeductionAndAddReasonsLoading}
          content={
            <DormitoryBasicInfoDeductionAndAddReasonsEditAndAddContent
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
      <CustomTable<GetDormitoryBaseInfoDeductionAndAddReasonsListItemType>
        dataSource={deductionAndAddReasonsListData?.content || []}
        loading={isGetDormitoryBaseInfoDeductionAndAddReasonsListLoading}
        columns={DormitoryBaseInfoDeductionAndAddReasonsListTableModel({
          onEditHandler,
          onViewHandler,
        })}
        rowKey="uuid"
        draggableColumns
        draggableId={
          ExcelCodes.DORMITORY_BASIC_INFO_DETAIL_DEDUCTION_AND_ADD_REASONS_LIST
        }
        pagination={manualPaginationConfig({
          total: deductionAndAddReasonsListData?.totalElements || 0,
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
export default DormitoryBaseInfoDeductionAndAddReasonsList;
