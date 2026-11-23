import { useEffect } from "react";

import { BusinessBaseTableTypes } from "./@types/@useBusinessBaseTableSelector";
import { DENOMINATION } from "../../../../../../../infrastructure/models/businessBase";
import "./_businessBaseTableSelector.scss";

const UseBusinessBaseTableSelector = ({
  tableType,
}: {
  tableType: BusinessBaseTableTypes;
}) => {
  const selectTable = (tableType: BusinessBaseTableTypes) => {
    //! SWITCH
    switch (tableType) {
      case DENOMINATION:
        return {
          columnList: [
            {
              key: 1,
              title: "عنوان",
              description: "توضیحات",
              operation: "تغییر",
            },
            {
              key: 2,
              title: "عنوان",
              description: "توضیحات",
              operation: "تغییر",
            },
          ],
        };
      default:
        return {
          status: 0,
          columnList: [],
        };
    }
  };

  useEffect(() => {
    selectTable(tableType);
  }, [tableType]);

  return {
    tableStatus: selectTable(tableType).status,
    column: selectTable(tableType).columnList,
  };
};

export default UseBusinessBaseTableSelector;
