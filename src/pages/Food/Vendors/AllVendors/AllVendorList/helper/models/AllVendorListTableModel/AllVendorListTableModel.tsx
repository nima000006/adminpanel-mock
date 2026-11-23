import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { makeSearchParams } from "@infra/helpers/utils";
import { FOOD_ALL_VENDORS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/food";
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

import CustomButton from "../../../../../../../../components/CustomInputs/CustomButton/CustomButton";
import { GeneralTableModelTypeWithSearch } from "../../../../../../../../infrastructure/models/modules/GeneralTypes/GeneralTypes";
import { VendorAllType } from "../../../@types/@allVendorList";

import "./_allVendorListTable.scss";

const AllVendorListTableModel = ({
  onRemoveVendorClickHandler,
  isDeletedEnabled,
}: GeneralTableModelTypeWithSearch & {
  onRemoveVendorClickHandler: (value: number, record: string) => void;
  isDeletedEnabled: boolean;
}): CustomColumnType<VendorAllType>[] => {
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
              <CustomButton
                type="link"
                onClick={() => onRemoveVendorClickHandler(value, record?.title)}
                danger
              >
                حذف
              </CustomButton>
            )}

            <Link
              to={{
                pathname: FOOD_ALL_VENDORS_DETAIL_PAGE_ROUTE,
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
