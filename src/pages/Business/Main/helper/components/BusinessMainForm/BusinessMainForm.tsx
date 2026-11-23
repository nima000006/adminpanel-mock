import { useState } from "react";

import { Button, Select, Upload, Radio, Switch } from "antd";
import { AiOutlineEdit, AiOutlineUpload } from "react-icons/ai";
import { useMapEvents } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";
import { TileLayer } from "react-leaflet/TileLayer";
import { useNavigate } from "react-router";

import { BusinessTypeContentArray } from "./@types/@businessMainForm";
import CustomCard from "../../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import { BUSINESS_STRUCTURE_PAGE_ROUTE } from "../../../../../../infrastructure/router/routes/business";
import {
  FONTSIZE_28,
  PADDING_40,
} from "../../../../../../infrastructure/VARS/globalStyles/globalStyles";
import "leaflet/dist/leaflet.css";
import "./_businessMainForm.scss";

const BusinessMainForm = () => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const businessTypeContentArray: BusinessTypeContentArray[] = [
    {
      id: 1,
      title: "دانشگاه",
      btnLabel: "پارامترهای پایه",
    },
    {
      id: 2,
      title: "بیمارستان",
      btnLabel: "پارامترهای پایه",
    },
    {
      id: 3,
      title: "وزارت خانه",
      btnLabel: "پارامترهای پایه",
    },
  ];
  const navigate = useNavigate();

  const viewStructureHandler = () => {
    navigate(BUSINESS_STRUCTURE_PAGE_ROUTE);
  };
  const LocationFinder = () => {
    const map = useMapEvents({
      click: ({ latlng }) => {
        setLat(latlng?.lat);
        setLng(latlng?.lng);
      },
    });
    map.attributionControl.setPrefix("");
    return null;
  };
  return (
    <div className="business-main-form-container">
      <div className="btn-wrapper">
        <Button className="business-main-form-btn" onClick={viewStructureHandler}>
          مشاهده و اصلاح ساختار
        </Button>
        <Button className="business-main-form-btn">پارامترهای پایه</Button>
      </div>
      <CustomCard padding={PADDING_40} className="business-owner-info-wrapper">
        <div className="business-owner-info">
          <AiOutlineEdit style={{ fontSize: FONTSIZE_28 }} />
          <p className="business-owner-info-text">اطلاعات مالک کسب و کار</p>
        </div>
        <div className="business-owner-info-inputs-wrapper">
          <CustomInput type="text" label="نام" name="userName" placeholder="نام" />
          <CustomInput
            type="text"
            label="نام خانوادگی"
            name="lastName"
            placeholder="نام خانوادگی"
          />
          <CustomInput
            type="text"
            label="موبایل"
            name="mobile-number"
            placeholder="موبایل"
          />
          <CustomInput
            type="text"
            label="کد ملی مالک"
            name="nationalCode"
            placeholder="کد ملی مالک"
          />
          <CustomInput
            type="text"
            label="E-mail"
            name="E-mail"
            placeholder="example@gmail.com"
          />
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_40} className="business-contacts-wrapper">
        <div className="business-owner-info">
          <AiOutlineEdit style={{ fontSize: FONTSIZE_28 }} />
          <p className="business-owner-info-text"> اطلاعات تماس </p>
        </div>
        <div className="phone-and-postal-code-wrapper">
          <CustomInput
            type="text"
            label="تلفن"
            name="phone"
            placeholder="021-55223366 مثلا"
          />
          <CustomInput
            type="text"
            label="کدپستی"
            name="postalCode"
            placeholder="10 رقمی"
          />
        </div>
        <div className="business-contacts-text-area-wrapper">
          <CustomTextArea
            label="آدرس"
            dir="rtl"
            name="address"
            hasVerticalLabel={false}
          />
          <CustomTextArea
            label="درباره"
            dir="rtl"
            name="about"
            hasVerticalLabel={false}
          />
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_40} className="business-basic-information-wrapper">
        <div className="business-owner-info">
          <AiOutlineEdit style={{ fontSize: FONTSIZE_28 }} />
          <p className="business-owner-info-text"> اطلاعات پایه </p>
        </div>
        <div className="services-select">
          <p className="label">سرویس ها</p>
          <Select
            defaultValue="انتخاب کنید"
            style={{ width: 300 }}
            // onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
        </div>
        <div className="business-type-wrapper">
          <p className="label business-type-label">نوع بیزنس</p>
          <div className="business-type-content">
            {businessTypeContentArray.map((item) => (
              <div className="business-type-row-wrapper" key={item.id}>
                <div className="business-type-row-left-side">
                  <Switch
                    checkedChildren="فعال"
                    unCheckedChildren="غیرفعال"
                    defaultChecked
                  />
                  <p className="title">{item.title}</p>
                </div>
                <Button className="business-main-form-btn">{item.btnLabel}</Button>
              </div>
            ))}
          </div>
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_40} className="business-information-wrapper">
        <div className="business-owner-info">
          <AiOutlineEdit style={{ fontSize: FONTSIZE_28 }} />
          <p className="business-owner-info-text"> اطلاعات کسب و کار </p>
        </div>
        <div className="legal-wrapper">
          <p className="legal-label">حقیقی/حقوقی</p>
          <div className="legal-box">
            <div className="legal-box-right-side">
              <Radio.Group name="legal" defaultValue={"a"}>
                <Radio value={"a"}>حقوقی</Radio>
                <Radio value={"b"}>حقیقی</Radio>
              </Radio.Group>
            </div>
            <p>|</p>
            <div className="legal-box-left-side">
              <p>کد ثبت:</p>
              <input className="register-code-input" placeholder="کد ثبت" />
            </div>
          </div>
        </div>
        <div className="personality-group">
          <div className="personality-group-row">
            <CustomInput
              type="text"
              label="گروه شخصیتی"
              name="personalityGroup"
              placeholder="مثلا 021-55223366"
            />
            <CustomInput
              type="text"
              label="شناسه ملی"
              name="personalityNationalCode"
              placeholder="10رقمی "
            />
          </div>
          <div className="personality-group-row">
            <CustomInput
              type="text"
              label="نام شخصیت"
              name="personalityName"
              placeholder="مثلا 021-55223366"
            />
            <CustomInput
              type="text"
              label="ثبت کننده شخصیت حقوقی"
              name="personalityLegalRegister"
              placeholder="10رقمی "
            />
          </div>
          <div className="personality-group-row">
            <CustomInput
              type="text"
              label="مرجع تاسیس / واحد ثبتی"
              name="personalityName"
              placeholder="مثلا 021-55223366"
            />
            <CustomInput
              type="text"
              label="ثبت کننده شخصیت حقوقی"
              name="personalityLegalRegister"
              placeholder="10رقمی"
            />
          </div>
          <div className="personality-group-row-one">
            <CustomInput
              type="text"
              label="تاریخ تاسیس"
              name="date"
              placeholder="مثلا 021-55223366"
            />
          </div>
          <CustomTextArea
            label={"آدرس (ثبت شده در روزنامه رسمی)"}
            dir={"rtl"}
            name={"آدرس"}
            placeholder={"آدرس"}
            hasVerticalLabel={false}
          />
        </div>
        <div className="map-container">
          <p className="map-label">لوکیشن اقامت قانونی</p>
          <div className="map-main-content">
            <MapContainer
              center={[35.699739, 51.338097]}
              // center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={true}
              className="map-container-style"
            >
              <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat ?? 35.699739, lng ?? 51.338097]}></Marker>
              <LocationFinder />
            </MapContainer>
          </div>
        </div>
        <div className="document-image-wrapper">
          <p className="document-image-label">تصویر مدارک</p>
          <div className="row">
            <p className="upload-img-text">تصویر مدرک 1</p>
            <Upload>
              <Button icon={<AiOutlineUpload />}> بارگذاری تصاویر </Button>
            </Upload>
          </div>
          <div className="row">
            <p className="upload-img-text">تصویر مدرک 1</p>
            <Upload>
              <Button icon={<AiOutlineUpload />}> بارگذاری تصاویر </Button>
            </Upload>
          </div>
          <div className="row">
            <p className="upload-img-text">تصویر مدرک 1</p>
            <Upload>
              <Button icon={<AiOutlineUpload />}> بارگذاری تصاویر </Button>
            </Upload>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};
export default BusinessMainForm;
