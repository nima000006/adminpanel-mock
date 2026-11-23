export const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined;
};

export const isObjectEmpty = (obj: object) => {
  return Object.keys(obj)?.length === 0;
};

export const isImageSizeValid = ({
  sizeLimit = 20,
  fileSize,
}: {
  sizeLimit?: number;
  fileSize: number;
}) => {
  return fileSize / 1024 / 1024 < sizeLimit;
};

export const isImageFormatValid = ({
  allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
  fileFormat,
}: {
  allowedTypes?: string[];
  fileFormat: string;
}) => {
  return allowedTypes.some((item) => item === fileFormat);
};
