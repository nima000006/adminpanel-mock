import { UploadFile } from "antd";

export type ApplicantsUploadedDocumentProps = {
  degreeCertificate: UploadFile<any>[];
  setDegreeCertificate: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  transcriptCertificate: UploadFile[];
  setTranscriptCertificate: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  passport: UploadFile[];
  setPassport: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  passportPhoto: UploadFile[];
  setPassportPhoto: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  resume: UploadFile[];
  setResume: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  statementOfPurpose: UploadFile[];
  setStatementOfPurpose: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  preUniversityCertificate: UploadFile[];
  setPreUniversityCertificate: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  residenceCertificate: UploadFile[];
  setResidenceCertificate: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};
