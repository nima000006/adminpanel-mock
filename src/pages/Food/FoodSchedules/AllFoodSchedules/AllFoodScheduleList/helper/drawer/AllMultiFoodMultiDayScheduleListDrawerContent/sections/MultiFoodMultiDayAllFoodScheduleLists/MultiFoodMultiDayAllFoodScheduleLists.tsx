import { useState } from "react";

import { Collapse, Form } from "antd";
import { AiOutlineCopy, AiOutlinePlus } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  dataPlaceHolder,
  dayNameGenerator,
  randomIdGenerator,
} from "@infra/helpers/utils";

import {
  EditFoodModalType,
  StepTwoAddAndEditFormType,
  MultiFoodMultiDayAllFoodScheduleListsProps,
  foodInfoType,
} from "./@types/@multiFoodMultiDayAllFoodScheduleLists";
import MultiFoodMultiDayAllFoodScheduleListsAddFoodModalContent from "./helper/modals/MultiFoodMultiDayAllFoodScheduleListsAddFoodModalContent/MultiFoodMultiDayAllFoodScheduleListsAddFoodModalContent";
import MultiFoodMultiDayAllFoodScheduleListsEditFoodModalContent from "./helper/modals/MultiFoodMultiDayAllFoodScheduleListsEditFoodModalContent/MultiFoodMultiDayAllFoodScheduleListsEditFoodModalContent";
import AllMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel from "./helper/models/MultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel/MultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel";
import "./_multiFoodMultiDayAllFoodScheduleLists.scss";
import CopyFoodModalContent from "./helper/modals/CopyFoodModalContent/CopyFoodModalContent";

const MultiFoodMultiDayAllFoodScheduleLists = ({
  contractId,
  foodInfo,
  dates,
  setFoodInfo,
}: MultiFoodMultiDayAllFoodScheduleListsProps) => {
  const [addFoodModalOpen, setAddFoodModalOpen] = useState({
    isOpen: false,
    date: "",
    id: "-1",
  });
  const [copyFoodModal, setCopyFoodModal] = useState({
    isOpen: false,
    date: "",
  });
  const [selectedCopyDate, setSelectedCopyDate] = useState<string | null>(null);

  const [deleteFoodModalOpen, setDeleteFoodModalOpen] = useState({
    isOpen: false,
    id: "-1",
  });

  const [editFoodModalOpen, setEditFoodModalOpen] = useState<EditFoodModalType>({
    isOpen: false,
    foodData: null,
  });

  const [createFoodForm] = Form.useForm();
  const [editFoodForm] = Form.useForm<StepTwoAddAndEditFormType>();

  //* ================================ Util Functions ================================
  // add food
  const closeAddFoodModalHandler = () => {
    setAddFoodModalOpen({
      isOpen: false,
      id: "-1",
      date: "",
    });
  };

  const addFoodHandler = () => {
    createFoodForm.submit();

    createFoodForm.validateFields().then((value: StepTwoAddAndEditFormType) => {
      const date = addFoodModalOpen?.date;
      const selectedRow = foodInfo?.filter((item) => item?.id === addFoodModalOpen?.id);
      const newItem = {
        rowId: selectedRow[0]?.id,
        date: date,
        requestType: {
          id: value?.foodScheduleType?.code,
          title: value?.foodScheduleType?.label,
        },
        product: {
          id: value?.food?.code,
          title: value?.food?.label,
          maxPrice: value?.food?.item?.maxPrice,
          minPrice: value?.food?.item?.minPrice,
          studentalPrice: value?.food?.item?.studentalPrice,
        },
        meal: {
          id: value?.meal?.code,
          title: value?.meal?.label,
        },
        basePrice: value?.price,
        discount: 0,
        hasLimit: {
          id: value?.hasLimit?.code,
          title: value?.hasLimit?.label,
        },
        maxCount: value?.foodTotalCount,
        maxTotalPerPerson: value?.maxReserveCount,
        id: randomIdGenerator(),
      };

      setFoodInfo((prev) => [...prev, newItem]);

      closeAddFoodModalHandler();
      createFoodForm.resetFields();
    });
  };

  // delete food
  const openDeleteModalHandler = (id: string) => {
    setDeleteFoodModalOpen({
      isOpen: true,
      id,
    });
  };

  const closeDeleteModalHandler = () => {
    setDeleteFoodModalOpen({
      isOpen: false,
      id: "-1",
    });
  };

  const deleteFoodHandler = () => {
    const deleteList = foodInfo?.filter((item) => item?.id !== deleteFoodModalOpen?.id);
    setFoodInfo(deleteList);
    closeDeleteModalHandler();
  };

  // edit food
  const openEditModalHandler = (foodData: foodInfoType) => {
    setEditFoodModalOpen({
      isOpen: true,
      foodData,
    });
  };

  const closeEditModalHandler = () => {
    setEditFoodModalOpen({
      isOpen: false,
      foodData: null,
    });
  };

  const editFoodHandler = () => {
    editFoodForm?.submit();
    editFoodForm?.validateFields().then((value: StepTwoAddAndEditFormType) => {
      const editItemIndex = foodInfo?.findIndex(
        (item) => item?.id === editFoodModalOpen?.foodData?.id
      );

      const oldData = editFoodModalOpen?.foodData;

      const editItem = {
        rowId: oldData?.rowId,
        date: oldData?.date,
        requestType: {
          id: value?.foodScheduleType?.code,
          title: value?.foodScheduleType?.label,
        },
        product: {
          id: value?.food?.code,
          title: value?.food?.label,
          maxPrice: value?.food?.item?.maxPrice,
          minPrice: value?.food?.item?.minPrice,
          studentalPrice: value?.food?.item?.studentalPrice,
        },
        meal: {
          id: value?.meal?.code,
          title: value?.meal?.label,
        },
        basePrice: value?.price,
        discount: 0,
        hasLimit: {
          id: value?.hasLimit?.code,
          title: value?.hasLimit?.label,
        },
        maxCount: value?.foodTotalCount,
        maxTotalPerPerson: value?.maxReserveCount,
        id: oldData?.id,
      };

      setFoodInfo((prev) => {
        prev?.splice(editItemIndex, 1, editItem as any);
        return prev;
      });

      closeEditModalHandler();
      editFoodForm.resetFields();
    });
  };

  // copy food
  const openCopyModalHandler = (date: string) => {
    setCopyFoodModal({
      isOpen: true,
      date,
    });
    setSelectedCopyDate(null);
  };

  const closeCopyModalHandler = () => {
    setCopyFoodModal({
      isOpen: false,
      date: "",
    });
    setSelectedCopyDate(null);
  };

  const copyFoodHandler = () => {
    if (!selectedCopyDate) {
      return;
    }

    const targetDate = copyFoodModal.date;
    const sourceFoods = foodInfo.filter((item) => item.date === selectedCopyDate);

    // Create new food items with the target date
    const copiedFoods = sourceFoods.map((food) => ({
      ...food,
      id: randomIdGenerator(),
      date: targetDate,
    }));
    setFoodInfo((prev) => [...prev, ...copiedFoods]);
    closeCopyModalHandler();
  };

  return (
    <>
      {/* COPY FOOD MODAL */}
      {copyFoodModal?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={copyFoodModal?.isOpen}
          closeModalHandler={closeCopyModalHandler}
          title="کپی غذاها به این روز"
          confirmBtnText="کپی کردن"
          backBtnText="انصراف"
          onConfirmClickHandler={copyFoodHandler}
          content={
            <CopyFoodModalContent
              foodInfo={foodInfo}
              selectedDate={selectedCopyDate}
              onDateSelect={setSelectedCopyDate}
              currentDate={copyFoodModal.date}
            />
          }
          width={800}
        />
      )}

      {/* ADD FOOD MODAL */}
      {addFoodModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={addFoodModalOpen?.isOpen}
          closeModalHandler={closeAddFoodModalHandler}
          title="افزودن غذا"
          confirmBtnText="ایجاد"
          backBtnText="انصراف"
          onConfirmClickHandler={addFoodHandler}
          content={
            <MultiFoodMultiDayAllFoodScheduleListsAddFoodModalContent
              form={createFoodForm}
              contractId={contractId}
            />
          }
          width={800}
        />
      )}

      {/* EDIT FOOD MODAL */}
      {editFoodModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={editFoodModalOpen?.isOpen}
          closeModalHandler={closeEditModalHandler}
          title="ویرایش غذا"
          confirmBtnText="ثبت تغییرات"
          backBtnText="انصراف"
          onConfirmClickHandler={editFoodHandler}
          content={
            <MultiFoodMultiDayAllFoodScheduleListsEditFoodModalContent
              form={editFoodForm}
              contractId={contractId}
              foodInfo={editFoodModalOpen?.foodData}
            />
          }
          width={800}
        />
      )}

      {/* DELETE FOOD MODAL */}
      {deleteFoodModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={deleteFoodModalOpen?.isOpen}
          closeModalHandler={closeDeleteModalHandler}
          title="حذف"
          confirmBtnText="حذف"
          isDangerous
          backBtnText="انصراف"
          onConfirmClickHandler={deleteFoodHandler}
          content={
            <p className="multi-food-multi-day-all-food-schedule-list-delete-food-table">
              آیا از حذف این آیتم اطمینان دارید؟
            </p>
          }
        />
      )}

      <div className="multi-food-multi-day-all-food-schedule-lists">
        <CustomDivider text="لیست برنامه‌های غذایی" />
        <Collapse
          items={dates?.map((item) => {
            const uniqueId = randomIdGenerator();

            const selectFoods = foodInfo?.filter((food) => food?.date === item?.toJSON());

            return {
              key: uniqueId,
              label: (
                <div className="collapse-label-container" key={uniqueId}>
                  <div className="collapse-label">
                    <CustomTag>{dayNameGenerator(item?.toISOString())}</CustomTag>
                    <CustomTag>{`${dataPlaceHolder({ data: item?.toISOString(), isDate: true })}`}</CustomTag>
                    <CustomButton
                      icon={<AiOutlineCopy />}
                      iconPlacement="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCopyModalHandler(item?.toJSON());
                      }}
                      disabled={!foodInfo?.length}
                    >
                      کپی از
                    </CustomButton>
                  </div>
                  <div className="collapse-label">
                    <CustomTag color={selectFoods?.length !== 0 ? "green" : "red"}>
                      {selectFoods?.length !== 0 ? "تعریف شده" : "تعریف نشده"}
                    </CustomTag>
                    <CustomButton
                      icon={<AiOutlinePlus />}
                      iconPlacement="end"
                      onClick={() => {
                        setAddFoodModalOpen({
                          isOpen: true,
                          date: item?.toJSON(),
                          id: uniqueId,
                        });
                      }}
                    >
                      افزودن غذا
                    </CustomButton>
                  </div>
                </div>
              ),
              children:
                selectFoods?.length !== 0 ? (
                  <CustomTable<foodInfoType>
                    dataSource={selectFoods}
                    columns={AllMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel({
                      deleteClickHandler: openDeleteModalHandler,
                      editClickHandler: openEditModalHandler,
                    })}
                    className="multi-food-multi-day-all-food-schedule-list-add-food-table"
                    rowKey="id"
                    pagination={false}
                    {...TABLE_PROPS(selectFoods?.length)}
                  />
                ) : (
                  <CustomEmpty />
                ),
            };
          })}
          defaultActiveKey={[]}
        />
      </div>
    </>
  );
};

export default MultiFoodMultiDayAllFoodScheduleLists;
