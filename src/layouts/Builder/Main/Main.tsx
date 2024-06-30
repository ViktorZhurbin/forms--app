import { Center } from "@mantine/core";
import { Question } from "~/components/Question/Question";
import { useSelectedBlockId } from "../hooks/useSelectedBlockId";

export const Main = () => {
	const selectedBlockId = useSelectedBlockId();

	if (!selectedBlockId) return null;

	return (
		<Center flex={1}>
			<Question id={selectedBlockId} />
		</Center>
	);
};
