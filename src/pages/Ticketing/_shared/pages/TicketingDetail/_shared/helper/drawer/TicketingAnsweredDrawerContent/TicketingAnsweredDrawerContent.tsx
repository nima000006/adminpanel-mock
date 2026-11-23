import { useEffect, useState } from "react";

import { Form } from "antd";
import { PiChecks, PiPencilLine, PiTrash } from "react-icons/pi";

import { CustomButton, CustomSearchBox, CustomTextArea } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyTicketingMyDetailsDefaultAnswersQuery,
  useLazyTicketingMyDetailsViewDefaultAnswersQuery,
  useTicketingMyDetailsDeleteDefaultAnswersMutation,
  useTicketingMyDetailsSaveDefaultAnswersMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { TicketingAnsweredDrawerContentProps } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/drawer/TicketingAnsweredDrawerContent/@types/@ticketingAnsweredDrawerContent";
import { TicketingMyDetailsDefaultAnswersResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

const TicketingAnsweredDrawerContent = ({
  closeDrawerHandler,
  isOpen,
  selectDefaultAnswerHandler,
}: TicketingAnsweredDrawerContentProps) => {
  const [answeredData, setAnsweredData] =
    useState<TicketingMyDetailsDefaultAnswersResponse>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isOpenViewAnswerModal, setIsOpenViewAnswerModal] = useState(false);
  const [isOpenDeleteAnswerModal, setIsOpenDeleteAnswerModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string>("");
  const { params, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<{ description: string }>();
  //? ================================  Api Calls ================================
  const [getDefaultAnswers, { isFetching: isGetDefaultAnswersLoading }] =
    useLazyTicketingMyDetailsDefaultAnswersQuery();

  const [viewDefaultAnswers, { isFetching: isViewDefaultAnswersLoading }] =
    useLazyTicketingMyDetailsViewDefaultAnswersQuery();

  const [saveDefaultAnswers, { isLoading: isSaveDefaultAnswersLoading }] =
    useTicketingMyDetailsSaveDefaultAnswersMutation();

  const [deleteDefaultAnswers, { isLoading: isDeleteDefaultAnswersLoading }] =
    useTicketingMyDetailsDeleteDefaultAnswersMutation();
  //? ================================ Effects ================================
  useEffect(() => {
    if (!isOpen) return;

    getDefaultAnswers()
      .unwrap()
      .then((res) => {
        setAnsweredData(res);
      });
  }, [isOpen]);
  //* ================================ Util Functions ================================
  const filteredAnsweredData = answeredData?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchValue.toLowerCase())
  );

  const viewDefaultAnswersHandler = async (defaultAnswerId: string) => {
    try {
      const res = await viewDefaultAnswers({ defaultAnswerId }).unwrap();

      form.setFieldsValue({
        description: res?.title,
      });

      setSearchParams({ ...params, uuid: defaultAnswerId });

      setIsOpenViewAnswerModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const viewMessageSubmitHandler = async () => {
    try {
      await saveDefaultAnswers({
        message: form.getFieldValue("description"),
        uuid: params.uuid,
      }).unwrap();

      const { uuid, ...nextParams } = params;

      setSearchParams(nextParams);

      setIsOpenViewAnswerModal(false);

      form.resetFields();

      const res = await getDefaultAnswers().unwrap();

      setAnsweredData(res);
    } catch (error) {
      console.error(error);
    }
  };

  const closeViewAnswerModalHandler = () => {
    setIsOpenViewAnswerModal(false);

    form.resetFields();

    const { uuid, ...nextParams } = params;

    setSearchParams(nextParams);
  };

  const deleteMessageSubmitHandler = async () => {
    if (!selectedDeleteId) return;

    try {
      await deleteDefaultAnswers({
        id: selectedDeleteId,
      }).unwrap();

      const res = await getDefaultAnswers().unwrap();

      setAnsweredData(res);

      setIsOpenDeleteAnswerModal(false);

      setSelectedDeleteId("");
    } catch (error) {
      console.error(error);
    }
  };

  const closeDeleteAnswerModalHandler = () => {
    setIsOpenDeleteAnswerModal(false);

    setSelectedDeleteId("");
  };

  const deleteDefaultAnswersHandler = (id: string) => {
    setSelectedDeleteId(id);

    setIsOpenDeleteAnswerModal(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲► */
  return (
    <div>
      <ConfirmationModalWithContent
        showIcon
        title="حذف پاسخ"
        content="آیا از حذف پاسخ ذخیره شده خود اطمینان دارید؟"
        isDangerous
        isModalOpen={isOpenDeleteAnswerModal}
        closeModalHandler={closeDeleteAnswerModalHandler}
        onConfirmClickHandler={deleteMessageSubmitHandler}
        confirmBtnText="حذف پاسخ"
        backBtnText="انصراف"
        isConfirmButtonLoading={isDeleteDefaultAnswersLoading}
      />
      {isOpenViewAnswerModal && (
        <ConfirmationModalWithContent
          showIcon
          title="ویرایش پاسخ"
          content={
            <Form form={form}>
              <Div loading={isViewDefaultAnswersLoading}>
                <CustomTextArea name="description" placeholder="توضیحات..." />
              </Div>
            </Form>
          }
          isModalOpen={isOpenViewAnswerModal}
          closeModalHandler={closeViewAnswerModalHandler}
          onConfirmClickHandler={viewMessageSubmitHandler}
          confirmBtnText="ذخیره تغییرات"
          backBtnText="انصراف"
          isConfirmButtonLoading={isSaveDefaultAnswersLoading}
        />
      )}
      <CustomDrawerHeader
        title="پاسخ‌های ذخیره شده"
        leftSideContent={<CustomButton onClick={closeDrawerHandler}>بستن</CustomButton>}
        closeDrawerHandler={closeDrawerHandler}
      />
      <CustomSearchBox
        mode="client"
        placeholder="جستجو..."
        onChange={(value) => setSearchValue(value)}
      />
      <Div loading={isGetDefaultAnswersLoading}>
        {filteredAnsweredData.length === 0 && (
          <div className="mt-50">
            <CustomEmpty description="پاسخ ذخیره شده‌ای برای نمایش وجود ندارد." />
          </div>
        )}
        {filteredAnsweredData?.map((item) => (
          <CustomCard className="bg-neutral-2! mt-6! flex flex-col gap-4 border-0!">
            <div key={item?.id}>
              <p>{item?.title}</p>
            </div>
            <div className="flex justify-end gap-2">
              <CustomButton
                loading={isDeleteDefaultAnswersLoading && +selectedDeleteId === item?.id}
                onClick={() => deleteDefaultAnswersHandler(item?.id?.toString())}
                className="border-dustred-6! text-dustred-6! flex h-10 w-10 items-center justify-center rounded-md border p-0! transition-all"
                type="default"
              >
                <PiTrash size={24} />
              </CustomButton>
              <CustomButton
                onClick={() => viewDefaultAnswersHandler(item?.id?.toString())}
                className="border-neutral-2 flex h-10 w-10 items-center justify-center rounded-md border p-0! transition-all"
                type="default"
              >
                <PiPencilLine size={24} />
              </CustomButton>
              <CustomButton
                onClick={() => selectDefaultAnswerHandler(item?.title)}
                className="bg-primary-6! flex h-10 w-10 items-center justify-center rounded-md border p-0! text-white! transition-all"
                type="default"
              >
                <PiChecks size={24} />
              </CustomButton>
            </div>
          </CustomCard>
        ))}
      </Div>
    </div>
  );
};
export default TicketingAnsweredDrawerContent;
