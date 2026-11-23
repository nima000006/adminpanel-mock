import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Tabs,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { RcFile } from "antd/es/upload";
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlinePlusSquare } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import { BLUE_02 } from "../../../../infrastructure/VARS/globalColors/globalColors";
import { PADDING_40 } from "../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../CustomCard/CustomCard";
import CustomInput from "../../../CustomInputs/CustomInput/CustomInput";
import CustomSelectField from "../../../CustomInputs/CustomSelectField/CustomSelectField";
import CustomTextArea from "../../../CustomInputs/CustomTextArea/CustomTextArea";
import RoomFeatureData from "../../../RoomComponents/RulesSection/RoomFeatureData/RoomFeatureData";
import "./_createApartmentModal.scss";

type CreateApartmentModalProps = {
  createApartmentModal: {
    isOpen: boolean;
  };
  setCreateApartmentModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
    }>
  >;
};
type DataType = {
  key: React.Key;
  id: React.Key;
  dormCount: string;
  floorCount: string;
  isNew?: boolean;
};
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  // record,
  // index,
  children,
  ...restProps
}: any) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CreateApartmentModal = ({
  createApartmentModal,
  setCreateApartmentModal,
}: CreateApartmentModalProps) => {
  const [, setIsDormActive] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://placehold.co/400",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://placehold.co/400",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://placehold.co/400",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://placehold.co/400",
    },
    // {
    //   uid: "-xxx",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url: "https://placehold.co/400",
    // },
  ]);
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: 1,
      id: 1,
      dormCount: 1,
      floorCount: 1,
    },
  ]);

  const [editingKey, setEditingKey] = useState<any>("");
  const [form] = Form.useForm();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "10%",
      editable: true,
    },
    {
      title: "تعداد ساختمان",
      dataIndex: "dormCount",
      key: "dormCount",
      width: "30%",
      editable: true,
    },
    {
      title: "تعداد طبقات ساختمان‌ها",
      dataIndex: "floorCount",
      key: "floorCount",
      width: "30%",
      editable: true,
    },
    {
      title: "",
      dataIndex: "",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <div onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </div>
            {/* <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm> */}
          </span>
        ) : (
          <div onClick={() => edit(record)}>Edit</div>
        );
      },
    },
  ];

  const apartmentsItems = [
    {
      label: "حال حاضر",
      children: <RoomFeatureData />,
      key: "1",
    },
    {
      label: "نیمه اول ۱۴۰۱",
      children: <>{/* <ApartmentDetail key="1" /> */}</>,
      key: "2",
    },
    {
      label: "نیمه دوم ۱۴۰۱",
      children: <>{/* <ApartmentDetail key="1" /> */}</>,
      key: "3",
    },
  ];

  //* ================================ Util Functions ================================
  const isEditing = (record: DataType) => record.key === editingKey;
  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record?.key);
  };

  // const cancel = () => {
  //   setEditingKey("");
  // };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (_) {
      /* empty */
    }
  };

  const handleAdd = () => {
    const newData: DataType = {
      key: dataSource?.[dataSource.length]?.id ?? 0,
      id: dataSource?.[dataSource.length]?.id ?? 0,
      dormCount: dataSource?.[dataSource.length]?.dormCount ?? 0,
      floorCount: dataSource?.[dataSource.length]?.floorCount ?? 0,
      isNew: true,
    };
    setDataSource([...dataSource, newData]);
    // setCount(count + 1);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => {
        return {
          record,
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  // Upload  logics
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <div>
      <AiOutlinePlus />
      <div style={{ marginTop: 8 }}>بارگذاری تصاویر</div>
    </div>
  );

  // RulesSection logics
  const onTimeTabChange = () => {};
  const onTimeTabEdit = (
    _: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      // open modal
      //   setCreateApartmentModal({ isOpen: true });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {createApartmentModal?.isOpen && (
        <Modal
          title="ایجاد ساختمان"
          open={createApartmentModal?.isOpen}
          // onOk={handleOk}
          onCancel={() => setCreateApartmentModal({ isOpen: false })}
          width={1000}
          footer={null}
          className="create-apartment-modal-container"
          centered
        >
          {/* <RoleAndActive setIsDormActive={setIsDormActive} /> */}

          <div className="active-and-role-section-container">
            <div className="active-section">
              <span className="label">فعال / غیر فعال</span>
              <div>
                <Checkbox onChange={(e) => setIsDormActive(e.target.checked)}>
                  فعال
                </Checkbox>
              </div>
            </div>
            <div className="role-section">
              <span className="label">جایگاه سازمانی</span>
              <div>
                <Select
                  defaultValue="رییس"
                  style={{ width: 120 }}
                  //   onChange={handleChange}
                  options={[
                    { value: "رییس", label: "رییس" },
                    { value: "معاون", label: "معاون" },
                    { value: "همکار", label: "همکار" },
                  ]}
                />
              </div>
            </div>
          </div>
          {/* <BasicInfo title="اطلاعات پایه" from="apartment" /> */}
          <CustomCard className="base-info-container" padding={PADDING_40}>
            <div className="base-info-label">اطلاعات پایه</div>
            <div className="base-info-top-section">
              <CustomInput
                type="text"
                label="نام"
                name="dormName"
                placeholder="نام خوابگاه"
              />
              <CustomInput
                type="text"
                label="تلفن"
                name="phone"
                placeholder="مثلا 55223366 - 021"
              />

              <CustomInput
                type="text"
                label="کد پستی "
                name="userName"
                placeholder="10 رقمی"
              />
            </div>
            <div className="base-info-bottom-section">
              <CustomTextArea
                label="آدرس"
                dir="rtl"
                name="address"
                placeholder="آدرس"
                hasVerticalLabel={false}
              />
            </div>
          </CustomCard>
          {/* <RoomFeatures /> */}
          <CustomCard className="dorm-info-container" padding={PADDING_40}>
            <div className="dorm-info-label">توضیحات</div>
            <div className="dorm-info-top-section">
              <CustomSelectField
                label="امکانات"
                placeholder="انتخاب کنید"
                //   handleChange={capacityHandler}
                options={[]}
              />
              <CustomSelectField
                label="امکانات اطراف"
                placeholder="انتخاب کنید"
                //   handleChange={capacityHandler}
                options={[]}
              />
            </div>
            <div className="dorm-info-bottom-section">
              <CustomTextArea
                label="درباره"
                dir="rtl"
                name="about"
                placeholder="درباره"
                hasVerticalLabel={false}
              />
              <CustomTextArea
                label="قوانین و مقررات"
                dir="rtl"
                name="rules"
                placeholder="قوانین و مقررات"
                hasVerticalLabel={false}
              />
            </div>
          </CustomCard>
          {/* <ApartmentCreationInfo /> */}
          <CustomCard className="apartment-info-create-container" padding={PADDING_40}>
            <div className="description-title-container">
              <div className="apartment-info-label">ایجاد ساختمان</div>
              <div className="desc-enabler">
                <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" />
              </div>
            </div>
            <div className="table-container">
              <Form form={form} component={false}>
                <CustomTable
                  dataSource={dataSource}
                  columns={mergedColumns}
                  bordered={true}
                  size="small"
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                />
              </Form>
              <Button type="primary" className="new-row-btn" onClick={handleAdd}>
                سطر جدید
                <AiOutlineArrowUp className="new-row-btn-icon" />
              </Button>
            </div>
          </CustomCard>
          {/* <UploadImageSection /> */}
          <CustomCard
            className="upload-image-section-container-main"
            padding={PADDING_40}
          >
            <div className="upload-image-section-container">
              <div className="upload-image-section-label">تصاویر</div>
              <div>
                <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" />
              </div>
            </div>
            <div className="uploaded-images-container">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>

              {previewOpen && (
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
              )}
            </div>
          </CustomCard>
          {/* <RulesSection /> */}
          <CustomCard padding={PADDING_40}>
            <div className="rules-text-container">
              <div className="title">قوانین بر اساس زمان اعمال</div>
              <div className="sub-title">
                از این قسمت میتوانید مجموعه قوانین جدید ایجاد کرده و برای شروع اعمال آن
                تاریخ تعیین کنید.
              </div>
              <Tabs
                type="editable-card"
                onChange={onTimeTabChange}
                // activeKey={"1"}
                onEdit={onTimeTabEdit}
                items={apartmentsItems}
                className="rules-section-tabs-container"
                addIcon={
                  <div className="rules-section-btn">
                    <span className="rules-section-btn-label">بازه قانونی جدید</span>
                    <span>
                      <AiOutlinePlusSquare
                        style={{ color: BLUE_02, fontSize: "1.1rem" }}
                      />
                    </span>
                  </div>
                }
              />
            </div>
          </CustomCard>
        </Modal>
      )}
    </>
  );
};

export default CreateApartmentModal;
