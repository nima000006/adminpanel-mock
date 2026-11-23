import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  useEditDormitoryDeactivationReasonMutation,
  useLazyGetBasicInfoDeactivationReasonsQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  DormitoryDeactivationReasonType,
  GetBasicInfoDeactivationReasonsRequest,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeActivationReasonsList/@types/@dormitoryBaseInfoDeActivationReasonsList";
import DormitoryBasicInfoDeActivationReasonsListEditContent from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeActivationReasonsList/helper/components/DormitoryBasicInfoDeActivationReasonsListAddAndEditContent/DormitoryBasicInfoDeActivationReasonsListAddAndEditContent";
import DormitoryBasicInfoDeActivationReasonsListTableModel from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeActivationReasonsList/helper/models/DormitoryBasicInfoDeActivationReasonsListTableModel/DormitoryBasicInfoDeActivationReasonsListTableModel";

const DormitoryBaseInfoDeActivationReasonsList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORMITORY_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "دلایل غیرفعالسازی",
      },
    ],
  });

  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    record: DormitoryDeactivationReasonType | null;
  }>({ isOpen: false, record: null });

  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<{ checked: boolean }>();

  //? ================================  Api Calls ================================
  const [getBasicInfoDeactivationReasons, { data: deactivationReasonsData }] =
    useLazyGetBasicInfoDeactivationReasonsQuery();

  const [editDeactivationReason, { isLoading: isEditDeactivationReasonLoading }] =
    useEditDormitoryDeactivationReasonMutation();

  useEffect(() => {
    getBasicInfoDeactivationReasonsHandler();
  }, [url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const getBasicInfoDeactivationReasonsHandler = () => {
    const requestBody: GetBasicInfoDeactivationReasonsRequest = {
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

    getBasicInfoDeactivationReasons(requestBody);
  };

  const onEditHandler = (record: DormitoryDeactivationReasonType) => {
    setIsOpenEditModal({ isOpen: true, record });
    form.setFieldsValue({ checked: record.visible });
  };

  const closeEditModalHandler = () => {
    setIsOpenEditModal({ isOpen: false, record: null });
  };

  const editRequestHandler = async () => {
    const values = await form.validateFields();

    console.warn(values);
    if (isOpenEditModal.record?.uuid) {
      editDeactivationReason({
        id: isOpenEditModal.record?.uuid,
        body: {
          visible: values.checked,
          faDescription: isOpenEditModal.record?.title,
        },
      })
        .unwrap()
        .then(() => {
          closeEditModalHandler();
          getBasicInfoDeactivationReasonsHandler();
        });
    }
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {isOpenEditModal && (
        <ConfirmationModalWithContent
          title="ویرایش"
          backBtnText="انصراف"
          confirmBtnText="ثبت و اعمال تغییرات"
          showIcon={false}
          isModalOpen={isOpenEditModal.isOpen}
          onConfirmClickHandler={editRequestHandler}
          closeModalHandler={closeEditModalHandler}
          isConfirmButtonLoading={isEditDeactivationReasonLoading}
          content={
            <DormitoryBasicInfoDeActivationReasonsListEditContent
              record={isOpenEditModal.record}
              form={form}
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
      <CustomTable<DormitoryDeactivationReasonType>
        dataSource={deactivationReasonsData?.content || []}
        loading={false}
        columns={DormitoryBasicInfoDeActivationReasonsListTableModel({
          onEditHandler: onEditHandler,
        })}
        rowKey="uuid"
        pagination={manualPaginationConfig({
          total: deactivationReasonsData?.totalElements || 0,

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
        // draggableColumns
        // draggableId={ExcelCodes.DORMITORY_BASIC_INFO_DETAIL_DEACTIVATION_REASONS_LIST} // Todo[Atefeh]: uncomment when needed in th future
      />
    </>
  );
};
export default DormitoryBaseInfoDeActivationReasonsList;
