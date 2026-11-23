/**
 * Generates typed mock data files from page @types API response/data types.
 * Output: <feature>/(helper|helpers)/mock/<name>MockData.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PAGES = path.join(ROOT, "src", "pages");

const SKIP_TYPE_SUFFIXES = [
  "Request",
  "Props",
  "FormType",
  "Form",
  "Params",
  "Payload",
  "Query",
  "Filter",
  "AdvanceFilter",
  "AdvanceFilterFormType",
];

const FORCE_INCLUDE = [/Response$/, /DataTypes$/, /ListItem$/, /ListData$/, /DetailData$/, /TableRecord$/, /Record$/];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.isFile() && entry.name.startsWith("@") && entry.name.endsWith(".ts")) {
      acc.push(full);
    }
  }
  return acc;
}

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function findMatchingBrace(src, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractExportedTypes(src) {
  const clean = stripComments(src);
  const types = [];
  const re = /export\s+type\s+([A-Za-z0-9_]+)\s*=\s*/g;
  let m;
  while ((m = re.exec(clean))) {
    const name = m[1];
    let i = m.index + m[0].length;
    while (i < clean.length && /\s/.test(clean[i])) i++;
    if (clean[i] !== "{") {
      // alias / union — skip for object mock
      continue;
    }
    const end = findMatchingBrace(clean, i);
    if (end < 0) continue;
    const body = clean.slice(i + 1, end);
    types.push({ name, body });
    re.lastIndex = end + 1;
  }
  return types;
}

function shouldGenerate(name) {
  if (SKIP_TYPE_SUFFIXES.some((s) => name.endsWith(s))) {
    // still allow *Response even if contains Filter etc. — Response wins
    if (!/Response$/.test(name)) return false;
  }
  if (FORCE_INCLUDE.some((r) => r.test(name))) return true;
  // include plain data shapes that look API-ish
  if (/^(Get|Post|Put|Patch|Delete)/.test(name) && /Response$/.test(name)) return true;
  return false;
}

function splitProps(body) {
  const props = [];
  let i = 0;
  let buf = "";
  let depth = 0;
  let angle = 0;
  while (i < body.length) {
    const ch = body[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (ch === "<") angle++;
    else if (ch === ">") angle = Math.max(0, angle - 1);
    else if (ch === ";" && depth === 0 && angle === 0) {
      const line = buf.trim();
      if (line) props.push(line);
      buf = "";
      i++;
      continue;
    }
    buf += ch;
    i++;
  }
  const last = buf.trim();
  if (last) props.push(last);
  return props;
}

function parseProp(line) {
  // e.g. firstName?: string | null
  const m = line.match(/^([A-Za-z0-9_]+)\s*(\?)?\s*:\s*([\s\S]+)$/);
  if (!m) return null;
  return { key: m[1], optional: Boolean(m[2]), type: m[3].trim().replace(/,$/, "") };
}

function mockPrimitive(key, typeExpr, typeMap, depth) {
  const t = typeExpr.trim();

  if (t === "string" || t.startsWith('"') || t.startsWith("'") || t.includes("|") && /['"]/.test(t) && !t.includes("{")) {
    if (/email/i.test(key)) return '"user@example.com"';
    if (/phone|mobile|tel/i.test(key)) return '"09121234567"';
    if (/date|At$|Time|created|updated/i.test(key)) return '"2026-05-02T10:20:27.741127"';
    if (/uuid|id$/i.test(key) && !/userStaffId|number/i.test(key)) return '"30acd599-f0fd-4d67-9593-aab003100e2e"';
    if (/name|title|label|msg|message|description|reason/i.test(key)) return `"نمونه ${key}"`;
    if (/username|userName/i.test(key)) return '"demo.user"';
    if (/national|code/i.test(key)) return '"0012345678"';
    if (/url|link|href/i.test(key)) return '"https://example.com"';
    if (/icon/i.test(key)) return '"HomeOutlined"';
    if (/key$/i.test(key)) return '"default"';
    if (/status/i.test(key)) return '"ACTIVE"';
    return `"${key}-mock"`;
  }

  if (t === "number" || t === "bigint") {
    if (/page/i.test(key)) return "0";
    if (/size|total|count|amount|price|quantity/i.test(key)) return "10";
    return "1";
  }

  if (t === "boolean") return "true";
  if (t === "null") return "null";
  if (t === "undefined") return "undefined";
  if (t === "any" || t === "unknown" || t === "never" || t === "void") return "null";
  if (t === "React.ReactNode" || t === "ReactNode") return "null";

  // array
  if (t.endsWith("[]")) {
    const inner = t.slice(0, -2).trim();
    const item = mockPrimitive(key.replace(/s$/, "") || "item", inner, typeMap, depth + 1);
    return `[${item}]`;
  }
  const arrMatch = t.match(/^Array<([\s\S]+)>$/);
  if (arrMatch) {
    const item = mockPrimitive(key, arrMatch[1].trim(), typeMap, depth + 1);
    return `[${item}]`;
  }

  // union — pick first non-null non-undefined
  if (t.includes("|") && !t.includes("{")) {
    const parts = t.split("|").map((p) => p.trim()).filter((p) => p && p !== "null" && p !== "undefined");
    if (parts.length) return mockPrimitive(key, parts[0], typeMap, depth);
    return "null";
  }

  // referenced type in same file
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(t) && typeMap[t]) {
    if (depth > 4) return "null";
    return buildObjectLiteral(typeMap[t], typeMap, depth + 1);
  }

  // inline object
  if (t.startsWith("{")) {
    const end = findMatchingBrace(t, 0);
    if (end > 0) {
      const innerBody = t.slice(1, end);
      return buildObjectLiteral(innerBody, typeMap, depth + 1);
    }
  }

  // SelectType / IdTitleName-ish fallbacks
  if (/IdTitleName|SelectType|Option/.test(t)) {
    return `{ id: 1, title: "نمونه", name: "نمونه", value: "1" }`;
  }

  // enum-like string union already handled; leftover complex → null
  return "null";
}

function buildObjectLiteral(body, typeMap, depth = 0) {
  if (depth > 5) return "{}";
  const props = splitProps(body)
    .map(parseProp)
    .filter(Boolean);
  if (!props.length) return "{}";
  const lines = props.map(({ key, type }) => {
    const value = mockPrimitive(key, type, typeMap, depth);
    return `  ${key}: ${value},`;
  });
  return `{\n${lines.join("\n")}\n}`;
}

function toMockConstName(typeName) {
  // GetFinanceBuyersListResponse -> GET_FINANCE_BUYERS_LIST_RESPONSE_MOCK
  const snake = typeName
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();
  return `${snake}_MOCK`;
}

function featureMockDir(typesFile) {
  // .../Feature/@types/@file.ts -> .../Feature/helper|helpers/mock
  const featureDir = path.dirname(path.dirname(typesFile));
  const helpers = path.join(featureDir, "helpers");
  const helper = path.join(featureDir, "helper");
  const base = fs.existsSync(helpers) ? helpers : helper;
  return path.join(base, "mock");
}

function typesImportPath(typesFile, mockFile) {
  // relative import without extension, preserve @filename
  let rel = path.relative(path.dirname(mockFile), typesFile).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel.replace(/\.ts$/, "");
}

function fileBaseName(typesFile) {
  // @buyersList.ts -> buyersList
  return path.basename(typesFile, ".ts").replace(/^@/, "");
}

function generateFile(typesFile, typesToMock, allTypeBodies) {
  const mockDir = featureMockDir(typesFile);
  fs.mkdirSync(mockDir, { recursive: true });
  const base = fileBaseName(typesFile);
  const mockFile = path.join(mockDir, `${base}MockData.ts`);
  const importPath = typesImportPath(typesFile, mockFile);

  const typeNames = typesToMock.map((t) => t.name);
  const imports = `import type {\n${typeNames.map((n) => `  ${n},`).join("\n")}\n} from "${importPath}";\n`;

  const blocks = typesToMock.map(({ name, body }) => {
    const constName = toMockConstName(name);
    const literal = buildObjectLiteral(body, allTypeBodies, 0);
    const isArrayRoot = false;
    // list responses often better as object; also export item arrays when content present
    return `export const ${constName}: ${name} = ${literal};\n`;
  });

  // Extra: if a *Response has content: X[], also export CONTENT array alias convenience
  const extras = [];
  for (const { name, body } of typesToMock) {
    const contentProp = splitProps(body).map(parseProp).find((p) => p && p.key === "content");
    if (contentProp && contentProp.type.endsWith("[]")) {
      const itemType = contentProp.type.slice(0, -2).trim();
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(itemType) && allTypeBodies[itemType]) {
        const arrName = toMockConstName(itemType).replace(/_MOCK$/, "_LIST_MOCK");
        const itemLit = buildObjectLiteral(allTypeBodies[itemType], allTypeBodies, 0);
        extras.push(
          `export const ${arrName}: ${itemType}[] = [\n${itemLit},\n${itemLit.replace(/: 1,/g, ": 2,").replace(/mock"/g, 'mock-2"')},\n];\n`,
        );
      }
    }
  }

  const header = `/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */\n`;
  const content = `${header}\n${imports}\n${blocks.join("\n")}${extras.length ? "\n" + extras.join("\n") : ""}`;
  fs.writeFileSync(mockFile, content, "utf8");
  return mockFile;
}

function main() {
  const files = walk(PAGES);
  let written = 0;
  let typesCount = 0;
  const writtenFiles = [];

  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const exported = extractExportedTypes(src);
    if (!exported.length) continue;
    const typeMap = Object.fromEntries(exported.map((t) => [t.name, t.body]));
    const targets = exported.filter((t) => shouldGenerate(t.name));
    if (!targets.length) continue;
    typesCount += targets.length;
    const out = generateFile(file, targets, typeMap);
    written++;
    writtenFiles.push(path.relative(ROOT, out));
  }

  // Menu mock (API-driven sidebar)
  const menuDir = path.join(ROOT, "src", "components", "Layout", "SideBar", "helper", "mock");
  fs.mkdirSync(menuDir, { recursive: true });
  const menuFile = path.join(menuDir, "menuMockData.ts");
  const menuContent = `/** Mock menu payload matching authenticationApi getRolesMenu / MenuItemData. */
import type { MenuItemData, MenuItemResponse } from "@infra/states/redux/Apis/models/homeApi.model";

export const MENU_ITEM_DATA_MOCK: MenuItemData = {
  id: 1,
  label: "خانه",
  icon: "HomeOutlined",
  key: "default",
  type: undefined,
  children: [],
};

export const MENU_ITEMS_MOCK: MenuItemData[] = [
  {
    id: 1,
    label: "خانه",
    icon: "HomeOutlined",
    key: "default",
    type: undefined,
    children: [],
  },
  {
    id: 2,
    label: "مالی",
    icon: "WalletOutlined",
    key: "financial2",
    type: "submenu",
    children: [
      {
        id: 21,
        label: "خریداران",
        icon: "",
        key: "accountingBuyers",
        type: undefined,
        children: [],
      },
      {
        id: 22,
        label: "تراکنش‌ها",
        icon: "",
        key: "accountingTransactions",
        type: undefined,
        children: [],
      },
      {
        id: 23,
        label: "حسابداری من",
        icon: "",
        key: "accountingMyAccounting",
        type: undefined,
        children: [],
      },
    ],
  },
  {
    id: 3,
    label: "خوابگاه",
    icon: "HomeOutlined",
    key: "dormitoriesV2",
    type: "submenu",
    children: [
      {
        id: 31,
        label: "اطلاعات پایه",
        icon: "",
        key: "dormBaseInfoV2",
        type: undefined,
        children: [],
      },
      {
        id: 32,
        label: "ساکنین",
        icon: "",
        key: "residentsV2",
        type: undefined,
        children: [],
      },
      {
        id: 33,
        label: "درخواست‌ها",
        icon: "",
        key: "userRequestsV2",
        type: undefined,
        children: [],
      },
    ],
  },
  {
    id: 4,
    label: "تیکتینگ",
    icon: "CustomerServiceOutlined",
    key: "ticket",
    type: "submenu",
    children: [
      {
        id: 41,
        label: "تیکت‌های کاربران",
        icon: "",
        key: "allTicketUserTickets",
        type: undefined,
        children: [],
      },
      {
        id: 42,
        label: "تیکت‌های داخلی",
        icon: "",
        key: "allTicketInternalTickets",
        type: undefined,
        children: [],
      },
    ],
  },
  {
    id: 5,
    label: "کیف پول",
    icon: "CreditCardOutlined",
    key: "walletAllList",
    type: "submenu",
    children: [
      {
        id: 51,
        label: "کیف پول‌ها",
        icon: "",
        key: "walletAllList",
        type: undefined,
        children: [],
      },
      {
        id: 52,
        label: "تراکنش‌ها",
        icon: "",
        key: "walletAllTransactions",
        type: undefined,
        children: [],
      },
    ],
  },
  {
    id: 6,
    label: "تغذیه",
    icon: "CoffeeOutlined",
    key: "foodV2AllRestaurants",
    type: "submenu",
    children: [
      {
        id: 61,
        label: "سلف‌ها",
        icon: "",
        key: "foodV2AllRestaurants",
        type: undefined,
        children: [],
      },
      {
        id: 62,
        label: "سفارشات",
        icon: "",
        key: "foodV2AllOrders",
        type: undefined,
        children: [],
      },
    ],
  },
];

export const MENU_ITEM_RESPONSE_MOCK: MenuItemResponse = {
  status: 200,
  msg: "success",
  data: MENU_ITEMS_MOCK,
};
`;
  fs.writeFileSync(menuFile, menuContent, "utf8");
  writtenFiles.push(path.relative(ROOT, menuFile));

  console.log(JSON.stringify({ writtenFiles: written, typesCount, menu: path.relative(ROOT, menuFile) }, null, 2));
  console.log(`TOTAL_MOCK_FILES=${written + 1}`);
}

main();
