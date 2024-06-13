import { TextInput } from "@mantine/core";
import type { ShortTextType } from "../../constants/questions";

type ShortTextProps = {
	question: ShortTextType;
};

export const ShortText = ({ question }: ShortTextProps) => {
	return <TextInput w="100%" />;
};
