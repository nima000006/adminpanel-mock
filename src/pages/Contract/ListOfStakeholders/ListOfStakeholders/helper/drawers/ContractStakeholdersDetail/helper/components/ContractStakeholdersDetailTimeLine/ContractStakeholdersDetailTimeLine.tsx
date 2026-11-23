import { useState } from "react";

import { Descriptions, Modal, Timeline } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { GetContractBeneficiaryDetailResponse } from "../../../@types/@contractStakeholdersDetailDrawerContent";
import ContractStakeholdersDisableModalContent from "../../modal/ContractStakeholdersDisableModalContent/ContractStakeholdersDisableModalContent";

const ContractStakeholdersDetailTimeLine = ({
  data,
}: {
  data: GetContractBeneficiaryDetailResponse | undefined;
}) => {
  const [openDisableModal, setIsDisableModal] = useState({ id: -1, isOpen: false });

  const viewReasonDisable = (id: number) => {
    setIsDisableModal({ id, isOpen: true });
  };
  const closeModalHandler = () => {
    setIsDisableModal({ id: -1, isOpen: false });
  };

  const contractInfo = [
    {
      key: "1",
      label: "",
      children: (
        <div className="flex gap-2">
          <CustomTag color={data?.status.title === "فعال" ? "green" : "red"}>
            {dataPlaceHolder({ data: data?.status.title })}
          </CustomTag>
          <span>وضعیت فعلی</span>
        </div>
      ),
    },
    {
      key: "2",
      label: "تاریخ شروع وضعیت",
      children: dataPlaceHolder({
        data: data?.startDate,
        isDate: true,
        customDateFormat: "HH:mm - YYYY/M/D",
      }),
    },
    {
      key: "3",
      label: "تاریخ ثبت وضعیت",
      children: <>{emptyString}</>,
    },
    {
      key: "4",
      label: "ثبت کننده وضعیت",
      children: dataPlaceHolder({ data: data?.modifiedBy }),
    },
    {
      key: "4",
      label: "",
      children:
        data?.modifiedBy === null ? (
          <CustomButton onClick={() => viewReasonDisable(5)}>
            نمایش علت غیرفعالسازی
          </CustomButton>
        ) : null,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Timeline
        items={[
          {
            children: (
              <Descriptions
                className="body-regular"
                column={1}
                items={contractInfo}
                styles={{
                  label: {
                    fontWeight: "bold",
                    textAlign: "right",
                  },
                }}
              />
            ),
          },
          // {
          //   children: (
          //     <Descriptions
          //       className="body-regular"
          //       column={1}
          //       items={contractInfoSecond}
          //       labelStyle={{
          //         fontWeight: "bold",
          //         textAlign: "right",
          //       }}
          //     />
          //   ),
          // },
        ]}
      />
      {/* DISABLE MODAL */}
      <Modal
        title="علت غیرفعال سازی"
        open={openDisableModal?.isOpen}
        onCancel={() => closeModalHandler()}
        footer={null}
      >
        {
          <ContractStakeholdersDisableModalContent
          // data={data.find((item: any) => item.id === openDisableModal?.id)}
          />
        }
      </Modal>
    </>
  );
};

export default ContractStakeholdersDetailTimeLine;
