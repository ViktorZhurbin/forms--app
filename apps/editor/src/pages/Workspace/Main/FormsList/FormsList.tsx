import { FetchState } from "@/shared/components/FetchState/FetchState";
import { useCurrentWorkspaceWithFormsQuery } from "@/shared/models/workspace/read";
import { pluralize } from "@/shared/utils/grammar";
import { Group, Stack } from "@mantine/core";
import { Link, Redirect } from "wouter";
import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { FormsLayout } from "~/constants/forms";
import { Routes } from "~/constants/routes";
import { RouteUtils } from "~/utils/routes";
import { DeleteFormButton } from "../DeleteFormButton/DeleteFormButton";
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

	const FormButton = viewType === FormsLayout.List ? ListView : GridView;

	const Wrapper = viewType === FormsLayout.List ? Stack : Group;

	return (
		<Wrapper gap={8} data-view-type={viewType}>
			{workspace.forms?.map((form) => {
				const formHref = RouteUtils.getFormPath({
					formNanoId: form.nanoId,
				});

				const responsesText = pluralize({
					singular: "response",
					count: form.responses.length,
				});

				return (
					<SkeletonWrapper key={form.id} visible={isLoading}>
						<div className={styles.formItem}>
							<FormButton
								formName={form.name}
								responsesText={responsesText}
								buttonProps={{
									size: "md",
									variant: "default",
									component: Link,
									href: formHref,
								}}
							/>
							<DeleteFormButton
								className={styles.delete}
								nanoId={form.nanoId}
								formName={form.name}
							/>
						</div>
					</SkeletonWrapper>
				);
			})}
		</Wrapper>
	);
};
