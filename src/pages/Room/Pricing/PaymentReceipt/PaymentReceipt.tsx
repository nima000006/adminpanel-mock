import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { ReceiptModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/pricing/ReceiptModel/ReceiptModel";

const dataSource = [
  {
    id: 1,
    key: 1,
    name: "نام شخص",
    lastName: "نام خانوادگی",
    nationalNumber: "00211548632",
    studentNumber: "962107052",
    phoneNumber: "962107052",
    receiptNumber: "5948",
    installmentNumber: "قسط 3",
    price: "2000000",
    endDate: "2023-08-27T07:54:10",
    paymentDate: "2023-08-27T07:54:10",
    status: "انتظار پرداخت",
    dormName: "نام خوابگاه",
  },
  {
    id: 2,
    key: 2,
    name: "نام شخص",
    lastName: "نام خانوادگی",
    nationalNumber: "00211548632",
    studentNumber: "962107052",
    phoneNumber: "962107052",
    receiptNumber: "5948",
    installmentNumber: "قسط 3",
    price: "2000000",
    endDate: "2023-09-27T07:54:10",
    paymentDate: "2023-09-27T07:54:10",
    status: "پرداخت شده",
    dormName: "نام خوابگاه",
  },
];

const PaymentReceipt = () => {
  useTitle({ text: "فاکتورها" });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable
      dataSource={dataSource}
      columns={ReceiptModel() as any}
      pagination={paginationConfig}
      rowSelection={{
        type: "checkbox",
      }}
      {...TABLE_PROPS(dataSource?.length)}
    />
  );
};

export default PaymentReceipt;
