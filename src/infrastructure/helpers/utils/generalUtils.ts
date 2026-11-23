import CryptoJS from "crypto-js";

import { dataPlaceHolder } from "@infra/helpers/utils";

export const removeDuplicates = <T>(array: T[]): T[] => [...new Set(array)];

export const flattenArray = (arr: any[]): any[] =>
  arr.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)),
    []
  );

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return (...args: any[]) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan)
      );
    }
  };
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const nonNullValues = (urlObject: object) => {
  return Object.values(urlObject).filter(
    (value) => value !== null && value !== undefined
  );
};

export const removeUndefined = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
};

export const stepStatusCreator = (current: number, step: number) => {
  return current === step ? "process" : current < step ? "wait" : "finish";
};

export const isLocalHost = import.meta.env.VITE_URL_NAME === "LOCAL";

export const convertToMd5 = (input: string) => {
  return CryptoJS.MD5(input).toString();
};

export const generateRandomId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const randomIdGenerator = () => {
  // Create a large random part by combining random numbers and current timestamp
  const randomPart = Math.random().toString(36).substr(2, 9); // Random string of 9 characters
  const timePart = Date.now().toString(36); // Base-36 encoded timestamp

  return `${randomPart}-${timePart}`;
};

//reporter encode: 4 last characters of reporter national code * 23 +17
export const anonymousReporterIdGenerator = (nationalCode: string) =>
  Number(nationalCode.slice(-4)) * 23 + 17;

export const nameFamilyConcat = (name: string, family: string) => {
  return dataPlaceHolder({
    data: `${dataPlaceHolder({ data: name })}  ${dataPlaceHolder({ data: family })}`,
  });
};
