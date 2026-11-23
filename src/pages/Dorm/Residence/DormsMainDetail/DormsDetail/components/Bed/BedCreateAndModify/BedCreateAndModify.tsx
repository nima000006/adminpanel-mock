import { Link, useSearchParams } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { DORM_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import BedCreate from "./helper/components/Create/BedCreate";
import BedUpdate from "./helper/components/Update/BedUpdate";

const BedCreateAndModify = () => {
  const [searchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_LIST_PAGE_ROUTE}>اقامتگاه ها</Link>,
      },
      ...(url?.title
        ? [
            {
              title: url?.title,
            },
          ]
        : []),
      {
        title: url?.bedId ? "ویرایش تخت" : "ایجاد تخت",
      },
    ],
  });

  return url?.bedId ? <BedUpdate /> : <BedCreate />;
};

export default BedCreateAndModify;
