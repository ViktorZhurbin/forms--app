import { FetchError } from "@/shared/components/FetchError/FetchError";
import { Routes } from "@/shared/constants/location";
import { useAllForms } from "@/shared/models/forms/read";
import type { TForm } from "@/shared/models/forms/schema/forms";
import { deleteForm } from "@/shared/models/forms/write";
import { pluralize } from "@/shared/utils/grammar";
import { ActionIcon, Group, Stack } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { FormsLayout } from "~/constants/forms";
import styles from "./FormsView.module.css";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayout;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const { isLoading, error, data } = useAllForms();

	if (error) {
		return <FetchError message={error.message} />;
	}

	const ViewComponent = view === FormsLayout.List ? ListView : GridView;

	const getDeleteButton = ({ nanoid }: { nanoid: TForm["nanoid"] }) => {
		return (
			<ActionIcon
				variant="default"
				className={styles.delete}
				onClick={(event) => {
					event.preventDefault();

					deleteForm({ nanoid });
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
						name={form.name}
						nanoid={form.nanoid}
						className={styles.formItem}
						href={Routes.getFormPath({ nanoid: form.nanoid })}
						getDeleteButton={getDeleteButton}
						responsesText={pluralize({
							singular: "response",
							count: form.responseCount,
						})}
					/>
				</SkeletonWrapper>
			))}
		</Wrapper>
	);
};
