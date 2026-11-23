import { useState } from "react";

import { RadioChangeEvent } from "antd";

import { SearchModeState } from "./@types/@searchMode";
import CustomCard from "../../../../components/CustomCard/CustomCard";
import CustomRadioGroup from "../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import UniversityInfo from "../helpers/UniversityInfo/UniversityInfo";
import UserInfo from "../helpers/UserInfo/UserInfo";
import "./_searchMode.scss";

const UNIVERSITY_SEARCH = "UNIVERSITY_SEARCH";
const INDIVIDUAL_SEARCH = "INDIVIDUAL_SEARCH";

const SearchMode = () => {
  const [searchMode, setSearchMode] = useState<SearchModeState>(UNIVERSITY_SEARCH);

  useTitle({ text: "جستجوی دانشگاه" });

  //!
  const onRadioOptionChange = (e: RadioChangeEvent) => {
    setSearchMode(e.target.value);
  };

  return (
    <section className="advanced-filter-container">
      <div className="title">
        لطفا برای مشاهده جدول کاربران، دانشگاه مد نظر را انتخاب کنید
      </div>
      <CustomCard>
        <CustomRadioGroup
          label="جستجو براساس:"
          options={[
            { label: "اطلاعات دانشگاهی", value: UNIVERSITY_SEARCH },
            { label: "اطلاعات فردی", value: INDIVIDUAL_SEARCH },
          ]}
          value={searchMode}
          onChange={onRadioOptionChange}
        />
        {searchMode === UNIVERSITY_SEARCH ? <UniversityInfo /> : <UserInfo />}
      </CustomCard>
      <p className="title gary-title">
        بعد از نمایش جدول، میتوانید از قسمت فیلتر پیشرفته دانشگاه خود را تغییر دهید.
      </p>
    </section>
  );
};

export default SearchMode;
