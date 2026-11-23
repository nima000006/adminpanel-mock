# IconTab

**Path:** `src/components/Renderers/IconTab/IconTab.tsx`  
**Base Library:** Own component (flex-based custom UI)  
**Styles:** Tailwind CSS utility classes (inline)

## Description

A clickable tab component used to render an icon (fill color reacts to active state), an optional background image, and a title. Commonly used in detail pages for switching between view sections (e.g., residence unit details, bed-type selection).

## Props & API

Defined by `IconTabProps` (`./@types/@iconTab`):

| Prop           | Type                                              | Default | Required | Description                                                                       |
| :------------- | :------------------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------- |
| `title`        | `string`                                          | —       | **Yes**  | The text label of the tab                                                         |
| `Icon`         | `React.FC<{ fillColor?: string; size?: string }>` | —       | No       | Icon component; receives `fillColor` (driven by active state) and optional `size` |
| `active`       | `boolean`                                         | `false` | No       | When `true`, applies primary styling and active icon fill color (`#096DD9`)       |
| `disabled`     | `boolean`                                         | `false` | No       | When `true`, applies muted styling, blocks click, and sets `cursor-not-allowed`   |
| `clickHandler` | `() => void`                                      | —       | No       | Click handler executed on tab click                                               |
| `className`    | `string`                                          | `""`    | No       | Additional CSS classes applied to the outer wrapper element                       |
| `img`          | `string` (src URL)                                | —       | No       | Optional background image source rendered as an `<img>` element                   |

> **Note:** At least one of `Icon` or `img` should be provided to display visual content above or beside the title.

---

## Basic Usage Examples

### 1. Tab with Icon Bound to Active State from URL

```tsx
import RoomIcon from "@/assets/icons/RoomIcon";
import IconTab from "@/components/Renderers/IconTab/IconTab";

<IconTab
  Icon={RoomIcon}
  title="واحد اقامتی"
  active={url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit}
  clickHandler={() => changeCardHandler(RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit)}
/>;
```

### 2. Tab with Static Image (No Icon)

```tsx
import singleFloorBed from "@/assets/images/beds/single-floor.png";
import IconTab from "@/components/Renderers/IconTab/IconTab";

<IconTab
  img={singleFloorBed}
  title="تک طبقه"
  clickHandler={() => changeCardHandler(SELECT_BED_TYPE?.singleFloor)}
/>;
```

### 3. Tab with Custom Class and Icon

```tsx
import EconomyClassIcon from "@/assets/icons/EconomyClassIcon";
import IconTab from "@/components/Renderers/IconTab/IconTab";

<IconTab
  Icon={EconomyClassIcon}
  title="اکونومی"
  active={selectedClass === "ECONOMY"}
  clickHandler={() => setSelectedClass("ECONOMY")}
  className="mt-2"
/>;
```

### 4. Inline Component / Wrapper Icon Syntax

```tsx
import PhoneIcon from "@/assets/icons/PhoneIcon";
import IconTab from "@/components/Renderers/IconTab/IconTab";

<IconTab
  Icon={() => <PhoneIcon />}
  title="اکونومی"
  active={selectedClass === "ECONOMY"}
  clickHandler={() => setSelectedClass("ECONOMY")}
  className="mt-2"
/>;
```
