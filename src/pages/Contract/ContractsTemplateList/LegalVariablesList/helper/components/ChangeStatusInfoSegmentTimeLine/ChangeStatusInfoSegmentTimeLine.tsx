import { useState } from "react";

import { Modal, Timeline } from "antd";
import { FiCircle } from "react-icons/fi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

import DisableModalContent from "../../modal/DisableModalContent";

const ChangeStatusInfoSegmentTimeLine = ({ data }: { data: any }) => {
  const [openDisableModal, setIsDisableModal] = useState({ id: -1, isOpen: false });
  const viewReasonDisable = (id: number) => {
    setIsDisableModal({ id, isOpen: true });
  };
  const closeModalHandler = () => {
    setIsDisableModal({ id: -1, isOpen: false });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Modal
        title="علت غیرفعال سازی"
        open={openDisableModal?.isOpen}
        onCancel={() => closeModalHandler()}
        footer={null}
      >
        {
          <DisableModalContent
          // data={data.find((item: any) => item.id === openDisableModal?.id)}
          />
        }
      </Modal>

      <div>
        <Timeline
          className="pr-4"
          items={data?.map((item: any) => ({
            dot: <FiCircle size={16} color={item.status ? "#52C41A" : "#FF4D4F"} />,
            children: (
              <div className="body-regular flex flex-col gap-2">
                {/* وضعیت */}
                <div className="flex gap-2">
                  <CustomTag className="w-fit" color={item.status ? "green" : "red"}>
                    {item.status ? "فعال" : "غیرفعال"}
                  </CustomTag>

                  <p className="text-neutral-8 text-sm">وضعیت فعلی</p>
                </div>

                {/* تاریخ‌ها */}
                <div className="flex flex-col gap-2">
                  <p className="text-neutral-8 flex gap-2 text-sm">
                    تاریخ شروع وضعیت
                    <span className="text-neutral-11 font-bold">
                      {dataPlaceHolder({ data: item.startDate, isDate: true })}
                    </span>
                  </p>

                  <p className="text-neutral-8 flex gap-2 text-sm">
                    تاریخ ثبت وضعیت
                    <span className="text-neutral-11 font-bold">
                      {dataPlaceHolder({ data: item.endDate, isDate: true })}
                    </span>
                  </p>

                  <p className="text-neutral-8 flex gap-2 text-sm">
                    ثبت‌کننده وضعیت:
                    <span className="text-neutral-11 font-bold">{item.lastModifier}</span>
                  </p>

                  {item?.status === false ? (
                    <CustomButton
                      type="default"
                      className="w-fit"
                      onClick={() => viewReasonDisable(item?.id)}
                    >
                      نمایش علت غیرفعالسازی
                    </CustomButton>
                  ) : null}
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </>
  );
};
export default ChangeStatusInfoSegmentTimeLine;
