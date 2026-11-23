// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT UTILITIES
// Extract props, refs, and element types from components and HTML elements
// ─────────────────────────────────────────────────────────────────────────────

/** Extract props from any React component. Usage: type Props = ComponentProps<typeof MyComponent> */
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/** Extract the ref type from a React component */
export type ComponentRef<T> =
  T extends React.ComponentType<React.RefAttributes<infer R>> ? R : never;

/** Make specific props of a component required */
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specific props of a component optional */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Omit HTML attributes from a component's prop type, keeping only custom props */
export type WithoutHTMLProps<T> = Omit<T, keyof React.HTMLAttributes<HTMLElement>>;

/** Extend an HTML element's props with custom ones. Usage: type Props = ExtendElement<'button', { variant: 'primary' }> */
export type ExtendElement<
  E extends keyof React.JSX.IntrinsicElements,
  P extends object = object,
> = React.JSX.IntrinsicElements[E] & P;

/** Extract the element type from a React.ElementRef. Usage: type El = ElementType<'div'> */
export type ElementType<E extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[E] extends React.DetailedHTMLProps<
    React.HTMLAttributes<infer T>,
    infer T
  >
    ? T
    : never;

/** Props for a component that optionally renders as a different element (Radix-style) */
export type AsChildProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

// ─────────────────────────────────────────────────────────────────────────────
// EVENT HANDLERS
// Typed event handlers for common form and DOM interactions
// ─────────────────────────────────────────────────────────────────────────────

/** onChange handler for <input> elements */
export type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

/** onChange handler for <textarea> elements */
export type TextareaChangeHandler = React.ChangeEventHandler<HTMLTextAreaElement>;

/** onChange handler for <select> elements */
export type SelectChangeHandler = React.ChangeEventHandler<HTMLSelectElement>;

/** onSubmit handler for <form> elements */
export type SubmitHandler = React.FormEventHandler<HTMLFormElement>;

/** onClick handler for <button> elements */
export type ButtonClickHandler = React.MouseEventHandler<HTMLButtonElement>;

/** onClick handler for <div> elements */
export type DivClickHandler = React.MouseEventHandler<HTMLDivElement>;

/** onKeyDown handler for any element */
export type KeyDownHandler<E extends HTMLElement = HTMLElement> =
  React.KeyboardEventHandler<E>;

/** onFocus handler for any element */
export type FocusHandler<E extends HTMLElement = HTMLElement> =
  React.FocusEventHandler<E>;

/** onDrop handler for drag-and-drop interactions */
export type DropHandler<E extends HTMLElement = HTMLElement> = React.DragEventHandler<E>;

/** Generic event handler for any element and event type */
export type EventHandler<
  E extends React.SyntheticEvent,
  T extends HTMLElement = HTMLElement,
> = React.EventHandler<E & { currentTarget: T }>;

// ─────────────────────────────────────────────────────────────────────────────
// STATE & REFS
// Helpers for useState, useReducer, and useRef patterns
// ─────────────────────────────────────────────────────────────────────────────

/** The setter returned by useState. Usage: type SetCount = SetState<number> */
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

/** A React ref object (from useRef). Usage: type DivRef = RefObject<HTMLDivElement> */
export type RefObject<T> = React.RefObject<T>;

/** A mutable React ref object (from useRef with initial value). */
export type MutableRef<T> = React.MutableRefObject<T>;

/** A callback ref or ref object — useful for forwardRef. */
export type Ref<T> = React.Ref<T>;

/** The value + setter tuple returned by useState */
export type StateEntry<T> = [T, SetState<T>];

/** A reducer dispatch function */
export type Dispatch<A> = React.Dispatch<A>;

// ─────────────────────────────────────────────────────────────────────────────
// CHILDREN & RENDER PATTERNS
// Types for flexible rendering APIs
// ─────────────────────────────────────────────────────────────────────────────

/** A component that accepts children */
export type WithChildren<P = object> = P & { children: React.ReactNode };

/** A component where children are optional */
export type WithOptionalChildren<P = object> = P & { children?: React.ReactNode };

/** A render-prop component. Usage: type Props = RenderProp<{ isOpen: boolean }> */
export type RenderProp<T = void> = {
  children: T extends void ? React.ReactNode : (props: T) => React.ReactNode;
};

/** A component that accepts a className string */
export type WithClassName<P = object> = P & { className?: string };

/** A component that accepts a style object */
export type WithStyle<P = object> = P & { style?: React.CSSProperties };

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY / GENERAL TYPESCRIPT
// General-purpose type-level operations
// ─────────────────────────────────────────────────────────────────────────────

/** Make all properties (including nested ones) readonly */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/** Make all properties (including nested ones) optional */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** Make all properties (including nested ones) required */
export type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

/** Pick keys from T whose values extend the type V */
export type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

/** Omit keys from T whose values extend the type V */
export type OmitByValue<T, V> = {
  [K in keyof T as T[K] extends V ? never : K]: T[K];
};

/** Merge two types, with B overriding A. Cleaner than A & B for conflicting keys. */
export type Merge<A, B> = Omit<A, keyof B> & B;

/** Make only certain keys nullable */
export type Nullable<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null;
};

/** Unwrap a Promise type. Usage: type Data = Awaited<typeof fetchUser> */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/** Get the return type of an async function */
export type AsyncReturnType<T extends (...args: never[]) => Promise<unknown>> =
  T extends (...args: never[]) => Promise<infer R> ? R : never;

/** Represent a value that may be a direct value or wrapped in a function returning it */
export type ValueOrGetter<T> = T | (() => T);

/** Keys of T that are optional */
export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T];

/** Keys of T that are required */
export type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

/** A union of the values of an object type. Usage: type Colors = ValueOf<typeof theme.colors> */
export type ValueOf<T> = T[keyof T];

/** A union of the keys of a const object as string literals */
export type KeyOf<T> = keyof T;

/** Infer the item type of an array */
export type ArrayItem<T extends readonly unknown[]> = T[number];

/** Create a record where all values are of the same type */
export type Dictionary<T, K extends string | number | symbol = string> = Record<K, T>;

/** An object that may have any additional string keys */
export type LooseObject<T = unknown> = { [key: string]: T };

/** Branded / nominal type to prevent mixing semantically different primitives.
 *  Usage: type UserId = Brand<string, 'UserId'>; type PostId = Brand<string, 'PostId'> */
export type Brand<T, B extends string> = T & { __brand: B };

// ─────────────────────────────────────────────────────────────────────────────
// API / ASYNC STATE
// Patterns for representing loading, error, and data states
// ─────────────────────────────────────────────────────────────────────────────

/** Standard discriminated union for async operations */
export type AsyncState<T, E = Error> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: E };

/** Represent a paginated API response */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
};

/** Generic API response wrapper */
export type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };

export type TypesMatch<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

export type TuplesAreSubsetOfEachOther<T, U> = T extends []
  ? true
  : U extends []
    ? true
    : T extends [infer THead, ...infer TRest]
      ? U extends [infer UHead, ...infer URest]
        ? TypesMatch<THead, UHead> extends true
          ? TuplesAreSubsetOfEachOther<TRest, URest>
          : false
        : false
      : false;

export type WhichIsLongerSubset<T, U> = T extends []
  ? "SECOND"
  : U extends []
    ? "FIRST"
    : T extends [infer THead, ...infer TRest]
      ? U extends [infer UHead, ...infer URest]
        ? TypesMatch<THead, UHead> extends true
          ? WhichIsLongerSubset<TRest, URest>
          : never
        : never
      : never;
