import { AppShell, LoadingOverlay, ScrollArea } from "@mantine/core";
import { useParams } from "wouter";
import { FetchError } from "~/components/FetchError/FetchError";
import { useFormQuestions } from "~/hooks/queries/useFormQuestions";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { NavThankYou } from "./Navbar/NavThankYou/NavThankYou";
import { NavbarQuestions } from "./Navbar/NavbarQuestions/NavbarQuestions";

export const Builder = () => {
	const formId = useParams()?.id;

	if (!formId) {
		return 404;
	}

	const { isLoading, error } = useFormQuestions(formId);

	if (isLoading) {
		return <LoadingOverlay />;
	}

	if (error) {
		return <FetchError message={error.message} />;
	}

	return (
		<AppShell
			padding="md"
			header={{ height: 60 }}
			navbar={{
				width: 200,
				breakpoint: 0,
				collapsed: { desktop: false, mobile: false },
			}}
		>
			<AppShell.Header>
				<Header formId={formId} />
			</AppShell.Header>

			<AppShell.Navbar p="sm">
				<AppShell.Section grow component={ScrollArea} scrollbars="y">
					<NavbarQuestions />
				</AppShell.Section>

				<AppShell.Section grow component={ScrollArea}>
					<NavThankYou />
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main display="flex">
				<Main formId={formId} />
			</AppShell.Main>
		</AppShell>
	);
};
