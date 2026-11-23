export const groupMessages = <
  T extends { createDate?: string; createdDate?: string; dayChange?: boolean },
>(
  messages: T[] | undefined
) => {
  type Group = { date?: string; messages: T[] };

  return messages?.reduce((groups: Group[], msg: any) => {
    const m = msg as { createDate?: string; createdDate?: string; dayChange?: boolean };
    const rawDate = m.createDate ?? m.createdDate;

    const msgDate =
      typeof rawDate === "string" ? (rawDate.split(" | ")?.[0] ?? rawDate) : rawDate;

    const lastGroup = groups[groups.length - 1];

    if (!lastGroup) {
      groups.push({
        date: msgDate,
        messages: [msg],
      });
      return groups;
    }

    const dateChanged = lastGroup.date !== msgDate;

    if (dateChanged || m.dayChange) {
      groups.push({
        date: msgDate,
        messages: [msg],
      });
    } else {
      lastGroup.messages.push(msg);
    }

    return groups;
  }, [] as Group[]);
};

export const stepMap = {
  basic: {
    label: "اولیه",
    color: "blue",
  },
  reject: { label: "ارجاعی", color: "orange" },
};

export const ribbonMap = {
  answered: {
    label: "پاسخ داده شده",
    color: "green",
  },
  closed: {
    label: "بسته شده",
    color: "red",
  },
  unassigned: {
    label: "تخصیص نیافته",
    color: "volcano",
  },
  waiting: {
    label: "در انتظار پاسخ",
    color: "",
  },
};
