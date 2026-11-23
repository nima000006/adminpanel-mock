import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  Modal,
  Select,
  Switch,
  Tabs,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { RcFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  CreateApartmentModalProps,
  NewApartmentTableData,
} from "./@types/@createDormModal";
import { CreateApartmentTableModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/CreateApartmentModel/CreateApartmentTableModel";
import {
  HOME_PHONE_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "../../../../infrastructure/validation/validationSchema";
import { BLUE_02 } from "../../../../infrastructure/VARS/globalColors/globalColors";
import { PADDING_40 } from "../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../CustomCard/CustomCard";
import CustomInput from "../../../CustomInputs/CustomInput/CustomInput";
import CustomSelectField from "../../../CustomInputs/CustomSelectField/CustomSelectField";
import CustomTextArea from "../../../CustomInputs/CustomTextArea/CustomTextArea";
import RoomFeatureData from "../../../RoomComponents/RulesSection/RoomFeatureData/RoomFeatureData";

import "./_createDormModal.scss";

// type DataType = {
//   key: React.Key;
//   id: React.Key;
//   dormCount: string;
//   floorCount: string;
//   isNew?: boolean;
// };
// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//   editing: boolean;
//   dataIndex: string;
//   title: any;
//   inputType: "number" | "text";
//   record: DataType;
//   index: number;
//   children: React.ReactNode;
// }

// const EditableCell: React.FC<EditableCellProps> = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   // record,
//   // index,
//   children,
//   ...restProps
// }: any) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{ margin: 0 }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CreateDormModal = ({
  createModalData,
  setCreateModalData,
}: CreateApartmentModalProps) => {
  // const [, setIsDormActive] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [isUploadImageEnable, setIsUploadImageEnable] = useState(false);
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
  ]);

  // const [dataSource, setDataSource] = useState<any[]>([
  //   {
  //     key: 1,
  //     id: 1,
  //     dormCount: 1,
  //     floorCount: 1,
  //   },
  // ]);

  // const [editingKey, setEditingKey] = useState<any>("");

  // const isEditing = (record: DataType) => record.key === editingKey;
  // const edit = (record: Partial<DataType> & { key: React.Key }) => {
  //   form.setFieldsValue({ name: "", age: "", address: "", ...record });
  //   setEditingKey(record?.key);
  // };
  // const columns = [
  //   {
  //     title: "#",
  //     dataIndex: "id",
  //     key: "id",
  //     width: "10%",
  //     editable: true,
  //   },
  //   {
  //     title: "تعداد ساختمان",
  //     dataIndex: "dormCount",
  //     key: "dormCount",
  //     width: "30%",
  //     editable: true,
  //   },
  //   {
  //     title: "تعداد طبقات ساختمان‌ها",
  //     dataIndex: "floorCount",
  //     key: "floorCount",
  //     width: "30%",
  //     editable: true,
  //   },
  //   {
  //     title: "",
  //     dataIndex: "",
  //     render: (_: any, record: DataType) => {
  //       const editable = isEditing(record);
  //       return editable ? (
  //         <span>
  //           <div onClick={() => save(record.key)} style={{ marginRight: 8 }}>
  //             Save
  //           </div>
  //           {/* <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
  //             <a>Cancel</a>
  //           </Popconfirm> */}
  //         </span>
  //       ) : (
  //         <div onClick={() => edit(record)}>Edit</div>
  //       );
  //     },
  //   },
  // ];
  // const cancel = () => {
  //   setEditingKey("");
  // };
  // const save = async (key: React.Key) => {
  //   try {
  //     const row = (await form.validateFields()) as DataType;

  //     const newData = [...dataSource];
  //     const index = newData.findIndex((item) => key === item.key);
  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, {
  //         ...item,
  //         ...row,
  //       });
  //       setDataSource(newData);
  //       setEditingKey("");
  //     } else {
  //       newData.push(row);
  //       setDataSource(newData);
  //       setEditingKey("");
  //     }
  //   } catch (errInfo) {
  //     /* empty */
  //   }
  // };
  // const handleAdd = () => {
  //   const newData: DataType = {
  //     key: dataSource?.[dataSource.length]?.id ?? 0,
  //     id: dataSource?.[dataSource.length]?.id ?? 0,
  //     dormCount: dataSource?.[dataSource.length]?.dormCount ?? 0,
  //     floorCount: dataSource?.[dataSource.length]?.floorCount ?? 0,
  //     isNew: true,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   // setCount(count + 1);
  // };
  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record: DataType) => {
  //       return {
  //         record,
  //         inputType: "text",
  //         dataIndex: col.dataIndex,
  //         title: col.title,
  //         editing: isEditing(record),
  //       };
  //     },
  //   };
  // });

  //* ================================ Util Functions ================================
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

  //  RulesSection logics
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

  // Todo[atefeh]:transform useState to the top lines of component when connect to api's
  const [isCreateApartmentActive, setIsCreateApartmentActive] = useState(false);
  const [isCreateApartmentModalActive, setIsCreateApartmentModalActive] = useState(false);
  const [apartmentsList, setApartmentsList] = useState<NewApartmentTableData[]>([]);
  const [count, setCount] = useState(1);
  const createNewApartmentHandler = (e: {
    apartmentNumber: string;
    floorNumber: string;
  }) => {
    setApartmentsList((prev) => [
      ...prev,
      {
        key: count,
        id: count,
        apartmentNumber: +e.apartmentNumber,
        floorNumber: +e.floorNumber,
      },
    ]);
    setCount((prev) => prev + 1);
    setIsCreateApartmentModalActive(false);
  };

  const onSubmitHandler = (/*e: any*/) => {
    // console.log(e);
    // console.log(apartmentsList);
    // console.log(fileList);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isCreateApartmentModalActive && (
        <Modal
          title="ایجاد ساختمان"
          open={isCreateApartmentModalActive}
          onCancel={() => setIsCreateApartmentModalActive(false)}
          footer={null}
        >
          <Form
            onFinish={createNewApartmentHandler}
            className="create-new-apartment-modal-body-container"
          >
            <div className="create-new-apartment-modal-body">
              <CustomInput
                type="text"
                label="تعداد ساختمان "
                name="apartmentNumber"
                rules={[REQUIRED_RULE, NUMBER_RULE]}
              />

              <CustomInput
                type="text"
                label="تعداد طبقات ساختمان‌ها"
                name="floorNumber"
                rules={[REQUIRED_RULE, NUMBER_RULE]}
              />
            </div>
            <div className="modal-btn-container">
              <Button htmlType="submit" type="primary" className="modal-btn">
                ایجاد
              </Button>
              <Button
                className="modal-btn"
                onClick={() => setIsCreateApartmentModalActive(false)}
              >
                انصراف
              </Button>
            </div>
          </Form>
        </Modal>
      )}

      {createModalData?.isOpen && (
        <Modal
          title="ایجاد خوابگاه"
          open={createModalData?.isOpen}
          // onOk={handleOk}
          onCancel={() => setCreateModalData({ isOpen: false })}
          width={1000}
          footer={null}
          className="create-dorm-modal-container"
          centered
        >
          <Form onFinish={onSubmitHandler} className="form-body">
            {/* <RoleAndActive setIsDormActive={setIsDormActive} /> */}
            <div className="active-and-role-section-container">
              <div className="active-section">
                <span className="label">فعال / غیر فعال</span>
                <div>
                  <Form.Item name="isActive" valuePropName="checked" initialValue={false}>
                    <Checkbox>فعال</Checkbox>
                  </Form.Item>
                </div>
              </div>
              <div className="role-section">
                <span className="label">جایگاه سازمانی</span>
                <Form.Item name="organizational-position">
                  <Select style={{ width: 120 }}>
                    {[
                      { value: "رییس", label: "رییس" },
                      { value: "معاون", label: "معاون" },
                      { value: "همکار", label: "همکار" },
                    ].map(({ value, label }) => (
                      <Select.Option
                        name="organizational-position"
                        key={value}
                        value={value}
                      >
                        {label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
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
                  rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
                />
                <CustomInput
                  type="text"
                  label="تلفن"
                  name="phone"
                  placeholder="مثلا 55223366 - 021"
                  rules={[HOME_PHONE_RULE]}
                />
                <CustomInput
                  type="text"
                  label="کد پستی "
                  name="postalCode"
                  placeholder="10 رقمی"
                  rules={[POSTAL_CODE_RULE]}
                />
              </div>
              <div className="base-info-bottom-section">
                <Form.Item name="address" rules={[REQUIRED_RULE, MIN_LENGTH_RULE(10)]}>
                  <CustomTextArea
                    label="آدرس"
                    dir="rtl"
                    name="address"
                    placeholder="آدرس"
                    hasVerticalLabel={false}
                  />
                </Form.Item>
              </div>
            </CustomCard>

            {/* <RoomFeatures /> */}
            <CustomCard className="dorm-info-container" padding={PADDING_40}>
              <div className="dorm-info-label">توضیحات</div>
              <div className="dorm-info-top-section">
                <Form.Item name="main-facilities">
                  <CustomSelectField
                    label="امکانات"
                    name="main-facilities"
                    placeholder="انتخاب کنید"
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="side-facilities">
                  <CustomSelectField
                    label="امکانات اطراف"
                    name="side-facilities"
                    placeholder="انتخاب کنید"
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="dorm-info-bottom-section">
                <Form.Item name="about">
                  <CustomTextArea
                    label="درباره"
                    dir="rtl"
                    name="about"
                    placeholder="درباره"
                    hasVerticalLabel={false}
                  />
                </Form.Item>

                <Form.Item name="rules" rules={[REQUIRED_RULE]}>
                  <CustomTextArea
                    label="قوانین و مقررات"
                    dir="rtl"
                    name="rules"
                    placeholder="قوانین و مقررات"
                    hasVerticalLabel={false}
                  />
                </Form.Item>
              </div>
            </CustomCard>
            {/* <ApartmentCreationInfo /> */}
            <CustomCard className="apartment-info-create-container" padding={PADDING_40}>
              <div className="description-title-container">
                <div className="apartment-info-label">ایجاد ساختمان</div>
                <div className="desc-enabler">
                  <Switch
                    checkedChildren="فعال"
                    unCheckedChildren="غیرفعال"
                    onChange={(e) => setIsCreateApartmentActive(e)}
                  />
                </div>
              </div>
              <div className={`table-container ${!isCreateApartmentActive && "hidden"}`}>
                <CustomTable
                  dataSource={apartmentsList}
                  columns={CreateApartmentTableModel}
                  {...TABLE_PROPS(apartmentsList?.length)}
                />
                <Button
                  type="primary"
                  className="new-row-btn"
                  onClick={() => setIsCreateApartmentModalActive(true)}
                >
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
                  <Switch
                    checkedChildren="فعال"
                    unCheckedChildren="غیرفعال"
                    defaultChecked={isUploadImageEnable}
                    onChange={(checked) => setIsUploadImageEnable(checked)}
                  />
                </div>
              </div>
              <div
                className={`uploaded-images-container ${!isUploadImageEnable && "hidden"}`}
              >
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
            <div className="confirm-btn-container">
              <Button
                htmlType="submit"
                type="primary"
                loading={false}
                className="confirm-btn"
              >
                ایجاد خوابگاه
              </Button>
              <Button className="confirm-btn">انصراف</Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default CreateDormModal;
