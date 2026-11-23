import { DormRoomListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Room/RoomCreateAndModify/@types/@roomCreateAndModify";

//! LAYOUT
export type DormBasicInfoGenderTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormRoomListTypes) => void;
};
