export type IntRange<Min extends number, Max extends number> = number & {
  __int_range__: never;
} & {
  [K in keyof {
    [N in Min | Max]: true;
  }]: K extends number ? (number extends K ? never : K) : never;
};

export type ShouldUpdate<Values = any> =
  | boolean
  | ((
      prevValues: Values,
      nextValues: Values,
      info: {
        source?: string;
      }
    ) => boolean);
export type ScrollPos = {
  left?: number;
  top?: number;
};
export type ScrollAlign = "top" | "bottom" | "auto";

export type ScrollTarget =
  | {
      index: number;
      align?: ScrollAlign;
      offset?: number;
    }
  | {
      key: React.Key;
      align?: ScrollAlign;
      offset?: number;
    };
export type ScrollConfig = ScrollTarget | ScrollPos;

export type ScrollTo = (arg: number | ScrollConfig) => void;

export type BaseSelectRef = {
  focus: () => void;
  blur: () => void;
  scrollTo: ScrollTo;
};
export type EventValue<DateType> = DateType | null;
export type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;
export type GeneralSelectOutPut = {
  key: string;
  value: string;
  children: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};
