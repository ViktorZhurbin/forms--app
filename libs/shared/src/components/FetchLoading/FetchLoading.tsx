import { Center, Loader } from "@mantine/core";

export const FetchLoading = () => {
	return (
		<Center flex={1} h="100%">
			<Loader color="gray" type="dots" />
		</Center>
	);
};
