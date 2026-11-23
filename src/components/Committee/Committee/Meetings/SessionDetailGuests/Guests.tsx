import { useEffect, useState } from "react";

import { Button, Form, FormInstance } from "antd";
import { useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { CancellationAttendanceResponse } from "./@types/@guests";
import { GuestsModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionDetails/SessionOrder/GuestsModel";
import {
  useCancellationAttendanceMutation,
  useLazyGetAbsentReasonsQuery,
  useLazyGetGuestsListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import AddNewSessionGuestModal from "../../../../Modals/Committee/SessionCreation/AddNewSessionGuest/AddNewSessionGuestModal";
import ConfirmationModalWithContent from "../../../../Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import "./_guests.scss";

const AbsentConfirmationModalContent = ({
  form,
}: {
  form: FormInstance<{
    absentReason: { children: string };
    absentDescription: string;
  }>;
}) => {
  //? ================================  Api Calls ================================
  const [
    getAbsentReasons,
    { data: absentReasonsData, isLoading: isAbsentReasonsLoading },
  ] = useLazyGetAbsentReasonsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAbsentReasons();
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="meeting-detail-absent-person-modal-container"
    >
      <Form className="inputs-container" form={form}>
        <CustomSelect
          label="دلیل"
          name="absentReason"
          isLoading={isAbsentReasonsLoading}
          options={absentReasonsData?.data}
          form={form}
        />
        <CustomTextArea label="توضیحات" name="absentDescription" placeholder="توضیحات" />
      </Form>
    </CustomCard>
  );
};

const Guests = () => {
  const [addNewSessionGuestModal, setAddNewSessionGuestModal] = useState({
    isOpen: false,
    id: -1,
  });

  const [isAbsentModalOpen, setIsAbsentModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [searchParams] = useSearchParams();
  const { session } = Object.fromEntries([...searchParams]);
  const [absentForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getGuestsList, { data: getGuestsListData, isLoading: isGetGuestsListLoading }] =
    useLazyGetGuestsListQuery();

  const [cancellationAttendance, { isLoading: isCancellationAttendanceLoading }] =
    useCancellationAttendanceMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+session > 0) {
      getGuestsList(+session);
    }
  }, [session]);

  //* ================================ Util Functions ================================
  const absentConfirmationHandler = () => {
    const values = absentForm.getFieldsValue();
    cancellationAttendance({
      form: "CancellationAttendance",
      id: "850a47bee83c4b0eb0b0b22c81b452ac",
      _data_: {
        reasonAbsence: values?.absentReason?.title,
        presence: false,
        descAbsence: values?.absentDescription,
        id: isAbsentModalOpen?.id,
      },
    })
      .unwrap()
      .then(cancellationAttendanceOnSuccess);
  };

  const addNewSessionGuestModalHandler = () => {
    if (+session > 0) {
      setAddNewSessionGuestModal({
        isOpen: true,
        id: +session,
      });
    }
  };

  const cancellationAttendanceOnSuccess = (value: CancellationAttendanceResponse) => {
    if (value?.status === 200) {
      setIsAbsentModalOpen({
        isOpen: false,
        id: -1,
      });
    }
  };

  const openAbsentModalHandler = (id: string) => {
    setIsAbsentModalOpen({
      isOpen: true,
      id: +id,
    });
  };

  const closeAbsentModalHandler = () => {
    setIsAbsentModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {addNewSessionGuestModal?.isOpen && (
        <AddNewSessionGuestModal
          isModalOpen={addNewSessionGuestModal}
          setAddNewSessionGuestModal={setAddNewSessionGuestModal}
        />
      )}

      {isAbsentModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="اعلام غیبت"
          isModalOpen={isAbsentModalOpen?.isOpen}
          confirmBtnText="اعلام غیبت"
          closeModalHandler={closeAbsentModalHandler}
          onConfirmClickHandler={absentConfirmationHandler}
          content={<AbsentConfirmationModalContent form={absentForm} />}
          isConfirmButtonLoading={isCancellationAttendanceLoading}
          isDangerous={true}
          showIcon={false}
        />
      )}

      <div className="guests-container">
        <CustomDivider text="مدعوین" />
        <Button
          type="primary"
          ghost
          className="add-new-guests-btn"
          onClick={addNewSessionGuestModalHandler}
        >
          افزودن مدعو جدید
        </Button>
        <CustomTable
          dataSource={getGuestsListData?.data}
          columns={GuestsModel({
            absentClickHandler: openAbsentModalHandler,
          })}
          {...TABLE_PROPS(getGuestsListData?.data?.length || 0)}
          rowKey="id"
          loading={isGetGuestsListLoading}
          className="committee-guests-table"
        />
      </div>
    </>
  );
};
export default Guests;
