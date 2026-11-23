import { useState } from "react";

import { FiArrowLeft } from "react-icons/fi";
import { RxCopy } from "react-icons/rx";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { TemplateBoxProps } from "./@types/@templateBox";
import TemplateSettingCopyDrawerContent from "../../drawer/TemplateSettingCopyDrawerContent/TemplateSettingCopyDrawerContent";
import TemplateSettingEditDrawerContent from "../../drawer/TemplateSettingEditDrawerContent/TemplateSettingEditDrawerContent";
import TemplateSettingShowMoreDrawerContent from "../../drawer/TemplateSettingShowMoreDrawerContent/TemplateSettingShowMoreDrawerContent";

const TemplateBox = ({
  item,
  relatedTerm,
  contractTermsTypeData,
  mainForm,
  getContractTermsData,
}: TemplateBoxProps) => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState({ id: -1, isOpen: false });
  const [isCopyDrawerOpen, setIsCopyDrawerOpen] = useState({ id: -1, isOpen: false });
  const [isShowMoreDrawerOpen, setIsShowMoreDrawerOpen] = useState({
    id: -1,
    isOpen: false,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({ id: -1, isOpen: false });

  // handler
  const showMoreClickHandler = (id: number) => {
    setIsShowMoreDrawerOpen({ id, isOpen: true });
  };
  // const deleteBtnHandler = (id: number) => {
  //   setIsDeleteModalOpen({ id, isOpen: true });
  // };
  // const editBtnHandler = (id: number) => {
  //   setIsEditDrawerOpen({ id, isOpen: true });
  // };
  const copyBtnHandler = (id: number) => {
    setIsCopyDrawerOpen({ id, isOpen: true });
  };

  const closeEditDrawerHandler = () => {
    setIsEditDrawerOpen({ id: -1, isOpen: false });
  };
  const closeCopyDrawerHandler = () => {
    setIsCopyDrawerOpen({ id: -1, isOpen: false });
  };
  const closeShowMoreDrawerHandler = () => {
    setIsShowMoreDrawerOpen({ id: -1, isOpen: false });
  };
  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen({ id: -1, isOpen: false });
  };

  const confirmDeleteHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* EDIT DRAWER */}
      {isEditDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeEditDrawerHandler}
          open={isEditDrawerOpen?.isOpen}
          content={
            <TemplateSettingEditDrawerContent
              closeDrawerHandler={closeEditDrawerHandler}
              defaultData={item}
              relatedTerm={relatedTerm}
              contractTermsTypeData={contractTermsTypeData}
              mainForm={mainForm}
              getContractTermsData={getContractTermsData}
            />
          }
          width={800}
        />
      )}

      {/* COPY DRAWER */}
      {isCopyDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeCopyDrawerHandler}
          open={isCopyDrawerOpen?.isOpen}
          content={
            <TemplateSettingCopyDrawerContent
              closeDrawerHandler={closeCopyDrawerHandler}
              defaultData={item}
              relatedTerm={relatedTerm}
              contractTermsTypeData={contractTermsTypeData}
              mainForm={mainForm}
              getContractTermsData={getContractTermsData}
            />
          }
          width={800}
        />
      )}
      {/* DELETE MODAL */}
      {isDeleteModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="حذف قالب "
          isModalOpen={isDeleteModalOpen.isOpen}
          confirmBtnText="تایید و حذف"
          isDangerous={true}
          backBtnText="انصراف"
          closeModalHandler={closeDeleteModalHandler}
          onConfirmClickHandler={confirmDeleteHandler}
          content={
            <p className="body-regular">آیا از حذف این قالب قرارداد اطمینان دارید ؟</p>
          }
          width={600}
          // isConfirmButtonLoading={}
          showIcon={true}
        />
      )}
      {/* SHOW MORE DRAWER */}
      {isShowMoreDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeShowMoreDrawerHandler}
          open={isShowMoreDrawerOpen?.isOpen}
          content={
            <TemplateSettingShowMoreDrawerContent
              closeDrawerHandler={closeShowMoreDrawerHandler}
              data={item}
              relatedTerm={relatedTerm}
            />
          }
          size="large"
        />
      )}

      <div className="body-regular mb-4! flex flex-col gap-2">
        <div className="flex justify-between">
          <span>{dataPlaceHolder({ data: item?.title })}</span>
          <div className="flex gap-2">
            {/* Todo[Atefeh]: delete if not necessary in future */}
            {/* delete btn */}
            {/* <div
              onClick={() => deleteBtnHandler(item.id)}
              className="border-dustred-6 flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border"
            >
              {<FiTrash color={"#F5222D"} />}
            </div> */}
            {/* edit btn */}
            {/* <div
              onClick={() => editBtnHandler(item?.id)}
              className="border-neutral-5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border"
            >
              {<AiOutlineEdit color={"#1F1F1F"} />}
            </div> */}
            {/* copy btn */}
            <div
              onClick={() => copyBtnHandler(item?.id)}
              className="border-neutral-5 bg-primary-6 flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border"
            >
              {<RxCopy color="#FFFFFF" />}
            </div>
          </div>
        </div>

        <div className="bg-neutral-3 flex flex-col gap-2 rounded-xl px-3! py-2!">
          <p>{dataPlaceHolder({ data: item?.clause })}</p>
          <div
            className="flex cursor-pointer items-center justify-end gap-1"
            onClick={() => showMoreClickHandler(item?.id)}
          >
            <span className="text-primary-6">نمایش بیشتر</span>
            <FiArrowLeft color="#1890FF" />
          </div>
        </div>
      </div>
    </>
  );
};
export default TemplateBox;
