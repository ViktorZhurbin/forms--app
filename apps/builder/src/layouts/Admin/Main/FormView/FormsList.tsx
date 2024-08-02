import { FetchState } from "@/shared/components/FetchState/FetchState";
import { Routes } from "@/shared/constants/routes";
import type { TForm } from "@/shared/models/form/schema/form";
import { deleteForm } from "@/shared/models/form/write";
import { useCurrentWorkspaceWithFormsQuery } from "@/shared/models/workspace/read";
import { pluralize } from "@/shared/utils/grammar";
import { ActionIcon, Group, Stack } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Redirect } from "wouter";
import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { FormsLayout } from "~/constants/forms";
import styles from "./FormsList.module.css";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	viewType: FormsLayout;
};

export const FormsList = ({ viewType }: FormsViewProps) => {
	const { isLoading, error, data } = useCurrentWorkspaceWithFormsQuery();

	if (isLoading || error) {
		return <FetchState isLoading={isLoading} error={error} />;
	}

	const workspace = data.workspaces[0];

	if (!workspace) {
		// can happen if url has incorrect ws id
		return <Redirect to={Routes.ROOT} />;
	}

	const ViewComponent = viewType === FormsLayout.List ? ListView : GridView;

	const getDeleteButton = ({ nanoId }: { nanoId: TForm["nanoId"] }) => {
		return (
			<ActionIcon
				variant="default"
				className={styles.delete}
				onClick={(event) => {
					event.preventDefault();

					deleteForm({ nanoId });
				}}
			>
				<IconTrash />
			</ActionIcon>
		);
	};

	const Wrapper = viewType === FormsLayout.List ? Stack : Group;

	return (
		<Wrapper gap={8}>
			{workspace.forms?.map((form) => (
				<SkeletonWrapper key={form.id} visible={isLoading}>
					<ViewComponent
						name={form.name}
						nanoId={form.nanoId}
						className={styles.formItem}
						href={Routes.getFormPath({ formId: form.nanoId })}
						getDeleteButton={getDeleteButton}
						responsesText={pluralize({
							singular: "response",
							count: form.responses.length,
						})}
					/>
				</SkeletonWrapper>
			))}
		</Wrapper>
	);
};
