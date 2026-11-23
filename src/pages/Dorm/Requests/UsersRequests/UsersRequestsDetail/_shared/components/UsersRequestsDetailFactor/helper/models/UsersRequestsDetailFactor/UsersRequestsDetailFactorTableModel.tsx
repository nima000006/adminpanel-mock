import {
  requestId,
  requestType,
  roomType,
  schedulingType,
  priceListTax,
  priceListtoll,
  percentDiscount,
  fixedDiscount,
  amountPayable,
} from "./utils/usersRequestsDetailTableFactorModel";

const UsersRequestsDetailFactorTableModel = () => {
  return [
    requestId,
    requestType,
    roomType,
    schedulingType,
    priceListTax,
    priceListtoll,
    percentDiscount,
    fixedDiscount,
    amountPayable,
  ];
};
export default UsersRequestsDetailFactorTableModel;
