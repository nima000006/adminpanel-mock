import { dataPlaceHolder } from "@infra/helpers/utils";

import {
  title,
  activebed,
  freebed,
} from "./utils/unconfirmedAnotherRoomReservationAllocationDrawerTableModel";

const UnconfirmedReservationAnotherRoomAllocationDrawerTableModel = () => {
  return [
    title,
    activebed,
    freebed,
    {
      title: "مبلغ (تومان)",
      dataIndex: "price",
      key: "price",
      width: 130,
      render: (value: number) => {
        return dataPlaceHolder({ data: value?.toString(), isPrice: true });
      },
    },
  ];
};

export default UnconfirmedReservationAnotherRoomAllocationDrawerTableModel;
