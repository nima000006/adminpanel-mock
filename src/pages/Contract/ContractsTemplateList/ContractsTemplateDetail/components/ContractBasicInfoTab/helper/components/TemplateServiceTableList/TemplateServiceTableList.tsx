import { useState } from "react";

import { Form } from "antd";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useActiveTableStatusMutation,
  useDeActiveTableStatusMutation,
  useDeleteTemplateMutation,
} from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { BeneficiaryBannerItem } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/@types/@contractsTemplateDetail";

import { TemplateServiceTableListProps } from "./@types/@templateServiceTableListTypes";
import { TableChangeModalFormType } from "./helper/modal/DeActiveServiceModalContent/@types/@deActiveServiceModalContentTypes";
import DeActiveServiceModalContent from "./helper/modal/DeActiveServiceModalContent/DeActiveServiceModalContent";
import TemplateServiceTableListTableModel from "./helper/model/TemplateServiceTableListTableModel";

const TemplateServiceTableList = ({
  data,
  onRefresh,
  isArchive,
}: TemplateServiceTableListProps) => {
  const [openDeActiveServiceModal, setDeActiveServiceModal] = useState({
    id: -1,
    isOpen: false,
  });
  const [openDeleteModal, setIsOpenDeleteModal] = useState({
    id: -1,
    isOpen: false,
  });

  const [form] = Form.useForm<TableChangeModalFormType>();
  const { params } = useQueryParams();

  //? ================================  Api calls ================================
  // deactivate status
  const [deActiveTemplate, { isLoading: isDeActiveTemplateLoading }] =
    useDeActiveTableStatusMutation();

  // activate status
  const [activeTemplate, { isLoading: isActiveTemplateLoading }] =
    useActiveTableStatusMutation();

  // delete
  const [deleteTemplate, { isLoading: isDeleteTemplateLoading }] =
    useDeleteTemplateMutation();

  //* ================================ Util Functions ================================
  const switchHandler = (categoryId: number) => {
    setDeActiveServiceModal({
      isOpen: true,
      id: categoryId,
    });
  };

  const selectedItem = data?.find(
    (item) => item?.categoryId === openDeActiveServiceModal.id
  );
  const confirmChangeStatusBtnHandler = () => {
    if (selectedItem?.ruleBeneficiaryStatus?.name === "DEACTIVATED") {
      activeTemplate({
        contractId: +params?.id,
        categoryId: openDeActiveServiceModal?.id,
      })
        .unwrap()
        .then(activeTemplateIsSuccess);
    }

    if (selectedItem?.ruleBeneficiaryStatus?.name === "ACTIVE") {
      form.validateFields().then(() => {
        const { reasonChange, desc } = form.getFieldsValue();

        deActiveTemplate({
          contractId: +params?.id,
          categoryId: openDeActiveServiceModal?.id,
          reason: reasonChange?.item?.name ?? "",
          description: desc,
        })
          .unwrap()
          .then(deActiveTemplateIsSuccess);
      });
    }
  };

  const closeModalHandler = () => {
    setDeActiveServiceModal({ isOpen: false, id: -1 });
    form.resetFields();
  };
  const deActiveTemplateIsSuccess = () => {
    closeModalHandler();
    if (onRefresh) {
      onRefresh();
    }
  };
  const activeTemplateIsSuccess = () => {
    closeModalHandler();
    if (onRefresh) {
      onRefresh();
    }
  };

  // DELETE
  const deleteHandler = (categoryId: number) => {
    setIsOpenDeleteModal({
      id: categoryId,
      isOpen: true,
    });
  };
  const closeDeleteModalHandler = () => {
    setIsOpenDeleteModal({
      id: -1,
      isOpen: false,
    });
  };

  const confirmDeleteBtnHandler = () => {
    deleteTemplate({
      contractId: +params?.id,
      categoryId: openDeleteModal?.id,
    })
      .unwrap()
      .then(deleteTemplateIsSuccess);
  };

  const deleteTemplateIsSuccess = () => {
    closeDeleteModalHandler();
    if (onRefresh) {
      onRefresh();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* CHANGE MODAL */}
      <ConfirmationModalWithContent
        isModalOpen={openDeActiveServiceModal?.isOpen}
        showIcon={false}
        closeModalHandler={closeModalHandler}
        title="آیا از تغییر وضعیت اطمینان دارید؟"
        customClass="reminder-modal-custom"
        content={<DeActiveServiceModalContent form={form} />}
        onConfirmClickHandler={confirmChangeStatusBtnHandler}
        confirmBtnText="تایید وضعیت"
        backBtnText="انصراف"
        isConfirmButtonLoading={isDeActiveTemplateLoading || isActiveTemplateLoading}
      />
      {/* DELETE MODAL */}
      <ConfirmationModalWithContent
        isModalOpen={openDeleteModal?.isOpen}
        closeModalHandler={closeDeleteModalHandler}
        title="حذف قالب پیش نویس"
        customClass="reminder-modal-custom"
        content="آیا از حذف این قالب اطمینان دارید ؟"
        onConfirmClickHandler={confirmDeleteBtnHandler}
        isDangerous={true}
        confirmBtnText="تایید و حذف"
        backBtnText="انصراف"
        isConfirmButtonLoading={isDeleteTemplateLoading}
      />
      <div>
        <CustomTable<BeneficiaryBannerItem>
          dataSource={data ?? []}
          columns={TemplateServiceTableListTableModel({
            switchHandler,
            deleteHandler,
            isArchive,
          })}
          {...TABLE_PROPS(data?.length ?? 0)}
          rowKey="id"
        />
      </div>
    </>
  );
};
export default TemplateServiceTableList;
