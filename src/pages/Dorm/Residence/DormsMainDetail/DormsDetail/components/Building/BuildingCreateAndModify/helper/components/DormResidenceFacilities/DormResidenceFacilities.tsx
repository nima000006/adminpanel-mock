import { useEffect, useState } from "react";

import { Form, Tabs } from "antd";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { useSearchParams } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { randomIdGenerator } from "@infra/helpers/utils";

import {
  DormResidenceFacilitiesProps,
  EditFacilitiesTypes,
} from "./@types/@dormResidenceFacilities";
import AddFacilitiesModalContent from "./helper/modals/AddFacilities/AddFacilitiesModalContent";
import { DormFacilitiesType } from "../../../@types/@buildingCreateAndModify";
import EditFacilitiesModalContent from "./helper/modals/EditFacilities/EditFacilitiesModalContent";
import DormResidenceFacilitiesTableModel from "./helper/models/DormResidenceFacilitiesTableModel/DormResidenceFacilitiesTableModel";
import "./_dormResidenceFacilities.scss";

export const allFacilitiesId = "-1";

const DormResidenceFacilities = ({
  facilitiesData,
  setFacilitiesData,
  facilityList,
  facilityTypeData,
}: DormResidenceFacilitiesProps) => {
  const [isAddFacilitiesModalOpen, setIsAddFacilitiesModalOpen] = useState(false);
  const [deleteFacilities, setDeleteFacilities] = useState({
    id: "-1",
    isOpen: false,
  });
  const [editFacilities, setEditFacilities] = useState<EditFacilitiesTypes>({
    data: null,
    isOpen: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  //? ================================ Effects ================================
  useEffect(() => {
    setSearchParams({ ...url, facilityTabId: allFacilitiesId });
  }, []);

  //* ================================ Util Functions ================================

  //Add
  const openAddModalHandler = () => setIsAddFacilitiesModalOpen(true);

  const closeAddModalHandler = () => {
    setIsAddFacilitiesModalOpen(false);
    addForm.resetFields();
  };

  const onAddHandler = () => {
    addForm.submit();
    addForm.validateFields().then((value) => {
      setFacilitiesData((prev) => [
        ...prev,
        {
          title: {
            title: value?.facilityTitle?.title,
            id: value?.facilityTitle?.code,
          },
          type: {
            title: value?.facilityType?.title,
            id: value?.facilityType?.code,
          },
          unit: value?.facilityTitle?.item?.unit,
          amount: value?.amount,
          id: randomIdGenerator(),
        },
      ]);
      closeAddModalHandler();
    });
  };

  //Delete
  const openDeleteFacilitiesModalHandler = (id: string) => {
    setDeleteFacilities({
      id: id,
      isOpen: true,
    });
  };
  const closeDeleteFacilitiesModalHandler = () => {
    setDeleteFacilities({
      id: "-1",
      isOpen: false,
    });
  };
  const onDeleteHandler = () => {
    setFacilitiesData((prev) => {
      const tempData = [...prev]?.filter((item) => item?.id !== deleteFacilities?.id);
      return tempData;
    });
    closeDeleteFacilitiesModalHandler();
  };

  //Edit
  const openEditFacilitiesModalHandler = (value: DormFacilitiesType) => {
    setEditFacilities({ data: value, isOpen: true });
  };
  const closeEditFacilitiesModalHandler = () => {
    setEditFacilities({ data: null, isOpen: false });
  };
  const onEditHandler = () => {
    editForm.submit();
    editForm.validateFields().then((value) => {
      const findEditItemIndex = [...facilitiesData]?.findIndex(
        (item) => item?.id === editFacilities?.data?.id
      );

      const updateList = [...facilitiesData]?.map((item, index) => {
        if (index === findEditItemIndex) {
          return {
            title: {
              title: value?.facilityTitle?.title,
              id: value?.facilityTitle?.code,
            },
            type: {
              title: value?.facilityType?.label,
              id: value?.facilityType?.code,
            },
            unit: value?.facilityTitle?.item?.unit,
            amount: value?.amount,
            id: randomIdGenerator(),
          };
        } else {
          return item;
        }
      });

      setFacilitiesData(updateList);
      closeEditFacilitiesModalHandler();
      editForm.resetFields();
    });
  };

  return (
    <>
      {/* ADD MODAL */}
      {isAddFacilitiesModalOpen && (
        <ConfirmationModalWithContent
          title="افزودن امکانات"
          isModalOpen={isAddFacilitiesModalOpen}
          confirmBtnText="افزودن"
          backBtnText="انصراف"
          closeModalHandler={closeAddModalHandler}
          onConfirmClickHandler={onAddHandler}
          content={
            <AddFacilitiesModalContent
              form={addForm}
              facilityTypeData={facilityTypeData ? facilityTypeData : []}
            />
          }
        />
      )}

      {/* DELETE MODAL */}
      {deleteFacilities?.isOpen && (
        <ConfirmationModalWithContent
          title="حذف امکان"
          isModalOpen={deleteFacilities?.isOpen}
          confirmBtnText="حذف کن"
          backBtnText="انصراف"
          isDangerous
          closeModalHandler={closeDeleteFacilitiesModalHandler}
          onConfirmClickHandler={onDeleteHandler}
          content={
            <p className="dorm-residence-delete-facility-modal-text">
              آیا از حذف امکان مورد نظر اطمینان دارید؟
            </p>
          }
          iconType="error"
          titleIcon={<AiFillCloseCircle className="icon-title" />}
          customClass="delete-dorm-facilities-modal-container"
        />
      )}

      {/* EDIT MODAl */}
      {editFacilities?.isOpen && (
        <ConfirmationModalWithContent
          title="ویرایش امکانات"
          isModalOpen={editFacilities?.isOpen}
          confirmBtnText="ثبت تغییرات"
          backBtnText="انصراف"
          closeModalHandler={closeEditFacilitiesModalHandler}
          onConfirmClickHandler={onEditHandler}
          content={
            <EditFacilitiesModalContent
              form={editForm}
              facilityTypeData={facilityTypeData ? facilityTypeData : []}
              facilityData={editFacilities?.data}
            />
          }
        />
      )}

      <div className="dorm-residence-facilities-info-container">
        <CustomDivider
          text="امکانات ساختمان"
          extraContent={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={openAddModalHandler}
            >
              افزودن امکانات
            </CustomButton>
          }
        />
        <Tabs
          tabPosition="right"
          items={facilityList?.map((item) => ({
            label: item.title,
            key: item.id?.toString(),
            children: (
              <CustomTable
                dataSource={
                  url?.facilityTabId === allFacilitiesId
                    ? facilitiesData
                    : facilitiesData?.filter(
                        (item) => item.type?.id === +url?.facilityTabId
                      )
                }
                rowKey="id"
                columns={DormResidenceFacilitiesTableModel({
                  onEditHandler: openEditFacilitiesModalHandler,
                  onDeleteHandler: openDeleteFacilitiesModalHandler,
                })}
                className="dorm-residence-facilities-table-container"
                pagination={paginationConfig}
                {...TABLE_PROPS(
                  (url?.facilityTabId === allFacilitiesId
                    ? facilitiesData?.length
                    : facilitiesData?.filter(
                        (item) => item.type?.id === +url?.facilityTabId
                      ).length) || 0
                )}
              />
            ),
          }))}
          className="dorm-facilities-tabs"
          onChange={(value) => setSearchParams({ ...url, facilityTabId: value })}
        />
      </div>
    </>
  );
};

export default DormResidenceFacilities;
