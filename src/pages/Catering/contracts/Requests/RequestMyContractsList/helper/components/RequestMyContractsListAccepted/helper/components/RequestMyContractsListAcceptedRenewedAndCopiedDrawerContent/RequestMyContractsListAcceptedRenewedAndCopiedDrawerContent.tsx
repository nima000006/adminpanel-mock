import { useState } from "react";

import { Form, Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_TYPE_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import { RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentProps } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListAccepted/helper/components/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent/@types/@requestMyContractsListAcceptedRenewedAndCopiedDrawerContent";
import RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentDetails from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListAccepted/helper/components/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent/helper/components/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentDetails/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentDetails";
import RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentFoods from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListAccepted/helper/components/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent/helper/components/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentFoods/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentFoods";

function RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent({
  onClose,
  data,
  isLoading,
}: RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentProps) {
  const [view, setView] = useState<"0" | "1">("0"); //* 0: contract details, 1: contract foods
  const [foodsCount, setFoodsCount] = useState(0);

  const requestType =
    data?.status != null ? getRequestContractTypeByStatus(data.status) : null;

  const items = [
    { value: "0", label: "جزئیات قرارداد" },
    { value: "1", label: `غذاهای قرارداد (${foodsCount})` },
  ];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form>
      <CustomDrawerHeader title="مشاهده درخواست" closeDrawerHandler={onClose} />
      <Div loading={!!isLoading}>
        <CustomAlert
          title="تایید شده!"
          type="success"
          className="mb-5!"
          showIcon={true}
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره درخواست"
            value={data?.id?.toString() || emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="نوع درخواست"
            value={requestType ? REQUEST_CONTRACT_TYPE_TEXT[requestType] : emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="درخواست دهنده"
            value={data?.createdBy || emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="شماره تماس درخواست دهنده"
            value={emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="مسئول پیگیری"
            value={data?.modifiedBy || emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="تاریخ بررسی درخواست"
            value={dataPlaceHolder({
              data: data?.modifiedDate,
              isDate: true,
              customDateFormat: "YYYY/MM/DD, HH:mm",
            })}
            span={12}
          />
        </Row>
        <div className="mt-10!">
          <CustomSegmented
            block
            size="large"
            options={items}
            onChange={(value) => setView(value as "0" | "1")}
            value={view}
          />
          {view === "0" && (
            <RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentDetails
              data={data}
            />
          )}
          <div className={view === "1" ? "block" : "hidden"}>
            <RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentFoods
              contractId={data?.id}
              onFoodsCountChange={setFoodsCount}
            />
          </div>
        </div>
      </Div>
    </Form>
  );
}

export default RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent;
