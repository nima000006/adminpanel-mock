import { useState, useRef } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";
import { AiOutlineClose } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import { QrScannerProps } from "./@types/qr-scanner.types";

import "./_qrScanner.scss";

const QrScanner = ({ onScanSuccess, onClose }: QrScannerProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const hasScannedRef = useRef(false);
  const handleScan = (detectedCodes: any[]) => {
    // Prevent multiple scans
    if (
      hasScannedRef.current ||
      isPaused ||
      !detectedCodes ||
      detectedCodes.length === 0
    ) {
      return;
    }

    hasScannedRef.current = true;
    setIsPaused(true);

    // Get the first detected code
    const code = detectedCodes[0];
    const scannedValue = code.rawValue;

    // Call success callback
    onScanSuccess(scannedValue);
  };

  const handleError = (error: any) => {
    console.error("Scanner error:", error);
    setError(
      error?.message ||
        "دسترسی به دوربین امکان‌پذیر نیست. لطفا دسترسی دوربین را در تنظیمات مرورگر فعال کنید."
    );
  };

  const handleClose = () => {
    setIsPaused(true);
    onClose();
  };

  const handleRetry = () => {
    setError(null);
    hasScannedRef.current = false;
    setIsPaused(false);
  };

  return (
    <div className="qr-scanner-container">
      <div className="qr-scanner-header">
        <h3>اسکن بارکد تحویل</h3>
        <CustomButton
          type="text"
          icon={<AiOutlineClose />}
          onClick={handleClose}
          className="close-btn"
        >
          {""}
        </CustomButton>
      </div>

      <div className="qr-scanner-content">
        {error ? (
          <div className="scanner-error">
            <p>دوربینی پیدا نشد</p>
            <CustomButton type="primary" onClick={handleRetry}>
              تلاش مجدد
            </CustomButton>
          </div>
        ) : (
          <>
            <div className="scanner-wrapper">
              <Scanner
                onScan={handleScan}
                onError={handleError}
                paused={isPaused}
                formats={["any"]}
                scanDelay={300} // ← Add this (milliseconds between scans)
                allowMultiple={false} // ← Prevent duplicates
                constraints={{
                  facingMode: "environment",
                  aspectRatio: 1,
                  width: { ideal: 1920 }, // ← Higher resolution helps detection
                  height: { ideal: 1080 },
                }}
                sound={true}
                components={{
                  finder: true,
                  torch: true, // ← Add flashlight for low-light scenes
                  zoom: true, // ← Allow zoom for distant codes
                }}
                styles={{
                  container: {
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  },
                }}
              />
            </div>
            <p className="scanner-instruction">بارکد را در مقابل دوربین قرار دهید</p>
          </>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
