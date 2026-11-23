import { useState } from "react";

import { Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import {
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_TYPE_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import { RequestMyContractsListWaitedCreatedDrawerContentProps } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/@types/@requestMyContractsListWaitedCreatedDrawerContent";
import RequestMyContractsListWaitedCreatedDrawerContentDetails from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentDetails/RequestMyContractsListWaitedCreatedDrawerContentDetails";
import RequestMyContractsListWaitedCreatedDrawerContentFoods from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentFoods/RequestMyContractsListWaitedCreatedDrawerContentFoods";

function RequestMyContractsListWaitedCreatedDrawerContent({
  onClose,
  data,
  isLoading,
  onEditPriceClick,
}: RequestMyContractsListWaitedCreatedDrawerContentProps) {
  const [view, setView] = useState<"0" | "1">("0"); //* 0: contract details, 1: contract foods

  const requestType =
    data?.status != null ? getRequestContractTypeByStatus(data.status) : null;
  const drawerTitle = requestType
    ? `مشاهده درخواست ${REQUEST_CONTRACT_TYPE_TEXT[requestType]}`
    : "مشاهده درخواست";

  const items = [
    { value: "0", label: "جزئیات قرارداد" },
    { value: "1", label: `غذاهای قرارداد` },
  ];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isLoading}>
      <CustomDrawerHeader title={drawerTitle} closeDrawerHandler={onClose} />
      <div className="mb-5!">
        <CustomAlert
          title="در انتظار بررسی!"
          type="warning"
          description="درخواست در انتظار بررسی می‌باشد."
          showIcon={true}
        />
      </div>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="شماره درخواست"
          value={data?.id?.toString()}
          span={12}
        />
        <SingleVerticalWithCol
          label="نوع درخواست"
          value={requestType ? REQUEST_CONTRACT_TYPE_TEXT[requestType] : emptyString}
          span={12}
        />
        <SingleVerticalWithCol label="درخواست دهنده" value={data?.createdBy} span={12} />
        <SingleVerticalWithCol
          label="شماره تماس درخواست دهنده"
          value={emptyString}
          span={12}
        />
      </Row>

      <div className="mt-5!">
        <CustomSegmented
          block
          size="large"
          options={items}
          onChange={(value) => setView(value as "0" | "1")}
          value={view}
        />
        {view === "0" && (
          <RequestMyContractsListWaitedCreatedDrawerContentDetails data={data} />
        )}
        {view === "1" && (
          <RequestMyContractsListWaitedCreatedDrawerContentFoods
            contractId={data?.id}
            onEditPriceClick={onEditPriceClick}
          />
        )}
      </div>
    </Div>
  );
}

export default RequestMyContractsListWaitedCreatedDrawerContent;
