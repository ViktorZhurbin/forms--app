import { Center, Loader } from "@mantine/core";

export const FullScreenLoader = () => {
	return (
		<Center h="100dvh">
			<Loader color="gray" type="dots" />
		</Center>
	);
};
