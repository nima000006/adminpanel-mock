import { Col, Row } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import useQueryParams from "@infra/hooks/useQueryParams";
import "./_foodFilterChip.scss";

const FoodFilterChips = () => {
  const { params: url, setSearchParams } = useQueryParams();

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
      <Row>
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

        {url?.vendorId && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("vendorId", "vendorName");
              }}
            >
              تامین کننده
            </CustomTag>
          </Col>
        )}
        {(url?.minUrlValue || url?.maxUrlValue) && (
          <Col>
            <CustomTag
              closable
              color="orange"
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter("minUrlValue", "maxUrlValue");
              }}
            >
              قیمت
            </CustomTag>
          </Col>
        )}
      </Row>
    </>
  );
};
export default FoodFilterChips;
