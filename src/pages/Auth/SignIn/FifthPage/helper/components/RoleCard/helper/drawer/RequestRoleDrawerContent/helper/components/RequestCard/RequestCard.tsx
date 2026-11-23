import { useState } from "react";

import { Modal } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  REQUEST_TYPE_STATUS_COLOR,
  REQUEST_TYPE_STATUS_TEXT,
} from "@pages/Auth/_shared/utils";

import ViewCompleteRequestModalContent from "./helper/modal/ViewCompleteRequestModalContent/ViewCompleteRequestModalContent";
import { GetAdminRequestListItem } from "../../../@types/@requestRoleDrawerContentType";

const RequestCard = ({ item }: { item: GetAdminRequestListItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //* ================================ Util Functions ================================
  const viewCompleteRequestHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          footer={
            <CustomButton type="default" onClick={() => closeModalHandler()}>
              بستن
            </CustomButton>
          }
          onCancel={closeModalHandler}
          title="مشاهده کامل درخواست"
          width={800}
          centered={true}
          className="manual-register-dorm-modal-container"
        >
          <ViewCompleteRequestModalContent item={item} />
        </Modal>
      )}

      <div className="border-neutral-5 bg-neutral-2 body-regular flex flex-col gap-4 rounded-2xl p-4!">
        <div className="flex justify-between">
          <span className="h5-medium">{item?.id}</span>
          <span>
            {dataPlaceHolder({
              data: item?.createdDate,
              isDate: true,
              customDateFormat: "HH:mm - YYYY/M/D",
            })}
          </span>
          <CustomTag color={REQUEST_TYPE_STATUS_COLOR[item?.status]}>
            {item?.status ? REQUEST_TYPE_STATUS_TEXT[item?.status] : "-"}
          </CustomTag>
        </div>

        <div>{item?.message}</div>

        <div
          onClick={viewCompleteRequestHandler}
          className="text-primary-5 cursor-pointer text-center"
        >
          مشاهده کامل درخواست
        </div>
      </div>
    </>
  );
};
export default RequestCard;
