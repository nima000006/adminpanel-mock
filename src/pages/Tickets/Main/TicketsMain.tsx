import { useEffect } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { TicketMainModel } from "../../../infrastructure/models/tableModels/TicketTableModel/ticketMain/TicketMainTableModel";
import { TICKET_INSPECTION_PAGE_ROUTE } from "../../../infrastructure/router/routes/ticket";
import { useGetTicketListMutation } from "../../../infrastructure/states/redux/Apis/ticketApi";
import "./_ticketMain.scss";

const Tickets = () => {
  useTitle({ text: "لیست تیکت ها" });

  const navigate = useNavigate();

  const [getTicketList, { data: ticketListData, isLoading: isTicketListLoading }] =
    useGetTicketListMutation();

  useEffect(() => {
    getTicketList(0);
  }, []);

  const onClickHomeActionBarFilter = () => {};

  //! Go to the ticket's inspection page to see the details of each ticket which are in the table
  const viewClickHandler = (id: number) => {
    navigate(`${TICKET_INSPECTION_PAGE_ROUTE}?id=${id}`);
  };

  return (
    <div className="tickets-main-container">
      <div className="tickets-action-bar-wrapper">
        {/* <Button
          className="view-prioritization-table-text"
          onClick={prioritizationTableHandler}
          type="text"
        >
          مشاهده جدول الویت بندی ها
        </Button> */}

        <div className="advance-filter-wrapper">
          <Button
            type="primary"
            icon={<AiOutlineFilter />}
            size="middle"
            className="advance-filter-btn"
            onClick={onClickHomeActionBarFilter}
          >
            فیلتر پیشرفته
          </Button>
        </div>
      </div>
      <CustomTable
        dataSource={ticketListData?.tikets}
        columns={TicketMainModel({
          viewClickHandler,
        })}
        pagination={paginationConfig}
        loading={isTicketListLoading}
        className="ticket-main-table-container"
        {...TABLE_PROPS(ticketListData?.tikets.length || 0)}
      />
    </div>
  );
};
export default Tickets;
