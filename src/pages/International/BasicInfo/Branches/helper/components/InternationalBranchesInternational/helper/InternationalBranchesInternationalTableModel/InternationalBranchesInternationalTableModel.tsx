import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { INTERNATIONAL_BASIC_INFO_BRANCHES_INTERNATIONAL_DETAIL_ROUTE } from "@infra/router/routes/international";

import { InternationalBranchesInternationalTableModelProps } from "./@types/@internationalBranchesInternationalTableModelProps";
import { dataSourceBranchesTypes } from "../../@types/@dataSourceBranchTypes";

const InternationalBranchesInternationalTableModel = ({
  openDeleteModal,
}: InternationalBranchesInternationalTableModelProps) => {
  return [
    {
      title: "نام واحد بین‌الملل",
      dataIndex: "name",
      key: "name",
      width: 540,
    },
    {
      title: "تعداد گروه‌ رشته‌ها",
      dataIndex: "fieldsCountGroups",
      key: "fieldsCountGroups",
      width: 170,
    },
    {
      title: "تعداد رشته‌های ارائه شده",
      dataIndex: "fieldsCounts",
      key: "fieldsCounts",
      width: 210,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 70,
      render: (_: unknown, records: dataSourceBranchesTypes) => {
        return (
          <div className="custom-button-container">
            <CustomButton type="link">
              <Link
                to={{
                  pathname: INTERNATIONAL_BASIC_INFO_BRANCHES_INTERNATIONAL_DETAIL_ROUTE,
                  search: makeSearchParams({
                    id: records?.id,
                    name: records?.name,
                  }),
                }}
              >
                مشاهده
              </Link>
            </CustomButton>
            <CustomButton type="link" danger onClick={() => openDeleteModal(records?.id)}>
              حذف از لیست
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default InternationalBranchesInternationalTableModel;
