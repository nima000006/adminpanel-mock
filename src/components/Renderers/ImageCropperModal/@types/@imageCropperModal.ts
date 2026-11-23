import { PercentCrop, PixelCrop, ReactCropState } from "react-image-crop";

export type ImageCropperModalProps = {
  imageCropperInfo: imageCropperType;
  setImageCropperInfo: React.Dispatch<React.SetStateAction<imageCropperType>>;
  onCropConfirm: (data: any) => void;
  title?: string;

  //
  locked?: boolean;
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  keepSelection?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: (crop: PixelCrop, percentCrop: PercentCrop) => void;
  onDragStart?: (e: PointerEvent) => void;
  onDragEnd?: (e: PointerEvent) => void;
  renderSelectionAddon?: (state: ReactCropState) => React.ReactNode;
  ruleOfThirds?: boolean;
  circularCrop?: boolean;
};

export type imageCropperType = {
  isOpen: boolean;
  data: {
    src: string | undefined;
  };
};
