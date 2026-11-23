export const testStatusConfig = {
  1: {
    color: "green",
  },
  2: {
    color: "yellow",
  },
  3: {
    color: "red",
  },
} as const;

// Allowed formats for test-result file upload (registration drawer + detail modal).
export const TEST_RESULT_VALID_FILE_FORMATS = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
] as const;
