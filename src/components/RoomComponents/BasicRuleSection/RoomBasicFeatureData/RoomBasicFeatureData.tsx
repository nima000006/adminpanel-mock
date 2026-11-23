import { AiOutlineEdit } from "react-icons/ai";

import {
  FONTSIZE_16,
  PADDING_32,
} from "../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../CustomCard/CustomCard";
import InputWithRegisterButton from "../../InputWithRegisterButton/InputWithRegisterButton";
import "./_roomBasicFeatureData.scss";

const RoomBasicFeatureData = () => {
  return (
    <div className="room-basic-feature-data-container">
      <div className="start-date-container">
        <AiOutlineEdit style={{ color: "#1890FF", fontSize: FONTSIZE_16 }} />
        <span className="start-date">شروع از 02 / 02 / 1402</span>
      </div>
      <main className="room-basic-feature-data-main-container">
        <CustomCard padding={PADDING_32} className="bg-gray">
          <div className="room-basic-feature-card-container">
            <h3 className="card-title">
              چند روز قبل از دوره اتاق مورد نظر قابل رزرو باشد؟
            </h3>
            <div className="card-item">
              <h4 className="card-item-header">ماهانه</h4>
              <div className="card-item-inputs">
                <InputWithRegisterButton
                  label="از چند روز قبل"
                  placeHolder="5"
                  onClickHandler={() => {}}
                  name=""
                />
                <InputWithRegisterButton
                  label="تا چند روز بعد"
                  placeHolder="5"
                  onClickHandler={() => {}}
                  name=""
                />
              </div>
            </div>
            <div className="card-item">
              <h4 className="card-item-header">ترمیک</h4>
              <div className="card-item-inputs">
                <InputWithRegisterButton
                  label="از چند روز قبل"
                  placeHolder="5"
                  onClickHandler={() => {}}
                  name=""
                />
                <InputWithRegisterButton
                  label="تا چند روز بعد"
                  placeHolder="5"
                  onClickHandler={() => {}}
                  name=""
                />
              </div>
            </div>
          </div>
        </CustomCard>
        <CustomCard padding={PADDING_32} className="bg-gray">
          <div className="room-basic-feature-card-container">
            <h3 className="card-title">تا چند دوره مشخص قابل رزرو باشد؟ </h3>
            <div className="cards-container">
              <div className="card-item">
                <h4 className="card-item-header">روزانه</h4>
                <div className="card-item-inputs">
                  <InputWithRegisterButton
                    label="روز"
                    placeHolder="5"
                    onClickHandler={() => {}}
                    name=""
                  />
                </div>
              </div>
              <div className="card-item">
                <h4 className="card-item-header">ماهانه</h4>
                <div className="card-item-inputs">
                  <InputWithRegisterButton
                    label="ماه"
                    placeHolder="5"
                    onClickHandler={() => {}}
                    name=""
                  />
                </div>
              </div>
              <div className="card-item">
                <h4 className="card-item-header">ترمیک</h4>
                <div className="card-item-inputs">
                  <InputWithRegisterButton
                    label="ترم"
                    placeHolder="5"
                    onClickHandler={() => {}}
                    name=""
                  />
                </div>
              </div>
            </div>
          </div>
        </CustomCard>
      </main>
    </div>
  );
};

export default RoomBasicFeatureData;
