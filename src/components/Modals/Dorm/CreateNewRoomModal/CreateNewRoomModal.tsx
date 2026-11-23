import { useState } from "react";

import { Button, Checkbox, Modal, Tabs } from "antd";

import CustomCard from "../../../CustomCard/CustomCard";
import CustomInput from "../../../CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelectField from "../../../CustomInputs/CustomSelectField/CustomSelectField";
import CustomDivider from "../../../Renderers/CustomDivider/CustomDivider";
import "./_createNewRoomModal.scss";

type CreateNewRoomModalProp = {
  setNewRoomModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
    }>
  >;
  newRoomModal: { isOpen: boolean };
};
const SingleCreate = () => {
  return (
    <div className="single-create-container">
      <CustomDivider text=" اطلاعات" />
      <div className="inputs-container">
        <CustomInput label="نام" type="text" placeholder="نام اتاق" name="name" />
        <CustomInput
          label="شماره"
          type="text"
          placeholder="شماره اتاق"
          name="roomNumber"
        />
        <CustomSelectField
          label="ظرفیت اسمی"
          placeholder="انتخاب کنید"
          //   handleChange={capacityHandler}
          options={[]}
        />
        <CustomInput
          label="نوع رزرو"
          type="text"
          placeholder="نوع رزرو اتاق"
          name="reservationType"
        />
        <CustomInput
          label="درجه کیفی"
          type="text"
          placeholder="درجه کیفی اتاق"
          name="roomGrade"
        />
        <CustomInput
          label="ظرفیت مانده فعلی"
          type="text"
          placeholder="ظرفیت مانده فعلی اتاق"
          name="remainingCapacity"
        />
      </div>
      <div className="type-of-single-room">
        <CustomDivider text=" نوع" />
        <div className="type-data-container">
          <CustomRadioGroup
            options={[
              { label: "مستقل", value: 0 },
              { label: "سوییت", value: 1 },
              { label: "زیرمجموعه", value: 2 },
            ]}
          />
          <div className="suit-select-container">
            <CustomSelectField
              label="سوییت"
              placeholder="انتخاب کنید"
              //   handleChange={capacityHandler}
              options={[]}
            />
            <Button type="primary">ثبت سوییت</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const MultipleCreate = () => {
  return <div className="multiple-new-room-container"></div>;
};
const CreateNewRoomModal = ({
  setNewRoomModal,
  newRoomModal,
}: CreateNewRoomModalProp) => {
  const [, setIsDormActive] = useState(false);
  const newRoomTabs = [
    { label: "ایجاد تکی", children: <SingleCreate />, key: "1" },
    { label: "ایجاد گروهی", children: <MultipleCreate />, key: "2" },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {newRoomModal?.isOpen && (
        <Modal
          title="اتاق جدید"
          open={newRoomModal?.isOpen}
          // onOk={handleOk}
          onCancel={() => setNewRoomModal({ isOpen: false })}
          width={1000}
          footer={null}
          className="create-new-modal-room-container"
          centered
        >
          <CustomCard className="active-and-role-section-container">
            <div className="active-section">
              <span className="label">فعال / غیر فعال</span>
              <div className="active-section-checkbox">
                <Checkbox onChange={(e) => setIsDormActive(e.target.checked)}>
                  فعال
                </Checkbox>
              </div>
            </div>
          </CustomCard>
          <CustomCard>
            <Tabs items={newRoomTabs} className="new-room-tabs-container" />
          </CustomCard>
          <div className="btns-container">
            <Button type="primary">ایجاد</Button>
            <Button onClick={() => setNewRoomModal({ isOpen: false })}>انصراف</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateNewRoomModal;
