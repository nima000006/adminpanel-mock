import { useEffect, useState } from "react";

import { Button } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import AddNewSessionRuleModal from "@components/Modals/Committee/SessionCreation/AddNewSessionRule/AddNewSessionRuleModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { SessionRulesStepModel } from "@infra/models/tableModels/CommitteeTableModel/SessionCreation/SessionRulesStepModal/SessionRulesStepModel";
import {
  useAddNewAgendaMutation,
  useLazyGetListOfSessionCreationAccusationsQuery,
} from "@infra/states/redux/Apis/committee/committees/committees";
import { PADDING_20 } from "@infra/VARS/globalStyles/globalStyles";

import { AddNewAgendaResponse, SessionRulesStepProps } from "./@types/@sessionRulesStep";
import "./_sessionRulesStep.scss";

const ADD_NEW_AGENDA_SUCCESS_MSG = "حذف دستور جلسه با موفقیت انجام شد.";

const DeleteSessionRuleModalContent = () => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-session-creation-delete-session-rule-modal-container"
    >
      <p className="confirm-text">از حذف دستور جلسه مطمئن هستید؟</p>
    </CustomCard>
  );
};

const SessionRulesStep = ({ setCurrent }: SessionRulesStepProps) => {
  const [deleteSessionRuleModal, setDeleteSessionRuleModal] = useState({
    isOpen: false,
    id: -1,
  });
  const [addNewSessionRuleModal, setAddNewSessionRuleModal] = useState({
    isOpen: false,
    id: -1,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  //? ================================  Api Calls ================================
  const [
    getListOfSessionCreationAccusations,
    {
      data: listOfSessionCreationAccusations,
      isLoading: isListOfSessionCreationAccusationsLoading,
    },
  ] = useLazyGetListOfSessionCreationAccusationsQuery();

  const [addNewAgenda, { isLoading: isAddNewAgendaLoading }] = useAddNewAgendaMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getListOfSessionCreationAccusations({
        firstResult: 0,
        maxResults: 50,
        meetingId: +id,
      });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const backBtnHandler = () => {
    setCurrent((prev) => (prev > 1 ? prev - 1 : 0));
    setSearchParams({
      id: id,
      step: "2",
    });
  };
  const nextBtnHandler = () => {
    setCurrent((prev) => (prev < 3 ? prev + 1 : 3));
    setSearchParams({
      id: id,
      step: "4",
    });
  };

  const deleteRuleModalOpenHandler = (key: number) => {
    setDeleteSessionRuleModal({
      isOpen: true,
      id: key,
    });
  };
  const deleteRuleModalCloseHandler = () => {
    setDeleteSessionRuleModal({
      isOpen: false,
      id: -1,
    });
  };
  const addNewSessionRuleModalHandler = () => {
    if (id) {
      setAddNewSessionRuleModal({
        isOpen: true,
        id: +id,
      });
    }
  };

  const addNewAgendaOnSuccess = (value: AddNewAgendaResponse) => {
    if (value?.status === 200) {
      toast.success(ADD_NEW_AGENDA_SUCCESS_MSG, {
        toastId: ADD_NEW_AGENDA_SUCCESS_MSG,
      });
      deleteRuleModalCloseHandler();
    }
  };

  const deleteSessionRuleHandler = () => {
    if (deleteSessionRuleModal?.id > 0) {
      addNewAgenda({
        form: "AddNewAgenda",
        id: "2854cc10bd8749e582dc48871aee3fa9",
        _data_: {
          meeting: null,
          id: deleteSessionRuleModal?.id,
        },
      })
        .unwrap()
        .then(addNewAgendaOnSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {addNewSessionRuleModal?.isOpen && (
        <AddNewSessionRuleModal
          isModalOpen={addNewSessionRuleModal}
          setAddNewSessionRuleModal={setAddNewSessionRuleModal}
        />
      )}

      {deleteSessionRuleModal?.isOpen && (
        <ConfirmationModalWithContent
          title="حذف دستور جلسه"
          isModalOpen={deleteSessionRuleModal?.isOpen}
          closeModalHandler={deleteRuleModalCloseHandler}
          onConfirmClickHandler={deleteSessionRuleHandler}
          confirmBtnText="حذف"
          isConfirmButtonLoading={isAddNewAgendaLoading}
          isDangerous={true}
          content={<DeleteSessionRuleModalContent />}
          showIcon={false}
        />
      )}

      <div className="committee-session-creation-session-rules-step-container">
        <div className="border-round-box add-new-rule-table-wrapper">
          <div>
            <Button
              type="primary"
              ghost
              className="session-rule-btn"
              onClick={addNewSessionRuleModalHandler}
            >
              افزودن دستور جلسه جدید
            </Button>
          </div>
          <CustomTable
            dataSource={listOfSessionCreationAccusations?.data}
            columns={SessionRulesStepModel({
              deleteHandler: deleteRuleModalOpenHandler,
            })}
            rowKey="id"
            pagination={false}
            {...TABLE_PROPS(listOfSessionCreationAccusations?.data?.length || 0)}
            loading={isListOfSessionCreationAccusationsLoading}
            className="session-rules-step-modal-container"
          />
        </div>
        <div className="buttons-container">
          <Button className="back-btn" onClick={backBtnHandler}>
            برگشت
          </Button>
          <Button type="primary" onClick={nextBtnHandler}>
            بعدی
          </Button>
        </div>
      </div>
    </>
  );
};

export default SessionRulesStep;
