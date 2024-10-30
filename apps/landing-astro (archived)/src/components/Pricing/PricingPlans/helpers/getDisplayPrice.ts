import { Symbols } from "~/constants/symbols";
import { CURRENCY } from "../constants/currency";

export const getDisplayPrice = (price: string | number) => {
	return `${price}${Symbols.NON_BREAKING_SPACE}${CURRENCY}`;
};
