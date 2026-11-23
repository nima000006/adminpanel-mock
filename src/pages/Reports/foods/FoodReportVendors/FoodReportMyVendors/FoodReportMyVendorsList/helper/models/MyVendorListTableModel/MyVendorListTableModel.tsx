import { Link } from "react-router";

import { makeSearchParams } from "@infra/helpers/utils";
import { REPORT_FOOD_MY_VENDOR_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import {
  EconomicCode,
  InterfaceLastName,
  InterfaceName,
  NationalLegalNumber,
  PhoneNumber,
  Score,
  Status,
  TableModelId,
} from "@pages/Food/Vendors/_shared/utils/vendorListTableModel";
import { VendorMyType } from "@pages/Food/Vendors/MyVendors/MyVendorsList/@types/@myVendorsList";

const MyVendorListTableModel = () => {
  const VendorTitle = {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    width: 150,
    searchable: true,
  };

  const Province = {
    title: "استان",
    dataIndex: "stateName",
    key: "stateName",
    width: 130,
    searchable: true,
  };

  const City = {
    title: "شهر",
    dataIndex: "provinceName",
    key: "provinceName",
    width: 130,
    searchable: true,
  };
  return [
    VendorTitle,
    Province,
    City,
    NationalLegalNumber,
    EconomicCode,
    InterfaceName,
    InterfaceLastName,
    PhoneNumber,
    Score,
    Status,
    {
      ...TableModelId,
      render: (value: number, record: VendorMyType) => {
        return (
          <Link
            to={{
              pathname: REPORT_FOOD_MY_VENDOR_DETAILS_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                title: record?.title,
              }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};

export default MyVendorListTableModel;
