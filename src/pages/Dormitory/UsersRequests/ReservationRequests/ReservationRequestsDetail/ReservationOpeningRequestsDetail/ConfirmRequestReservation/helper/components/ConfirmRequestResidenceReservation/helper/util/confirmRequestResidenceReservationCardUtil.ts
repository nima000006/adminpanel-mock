export const getConfirmRequestResidenceLocationParts = ({
  buildingTitle,
  floorTitle,
}: {
  buildingTitle: string;
  floorTitle: string;
}) => [
  { type: "label" as const, text: "ساختمان" },
  { type: "value" as const, text: buildingTitle },
  { type: "label" as const, text: "طبقه" },
  { type: "value" as const, text: floorTitle },
];
