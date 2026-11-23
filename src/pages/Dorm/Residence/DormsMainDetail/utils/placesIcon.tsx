import { JSX } from "react";

import {
  IconBag,
  IconBook,
  IconBus,
  IconBusBrt,
  IconFilm,
  IconGrass,
  IconMetro,
  IconSoccerField,
  IconStore,
  IconTaxiCar,
  IconTree,
} from "@components/icons/icons";

export const iconMap: Record<number, JSX.Element> = {
  1: <IconTree viewBox="0 0 24 24" strokeWidth={1.5} fill="#000" />,
  2: <IconGrass viewBox="0 0 24 24" strokeWidth={0.1} fill="#000" />,
  3: <IconTaxiCar viewBox="0 0 24 24" fill="#000" />,
  4: <IconMetro viewBox="0 0 24 24" fill="#000" />,
  5: <IconBusBrt viewBox="0 0 24 24" fill="#000" />,
  6: <IconBus viewBox="0 0 24 24" fill="#000" />,
  7: <IconBag viewBox="0 0 24 24" fill="#000" />,
  8: <IconStore viewBox="0 0 24 24" fill="#000" />,
  9: <IconFilm viewBox="0 0 24 24" fill="#000" />,
  10: <IconSoccerField viewBox="0 0 24 24" fill="#000" />,
  11: <IconBook viewBox="0 0 24 24" fill="#000" />,
};
