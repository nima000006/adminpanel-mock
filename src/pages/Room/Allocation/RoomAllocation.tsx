import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useSearchParams } from "react-router";

import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import CustomCard from "../../../components/CustomCard/CustomCard";
import CustomDivider from "../../../components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "../../../components/Renderers/SingleVerticalItem/SingleVerticalItem";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import {
  CheckBoxFormGenerator,
  dataPlaceHolder,
  selectDefaultValueGenerator,
} from "../../../infrastructure/helpers/utils";
import { AllocationRoomListModel } from "../../../infrastructure/models/tableModels/RoomTableModel/AllocationRoomList/AllocationRoomListModel";
import {
  useGetRoomInformationMutation,
  useLazyGetPersonInRoomByRoomIdQuery,
} from "../../../infrastructure/states/redux/Apis/roomApi";
import { semestersOption } from "../_shared/lib/config";
import { GetRoomInformationResponse } from "../Dorm/CreateRoom/@types/@createRoom";

import "./_roomAllocation.scss";

// const breadCrumbItems = [
//   {
//     title: "خوابگاه شهید چمران - واحد ایرانشهر",
//   },
//   {
//     title: "طبقه 1",
//   },
//   {
//     title: "سوییت 141",
//   },
//   {
//     title: "طبقه 1",
//   },
// ];

// const capacityOptions = [
//   { value: "1", label: "1" },
//   { value: "2", label: "2" },
//   { value: "3", label: "3" },
//   { value: "4", label: "4" },
// ];

// const facilityOptions = [
//   {
//     value: "کولر",
//     label: "کولر",
//   },
// ];

// const qualityGradeOptions = [
//   {
//     value: "وابسته",
//     label: "وابسته",
//   },
// ];

// const reservationCheckboxDateOption = [
//   {
//     label: "ترمیک",
//     value: "term",
//   },
//   {
//     label: "ماهانه",
//     value: "monthly",
//   },
//   {
//     label: "روزانه",
//     value: "daily",
//   },
// ];

// const reservationRadioButtonDateOption = [
//   {
//     label: "مستقل",
//     value: "independent",
//   },
//   {
//     label: "زیرمجموعه",
//     value: "subset",
//   },
//   {
//     label: "سوئیت",
//     value: "suite",
//   },
// ];

// const installmentDataSource = [
//   {
//     id: 1,
//     key: 1,
//     rowNumber: "1",
//     percent: "30",
//     relatedTo: ``,
//     relatedToTime: ``,
//     howManyDays: "10",
//   },
//   {
//     id: 2,
//     key: 2,
//     rowNumber: "2",
//     percent: "70",
//     relatedTo: ``,
//     relatedToTime: ``,
//     howManyDays: "5",
//   },
// ];

// const installmentContent = (
//   <div className="payment-rule-body-container">
//     <div className="mortgage-container">
// <CustomDivider  text="رهن" />
//       <div className="mortgage-body">
//         <div className="price-container">
//           <Switch defaultChecked={true} className="switch" />
//           <span className="price-title">مبلغ تومان:</span>
//           <div>
//             <Input />
//           </div>
//         </div>
// <CustomDivider text="" type="vertical" />;
//         <div className="time-container">
//           <Radio.Group
//             options={[
//               {
//                 label: "زودتر",
//                 value: "sooner",
//               },
//               {
//                 label: "دیرتر",
//                 value: "later",
//               },
//               {
//                 label: "همزمان با رزرو",
//                 value: "withReserve",
//               },
//             ]}
//             defaultValue={"sooner"}
//             className="radio-group"
//           ></Radio.Group>
//           <div className="day-container">
//             <span className="day-title">چند روز:</span>
//             <div>
//               <Input />
//             </div>
//             <Button type="primary" className="register-mortgage-btn">
//               ثبت رهن
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="installment-container">
// <CustomDivider  text="تقسیط پرداخت" />
//       <div>
//         <Button type="primary" icon={<AiOutlineArrowUp />} className="add-new-row-btn">
//           سطر جدید
//         </Button>
//       </div>
//       <CustomTable
//         dataSource={installmentDataSource}
//         columns={RoomInstallment({
//           // roomClickHandler: roomClickHandler,
//         })}
//         pagination={paginationConfig}
//         {...TABLE_PROPS(installmentDataSource?.length)}
//       />
//     </div>
//   </div>
// );

// const tabItems = [
//   {
//     key: "term",
//     label: <div className="payment-rule-tabs-label">ترمیک</div>,
//     children: installmentContent,
//   },
//   {
//     key: "monthly",
//     label: <div className="payment-rule-tabs-label">ماهانه</div>,
//     children: installmentContent,
//   },
//   {
//     key: "daily",
//     label: <div className="payment-rule-tabs-label">روزانه</div>,
//     children: installmentContent,
//   },
// ];

// const cardTabItems = [
//   {
//     key: "now",
//     label: <div className="payment-rule-tabs-label">حال حاضر</div>,
//   },
//   {
//     key: "first-half",
//     label: <div className="payment-rule-tabs-label">نیمه اول 1402</div>,
//   },
//   {
//     key: "second-half",
//     label: <div className="payment-rule-tabs-label">نیمه دوم 1402</div>,
//   },
//   {
//     key: "newRule",
//     label: (
//       <div className="payment-rule-tabs-label">
//         <Button type="text" icon={<AiOutlinePlusSquare  />} className="tab-card-btn">
//           بازه قانونی جدید
//         </Button>
//       </div>
//     ),
//   },
// ];

const RoomAllocation = () => {
  useTitle({ text: "اطلاعات اتاق" });
  const [term, setTerm] = useState<{ id: number; title: string }>(
    semestersOption[semestersOption?.length - 1]
  );
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const [form] = Form.useForm();
  // const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);

  // const modalCloseHandler = () => setIsAllocationModalOpen(false);
  // const modalOpenHandler = () => setIsAllocationModalOpen(true);

  //? ================================  Api Calls ================================
  const [getRoomInfo, { data: roomData, isLoading: isRoomDataLoading }] =
    useGetRoomInformationMutation();

  const [getPeople, { data: peopleData, isFetching: isPeopleDataLoading }] =
    useLazyGetPersonInRoomByRoomIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getRoomInfo(id).unwrap().then(onGetRoomInfoSuccess);
      getPeople({ roomId: id, term: term?.id?.toString() });
    }
  }, [id, term?.id]);

  //* ================================ Util Functions ================================
  const onGetRoomInfoSuccess = (res: GetRoomInformationResponse) => {
    if (res?.status === 200) {
      form.setFieldsValue({
        roomStatus: [CheckBoxFormGenerator(res?.data?.isactive, "isactive")],
      });
    }
  };

  //? ================================ Request ================================
  useEffect(() => {
    form.setFieldsValue({ term: selectDefaultValueGenerator({ ...semestersOption[8] }) });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* <RoomAllocationModal isOpen={isAllocationModalOpen} onCancel={modalCloseHandler} /> */}
      <Form className="room-allocation-page-container" form={form}>
        {/* //! 1 */}
        {/* <CustomCard padding={PADDING_20}>
          <div className="bread-crumb-container">
            <Breadcrumb items={breadCrumbItems} className="bread-crumb" />
            <Button className="room-allocation-button" onClick={modalOpenHandler}>
              تخصیص اتاق
            </Button>
          </div>
        </CustomCard> */}
        <CustomCard>
          <CustomDivider text="وضعیت اتاق" />
          <CustomCheckboxGroup
            options={[{ label: "فعال", value: "isactive" }]}
            name="roomStatus"
            disabled={true}
          />
        </CustomCard>
        <CustomCard loading={isRoomDataLoading}>
          <CustomDivider text="اطلاعات" />
          <div className="room-allocation__inputs">
            <SingleVerticalItem
              label="نام اتاق"
              value={dataPlaceHolder({ data: roomData?.data?.name })}
            />
            <SingleVerticalItem
              label="شماره اتاق"
              value={dataPlaceHolder({ data: roomData?.data?.number })}
            />
            <SingleVerticalItem
              label="قیمت"
              value={dataPlaceHolder({ data: roomData?.data?.price?.toString() })}
            />
            <SingleVerticalItem
              label="ظرفیت کل"
              value={dataPlaceHolder({ data: roomData?.data?.coposity?.toString() })}
            />
            <SingleVerticalItem
              label="ظرفیت باقی مانده"
              value={dataPlaceHolder({ data: roomData?.data?.freecopasity?.toString() })}
            />
            <SingleVerticalItem
              label="تلفن"
              value={dataPlaceHolder({ data: roomData?.data?.phone })}
            />
          </div>
        </CustomCard>
        {/* //! 2 */}
        {/* <div className="quality-grade-container">
          <CustomCard>
          //  <CustomDivider  text="درجه کیفی" />
            <div className="quality-grade-select">
              <Switch
                checkedChildren="مستقل"
                unCheckedChildren="وابسته"
                defaultChecked={true}
                className="switch"
              />
              <div>
                <CustomSelectField
                  placeholder="انتخاب کنید"
                  options={qualityGradeOptions}
                />
              </div>
            </div>
          </CustomCard>
        </div> */}
        <CustomCard>
          <CustomDivider text="ساکنین اتاق" />
          <Row>
            <Col span={12}>
              <CustomSelect
                name="term"
                options={semestersOption}
                value={term}
                onChange={(_, option: any) => setTerm(option?.item)}
                // className="room-allocate-select"
                hasVerticalLabel={false}
              />
            </Col>
          </Row>
          <CustomTable
            dataSource={peopleData?.data}
            columns={AllocationRoomListModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(peopleData?.data.length || 0)}
            loading={isPeopleDataLoading}
          />
        </CustomCard>
        {/* //! 3 */}
        {/* <div className="rules-based-on-the-time-container">
          <h3 className="title">قوانین براساس زمان اعمال</h3>
          <p className="description">
            از این قسمت میتوانید مجموعه قوانین جدید ایجاد کرده و برای شروع اعمال آن تاریخ
            تعیین کنید.
          </p>

          <Tabs type="card" items={cardTabItems} className="rule-tabs-container" />

          <div className="start-date-container">
            <EditOutlined style={{ color: "#1890FF", fontSize: "16px" }} />
            <span className="start-date">شروع از 02 / 02 / 1402</span>
          </div>
        </div> */}
        {/* //! 4 */}
        {/* <div className="reservation-time-container">
          <div className="independent-room">
            <CustomCard className="reservation-time-body">
              <div className="card-header-container">
                <h3 className="header-title">مدت رزرو</h3>
                <Switch
                  checkedChildren="وابسته"
                  unCheckedChildren="مستقل"
                  defaultChecked={true}
                  className="switch"
                />
              </div>
              <div className="reservation-time-main-container">
                <Radio.Group
                  options={reservationRadioButtonDateOption}
                  defaultValue={"independent"}
                  className="radio-group"
                ></Radio.Group>
                // <CustomDivider type="vertical" text="" />
                <div className="select-room-container">
                  <span className="select-room-title">سوئیت:</span>
                  <div className="select-room-select-field-container">
                    <CustomSelectField
                      placeholder="انتخاب کنید"
                      options={qualityGradeOptions}
                    />
                  </div>
                  <Button type="primary" className="select-room-btn">
                    ثبت سوئیت
                  </Button>
                </div>
              </div>
            </CustomCard>
          </div>
          <div className="dependent-room">
            <CustomCard className="reservation-time-body">
              <div className="card-header-container">
                <h3 className="header-title">مدت رزرو</h3>
                <Switch
                  checkedChildren="مستقل"
                  unCheckedChildren="وابسته"
                  defaultChecked={true}
                  className="switch"
                />
              </div>
              <div className="reservation-time-main-container">
                <Checkbox.Group
                  options={reservationCheckboxDateOption}
                  defaultValue={["term"]}
                />
              </div>
            </CustomCard>
          </div>
        </div> */}
        {/* //! 5 */}
        {/* <div className="reservation-bed-and-price-container">
          <CustomCard className="reservation-time-body">
            <div className="card-header-container">
              <h3 className="header-title">قطعیت رزرو</h3>
              <Switch
                checkedChildren="مستقل"
                unCheckedChildren="وابسته"
                defaultChecked={true}
                className="switch"
              />
            </div>
            <div className="accept-reservation">
              <CustomSelectField
                placeholder="انتخاب کنید"
                options={qualityGradeOptions}
              />
            </div>
          </CustomCard>
          <CustomCard className="reservation-time-body">
            <div className="card-header-container">
              <h3 className="header-title">تخت اضافه</h3>
              <Switch
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                defaultChecked={true}
                className="switch"
              />
            </div>
            <div className="bed-count-container">
              <span className="bed-count-title">تعداد:</span>
              <div>
                <Input />
              </div>
              <Button type="primary" className="select-room-btn">
                ثبت
              </Button>
            </div>
          </CustomCard>
          <CustomCard className="reservation-time-body">
            <div className="card-header-container">
              <h3 className="header-title">قیمت مستقل</h3>
              <Switch
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                defaultChecked={true}
                className="switch"
              />
            </div>
            <div className="bed-count-container">
              <span className="bed-count-title">قیمت:</span>
              <div>
                <Input />
              </div>
              <Button type="primary" className="select-room-btn">
                ثبت
              </Button>
            </div>
          </CustomCard>
          <CustomCard className="card-header-container">
            <h3 className="header-title">امکان رزرو دربست</h3>
            <Switch
              checkedChildren="فعال"
              unCheckedChildren="غیرفعال"
              defaultChecked={true}
              className="switch"
            />
          </CustomCard>
        </div> */}
        {/* //! 6 */}
        {/* <CustomCard className="payment-rule-container">
          <div className="card-header-container">
            <h3 className="header-title">قوانین پرداخت</h3>
            <Switch
              checkedChildren="فعال"
              unCheckedChildren="غیرفعال"
              defaultChecked={true}
              className="switch"
            />
          </div>
          <Tabs
            defaultActiveKey={"term"}
            items={tabItems}
            dir="rtl"
            className="payment-tabs-container"
          />
        </CustomCard> */}
        {/* //! 7 */}
        {/* <div className="allocation-container">
          <CustomCard className="reservation-time-body">
            <div className="card-header-container">
              <h3 className="header-title">تخصیص به گروه‌های کاربری</h3>
              <Switch
                checkedChildren="مستقل"
                unCheckedChildren="وابسته"
                defaultChecked={true}
                className="switch"
              />
            </div>
            <div className="reservation-time-main-container">
              <Checkbox.Group
                options={[
                  {
                    label: "دانشجویان",
                    value: "students",
                  },
                  {
                    label: "خانواده ها",
                    value: "families",
                  },
                  {
                    label: "کارمندان",
                    value: "employees",
                  },
                ]}
                defaultValue={["students"]}
              />
            </div>
          </CustomCard>
        </div> */}
        {/* //! 8 */}
        {/* <div className="allocation-container">
          <CustomCard className="allocation-body">
            <div className="card-header-container">
              <h3 className="header-title">تخصیص پارامترهای آموزش</h3>
              <Switch
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                defaultChecked={true}
                className="switch"
              />
            </div>
            <div className="training-items-container">
              <RoomAllocationTrainingItem title="دانشگاه" />
              <RoomAllocationTrainingItem title="مقطع" />
              <RoomAllocationTrainingItem title="سال ورود" />
              <RoomAllocationTrainingItem title="رشته" />
              <RoomAllocationTrainingItem title="دین" />
              <RoomAllocationTrainingItem title="مذهب" />
            </div>
          </CustomCard>
        </div> */}
      </Form>
    </>
  );
};

export default RoomAllocation;
