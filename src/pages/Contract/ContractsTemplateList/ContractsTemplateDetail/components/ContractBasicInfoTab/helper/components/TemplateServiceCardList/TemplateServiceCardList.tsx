import { useState } from "react";

import { Col, Form, Row } from "antd";
import { FaUser, FaUsers } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useActiveTableStatusMutation,
  useDeActiveTableStatusMutation,
  useDeleteTemplateMutation,
} from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";

import { TemplateServiceCardListProps } from "./@types/@templateServiceCardListTypes";
import { TableChangeModalFormType } from "../TemplateServiceTableList/helper/modal/DeActiveServiceModalContent/@types/@deActiveServiceModalContentTypes";
import DeActiveServiceModalContent from "../TemplateServiceTableList/helper/modal/DeActiveServiceModalContent/DeActiveServiceModalContent";

const TemplateServiceCardList = ({
  data,
  onRefresh,
  isArchive,
}: TemplateServiceCardListProps) => {
  const [viewMore, setViewMore] = useState(false);

  const visibleData = viewMore ? data : data?.slice(0, 3);

  const [openDeActiveServiceModal, setDeActiveServiceModal] = useState({
    id: -1,
    isOpen: false,
  });
  const [openDeleteModal, setIsOpenDeleteModal] = useState({
    id: -1,
    isOpen: false,
  });

  const { params, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<TableChangeModalFormType>();

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

  const showDataHandler = () => {
    setViewMore((prev) => !prev);
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
        .then(activeAndDeActiveTemplateIsSuccess);
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
          .then(activeAndDeActiveTemplateIsSuccess);
      });
    }
  };

  const activeCrdBtnHandler = (id: number) => {
    setDeActiveServiceModal({ id, isOpen: true });
  };
  const closeModalHandler = () => {
    setDeActiveServiceModal({ id: -1, isOpen: false });
    form.resetFields();
  };

  const activeAndDeActiveTemplateIsSuccess = () => {
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

  //

  const financeRuleBtnHandler = (id: number) => {
    const selectedItem = data?.find((item) => item?.categoryId === id);

    if (!selectedItem?.categoryTitle) return;

    setSearchParams({
      ...params,
      tab: "3",
      categoryId: id?.toString(),
      categoryTitle: selectedItem.categoryTitle,
    });
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
        <Row gutter={[16, 16]} className="mt-4!">
          {visibleData?.map((item) => (
            <Col xl={8} lg={12} md={24} sm={24} xs={24} key={item?.categoryId}>
              <CustomCard className="bg-neutral-2! border-none!">
                <div className="border-neutral-4 flex justify-between border-b pb-4!">
                  <h3 className="text-app-text text-xl! whitespace-nowrap!">
                    {item?.categoryTitle}
                  </h3>
                  {item?.hasTax ? (
                    <CustomTag className="m-0!" color="blue">
                      شامل ارزش افزوده
                    </CustomTag>
                  ) : null}
                </div>
                <div className="mt-4! flex justify-between">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <span className="flex flex-row-reverse items-center justify-center gap-2">
                      فروشنده
                      <FaUser className="text-neutral-6" size={20} />
                    </span>
                    <p className="body-regular">
                      {dataPlaceHolder({ data: item?.supplierName })}
                    </p>
                  </div>
                  {/* todo[shirin]: به درخواست اقای جماعتی کامنت شد */}
                  {/* <div className="flex flex-col items-center justify-center gap-4">
                    <span className="flex flex-row-reverse items-center justify-center gap-2">
                      تامین کننده <PiSealCheckFill className="text-neutral-6" size={20} />
                    </span>
                    <p className="body-regular">{emptyString}</p>
                  </div> */}
                  <div className="flex flex-col items-center justify-center gap-4">
                    <span className="flex flex-row-reverse items-center justify-center gap-2">
                      ذینفعان <FaUsers className="text-neutral-6" size={20} />
                    </span>
                    <p className="body-regular">
                      {dataPlaceHolder({ data: item?.ruleBeneficiaries })}
                    </p>
                  </div>
                </div>
                {/* شرط ۱: اگر وضعیت 0 هست، دکمه‌ها نشون داده میشن */}
                {item?.ruleBeneficiaryStatus?.id === 0 && !isArchive ? (
                  <div className="flex gap-2">
                    <CustomButton className="mt-4! w-full!">تکمیل فرآیند</CustomButton>

                    <CustomButton
                      danger={true}
                      className="mt-4! w-full!"
                      onClick={() => deleteHandler(item?.categoryId)}
                    >
                      حذف
                    </CustomButton>
                  </div>
                ) : // برای حالت ارشیو
                item?.ruleBeneficiaryStatus?.id === 0 && isArchive ? (
                  <div className="flex gap-2">
                    <CustomButton
                      className="mt-4! w-full!"
                      onClick={() => financeRuleBtnHandler(item?.categoryId)}
                    >
                      قوانین مالی
                    </CustomButton>
                    <CustomButton
                      type="primary"
                      className="mt-4! w-full!"
                      disabled={true}
                      onClick={() => activeCrdBtnHandler(item?.categoryId)}
                    >
                      فعالسازی
                    </CustomButton>
                  </div>
                ) : item?.ruleBeneficiaryStatus?.id === 1 ? (
                  <div className="flex gap-2">
                    <CustomButton
                      className="mt-4! w-full!"
                      onClick={() => financeRuleBtnHandler(item?.categoryId)}
                    >
                      قوانین مالی
                    </CustomButton>
                    <CustomButton
                      type="primary"
                      className="mt-4! w-full!"
                      onClick={() => activeCrdBtnHandler(item?.categoryId)}
                    >
                      فعالسازی
                    </CustomButton>
                  </div>
                ) : item?.ruleBeneficiaryStatus?.id === 2 ? (
                  <div className="flex gap-2">
                    <CustomButton className="mt-4! w-full!">قوانین مالی</CustomButton>
                    <CustomButton
                      danger
                      className="mt-4! w-full!"
                      onClick={() => activeCrdBtnHandler(item?.categoryId)}
                    >
                      غیرفعالسازی
                    </CustomButton>
                  </div>
                ) : null}
              </CustomCard>
            </Col>
          ))}
        </Row>
        {/* 3 for number of cards */}
        {data?.length && data?.length > 3 ? (
          <CustomDivider
            text={
              !viewMore ? (
                <div
                  onClick={showDataHandler}
                  className="text-primary-6 flex cursor-pointer items-center gap-1"
                >
                  {`${data?.length ? data.length - 3 : 0} خدمت دیگر`} <IoIosArrowDown />
                </div>
              ) : (
                <div
                  onClick={showDataHandler}
                  className="text-primary-6 flex cursor-pointer items-center gap-1"
                >
                  نمایش کمتر <IoIosArrowUp />
                </div>
              )
            }
          />
        ) : null}
      </div>
    </>
  );
};
export default TemplateServiceCardList;
