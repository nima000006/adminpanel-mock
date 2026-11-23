import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ContractsDetailHistoryDrawerContentProps } from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailHistory/helper/ContractsDetailHistoryDrawerContent/@types/@contractsDetailHistoryDrawerContent";

const ContractsDetailHistoryDrawerContent = ({
  data,
  isLoading = false,
  onClose,
}: ContractsDetailHistoryDrawerContentProps) => {
  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [thirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);

  const contractDateRange =
    data?.startedDate || data?.endDate
      ? `${dataPlaceHolder({
          data: data?.startedDate,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })} — ${dataPlaceHolder({
          data: data?.endDate,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })}`
      : undefined;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!data) {
      setFirstFile([]);
      setSecondFile([]);
      setThirdFile([]);
      setFourthFile([]);
      return;
    }

    if (data.file1) {
      setFirstFile([
        {
          uid: data.file1,
          name: data.file1,
          status: "done",
          url: data.file1,
        },
      ]);
    } else {
      setFirstFile([]);
    }

    if (data.file2) {
      setSecondFile([
        {
          uid: data.file2,
          name: data.file2,
          status: "done",
          url: data.file2,
        },
      ]);
    } else {
      setSecondFile([]);
    }

    if (data.file3) {
      setThirdFile([
        {
          uid: data.file3,
          name: data.file3,
          status: "done",
          url: data.file3,
        },
      ]);
    } else {
      setThirdFile([]);
    }

    if (data.file4) {
      setFourthFile([
        {
          uid: data.file4,
          name: data.file4,
          status: "done",
          url: data.file4,
        },
      ]);
    } else {
      setFourthFile([]);
    }
  }, [data]);

  const fileSlots = [
    { key: "file1", fileList: firstFile, setFileList: setFirstFile },
    { key: "file2", fileList: secondFile, setFileList: setSecondFile },
    { key: "file3", fileList: thirdFile, setFileList: setThirdFile },
    { key: "file4", fileList: fourthFile, setFileList: setFourthFile },
  ].filter((slot) => slot.fileList.length > 0);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="جزییات ویرایش ثبت شده"
        closeDrawerHandler={onClose}
        hasLeftSide={false}
      />
      <Div loading={isLoading}>
        <section className="flex flex-col gap-6">
          {fileSlots.length > 0 ? (
            <div>
              <p className="mb-4 text-right">اسناد مربوطه</p>
              <Row>
                {fileSlots.map((slot) => (
                  <Col key={slot.key} lg={6} md={6} sm={8} xs={12}>
                    <CustomUploader
                      fileList={slot.fileList}
                      setFileList={slot.setFileList}
                      isReadOnly={true}
                      maxCount={1}
                      name={slot.key}
                      hasNullText
                      hasUploaderIcon={false}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          ) : null}
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="عنوان قرارداد"
              value={dataPlaceHolder({ data: data?.title })}
            />
            <SingleVerticalWithCol
              label="تأمین کننده"
              value={dataPlaceHolder({ data: data?.vendorTitle })}
            />
            <SingleVerticalWithCol
              label="سلف"
              value={dataPlaceHolder({ data: data?.restaurantTitle })}
            />
            <SingleVerticalWithCol
              label="شماره قرارداد"
              value={dataPlaceHolder({ data: data?.contractUUID })}
            />
            <SingleVerticalWithCol
              label="شروع و پایان قرارداد"
              value={contractDateRange}
            />
            <SingleVerticalWithCol
              label="سهم تأمین کننده"
              value={
                data?.vendorPercentage != null ? `${data.vendorPercentage} %` : undefined
              }
            />
            <SingleVerticalWithCol
              label="سهم دانشگاه"
              value={
                data?.restaurantPercentage != null
                  ? `${data.restaurantPercentage} %`
                  : undefined
              }
            />
            <SingleVerticalWithCol
              label="سهم دانشجویار"
              value={
                data?.providerPercentage != null
                  ? `${data.providerPercentage} %`
                  : undefined
              }
            />
            <SingleVerticalWithCol
              span={24}
              label="توضیحات"
              value={dataPlaceHolder({ data: data?.description })}
            />
          </Row>
        </section>
      </Div>
    </div>
  );
};

export default ContractsDetailHistoryDrawerContent;
