import { Link } from "react-router";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_MY_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  FOREIGN_NATIONAL_REJECTED,
  FOREIGN_NATIONAL_WAITING_REVIEW,
} from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import MyForeignNationalsRegistrationDetailInfo from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/helper/components/MyForeignNationalsRegistrationDetailInfo/MyForeignNationalsRegistrationDetailInfo";
import MyForeignNationalsRegistrationDetailRejected from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/helper/components/MyForeignNationalsRegistrationDetailRejected/MyForeignNationalsRegistrationDetailRejected";
import MyForeignNationalsRegistrationDetailWaitingReview from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/helper/components/MyForeignNationalsRegistrationDetailWaitingReview/MyForeignNationalsRegistrationDetailWaitingReview";

const mockData = {
  id: 1,
  firstName: "شیرین",
  lastName: "نجفی",
  nationality: "ایرانی",
  username: "0011111111",
  mobileNumber: "091211111111",
  studentCode: "1111112222",
  code: "12345",
  createdDate: "",
  modifiedDate: "",
};

const MyForeignNationalsRegistrationDetail = () => {
  const {
    params: { status },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست‌ها",
      },
      {
        title: (
          <Link
            to={MANAGEMENT_REQUESTS_MY_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE}
          >
            ثبت نام اتباع
          </Link>
        ),
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={false}>
      <MyForeignNationalsRegistrationDetailInfo data={mockData} />
      {status === FOREIGN_NATIONAL_WAITING_REVIEW && (
        <MyForeignNationalsRegistrationDetailWaitingReview />
      )}
      {status === FOREIGN_NATIONAL_REJECTED && (
        <MyForeignNationalsRegistrationDetailRejected />
      )}
    </Div>
  );
};
export default MyForeignNationalsRegistrationDetail;
