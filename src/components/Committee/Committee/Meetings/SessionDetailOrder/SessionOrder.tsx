import { useEffect, useState } from "react";

import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { AddNewAgendaResponse } from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionRules/@types/@sessionRulesStep";

import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { ProcessedAccusationsModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionDetails/SessionOrder/ProcessedAccusationsModel";
import { SessionAccusationModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionDetails/SessionOrder/SessionAccusationModel";
import { COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useAddNewAgendaMutation,
  useLazyGetListOfSessionCreationAccusationsQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import AddNewSessionRuleModal from "../../../../Modals/Committee/SessionCreation/AddNewSessionRule/AddNewSessionRuleModal";
import ConfirmationVerdictModal from "../../../../Modals/Committee/SessionDetailModal/ConfirmationVerdict/ConfirmationVerdict";
import ReVotingModal from "../../../../Modals/Committee/SessionDetailModal/ReVoting/ReVoting";
import ConfirmationModalWithContent from "../../../../Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";

import "./_sessionOrder.scss";

const ADD_NEW_AGENDA_SUCCESS_MSG = "حذف دستور جلسه با موفقیت انجام شد.";

const SessionOrder = () => {
  // Modals
  //عودت به آماده جلسه
  const [isReturnToSessionModalOpen, setIsReturnToSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  // افزودن دستورجلسه جدید
  const [addNewSessionRuleModal, setAddNewSessionRuleModal] = useState({
    isOpen: false,
    id: -1,
  });
  // تایید حکم
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  //رای گیری مجدد
  const [isReVotingModalOpen, setIsReVotingModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { session } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  //داده های جداول
  const [
    getListOfSessionCreationAccusations,
    {
      data: listOfSessionCreationAccusations,
      isLoading: isListOfSessionCreationAccusationsLoading,
    },
  ] = useLazyGetListOfSessionCreationAccusationsQuery();

  //عودت به آماده جلسه
  const [addNewAgenda, { isLoading: isAddNewAgendaLoading }] = useAddNewAgendaMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+session > 0) {
      getTablesData();
    }
  }, [session]);

  //* ================================ Util Functions ================================
  // افزودن دستورجلسه جدید
  const addNewSessionRuleModalHandler = () => {
    if (session) {
      setAddNewSessionRuleModal({
        isOpen: true,
        id: +session,
      });
    }
  };
  //عودت به آماده جلسه
  const returnToSessionClickHandler = (id: string) => {
    setIsReturnToSessionModalOpen({
      isOpen: true,
      id: +id,
    });
  };
  const deleteRuleModalCloseHandler = () => {
    setIsReturnToSessionModalOpen({
      isOpen: false,
      id: -1,
    });
  };
  //رسیدگی
  const checkClickHandler = (id: string) => {
    if (id) {
      navigate({
        pathname: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
        search: makeSearchParams({ id }),
      });
    }
  };
  // تایید حکم
  const confirmationClickHandler = () => {
    setIsConfirmationModalOpen({
      isOpen: true,
      id: -1,
    });
  };
  //رای گیری مجدد
  const reVotingClickHandler = (id: string) => {
    setIsReVotingModalOpen({
      isOpen: true,
      id: +id,
    });
  };

  const getTablesData = () => {
    getListOfSessionCreationAccusations({
      firstResult: 0,
      maxResults: 50,
      meetingId: +session,
    });
  };

  //عودت به آماده جلسه
  const addNewAgendaOnSuccess = (value: AddNewAgendaResponse) => {
    if (value?.status === 200) {
      toast.success(ADD_NEW_AGENDA_SUCCESS_MSG, {
        toastId: ADD_NEW_AGENDA_SUCCESS_MSG,
      });
      // getTablesData();
      deleteRuleModalCloseHandler();
    }
  };

  const returnToSessionConfirmation = () => {
    if (isReturnToSessionModalOpen?.id > 0) {
      addNewAgenda({
        form: "AddNewAgenda",
        id: "2854cc10bd8749e582dc48871aee3fa9",
        _data_: {
          meeting: null,
          id: isReturnToSessionModalOpen?.id,
        },
      })
        .unwrap()
        .then(addNewAgendaOnSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isReturnToSessionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="عودت به آماده جلسه"
          isModalOpen={isReturnToSessionModalOpen?.isOpen}
          confirmBtnText="تایید"
          closeModalHandler={deleteRuleModalCloseHandler}
          onConfirmClickHandler={returnToSessionConfirmation}
          content={
            <div className="return-to-session-modal-container">
              <p className="desc">آیا از عودت به آماده جلسه مطمئن هستید؟</p>
            </div>
          }
          isConfirmButtonLoading={isAddNewAgendaLoading}
          isDangerous={true}
          showIcon={false}
        />
      )}
      {addNewSessionRuleModal?.isOpen && (
        <AddNewSessionRuleModal
          isModalOpen={addNewSessionRuleModal}
          setAddNewSessionRuleModal={setAddNewSessionRuleModal}
        />
      )}

      <div className="committee-session-order-container">
        <div className="session-order-first-box">
          <CustomDivider text="اتهامات جلسه" />
          <Button
            type="primary"
            ghost
            className="add-new-accusation-btn"
            onClick={addNewSessionRuleModalHandler}
          >
            افزودن دستور جلسه جدید
          </Button>
          <CustomTable
            dataSource={listOfSessionCreationAccusations?.data?.filter(
              (item) => item.preliminaryProcessing === true
            )}
            columns={SessionAccusationModel({
              checkClickHandler: checkClickHandler,
              rejectClickHandler: returnToSessionClickHandler,
            })}
            rowKey="id"
            {...TABLE_PROPS(listOfSessionCreationAccusations?.data?.length || 0)}
            loading={isListOfSessionCreationAccusationsLoading}
            className="committee-session-accusation-table"
          />
        </div>

        {/* second box */}
        {/* confirm modal */}
        {isConfirmationModalOpen?.isOpen && (
          <ConfirmationVerdictModal
            isConfirmationModalOpen={isConfirmationModalOpen}
            setIsConfirmationModalOpen={setIsConfirmationModalOpen}
          />
        )}

        {/* re voting modal */}
        {isReVotingModalOpen?.isOpen && (
          <ReVotingModal
            isReVotingModalOpen={isReVotingModalOpen}
            setIsReVotingModalOpen={setIsReVotingModalOpen}
          />
        )}

        <div className="session-order-second-box">
          <CustomDivider text="اتهامات رسیدگی شده" />
          <CustomTable
            dataSource={listOfSessionCreationAccusations?.data?.filter(
              (item) => item.preliminaryProcessing !== true
            )}
            columns={ProcessedAccusationsModel({
              checkClickHandler: checkClickHandler,
              confirmationClickHandler: confirmationClickHandler,
              reVotingClickHandler: reVotingClickHandler,
            })}
            rowKey="id"
            pagination={false}
            {...TABLE_PROPS(listOfSessionCreationAccusations?.data?.length || 0)}
            loading={isListOfSessionCreationAccusationsLoading}
          />
        </div>
      </div>
    </>
  );
};
export default SessionOrder;
