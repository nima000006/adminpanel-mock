# CustomPagination

**Path:** `src/components/Renderers/CustomPagination/CustomPagination.tsx`  
**Base Library:** Ant Design (`Pagination`)  
**Styles:** No component-specific stylesheet imported

## Description

A shared pagination component built on top of Ant Design's `Pagination`. It provides default Persian labels for the quick-jump controls and forwards all remaining pagination props unchanged.

## Props & API

Inherits standard Ant Design `PaginationProps` without adding custom props.

The wrapper changes the default value of `locale`:

```tsx
{
  jump_to: "برو به",
  page: "صفحه",
}
```

## Basic Usage Examples

### 1. Controlled Pagination

```tsx
<CustomPagination
  current={currentPage}
  total={totalItems}
  pageSize={pageSize}
  onChange={pageChangeHandler}
/>
```

### 2. Page Size Selection and Quick Jump

const buildingPageSizeOptions = ["8", "10", "20", "50"];

```tsx
<CustomPagination
  current={currentPage}
  total={filteredBuilding.length}
  pageSize={pageSize}
  onChange={pageChangeHandler}
  showSizeChanger
  showQuickJumper
  pageSizeOptions={buildingPageSizeOptions}
/>
```
