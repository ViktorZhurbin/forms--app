import { Center, Loader } from "@mantine/core";

export const FetchLoading = ({ fullScreen }: { fullScreen?: boolean }) => {
	return (
		<Center flex={1} h={fullScreen ? "100dvh" : "100%"}>
			<Loader color="gray" type="dots" />
		</Center>
	);
};
