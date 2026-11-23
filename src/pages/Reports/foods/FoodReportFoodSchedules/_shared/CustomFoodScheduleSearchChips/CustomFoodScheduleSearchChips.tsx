import { Col, Row } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import "./_customFoodScheduleChips.scss";

const CustomFoodScheduleSearchChips = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const url = Object.fromEntries([...searchParams]);

  const handleRemoveFilter = (keyToRemove: string, nameToRemove?: string) => {
    // Create a copy of the URL params
    const updatedUrl = { ...url };

    // Remove the specified key
    delete updatedUrl[keyToRemove];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    nameToRemove && delete updatedUrl[nameToRemove];

    // Update the URL search params
    setSearchParams(updatedUrl);
  };
  return (
    <>
      <Row>
        <Col>
          <div className="collapse-container">
            <p className="text">فیلترهای شما</p>
            <IoIosArrowDown className="icon" />
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        {url?.selfId && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("selfId", "selfName");
              }}
            >
              سلف
            </CustomTag>
          </Col>
        )}
        {url?.statusId && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("statusId", "statusName");
              }}
            >
              وضعیت
            </CustomTag>
          </Col>
        )}
        {url?.date && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("date");
              }}
            >
              تاریخ
            </CustomTag>
          </Col>
        )}
        {url?.contractId && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("contractId", "contractName");
              }}
            >
              قرارداد
            </CustomTag>
          </Col>
        )}

        {url?.requestTypeId && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("requestTypeId", "requestTypeName");
              }}
            >
              نوع
            </CustomTag>
          </Col>
        )}
        {url?.mealId && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("mealId", "mealName");
              }}
            >
              وعده
            </CustomTag>
          </Col>
        )}
        {url?.foodId && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("foodId", "foodName");
              }}
            >
              غذا
            </CustomTag>
          </Col>
        )}
        {url?.branchCodeId && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("branchCodeId", "branchCodeName");
              }}
            >
              واحد دانشگاهی
            </CustomTag>
          </Col>
        )}
      </Row>
    </>
  );
};

export default CustomFoodScheduleSearchChips;
