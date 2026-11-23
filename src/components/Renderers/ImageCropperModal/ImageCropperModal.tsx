import { useState, useRef, useEffect, SyntheticEvent } from "react";

import { Modal } from "antd";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import { ImageCropperModalProps } from "./@types/@imageCropperModal";
import "react-image-crop/dist/ReactCrop.css";
import "./_imageCropperModal.scss";

const ImageCropperModal = ({
  imageCropperInfo,
  setImageCropperInfo,
  onCropConfirm,
  title = "ویرایش تصویر",

  //
  aspectRatio = undefined,
  locked = false,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  keepSelection,
  disabled,
  className,
  style,
  onComplete,
  onDragStart,
  onDragEnd,
  renderSelectionAddon,
  ruleOfThirds,
  circularCrop,
}: ImageCropperModalProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (completedCrop && imgRef.current && previewCanvasRef.current) {
      const canvas = previewCanvasRef.current;
      const crop = completedCrop;
      const image = imgRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }
  }, [completedCrop]);

  const onImageLoad = (event: SyntheticEvent<any, Event>) => {
    const { width, height } = event.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, 16 / 9, width, height),
        width,
        height
      )
    );
  };

  //! oLD
  // const onConfirmCrop = () => {
  //   if (previewCanvasRef.current) {
  //     onCropConfirm(previewCanvasRef.current.toDataURL("image/png"));
  //     setImageCropperInfo({ isOpen: false, data: { src: "" } });
  //   }
  // };
  const onConfirmCrop = () => {
    if (previewCanvasRef.current) {
      const canvas = previewCanvasRef.current;
      const imageType = imgRef.current?.src.includes("image/png")
        ? "image/png"
        : "image/jpeg";
      const quality = imageType === "image/jpeg" ? 0.8 : undefined; // JPEG quality control

      // Export the image from the canvas
      const croppedImage = canvas.toDataURL(imageType, quality);

      // Confirm the crop and close the modal
      onCropConfirm(croppedImage);

      // reset the stats //! important
      setCompletedCrop(undefined);
      setCrop(undefined);
      setImageCropperInfo({ isOpen: false, data: { src: "" } });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {imageCropperInfo?.isOpen && (
        <Modal
          title={title}
          open={imageCropperInfo?.isOpen}
          onCancel={() => setImageCropperInfo({ isOpen: false, data: { src: "" } })}
          width={900}
          // height={900}
          className="image-crop-modal-container"
          footer={[
            <CustomButton
              key="انصراف"
              onClick={() => setImageCropperInfo({ isOpen: false, data: { src: "" } })}
            >
              انصراف
            </CustomButton>,
            <CustomButton key="تائید" type="primary" onClick={onConfirmCrop}>
              تائید
            </CustomButton>,
          ]}
        >
          {imageCropperInfo.data?.src && (
            <>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => {
                  setCrop(percentCrop);
                }}
                onComplete={(crop, percentageCrop) => {
                  setCompletedCrop?.(crop);
                  onComplete?.(crop, percentageCrop);
                }}
                aspect={aspectRatio}
                locked={locked}
                minWidth={minWidth}
                minHeight={minHeight}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                keepSelection={keepSelection}
                disabled={disabled}
                className={className}
                style={style}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                renderSelectionAddon={renderSelectionAddon}
                ruleOfThirds={ruleOfThirds}
                circularCrop={circularCrop}
              >
                <img
                  ref={imgRef}
                  alt="تصویر-درحال-ویرایش"
                  src={imageCropperInfo.data?.src}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <canvas ref={previewCanvasRef} style={{ display: "none" }} />
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default ImageCropperModal;
