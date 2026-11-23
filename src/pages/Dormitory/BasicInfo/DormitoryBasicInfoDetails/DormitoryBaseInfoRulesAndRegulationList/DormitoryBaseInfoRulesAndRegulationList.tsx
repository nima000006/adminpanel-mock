import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiPlus } from "react-icons/pi";
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
  useCreateDormitoryRulesAndRegulationMutation,
  useEditDormitoryRulesAndRegulationMutation,
  useLazyGetDormitoryBasicInfoRulesAndRegulationListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  DormitoryBaseInfoRulesAndRegulationFormType,
  DormitoryBasicInfoRulesAndRegulationType,
  GetDormitoryBasicInfoRulesAndRegulationListRequest,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoRulesAndRegulationList/@types/@dormitoryBaseInfoRulesAndRegulationList";
import DormitoryBasicInfoRulesAndRegulationAddAndEditContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoRulesAndRegulationList/helper/components/DormitoryBasicInfoRulesAndRegulationAddAndEditContent/DormitoryBasicInfoRulesAndRegulationAddAndEditContent";
import DormitoryBasicInfoRulesAndRegulationViewContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoRulesAndRegulationList/helper/components/DormitoryBasicInfoRulesAndRegulationViewContent/DormitoryBasicInfoRulesAndRegulationViewContent";
import DormitoryBaseInfoRulesAndRegulationListTableModel from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoRulesAndRegulationList/helper/models/DormitoryBaseInfoRulesAndRegulationListTableModel/DormitoryBaseInfoRulesAndRegulationListTableModel";

const DormitoryBaseInfoRulesAndRegulationList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "قالب قوانین و مقررات",
      },
    ],
  });

  const [isOpenEditModal, setIsOpenEditModal] = useState({ isOpen: false, id: "" });
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenViewModal, setIsOpenViewModal] = useState({ isOpen: false, id: "" });
  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<DormitoryBaseInfoRulesAndRegulationFormType>();

  //? ================================  Api Calls ================================
  const [
    getDormitoryBasicInfoRulesAndRegulationList,
    {
      data: rulesAndRegulationListData,
      isFetching: isGetDormitoryBasicInfoRulesAndRegulationListLoading,
    },
  ] = useLazyGetDormitoryBasicInfoRulesAndRegulationListQuery();

  const [
    createDormitoryRulesAndRegulation,
    { isLoading: isCreateDormitoryRulesAndRegulationLoading },
  ] = useCreateDormitoryRulesAndRegulationMutation();

  const [
    editDormitoryRulesAndRegulation,
    { isLoading: isEditDormitoryRulesAndRegulationLoading },
  ] = useEditDormitoryRulesAndRegulationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getDormitoryBasicInfoRulesAndRegulationListHandler();
  }, [url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const getDormitoryBasicInfoRulesAndRegulationListHandler = () => {
    const requestBody: GetDormitoryBasicInfoRulesAndRegulationListRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
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

    getDormitoryBasicInfoRulesAndRegulationList(requestBody);
  };
  // Add Modal Handlers
  const onAddHandler = () => {
    setIsOpenAddModal(true);
  };
  const closeAddModalHandler = () => {
    setIsOpenAddModal(false);
    form.resetFields();
  };

  const addRequestHandler = async () => {
    const values = await form.validateFields();

    createDormitoryRulesAndRegulation({
      faTitle: values.title,
      kind: values.typeOfRules?.value,
      accommodationType: values.typeOfDormitory?.value,
      faDescription: values.description,
      visible: values.checked,
    })
      .unwrap()
      .then(() => {
        closeAddModalHandler();
        getDormitoryBasicInfoRulesAndRegulationListHandler();
      });
  };

  // Edit Modal Handlers
  const onEditHandler = (id: string) => {
    setIsOpenEditModal({ isOpen: true, id });
  };

  const closeEditModalHandler = () => {
    setIsOpenEditModal({ isOpen: false, id: "" });
    form.resetFields();
  };

  const editRequestHandler = async () => {
    const values = await form.validateFields();

    if (!isOpenEditModal?.id) return;

    editDormitoryRulesAndRegulation({
      id: isOpenEditModal.id,
      body: {
        faDescription: values.description,
        visible: values.checked,
      },
    })
      .unwrap()
      .then(() => {
        closeEditModalHandler();
        getDormitoryBasicInfoRulesAndRegulationListHandler();
      });
  };

  // View Modal Handlers
  const onViewHandler = (id: string) => {
    setIsOpenViewModal({ isOpen: true, id });
  };

  const closeViewModal = () => {
    setIsOpenViewModal({ isOpen: false, id: "" });
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
          <DormitoryBasicInfoRulesAndRegulationViewContent id={isOpenViewModal?.id} />
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
          isConfirmButtonLoading={isEditDormitoryRulesAndRegulationLoading}
          content={
            <DormitoryBasicInfoRulesAndRegulationAddAndEditContent
              form={form}
              mode="edit"
              id={isOpenEditModal?.id}
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
          isConfirmButtonLoading={isCreateDormitoryRulesAndRegulationLoading}
          content={
            <DormitoryBasicInfoRulesAndRegulationAddAndEditContent
              form={form}
              mode="add"
            />
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
      <CustomTable<DormitoryBasicInfoRulesAndRegulationType>
        dataSource={rulesAndRegulationListData?.content || []}
        loading={isGetDormitoryBasicInfoRulesAndRegulationListLoading}
        columns={DormitoryBaseInfoRulesAndRegulationListTableModel({
          onEditHandler,
          onViewHandler,
        })}
        rowKey="uuid"
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_BASIC_INFO_DETAIL_RULES_AND_REGULATION_LIST}
        pagination={manualPaginationConfig({
          total: rulesAndRegulationListData?.totalElements || 0,
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
export default DormitoryBaseInfoRulesAndRegulationList;
