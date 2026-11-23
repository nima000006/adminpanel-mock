import { useEffect, useState } from "react";

import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import AddNewSessionGuestModal from "@components/Modals/Committee/SessionCreation/AddNewSessionGuest/AddNewSessionGuestModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { SessionGuestsStepModel } from "@infra/models/tableModels/CommitteeTableModel/SessionCreation/SessionGuestsStepModel";
import { COMMITTEE_SESSION_CREATION_FINAL_CHECK_PAGE_ROUTE } from "@infra/router/routes/committee";
import {
  useLazyGetGuestsListQuery,
  useSendSessionGuestDataMutation,
} from "@infra/states/redux/Apis/committee/committees/committees";
import { PADDING_20 } from "@infra/VARS/globalStyles/globalStyles";

import {
  GuestDataType,
  SendSessionGuestDataResponse,
  SessionRulesStepProps,
} from "./@types/@sessionGuestsStep";
import "./_sessionGuestsStep.scss";

const DeleteSessionGuestModalContent = ({
  guestData,
}: {
  guestData: GuestDataType | null;
}) => {
  return (
    <CustomCard padding={PADDING_20} className="delete-session-guest-modal-container">
      <p className="confirm-text">
        از لغو حضور <span> {`${guestData?.firstName} ${guestData?.lastName}`} </span>
        مطمئن هستید؟
      </p>
    </CustomCard>
  );
};

const SessionGuestsStep = ({ setCurrent }: SessionRulesStepProps) => {
  const [deleteSessionGuestModal, setDeleteSessionGuestModal] = useState(false);
  const [addNewSessionGuestModal, setAddNewSessionGuestModal] = useState({
    isOpen: false,
    id: -1,
  });
  const [removeGuestData, setRemoveGuestData] = useState<GuestDataType | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getGuestsList, { data: getGuestsListData, isLoading: isGetGuestsListLoading }] =
    useLazyGetGuestsListQuery();

  const [sendSessionGuest, { isLoading: isSendSessionGuestLoading }] =
    useSendSessionGuestDataMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+id > 0) {
      getGuestsList(+id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const backBtnHandler = () => {
    setCurrent((prev) => (prev > 1 ? prev - 1 : 0));
    setSearchParams({
      id: id,
      step: "3",
    });
  };

  const finalCheckHandler = () =>
    navigate(`${COMMITTEE_SESSION_CREATION_FINAL_CHECK_PAGE_ROUTE}?id=${id}&step=1`);

  const cancellationHandler = (value: GuestDataType) => {
    setDeleteSessionGuestModal(true);
    setRemoveGuestData(value);
  };
  const closeDeleteSessionGuestModalHandler = () => setDeleteSessionGuestModal(false);

  const sendSessionGuestOnSuccess = (value: SendSessionGuestDataResponse) => {
    if (value?.status === 200) {
      closeDeleteSessionGuestModalHandler();
    }
  };

  const deleteSessionGuestsHandler = () => {
    sendSessionGuest({
      form: "Guests",
      id: "7032080801fb4ffdb1630a2a98919060",
      _data_: {
        firstName: removeGuestData?.firstName,
        phoneNumber: removeGuestData?.phoneNumber,
        presence: false,
        lastName: removeGuestData?.lastName,
        StudentNumber: removeGuestData?.StudentNumber,
        preliminaryMeeting: null,
        agenda: removeGuestData?.agenda,
        id: removeGuestData?.id,
      },
    })
      .unwrap()
      .then(sendSessionGuestOnSuccess);
  };

  const addNewSessionGuestModalHandler = () => {
    if (+id > 0) {
      setAddNewSessionGuestModal({
        isOpen: true,
        id: +id,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-session-creation-session-guests-step-container">
      <div className="border-round-box add-new-person-table-wrapper">
        <div>
          <Button
            type="primary"
            ghost
            className="session-guest-btn"
            onClick={addNewSessionGuestModalHandler}
          >
            افزودن مدعو جدید
          </Button>
        </div>
        <CustomTable
          dataSource={getGuestsListData?.data}
          columns={SessionGuestsStepModel({
            cancellationHandler: cancellationHandler,
          })}
          rowKey="id"
          loading={isGetGuestsListLoading}
          pagination={false}
          {...TABLE_PROPS(getGuestsListData?.data?.length || 0)}
        />
      </div>
      <div className="buttons-container">
        <Button className="back-btn" onClick={backBtnHandler}>
          برگشت
        </Button>
        <Button type="primary" onClick={finalCheckHandler}>
          بررسی نهایی
        </Button>
      </div>
      {deleteSessionGuestModal && (
        <ConfirmationModalWithContent
          isModalOpen={deleteSessionGuestModal}
          title="لغو حضور"
          confirmBtnText="حذف"
          isDangerous={true}
          isConfirmButtonLoading={isSendSessionGuestLoading}
          content={<DeleteSessionGuestModalContent guestData={removeGuestData} />}
          closeModalHandler={closeDeleteSessionGuestModalHandler}
          onConfirmClickHandler={deleteSessionGuestsHandler}
          showIcon={false}
        />
      )}

      {addNewSessionGuestModal?.isOpen && (
        <AddNewSessionGuestModal
          isModalOpen={addNewSessionGuestModal}
          setAddNewSessionGuestModal={setAddNewSessionGuestModal}
        />
      )}
    </div>
  );
};

export default SessionGuestsStep;
