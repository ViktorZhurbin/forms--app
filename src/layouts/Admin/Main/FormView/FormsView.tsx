import { tx } from "@instantdb/react";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FetchError } from "~/components/FetchError/FetchError";
import { FormsLayout } from "~/constants/forms";
import { Routes } from "~/constants/location";
import { db } from "~/models/db";
import type { FormType } from "~/models/forms/forms";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayout;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const { isLoading, error, data } = db.useQuery({ forms: {} });

	if (isLoading) {
		return <div>Fetching data...</div>;
	}

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

					db.transact([tx.forms[id].delete()]);
				}}
			>
				<IconTrash />
			</ActionIcon>
		);
	};

	return (
		<ViewComponent
			forms={data.forms}
			getHref={Routes.getFormPath}
			getDeleteButton={getDeleteButton}
		/>
	);
};
