import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { makeSearchParams } from "@infra/helpers/utils";
import { GeneralTableModelTypeWithSearch } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { REPORT_FOOD_ALL_VENDOR_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
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

import { VendorAllType } from "../../../@types/@allVendorList";
import "./_allVendorListTable.scss";

const AllVendorListTableModel = ({
  isDeletedEnabled,
}: GeneralTableModelTypeWithSearch & {
  isDeletedEnabled: boolean;
}) => {
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
      render: (value: number, record: VendorAllType) => {
        return (
          <div className="all-food-vendor-list-actions">
            {!isDeletedEnabled && (
              <CustomButton type="link" danger disabled>
                حذف
              </CustomButton>
            )}

            <Link
              to={{
                pathname: REPORT_FOOD_ALL_VENDOR_DETAILS_PAGE_ROUTE,
                search: makeSearchParams({
                  id: value,
                  title: record?.title,
                  isDeleted: String(isDeletedEnabled),
                }),
              }}
              className="text-link"
            >
              مشاهده
            </Link>
          </div>
        );
      },
    },
  ];
};

export default AllVendorListTableModel;
