import { Link } from "react-router";

import { makeSearchParams } from "@infra/helpers/utils";
import { DORM_HABITANTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { HabitantsEvacuationListData } from "../../../@types/@evacuationType";

const LinkToFactorTab = ({ value }: { value: HabitantsEvacuationListData | null }) => {
  return (
    <Link
      to={{
        pathname: DORM_HABITANTS_DETAIL_PAGE_ROUTE,
        search: makeSearchParams({
          tab: 3, // factor tab on detail page
          id: value?.id,
          title: `${value?.AssociationCustomer_AssociationCustomerUser_firstName} ${value?.AssociationCustomer_AssociationCustomerUser_lastName}`,
          userGroup: value?.AssociationCustomer_userGroupID?.toString(),
          dormId: value?.AssociationBed_dormitoryid,
          tariffId: value?.AssociationCategoryDeliverPlan_priceListId,
          userNationalCode:
            value?.AssociationCustomer_AssociationCustomerUser_nationalCode,
          deliverPlanId: value?.deliverPlanId,
          startDate: value?.residenceStartDate,
          endDate: value?.residenceEndDate,
          roomId: value?.AssociationBed_roomId,
        }),
      }}
      className="text-link"
    >
      مشاهده جزئیات فاکتور
    </Link>
  );
};
export default LinkToFactorTab;
