import { Col, Row } from "antd";
import { useSearchParams } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";

const CustomReservationChip = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const url = Object.fromEntries([...searchParams]);

  const handleRemoveFilter = (keysToRemove: string[]) => {
    // Create a copy of the URL params
    const updatedUrl = { ...url };

    // Remove the specified key
    if (Array.isArray(keysToRemove)) {
      keysToRemove.forEach((key) => {
        delete updatedUrl[key];
      });
    } else {
      const keyToRemove = keysToRemove;
      delete updatedUrl[keyToRemove];
    }

    // Update the URL search params
    setSearchParams(updatedUrl);
  };

  return (
    <Row>
      {url?.firstName && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["firstName"]);
            }}
          >
            نام
          </CustomTag>
        </Col>
      )}
      {url?.lastName && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["lastName"]);
            }}
          >
            نام خانوادگی
          </CustomTag>
        </Col>
      )}
      {url?.username && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["username"]);
            }}
          >
            کد ملی
          </CustomTag>
        </Col>
      )}
      {url?.studentNumber && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["studentNumber"]);
            }}
          >
            شماره دانشجویی
          </CustomTag>
        </Col>
      )}
      {url?.branchCode && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["branchCode"]);
            }}
          >
            واحد دانشگاهی
          </CustomTag>
        </Col>
      )}
      {url?.restaurantId && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["restaurantId"]);
            }}
          >
            سلف
          </CustomTag>
        </Col>
      )}
      {url?.requestType && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["requestType"]);
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
              handleRemoveFilter(["mealId"]);
            }}
          >
            وعده
          </CustomTag>
        </Col>
      )}
      {url?.fromDate && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["fromDate", "toDate"]);
            }}
          >
            تاریخ
          </CustomTag>
        </Col>
      )}
      {url?.deliveryName && (
        <Col>
          <CustomTag
            closable
            color="orange"
            onClose={(e) => {
              e.preventDefault();
              handleRemoveFilter(["deliveryType", "deliveryName"]);
            }}
          >
            وضعیت تحویل
          </CustomTag>
        </Col>
      )}
    </Row>
  );
};

export default CustomReservationChip;
