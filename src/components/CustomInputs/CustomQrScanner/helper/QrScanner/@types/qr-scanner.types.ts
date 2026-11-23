export interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

export type CustomQrScannerProps = {
  handleScanSuccess: (decodedText: string) => void;
  handleCloseScan: () => void;
  // setIsScannerOpen: () => void;
  isScannerOpen: boolean;
};
