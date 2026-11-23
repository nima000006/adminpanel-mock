import { Modal } from "antd";

import QrScanner from "./helper/QrScanner";
import { CustomQrScannerProps } from "./helper/QrScanner/@types/qr-scanner.types";

const CustomQrScanner = ({
  isScannerOpen,
  // setIsScannerOpen,
  handleScanSuccess,
  handleCloseScan,
}: CustomQrScannerProps) => {
  return (
    <>
      {/* {isScannerOpen && ( */}
      <Modal
        open={isScannerOpen}
        onCancel={handleCloseScan}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        style={{ maxWidth: 600, top: 20 }}
        destroyOnHidden
        closable={false}
        maskClosable={false}
        keyboard={false}
        zIndex={1200}
      >
        <QrScanner onScanSuccess={handleScanSuccess} onClose={handleCloseScan} />
      </Modal>
      {/* )} */}
    </>
  );
};

export default CustomQrScanner;
