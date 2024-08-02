import { useQuery } from "../db";

const useUserWithWorkspacesQuery = ({ userId }: { userId: string }) => {
	const { data, isLoading, error } = useQuery({
		users: {
			$: { where: { id: userId } },
			workspaces: {},
		},
	});

	return { data: data?.users[0], isLoading, error };
};

export { useUserWithWorkspacesQuery };
