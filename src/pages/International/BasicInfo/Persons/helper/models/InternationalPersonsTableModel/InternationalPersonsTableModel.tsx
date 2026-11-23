import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  INTERNATIONAL_BASIC_INFO_PERSONS_INTERVIEW_MANAGER_DETAIL_ROUTE,
  INTERNATIONAL_BASIC_INFO_PERSONS_INTERVIEWER_DETAIL_ROUTE,
} from "@infra/router/routes/international";

const InternationalPersonsTableModel = () => {
  return [
    {
      title: "سمت",
      dataIndex: "title",
      key: "title",
      width: 805,
    },
    {
      title: "تعداد افراد تعریف شده",
      dataIndex: "definedPersonCount",
      key: "definedPersonCount",
      width: 200,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 70,
      render: (id: number) => {
        if (id === 1) {
          return (
            <CustomButton type="link">
              <Link to={INTERNATIONAL_BASIC_INFO_PERSONS_INTERVIEWER_DETAIL_ROUTE}>
                مشاهده{" "}
              </Link>
            </CustomButton>
          );
        } else if (id === 2) {
          return (
            <CustomButton type="link">
              <Link to={INTERNATIONAL_BASIC_INFO_PERSONS_INTERVIEW_MANAGER_DETAIL_ROUTE}>
                مشاهده
              </Link>
            </CustomButton>
          );
        } else {
          return <></>;
        }
      },
    },
  ];
};
export default InternationalPersonsTableModel;
