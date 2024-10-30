import { getDisplayPrice } from "../helpers/getDisplayPrice";
import { Plans } from "./plans";

export interface PricingPlan {
	title: string;
	code: Plans;
	isHighlighted?: boolean;
	description: string;
	price: {
		monthly?: string;
		yearly: string;
	};
	buttonText: string;
}

export const pricingPlans: PricingPlan[] = [
	{
		title: "Free",
		code: Plans.FREE,
		description: "Free plan description in a short sentence.",
		price: {
			yearly: getDisplayPrice(0),
		},
		buttonText: "Start free",
	},
	{
		title: "Pro",
		code: Plans.PRO,
		isHighlighted: true,
		description:
			"Pro plan description in a relatively long sentence which spans across two lines on mobile",
		price: {
			yearly: getDisplayPrice(20),
			monthly: getDisplayPrice(29),
		},
		buttonText: "Buy Pro",
	},
];
