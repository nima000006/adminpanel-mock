import { Link } from "react-router";

import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { titleRouteMap } from "../../utils/titleRouteMap";

const DormBasicInfoTableModel = () => {
  return [
    {
      title: "نوع اطلاعات پایه اقامتگاه",
      dataIndex: "title",
      width: 690,
      ...GetServerColumnSearchProps({
        dataIndex: "name",
        label: "نوع اطلاعات پایه اقامتگاه",
        type: "text",
      }),
    },
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "updeteDate",
      key: "updeteDate",
      width: 150,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm YYYY-MM-DD ",
        });
      },
    },
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "updateByUserId",
      key: "updateByUserId",
      width: 150,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (_: number, record: any) => {
        const href = titleRouteMap[record.title];
        return href ? (
          <Link to={href} className="text-link">
            مشاهده
          </Link>
        ) : (
          <span>—</span>
        );
      },
    },
  ];
};

export default DormBasicInfoTableModel;
