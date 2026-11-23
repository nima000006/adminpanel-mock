import { useEffect, useState } from "react";

import { Form } from "antd";
import { PiPencilSimpleLine, PiPlus, PiTrashSimple } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useAddOtherTermsToContractMutation,
  useCreateContractTermMutation,
  useUpdateContractTermMutation,
} from "@infra/states/redux/Apis/contracts/addNewContractTemplate/addNewContractTemplate";
import { useLazyGetContractTemplateDetailQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";

import { ContractsTemplateRulesDescOtherFormValues } from "./@types/@contractsTemplateRulesDescOtherProps";
import ContractsTemplateRulesDescOtherModalContent from "./helper/ContractsTemplateRulesDescOtherModalContent/ContractsTemplateRulesDescOtherModalContent";

const ContractsTemplateRulesDescOther = () => {
  const [bandsData, setBandsData] = useState<
    { id: number; title: string; text: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBand, setEditingBand] = useState<{
    id: number;
    title: string;
    text: string;
  } | null>(null);
  const [deletingBandId, setDeletingBandId] = useState<string | number | null>(null);

  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  const [form] = Form.useForm<ContractsTemplateRulesDescOtherFormValues>();

  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [createContractTerm, { isLoading: isCreateContractTermLoading }] =
    useCreateContractTermMutation();

  const [updateContractTerm, { isLoading: isUpdateContractTermLoading }] =
    useUpdateContractTermMutation();

  const [addOtherTermsToContract] = useAddOtherTermsToContractMutation();

  const [getContractinfo, { isFetching: isGetContractinfoLoading }] =
    useLazyGetContractTemplateDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const contractId = params?.contractId;
    if (contractId) {
      getContractinfo(+contractId)
        .unwrap()
        .then((contractInfoData) => {
          if (contractInfoData?.other?.length) {
            setBandsData(
              contractInfoData.other.map((item) => ({
                id: item.id,
                title: item.title,
                text: item.clause,
              }))
            );
          }
        });
    }
  }, []);

  // ================================ Util function ================================

  const cancelBtnHandler = () => {
    submitOtherTerms(setIsBackLoading, () => {
      setSearchParams({
        ...params,
        step: "2",
      });
    });
  };
  const addModalHandler = () => {
    setEditingBand(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const editModalHandler = (band: { id: number; title: string; text: string }) => {
    setEditingBand(band);
    form.setFieldsValue({
      title: band.title,
      text: band.text,
    });
    setIsModalOpen(true);
  };

  const deleteModalHandler = (bandId: string | number) => {
    setDeletingBandId(bandId);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      const requestBody = {
        type: "SPECIAL_CONDITION", // we should send this enum to get data
        clause: values.text,
        faTitle: values.title,
      };

      if (editingBand) {
        // Edit mode
        updateContractTerm({
          body: requestBody,
          id: editingBand.id,
        })
          .unwrap()
          .then(() => {
            setBandsData((prev) =>
              prev.map((band) =>
                band.id === editingBand.id
                  ? { id: band.id, title: values.title, text: values.text }
                  : band
              )
            );
          });
      } else {
        // Add mode
        createContractTerm(requestBody)
          .unwrap()
          .then((res) => {
            const newBand = {
              id: res,
              title: values.title,
              text: values.text,
            };
            setBandsData((prev) => [...prev, newBand]);
          });
      }
      setIsModalOpen(false);
      setEditingBand(null);
      form.resetFields();
    });
  };

  const handleDeleteConfirm = () => {
    if (deletingBandId !== null) {
      setBandsData((prev) => prev.filter((band) => band.id !== deletingBandId));
      setIsDeleteModalOpen(false);
      setDeletingBandId(null);
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setEditingBand(null);
    form.resetFields();
  };

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
    setDeletingBandId(null);
  };

  const submitOtherTerms = (
    setLoading: (loading: boolean) => void,
    onSuccess?: () => void
  ) => {
    setLoading(true);
    addOtherTermsToContract({
      body: {
        otherTerms: bandsData?.map((item) => item.id),
      },
      id: +params?.contractId,
    })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveDraftHandler = () => {
    submitOtherTerms(setIsDraftLoading);
  };

  const nextBtnHandler = () => {
    submitOtherTerms(setIsNextLoading, () => {
      setSearchParams({
        ...params,
        step: "4",
      });
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetContractinfoLoading}>
      {isModalOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isModalOpen}
          closeModalHandler={closeModalHandler}
          title={editingBand ? "ویرایش بند" : "افزودن بند جدید"}
          confirmBtnText="تایید و ثبت"
          backBtnText="انصراف"
          backBtnDanger={true}
          onConfirmClickHandler={handleFormSubmit}
          onBackBtnHandler={closeModalHandler}
          isConfirmButtonLoading={
            isCreateContractTermLoading || isUpdateContractTermLoading
          }
          htmlType="submit"
          showIcon={false}
          content={
            <ContractsTemplateRulesDescOtherModalContent
              form={form}
              onFinish={handleFormSubmit}
            />
          }
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isDeleteModalOpen}
          title="حذف بند شرایط اختصاصی"
          closeModalHandler={closeDeleteModalHandler}
          onConfirmClickHandler={handleDeleteConfirm}
          confirmBtnText="تایید"
          backBtnText="انصراف"
          backBtnDanger={true}
          showIcon={true}
          iconType="alert"
          content={
            <p className="body-regular">آیا از حذف بند شرایط اختصاصی اطمینان دارید ؟</p>
          }
        />
      )}

      {bandsData.length === 0 ? (
        <div className="mt-10! flex min-h-[500px] flex-col items-center">
          <CustomEmpty description="محتوایی برای نمایش وجود ندارد." />
          <CustomButton icon={<PiPlus />} className="mt-10!" onClick={addModalHandler}>
            افزودن بند
          </CustomButton>
        </div>
      ) : (
        <div className="min-h-[500px]!">
          <ToolBox
            rightSide={
              <h3 className="font-[DanaFaNum] text-lg font-bold">
                سایر بندهای قالب قرارداد
              </h3>
            }
            leftSide={
              <CustomButton type="primary" icon={<PiPlus />} onClick={addModalHandler}>
                افزودن بند
              </CustomButton>
            }
          />
          {bandsData.map((band) => (
            <div key={band.id} className="mt-5!">
              <div className="flex items-center justify-between">
                <h3 className="font-[DanaFaNum]">
                  {dataPlaceHolder({ data: band.title })}
                </h3>
                <div className="flex gap-1">
                  <CustomButton
                    danger
                    className="flex h-6! w-6! items-center justify-center rounded-sm! p-0!"
                    onClick={() => deleteModalHandler(band.id)}
                  >
                    <PiTrashSimple />
                  </CustomButton>
                  <CustomButton
                    className="flex h-6! w-6! items-center justify-center rounded-sm! p-0!"
                    onClick={() => editModalHandler(band)}
                  >
                    <PiPencilSimpleLine />
                  </CustomButton>
                </div>
              </div>
              <div className="bg-neutral-4 mt-1! rounded-xl p-4! font-[DanaFaNum]">
                {dataPlaceHolder({ data: band.text })}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-5! flex justify-end gap-1">
        <CustomButton onClick={cancelBtnHandler} loading={isBackLoading}>
          بازگشت
        </CustomButton>
        <CustomButton onClick={saveDraftHandler} loading={isDraftLoading}>
          ذخیره پیش نویس
        </CustomButton>
        <CustomButton
          type="primary"
          htmlType="submit"
          onClick={nextBtnHandler}
          loading={isNextLoading}
        >
          تایید و ادامه
        </CustomButton>
      </div>
    </Div>
  );
};

export default ContractsTemplateRulesDescOther;
