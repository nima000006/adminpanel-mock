export const getConfirmRequestBuildingLocationParts = ({
  floorTitle,
  unitTitle,
}: {
  floorTitle: string;
  unitTitle: string;
}) => [
  { type: "label" as const, text: "طبقه" },
  { type: "value" as const, text: floorTitle },
  { type: "label" as const, text: "واحد" },
  { type: "value" as const, text: unitTitle },
];
