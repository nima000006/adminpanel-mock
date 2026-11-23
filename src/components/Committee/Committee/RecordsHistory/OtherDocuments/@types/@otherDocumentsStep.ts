export type OtherDocumentsStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export type attachedFileType = {
  file: { uid: string; name: string; value: string | Blob };
  fileList: [
    {
      uid: string;
      lastModified: number;
      lastModifiedDate: string;
      name: string;
      size: number;
      type: string;
      percent: number;
      originFileObj: {
        uid: string;
      };
    },
  ];
};

export type NewDocumentType = {
  documentTitle: string;
  attachedFile: attachedFileType;
  attachedDate: string;
};

export type DeleteNewDocumentModalTypes = {
  isOpen: boolean;
  id: number | string;
  title: string;
};
