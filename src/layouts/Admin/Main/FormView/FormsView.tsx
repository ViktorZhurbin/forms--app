import { tx } from "@instantdb/react";
import { ActionIcon, Group, Stack } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FetchError } from "~/components/FetchError/FetchError";
import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { FormsLayout } from "~/constants/forms";
import { Routes } from "~/constants/location";
import { dbTransact, useDbQuery } from "~/models/db";
import type { FormType } from "~/models/forms/forms";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayout;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const { isLoading, error, data } = useDbQuery({ forms: {} });

	if (error) {
		return <FetchError message={error.message} />;
	}

	const ViewComponent = view === FormsLayout.List ? ListView : GridView;

	const getDeleteButton = (id: FormType["id"]) => {
		return (
			<ActionIcon
				variant="default"
				onClick={(event) => {
					event.preventDefault();

					dbTransact([tx.forms[id].delete()]);
				}}
			>
				<IconTrash />
			</ActionIcon>
		);
	};

	const Wrapper = view === FormsLayout.List ? Stack : Group;

	return (
		<Wrapper gap={8}>
			{data?.forms.map((form) => (
				<SkeletonWrapper key={form.id} visible={isLoading}>
					<ViewComponent
						{...form}
						getHref={Routes.getFormPath}
						getDeleteButton={getDeleteButton}
					/>
				</SkeletonWrapper>
			))}
		</Wrapper>
	);
};
