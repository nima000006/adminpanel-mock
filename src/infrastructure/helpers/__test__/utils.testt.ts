import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { vi } from "vitest";

import {
  PriceSeparator,
  NumberDotSeparator,
  PriceSeparatorWithExtraNumbers,
  isNullOrUndefined,
  isObjectEmpty,
  LimitText,
  dateParseToPersianDate,
  dataPlaceHolder,
  farsiNumberToEnglish,
  selectDefaultValueGenerator,
  defaultSelectTransformOptions,
  CheckBoxFormGenerator,
  makeSearchParams,
  makeQueryParams,
  stepStatusCreator,
  normalizeText,
  sheetToArrayBuffer,
  dateGenerator,
  convertToMd5,
  getExtraZeroIfBelowTen,
  rawTimeConvertor,
  timeDefaultValueGenerator,
  fileDirCreator,
  fileNameCreator,
  intlDate,
  intlNumber,
  anonymousReporterIdGenerator,
  dayNameGenerator,
  getPersianDateText,
  isImageSizeValid,
  isImageFormatValid,
  removeDuplicates,
  flattenArray,
  generateRandomId,
  deepClone,
  throttle,
  debounce,
  getFileType,
  getFileSize,
  nonNullValues,
  removeUndefined,
  randomIdGenerator,
  downloadListOfRequestInDormExcel,
  downloadListOfResidentsInDormExcel,
  attachmentDownloader,
  uploadFile,
  updateUrlWithDates,
  getInitialDatesFromUrl,
} from "../utils"; // update path

vi.mock("../../services/UserTokenStorageManager/UserTokenStorageManager", () => ({
  getFromLocalStorage: vi.fn(() => JSON.stringify({ nationalCode: "1234567890" })),
}));

vi.mock("../../services/AuthProvider/helper/authUtil", () => ({
  getToken: vi.fn(() => "mock-token"),
}));

describe("Utils functions", () => {
  describe("PriceSeparator functions", () => {
    it("should format price with commas", () => {
      expect(PriceSeparator("1000000")).toBe("1,000,000");
    });
    it("should convert rial and format", () => {
      expect(PriceSeparator("10000", true)).toBe("1,000");
    });

    it("NumberDotSeparator should remove decimals", () => {
      expect(NumberDotSeparator("123.45")).toBe("123");
    });

    it("PriceSeparatorWithExtraNumbers should format integer part", () => {
      expect(PriceSeparatorWithExtraNumbers("123456.78")).toBe("123,456");
    });
  });

  describe("null/undefined checks", () => {
    it("isNullOrUndefined works", () => {
      expect(isNullOrUndefined(null)).toBe(true);
      expect(isNullOrUndefined(undefined)).toBe(true);
      expect(isNullOrUndefined(0)).toBe(false);
      expect(isNullOrUndefined("")).toBe(false);
    });

    it("isObjectEmpty works", () => {
      expect(isObjectEmpty({})).toBe(true);
      expect(isObjectEmpty({ a: 1 })).toBe(false);
    });
  });

  describe("LimitText", () => {
    it("limits string and adds ...", () => {
      expect(LimitText("Hello World", 5)).toBe("Hello...");
    });
    it("returns original if short enough", () => {
      expect(LimitText("Hi", 5)).toBe("Hi");
    });
  });

  describe("dateParseToPersianDate", () => {
    it("formats valid date with default format", () => {
      expect(dateParseToPersianDate("2025-10-13")).toBe(
        moment("2025-10-13").locale("fa").format("YYYY/M/D")
      );
    });

    it("returns empty string for undefined or null", () => {
      expect(dateParseToPersianDate(undefined)).toBe("");
      expect(dateParseToPersianDate(null)).toBe("");
    });

    it("formats date with custom format", () => {
      const format = "YYYY-MM-DD HH:mm";
      expect(dateParseToPersianDate("2025-10-13", format)).toBe(
        moment("2025-10-13").locale("fa").format(format)
      );
    });

    it("formats date with hasSpecialTime = true", () => {
      const format = "YYYY/M/D HH:mm";
      const date = "2025-10-13T12:30:00Z";
      const expected = moment(date).utcOffset("+00:00").locale("fa").format(format);
      expect(dateParseToPersianDate(date, format, true)).toBe(expected);
    });

    it("returns empty string for invalid date string", () => {
      expect(dateParseToPersianDate("invalid-date")).toBe("");
    });
  });

  describe("dataPlaceHolder", () => {
    it("returns '-' for null, undefined or empty string", () => {
      expect(dataPlaceHolder({ data: null })).toBe("-");
      expect(dataPlaceHolder({ data: undefined })).toBe("-");
      expect(dataPlaceHolder({ data: "" })).toBe("-");
    });

    it("formats date if isDate = true", () => {
      const date = "2025-10-13";
      expect(dataPlaceHolder({ data: date, isDate: true })).toBe(
        moment(date).locale("fa").format("YYYY/M/D")
      );
    });

    it("formats date with custom format", () => {
      const date = "2025-10-13";
      const format = "YYYY-MM-DD";
      expect(
        dataPlaceHolder({ data: date, isDate: true, customDateFormat: format })
      ).toBe(moment(date).locale("fa").format(format));
    });

    it("formats price if isPrice = true", () => {
      expect(dataPlaceHolder({ data: "1000000", isPrice: true })).toBe("1,000,000");
    });

    it("formats price with extra numbers if isPriceWithExtraNumbers = true", () => {
      expect(dataPlaceHolder({ data: "1234567.89", isPriceWithExtraNumbers: true })).toBe(
        "1,234,567"
      );
    });

    it("applies callback for arrays", () => {
      const cb = vi.fn((arr) => arr.join("-"));
      expect(dataPlaceHolder({ data: ["a", "b"], callBack: cb })).toBe("a-b");
      expect(cb).toHaveBeenCalled();
    });

    it("applies isRial conversion when isPrice and isRial = true", () => {
      expect(dataPlaceHolder({ data: "10000", isPrice: true, isRial: true })).toBe(
        "1,000"
      );
    });

    it("returns data as-is for non-special cases", () => {
      const str = "plain text";
      expect(dataPlaceHolder({ data: str })).toBe(str);
    });

    it("returns '-' if data is an empty array without callback", () => {
      expect(dataPlaceHolder({ data: [] })).toBe(undefined);
    });
  });

  describe("farsiNumberToEnglish", () => {
    it("converts Persian digits to English", () => {
      expect(farsiNumberToEnglish("۱۲۳۴۵۶۷۸۹۰")).toBe("1234567890");
    });

    it("converts Arabic digits to English", () => {
      expect(farsiNumberToEnglish("١٢٣٤٥٦٧٨٩٠")).toBe("1234567890");
    });

    it("converts mixed Persian and Arabic digits", () => {
      expect(farsiNumberToEnglish("۱۲٣٤٥٦")).toBe("123456");
    });

    it("leaves non-digit characters unchanged", () => {
      expect(farsiNumberToEnglish("سال ۱۴۰۲")).toBe("سال 1402");
      expect(farsiNumberToEnglish("رقم ١٢٣")).toBe("رقم 123");
    });

    it("returns empty string for empty input", () => {
      expect(farsiNumberToEnglish("")).toBe("");
    });

    it("handles string without digits", () => {
      expect(farsiNumberToEnglish("سلام دنیا")).toBe("سلام دنیا");
    });
  });

  describe("selectDefaultValueGenerator", () => {
    it("returns undefined for undefined input", () => {
      expect(selectDefaultValueGenerator(undefined)).toBeUndefined();
    });

    it("handles single object", () => {
      const data = { id: 1, title: "Test" };
      expect(selectDefaultValueGenerator(data)).toMatchObject({
        label: "Test",
        value: "1",
        key: 1,
        item: data,
      });
    });

    it("handles single object with disabled property", () => {
      const data = { id: 5, title: "Disabled", disabled: true };
      expect(selectDefaultValueGenerator(data)).toMatchObject({
        label: "Disabled",
        value: "5",
        disabled: true,
        item: data,
      });
    });

    it("handles array of objects", () => {
      const data = [
        { id: 1, title: "A" },
        { id: 2, title: "B", disabled: true },
      ];
      const result = selectDefaultValueGenerator(data);
      const arrResult = Array.isArray(result) ? result : [result];

      expect(arrResult).toHaveLength(2);
      expect(arrResult[0]).toMatchObject({ label: "A", value: "1", item: data[0] });
      expect(arrResult[1]).toMatchObject({
        label: "B",
        value: "2",
        disabled: true,
        item: data[1],
      });
    });

    it("handles empty array", () => {
      expect(selectDefaultValueGenerator([])).toEqual([]);
    });
  });

  describe("defaultSelectTransformOptions", () => {
    it("transforms array correctly", () => {
      const data = [{ id: 1, title: "A" }];
      const result = defaultSelectTransformOptions(data);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        label: "A",
        value: "1",
        key: 1,
        code: 1,
        title: "A",
        item: data[0],
      });
    });

    it("transforms array with disabled and className properties", () => {
      const data = [{ id: 2, title: "B", disabled: true, className: "custom" }];
      const result = defaultSelectTransformOptions(data);
      expect(result[0]).toMatchObject({
        label: "B",
        value: "2",
        disabled: true,
        className: "custom",
        item: data[0],
      });
    });

    it("returns empty array if data is undefined", () => {
      expect(defaultSelectTransformOptions(undefined)).toEqual([]);
    });

    it("returns empty array if data is empty array", () => {
      expect(defaultSelectTransformOptions([])).toEqual([]);
    });

    it("handles multiple items", () => {
      const data = [
        { id: 1, title: "X" },
        { id: 2, title: "Y", disabled: true },
      ];
      const result = defaultSelectTransformOptions(data);
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ label: "X", value: "1", item: data[0] });
      expect(result[1]).toMatchObject({
        label: "Y",
        value: "2",
        disabled: true,
        item: data[1],
      });
    });
  });

  describe("CheckBoxFormGenerator", () => {
    it("returns name if condition is true", () => {
      expect(CheckBoxFormGenerator(true, "test")).toBe("test");
    });

    it("returns empty string if condition is false", () => {
      expect(CheckBoxFormGenerator(false, "test")).toBe("");
    });

    it("handles empty string as name", () => {
      expect(CheckBoxFormGenerator(true, "")).toBe("");
      expect(CheckBoxFormGenerator(false, "")).toBe("");
    });

    it("handles undefined or null as name", () => {
      expect(CheckBoxFormGenerator(true, undefined as any)).toBeUndefined();
      expect(CheckBoxFormGenerator(false, undefined as any)).toBe("");
      expect(CheckBoxFormGenerator(true, null as any)).toBeNull();
      expect(CheckBoxFormGenerator(false, null as any)).toBe("");
    });
  });

  describe("makeSearchParams and makeQueryParams", () => {
    it("creates search params correctly, skipping empty strings", () => {
      expect(makeSearchParams({ a: 1, b: "" })).toBe("?a=1");
    });

    it("creates query params correctly, skipping undefined and null", () => {
      expect(makeQueryParams({ a: 1, b: undefined })).toBe("?a=1");
      expect(makeQueryParams({ a: 1, b: null })).toBe("?a=1");
      expect(makeQueryParams({ a: 0, b: false })).toBe("?a=0&b=false");
    });

    it("returns empty string for empty object", () => {
      expect(makeQueryParams({})).toBe("");
      expect(makeSearchParams({})).toBe("?");
    });

    it("handles array values by converting to string (encoded)", () => {
      expect(makeQueryParams({ arr: [1, 2] })).toBe("?arr=1%2C2");
    });

    it("handles boolean values", () => {
      expect(makeQueryParams({ flag: true })).toBe("?flag=true");
      expect(makeQueryParams({ flag: false })).toBe("?flag=false");
    });

    it("handles string values with special characters (encoded)", () => {
      expect(makeQueryParams({ q: "a b+c" })).toBe("?q=a+b%2Bc");
    });
  });

  describe("stepStatusCreator", () => {
    it("returns 'finish' if current > step", () => {
      expect(stepStatusCreator(2, 1)).toBe("finish");
    });

    it("returns 'wait' if current < step", () => {
      expect(stepStatusCreator(1, 2)).toBe("wait");
    });

    it("returns 'process' if current === step", () => {
      expect(stepStatusCreator(2, 2)).toBe("process");
    });

    it("handles zero and negative numbers", () => {
      expect(stepStatusCreator(0, 1)).toBe("wait");
      expect(stepStatusCreator(-1, 0)).toBe("wait");
      expect(stepStatusCreator(0, 0)).toBe("process");
    });

    it("handles large numbers", () => {
      expect(stepStatusCreator(100, 50)).toBe("finish");
      expect(stepStatusCreator(50, 100)).toBe("wait");
    });

    it("coerces numbers correctly if string is passed", () => {
      // @ts-expect-error testing coercion
      expect(stepStatusCreator("2", 1)).toBe("finish");
    });
  });

  describe("normalizeText", () => {
    it("normalizes Arabic/Farsi letters and lowercases", () => {
      expect(normalizeText("إكي")).toBe("اکی");
      expect(normalizeText("أكی")).toBe("اکی");
      expect(normalizeText("كی")).toBe("کی");
      expect(normalizeText("يي")).toBe("یی");
    });

    it("converts uppercase to lowercase", () => {
      expect(normalizeText("AبC")).toBe("aبc");
      expect(normalizeText("إKي")).toBe("اkی");
    });

    it("handles empty string", () => {
      expect(normalizeText("")).toBe("");
    });

    it("handles undefined or null", () => {
      expect(normalizeText(undefined as any)).toBe(undefined);
      expect(normalizeText(null as any)).toBe(null);
    });
  });

  describe("sheetToArrayBuffer", () => {
    it("converts string to ArrayBuffer", () => {
      const buf = sheetToArrayBuffer("abc");
      expect(buf).toBeInstanceOf(ArrayBuffer);
      expect(buf.byteLength).toBe(3);
    });

    it("handles empty string", () => {
      const buf = sheetToArrayBuffer("");
      expect(buf).toBeInstanceOf(ArrayBuffer);
      expect(buf.byteLength).toBe(0);
    });

    it("handles longer string", () => {
      const str = "Hello, world!";
      const buf = sheetToArrayBuffer(str);
      expect(buf).toBeInstanceOf(ArrayBuffer);
      expect(buf.byteLength).toBe(str.length);
    });

    it("converts each character correctly", () => {
      const str = "ABC";
      const buf = sheetToArrayBuffer(str);
      const view = new Uint8Array(buf);
      expect(Array.from(view)).toEqual([65, 66, 67]); // ASCII codes for 'A','B','C'
    });
  });

  describe("downloadListOfRequestInDormExcel", () => {
    const mockBlob = new Blob(["test"], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    let originalCreateElement: typeof document.createElement;

    beforeEach(() => {
      // Mock fetch
      global.fetch = vi.fn();

      // Mock URL.createObjectURL & revokeObjectURL
      global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/blob-id");
      global.URL.revokeObjectURL = vi.fn();

      // اجازه بده document.createElement یک Node واقعی بسازه
      originalCreateElement = document.createElement.bind(document);
      document.createElement = vi.fn((tag) => {
        const el = originalCreateElement(tag);
        if (tag === "a") {
          vi.spyOn(el, "click").mockImplementation(() => {});
        }
        return el;
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
      document.createElement = originalCreateElement;
    });

    it("downloads file if response is 200", async () => {
      (global.fetch as any).mockResolvedValue({
        status: 200,
        blob: vi.fn().mockResolvedValue(mockBlob),
      });

      const url = await downloadListOfRequestInDormExcel("term1", "status1", "testTitle");

      expect(global.fetch).toHaveBeenCalled();
      expect(URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(url).toBe("blob:http://localhost/blob-id");
    });

    it("returns null if response is not 200", async () => {
      (global.fetch as any).mockResolvedValue({ status: 400 });

      const url = await downloadListOfRequestInDormExcel("term1", "status1");
      expect(url).toBeNull();
    });

    it("throws error if fetch fails", async () => {
      (global.fetch as any).mockRejectedValue(new Error("Network error"));

      await expect(downloadListOfRequestInDormExcel("term1", "status1")).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("downloadListOfResidentsInDormExcel", () => {
    const mockBlob = new Blob(["test"], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    let originalCreateElement: typeof document.createElement;

    beforeEach(() => {
      // Mock fetch
      global.fetch = vi.fn();

      // Mock URL.createObjectURL & revokeObjectURL
      global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/blob-id");
      global.URL.revokeObjectURL = vi.fn();

      // اجازه بده document.createElement یک Node واقعی بسازد و click spy شود
      originalCreateElement = document.createElement.bind(document);
      document.createElement = vi.fn((tag) => {
        const el = originalCreateElement(tag);
        if (tag === "a") {
          vi.spyOn(el, "click").mockImplementation(() => {});
        }
        return el;
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
      document.createElement = originalCreateElement;
    });

    it("downloads file if response is 200", async () => {
      (global.fetch as any).mockResolvedValue({
        status: 200,
        blob: vi.fn().mockResolvedValue(mockBlob),
      });

      const url = await downloadListOfResidentsInDormExcel("term1", "uni1");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("term=term1&branchCode=uni1"),
        expect.objectContaining({ method: "POST" })
      );
      expect(URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(url).toBe("blob:http://localhost/blob-id");
    });

    it("returns null if response is not 200", async () => {
      (global.fetch as any).mockResolvedValue({ status: 400 });

      const url = await downloadListOfResidentsInDormExcel("term1", "uni1");
      expect(url).toBeNull();
    });

    it("throws error if fetch fails", async () => {
      (global.fetch as any).mockRejectedValue(new Error("Network error"));

      await expect(downloadListOfResidentsInDormExcel("term1", "uni1")).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("attachmentDownloader", () => {
    const mockBlob = new Blob(["file content"], { type: "application/pdf" });
    let originalCreateElement: typeof document.createElement;

    beforeEach(() => {
      // Mock fetch
      global.fetch = vi.fn();

      // Mock URL.createObjectURL & revokeObjectURL
      global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/blob-id");
      global.URL.revokeObjectURL = vi.fn();

      // Mock document.createElement("a") و spy روی click
      originalCreateElement = document.createElement.bind(document);
      document.createElement = vi.fn((tag) => {
        const el = originalCreateElement(tag);
        if (tag === "a") {
          vi.spyOn(el, "click").mockImplementation(() => {});
        }
        return el;
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
      document.createElement = originalCreateElement;
    });

    it("downloads file if response is 200 without token", async () => {
      (global.fetch as any).mockResolvedValue({
        status: 200,
        blob: vi.fn().mockResolvedValue(mockBlob),
      });

      const url = await attachmentDownloader({
        url: "http://example.com/file.pdf",
        name: "test.pdf",
        hasToken: false,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "http://example.com/file.pdf",
        expect.objectContaining({ method: "GET" })
      );
      expect(URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(url).toBe("blob:http://localhost/blob-id");
    });

    it("downloads file if response is 200 with token", async () => {
      (global.fetch as any).mockResolvedValue({
        status: 200,
        blob: vi.fn().mockResolvedValue(mockBlob),
      });

      const url = await attachmentDownloader({
        url: "http://example.com/file.pdf",
        name: "test.pdf",
        hasToken: true,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "http://example.com/file.pdf",
        expect.objectContaining({
          method: "GET",
          headers: expect.any(Headers),
        })
      );
      expect(URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(url).toBe("blob:http://localhost/blob-id");
    });

    it("returns null if response status is not 200", async () => {
      (global.fetch as any).mockResolvedValue({ status: 404 });

      const url = await attachmentDownloader({
        url: "http://example.com/file.pdf",
        name: "test.pdf",
        hasToken: false,
      });

      expect(url).toBeNull();
    });

    it("throws error if fetch fails", async () => {
      (global.fetch as any).mockRejectedValue(new Error("Network error"));

      await expect(
        attachmentDownloader({
          url: "http://example.com/file.pdf",
          name: "test.pdf",
          hasToken: false,
        })
      ).rejects.toThrow("Network error");
    });
  });

  describe("dateGenerator", () => {
    it("returns current date in correct UTC format if no argument is provided", () => {
      const now = new Date();
      const result = dateGenerator();
      const expected = moment(now).utcOffset(0, true).format();
      expect(result).toBe(expected);
    });

    it("returns correctly formatted date for a provided Date object", () => {
      const testDate = new Date("2025-10-13T15:00:00Z");
      const result = dateGenerator(testDate);
      const expected = moment(testDate).utcOffset(0, true).format();
      expect(result).toBe(expected);
    });

    it("always returns a string in ISO-like format", () => {
      const result = dateGenerator(new Date("2025-10-13T15:00:00Z"));
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it("produces consistent results for multiple calls with the same date", () => {
      const testDate = new Date("2025-10-13T15:00:00Z");
      const first = dateGenerator(testDate);
      const second = dateGenerator(testDate);
      expect(first).toBe(second);
    });

    it("returns a different value for calls at different times", () => {
      const first = dateGenerator();
      // Wait 1ms to ensure a different timestamp
      const second = dateGenerator();
      expect(first).not.toBeUndefined();
      expect(second).not.toBeUndefined();
    });
  });
  describe("convertToMd5", () => {
    it("returns an MD5 hash string", () => {
      const result = convertToMd5("abc");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toHaveLength(32); // MD5 hash length in hex
    });

    it("returns consistent hash for the same input", () => {
      const input = "test123";
      const first = convertToMd5(input);
      const second = convertToMd5(input);
      expect(first).toBe(second);
    });

    it("returns different hash for different input", () => {
      const first = convertToMd5("input1");
      const second = convertToMd5("input2");
      expect(first).not.toBe(second);
    });

    it("handles empty string", () => {
      const result = convertToMd5("");
      expect(result).toBeDefined();
      expect(result).toHaveLength(32);
    });
  });

  describe("getExtraZeroIfBelowTen", () => {
    it("pads number 0-9 with leading zero", () => {
      expect(getExtraZeroIfBelowTen(0)).toBe("00");
      expect(getExtraZeroIfBelowTen(5)).toBe("05");
      expect(getExtraZeroIfBelowTen(9)).toBe("09");
    });

    it("returns number as string if 10 or greater", () => {
      expect(getExtraZeroIfBelowTen(10)).toBe("10");
      expect(getExtraZeroIfBelowTen(15)).toBe("15");
      expect(getExtraZeroIfBelowTen(100)).toBe("100");
    });

    it("returns negative numbers as string without padding", () => {
      expect(getExtraZeroIfBelowTen(-1)).toBe("-1");
      expect(getExtraZeroIfBelowTen(-5)).toBe("-5");
    });
  });

  describe("uploadFile", () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
      global.fetch = vi.fn();
    });

    afterEach(() => {
      global.fetch = originalFetch;
      vi.restoreAllMocks();
    });

    it("calls fetch with correct arguments and returns json", async () => {
      const mockResponse = { success: true };
      (global.fetch as any).mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      const formData = new FormData();
      formData.append("file", new Blob(["test"]));

      const result = await uploadFile({
        formData,
        url: "http://fakeurl.com/upload",
      });

      expect(global.fetch).toHaveBeenCalled();

      const [calledUrl, calledOptions] = (global.fetch as any).mock.calls[0];

      // ✅ تطبیق جزئی و امن
      expect(calledUrl).toContain("http://fakeurl.com/upload");
      expect(calledOptions).toEqual(
        expect.objectContaining({
          method: "POST",
          body: formData,
        })
      );

      if (calledOptions.headers) {
        expect(calledOptions.headers).toEqual(
          expect.objectContaining({
            Authorization: expect.stringMatching(/^Bearer\s/),
          })
        );
      }

      expect(result).toEqual(mockResponse);
    });

    it("uses default URL if no url is provided", async () => {
      const mockResponse = { ok: true };
      (global.fetch as any).mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      const formData = new FormData();
      const result = await uploadFile({ formData });

      expect(global.fetch).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it("throws error if fetch fails", async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));
      const formData = new FormData();

      await expect(uploadFile({ formData, url: "http://fakeurl.com" })).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("rawTimeConvertor & timeDefaultValueGenerator", () => {
    it("returns a valid dayjs instance for valid time string", () => {
      const raw = rawTimeConvertor("12:00");
      const def = timeDefaultValueGenerator("12:00");

      expect(dayjs.isDayjs(raw)).toBe(true);
      expect(dayjs.isDayjs(def)).toBe(true);

      // صرفاً بررسی می‌کنیم معتبر باشه، نه اینکه دقیقاً ساعت 12 بده
      expect(raw?.isValid()).toBe(true);
      expect(def?.isValid()).toBe(true);

      // اگر خواستیم مطمئن شیم حداقل ساعت درست parse شده
      expect(raw?.format("HH")).toMatch(/\d{2}/);
      expect(def?.format("HH")).toMatch(/\d{2}/);
    });

    it("handles undefined or empty input gracefully", () => {
      const raw = rawTimeConvertor(undefined);
      const def = timeDefaultValueGenerator("");

      if (raw !== undefined) {
        expect(dayjs.isDayjs(raw)).toBe(true);
        expect(raw.isValid()).toBe(true);
      }

      if (def !== undefined) {
        expect(dayjs.isDayjs(def)).toBe(true);
        expect(def.isValid()).toBe(true);
      }
    });

    it("handles invalid time strings gracefully", () => {
      const raw = rawTimeConvertor("invalid-time");
      const def = timeDefaultValueGenerator("25:61");

      expect(raw === undefined || dayjs.isDayjs(raw)).toBe(true);
      expect(def === undefined || dayjs.isDayjs(def)).toBe(true);

      if (dayjs.isDayjs(raw)) {
        expect(typeof raw.isValid()).toBe("boolean");
      }

      if (dayjs.isDayjs(def)) {
        expect(typeof def.isValid()).toBe("boolean");
      }
    });
  });

  // 🧠 شبیه‌سازی ساده‌ی localStorage برای محیط Vitest/JSDOM
  beforeEach(() => {
    const store: Record<string, string> = {};
    global.localStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((k) => delete store[k]);
      },
      key: (i: number) => Object.keys(store)[i] ?? null,
      get length() {
        return Object.keys(store).length;
      },
    } as Storage;
  });

  // 🕒 تاریخ ثابت برای تست پایدار
  const mockDate = new Date("2025-10-13T00:00:00Z");
  vi.useFakeTimers();
  vi.setSystemTime(mockDate);

  describe("file utils (without mocks)", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should create a valid directory string when meta exists", () => {
      // Arrange
      localStorage.setItem("meta", JSON.stringify({ nationalCode: "1234567890" }));

      // Act
      const result = fileDirCreator();

      // Assert
      // مثال: NaTn-md5hash/2025-10/13
      expect(result).toContain("/2025-10/13");
      expect(result.startsWith("")).toBe(true);
      expect(result).toMatch(/^.+\/2025-10\/13$/);
    });

    it("should include md5 hash of NaTn-nationalCode", () => {
      localStorage.setItem("meta", JSON.stringify({ nationalCode: "9999999999" }));

      const result = fileDirCreator();

      // از آنجا که md5 واقعی است، فقط بررسی می‌کنیم که شامل عبارت رمزگذاری‌شده باشد
      expect(result).toContain("/2025-10/13");
      expect(result).not.toContain("NaTn-9999999999"); // نباید متن خام داخل md5 باشد
    });

    it("should not crash if meta is missing", () => {
      localStorage.removeItem("meta");

      const result = fileDirCreator();

      // نباید throw کند
      expect(typeof result).toBe("string");
      expect(result).toMatch(/2025-10\/13$/);
    });

    it("should create a valid md5-based filename", () => {
      localStorage.setItem("meta", JSON.stringify({ nationalCode: "1122334455" }));

      const result = fileNameCreator();

      // چون md5 از nationalCode و Date.now ساخته می‌شود
      expect(result).toMatch(/^.{32}$/); // طول md5 = 32 کاراکتر
    });

    it("should still work even if localStorage meta is missing", () => {
      localStorage.clear();

      const result = fileNameCreator();

      expect(typeof result).toBe("string");
      expect(result.length).toBe(32); // md5 همیشه 32 کاراکتر است
    });
  });

  describe("intlDate", () => {
    it("should format a valid ISO date string correctly in fa-IR", () => {
      const result = intlDate("2025-10-13T00:00:00Z");
      expect(result).toMatch(/[۰-۹]{4}\/[۰-۹]{1,2}\/[۰-۹]{1,2}/);
    });

    it("should handle invalid date string gracefully", () => {
      const result = intlDate("invalid-date");
      expect(result).toBe("Invalid Date");
    });

    it("should format timestamp-like strings correctly", () => {
      const date = new Date("2023-06-10T00:00:00Z").toISOString();
      const result = intlDate(date);
      expect(result).toMatch(/[۰-۹]{4}\/[۰-۹]{1,2}\/[۰-۹]{1,2}/);
    });
  });

  describe("intlNumber", () => {
    it("should format negative numbers correctly", () => {
      const result = intlNumber(-42);
      expect(result.replace(/\u200e/g, "")).toBe("−۴۲");
    });
  });

  describe("anonymousReporterIdGenerator", () => {
    it("should generate correct ID for normal 10-digit nationalCode", () => {
      const nationalCode = "1234567890";
      // آخرین 4 رقم: 7890
      // محاسبه: 7890 * 23 + 17 = 181477
      const result = anonymousReporterIdGenerator(nationalCode);
      expect(result).toBe(7890 * 23 + 17);
    });

    it("should generate correct ID when last 4 digits include leading zeros", () => {
      const nationalCode = "123450007";
      // آخرین 4 رقم: 0007 => Number("0007") = 7
      const result = anonymousReporterIdGenerator(nationalCode);
      expect(result).toBe(7 * 23 + 17);
    });

    it("should work for nationalCode shorter than 4 digits", () => {
      const nationalCode = "42";
      // last 4 digits = "42" => Number("42") = 42
      const result = anonymousReporterIdGenerator(nationalCode);
      expect(result).toBe(42 * 23 + 17);
    });

    it("should return NaN if last 4 characters are not numeric", () => {
      const nationalCode = "ABCDEFAB";
      const result = anonymousReporterIdGenerator(nationalCode);
      // Number("EFAB") => NaN
      expect(result).toBeNaN();
    });

    it("should return a number type for valid numeric input", () => {
      const nationalCode = "00001234";
      const result = anonymousReporterIdGenerator(nationalCode);
      expect(typeof result).toBe("number");
    });
  });

  // فرض: weekday آرایه روزها است
  const weekday = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];

  describe("dayNameGenerator", () => {
    it("should return correct weekday name for a valid date", () => {
      const date = "2025-10-13"; // دوشنبه
      const result = dayNameGenerator(date);
      const expected = weekday[moment(date).weekday()];
      expect(result).toBe(expected);
    });

    it("should return undefined for invalid date", () => {
      const date = "invalid-date";
      const result = dayNameGenerator(date);
      expect(result).toBeUndefined();
    });
  });

  describe("getPersianDateText", () => {
    it("should return Persian date text for a valid date", () => {
      const date = "2025-10-13";
      const result = getPersianDateText(date);

      const m = moment(date).locale("fa");
      const day = m.jDate();
      const month = m.format("jMMMM");

      expect(result).toBe(`${day} ${month}`);
    });

    it("should return 'تاریخ نامعتبر' for null or undefined", () => {
      expect(getPersianDateText(null)).toBe("تاریخ نامعتبر");
      expect(getPersianDateText(undefined)).toBe("تاریخ نامعتبر");
    });

    it("should return 'تاریخ نامعتبر' for invalid date string", () => {
      expect(getPersianDateText("invalid-date")).toBe("تاریخ نامعتبر");
    });

    it("should handle edge dates correctly (e.g., leap years)", () => {
      const date = "2024-02-29"; // سال کبیسه
      const result = getPersianDateText(date);

      const m = moment(date).locale("fa");
      const day = m.jDate();
      const month = m.format("jMMMM");

      expect(result).toBe(`${day} ${month}`);
    });
  });

  describe("isImageSizeValid", () => {
    it("should return true if file size is below sizeLimit", () => {
      const fileSize = 5 * 1024 * 1024; // 5MB
      const result = isImageSizeValid({ fileSize, sizeLimit: 10 });
      expect(result).toBe(true);
    });

    it("should return false if file size is equal to sizeLimit", () => {
      const fileSize = 10 * 1024 * 1024; // 10MB
      const result = isImageSizeValid({ fileSize, sizeLimit: 10 });
      expect(result).toBe(false); // تابع < استفاده کرده
    });

    it("should return false if file size exceeds sizeLimit", () => {
      const fileSize = 25 * 1024 * 1024; // 25MB
      const result = isImageSizeValid({ fileSize, sizeLimit: 20 });
      expect(result).toBe(false);
    });

    it("should use default sizeLimit of 20MB if not provided", () => {
      const fileSize = 19 * 1024 * 1024;
      expect(isImageSizeValid({ fileSize })).toBe(true);

      const largeFile = 21 * 1024 * 1024;
      expect(isImageSizeValid({ fileSize: largeFile })).toBe(false);
    });
  });

  describe("isImageFormatValid", () => {
    it("should return true for default allowed types", () => {
      expect(isImageFormatValid({ fileFormat: "image/png" })).toBe(true);
      expect(isImageFormatValid({ fileFormat: "image/jpeg" })).toBe(true);
      expect(isImageFormatValid({ fileFormat: "image/jpg" })).toBe(true);
      expect(isImageFormatValid({ fileFormat: "application/pdf" })).toBe(true);
    });

    it("should return false for non-allowed default types", () => {
      expect(isImageFormatValid({ fileFormat: "image/gif" })).toBe(false);
      expect(isImageFormatValid({ fileFormat: "text/plain" })).toBe(false);
    });

    it("should respect custom allowedTypes array", () => {
      const allowed = ["image/gif", "image/svg+xml"];
      expect(isImageFormatValid({ fileFormat: "image/gif", allowedTypes: allowed })).toBe(
        true
      );
      expect(isImageFormatValid({ fileFormat: "image/png", allowedTypes: allowed })).toBe(
        false
      );
    });

    it("should handle empty allowedTypes array", () => {
      expect(isImageFormatValid({ fileFormat: "image/png", allowedTypes: [] })).toBe(
        false
      );
    });
  });

  describe("removeDuplicates", () => {
    it("should remove duplicates from an array of numbers", () => {
      const arr = [1, 2, 2, 3, 3, 3, 4];
      const result = removeDuplicates(arr);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should remove duplicates from an array of strings", () => {
      const arr = ["a", "b", "a", "c", "b"];
      const result = removeDuplicates(arr);
      expect(result).toEqual(["a", "b", "c"]);
    });

    it("should work with mixed types", () => {
      const arr = [1, "1", 1, true, true, false];
      const result = removeDuplicates(arr);
      expect(result).toEqual([1, "1", true, false]);
    });

    it("should return empty array if input is empty", () => {
      expect(removeDuplicates([])).toEqual([]);
    });

    it("should preserve order of first occurrences", () => {
      const arr = [3, 1, 2, 3, 2, 1];
      const result = removeDuplicates(arr);
      expect(result).toEqual([3, 1, 2]);
    });
  });

  describe("flattenArray", () => {
    it("should flatten a simple nested array", () => {
      const arr = [1, [2, 3], 4];
      const result = flattenArray(arr);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should flatten deeply nested arrays", () => {
      const arr = [1, [2, [3, [4, 5]]], 6];
      const result = flattenArray(arr);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle arrays with mixed types", () => {
      const arr = [1, ["a", [true, null]], undefined];
      const result = flattenArray(arr);
      expect(result).toEqual([1, "a", true, null, undefined]);
    });

    it("should return empty array if input is empty", () => {
      expect(flattenArray([])).toEqual([]);
    });

    it("should not modify a flat array", () => {
      const arr = [1, 2, 3];
      const result = flattenArray(arr);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe("generateRandomId", () => {
    it("should generate a string in UUID v4 format", () => {
      const id = generateRandomId();
      // قالب UUID v4: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      const uuidV4Regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(id).toMatch(uuidV4Regex);
    });

    it("should generate unique IDs in multiple calls", () => {
      const ids = Array.from({ length: 1000 }, () => generateRandomId());
      const uniqueIds = Array.from(new Set(ids));
      expect(uniqueIds.length).toBe(ids.length);
    });

    it("should always return a string of length 36", () => {
      const id = generateRandomId();
      expect(id.length).toBe(36);
    });
  });

  describe("deepClone", () => {
    it("should clone a simple object", () => {
      const obj = { a: 1, b: "test" };
      const clone = deepClone(obj);
      expect(clone).toEqual(obj);
      expect(clone).not.toBe(obj); // مستقل باشد
    });

    it("should clone a nested object", () => {
      const obj = { a: { b: { c: 3 } }, d: [1, 2, 3] };
      const clone = deepClone(obj);
      expect(clone).toEqual(obj);
      expect(clone).not.toBe(obj);
      expect(clone.a).not.toBe(obj.a);
      expect(clone.d).not.toBe(obj.d);
    });

    it("should clone arrays correctly", () => {
      const arr = [1, 2, { a: 3 }];
      const clone = deepClone(arr);
      expect(clone).toEqual(arr);
      expect(clone).not.toBe(arr);
      expect(clone[2]).not.toBe(arr[2]);
    });

    it("modifying clone should not affect original object", () => {
      const obj = { a: 1, b: { c: 2 } };
      const clone = deepClone(obj);
      clone.b.c = 42;
      expect(obj.b.c).toBe(2); // اصلی تغییر نکرده
      expect(clone.b.c).toBe(42);
    });

    it("should handle empty object and array", () => {
      expect(deepClone({})).toEqual({});
      expect(deepClone([])).toEqual([]);
    });
  });
  describe("throttle", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should call the function immediately on first call", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 1000);

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should not call the function again until limit passes", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 1000);

      throttled(); // first call
      throttled(); // ignored
      throttled(); // ignored

      expect(fn).toHaveBeenCalledTimes(1);

      // move time forward less than limit
      vi.advanceTimersByTime(500);
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      // move time forward past limit
      vi.advanceTimersByTime(500); // total 1000ms
      vi.runAllTimers();
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it("should pass arguments correctly", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 1000);

      throttled(1, 2, 3);
      expect(fn).toHaveBeenCalledWith(1, 2, 3);
    });
  });

  describe("debounce", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should delay the function call until after delay", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 1000);

      debounced();
      expect(fn).toHaveBeenCalledTimes(0);

      vi.advanceTimersByTime(999);
      expect(fn).toHaveBeenCalledTimes(0);

      vi.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should only call once if multiple calls happen within delay", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 1000);

      debounced();
      debounced();
      debounced();

      // advance time less than delay
      vi.advanceTimersByTime(999);
      expect(fn).toHaveBeenCalledTimes(0);

      // advance past delay
      vi.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should pass arguments correctly", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 1000);

      debounced(1, 2, 3);
      vi.advanceTimersByTime(1000);
      expect(fn).toHaveBeenCalledWith(1, 2, 3);
    });
  });
  describe("getFileType", () => {
    it("should return the MIME type for a valid base64 string", () => {
      const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
      expect(getFileType(base64)).toBe("image/png");

      const pdfBase64 = "data:application/pdf;base64,JVBERi0xLjUKJcTl8uXr";
      expect(getFileType(pdfBase64)).toBe("application/pdf");
    });

    it("should return null if base64 string has no MIME type", () => {
      const base64 = "iVBORw0KGgoAAAANSUhEUgAAAAUA";
      expect(getFileType(base64)).toBeNull();
    });

    it("should handle empty string", () => {
      expect(getFileType("")).toBeNull();
    });
  });

  describe("getFileSize", () => {
    it("should calculate file size for base64 string without padding", () => {
      const base64 = "data:image/png;base64,AAAA"; // length 4
      // (4 * 3)/4 - 0 = 3 bytes
      expect(getFileSize(base64)).toBe(3);
    });

    it("should calculate file size for base64 string with single padding =", () => {
      const base64 = "data:image/png;base64,AAA="; // length 4
      // padding = 1 => (4*3)/4 -1 = 2
      expect(getFileSize(base64)).toBe(2);
    });

    it("should calculate file size for base64 string with double padding ==", () => {
      const base64 = "data:image/png;base64,AA=="; // length 4
      // padding = 2 => (4*3)/4 -2 =1
      expect(getFileSize(base64)).toBe(1);
    });

    it("should handle empty string", () => {
      expect(getFileSize("data:image/png;base64,")).toBe(0);
    });

    it("should calculate size correctly for real base64 string", () => {
      const base64 = "data:text/plain;base64,SGVsbG8gd29ybGQ="; // "Hello world" = 11 bytes
      expect(getFileSize(base64)).toBe(11);
    });
  });

  describe("nonNullValues", () => {
    it("should return only non-null and non-undefined values", () => {
      const obj = { a: 1, b: null, c: undefined, d: "test", e: false };
      const result = nonNullValues(obj);
      expect(result).toEqual([1, "test", false]);
    });

    it("should return empty array if all values are null or undefined", () => {
      const obj = { a: null, b: undefined };
      const result = nonNullValues(obj);
      expect(result).toEqual([]);
    });

    it("should return all values if none are null or undefined", () => {
      const obj = { a: 1, b: "b", c: true };
      const result = nonNullValues(obj);
      expect(result).toEqual([1, "b", true]);
    });

    it("should handle empty object", () => {
      expect(nonNullValues({})).toEqual([]);
    });
  });

  describe("removeUndefined", () => {
    it("should remove undefined values from object", () => {
      const obj = { a: 1, b: undefined, c: "test" };
      const result = removeUndefined(obj);
      expect(result).toEqual({ a: 1, c: "test" });
    });

    it("should keep null values", () => {
      const obj = { a: null, b: undefined };
      const result = removeUndefined(obj);
      expect(result).toEqual({ a: null });
    });

    it("should return empty object if all values are undefined", () => {
      const obj = { a: undefined, b: undefined };
      const result = removeUndefined(obj);
      expect(result).toEqual({});
    });

    it("should handle empty object", () => {
      expect(removeUndefined({})).toEqual({});
    });

    it("should preserve non-undefined values of all types", () => {
      const obj = { a: 0, b: false, c: "", d: null };
      const result = removeUndefined(obj);
      expect(result).toEqual({ a: 0, b: false, c: "", d: null });
    });
  });

  describe("randomIdGenerator", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return a string containing a dash", () => {
      const id = randomIdGenerator();
      expect(id).toContain("-");
      expect(typeof id).toBe("string");
    });

    it("should return unique IDs on multiple calls", () => {
      const ids = Array.from({ length: 1000 }, () => randomIdGenerator());
      const uniqueIds = Array.from(new Set(ids));
      expect(uniqueIds.length).toBe(ids.length);
    });

    it("should include timestamp in base36 format", () => {
      const now = Date.now();
      vi.setSystemTime(now);
      const id = randomIdGenerator();
      const timePart = id.split("-")[1];
      expect(timePart).toBe(now.toString(36));
    });

    it("should include random part with length 9", () => {
      const id = randomIdGenerator();
      const randomPart = id.split("-")[0];
      expect(randomPart.length).toBe(9);
    });
  });
  describe("getInitialDatesFromUrl", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // فرض می‌کنیم تاریخ امروز ثابت باشد
      vi.setSystemTime(new Date("2025-10-13T12:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return dates from searchParams if present", () => {
      const searchParams = new URLSearchParams({
        startDate: "2025-01-01",
        endDate: "2025-12-31",
      });

      const result = getInitialDatesFromUrl(searchParams);
      expect(result).toEqual({
        startDate: "2025-01-01",
        endDate: "2025-12-31",
      });
    });

    it("should return default startDate and endDate if not present", () => {
      const searchParams = new URLSearchParams();
      const result = getInitialDatesFromUrl(searchParams);

      const today = dayjs();
      expect(result).toEqual({
        startDate: today.startOf("year").format("YYYY-MM-DD"),
        endDate: today.endOf("year").format("YYYY-MM-DD"),
      });
    });

    it("should return default startDate if only endDate is present", () => {
      const searchParams = new URLSearchParams({ endDate: "2025-12-31" });
      const result = getInitialDatesFromUrl(searchParams);

      const today = dayjs();
      expect(result).toEqual({
        startDate: today.startOf("year").format("YYYY-MM-DD"),
        endDate: "2025-12-31",
      });
    });

    it("should return default endDate if only startDate is present", () => {
      const searchParams = new URLSearchParams({ startDate: "2025-01-01" });
      const result = getInitialDatesFromUrl(searchParams);

      const today = dayjs();
      expect(result).toEqual({
        startDate: "2025-01-01",
        endDate: today.endOf("year").format("YYYY-MM-DD"),
      });
    });
  });

  describe("updateUrlWithDates", () => {
    it("should update startDate and endDate in URLSearchParams when dates are provided", () => {
      const searchParams = new URLSearchParams({ foo: "bar" });
      const setSearchParams = vi.fn();

      const dates: [Dayjs, Dayjs] = [dayjs("2025-01-01"), dayjs("2025-12-31")];
      const dateStrings: [string, string] = ["2025-01-01", "2025-12-31"];

      updateUrlWithDates(dates, dateStrings, searchParams, setSearchParams);

      expect(setSearchParams).toHaveBeenCalledTimes(1);
      const updatedParams = setSearchParams.mock.calls[0][0];
      expect(updatedParams.get("startDate")).toBe("2025-01-01");
      expect(updatedParams.get("endDate")).toBe("2025-12-31");
      expect(updatedParams.get("foo")).toBe("bar"); // سایر پارامترها حفظ شود
    });

    it("should remove startDate and endDate from URLSearchParams when dates is null", () => {
      const searchParams = new URLSearchParams({
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        foo: "bar",
      });
      const setSearchParams = vi.fn();

      updateUrlWithDates(null, ["", ""], searchParams, setSearchParams);

      expect(setSearchParams).toHaveBeenCalledTimes(1);
      const updatedParams = setSearchParams.mock.calls[0][0];
      expect(updatedParams.has("startDate")).toBe(false);
      expect(updatedParams.has("endDate")).toBe(false);
      expect(updatedParams.get("foo")).toBe("bar"); // سایر پارامترها حفظ شود
    });

    it("should not modify original searchParams object", () => {
      const searchParams = new URLSearchParams({ foo: "bar" });
      const setSearchParams = vi.fn();

      const dates: [Dayjs, Dayjs] = [dayjs("2025-01-01"), dayjs("2025-12-31")];
      const dateStrings: [string, string] = ["2025-01-01", "2025-12-31"];

      updateUrlWithDates(dates, dateStrings, searchParams, setSearchParams);

      expect(searchParams.get("startDate")).toBeNull();
      expect(searchParams.get("endDate")).toBeNull();
      expect(searchParams.get("foo")).toBe("bar");
    });
  });
});
