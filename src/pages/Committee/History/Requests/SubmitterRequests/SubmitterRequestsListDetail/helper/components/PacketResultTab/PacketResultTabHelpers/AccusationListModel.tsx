import { Flex } from "antd";

import { intlDate, intlNumber } from "@infra/helpers/utils";

import { TableData } from "../@types/@packetResultTab";

const AccusationListModel = [
  {
    title: "ردیف",
    dataIndex: "row",
    key: "row",
    width: 30,
  },
  {
    title: "مورد اتهام",
    dataIndex:
      "AssociationFinalRulings_AssociationViolationStudent_AssociationInfractions_title",
    key: "AssociationFinalRulings_AssociationViolationStudent_AssociationInfractions_title",
    width: 168,
  },
  {
    title: "اقدام ارشادی، بازدارنده و تنبیهات صادره",
    dataIndex: "AssociationFinalRulings_AssociationRulings_title",
    key: "AssociationFinalRulings_AssociationRulings_title",
    width: 174,
  },
  {
    title: "تاریخ و شماره رای قطعی",
    dataIndex: "id",
    key: "id",
    width: 100,
    render: (_: number, records: TableData) => {
      return (
        <Flex vertical={true} gap={4}>
          <span className="date-text">
            {records?.AssociationFinalRulings_dateVote
              ? intlDate(records?.AssociationFinalRulings_dateVote)
              : "-"}
          </span>
          <span className="date-text">
            {records?.AssociationFinalRulings_numberVote
              ? intlNumber(+records?.AssociationFinalRulings_numberVote)
              : "-"}
          </span>
        </Flex>
      );
    },
  },
];
export default AccusationListModel;
